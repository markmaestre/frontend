import React, { useState, useEffect } from 'react';
import './css/PrivacyPolicy.css';

const PrivacyPolicy = () => {
  const [showModal, setShowModal] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  // Track scroll position for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Add animation classes after component mounts
    const timer = setTimeout(() => {
      document.querySelector('.text-section').classList.add('animate-in');
      document.querySelector('.laptop-illustration').classList.add('animate-in');
      
      // Animate small elements with delay
      const smallElements = document.querySelectorAll('.person-icon, .cube-icon, .magnifier-icon');
      smallElements.forEach((element, index) => {
        setTimeout(() => {
          element.classList.add('animate-in');
        }, 300 + (index * 150));
      });
    }, 300);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);
  
  const toggleModal = () => {
    setShowModal(!showModal);
    
    if (!showModal) {
      // When opening modal, add animation class
      setTimeout(() => {
        const modalContent = document.querySelector('.modal-content');
        if (modalContent) {
          modalContent.classList.add('modal-animate-in');
        }
      }, 50);
    }
  };
  
  // Parallax style calculations based on scroll position
  const getParallaxStyle = (speed) => {
    return {
      transform: `translateY(${scrollPosition * speed}px)`,
    };
  };

  return (
    <div className="privacy-policy-container">
      {/* Floating Background Elements */}
      <div className="background-elements">
        <div className="floating-circle circle-1" style={getParallaxStyle(-0.03)}></div>
        <div className="floating-circle circle-2" style={getParallaxStyle(-0.05)}></div>
        <div className="floating-cloud cloud-1" style={getParallaxStyle(-0.02)}></div>
        <div className="floating-cloud cloud-2" style={getParallaxStyle(-0.07)}></div>
        <div className="floating-square square-1" style={getParallaxStyle(-0.04)}></div>
        <div className="floating-square square-2" style={getParallaxStyle(-0.06)}></div>
      </div>
      
      <div className="privacy-policy-content">
        <div className="text-section">
          <h1 className="animated-title">Privacy Policy</h1>
          
          <p className="description">
          Our Privacy Policy outlines how we collect, use, store, and protect your personal information when you interact with our services. It explains what data we collect, including personal details, browsing activity, and cookies, and how we use this information to improve our services, personalize user experiences, and comply with legal obligations.
          </p>
          
          <button className="read-more-btn pulse-animation" onClick={toggleModal}>
            Read more
          </button>
        </div>

        <div className="illustration-section" style={getParallaxStyle(0.04)}>
          <div className="laptop-illustration floating-animation">
            {/* Simplified laptop with shield icon */}
            <div className="laptop-screen">
              <div className="laptop-content">
                <div className="shield-icon pulse-slow"></div>
                <div className="document-lines">
                  <div className="line line-animate-1"></div>
                  <div className="line line-animate-2"></div>
                  <div className="line line-animate-3"></div>
                </div>
              </div>
            </div>
            <div className="laptop-base"></div>
          </div>
          
          {/* Small icons and people */}
          <div className="people-icons">
            <div className="person-icon person-1 floating-animation-slow"></div>
            <div className="person-icon person-2 floating-animation-medium"></div>
            <div className="person-icon person-3 floating-animation-slow"></div>
            <div className="magnifier-icon floating-animation-medium"></div>
            <div className="cube-icon cube-1 rotating-animation"></div>
            <div className="cube-icon cube-2 rotating-animation-reverse"></div>
            <div className="cube-icon cube-3 rotating-animation"></div>
          </div>
        </div>
      </div>

      {/* Modal popup */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Privacy Policy</h2>
              <button className="close-btn" onClick={toggleModal}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <h3 className="fade-in-item">1. Information We Collect</h3>
              <p className="fade-in-item">
                We collect information you provide directly to us, such as when you create or modify your account, 
                request customer service, or otherwise communicate with us.
              </p>
              
              <h3 className="fade-in-item">2. How We Use Your Information</h3>
              <p className="fade-in-item">
                We use the information we collect to provide, maintain, and improve our services, 
                develop new features, and protect our users.
              </p>

              <h3 className="fade-in-item">3. Information Sharing</h3>
              <p className="fade-in-item">
                We do not share your personal information with companies, organizations, or individuals outside 
                of our company except in the following cases:
              </p>
              <ul className="fade-in-item">
                <li>With your consent</li>
                <li>For legal reasons</li>
                <li>With our service providers</li>
              </ul>

              <h3 className="fade-in-item">4. Data Security</h3>
              <p className="fade-in-item">
                We work hard to protect your information from unauthorized access, alteration, disclosure, 
                or destruction. We implement security measures such as encryption, access controls, 
                and regular security assessments.
              </p>

              <h3 className="fade-in-item">5. Your Rights</h3>
              <p className="fade-in-item">
                Depending on your location, you may have certain rights regarding your personal information, 
                such as the right to access, correct, or delete your data.
              </p>

              <h3 className="fade-in-item">6. Changes to This Policy</h3>
              <p className="fade-in-item">
                We may update this privacy policy from time to time. We will notify you of any changes by 
                posting the new policy on this page.
              </p>

              <h3 className="fade-in-item">7. Contact Us</h3>
              <p className="fade-in-item">
                If you have any questions about this Privacy Policy, please contact us at privacy@example.com.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivacyPolicy;