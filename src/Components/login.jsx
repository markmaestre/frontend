import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Handle form inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    if (!formData.email || !formData.password) {
      setError("Please fill in all required fields.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      setSuccess("Login successful! Redirecting...");
      setTimeout(() => {
        window.location.href =
          response.data.role === "admin" ? "/admindashboard" : "/userdashboard";
      }, 1500);
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
    
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="left-panel">
          <div className="brand-content">
            <div className="logo-container">
              <div className="logo-icon">⚠️</div>
            </div>
            <h1 className="brand-name">HazWaste</h1>
            <p className="brand-tagline">Safe Disposal. Better Tomorrow.</p>
            
            <div className="features-list">
              <div className="feature-item">
                <span className="feature-icon">🔒</span>
                <span className="feature-text">Secure Management System</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">📊</span>
                <span className="feature-text">Real-time Tracking</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">♻️</span>
                <span className="feature-text">Sustainable Solutions</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="right-panel">
          <div className="form-wrapper">
            <div className="form-header">
              <h2>Welcome Back</h2>
              <p>Sign in to continue to your account</p>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="email">
                  <span className="input-icon">✉️</span>
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="youremail@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="input-group">
                <label htmlFor="password">
                  <span className="input-icon">🔑</span>
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="forgot-password">
                <a href="#">Forgot Password?</a>
              </div>
              
              <button 
                type="submit" 
                className={isLoading ? "loading" : ""}
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
                <span className="btn-arrow">→</span>
              </button>
            </form>
            
            {error && <div className="error-alert">{error}</div>}
            {success && <div className="success-alert">{success}</div>}
            
            <div className="register-prompt">
              Don't have an account? <Link to="/register">Create one now</Link>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        /* Reset and base styles */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f8f9fa;
          padding: 20px;
        }

        .login-container {
          width: 100%;
          max-width: 1000px;
          min-height: 600px;
          display: flex;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        /* Left Panel - Brand Section */
        .left-panel {
          width: 45%;
          background: linear-gradient(135deg, #1a5653 0%, #0d2e2c 100%);
          color: white;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .left-panel::before {
          content: '';
          position: absolute;
          top: -10%;
          right: -10%;
          width: 300px;
          height: 300px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
        }

        .left-panel::after {
          content: '';
          position: absolute;
          bottom: -15%;
          left: -15%;
          width: 400px;
          height: 400px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 50%;
        }

        .brand-content {
          padding: 60px 40px;
          position: relative;
          z-index: 1;
        }

        .logo-container {
          width: 90px;
          height: 90px;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 25px;
          position: relative;
          overflow: hidden;
        }

        .logo-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
          border-radius: 24px;
        }

        .logo-icon {
          font-size: 40px;
          filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
        }

        .brand-name {
          font-size: 42px;
          font-weight: 800;
          letter-spacing: 1px;
          margin-bottom: 10px;
          background: linear-gradient(90deg, #ffffff, #b3e6e0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .brand-tagline {
          font-size: 18px;
          opacity: 0.8;
          margin-bottom: 50px;
          font-weight: 300;
          letter-spacing: 0.5px;
        }

        .features-list {
          margin-top: 40px;
        }

        .feature-item {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          padding: 15px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          backdrop-filter: blur(5px);
          transition: transform 0.3s ease, background 0.3s ease;
        }

        .feature-item:hover {
          transform: translateX(5px);
          background: rgba(255, 255, 255, 0.12);
        }

        .feature-icon {
          font-size: 22px;
          margin-right: 15px;
        }

        .feature-text {
          font-size: 16px;
          font-weight: 500;
          letter-spacing: 0.5px;
        }

        /* Right Panel - Form Section */
        .right-panel {
          width: 55%;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .form-wrapper {
          width: 100%;
          max-width: 400px;
          padding: 40px;
        }

        .form-header {
          margin-bottom: 40px;
          text-align: center;
        }

        .form-header h2 {
          font-size: 32px;
          font-weight: 700;
          color: #333;
          margin-bottom: 10px;
        }

        .form-header p {
          color: #6c757d;
          font-size: 16px;
        }

        form {
          margin-bottom: 25px;
        }

        .input-group {
          margin-bottom: 25px;
        }

        .input-group label {
          display: block;
          margin-bottom: 10px;
          font-size: 14px;
          font-weight: 600;
          color: #495057;
          display: flex;
          align-items: center;
        }

        .input-icon {
          margin-right: 8px;
          font-size: 16px;
        }

        .input-group input {
          width: 100%;
          padding: 16px;
          font-size: 15px;
          border: 2px solid #e9ecef;
          border-radius: 12px;
          background-color: #f8f9fa;
          transition: all 0.3s ease;
        }

        .input-group input:focus {
          outline: none;
          border-color: #1a5653;
          background-color: #fff;
          box-shadow: 0 0 0 4px rgba(26, 86, 83, 0.1);
        }

        .forgot-password {
          text-align: right;
          margin-bottom: 30px;
        }

        .forgot-password a {
          color: #1a5653;
          font-size: 14px;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.3s ease;
        }

        .forgot-password a:hover {
          color: #0d2e2c;
          text-decoration: underline;
        }

        button {
          width: 100%;
          padding: 16px;
          background: linear-gradient(90deg, #1a5653, #2c8880);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(26, 86, 83, 0.3);
        }

        button:hover {
          background: linear-gradient(90deg, #0d2e2c, #1a5653);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(26, 86, 83, 0.4);
        }

        button:active {
          transform: translateY(1px);
        }

        button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: 0.5s;
        }

        button:hover::before {
          left: 100%;
        }

        .btn-arrow {
          margin-left: 10px;
          transition: transform 0.3s ease;
        }

        button:hover .btn-arrow {
          transform: translateX(5px);
        }

        button.loading {
          background: #78a7a4;
          pointer-events: none;
        }

        .error-alert, .success-alert {
          padding: 15px;
          border-radius: 12px;
          margin: 25px 0;
          display: flex;
          align-items: center;
          animation: slideIn 0.3s ease forwards;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .error-alert {
          background-color: #ffe3e3;
          color: #cf2e2e;
          border-left: 4px solid #cf2e2e;
        }

        .success-alert {
          background-color: #e3ffea;
          color: #2ecf59;
          border-left: 4px solid #2ecf59;
        }

        .register-prompt {
          text-align: center;
          color: #6c757d;
          font-size: 15px;
        }

        .register-prompt a {
          color: #1a5653;
          font-weight: 600;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .register-prompt a:hover {
          color: #0d2e2c;
          text-decoration: underline;
        }

        /* Responsive styles */
        @media (max-width: 768px) {
          .login-container {
            flex-direction: column;
            max-width: 500px;
          }

          .left-panel, .right-panel {
            width: 100%;
          }

          .left-panel {
            padding: 30px 0;
          }

          .brand-content {
            padding: 30px;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .logo-container {
            margin: 0 auto 20px;
          }

          .brand-tagline {
            margin-bottom: 20px;
          }

          .features-list {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;