import React, { useState } from 'react';

const Reviews = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: 'Sarah M.',
      rating: 5,
      date: '2024-01-15',
      title: 'Amazing Book Selection!',
      comment: 'I love the variety of books available here. The search function works perfectly and I found exactly what I was looking for. Fast shipping too!',
      verified: true
    },
    {
      id: 2,
      name: 'Michael R.',
      rating: 5,
      date: '2024-01-12',
      title: 'Excellent Customer Service',
      comment: 'Had an issue with my order and the customer service team was incredibly helpful. They resolved everything quickly and professionally.',
      verified: true
    },
    {
      id: 3,
      name: 'Emily T.',
      rating: 4,
      date: '2024-01-10',
      title: 'Great Prices and Quality',
      comment: 'The books are in excellent condition and the prices are very competitive. Will definitely order again!',
      verified: true
    },
    {
      id: 4,
      name: 'David L.',
      rating: 5,
      date: '2024-01-08',
      title: 'Perfect for Book Lovers',
      comment: 'As an avid reader, I appreciate the detailed book descriptions and recommendations. The website is easy to navigate.',
      verified: true
    },
    {
      id: 5,
      name: 'Jessica K.',
      rating: 4,
      date: '2024-01-05',
      title: 'Reliable and Fast',
      comment: 'Orders arrive quickly and are always well-packaged. The book quality is consistently good.',
      verified: true
    },
    {
      id: 6,
      name: 'Robert P.',
      rating: 5,
      date: '2024-01-03',
      title: 'Best Online Bookstore',
      comment: 'I\'ve tried many online bookstores, but this one is by far the best. Great selection, fair prices, and excellent service.',
      verified: true
    }
  ]);

  const [newReview, setNewReview] = useState({
    name: '',
    rating: 5,
    title: '',
    comment: ''
  });
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      const review = {
        id: reviews.length + 1,
        ...newReview,
        date: new Date().toISOString().split('T')[0],
        verified: false
      };

      setReviews(prev => [review, ...prev]);
      setNewReview({ name: '', rating: 5, title: '', comment: '' });
      setShowForm(false);
      setSubmitting(false);
    }, 1500);
  };

  const getAverageRating = () => {
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  const getRatingCount = (rating) => {
    return reviews.filter(review => review.rating === rating).length;
  };

  const renderStars = (rating) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const stats = [
    { label: 'Total Reviews', value: reviews.length },
    { label: 'Average Rating', value: getAverageRating() },
    { label: '5-Star Reviews', value: getRatingCount(5) },
    { label: 'Verified Buyers', value: reviews.filter(r => r.verified).length }
  ];

  return (
    <div className="container">
      {/* Hero Section */}
      <div style={{ 
        background: 'linear-gradient(135deg, var(--secondary-color), var(--secondary-dark))',
        color: 'white',
        padding: '80px 0',
        borderRadius: '20px',
        marginBottom: '60px',
        textAlign: 'center'
      }}>
        <h1 style={{ 
          fontSize: '3.5rem', 
          marginBottom: '20px',
          fontWeight: '700'
        }}>
          Customer Reviews
        </h1>
        <p style={{ 
          fontSize: '1.3rem', 
          opacity: 0.95,
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          See what our customers are saying about their experience with BookStore.
        </p>
      </div>

      {/* Stats Section */}
      <div style={{ marginBottom: '60px' }}>
        <div className="grid grid-4">
          {stats.map((stat, index) => (
            <div key={index} className="card" style={{ padding: '32px', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--primary-color)', marginBottom: '8px' }}>
                {stat.value}
              </div>
              <p style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Rating Distribution */}
      <div style={{ marginBottom: '60px' }}>
        <div className="grid grid-2">
          <div className="card" style={{ padding: '32px' }}>
            <h2 style={{ marginBottom: '24px', color: 'var(--text-primary)' }}>
              📊 Rating Distribution
            </h2>
            {[5, 4, 3, 2, 1].map(rating => {
              const count = getRatingCount(rating);
              const percentage = ((count / reviews.length) * 100).toFixed(1);
              return (
                <div key={rating} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '16px',
                  marginBottom: '12px'
                }}>
                  <span style={{ minWidth: '60px', color: 'var(--text-secondary)' }}>
                    {rating} ⭐
                  </span>
                  <div style={{ 
                    flex: 1, 
                    height: '8px', 
                    background: 'var(--bg-tertiary)', 
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${percentage}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, var(--secondary-color), var(--secondary-dark))',
                      borderRadius: '4px'
                    }}></div>
                  </div>
                  <span style={{ minWidth: '40px', color: 'var(--text-secondary)', fontSize: '14px' }}>
                    {count}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="card" style={{ padding: '32px', textAlign: 'center' }}>
            <h2 style={{ marginBottom: '24px', color: 'var(--text-primary)' }}>
              🎯 Overall Rating
            </h2>
            <div style={{ fontSize: '4rem', marginBottom: '16px' }}>
              {renderStars(Math.round(getAverageRating()))}
            </div>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--primary-color)', marginBottom: '8px' }}>
              {getAverageRating()}/5
            </div>
            <p style={{ color: 'var(--text-secondary)' }}>
              Based on {reviews.length} reviews
            </p>
            <button 
              onClick={() => setShowForm(true)}
              className="btn btn-primary"
              style={{ marginTop: '24px' }}
            >
              Write a Review
            </button>
          </div>
        </div>
      </div>

      {/* Review Form */}
      {showForm && (
        <div className="card" style={{ padding: '40px', marginBottom: '60px' }}>
          <h2 style={{ marginBottom: '32px', color: 'var(--text-primary)' }}>
            ✍️ Write Your Review
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={newReview.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="rating">Rating</label>
              <select
                id="rating"
                name="rating"
                value={newReview.rating}
                onChange={handleInputChange}
                required
              >
                <option value="5">⭐⭐⭐⭐⭐ Excellent (5)</option>
                <option value="4">⭐⭐⭐⭐ Very Good (4)</option>
                <option value="3">⭐⭐⭐ Good (3)</option>
                <option value="2">⭐⭐ Fair (2)</option>
                <option value="1">⭐ Poor (1)</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="title">Review Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={newReview.title}
                onChange={handleInputChange}
                placeholder="Summarize your experience"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="comment">Your Review</label>
              <textarea
                id="comment"
                name="comment"
                value={newReview.comment}
                onChange={handleInputChange}
                placeholder="Share your experience with BookStore..."
                rows="6"
                required
              ></textarea>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <button
                type="submit"
                className="btn btn-accent"
                disabled={submitting}
              >
                {submitting ? 'Submitting...' : 'Submit Review'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Reviews List */}
      <div>
        <h2 style={{ marginBottom: '40px', color: 'var(--text-primary)' }}>
          💬 Customer Reviews
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {reviews.map(review => (
            <div key={review.id} className="card" style={{ padding: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ marginBottom: '8px', color: 'var(--text-primary)' }}>
                    {review.title}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>
                      {renderStars(review.rating)}
                    </span>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                      by {review.name}
                    </span>
                    {review.verified && (
                      <span style={{ 
                        background: 'var(--accent-color)', 
                        color: 'white', 
                        padding: '2px 8px', 
                        borderRadius: '12px', 
                        fontSize: '12px',
                        fontWeight: '600'
                      }}>
                        ✓ Verified
                      </span>
                    )}
                  </div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <p style={{ 
                color: 'var(--text-secondary)', 
                lineHeight: '1.6',
                margin: 0,
                fontSize: '1.1rem'
              }}>
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews; 