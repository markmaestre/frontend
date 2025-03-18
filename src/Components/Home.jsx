import React from 'react';
import { Link } from 'react-router-dom';
import './css/styles.css';

const Home = () => {
  return (
    <div className="home-container">
      <header className="header">
        <div className="logo">HazWaste</div>
        <nav className="nav-menu">
          <a href="#" className="nav-link active">Home</a>
          <a href="/about" className="nav-link">About us</a>
        </nav>
        <Link to="/login">
  <button className="get-started-button">Get Started</button>
</Link>
      </header>
      <main className="main-content">
        <div className="left-content">
          <h1 className="main-heading">The smartest waste classification app!</h1>
          <p className="sub-heading">
            Use smart intelligent systems to assist your waste disposal practices for a sustainable future.
          </p>
          <Link to="/login">
  <button className="get-started-button">Get Started</button>
</Link>
          <div className="circle-dot"></div>
        </div>
        <div className="right-content">
          <div className="image-container">
            <div className="illustration-wrapper">
              <div className="squiggle"></div>
              <div className="cyan-dot top-dot"></div>
              <img
                src="/assets/hazwaste-hero.png"
                alt="Isometric illustration"
                className="illustration-image"
              />
              <div className="cyan-dot bottom-dot"></div>
            </div>
          </div>
        </div>
      </main>
      
      <section className="what-we-offer">
        <div className="section-header">
          <h2 className="section-title">What We Offer</h2>
          <p className="section-subtitle">HazWaste: AI and Mail-Based Waste Classification with Facility Mapping System</p>
        </div>
        
        <div className="offer-cards">
          <div className="offer-card">
            <div className="card-icon">
              <div className="icon-circle">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="16"></line>
                  <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
              </div>
            </div>
            <h3 className="card-title">AI-Powered Classification</h3>
            <p className="card-description">
              Advanced machine learning algorithms to accurately identify and categorize hazardous waste materials from images and descriptions.
            </p>
          </div>
          
          <div className="offer-card">
            <div className="card-icon">
              <div className="icon-circle">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
            </div>
            <h3 className="card-title">Facility Mapping</h3>
            <p className="card-description">
              Interactive mapping system that identifies nearest processing facilities based on waste type and user location.
            </p>
          </div>
          
          <div className="offer-card">
            <div className="card-icon">
              <div className="icon-circle">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
            </div>
            <h3 className="card-title">Mail-Based Service</h3>
            <p className="card-description">
              Convenient mail-in option for users to send samples for professional classification and proper disposal instructions.
            </p>
          </div>
          
          <div className="offer-card">
            <div className="card-icon">
              <div className="icon-circle">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
                </svg>
              </div>
            </div>
            <h3 className="card-title">Safety Guidelines</h3>
            <p className="card-description">
              Comprehensive safety protocols and handling instructions tailored to each waste classification for maximum safety.
            </p>
          </div>
        </div>
      </section>

      <section className="reviews-section">
  <div className="reviews-container">
    <div className="reviews-header">
      <h2 className="reviews-title">Reviews and ratings</h2>
      <div className="rating-score">
        <span className="score-number">4.7</span>
        <div className="star-rating">
          <span className="filled-star">★</span>
          <span className="filled-star">★</span>
          <span className="filled-star">★</span>
          <span className="filled-star">★</span>
          <span className="half-star">★</span>
        </div>
        <span className="rating-count">Based on 565 ratings</span>
      </div>
      
      <div className="rating-categories">
        <div className="rating-category">
          <span className="category-name">Reliability</span>
          <div className="rating-bar">
            <div className="rating-fill reliability"></div>
          </div>
          <span className="category-score">4.1</span>
        </div>
        
        <div className="rating-category">
          <span className="category-name">Payout rating</span>
          <div className="rating-bar">
            <div className="rating-fill payout"></div>
          </div>
          <span className="category-score">4.3</span>
        </div>
        
        <div className="rating-category">
          <span className="category-name">Positive solutions</span>
          <div className="rating-bar">
            <div className="rating-fill solutions"></div>
          </div>
          <span className="category-score">4.1</span>
        </div>
      </div>
      
      <button className="show-summary">
        Show summary <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
      </button>
    </div>
    
    <div className="reviews-list">
      <div className="reviews-filter">
        <div className="filter-count">Reviews <span className="review-count">153</span></div>
        <div className="filter-options">
          <button className="filter-button">
            Verified <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </button>
          <button className="filter-button">
            All ratings <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </button>
        </div>
      </div>
      
      <div className="review-item">
        <div className="review-header">
          <div className="reviewer-info">
            <div className="reviewer-name">Mika, Manila</div>
            <div className="review-stars">
              <span className="filled-star">★</span>
              <span className="filled-star">★</span>
              <span className="filled-star">★</span>
              <span className="filled-star">★</span>
              <span className="filled-star">★</span>
            </div>
          </div>
          <div className="review-date">Mar 2</div>
        </div>
        <div className="review-title">Sobrang helpful sa waste management!</div>
        <div className="review-content">
          Ang galing ng HazWaste! Dati ang hirap mag-manage ng chemical waste sa facility namin, pero ngayon super efficient na. Yung AI classification sobrang accurate, tapos ang bilis mahanap ng disposal sites. Highly recommended talaga, lalo na sa mga laboratories!
        </div>
      </div>
      
      <div className="review-item">
        <div className="review-header">
          <div className="reviewer-info">
            <div className="reviewer-name">RJ, Cebu</div>
            <div className="review-stars">
              <span className="filled-star">★</span>
              <span className="filled-star">★</span>
              <span className="filled-star">★</span>
              <span className="filled-star">★</span>
              <span className="empty-star">★</span>
            </div>
          </div>
          <div className="review-date">Feb 14</div>
        </div>
        <div className="review-title">Okay naman, pero may kulang</div>
        <div className="review-content">
          Maganda yung service, lalo na yung AI classification. Pero minsan kailangan pa rin ng manual correction. Yung customer support responsive, which is good. Sana lang mas user-friendly pa yung mobile app, medyo nakakalito gamitin minsan. Pero overall, sulit naman!
        </div>
      </div>
      
      <div className="review-item">
        <div className="review-header">
          <div className="reviewer-info">
            <div className="reviewer-name">HazWaste Team</div>
          </div>
          <div className="review-date">Jan 23</div>
        </div>
        <div className="review-content">
          Hi RJ! Salamat sa feedback mo. Na-receive na namin yung email mo at currently ini-improve na ng dev team namin yung mobile app. Appreciate namin ang patience mo at tulong sa pagpapaganda ng service namin!
        </div>
      </div>
    </div>
  </div>
</section>

{/* Add this section before the closing </div> of the home-container */}
<section className="get-in-touch-section">
  <div className="get-in-touch-container">
    <div className="get-in-touch-header">
      <h2 className="get-in-touch-title">Get In Touch</h2>
      <p className="get-in-touch-subtitle">
        We'll provide you an immediate response as soonest and accurate as possible.
      </p>
    </div>
    
    <div className="get-in-touch-content">
      <div className="contact-info-card">
        <div className="contact-info-header">
          <h3>Contact Information</h3>
          <p>We provide AI-powered waste classification and facility mapping backed by Python and React JS.</p>
        </div>
        
        <div className="contact-details">
          <div className="contact-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <span>+1 (800) HAZ-WASTE</span>
          </div>
          
          <div className="contact-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            <span>hazwaste@gmail.com</span>
          </div>
          
          <div className="contact-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span>Taguig City, Philippines</span>
          </div>
        </div>
      </div>
      
      <div className="contact-form">
        <div className="form-row">
          <div className="form-group">
            <label>Your Name</label>
            <input type="text" placeholder="Juana dela Cruz" />
          </div>
          <div className="form-group">
            <label>Your Email</label>
            <input type="email" placeholder="kumusta@example.com" />
          </div>
        </div>
        
        <div className="form-group">
          <label>Your Subject</label>
          <input type="text" placeholder="I want to learn more about HazWaste AI" />
        </div>
        
        <div className="form-group">
          <label>Message</label>
          <textarea rows="4" placeholder="Write here your message"></textarea>
        </div>
        
        <button className="send-message-button">
          Send Message
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 2L11 13"></path>
            <path d="M22 2L15 22L11 13L2 9L22 2Z"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</section>

{/* Footer Section */}
<footer className="footer-section">
  <div className="footer-container">
    {/* Newsletter Section */}
    <div className="footer-newsletter-container">
      <div className="footer-newsletter-header">
        <h3>Keep up to date about HazWaste!</h3>
        <p>Subscribe to our newsletter for the latest articles, events, and offers. You can unsubscribe at any time.</p>
      </div>
      <div className="newsletter-form">
        <input type="email" placeholder="Email address *" className="newsletter-input required" />
        <button className="newsletter-button">SIGN UP</button>
      </div>
    </div>
    
    {/* Footer Links */}
    <div className="footer-links">
      <ul className="footer-links-list">
        <li><a href="/policy">Privacy Policy</a></li>
        <li><a href="/terms">Terms of Service</a></li>
        <li><a href="/cookies">Cookie Settings</a></li>
      </ul>
    </div>
  </div>
</footer>

    </div>
  );
};

export default Home;