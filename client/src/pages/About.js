import React from 'react';

const About = () => {
  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      image: '👩‍💼',
      bio: 'Passionate about making literature accessible to everyone.'
    },
    {
      name: 'Michael Chen',
      role: 'Head of Technology',
      image: '👨‍💻',
      bio: 'Building the future of online book retailing.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Customer Experience',
      image: '👩‍🎨',
      bio: 'Ensuring every customer has an amazing shopping experience.'
    },
    {
      name: 'David Thompson',
      role: 'Operations Manager',
      image: '👨‍🏭',
      bio: 'Keeping our operations smooth and efficient.'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Books Available' },
    { number: '10K+', label: 'Happy Customers' },
    { number: '24/7', label: 'Customer Support' },
    { number: '99%', label: 'Satisfaction Rate' }
  ];

  return (
    <div className="container">
      {/* Hero Section */}
      <div style={{ 
        background: 'linear-gradient(135deg, var(--primary-color), var(--primary-dark))',
        color: 'white',
        padding: '80px 0',
        borderRadius: '20px',
        marginBottom: '60px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=2128&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.2,
          zIndex: 1
        }}></div>
        
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h1 style={{ 
            fontSize: '3.5rem', 
            marginBottom: '20px',
            fontWeight: '700'
          }}>
            About BookStore
          </h1>
          <p style={{ 
            fontSize: '1.3rem', 
            opacity: 0.95,
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Your trusted destination for discovering and purchasing amazing books from around the world.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div style={{ marginBottom: '60px' }}>
        <div className="grid grid-2">
          <div className="card" style={{ padding: '40px' }}>
            <h2 style={{ marginBottom: '24px', color: 'var(--text-primary)' }}>
              🎯 Our Mission
            </h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '1.1rem' }}>
              We believe that books have the power to transform lives. Our mission is to make quality literature 
              accessible to everyone, everywhere. Through our carefully curated collection and exceptional service, 
              we connect readers with stories that inspire, educate, and entertain.
            </p>
          </div>
          
          <div className="card" style={{ padding: '40px' }}>
            <h2 style={{ marginBottom: '24px', color: 'var(--text-primary)' }}>
              🌟 Our Vision
            </h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '1.1rem' }}>
              To become the world's most customer-centric online bookstore, where every reader finds their 
              perfect book and every author reaches their audience. We envision a world where knowledge and 
              imagination know no boundaries.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div style={{ marginBottom: '60px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '40px', color: 'var(--text-primary)' }}>
          📊 Our Numbers
        </h2>
        <div className="grid grid-4">
          {stats.map((stat, index) => (
            <div key={index} className="card" style={{ padding: '32px', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: '700', color: 'var(--primary-color)', marginBottom: '8px' }}>
                {stat.number}
              </div>
              <p style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Values Section */}
      <div style={{ marginBottom: '60px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '40px', color: 'var(--text-primary)' }}>
          💎 Our Values
        </h2>
        <div className="grid grid-3">
          <div className="card" style={{ padding: '32px', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🤝</div>
            <h3 style={{ marginBottom: '16px', color: 'var(--text-primary)' }}>Trust</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              We build lasting relationships with our customers through transparency and reliability.
            </p>
          </div>
          
          <div className="card" style={{ padding: '32px', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🚀</div>
            <h3 style={{ marginBottom: '16px', color: 'var(--text-primary)' }}>Innovation</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              We continuously improve our platform to provide the best shopping experience.
            </p>
          </div>
          
          <div className="card" style={{ padding: '32px', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>❤️</div>
            <h3 style={{ marginBottom: '16px', color: 'var(--text-primary)' }}>Passion</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Our love for books drives everything we do and every decision we make.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div style={{ marginBottom: '60px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '40px', color: 'var(--text-primary)' }}>
          👥 Meet Our Team
        </h2>
        <div className="grid grid-4">
          {teamMembers.map((member, index) => (
            <div key={index} className="card" style={{ padding: '32px', textAlign: 'center' }}>
              <div style={{ 
                fontSize: '4rem', 
                marginBottom: '16px',
                background: 'linear-gradient(135deg, var(--primary-color), var(--accent-color))',
                borderRadius: '50%',
                width: '80px',
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                color: 'white'
              }}>
                {member.image}
              </div>
              <h3 style={{ marginBottom: '8px', color: 'var(--text-primary)' }}>
                {member.name}
              </h3>
              <p style={{ 
                color: 'var(--primary-color)', 
                fontWeight: '600',
                marginBottom: '12px',
                fontSize: '14px'
              }}>
                {member.role}
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '14px' }}>
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Story Section */}
      <div className="card" style={{ padding: '40px', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '24px', color: 'var(--text-primary)' }}>
          📖 Our Story
        </h2>
        <p style={{ 
          color: 'var(--text-secondary)', 
          lineHeight: '1.8', 
          fontSize: '1.1rem',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          Founded in 2024, BookStore began as a small passion project with a big dream: to make the world's 
          best books accessible to everyone. What started as a simple online catalog has grown into a 
          comprehensive platform serving thousands of readers worldwide. Our journey has been driven by 
          the belief that every book has the potential to change a life, and every reader deserves to 
          find their perfect story.
        </p>
        <div style={{ marginTop: '32px' }}>
          <button className="btn btn-primary">
            Join Our Journey
          </button>
        </div>
      </div>
    </div>
  );
};

export default About; 