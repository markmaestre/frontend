import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Users.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusLoading, setStatusLoading] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('active'); // Default to showing active users

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/auth/users');
      setUsers(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching users: ' + (err.response?.data?.message || err.message));
      setLoading(false);
    }
  };

  const toggleUserStatus = async (userId, currentStatus) => {
    setStatusLoading(prev => ({ ...prev, [userId]: true }));
    
    try {
      const newStatus = !currentStatus;
      
      const response = await axios.put(`http://localhost:4000/api/auth/users/${userId}/status`, {
        is_active: newStatus
      });
      
      setUsers(users.map(user => 
        user._id === userId ? { ...user, is_active: newStatus } : user
      ));
      
      // If user modal is open, close it after status change
      if (showModal && selectedUser && selectedUser._id === userId) {
        setShowModal(false);
        setSelectedUser(null);
      }
      
      alert(`User status changed to ${newStatus ? 'active' : 'inactive'} successfully`);
      
    } catch (err) {
      console.error("Error toggling user status:", err);
      alert('Error updating user status: ' + (err.response?.data?.message || err.message));
    } finally {
      setStatusLoading(prev => ({ ...prev, [userId]: false }));
    }
  };

  const openUserModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  // Filter users based on active tab
  const filteredUsers = users.filter(user => 
    (activeTab === 'active' && user.is_active) || 
    (activeTab === 'inactive' && !user.is_active)
  );

  // Count active and inactive users
  const activeCount = users.filter(user => user.is_active).length;
  const inactiveCount = users.filter(user => !user.is_active).length;

  if (loading) {
    return <div className="loading-container"><div className="loading">Loading users...</div></div>;
  }

  if (error) {
    return <div className="error-container"><div className="error">{error}</div></div>;
  }

  return (
    <div className="user-list-container">
      <h1 className="page-title">User Management</h1>
      <div className="user-count">Total Users: <span className="user-count-number">{users.length}</span></div>
      
      {/* Tab Navigation */}
      <div className="tabs-container">
        <div className="tabs">
          <button 
            className={`tab-btn ${activeTab === 'active' ? 'active' : ''}`}
            onClick={() => setActiveTab('active')}
          >
            Active Users <span className="tab-count">{activeCount}</span>
          </button>
          <button 
            className={`tab-btn ${activeTab === 'inactive' ? 'active' : ''}`}
            onClick={() => setActiveTab('inactive')}
          >
            Inactive Users <span className="tab-count">{inactiveCount}</span>
          </button>
        </div>
      </div>
      
      <div className="table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Status</th>
              <th>Actions</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-data">
                  No {activeTab} users found.
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr 
                  key={user._id} 
                  className={user.gender?.toLowerCase() === 'male' ? 'male-row' : user.gender?.toLowerCase() === 'female' ? 'female-row' : ''}
                  onClick={() => openUserModal(user)}
                >
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <div className="gender-indicator">
                      <span className={`gender-icon ${user.gender?.toLowerCase() || 'unknown'}`}>
                        {user.gender?.toLowerCase() === 'male' ? '♂' : user.gender?.toLowerCase() === 'female' ? '♀' : '?'}
                      </span>
                      {user.gender || 'Unknown'}
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge ${user.is_active ? "active" : "inactive"}`}>
                      {user.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td>
                    <button
                      className={`status-btn ${user.is_active ? 'deactivate-btn' : 'activate-btn'}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleUserStatus(user._id, user.is_active);
                      }}
                      disabled={statusLoading[user._id]}
                    >
                      {statusLoading[user._id] ? 'Updating...' : user.is_active ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                  <td>
                    <span className="user-role">{user.role || 'User'}</span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && selectedUser && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="user-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>User Profile</h2>
              <button className="close-btn" onClick={closeModal}>×</button>
            </div>
            <div className="modal-body">
              <div className="user-avatar">
                <div className={`avatar-placeholder ${selectedUser.gender?.toLowerCase() || 'unknown'}`}>
                  {selectedUser.username?.charAt(0).toUpperCase() || '?'}
                </div>
              </div>
              
              <div className="user-details">
                <div className="detail-row">
                  <span className="detail-label">Username:</span>
                  <span className="detail-value">{selectedUser.username}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Email:</span>
                  <span className="detail-value">{selectedUser.email}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Gender:</span>
                  <span className="detail-value">{selectedUser.gender || 'Not specified'}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Location:</span>
                  <span className="detail-value">{selectedUser.location || 'Not specified'}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Phone Number:</span>
                  <span className="detail-value">{selectedUser.phone_number || 'Not specified'}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Status:</span>
                  <span className={`status-badge ${selectedUser.is_active ? "active" : "inactive"}`}>
                    {selectedUser.is_active ? "Active" : "Inactive"}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Role:</span>
                  <span className="detail-value">{selectedUser.role || 'User'}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Last Login:</span>
                  <span className="detail-value">
                    {selectedUser.lastLogin ? new Date(selectedUser.lastLogin).toLocaleString() : 'Never'}
                  </span>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className={`status-btn ${selectedUser.is_active ? 'deactivate-btn' : 'activate-btn'}`}
                onClick={() => toggleUserStatus(selectedUser._id, selectedUser.is_active)}
                disabled={statusLoading[selectedUser._id]}
              >
                {statusLoading[selectedUser._id] ? 'Updating...' : selectedUser.is_active ? 'Deactivate User' : 'Activate User'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;