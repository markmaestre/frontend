import React, { useState, useEffect } from 'react';
import './css/Terms.css';

const Terms = () => {
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
      document.querySelector('.document-illustration').classList.add('animate-in');
      
      // Animate small elements with delay
      const smallElements = document.querySelectorAll('.paragraph-line, .document-icon, .signature-icon');
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
    <div className="terms-container">
      {/* Floating Background Elements */}
      <div className="background-elements">
        <div className="floating-circle circle-1"></div>
        <div className="floating-circle circle-2"></div>
        <div className="floating-square square-1"></div>
        <div className="floating-square square-2"></div>
        <div className="floating-cloud cloud-1"></div>
        <div className="floating-cloud cloud-2"></div>
      </div>
      
      <div className="terms-content">
        <div className="text-section">
          <h1 className="animated-title">Terms of Service</h1>
          
          <p className="description">
            These Terms of Service govern your use of our website and services. By accessing or using our 
            platform, you agree to be bound by these terms. Please read them carefully before proceeding
            with the use of our services.
          </p>
          
          <button 
            className="read-terms-btn pulse-animation" 
            onClick={toggleModal}
          >
            Read full terms
          </button>
        </div>
        
        <div className="illustration-section">
          <div className="document-illustration floating-animation">
            {/* Simplified document with signature line */}
            <div className="document-paper">
              <div className="document-header">
                <div className="document-title"></div>
                <div className="document-title-line"></div>
              </div>
              
              <div className="document-body">
                <div className="paragraph-line line-animate-1"></div>
                <div className="paragraph-line line-animate-2"></div>
                <div className="paragraph-line line-animate-3"></div>
                <div className="paragraph-line line-animate-1"></div>
                <div className="paragraph-line line-animate-2"></div>
                <div className="signature-section">
                  <div className="signature-line"></div>
                  <div className="signature-text">Signature</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Small icons and document elements */}
          <div className="document-elements">
            <div className="document-icon document-1 rotating-animation"></div>
            <div className="document-icon document-2 rotating-animation-reverse"></div>
            <div className="document-icon document-3"></div>
            <div className="signature-icon signature-1 floating-animation-medium"></div>
            <div className="signature-icon signature-2 floating-animation-slow"></div>
            <div className="checkmark-icon pulse-slow"></div>
          </div>
        </div>
      </div>
      
      {/* Modal popup */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Terms of Service</h2>
              <button className="close-btn" onClick={toggleModal}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <h3 className="fade-in-item">1. Acceptance of Terms</h3>
              <p className="fade-in-item">
                By accessing or using our services, you agree to be bound by these Terms of Service and all applicable
                laws and regulations. If you do not agree with any of these terms, you are prohibited from using or
                accessing our services.
              </p>
              
              <h3 className="fade-in-item">2. Use License</h3>
              <p className="fade-in-item">
                Permission is granted to temporarily access the materials on our website for personal, non-commercial use.
                This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="fade-in-item">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose</li>
                <li>Attempt to decompile or reverse engineer any software contained on our website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              </ul>
              
              <h3 className="fade-in-item">3. Disclaimer</h3>
              <p className="fade-in-item">
                The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied,
                and hereby disclaims and negates all other warranties including, without limitation, implied warranties or
                conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.
              </p>
              
              <h3 className="fade-in-item">4. Limitations</h3>
              <p className="fade-in-item">
                In no event shall our company or its suppliers be liable for any damages (including, without limitation,
                damages for loss of data or profit, or due to business interruption) arising out of the use or inability
                to use the materials on our website, even if we or an authorized representative has been notified orally
                or in writing of the possibility of such damage.
              </p>
              
              <h3 className="fade-in-item">5. Accuracy of Materials</h3>
              <p className="fade-in-item">
                The materials appearing on our website could include technical, typographical, or photographic errors.
                We do not warrant that any of the materials on our website are accurate, complete, or current.
                We may make changes to the materials contained on our website at any time without notice.
              </p>
              
              <h3 className="fade-in-item">6. Links</h3>
              <p className="fade-in-item">
                We have not reviewed all of the sites linked to our website and are not responsible for the contents of
                any such linked site. The inclusion of any link does not imply endorsement by us of the site.
                Use of any such linked website is at the user's own risk.
              </p>
              
              <h3 className="fade-in-item">7. Modifications</h3>
              <p className="fade-in-item">
                We may revise these terms of service for our website at any time without notice.
                By using this website, you are agreeing to be bound by the then current version of these terms of service.
              </p>
              
              <h3 className="fade-in-item">8. Governing Law</h3>
              <p className="fade-in-item">
                These terms and conditions are governed by and construed in accordance with the laws of our jurisdiction
                and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
              </p>
              
              <h3 className="fade-in-item">9. Contact Us</h3>
              <p className="fade-in-item">
                If you have any questions about these Terms of Service, please contact us at terms@example.com.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Terms;