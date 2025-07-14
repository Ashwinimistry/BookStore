import React from 'react';

const BookDetail = ({ book, isOpen, onClose, onAddToCart }) => {
  if (!isOpen || !book) return null;

  return (
    <>
      <div 
        className="side-panel-overlay open" 
        onClick={onClose}
        style={{ zIndex: 1000 }}
      ></div>
      <div className="side-panel open" style={{ zIndex: 1001 }}>
        <div style={{ padding: '24px', height: '100%', overflowY: 'auto' }}>
          {/* Header */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '24px',
            paddingBottom: '16px',
            borderBottom: '2px solid var(--bg-tertiary)'
          }}>
            <h2 style={{ color: 'var(--text-primary)', margin: 0 }}>📖 Book Details</h2>
            <button 
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: 'var(--text-secondary)',
                padding: '4px'
              }}
            >
              ✕
            </button>
          </div>

          {/* Book Cover and Basic Info */}
          <div style={{ 
            display: 'flex', 
            gap: '24px', 
            marginBottom: '32px',
            flexWrap: 'wrap'
          }}>
            <div style={{
              flexShrink: 0,
              width: '200px',
              height: '300px',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-lg)'
            }}>
              <img
                src={book.cover || 'https://via.placeholder.com/200x300?text=No+Cover'}
                alt={book.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
            
            <div style={{ flex: 1, minWidth: '250px' }}>
              <h1 style={{ 
                marginBottom: '12px', 
                color: 'var(--text-primary)',
                fontSize: '1.8rem',
                fontWeight: '700',
                lineHeight: '1.3'
              }}>
                {book.title}
              </h1>
              
              <p style={{ 
                color: 'var(--text-secondary)', 
                marginBottom: '16px',
                fontSize: '1.1rem',
                fontWeight: '500'
              }}>
                by {book.author}
              </p>
              
              {book.publishYear && (
                <p style={{ 
                  color: 'var(--text-muted)', 
                  marginBottom: '16px',
                  fontSize: '1rem'
                }}>
                  Published: {book.publishYear}
                </p>
              )}
              
              <div style={{
                color: 'var(--accent-dark)',
                fontWeight: '700',
                fontSize: '2rem',
                marginBottom: '24px'
              }}>
                $15.99
              </div>
              
              <button
                onClick={() => {
                  onAddToCart(book);
                  onClose();
                }}
                className="btn btn-accent"
                style={{ 
                  width: '100%',
                  fontSize: '1.1rem',
                  padding: '16px 24px'
                }}
              >
                🛒 Add to Cart
              </button>
            </div>
          </div>

          {/* Book Description */}
          <div className="card" style={{ padding: '24px', marginBottom: '24px' }}>
            <h3 style={{ 
              marginBottom: '16px', 
              color: 'var(--text-primary)',
              fontSize: '1.3rem',
              fontWeight: '600'
            }}>
              📝 Description
            </h3>
            <p style={{ 
              color: 'var(--text-secondary)', 
              lineHeight: '1.7',
              fontSize: '1rem'
            }}>
              {book.description || 
                "This captivating book offers readers an engaging journey through its pages. " +
                "With compelling storytelling and rich content, it's a must-read for anyone " +
                "interested in this genre. The author's unique perspective and writing style " +
                "make this book stand out from the rest."
              }
            </p>
          </div>

          {/* Book Details */}
          <div className="card" style={{ padding: '24px', marginBottom: '24px' }}>
            <h3 style={{ 
              marginBottom: '16px', 
              color: 'var(--text-primary)',
              fontSize: '1.3rem',
              fontWeight: '600'
            }}>
              📋 Book Details
            </h3>
            
            <div style={{ display: 'grid', gap: '16px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '12px 0',
                borderBottom: '1px solid var(--bg-tertiary)'
              }}>
                <span style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>
                  Title:
                </span>
                <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>
                  {book.title}
                </span>
              </div>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '12px 0',
                borderBottom: '1px solid var(--bg-tertiary)'
              }}>
                <span style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>
                  Author:
                </span>
                <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>
                  {book.author}
                </span>
              </div>
              
              {book.publishYear && (
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '12px 0',
                  borderBottom: '1px solid var(--bg-tertiary)'
                }}>
                  <span style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>
                    Published:
                  </span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>
                    {book.publishYear}
                  </span>
                </div>
              )}
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '12px 0',
                borderBottom: '1px solid var(--bg-tertiary)'
              }}>
                <span style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>
                  Price:
                </span>
                <span style={{ color: 'var(--accent-dark)', fontWeight: '700', fontSize: '1.1rem' }}>
                  $15.99
                </span>
              </div>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '12px 0'
              }}>
                <span style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>
                  Availability:
                </span>
                <span style={{ 
                  color: 'var(--success)', 
                  fontWeight: '600',
                  background: 'rgba(16, 185, 129, 0.1)',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '0.9rem'
                }}>
                  In Stock
                </span>
              </div>
            </div>
          </div>

          {/* Categories/Subjects */}
          {book.subjects && book.subjects.length > 0 && (
            <div className="card" style={{ padding: '24px', marginBottom: '24px' }}>
              <h3 style={{ 
                marginBottom: '16px', 
                color: 'var(--text-primary)',
                fontSize: '1.3rem',
                fontWeight: '600'
              }}>
                🏷️ Categories
              </h3>
              <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: '8px' 
              }}>
                {book.subjects.map((subject, index) => (
                  <span key={index} style={{
                    padding: '6px 12px',
                    background: 'var(--bg-tertiary)',
                    color: 'var(--text-secondary)',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    fontWeight: '500'
                  }}>
                    {subject}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Additional Actions */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={() => {
                onAddToCart(book);
                onClose();
              }}
              className="btn btn-accent"
              style={{ flex: 1, minWidth: '120px' }}
            >
              🛒 Add to Cart
            </button>
            <button
              onClick={onClose}
              className="btn btn-secondary"
              style={{ flex: 1, minWidth: '120px' }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookDetail; 