import React, { useEffect, useState, useRef } from 'react';
import './css/about.css';

const About = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const teamRef = useRef(null);
  
  const teamMembers = [
    {
      name: "Pops V. Madriaga",
      role: "Project Manager/Adviser",
      bio: "With extensive experience in project management, Pops leads our team with vision and strategic planning in improving the integration of the AI system.",
      image: "/assets/maam.jpg",
      email: "https://www.facebook.com/madriaga.pops.3",
      facebook: "https://www.facebook.com/madriaga.pops.3"
    },
    {
      name: "Mark Ranier M. Maestre",
      role: "Full Stack Developer",
      bio: "Mark develops and maintains our core technology stack, ensuring seamless integration between our AI systems and user interfaces.",
      image: "/assets/mark.png",
      email: "https://www.facebook.com/mark.macmaestre26",
      facebook: "https://www.facebook.com/mark.macmaestre26"
    },
    {
      name: "Jaylord Franz P. Baribar",
      role: "Frontend Developer",
      bio: "Jaylord creates responsive and intuitive user interfaces, making our complex technology accessible to all users.",
      image: "/assets/franz.jpg",
      email: "https://www.facebook.com/franz.baribar.2024/",
      facebook: "https://www.facebook.com/franz.baribar.2024/"
    },
    {
      name: "Kristel Kaye C. Cabalbag",
      role: "UI Designer",
      bio: "Kristel designs user experiences that are both functional and aesthetically pleasing, focusing on usability and accessibility.",
      image: "/assets/kaye.jpg",
      email: "https://www.facebook.com/Kayetotieee",
      facebook: "https://www.facebook.com/Kayetotieee"
    },
    {
      name: "Theodore D. Palma",
      role: "UI Designer",
      bio: "In coordination with Kristel, Theodore works on creating cohesive visual elements across our platform, ensuring a consistent and engaging user experience.",
      image: "/assets/theo.jpg",
      email: "https://www.facebook.com/theooooooooooooooooooooo",
      facebook: "https://www.facebook.com/theooooooooooooooooooooo"
    }
  ];

  // Generate animated background elements
  const generateShapes = (section) => {
    const shapes = [];
    
    // Different shape configurations for different sections
    const shapeConfigs = {
      hero: [
        { type: 'circle', count: 3, size: '80px' },
        { type: 'square', count: 2, size: '60px' },
        { type: 'triangle', count: 2 },
        { type: 'line', count: 4, width: '100px' }
      ],
      mission: [
        { type: 'circle', count: 2, size: '120px' },
        { type: 'square', count: 3, size: '50px' },
        { type: 'line', count: 3, width: '150px' }
      ],
      timeline: [
        { type: 'circle', count: 4, size: '60px' },
        { type: 'triangle', count: 2 },
        { type: 'line', count: 2, width: '120px' }
      ],
      team: [
        { type: 'circle', count: 3, size: '100px' },
        { type: 'square', count: 2, size: '70px' },
        { type: 'triangle', count: 1 }
      ],
      contact: [
        { type: 'circle', count: 5, size: '70px' },
        { type: 'square', count: 1, size: '90px' },
        { type: 'line', count: 3, width: '180px' }
      ]
    };
    
    const config = shapeConfigs[section] || shapeConfigs.hero;
    
    let index = 0;
    config.forEach(({ type, count, size, width }) => {
      for (let i = 0; i < count; i++) {
        const style = {
          top: `${Math.random() * 90}%`,
          left: `${Math.random() * 90}%`,
          zIndex: 0,
          opacity: 0.2,
        };
        
        if (type === 'circle' || type === 'square') {
          style.width = size;
          style.height = size;
        }
        
        if (type === 'line') {
          style.width = width;
          style.height = '3px';
          style.transform = `rotate(${Math.random() * 360}deg)`;
        }
        
        shapes.push(
          <div 
            key={`${section}-${type}-${index++}`}
            className={`shape ${type}`}
            style={style}
          ></div>
        );
      }
    });
    
    return shapes;
  };

  // Calculate the number of slides based on responsive design
  const getVisibleSlides = () => {
    if (window.innerWidth >= 992) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  };
  
  const [visibleSlides, setVisibleSlides] = useState(3);
  
  useEffect(() => {
    // Set initial visible slides
    setVisibleSlides(getVisibleSlides());
    
    // Handle window resize
    const handleResize = () => {
      setVisibleSlides(getVisibleSlides());
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation for timeline items on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.timeline-item').forEach(item => {
      observer.observe(item);
    });
    
    return () => {
      document.querySelectorAll('.timeline-item').forEach(item => {
        observer.unobserve(item);
      });
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Navigate to previous slide
  const prevSlide = () => {
    setCurrentSlide(prev => 
      prev === 0 ? Math.max(0, teamMembers.length - visibleSlides) : prev - 1
    );
  };
  
  const nextSlide = () => {
    setCurrentSlide(prev => 
      prev >= teamMembers.length - visibleSlides ? 0 : prev + 1
    );
  };
  
  // Navigate to a specific slide
  const goToSlide = (index) => {
    setCurrentSlide(Math.min(index, teamMembers.length - visibleSlides));
  };

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  
  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="animated-bg">
          {generateShapes('hero')}
        </div>
        <div className="section-container">
          <div className="hero-content">
            <h1>About HazWaste</h1>
            <p>AI and Mail-Based Waste Classification with Facility Mapping System</p>
          </div>
          <a href="/" className="home-circle-button" aria-label="Go to home page">
            <i className="fas fa-home"></i>
          </a>
        </div>
      </section>
      
      {/* Mission and Vision Section - Improved Card Layout */}
      <section className="mission-vision-section">
        <div className="animated-bg">
          {generateShapes('mission')}
        </div>
        <div className="section-container">
          <h2 className="section-title">Our Mission & Vision</h2>
          <div className="mission-vision-content">
            <div className="mission-vision-card mission-box">
              <h3>Mission</h3>
              <p>At HazWaste, we strive to revolutionize waste management through innovative AI solutions. We are committed to simplifying hazardous waste classification, making it accessible through mail-based services, and connecting users to appropriate disposal facilities—ultimately contributing to a cleaner, safer environment for all communities.</p>
            </div>
            
            <div className="mission-vision-card vision-box">
              <h3>Vision</h3>
              <p>We envision a world where hazardous waste is properly identified and disposed of through accessible technology. Our vision is to become the leading platform for waste classification, creating a global network of informed citizens and proper disposal facilities that work together to protect our environment and future generations.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* How We Started Section */}
      <section className="timeline-section">
        <div className="animated-bg">
          {generateShapes('timeline')}
        </div>
        <div className="section-container">
          <h2 className="section-title">How We Started</h2>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <span className="timeline-year">2022</span>
                <p>The initial concept for HazWaste was developed in response to growing concerns about improper hazardous waste disposal in local communities.</p>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <span className="timeline-year">2023</span>
                <p>Our AI classification system was developed and tested. We established partnerships with the first waste management facilities and began mapping them in our system.</p>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <span className="timeline-year">2024</span>
                <p>We launched our mail-based service, allowing users to send samples for classification. The facility mapping system went live, connecting users with proper disposal sites.</p>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <span className="timeline-year">2025</span>
                <p>HazWaste expanded nationwide, integrated with mobile applications, and formed partnerships with environmental agencies to further improve waste management processes.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Meet Our Team Section - Modified for Slider with Improved Image Sizing */}
      <section className="team-section" ref={teamRef}>
        <div className="animated-bg">
          {generateShapes('team')}
        </div>
        <div className="section-container">
          <h2 className="section-title">Meet Our Team</h2>
          <div className="team-slider-container">
          <div className="team-slider" ref={teamRef} style={{ transform: `translateX(-${currentSlide * (100 / visibleSlides)}%)` }}>
  {teamMembers.map((member, index) => (
    <div 
      key={index}
      className="team-member"
      style={{ 
        flex: `0 0 calc(${100 / visibleSlides}% - 40px)`,
        maxWidth: `calc(${100 / visibleSlides}% - 40px)`
      }}
    >
      <div className="team-member-image">
        <img src={member.image} alt={member.name} className="team-img" />
      </div>
      <h3>{member.name}</h3>
      <h4>{member.role}</h4>
      <p>{member.bio}</p>
      <div className="team-social">
        <a href={`mailto:${member.email}`} className="team-social-icon">
          <i className="fas fa-envelope"></i>
        </a>
        <a href={member.facebook} target="_blank" rel="noopener noreferrer" className="team-social-icon">
          <i className="fab fa-facebook-f"></i>
        </a>
      </div>
    </div>
  ))}
