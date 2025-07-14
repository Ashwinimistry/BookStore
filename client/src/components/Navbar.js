import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ user, onLogout, cart, onCartClick }) => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
    return () => document.body.classList.remove('menu-open');
  }, [menuOpen]);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Auth/cart/user section as a component for reuse
  const AuthSection = (
    user ? (
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '16px',
        width: '100%'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '8px 16px',
          background: 'var(--bg-secondary)',
          borderRadius: '20px'
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--primary-color), var(--accent-color))',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '600',
            fontSize: '14px'
          }}>
            {user.username.charAt(0).toUpperCase()}
          </div>
          <span style={{ color: 'var(--text-primary)', fontWeight: '500' }}>
            {user.username}
          </span>
        </div>
        <button 
          className="btn" 
          onClick={onCartClick}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            fontSize: '14px'
          }}
        >
          <span>🛒</span>
          <span>Cart</span>
          {getCartItemCount() > 0 && (
            <span style={{
              background: 'var(--primary-color)',
              color: 'white',
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: '600'
            }}>
              {getCartItemCount()}
            </span>
          )}
        </button>
        <button 
          onClick={onLogout} 
          className="btn btn-secondary"
          style={{ padding: '10px 20px', fontSize: '14px' }}
        >
          Logout
        </button>
      </div>
    ) : (
      <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
        <Link to="/login" className="btn btn-secondary" style={{ padding: '10px 20px', fontSize: '14px', width: '100%' }}>
          Login
        </Link>
        <Link to="/register" className="btn btn-primary" style={{ padding: '10px 20px', fontSize: '14px', width: '100%' }}>
          Register
        </Link>
      </div>
    )
  );

  return (
    <>
      <nav style={{
        background: 'var(--bg-primary)',
        boxShadow: 'var(--shadow-md)',
        position: 'sticky',
        top: 0,
        zIndex: 200,
        borderBottom: '1px solid var(--bg-tertiary)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '70px',
          position: 'relative'
        }}>
          <Link to="/" style={{
            fontSize: '1.8rem',
            fontWeight: '700',
            color: 'var(--primary-color)',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            📚 BookStore
          </Link>

          {/* Hamburger icon for mobile */}
          <button
            className="navbar-hamburger"
            aria-label="Toggle navigation menu"
            onClick={() => setMenuOpen((open) => !open)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              fontSize: '2rem',
              cursor: 'pointer',
              marginLeft: 'auto',
              zIndex: 202
            }}
          >
            {menuOpen ? <span role="img" aria-label="close">✕</span> : <span role="img" aria-label="menu">☰</span>}
          </button>

          {/* Desktop nav links */}
          <ul
            className={`navbar-links`}
            style={{
              display: 'flex',
              listStyle: 'none',
              margin: 0,
              padding: 0,
              gap: '8px',
              position: 'static',
              background: 'none',
              flexDirection: 'row',
              alignItems: 'center',
              transition: 'all 0.3s',
            }}
          >
            <li>
              <Link to="/" style={{
                padding: '12px 20px',
                textDecoration: 'none',
                color: isActive('/') ? 'var(--primary-color)' : 'var(--text-secondary)',
                fontWeight: isActive('/') ? '600' : '500',
                borderRadius: '12px',
                transition: 'all 0.3s ease',
                background: isActive('/') ? 'rgba(99, 102, 241, 0.1)' : 'transparent'
              }} onClick={() => setMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/order" style={{
                padding: '12px 20px',
                textDecoration: 'none',
                color: isActive('/order') ? 'var(--primary-color)' : 'var(--text-secondary)',
                fontWeight: isActive('/order') ? '600' : '500',
                borderRadius: '12px',
                transition: 'all 0.3s ease',
                background: isActive('/order') ? 'rgba(99, 102, 241, 0.1)' : 'transparent'
              }} onClick={() => setMenuOpen(false)}>
                Orders
              </Link>
            </li>
            <li>
              <Link to="/about" style={{
                padding: '12px 20px',
                textDecoration: 'none',
                color: isActive('/about') ? 'var(--primary-color)' : 'var(--text-secondary)',
                fontWeight: isActive('/about') ? '600' : '500',
                borderRadius: '12px',
                transition: 'all 0.3s ease',
                background: isActive('/about') ? 'rgba(99, 102, 241, 0.1)' : 'transparent'
              }} onClick={() => setMenuOpen(false)}>
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" style={{
                padding: '12px 20px',
                textDecoration: 'none',
                color: isActive('/contact') ? 'var(--primary-color)' : 'var(--text-secondary)',
                fontWeight: isActive('/contact') ? '600' : '500',
                borderRadius: '12px',
                transition: 'all 0.3s ease',
                background: isActive('/contact') ? 'rgba(99, 102, 241, 0.1)' : 'transparent'
              }} onClick={() => setMenuOpen(false)}>
                Contact
              </Link>
            </li>
            <li>
              <Link to="/reviews" style={{
                padding: '12px 20px',
                textDecoration: 'none',
                color: isActive('/reviews') ? 'var(--primary-color)' : 'var(--text-secondary)',
                fontWeight: isActive('/reviews') ? '600' : '500',
                borderRadius: '12px',
                transition: 'all 0.3s ease',
                background: isActive('/reviews') ? 'rgba(99, 102, 241, 0.1)' : 'transparent'
              }} onClick={() => setMenuOpen(false)}>
                Reviews
              </Link>
            </li>
            {/* Show auth/cart/user section in mobile menu (hidden by default, shown in overlay below) */}
          </ul>

          {/* Desktop auth/cart/user section (hidden on mobile) */}
          <div className="navbar-auth-desktop">
            {AuthSection}
          </div>
        </div>
      </nav>
      {/* Overlay and mobile menu rendered outside the navbar bar */}
      {menuOpen && <>
        <div className="navbar-overlay open" onClick={() => setMenuOpen(false)} />
        <ul className="navbar-links open" style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '80vw',
          maxWidth: '340px',
          height: '100vh',
          background: 'white',
          flexDirection: 'column',
          alignItems: 'flex-start',
          boxShadow: '-2px 0 8px rgba(0,0,0,0.08)',
          padding: '24px 0 12px 0',
          zIndex: 201,
          display: 'flex',
        }}>
          <button
            className="navbar-menu-close"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            style={{
              position: 'absolute',
              top: 12,
              right: 16,
              background: 'none',
              border: 'none',
              fontSize: '2.2rem',
              cursor: 'pointer',
              zIndex: 202
            }}
          >
            ✕
          </button>
          <li>
            <Link to="/" onClick={() => setMenuOpen(false)} style={{ padding: '12px 20px', width: '100%', display: 'block' }}>Home</Link>
          </li>
          <li>
            <Link to="/order" onClick={() => setMenuOpen(false)} style={{ padding: '12px 20px', width: '100%', display: 'block' }}>Orders</Link>
          </li>
          <li>
            <Link to="/about" onClick={() => setMenuOpen(false)} style={{ padding: '12px 20px', width: '100%', display: 'block' }}>About</Link>
          </li>
          <li>
            <Link to="/contact" onClick={() => setMenuOpen(false)} style={{ padding: '12px 20px', width: '100%', display: 'block' }}>Contact</Link>
          </li>
          <li>
            <Link to="/reviews" onClick={() => setMenuOpen(false)} style={{ padding: '12px 20px', width: '100%', display: 'block' }}>Reviews</Link>
          </li>
          <li className="navbar-auth-mobile" style={{ width: '100%', marginTop: '12px', padding: '0 16px', borderTop: '1px solid #eee', paddingTop: '12px', background: 'white' }}>
            {AuthSection}
          </li>
        </ul>
      </>}
    </>
  );
};

export default Navbar; 