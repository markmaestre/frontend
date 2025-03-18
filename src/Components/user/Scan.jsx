import React, { useState, useEffect } from "react";
import { UploadCloud, Loader, Check, AlertCircle, Trash2, RefreshCw } from "lucide-react";
import "../css/Scan.css";

const Scan = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [location, setLocation] = useState("");
  const [isRecyclable, setIsRecyclable] = useState(null);
  
  // States for loading indicators
  const [fetchingUser, setFetchingUser] = useState(false);
  const [fetchingLocation, setFetchingLocation] = useState(false);
  const [reportSubmitting, setReportSubmitting] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    const fetchUserEmail = async () => {
      setFetchingUser(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          showNotification("No token found. Please log in.", "error");
          setFetchingUser(false);
          return;
        }

        const response = await fetch("http://127.0.0.1:4000/api/auth/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }

        const data = await response.json();
        setUserEmail(data.email);
        showNotification("User profile loaded successfully", "success");
      } catch (error) {
        console.error("Error fetching user email:", error);
        showNotification("Error loading user profile", "error");
      } finally {
        setFetchingUser(false);
      }
    };

    fetchUserEmail();
  }, []);

  useEffect(() => {
    if ("geolocation" in navigator) {
      setFetchingLocation(true);
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await res.json();
          setLocation(data.display_name);
          showNotification("Location detected", "success");
        } catch (error) {
          console.error("Error fetching location:", error);
          showNotification("Could not detect location", "error");
        } finally {
          setFetchingLocation(false);
        }
      }, (error) => {
        console.error("Error getting position:", error);
        showNotification("Location access denied", "error");
        setFetchingLocation(false);
      });
    } else {
      showNotification("Geolocation is not supported by your browser", "error");
    }
  }, []);

  const showNotification = (message, type = "info") => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 3000);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      showNotification("Image uploaded successfully", "success");
    }
  };

  const clearImage = () => {
    setFile(null);
    setResult(null);
    setFeedback("");
    showNotification("Image and results cleared", "info");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      showNotification("Please upload an image", "error");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setResult(data);

      // Determine recyclability based on the detected class
      const detectedClass = data.class.toLowerCase();
      if (detectedClass.includes("organic")) {
        setIsRecyclable("Recyclable (Compostable)");
      } else if (detectedClass.includes("non_hazardous")) {
        setIsRecyclable("Recyclable");
      } else if (detectedClass.includes("hazardous")) {
        setIsRecyclable("Non-Recyclable");
      } else {
        setIsRecyclable("Non-Recyclable");
      }

      showNotification("Analysis completed successfully", "success");
    } catch (error) {
      console.error("Error:", error);
      showNotification("Failed to analyze image", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleReport = async () => {
    if (!file || !result?.class || !result?.confidence || !feedback || !userEmail || !location) {
      showNotification("Please fill in all required fields", "error");
      return;
    }
  
    setReportSubmitting(true);
    const formData = new FormData();
    formData.append("image", file);
    formData.append("detectedClass", result.class);
    formData.append("confidence", result.confidence);
    formData.append("recyclability", isRecyclable);
    formData.append("userFeedback", feedback);
    formData.append("userEmail", userEmail);
    formData.append("location", location);
  
    try {
      const response = await fetch("http://localhost:4000/api/reports", {
        method: "POST",
        body: formData,
      });
  
      if (response.ok) {
        showNotification("Report submitted successfully!", "success");
        setTimeout(() => window.location.reload(), 2000);
      } else {
        const errorData = await response.json();
        showNotification(`Failed to submit report: ${errorData.error}`, "error");
      }
    } catch (error) {
      console.error("Error:", error);
      showNotification("An error occurred while submitting the report", "error");
    } finally {
      setReportSubmitting(false);
    }
  };

  // Get disposal instructions based on the detected waste type
  const getDisposalInstructions = (detectedClass) => {
    const lowerCaseClass = detectedClass.toLowerCase();
    if (lowerCaseClass.includes("organic")) {
      return "This item is organic and compostable. Please dispose of it in a compost bin or use it for composting.";
    } else if (lowerCaseClass.includes("non_hazardous")) {
      return "This item is non-hazardous and recyclable. Please place it in the designated recycling bin.";
    } else if (lowerCaseClass.includes("hazardous")) {
      return "This item is hazardous and requires special disposal. Please take it to a hazardous waste collection facility.";
    } else {
      return "This item is non-recyclable. Please dispose of it in the general waste bin.";
    }
  };

  return (
    <div className="scan-container">
      {notification.show && (
        <div className={`notification ${notification.type}`}>
          {notification.type === "success" && <Check size={18} />}
          {notification.type === "error" && <AlertCircle size={18} />}
          {notification.message}
        </div>
      )}

      <div className="header-section">
        <h1 className="scan-title">Waste Scanner</h1>
        <p className="subtitle">Upload an image of waste for AI identification and disposal guidance.</p>
      
        <div className="user-section">
          {fetchingUser ? (
            <div className="loading-indicator">
              <Loader size={16} className="spinner" />
              <span>Loading user profile...</span>
            </div>
          ) : userEmail ? (
            <div className="user-info">
              <span className="user-label">User:</span>
              <span className="user-email">{userEmail}</span>
            </div>
          ) : (
            <p className="user-email error">Not logged in</p>
          )}
          
          {fetchingLocation ? (
            <div className="loading-indicator">
              <Loader size={16} className="spinner" />
              <span>Detecting location...</span>
            </div>
          ) : location ? (
            <div className="location-info">
              <span className="location-label">Location:</span>
              <span className="location-value">{location}</span>
            </div>
          ) : null}
        </div>
      </div>

      <div className="main-content">
        <div className="upload-section">
          <div className={`scan-box ${file ? 'has-image' : ''}`}>
            {file ? (
              <div className="image-container">
                <img src={URL.createObjectURL(file)} alt="Preview" className="preview-image" />
                <button className="clear-image-btn" onClick={clearImage} title="Clear Image">
                  <Trash2 size={20} />
                </button>
              </div>
            ) : (
              <div className="placeholder">
                <UploadCloud size={64} />
                <p className="placeholder-text">Upload a waste item image for analysis</p>
              </div>
            )}
          </div>

          <div className="upload-controls">
            <label className="upload-btn">
              <UploadCloud size={22} /> 
              <span>Upload Image</span>
              <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </label>
            
            <button 
              className={`scan-btn ${loading ? 'loading' : ''}`} 
              onClick={handleSubmit} 
              disabled={loading || !file}
            >
              {loading ? <Loader size={22} className="spinner" /> : <RefreshCw size={22} />}
              <span>{loading ? "Analyzing..." : "Analyze Waste"}</span>
            </button>
          </div>
        </div>

        {result && (
          <div className="result-section">
            <div className="result-header">
              <h2>Analysis Results</h2>
              <div className={`recyclability-badge ${isRecyclable.includes("Recyclable") ? "recyclable" : "non-recyclable"}`}>
                {isRecyclable}
              </div>
            </div>
            
            <div className="result-card">
              <div className="result-item">
                <span className="result-label">Detected Item:</span>
                <span className="result-value highlight">{result.class}</span>
              </div>
              
              <div className="result-item">
                <span className="result-label">Accuracy:</span>
                <div className="confidence-wrapper">
                  <span className="result-value">{(result.confidence * 100).toFixed(2)}%</span>
                  <div className="confidence-bar">
                    <div 
                      className="confidence-level" 
                      style={{ width: `${result.confidence * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="disposal-instructions">
                <h3>Disposal Instructions</h3>
                <p>{getDisposalInstructions(result.class)}</p>
              </div>
            </div>
            
            <div className="feedback-section">
              <label htmlFor="feedback" className="feedback-label">Your Feedback:</label>
              <textarea 
                id="feedback"
                placeholder="Share your feedback about this prediction or report incorrect results..." 
                value={feedback} 
                onChange={(e) => setFeedback(e.target.value)} 
                className="feedback-input"
              />
              
              <button 
                className={`report-btn ${reportSubmitting ? 'loading' : ''}`} 
                onClick={handleReport}
                disabled={reportSubmitting || !feedback}
              >
                {reportSubmitting ? <Loader size={20} className="spinner" /> : null}
                <span>{reportSubmitting ? "Submitting..." : "Submit Report"}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Scan;