import React from 'react';

const BookCard = ({ book, onAddToCart, onBookClick }) => {
  const handleCardClick = (e) => {
    // Don't trigger if clicking on the button
    if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
      return;
    }
    onBookClick(book);
  };

  return (
    <div 
      className="card" 
      style={{ 
        padding: '24px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
      onClick={handleCardClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-xl)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
      }}
    >
      {/* Book Cover */}
      <div style={{
        width: '100%',
        height: '200px',
        borderRadius: '12px',
        overflow: 'hidden',
        marginBottom: '20px',
        boxShadow: 'var(--shadow-sm)',
        position: 'relative'
      }}>
        <img
          src={book.cover || 'https://via.placeholder.com/300x400?text=No+Cover'}
          alt={book.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
          }}
        />
        <div style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          background: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          padding: '4px 8px',
          borderRadius: '12px',
          fontSize: '0.8rem',
          fontWeight: '600'
        }}>
          ₹{book.price}
        </div>
      </div>

      {/* Book Info */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ 
          marginBottom: '8px', 
          color: 'var(--text-primary)',
          fontSize: '1.1rem',
          fontWeight: '600',
          lineHeight: '1.3',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          minHeight: '2.6rem'
        }}>
          {book.title}
        </h3>
        
        <p style={{ 
          color: 'var(--text-secondary)', 
          marginBottom: '12px',
          fontWeight: '500',
          fontSize: '0.9rem',
          fontStyle: 'italic'
        }}>
          by {book.author}
        </p>
        
        {book.publishYear && (
          <p style={{ 
            color: 'var(--text-muted)', 
            marginBottom: '16px',
            fontSize: '0.8rem'
          }}>
            📅 {book.publishYear}
          </p>
        )}

        {/* Categories */}
        {book.subjects && book.subjects.length > 0 && (
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '6px',
            marginBottom: '20px'
          }}>
            {book.subjects.slice(0, 2).map((subject, index) => (
              <span key={index} style={{
                padding: '3px 8px',
                background: 'var(--bg-tertiary)',
                color: 'var(--text-secondary)',
                borderRadius: '12px',
                fontSize: '0.7rem',
                fontWeight: '500'
              }}>
                {subject.length > 15 ? subject.substring(0, 15) + '...' : subject}
              </span>
            ))}
            {book.subjects.length > 2 && (
              <span style={{
                padding: '3px 8px',
                background: 'var(--primary-light)',
                color: 'var(--primary-dark)',
                borderRadius: '12px',
                fontSize: '0.7rem',
                fontWeight: '600'
              }}>
                +{book.subjects.length - 2} more
              </span>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ 
          marginTop: 'auto',
          display: 'flex',
          gap: '8px'
        }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onBookClick(book);
            }}
            className="btn btn-primary"
            style={{ 
              flex: 1,
              fontSize: '0.9rem',
              padding: '10px 16px'
            }}
          >
            👁️ View Details
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(book);
            }}
            className="btn btn-accent"
            style={{ 
              flex: 1,
              fontSize: '0.9rem',
              padding: '10px 16px'
            }}
          >
            🛒 Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard; 