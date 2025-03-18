import React, { useState, useEffect } from 'react';
import './css/CookieSettings.css';

const CookieSettings = () => {
  const [showModal, setShowModal] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true, // Always enabled
    functional: true,
    analytics: false,
    marketing: false
  });

  // Track scroll position for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);

    // Add animation classes after component mounts
    const timer = setTimeout(() => {
      document.querySelector('.text-section').classList.add('animate-in');
      document.querySelector('.cookie-illustration').classList.add('animate-in');
      
      // Animate small elements with delay
      const smallElements = document.querySelectorAll('.cookie-icon, .toggle-switch, .settings-icon');
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

  const handleCookieToggle = (cookieType) => {
    if (cookieType === 'necessary') return; // Cannot toggle necessary cookies
    setCookiePreferences({
      ...cookiePreferences,
      [cookieType]: !cookiePreferences[cookieType]
    });
  };

  const savePreferences = () => {
    // Save preferences to localStorage or send to server
    localStorage.setItem('cookiePreferences', JSON.stringify(cookiePreferences));
    toggleModal();
    // Show confirmation message
    const savedMessage = document.createElement('div');
    savedMessage.className = 'save-confirmation';
    savedMessage.textContent = 'Your cookie preferences have been saved!';
    document.body.appendChild(savedMessage);
    
    setTimeout(() => {
      savedMessage.classList.add('show');
    }, 100);
    
    setTimeout(() => {
      savedMessage.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(savedMessage);
      }, 500);
    }, 3000);
  };

  // Parallax style calculations based on scroll position
  const getParallaxStyle = (speed) => {
    return {
      transform: `translateY(${scrollPosition * speed}px)`
    };
  };

  return (
    <div className="cookie-settings-container">
      {/* Floating Background Elements */}
      <div className="background-elements">
        <div className="floating-circle circle-1"></div>
        <div className="floating-circle circle-2"></div>
        <div className="floating-cloud cloud-1"></div>
        <div className="floating-cloud cloud-2"></div>
        <div className="floating-square square-1"></div>
        <div className="floating-square square-2"></div>
      </div>

      <div className="cookie-settings-content">
        <div className="text-section">
          <h1 className="animated-title">Cookie Settings</h1>
          <p className="description">
            We use cookies to enhance your browsing experience, serve personalized ads or content, 
            and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
            You can customize your cookie preferences by clicking on "Manage Settings".
          </p>
          <button className="manage-settings-btn pulse-animation" onClick={toggleModal}>
            Manage Settings
          </button>
        </div>

        <div className="illustration-section">
          <div className="cookie-illustration floating-animation">
            {/* Simplified cookie jar with cookies */}
            <div className="cookie-jar">
              <div className="jar-lid"></div>
              <div className="jar-body">
                <div className="cookie cookie-1 floating-animation-slow">
                  <div className="chip chip-1"></div>
                  <div className="chip chip-2"></div>
                  <div className="chip chip-3"></div>
                </div>
                <div className="cookie cookie-2 floating-animation-medium">
                  <div className="chip chip-1"></div>
                  <div className="chip chip-2"></div>
                  <div className="chip chip-3"></div>
                </div>
                <div className="cookie cookie-3 floating-animation">
                  <div className="chip chip-1"></div>
                  <div className="chip chip-2"></div>
                  <div className="chip chip-3"></div>
                </div>
              </div>
            </div>

            {/* Small cookie icons */}
            <div className="settings-icons">
              <div className="cookie-icon cookie-icon-1 rotating-animation"></div>
              <div className="cookie-icon cookie-icon-2 rotating-animation-reverse"></div>
              <div className="cookie-icon cookie-icon-3 rotating-animation"></div>
              <div className="settings-icon settings-icon-1 rotating-animation"></div>
              <div className="settings-icon settings-icon-2 rotating-animation-reverse"></div>
              <div className="toggle-switch toggle-switch-1"></div>
              <div className="toggle-switch toggle-switch-2"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal popup */}
      {showModal && (
        <div className="modal-overlay" onClick={(e) => {
          if (e.target.className === 'modal-overlay') toggleModal();
        }}>
          <div className="modal-content">
            <div className="modal-header">
              <h2>Cookie Preferences</h2>
              <button className="close-btn" onClick={toggleModal}>×</button>
            </div>
            <div className="modal-body">
              <div className="fade-in-item">
                <p>
                  We use cookies to ensure that we give you the best experience on our website. 
                  You can customize your cookie preferences below.
                </p>
              </div>

              <div className="cookie-types">
                <div className="cookie-type-item fade-in-item">
                  <div className="cookie-type-header">
                    <div>
                      <h3>Necessary Cookies</h3>
                      <p>These cookies are essential for the website to function properly.</p>
                    </div>
                    <div className="toggle-container disabled">
                      <div className="toggle-switch active">
                        <div className="toggle-slider"></div>
                      </div>
                      <span className="always-on">Always on</span>
                    </div>
                  </div>
                </div>

                <div className="cookie-type-item fade-in-item">
                  <div className="cookie-type-header">
                    <div>
                      <h3>Functional Cookies</h3>
                      <p>These cookies enable personalized features and functionality.</p>
                    </div>
                    <div className="toggle-container">
                      <div 
                        className={`toggle-switch ${cookiePreferences.functional ? 'active' : ''}`}
                        onClick={() => handleCookieToggle('functional')}
                      >
                        <div className="toggle-slider"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="cookie-type-item fade-in-item">
                  <div className="cookie-type-header">
                    <div>
                      <h3>Analytics Cookies</h3>
                      <p>These cookies help us understand how visitors interact with our website.</p>
                    </div>
                    <div className="toggle-container">
                      <div 
                        className={`toggle-switch ${cookiePreferences.analytics ? 'active' : ''}`}
                        onClick={() => handleCookieToggle('analytics')}
                      >
                        <div className="toggle-slider"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="cookie-type-item fade-in-item">
                  <div className="cookie-type-header">
                    <div>
                      <h3>Marketing Cookies</h3>
                      <p>These cookies are used to track visitors across websites to display relevant advertisements.</p>
                    </div>
                    <div className="toggle-container">
                      <div 
                        className={`toggle-switch ${cookiePreferences.marketing ? 'active' : ''}`}
                        onClick={() => handleCookieToggle('marketing')}
                      >
                        <div className="toggle-slider"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="cookie-actions fade-in-item">
                <button className="action-btn reject-all" onClick={() => {
                  setCookiePreferences({
                    necessary: true,
                    functional: false,
                    analytics: false,
                    marketing: false
                  });
                }}>
                  Reject All
                </button>
                <button className="action-btn accept-all" onClick={() => {
                  setCookiePreferences({
                    necessary: true,
                    functional: true,
                    analytics: true,
                    marketing: true
                  });
                }}>
                  Accept All
                </button>
                <button className="action-btn save-preferences" onClick={savePreferences}>
                  Save Preferences
                </button>
              </div>

              <div className="additional-info fade-in-item">
                <p>
                  For more information on how we use cookies, please see our <a href="/privacy-policy">Privacy Policy</a>.
                  To learn more about cookies in general, visit <a href="https://www.allaboutcookies.org/" target="_blank" rel="noopener noreferrer">AllAboutCookies.org</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CookieSettings;