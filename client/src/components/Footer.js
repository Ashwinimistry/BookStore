import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{
      background: 'linear-gradient(135deg, var(--text-primary), var(--text-secondary))',
      color: 'white',
      padding: '60px 0 40px',
      marginTop: 'auto'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '40px',
          marginBottom: '40px'
        }}>
          {/* Company Info */}
          <div>
            <h3 style={{ 
              marginBottom: '20px', 
              fontSize: '1.5rem',
              fontWeight: '700'
            }}>
              📚 BookStore
            </h3>
            <p style={{ 
              lineHeight: '1.6', 
              marginBottom: '20px',
              opacity: 0.9
            }}>
              Your trusted destination for discovering and purchasing amazing books from around the world.
            </p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <a href="#" style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
                color: 'white',
                transition: 'all 0.3s ease'
              }}>
                📘
              </a>
              <a href="#" style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
                color: 'white',
                transition: 'all 0.3s ease'
              }}>
                📖
              </a>
              <a href="#" style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
                color: 'white',
                transition: 'all 0.3s ease'
              }}>
                📚
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ 
              marginBottom: '20px', 
              fontSize: '1.2rem',
              fontWeight: '600'
            }}>
              Quick Links
            </h4>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              <li style={{ marginBottom: '12px' }}>
                <Link to="/" style={{
                  color: 'white',
                  textDecoration: 'none',
                  opacity: 0.9,
                  transition: 'opacity 0.3s ease'
                }}>
                  Home
                </Link>
              </li>
              <li style={{ marginBottom: '12px' }}>
                <Link to="/order" style={{
                  color: 'white',
                  textDecoration: 'none',
                  opacity: 0.9,
                  transition: 'opacity 0.3s ease'
                }}>
                  Browse Books
                </Link>
              </li>
              <li style={{ marginBottom: '12px' }}>
                <Link to="/about" style={{
                  color: 'white',
                  textDecoration: 'none',
                  opacity: 0.9,
                  transition: 'opacity 0.3s ease'
                }}>
                  About Us
                </Link>
              </li>
              <li style={{ marginBottom: '12px' }}>
                <Link to="/reviews" style={{
                  color: 'white',
                  textDecoration: 'none',
                  opacity: 0.9,
                  transition: 'opacity 0.3s ease'
                }}>
                  Customer Reviews
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 style={{ 
              marginBottom: '20px', 
              fontSize: '1.2rem',
              fontWeight: '600'
            }}>
              Support
            </h4>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              <li style={{ marginBottom: '12px' }}>
                <Link to="/contact" style={{
                  color: 'white',
                  textDecoration: 'none',
                  opacity: 0.9,
                  transition: 'opacity 0.3s ease'
                }}>
                  Contact Us
                </Link>
              </li>
              <li style={{ marginBottom: '12px' }}>
                <a href="#" style={{
                  color: 'white',
                  textDecoration: 'none',
                  opacity: 0.9,
                  transition: 'opacity 0.3s ease'
                }}>
                  Help Center
                </a>
              </li>
              <li style={{ marginBottom: '12px' }}>
                <a href="#" style={{
                  color: 'white',
                  textDecoration: 'none',
                  opacity: 0.9,
                  transition: 'opacity 0.3s ease'
                }}>
                  Shipping Info
                </a>
              </li>
              <li style={{ marginBottom: '12px' }}>
                <a href="#" style={{
                  color: 'white',
                  textDecoration: 'none',
                  opacity: 0.9,
                  transition: 'opacity 0.3s ease'
                }}>
                  Returns & Exchanges
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 style={{ 
              marginBottom: '20px', 
              fontSize: '1.2rem',
              fontWeight: '600'
            }}>
              Contact Info
            </h4>
            <div style={{ marginBottom: '16px' }}>
              <p style={{ margin: 0, opacity: 0.9 }}>
                📧 support@bookstore.com
              </p>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <p style={{ margin: 0, opacity: 0.9 }}>
                📞 +1 (555) 123-4567
              </p>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <p style={{ margin: 0, opacity: 0.9 }}>
                📍 123 Book Street, NY 10001
              </p>
            </div>
            <div>
              <p style={{ margin: 0, opacity: 0.9 }}>
                🕒 Mon-Fri 9AM-6PM EST
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.2)',
          paddingTop: '30px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <p style={{ margin: 0, opacity: 0.8 }}>
            © 2024 BookStore. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="#" style={{
              color: 'white',
              textDecoration: 'none',
              opacity: 0.8,
              fontSize: '14px'
            }}>
              Privacy Policy
            </a>
            <a href="#" style={{
              color: 'white',
              textDecoration: 'none',
              opacity: 0.8,
              fontSize: '14px'
            }}>
              Terms of Service
            </a>
            <a href="#" style={{
              color: 'white',
              textDecoration: 'none',
              opacity: 0.8,
              fontSize: '14px'
            }}>
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 