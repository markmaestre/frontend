import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/Contact.css";

const Contact = () => {
  return (
    <div>
      {/* Header Section */}
      <header className="header">
        <div className="logo">HazWaste</div>
        <nav className="navLinks">
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/services">Services</Link>
          <Link to="/contact">Contact</Link>
          <button className="navButton btn btn-warning" onClick={() => window.location.href = "/login"}>Get Started</button>
        </nav>
      </header>

      {/* Contact Section */}
      <section className="contactSection">
        <h2 className="sectionTitle">Get in Touch</h2>
        <p className="contactDescription">
          We would love to hear from you! Whether you have a question about our services,
          need assistance, or just want to share feedback, feel free to reach out to us.
        </p>
        <div className="contactContainer">
          <div className="contactInfo">
            <h3>Contact Information</h3>
            <p><strong>Email:</strong> support@hazwaste.com</p>
            <p><strong>Phone:</strong> 09123456789</p>
            <p><strong>Address:</strong> Taguig, Metro Manila</p>
            <p>Our support team is available Monday to Friday, 9 AM - 6 PM.</p>
          </div>

          {/* Updated Contact Form with Stacked Form Styling */}
          <div className="contactForm stackedForm">
            <h3>Send Us a Message</h3>
            <form>
              <ul className="wrapper">
                <li style={{ "--i": 3 }}>
                  <input type="text" className="input" placeholder="Your Name" required />
                </li>
                <li style={{ "--i": 2 }}>
                  <input type="email" className="input" placeholder="Your Email" required />
                </li>
                <li style={{ "--i": 1 }}>
                  <textarea className="input" placeholder="Your Message" rows="5" required></textarea>
                </li>
              </ul>
              <button type="submit">
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <p className="footer-text">© 2025 HazWaste. All rights reserved.</p>
        <div className="footer-links">
          <Link to="/policy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
          <Link to="/contact-us">Contact Us</Link>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
