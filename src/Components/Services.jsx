import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/Services.css";

const servicesData = [
  {
    title: "AI Classification",
    description:
      "Classify waste effortlessly with cutting-edge AI technology. Our system instantly identifies different types of waste and provides accurate disposal guidance.",
    image: "https://cdn-icons-png.flaticon.com/512/2991/2991148.png",
  },
  {
    title: "Nearby Centers",
    description:
      "Locate the nearest recycling and waste disposal centers with ease. Our platform provides real-time updates on the best locations for your waste management needs.",
    image: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  },
  {
    title: "Real-Time Tips",
    description:
      "Receive expert advice and personalized mail notifications on effective waste disposal techniques, ensuring a greener and cleaner environment.",
    image: "https://cdn-icons-png.flaticon.com/512/1903/1903162.png",
  },
];

const Services = () => {
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

      {/* Services Section */}
      <section className="servicesSection">
        <h2 className="sectionTitle">Our Services</h2>
        <div className="servicesRow">
          {servicesData.map((service, index) => (
            <div className="serviceCard" key={index}>
              <img src={service.image} alt={service.title} className="serviceIcon" />
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
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

export default Services;