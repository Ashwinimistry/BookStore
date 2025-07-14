import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: '📧',
      title: 'Email',
      details: 'support@bookstore.com',
      description: 'We\'ll respond within 24 hours'
    },
    {
      icon: '📞',
      title: 'Phone',
      details: '+1 (555) 123-4567',
      description: 'Mon-Fri 9AM-6PM EST'
    },
    {
      icon: '📍',
      title: 'Address',
      details: '123 Book Street, NY 10001',
      description: 'Visit our office anytime'
    },
    {
      icon: '💬',
      title: 'Live Chat',
      details: 'Available 24/7',
      description: 'Get instant help online'
    }
  ];

  const faqs = [
    {
      question: 'How do I track my order?',
      answer: 'You can track your order by logging into your account and visiting the "My Orders" section. You\'ll receive email updates at each stage of your order.'
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for all books in their original condition. Simply contact our customer service team to initiate a return.'
    },
    {
      question: 'Do you ship internationally?',
      answer: 'Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location. You can check shipping options during checkout.'
    },
    {
      question: 'How can I cancel my order?',
      answer: 'You can cancel your order within 1 hour of placing it by contacting our customer service team. After that, the order will be processed and shipped.'
    }
  ];

  return (
    <div className="container">
      {/* Hero Section */}
      <div style={{ 
        background: 'linear-gradient(135deg, var(--accent-color), var(--accent-dark))',
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
          Get in Touch
        </h1>
        <p style={{ 
          fontSize: '1.3rem', 
          opacity: 0.95,
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
      </div>

      {/* Contact Form and Info */}
      <div style={{ marginBottom: '60px' }}>
        <div className="grid grid-2">
          {/* Contact Form */}
          <div className="card" style={{ padding: '40px' }}>
            <h2 style={{ marginBottom: '32px', color: 'var(--text-primary)' }}>
              📝 Send us a Message
            </h2>
            
            {success && (
              <div className="alert alert-success">
                ✅ Thank you for your message! We'll get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="order">Order Support</option>
                  <option value="technical">Technical Issue</option>
                  <option value="feedback">Feedback</option>
                  <option value="partnership">Partnership</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help you..."
                  rows="6"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn btn-accent"
                style={{ width: '100%' }}
                disabled={loading}
              >
                {loading ? 'Sending Message...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <h2 style={{ marginBottom: '32px', color: 'var(--text-primary)' }}>
              📞 Contact Information
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {contactInfo.map((info, index) => (
                <div key={index} className="card" style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ 
                      fontSize: '2rem',
                      background: 'linear-gradient(135deg, var(--primary-color), var(--accent-color))',
                      borderRadius: '50%',
                      width: '60px',
                      height: '60px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white'
                    }}>
                      {info.icon}
                    </div>
                    <div>
                      <h3 style={{ marginBottom: '4px', color: 'var(--text-primary)' }}>
                        {info.title}
                      </h3>
                      <p style={{ 
                        marginBottom: '4px', 
                        color: 'var(--primary-color)', 
                        fontWeight: '600',
                        fontSize: '1.1rem'
                      }}>
                        {info.details}
                      </p>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                        {info.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div style={{ marginBottom: '60px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '40px', color: 'var(--text-primary)' }}>
          ❓ Frequently Asked Questions
        </h2>
        <div className="grid grid-2">
          {faqs.map((faq, index) => (
            <div key={index} className="card" style={{ padding: '32px' }}>
              <h3 style={{ 
                marginBottom: '16px', 
                color: 'var(--text-primary)',
                fontSize: '1.2rem'
              }}>
                {faq.question}
              </h3>
              <p style={{ 
                color: 'var(--text-secondary)', 
                lineHeight: '1.6',
                margin: 0
              }}>
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Office Hours */}
      <div className="card" style={{ padding: '40px', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '24px', color: 'var(--text-primary)' }}>
          🕒 Office Hours
        </h2>
        <div className="grid grid-4" style={{ marginBottom: '32px' }}>
          <div>
            <h4 style={{ color: 'var(--primary-color)', marginBottom: '8px' }}>Monday - Friday</h4>
            <p style={{ color: 'var(--text-secondary)' }}>9:00 AM - 6:00 PM</p>
          </div>
          <div>
            <h4 style={{ color: 'var(--primary-color)', marginBottom: '8px' }}>Saturday</h4>
            <p style={{ color: 'var(--text-secondary)' }}>10:00 AM - 4:00 PM</p>
          </div>
          <div>
            <h4 style={{ color: 'var(--primary-color)', marginBottom: '8px' }}>Sunday</h4>
            <p style={{ color: 'var(--text-secondary)' }}>Closed</p>
          </div>
          <div>
            <h4 style={{ color: 'var(--primary-color)', marginBottom: '8px' }}>Holidays</h4>
            <p style={{ color: 'var(--text-secondary)' }}>Closed</p>
          </div>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
          Need immediate assistance? Our live chat is available 24/7 for urgent matters.
        </p>
      </div>
    </div>
  );
};

export default Contact; 