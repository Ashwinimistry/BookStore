# BookStore Website

A complete online bookstore website built with React.js frontend and Node.js backend, featuring user authentication, book browsing, shopping cart, and order management.

## Features

- **User Authentication**: Register and login functionality with JWT tokens
- **Book Browsing**: Search and browse books from OpenLibrary API
- **Shopping Cart**: Add books to cart with quantity management
- **Order Management**: View order history and order details
- **Responsive Design**: Modern, mobile-friendly UI
- **Real-time Search**: Search books by subject/category

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **axios** - HTTP client for API calls
- **cors** - Cross-origin resource sharing

### Frontend
- **React.js** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **CSS3** - Styling with modern design

## API Integration

The application integrates with the [OpenLibrary API](https://openlibrary.org/subjects/love.json?limit=1) to fetch book data. Books are displayed with:
- Cover images
- Title and author information
- Publication year
- Subject tags
- Edition count

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Backend Setup

1. Install backend dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory (optional):
```env
PORT=5000
JWT_SECRET=your-secret-key-here
```

3. Start the backend server:
```bash
npm start
# or for development with auto-restart:
npm run dev
```

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install frontend dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

### Running Both Servers

From the root directory, you can run both servers:

```bash
# Terminal 1 - Backend
npm start

# Terminal 2 - Frontend
npm run client
```

## Project Structure

```
bookstore-website/
├── server.js              # Main backend server
├── package.json           # Backend dependencies
├── README.md             # Project documentation
├── client/               # React frontend
│   ├── public/
│   │   └── index.html    # Main HTML file
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   │   ├── Navbar.js
│   │   │   └── BookCard.js
│   │   ├── pages/        # Page components
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   └── Order.js
│   │   ├── App.js        # Main app component
│   │   ├── index.js      # React entry point
│   │   ├── index.css     # Global styles
│   │   └── App.css       # App-specific styles
│   └── package.json      # Frontend dependencies
```

## API Endpoints

### Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User login

### Books
- `GET /api/books?subject=love&limit=20` - Fetch books by subject

### Orders
- `POST /api/orders` - Create new order (requires authentication)
- `GET /api/orders` - Get user orders (requires authentication)

## Usage

1. **Register/Login**: Create an account or login to access full features
2. **Browse Books**: Search for books by subject (e.g., "love", "mystery", "fantasy")
3. **Add to Cart**: Click "Add to Cart" on any book (requires login)
4. **Manage Cart**: Adjust quantities or remove items from cart
5. **Checkout**: Complete your order
6. **View Orders**: Check your order history in the "My Orders" section

## Features in Detail

### User Authentication
- Secure password hashing with bcryptjs
- JWT token-based authentication
- Protected routes for authenticated users
- Session persistence with localStorage

### Book Display
- Responsive grid layout
- Book cover images from OpenLibrary
- Book details including author, publication year, and subjects
- Search functionality by subject

### Shopping Cart
- Add/remove books
- Quantity adjustment
- Real-time total calculation
- Persistent cart state

### Order Management
- Order history display
- Order status tracking
- Detailed order information
- Shipping address management

## Styling

The application uses a modern, clean design with:
- Inter font family for better readability
- Responsive grid layouts
- Hover effects and smooth transitions
- Color-coded status indicators
- Mobile-first responsive design

## Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Protected API endpoints
- Input validation and sanitization
- CORS configuration

## Future Enhancements

- Database integration (MongoDB/PostgreSQL)
- Payment gateway integration
- Email notifications
- Book reviews and ratings
- Wishlist functionality
- Advanced search filters
- Admin panel for order management

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please open an issue in the repository. 