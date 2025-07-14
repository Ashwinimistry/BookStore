import React, { useState } from 'react';

const PaymentPanel = ({ isOpen, onClose, cart, onCheckout, user }) => {
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    address: '',
    city: '',
    zipCode: ''
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.quantity * 15.99), 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      onCheckout();
      setLoading(false);
      onClose();
      setPaymentData({
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: '',
        address: '',
        city: '',
        zipCode: ''
      });
    }, 2000);
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  return (
    <>
      <div className={`side-panel-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}></div>
      <div className={`side-panel ${isOpen ? 'open' : ''}`}>
        <div style={{ padding: '24px' }}>
          {/* Header */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '24px',
            paddingBottom: '16px',
            borderBottom: '2px solid var(--bg-tertiary)'
          }}>
            <h2 style={{ color: 'var(--text-primary)', margin: 0 }}>💳 Payment</h2>
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

          {/* Cart Summary */}
          <div className="card" style={{ marginBottom: '24px', padding: '20px' }}>
            <h3 style={{ marginBottom: '16px', color: 'var(--text-primary)' }}>Order Summary</h3>
            {cart.map(item => (
              <div key={item.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 0',
                borderBottom: '1px solid var(--bg-tertiary)'
              }}>
                <div>
                  <p style={{ margin: 0, fontWeight: '600', color: 'var(--text-primary)' }}>
                    {item.title}
                  </p>
                  <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-secondary)' }}>
                    Qty: {item.quantity}
                  </p>
                </div>
                <span style={{ fontWeight: '600', color: 'var(--accent-dark)' }}>
                  ${(item.quantity * 15.99).toFixed(2)}
                </span>
              </div>
            ))}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '16px',
              paddingTop: '16px',
              borderTop: '2px solid var(--bg-tertiary)',
              fontSize: '18px',
              fontWeight: '700'
            }}>
              <span>Total:</span>
              <span style={{ color: 'var(--accent-dark)' }}>${getTotalPrice().toFixed(2)}</span>
            </div>
          </div>

          {/* Payment Form */}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="cardNumber">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={paymentData.cardNumber}
                onChange={(e) => setPaymentData(prev => ({
                  ...prev,
                  cardNumber: formatCardNumber(e.target.value)
                }))}
                placeholder="1234 5678 9012 3456"
                maxLength="19"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="cardName">Cardholder Name</label>
              <input
                type="text"
                id="cardName"
                name="cardName"
                value={paymentData.cardName}
                onChange={handleInputChange}
                placeholder="John Doe"
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label htmlFor="expiryDate">Expiry Date</label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  value={paymentData.expiryDate}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                  maxLength="5"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="cvv">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={paymentData.cvv}
                  onChange={handleInputChange}
                  placeholder="123"
                  maxLength="4"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="address">Shipping Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={paymentData.address}
                onChange={handleInputChange}
                placeholder="123 Main Street"
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={paymentData.city}
                  onChange={handleInputChange}
                  placeholder="New York"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="zipCode">ZIP Code</label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={paymentData.zipCode}
                  onChange={handleInputChange}
                  placeholder="10001"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-accent"
              style={{ width: '100%', marginTop: '24px' }}
              disabled={loading}
            >
              {loading ? 'Processing Payment...' : `Pay $${getTotalPrice().toFixed(2)}`}
            </button>
          </form>

          {/* Security Notice */}
          <div style={{
            marginTop: '24px',
            padding: '16px',
            background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
            borderRadius: '12px',
            border: '1px solid #fbbf24'
          }}>
            <p style={{ margin: 0, fontSize: '14px', color: 'var(--warning)', textAlign: 'center' }}>
              🔒 Your payment information is secure and encrypted
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPanel; 