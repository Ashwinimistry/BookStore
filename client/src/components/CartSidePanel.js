import React from 'react';

const CartSidePanel = ({ isOpen, onClose, cart, onUpdateQuantity, onRemoveFromCart, onCheckout }) => {
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.quantity * item.price), 0).toFixed(2);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: isOpen ? 0 : '-100%',
      width: '400px',
      height: '100%',
      background: 'white',
      boxShadow: '0 0 20px rgba(0,0,0,0.2)',
      transition: 'right 0.3s ease-in-out',
      zIndex: 110,
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{
        padding: '20px',
        borderBottom: '1px solid #eee',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h2 style={{ margin: 0 }}>Your Cart</h2>
        <button onClick={onClose} style={{
          background: 'none',
          border: 'none',
          fontSize: '28px',
          cursor: 'pointer',
          color: 'var(--text-secondary)',
          padding: '4px',
          lineHeight: 1
        }}
        aria-label="Close cart panel"
        >
          ✕
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map(item => (
            <div key={item.id} style={{
              display: 'flex',
              marginBottom: '20px',
              borderBottom: '1px solid #eee',
              paddingBottom: '20px'
            }}>
              <img src={item.cover} alt={item.title} style={{ width: '80px', height: '120px', objectFit: 'cover', marginRight: '20px' }} />
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: '0 0 10px 0' }}>{item.title}</h4>
                <p style={{ margin: '0 0 10px 0', color: '#888' }}>by {item.author}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span style={{ margin: '0 10px' }}>{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <p style={{ margin: 0, fontWeight: 'bold' }}>₹{(item.price * item.quantity).toFixed(2)}</p>
                  <button onClick={() => onRemoveFromCart(item.id)} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}>Remove</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div style={{ padding: '20px', borderTop: '1px solid #eee' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h3 style={{ margin: 0 }}>Total:</h3>
          <h3 style={{ margin: 0 }}>₹{getTotalPrice()}</h3>
        </div>
        <button
          onClick={onCheckout}
          className="btn btn-primary"
          style={{ width: '100%', padding: '15px' }}
          disabled={cart.length === 0}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartSidePanel; 