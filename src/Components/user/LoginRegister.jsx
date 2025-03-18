//   import React, { useState } from "react";
//   import axios from "axios";
//   import "../css/LoginRegister.css"; 

//   const LoginRegister = () => {
//     const [isLogin, setIsLogin] = useState(true);
//     const [formData, setFormData] = useState({
//       username: "",
//       email: "",
//       location: "",
//       phone_number: "",
//       password: "",
//       confirmPassword: "",
//       gender: "male",
//     });
//     const [location, setLocation] = useState("");
//     const [isLocating, setIsLocating] = useState(false);
//     const [error, setError] = useState("");
//     const [success, setSuccess] = useState("");


//     const toggleForm = (login) => {
//       setIsLogin(login);
//       setError("");
//       setSuccess("");
//     };

    

//     // Handle form inputs
//     const handleChange = (e) => {
//       setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     // Detect User Location
//     const detectLocation = () => {
//       setIsLocating(true);
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//           async (position) => {
//             const { latitude, longitude } = position.coords;

//             try {
//               const response = await fetch(
//                 `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
//               );
//               const data = await response.json();
//               const address = data.display_name || `${latitude}, ${longitude}`;
//               setLocation(address);
//               setFormData((prev) => ({ ...prev, location: address }));
//             } catch (error) {
//               console.error("Error getting address:", error);
//               setLocation(`${latitude}, ${longitude}`);
//               setFormData((prev) => ({
//                 ...prev,
//                 location: `${latitude}, ${longitude}`,
//               }));
//             } finally {
//               setIsLocating(false);
//             }
//           },
//           (error) => {
//             console.error("Error getting location:", error);
//             setIsLocating(false);
//           }
//         );
//       } else {
//         setIsLocating(false);
//         alert("Geolocation is not supported by this browser.");
//       }
//     };

    
//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       setError("");
//       setSuccess("");

//       if (!formData.email || !formData.password) {
//         setError("Please fill in all required fields.");
//         return;
//       }

//       try {
//         if (isLogin) {
//           const response = await axios.post("http://localhost:4000/api/auth/login", {
//             email: formData.email,
//             password: formData.password,
//           });

//           localStorage.setItem("token", response.data.token);
//           localStorage.setItem("role", response.data.role);
//           setSuccess("Login successful! Redirecting...");
//           setTimeout(() => {
//             window.location.href =
//               response.data.role === "admin" ? "/admindashboard" : "/userdashboard";
//           }, 1500);
//         } else {
//           if (formData.password !== formData.confirmPassword) {
//             setError("Passwords do not match.");
//             return;
//           }

//           const response = await axios.post("http://localhost:4000/api/auth/register", {
//             username: formData.username,
//             email: formData.email,
//             location: formData.location,
//             phone_number: formData.phone_number,
//             password: formData.password,
//             gender: formData.gender,
//           });

//           setSuccess("Register successful! ");
          
//         }
//       } catch (error) {
//         setError(error.response?.data?.message || "An error occurred. Please try again.");
//       }
//     };
    
//     return (
//       <div className="auth-page">
//       <div className="auth-container">
//         <div className="forms-container">
//           <div className="form-panel">
//             {isLogin ? (
//               <>
//                 <h2 className="form-title">Welcome Back</h2>
//                 <form className="auth-form" onSubmit={handleSubmit}>
//                   <div className="form-group">
//                     <label htmlFor="email">Email Address</label>
//                     <input
//                       type="email"
//                       name="email"
//                       placeholder="Enter your email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>

//                   <div className="form-group">
//                     <label htmlFor="password">Password</label>
//                     <input
//                       type="password"
//                       name="password"
//                       placeholder="Enter your password"
//                       value={formData.password}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>

//                   <button type="submit" className="submit-btn">Login</button>
//                 </form>
//               </>
//               ) : (
//                 <>
//                    <h2 className="form-title">Create Account</h2>
// <div className="form-container">
//   <form className="auth-form" onSubmit={handleSubmit}>
//     <div className="form-group">
//       <label htmlFor="username">Full Name</label>
//       <input
//         type="text"
//         name="username"
//         placeholder="Enter your full name"
//         value={formData.username}
//         onChange={handleChange}
//         required
//       />
//     </div>

