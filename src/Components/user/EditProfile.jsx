import React, { useState } from 'react';
import { X } from 'lucide-react';
import "../css/EditProfile.css";

const EditProfile = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: 'Pops Madriaga',
    email: 'pops@gmail.com',
    avatar: 'P',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle profile update logic here
    console.log('Profile updated:', formData);
    onClose();
  };

  return (
    <div className="edit-profile-container">
      <div className="edit-profile-header">
        <h2>Edit Profile</h2>
        <button className="close-button" onClick={onClose}>
          <X size={20} />
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="avatar-section">
          <div className="user-avatar large">{formData.avatar}</div>
          <button type="button" className="change-avatar-btn">Change Avatar</button>
        </div>
        
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">New Password (leave blank to keep current)</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm New Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        
        <div className="button-group">
          <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          <button type="submit" className="save-btn">Save Changes</button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;