</div>
            
            <div className="slider-nav">
              <button className="slider-arrow prev" onClick={prevSlide} aria-label="Previous slide">
                <i className="fas fa-chevron-left"></i>
              </button>
              <button className="slider-arrow next" onClick={nextSlide} aria-label="Next slide">
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
            
            <div className="slider-dots">
              {Array.from({ length: Math.ceil(teamMembers.length - visibleSlides + 1) }).map((_, index) => (
                <button 
                  key={index} 
                  className={`slider-dot ${currentSlide === index ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Section - Improved Footer */}
      <section className="contact-section">
        <div className="animated-bg">
          {generateShapes('contact')}
        </div>
        <div className="section-container">
          <div className="contact-content">
            <h2>Join Our Mission</h2>
            <p className="contact-text">Want to contribute to safer waste management? Contact us to learn more about our services or partnership opportunities.</p>
            <button onClick={toggleModal} className="contact-button">
  <i className="fas fa-envelope"></i> Contact Us
</button>
            <div className="footer-social">
              <a href="#" className="social-icon" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="social-icon" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            <div className="footer-info">
              <p><i className="fas fa-map-marker-alt"></i> Taguig City, Philippines</p>
              <p><i className="fas fa-phone"></i> (123) 456-7890</p>
              <p><i className="fas fa-envelope"></i> hazwaste@gmail.com</p>
            </div>
          </div>
        </div>
      </section>

      {showModal && (
  <div className="contact-modal-overlay" onClick={toggleModal}>
    <div className="contact-modal" onClick={(e) => e.stopPropagation()}>
      <button className="modal-close" onClick={toggleModal}>
        <i className="fas fa-times"></i>
      </button>
      <h2>Get In Touch</h2>
      <div className="contact-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input type="text" id="name" placeholder="Juan dela Cruz" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" placeholder="kumusta@example.com" />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="subject">Your Subject</label>
          <input type="text" id="subject" placeholder="I want to learn more about HazWaste AI" />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea id="message" rows="6" placeholder="Write here your message"></textarea>
        </div>
        <button type="submit" className="submit-button">
          <span>Send Message</span>
          <i className="fas fa-paper-plane"></i>
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default About;