//     <div className="form-group">
//       <label htmlFor="email">Email Address</label>
//       <input
//         type="email"
//         name="email"
//         placeholder="Enter your email"
//         value={formData.email}
//         onChange={handleChange}
//         required
//       />
//     </div>

//     <div className="form-group">
//       <label htmlFor="location">Location</label>
//       <input
//         type="text"
//         name="location"
//         placeholder="Enter your location"
//         value={formData.location}
//         onChange={handleChange}
//       />
//       <button type="button" onClick={detectLocation} disabled={isLocating}>
//         {isLocating ? "Detecting..." : "Detect Location"}
//       </button>
//     </div>

//     <div className="form-group">
//       <label htmlFor="phone_number">Phone Number</label>
//       <input
//         type="text"
//         name="phone_number"
//         placeholder="Enter your phone number"
//         value={formData.phone_number}
//         onChange={handleChange}
//         required
//       />
//     </div>

//     <div className="form-group">
//       <label htmlFor="gender">Gender</label>
//       <select
//         name="gender"
//         value={formData.gender}
//         onChange={handleChange}
//         required
//       >
//         <option value="">Select your gender</option>
//         <option value="male">Male</option>
//         <option value="female">Female</option>
//         <option value="other">Other</option>
//       </select>
//     </div>

//     <div className="form-group">
//       <label htmlFor="password">Password</label>
//       <input
//         type="password"
//         name="password"
//         placeholder="Create a password"
//         value={formData.password}
//         onChange={handleChange}
//         required
//       />
//     </div>

//     <div className="form-group">
//       <label htmlFor="confirmPassword">Confirm Password</label>
//       <input
//         type="password"
//         name="confirmPassword"
//         placeholder="Confirm your password"
//         value={formData.confirmPassword}
//         onChange={handleChange}
//         required
//       />
//     </div>

//     <button type="submit" className="submit-btn">Create Account</button>
//   </form>
// </div>

//               </>
//               )}
//             </div>
            
//             <div className="decorative-circle circle1"></div>
//             <div className="decorative-circle circle2"></div>
//             <div className="decorative-circle circle3"></div>
//           </div>
          
//           <div className="artwork-container">
//             {/* Toggle moved to the right panel */}
//             <div className="right-panel-toggle">
//               <button 
//                 className={`toggle-btn ${isLogin ? 'active' : ''}`} 
//                 onClick={() => toggleForm(true)}
//               >
              
//               </button>
//               <button 
//                 className={`toggle-btn ${!isLogin ? 'active' : ''}`} 
//                 onClick={() => toggleForm(false)}
//               >
//                 Register
//               </button>
//             </div>
            
//             {/* Enhanced artwork with HazWaste text and decorative elements */}
//             <div className="artwork">
//               <div className="hazwaste-title">HazWaste</div>
//               <div className="hazwaste-subtitle">Manage waste responsibly</div>
              
//               <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="blob-main">
//                 <path fill="#FFFFFF" d="M38.5,-43.7C49.9,-31.6,59,-18.9,63.6,-3.6C68.2,11.6,68.2,29.5,59.6,41.1C51,52.7,33.9,58,16.7,63.3C-0.5,68.6,-17.9,73.8,-31.6,68.7C-45.3,63.5,-55.3,47.9,-63.9,30.5C-72.5,13,-79.6,-6.4,-75.2,-22.9C-70.9,-39.4,-55.1,-53,-39.4,-64.5C-23.6,-76,-11.8,-85.3,0.6,-86C13,-86.8,27.1,-55.8,38.5,-43.7Z" transform="translate(100 100)" />
//               </svg>
              
//               {/* Additional decorative elements */}
//               <svg className="decorative-shape shape1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
//                 <circle cx="50" cy="50" r="40" fill="rgba(255, 255, 255, 0.2)" />
//               </svg>
              
//               <svg className="decorative-shape shape2" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
//                 <rect x="20" y="20" width="60" height="60" rx="15" fill="rgba(255, 255, 255, 0.15)" />
//               </svg>
              
//               <svg className="decorative-shape shape3" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
//                 <polygon points="50,10 90,90 10,90" fill="rgba(255, 255, 255, 0.2)" />
//               </svg>
              
       
//               <div className="eco-icon icon1">♻️</div>
//               <div className="eco-icon icon2">🌱</div>
//               <div className="eco-icon icon3">🌍</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   export default LoginRegister;

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