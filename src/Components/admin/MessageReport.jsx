import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';  // Import useLocation hook
import '../css/MessageReport.css';

const MessageReport = () => {
  const [message, setMessage] = useState('');
  const location = useLocation();  // Access location object

  useEffect(() => {
    // Prefill the message with the scan report text passed from ScanReport
    if (location.state && location.state.scanReportText) {
      setMessage(location.state.scanReportText);
    }
  }, [location.state]);

  // Handle message input change
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  // Handle message send
  const handleSendMessage = () => {
    alert(`Message sent: \n${message}`);
    setMessage(''); // Clear the message after sending
  };

  return (
    <div className="message-report">
      <h2>Message Report</h2>

      {/* Pre-filled message with scan report details */}
      <textarea
        value={message}
        onChange={handleMessageChange}
        placeholder="Enter message to Local Government Unit of Taguig..."
        rows="10"
      ></textarea>

      <button onClick={handleSendMessage}>Send Message</button>
    </div>
  );
};

export default MessageReport;