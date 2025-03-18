import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    location: "",
    phone_number: "",
    password: "",
    confirmPassword: "",
    gender: "male",
  });
  const [isLocating, setIsLocating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  // Handle form inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Detect User Location
  const detectLocation = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
            );
            const data = await response.json();
            const address = data.display_name || `${latitude}, ${longitude}`;
            setFormData((prev) => ({ ...prev, location: address }));
          } catch (error) {
            console.error("Error getting address:", error);
            setFormData((prev) => ({
              ...prev,
              location: `${latitude}, ${longitude}`,
            }));
          } finally {
            setIsLocating(false);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsLocating(false);
        }
      );
    } else {
      setIsLocating(false);
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.email || !formData.password) {
      setError("Please fill in all required fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/api/auth/register", {
        username: formData.username,
        email: formData.email,
        location: formData.location,
        phone_number: formData.phone_number,
        password: formData.password,
        gender: formData.gender,
      });

      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };
  
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  // CSS Styles
  const styles = {
    registerPage: {
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f5f7fa",
      padding: "20px",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    },
    registerContainer: {
      display: "flex",
      width: "100%",
      maxWidth: "1200px",
      minHeight: "600px",
      backgroundColor: "#ffffff",
      borderRadius: "16px",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
      overflow: "hidden"
    },
    brandSide: {
      flex: 1,
      background: "linear-gradient(135deg,rgb(47, 48, 47),rgb(36, 37, 36))",
      color: "white",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
      padding: "40px"
    },
    brandContent: {
      position: "relative",
      zIndex: 2,
      textAlign: "center",
      maxWidth: "420px"
    },
    brandName: {
      fontSize: "48px",
      fontWeight: 700,
      marginBottom: "12px",
      letterSpacing: "1px"
    },
    brandTagline: {
      fontSize: "18px",
      marginBottom: "40px",
      opacity: 0.9
    },
    brandFeatures: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      marginTop: "40px"
    },
    featureItem: {
      display: "flex",
      alignItems: "center",
      gap: "15px",
      backgroundColor: "rgba(255, 255, 255, 0.15)",
      borderRadius: "10px",
      padding: "12px 20px",
      backdropFilter: "blur(5px)",
      transition: "transform 0.3s"
    },
    featureIcon: {
      fontSize: "24px"
    },
    featureText: {
      fontSize: "16px",
      fontWeight: 500
    },
    decorativeShapes: {
      position: "relative",
      width: "100%",
      height: "100%"
    },
    shape: {
      position: "absolute",
      borderRadius: "50%",
      opacity: 0.2
    },
    shape1: {
      width: "200px",
      height: "200px",
      backgroundColor: "rgba(255, 255, 255, 0.3)",
      top: "-50px",
      right: "-50px"
    },
    shape2: {
      width: "150px",
      height: "150px",
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      bottom: "50px",
      left: "-40px"
    },
    shape3: {
      width: "100px",
      height: "100px",
      backgroundColor: "rgba(255, 255, 255, 0.3)",
      bottom: "30%",
      right: "10%"
    },
    formSide: {
      flex: 1.2,
      padding: "40px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    },
    formContainer: {
      maxWidth: "480px",
      width: "100%",
      margin: "0 auto"
    },
    formTitle: {
      fontSize: "32px",
      fontWeight: 700,
      color: "#333",
      marginBottom: "8px"
    },
    formSubtitle: {
      fontSize: "16px",
      color: "#666",
      marginBottom: "30px"
    },
    alert: {
      padding: "12px 16px",
      borderRadius: "8px",
      marginBottom: "20px",
      fontSize: "14px",
      fontWeight: 500
    },
    alertError: {
      backgroundColor: "#fff1f1",
      color: "#e53935",
      borderLeft: "4px solid #e53935"
    },
    alertSuccess: {
      backgroundColor: "#f0f9f4",
      color: "#0a9f5f",
      borderLeft: "4px solid #0a9f5f"
    },
    formRow: {
      marginBottom: "20px"
    },
    inputGroup: {
      width: "100%"
    },
    label: {
      display: "block",
      fontSize: "14px",
      fontWeight: 500,
      color: "#555",
      marginBottom: "6px"
    },
    inputWrapper: {
      display: "flex",
      alignItems: "center",
      border: "1px solid #e0e0e0",
      borderRadius: "8px",
      overflow: "hidden",
      transition: "all 0.3s"
    },
    inputIcon: {
      padding: "0 12px",
      fontSize: "16px",
      color: "#999"
    },
    input: {
      flex: 1,
      padding: "12px 15px",
      border: "none",
      outline: "none",
      fontSize: "15px"
    },
    select: {
      flex: 1,
      padding: "12px 15px",
      border: "none",
      outline: "none",
      fontSize: "15px",
      backgroundColor: "transparent",
      width: "100%"
    },
    locationWrapper: {
      display: "flex",
      alignItems: "center"
    },
    locationBtn: {
      padding: "12px 15px",
      backgroundColor: "#0a9f5f",
      color: "white",
      border: "none",
      borderRadius: "0 8px 8px 0",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: 500,
      whiteSpace: "nowrap"
    },
    locationBtnDisabled: {
      backgroundColor: "#ccc",
      cursor: "not-allowed"
    },
    togglePassword: {
      background: "none",
      border: "none",
      padding: "0 15px",
      cursor: "pointer",
      fontSize: "18px"
    },
    submitBtn: {
      width: "100%",
      padding: "14px",
      backgroundColor: "#0a9f5f",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: 600,
      transition: "background-color 0.3s",
      marginTop: "10px"
    },
    submitBtnHover: {
      backgroundColor: "#078550"
    },
    authRedirect: {
      marginTop: "20px",
      textAlign: "center",
      fontSize: "14px",
      color: "#666"
    },
    loginLink: {
      color: "#0a9f5f",
      fontWeight: 600,
      textDecoration: "none"
    }
  };
  
  return (
    <div style={styles.registerPage}>
      <div style={styles.registerContainer}>
        <div style={styles.brandSide}>
          <div style={styles.brandContent}>
            <h1 style={styles.brandName}>HazWaste</h1>
            <p style={styles.brandTagline}>Manage waste responsibly for a greener tomorrow</p>
            
            <div style={styles.brandFeatures}>
              <div style={styles.featureItem}>
                <div style={styles.featureIcon}>♻️</div>
                <div style={styles.featureText}>Track waste disposal</div>
              </div>
              <div style={styles.featureItem}>
                <div style={styles.featureIcon}>🌱</div>
                <div style={styles.featureText}>Reduce environmental impact</div>
              </div>
              <div style={styles.featureItem}>
                <div style={styles.featureIcon}>🌍</div>
                <div style={styles.featureText}>Connect with eco-partners</div>
              </div>
            </div>
            
            <div style={styles.decorativeShapes}>
              <div style={{...styles.shape, ...styles.shape1}}></div>
              <div style={{...styles.shape, ...styles.shape2}}></div>
              <div style={{...styles.shape, ...styles.shape3}}></div>
            </div>
          </div>
        </div>
        
        <div style={styles.formSide}>
          <div style={styles.formContainer}>
            <h2 style={styles.formTitle}>Create Your Account</h2>
            <p style={styles.formSubtitle}>Join our community of responsible waste managers</p>
            
            {error && <div style={{...styles.alert, ...styles.alertError}}>{error}</div>}
            {success && <div style={{...styles.alert, ...styles.alertSuccess}}>{success}</div>}
            
            <form onSubmit={handleSubmit}>
              <div style={styles.formRow}>
                <div style={styles.inputGroup}>
                  <label style={styles.label} htmlFor="username">Full Name</label>
                  <div style={styles.inputWrapper}>
                    <span style={styles.inputIcon}>👤</span>
                    <input
                      style={styles.input}
                      type="text"
                      id="username"
                      name="username"
                      placeholder="Enter your full name"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div style={styles.formRow}>
                <div style={styles.inputGroup}>
                  <label style={styles.label} htmlFor="email">Email Address</label>
                  <div style={styles.inputWrapper}>
                    <span style={styles.inputIcon}>✉️</span>
                    <input
                      style={styles.input}
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div style={styles.formRow}>
                <div style={styles.inputGroup}>
                  <label style={styles.label} htmlFor="phone_number">Phone Number</label>
                  <div style={styles.inputWrapper}>
                    <span style={styles.inputIcon}>📱</span>
                    <input
                      style={styles.input}
                      type="text"
                      id="phone_number"
                      name="phone_number"
                      placeholder="Enter your phone number"
                      value={formData.phone_number}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div style={styles.formRow}>
                <div style={styles.inputGroup}>
                  <label style={styles.label} htmlFor="location">Location</label>
                  <div style={styles.locationWrapper}>
                    <span style={styles.inputIcon}>📍</span>
                    <input
                      style={styles.input}
                      type="text"
                      id="location"
                      name="location"
                      placeholder="Enter your location"
                      value={formData.location}
                      onChange={handleChange}
                    />
                    <button 
                      type="button" 
                      style={isLocating ? {...styles.locationBtn, ...styles.locationBtnDisabled} : styles.locationBtn} 
                      onClick={detectLocation} 
                      disabled={isLocating}
                    >
                      {isLocating ? "Detecting..." : "Detect"}
                    </button>
                  </div>
                </div>
              </div>
              
              <div style={styles.formRow}>
                <div style={styles.inputGroup}>
                  <label style={styles.label} htmlFor="gender">Gender</label>
                  <div style={styles.inputWrapper}>
                    <span style={styles.inputIcon}>👥</span>
                    <select
                      style={styles.select}
                     id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select your gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div style={styles.formRow}>
                <div style={styles.inputGroup}>
                  <label style={styles.label} htmlFor="password">Password</label>
                  <div style={styles.inputWrapper}>
                    <span style={styles.inputIcon}>🔒</span>
                    <input
                      style={styles.input}
                      type={passwordVisible ? "text" : "password"}
                      id="password"
                      name="password"
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <button 
                      type="button" 
                      style={styles.togglePassword} 
                      onClick={togglePasswordVisibility}
                    >
                      {passwordVisible ? "👁️" : "👁️‍🗨️"}
                    </button>
                  </div>
                </div>
              </div>
              
              <div style={styles.formRow}>
                <div style={styles.inputGroup}>
                  <label style={styles.label} htmlFor="confirmPassword">Confirm Password</label>
                  <div style={styles.inputWrapper}>
                    <span style={styles.inputIcon}>🔒</span>
                    <input
                      style={styles.input}
                      type={confirmPasswordVisible ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                    <button 
                      type="button" 
                      style={styles.togglePassword} 
                      onClick={toggleConfirmPasswordVisibility}
                    >
                      {confirmPasswordVisible ? "👁️" : "👁️‍🗨️"}
                    </button>
                  </div>
                </div>
              </div>
              
              <button 
                type="submit" 
                style={styles.submitBtn}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#078550";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "#0a9f5f";
                }}
              >
                Create Account
              </button>
              
              <div style={styles.authRedirect}>
                Already have an account? <Link to="/login" style={styles.loginLink}>Log In</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;