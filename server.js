require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const path = require('path');
const mysql = require('mysql2/promise');
const fetch = require('node-fetch');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.SECRET_KEY;

app.use(helmet());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:3000' }));
app.use(bodyParser.json());

// --- MySQL Database Connection ---
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER, // Use a dedicated DB user with limited privileges
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};

let db;

async function connectToDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: dbConfig.host,
      user: dbConfig.user,
      password: dbConfig.password
    });
    
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\``);
    console.log(`Database '${dbConfig.database}' is ready.`);
    await connection.end();

    db = await mysql.createPool(dbConfig);
    console.log('Successfully connected to the MySQL database pool.');

    await setupDatabaseTables();
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
}

// --- Database Table Setup ---
async function setupDatabaseTables() {
  try {
    const createUsersTable = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    
    const createOrdersTable = `
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        total_amount DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      );
    `;

    const createOrderItemsTable = `
      CREATE TABLE IF NOT EXISTS order_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT NOT NULL,
        book_id VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        author VARCHAR(255),
        quantity INT NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
      );
    `;

    await db.query(createUsersTable);
    await db.query(createOrdersTable);
    await db.query(createOrderItemsTable);
    console.log('Database tables are set up.');
  } catch (error) {
    console.error('Error setting up database tables:', error);
    process.exit(1);
  }
}

// --- Middleware ---
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    return res.sendStatus(401);
  }
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};

// --- API Endpoints ---

// Register User
app.post('/api/auth/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Username, email, and password are required' });
  }

  // Password strength: min 8 chars, at least 1 letter and 1 number
  if (!/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d).*$/.test(password)) {
    return res.status(400).json({ message: 'Password must be at least 8 characters and include a letter and a number.' });
  }

  try {
    const [existingUsers] = await db.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, email]);
    if (existingUsers.length > 0) {
      if (existingUsers[0].username === username) {
        return res.status(400).json({ message: 'Username already exists' });
      }
      if (existingUsers[0].email === email) {
        return res.status(400).json({ message: 'Email is already registered' });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { username, email, password: hashedPassword };

    const [result] = await db.query('INSERT INTO users SET ?', newUser);
    
    res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
});

// Login User
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const [users] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    if (users.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const user = users[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token, user: { id: user.id, username: user.username } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error logging in' });
  }
});

// Get User Info
app.get('/api/auth/me', authenticateToken, async (req, res) => {
  try {
    const [users] = await db.query('SELECT id, username, email FROM users WHERE id = ?', [req.user.id]);
    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(users[0]);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Error fetching user data' });
  }
});

// Create Order
app.post('/api/orders', authenticateToken, async (req, res) => {
  const { items, totalAmount } = req.body;
  const userId = req.user.id;

  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    const [orderResult] = await connection.query(
      'INSERT INTO orders (user_id, total_amount) VALUES (?, ?)',
      [userId, totalAmount]
    );
    const orderId = orderResult.insertId;

    const orderItems = items.map(item => [
      orderId,
      item.bookId,
      item.title,
      item.author,
      item.quantity,
      item.price
    ]);

    await connection.query(
      'INSERT INTO order_items (order_id, book_id, title, author, quantity, price) VALUES ?',
      [orderItems]
    );

    await connection.commit();
    res.status(201).json({ message: 'Order placed successfully', orderId });
  } catch (error) {
    await connection.rollback();
    console.error('Order creation error:', error);
    res.status(500).json({ message: 'Error placing order' });
  } finally {
    connection.release();
  }
});

// Get User's Orders
app.get('/api/orders', authenticateToken, async (req, res) => {
  console.log('--- GET /api/orders Endpoint ---');
  const userId = req.user.id;
  console.log('Fetching orders for User ID:', userId);

  try {
    const [orders] = await db.query(
      'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );
    console.log(`Found ${orders.length} orders for the user.`);

    for (let order of orders) {
      const [items] = await db.query('SELECT * FROM order_items WHERE order_id = ?', [order.id]);
      order.items = items;
    }

    console.log('Successfully fetched orders and their items.');
    res.json(orders);
  } catch (error) {
    console.error('---! DATABASE ERROR in /api/orders !---:', error);
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

// Get Books from OpenLibrary API
app.get('/api/books', async (req, res) => {
  const { subject = 'love', limit = 20 } = req.query;
  
  try {
    const response = await fetch(`https://openlibrary.org/search.json?subject=${subject}&limit=${limit}`);
    const data = await response.json();
    
    const books = data.docs.map(book => ({
      id: book.key,
      title: book.title,
      author: book.author_name ? book.author_name[0] : 'Unknown Author',
      cover: book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : null,
      publishYear: book.first_publish_year,
      subjects: book.subject ? book.subject.slice(0, 3) : [],
      price: 499 // Default price for all books
    }));
    
    res.json({ books });
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: 'Error fetching books' });
  }
});

// Serve React App in production
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'), (err) => {
    if (err) {
      res.status(504).send('The client application is not available at the moment. Please try again later.');
    }
  });
});

// --- Start Server ---
connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}); 