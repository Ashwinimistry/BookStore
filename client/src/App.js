import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Order from './pages/Order';
import About from './pages/About';
import Contact from './pages/Contact';
import Reviews from './pages/Reviews';
import CartSidePanel from './components/CartSidePanel';
import PaymentSidePanel from './components/PaymentSidePanel';
import './App.css';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPaymentPanelOpen, setIsPaymentPanelOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUser(token);
    }
  }, []);

  const fetchUser = async (token) => {
    try {
      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        localStorage.removeItem('token');
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      localStorage.removeItem('token');
    }
  };

  const handleLogin = (data) => {
    if (data && data.user && data.token) {
      setUser(data.user);
      localStorage.setItem('token', data.token);
    } else {
      console.error("Login data is invalid:", data);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCart([]);
    localStorage.removeItem('token');
  };

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  const handleUpdateQuantity = (bookId, quantity) => {
    if (quantity <= 0) {
      handleRemoveFromCart(bookId);
    } else {
      setCart(cart.map(item =>
        item.id === bookId
          ? { ...item, quantity }
          : item
      ));
    }
  };

  const handleRemoveFromCart = (bookId) => {
    setCart(cart.filter(item => item.id !== bookId));
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsPaymentPanelOpen(true);
  };

  const handlePlaceOrder = async () => {
    if (!user) {
      alert('Please login to place an order.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Authentication error. Please login again.');
      return;
    }

    try {
      const orderItems = cart.map(item => ({
        bookId: item.id,
        title: item.title,
        author: item.author,
        quantity: item.quantity,
        price: item.price,
      }));

      const totalAmount = cart.reduce((total, item) => total + (item.quantity * item.price), 0);

      await axios.post('/api/orders', 
        { items: orderItems, totalAmount },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );

      alert('Order placed successfully!');
      setCart([]);
      setIsPaymentPanelOpen(false);
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  const addToCart = (book) => {
    const existingItem = cart.find(item => item.id === book.id);
    if (existingItem) {
      handleUpdateQuantity(book.id, existingItem.quantity + 1);
    } else {
      setCart([...cart, { ...book, quantity: 1 }]);
    }
  };

  return (
    <div className="App">
      <Navbar 
        user={user} 
        onLogout={handleLogout} 
        cart={cart}
        onCartClick={handleCartClick}
      />
      
      <CartSidePanel
        isOpen={isCartOpen}
        onClose={handleCloseCart}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveFromCart={handleRemoveFromCart}
        onCheckout={handleProceedToCheckout}
      />

      <PaymentSidePanel
        isOpen={isPaymentPanelOpen}
        onClose={() => setIsPaymentPanelOpen(false)}
        totalAmount={cart.reduce((total, item) => total + (item.quantity * item.price), 0)}
        onPlaceOrder={handlePlaceOrder}
      />

      <main style={{ minHeight: 'calc(100vh - 200px)', padding: '40px 0' }}>
        <Routes>
          <Route path="/" element={<Home addToCart={addToCart} />} />
          <Route 
            path="/login" 
            element={
              user ? <Navigate to="/order" /> : <Login onLogin={handleLogin} />
            } 
          />
          <Route 
            path="/register" 
            element={
              user ? <Navigate to="/order" /> : <Register onLogin={handleLogin} />
            } 
          />
          <Route 
            path="/order" 
            element={
              user ? <Order user={user} cart={cart} addToCart={addToCart} /> : <Navigate to="/login" />
            } 
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/reviews" element={<Reviews />} />
        </Routes>
      </main>
      
      <Footer />
    </div>
  );
}

export default App; 