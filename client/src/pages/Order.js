import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BookCard from '../components/BookCard';
import BookDetail from '../components/BookDetail';
import PaymentPanel from '../components/PaymentPanel';

const Order = ({ user, addToCart }) => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [bookSearchSubject, setBookSearchSubject] = useState('love');
  const [activeTab, setActiveTab] = useState('search'); // 'search' or 'orders'
  const [showPaymentPanel, setShowPaymentPanel] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showBookDetail, setShowBookDetail] = useState(false);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [ordersError, setOrdersError] = useState('');

  useEffect(() => {
    // Fetch orders if a user is logged in OR a token exists in storage.
    // This handles the case where the user state hasn't updated yet after login.
    const token = localStorage.getItem('token');
    if (user || token) {
      fetchOrders();
    } else {
      // If no user and no token, don't attempt to fetch orders.
      setOrdersLoading(false);
    }
    fetchBooks();
  }, [user]);

  useEffect(() => {
    filterOrders();
  }, [orders, searchTerm, statusFilter]);

  const fetchOrders = async () => {
    setOrdersLoading(true);
    setOrdersError('');
    try {
      const token = localStorage.getItem('token');
      
      if (token) {
        const response = await axios.get('/api/orders', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        // Axios automatically throws on non-2xx status codes
        // If we reach here, the request was successful
        setOrders(response.data);
      } else {
        const localOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        setOrders(localOrders);
      }
      
      setError('');
    } catch (error) {
      console.error('Error fetching orders:', error);
      const localOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      setOrders(localOrders);
      setOrdersError(error.response?.data?.message || error.message || 'Failed to fetch orders');
    } finally {
      setLoading(false);
      setOrdersLoading(false);
    }
  };

  const fetchBooks = async (subject = bookSearchSubject) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/books?subject=${subject}&limit=20`);
      setBooks(response.data.books);
      setError('');
    } catch (error) {
      setError('Failed to fetch books');
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookSearch = () => {
    fetchBooks(bookSearchSubject);
  };

  const handleCategoryClick = (category) => {
    setBookSearchSubject(category);
    fetchBooks(category);
  };

  const filterOrders = () => {
    let filtered = orders;

    if (searchTerm) {
      filtered = filtered.filter(order => 
        String(order.id).toLowerCase().includes(searchTerm.toLowerCase()) ||
        (order.items && order.items.some(book => 
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (book.author && book.author.toLowerCase().includes(searchTerm.toLowerCase()))
        ))
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    setFilteredOrders(filtered);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return '#f59e0b';
      case 'shipped':
        return '#3b82f6';
      case 'delivered':
        return '#10b981';
      case 'cancelled':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
  };

  const openPaymentPanel = () => {
    if (books.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    setShowPaymentPanel(true);
  };

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setShowBookDetail(true);
  };

  const closeBookDetail = () => {
    setShowBookDetail(false);
    setSelectedBook(null);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  // Show login prompt if user is not authenticated
  if (!user) {
    return (
      <div className="container">
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 0' }}>
          <div className="card" style={{ padding: '40px', textAlign: 'center' }}>
            <h1 style={{ marginBottom: '16px', color: '#1e293b' }}>
              🔐 Login Required
            </h1>
            <p style={{ color: '#6b7280', marginBottom: '24px', fontSize: '1.1rem' }}>
              You need to be logged in to access the order page. Please login or create an account to continue.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/login" className="btn btn-primary">
                Login
              </Link>
              <Link to="/register" className="btn btn-secondary">
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 0' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '40px', color: '#1e293b' }}>
          BookStore - Search & Orders
        </h1>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
          <div style={{ 
            display: 'flex', 
            background: '#f1f5f9', 
            borderRadius: '12px', 
            padding: '4px',
            gap: '4px'
          }}>
            <button
              onClick={() => setActiveTab('search')}
              style={{
                padding: '12px 24px',
                border: 'none',
                borderRadius: '8px',
                background: activeTab === 'search' ? '#3b82f6' : 'transparent',
                color: activeTab === 'search' ? 'white' : '#64748b',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '16px'
              }}
            >
              🔍 Search Books
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              style={{
                padding: '12px 24px',
                border: 'none',
                borderRadius: '8px',
                background: activeTab === 'orders' ? '#3b82f6' : 'transparent',
                color: activeTab === 'orders' ? 'white' : '#64748b',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '16px'
              }}
            >
              📦 My Orders
            </button>
          </div>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        {/* Search Books Tab */}
        {activeTab === 'search' && (
          <div>
            {/* Search Section */}
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ textAlign: 'center', marginBottom: '24px', color: '#1e293b' }}>
                Search Books by Category
              </h2>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
                <input
                  type="text"
                  value={bookSearchSubject}
                  onChange={(e) => setBookSearchSubject(e.target.value)}
                  placeholder="Search by subject (e.g., love, mystery, fantasy)"
                  style={{
                    padding: '12px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '16px',
                    minWidth: '300px'
                  }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleBookSearch();
                    }
                  }}
                />
                <button onClick={handleBookSearch} className="btn btn-primary">
                  Search
                </button>
              </div>
              
              {/* Quick Search Buttons */}
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '16px', flexWrap: 'wrap' }}>
                {['romance', 'mystery', 'fantasy', 'science', 'history', 'biography'].map(category => (
                  <button
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    style={{
                      padding: '8px 16px',
                      border: '1px solid #3b82f6',
                      background: bookSearchSubject === category ? '#3b82f6' : 'white',
                      color: bookSearchSubject === category ? 'white' : '#3b82f6',
                      borderRadius: '20px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      textTransform: 'capitalize'
                    }}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Cart Section */}
            {books.length > 0 && (
              <div className="card" style={{ marginBottom: '32px', padding: '24px' }}>
                <h2 style={{ marginBottom: '16px' }}>Shopping Cart ({books.length} items)</h2>
                <div className="grid grid-4" style={{ gap: '32px' }}>
                  {books.map(book => (
                    <BookCard 
                      key={book.id}
                      book={book} 
                      onAddToCart={() => addToCart(book)}
                      onBookClick={() => handleBookClick(book)}
                    />
                  ))}
                </div>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginTop: '16px',
                  paddingTop: '16px',
                  borderTop: '2px solid #e5e7eb'
                }}>
                  <h3>Total: ${(books.reduce((total, book) => total + (book.quantity * 15.99), 0)).toFixed(2)}</h3>
                  <button onClick={openPaymentPanel} className="btn btn-primary">
                    Checkout
                  </button>
                </div>
              </div>
            )}

            {/* Books Grid */}
            <div>
              <h2 style={{ marginBottom: '24px', textAlign: 'center' }}>
                Books about "{bookSearchSubject}" ({books.length} found)
              </h2>
              
              <div className="grid grid-4" style={{ gap: '32px' }}>
                {books.map(book => (
                  <BookCard 
                    key={book.id}
                    book={book} 
                    onAddToCart={() => addToCart(book)}
                    onBookClick={() => handleBookClick(book)}
                  />
                ))}
              </div>

              {books.length === 0 && !loading && (
                <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
                  No books found for "{bookSearchSubject}". Try a different search term.
                </div>
              )}
            </div>
          </div>
        )}

        {/* My Orders Tab */}
        {activeTab === 'orders' && (
          <div>
            {ordersLoading ? (
              <p>Loading orders...</p>
            ) : ordersError ? (
              <div className="alert alert-error">{ordersError}</div>
            ) : (
              <div>
                {filteredOrders.length === 0 ? (
                  <p>No orders found.</p>
                ) : (
                  filteredOrders.map(order => (
                    <div key={order.id} className="card" style={{ marginBottom: '20px', padding: '20px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <h4 style={{ margin: 0 }}>Order ID: {String(order.id).slice(0, 8)}...</h4>
                        <span style={{ color: getStatusColor(order.status), fontWeight: 'bold' }}>{order.status}</span>
                      </div>
                      <p style={{ margin: '0 0 10px 0', color: '#888' }}>{formatDate(order.created_at)}</p>
                      <div>
                        {order.items.map(item => (
                          <div key={item.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <img src={item.cover} alt={item.title} style={{ width: '40px', height: '60px', marginRight: '10px' }} />
                            <div>
                              <p style={{ margin: 0 }}>{item.title}</p>
                              <p style={{ margin: 0, color: '#888' }}>Qty: {item.quantity}</p>
                            </div>
                            <p style={{ margin: '0 0 0 auto', fontWeight: 'bold' }}>₹{(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        ))}
                      </div>
                      <h4 style={{ textAlign: 'right', margin: '10px 0 0 0' }}>Total: ₹{Number(order.total_amount).toFixed(2)}</h4>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Book Detail Modal */}
      <BookDetail
        book={selectedBook}
        isOpen={showBookDetail}
        onClose={closeBookDetail}
        onAddToCart={addToCart}
      />

      {/* Payment Panel */}
      <PaymentPanel
        isOpen={showPaymentPanel}
        onClose={() => setShowPaymentPanel(false)}
        cart={books}
        onCheckout={() => {
          // Implementation of handleCheckout function
        }}
        user={user}
      />
    </div>
  );
};

export default Order; 