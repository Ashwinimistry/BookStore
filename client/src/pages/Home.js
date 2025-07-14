import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BookCard from '../components/BookCard';

const Home = ({ user }) => {
  const [trendingBooks, setTrendingBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

  // Popular categories for trending books
  const trendingCategories = ['fiction', 'romance', 'mystery', 'fantasy', 'science'];

  useEffect(() => {
    fetchTrendingBooks();
  }, []);

  const fetchTrendingBooks = async () => {
    try {
      const response = await fetch('https://openlibrary.org/search.json?q=best+books&limit=8');
      const data = await response.json();
      
      const formattedBooks = data.docs.map(book => ({
        id: book.key,
        title: book.title,
        author: book.author_name ? book.author_name[0] : 'Unknown Author',
        cover: book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : null,
        publishYear: book.first_publish_year,
        subjects: book.subject ? book.subject.slice(0, 3) : []
      }));
      
      setTrendingBooks(formattedBooks);
    } catch (error) {
      console.error('Error fetching trending books:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (book) => {
    const existingItem = cart.find(item => item.id === book.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === book.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...book, quantity: 1 }]);
    }
  };

  const removeFromCart = (bookId) => {
    setCart(cart.filter(item => item.id !== bookId));
  };

  const updateQuantity = (bookId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(bookId);
    } else {
      setCart(cart.map(item => 
        item.id === bookId 
          ? { ...item, quantity }
          : item
      ));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.quantity * 15.99), 0);
  };

  const handleCheckout = () => {
    if (!user) {
      alert('Please login to place an order');
      return;
    }
    
    const orderData = {
      books: cart.map(item => ({
        id: item.id,
        title: item.title,
        author: item.author,
        quantity: item.quantity,
        price: 15.99
      })),
      totalAmount: getTotalPrice(),
      shippingAddress: 'Default Address'
    };

    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    const newOrder = {
      id: Date.now().toString(),
      ...orderData,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    localStorage.setItem('orders', JSON.stringify([...existingOrders, newOrder]));
    
    setCart([]);
    alert('Order placed successfully!');
  };

  const features = [
    {
      icon: '🔍',
      title: 'Extensive Collection',
      description: 'Browse through thousands of books from various genres and authors worldwide.'
    },
    {
      icon: '🚚',
      title: 'Fast Delivery',
      description: 'Get your books delivered to your doorstep with our reliable shipping service.'
    },
    {
      icon: '💰',
      title: 'Best Prices',
      description: 'Enjoy competitive prices and exclusive deals on your favorite books.'
    },
    {
      icon: '📱',
      title: 'Easy Shopping',
      description: 'User-friendly interface makes finding and ordering books a breeze.'
    }
  ];

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, var(--primary-color), var(--primary-dark))',
        color: 'white',
        padding: '100px 0',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=2128&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.1,
          zIndex: 1
        }}></div>
        
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <h1 style={{
            fontSize: '4rem',
            marginBottom: '24px',
            fontWeight: '700',
            lineHeight: '1.2'
          }}>
            Discover Your Next
            <br />
            Favorite Book
          </h1>
          <p style={{
            fontSize: '1.4rem',
            marginBottom: '40px',
            opacity: 0.95,
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
            lineHeight: '1.6'
          }}>
            Explore thousands of books from around the world. From bestsellers to hidden gems, 
            find the perfect read for every moment.
          </p>
          <Link to="/order" className="btn btn-secondary" style={{ fontSize: '1.2rem', padding: '16px 32px' }}>
            📚 Order Now
          </Link>
        </div>
      </div>

      {/* Trending Books Section */}
      <div className="container" style={{ padding: '80px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{
            fontSize: '2.5rem',
            marginBottom: '20px',
            color: 'var(--text-primary)',
            fontWeight: '700'
          }}>
            📚 Trending Books
          </h2>
          <p style={{
            fontSize: '1.2rem',
            color: 'var(--text-secondary)',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Discover the most popular and highly-rated books that readers are loving right now.
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div style={{ fontSize: '2rem', marginBottom: '16px' }}>📖</div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
              Loading trending books...
            </p>
          </div>
        ) : (
          <div className="grid grid-4" style={{ gap: '32px' }}>
            {trendingBooks.map(book => (
              <div key={book.id} className="card" style={{
                padding: '24px',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{
                  width: '120px',
                  height: '180px',
                  margin: '0 auto 20px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-md)'
                }}>
                  <img
                    src={book.cover || 'https://via.placeholder.com/120x180?text=No+Cover'}
                    alt={book.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
                
                <h3 style={{
                  marginBottom: '12px',
                  color: 'var(--text-primary)',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  lineHeight: '1.3',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {book.title}
                </h3>
                
                <p style={{
                  color: 'var(--text-secondary)',
                  marginBottom: '16px',
                  fontSize: '0.9rem',
                  fontWeight: '500'
                }}>
                  by {book.author}
                </p>
                
                {book.publishYear && (
                  <p style={{
                    color: 'var(--text-muted)',
                    marginBottom: '16px',
                    fontSize: '0.8rem'
                  }}>
                    {book.publishYear}
                  </p>
                )}
                
                <div style={{
                  color: 'var(--accent-dark)',
                  fontWeight: '700',
                  fontSize: '1.2rem',
                  marginBottom: '20px'
                }}>
                  $15.99
                </div>
                
                <Link 
                  to="/order" 
                  className="btn btn-accent"
                  style={{ 
                    marginTop: 'auto',
                    fontSize: '0.9rem',
                    padding: '10px 20px'
                  }}
                >
                  🛒 Add to Cart
                </Link>
              </div>
            ))}
          </div>
        )}
        
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link to="/order" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '16px 32px' }}>
            View All Books
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="container" style={{ padding: '80px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{
            fontSize: '2.5rem',
            marginBottom: '20px',
            color: 'var(--text-primary)',
            fontWeight: '700'
          }}>
            Why Choose BookStore?
          </h2>
          <p style={{
            fontSize: '1.2rem',
            color: 'var(--text-secondary)',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            We're committed to providing the best book shopping experience with quality service and competitive prices.
          </p>
        </div>

        <div className="grid grid-4">
          {features.map((feature, index) => (
            <div key={index} className="card" style={{ padding: '40px', textAlign: 'center' }}>
              <div style={{
                fontSize: '3rem',
                marginBottom: '24px',
                background: 'linear-gradient(135deg, var(--primary-color), var(--accent-color))',
                borderRadius: '50%',
                width: '80px',
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                color: 'white'
              }}>
                {feature.icon}
              </div>
              <h3 style={{
                marginBottom: '16px',
                color: 'var(--text-primary)',
                fontSize: '1.3rem',
                fontWeight: '600'
              }}>
                {feature.title}
              </h3>
              <p style={{
                color: 'var(--text-secondary)',
                lineHeight: '1.6',
                margin: 0
              }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div style={{
        background: 'linear-gradient(135deg, var(--accent-color), var(--accent-dark))',
        color: 'white',
        padding: '80px 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <h2 style={{
            fontSize: '2.5rem',
            marginBottom: '24px',
            fontWeight: '700'
          }}>
            Ready to Start Reading?
          </h2>
          <p style={{
            fontSize: '1.2rem',
            marginBottom: '40px',
            opacity: 0.95,
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
            lineHeight: '1.6'
          }}>
            Join thousands of readers who have discovered their next favorite book with us.
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/order" className="btn btn-secondary" style={{ fontSize: '1.1rem', padding: '16px 32px' }}>
              🛒 Browse Books
            </Link>
            <Link to="/about" className="btn" style={{
              fontSize: '1.1rem',
              padding: '16px 32px',
              background: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              border: '2px solid white',
              borderRadius: '12px',
              textDecoration: 'none',
              fontWeight: '600',
              transition: 'all 0.3s ease'
            }}>
              📖 Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Cart Section */}
      {cart.length > 0 && (
        <div className="card" style={{ marginBottom: '32px', padding: '24px' }}>
          <h2 style={{ marginBottom: '16px' }}>Shopping Cart ({cart.length} items)</h2>
          {cart.map(item => (
            <div key={item.id} style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: '12px 0',
              borderBottom: '1px solid #e5e7eb'
            }}>
              <div>
                <h4>{item.title}</h4>
                <p style={{ color: '#6b7280' }}>by {item.author}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    style={{ padding: '4px 8px', border: '1px solid #d1d5db', borderRadius: '4px' }}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    style={{ padding: '4px 8px', border: '1px solid #d1d5db', borderRadius: '4px' }}
                  >
                    +
                  </button>
                </div>
                <span style={{ fontWeight: '600' }}>${(item.quantity * 15.99).toFixed(2)}</span>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  style={{ 
                    padding: '8px 12px', 
                    background: '#ef4444', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginTop: '16px',
            paddingTop: '16px',
            borderTop: '2px solid #e5e7eb'
          }}>
            <h3>Total: ${getTotalPrice().toFixed(2)}</h3>
            <button onClick={handleCheckout} className="btn btn-primary">
              {user ? 'Checkout' : 'Login to Checkout'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home; 