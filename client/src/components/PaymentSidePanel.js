import React, { useState } from 'react';

const PaymentSidePanel = ({ isOpen, onClose, totalAmount, onPlaceOrder }) => {
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    onPlaceOrder();
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      width: '400px',
      height: '100%',
      background: 'white',
      boxShadow: '0 0 20px rgba(0,0,0,0.2)',
      zIndex: 120, // Higher z-index to appear over cart panel
      display: 'flex',
      flexDirection: 'column',
      padding: '20px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
        <h2>Payment</h2>
        <button onClick={onClose}>&times;</button>
      </div>
      
      <form onSubmit={handleSubmit} style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingTop: '20px' }}>
        <div>
          <label>Card Number</label>
          <input type="text" name="cardNumber" value={paymentData.cardNumber} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Card Name</label>
          <input type="text" name="cardName" value={paymentData.cardName} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Expiry Date (MM/YY)</label>
          <input type="text" name="expiryDate" value={paymentData.expiryDate} onChange={handleInputChange} required />
        </div>
        <div>
          <label>CVV</label>
          <input type="text" name="cvv" value={paymentData.cvv} onChange={handleInputChange} required />
        </div>
        
        <div style={{ marginTop: 'auto' }}>
          <h3>Total: ₹{totalAmount.toFixed(2)}</h3>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Processing...' : `Pay ₹${totalAmount.toFixed(2)}`}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentSidePanel; 