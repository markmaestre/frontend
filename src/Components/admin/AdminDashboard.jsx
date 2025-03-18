import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/AdminDashboard.css";
import { Home, FileText, Users, BarChart2,User, ChevronLeft, ChevronRight, Trash2, Edit, LogOut } from "lucide-react";
import EditProfile from "../user/EditProfile";
import Reports from "./Reports";
import UsersComponent from "./Users";
import Charts from "./Charts";
import UsersCharts from "./UsersCharts";
import axios from "axios";

const AdminDashboard = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activePage, setActivePage] = useState("Dashboard");
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalUsersCount: 0,
    activeUsersCount: 0,
    inactiveUsersCount: 0,
    newSignupsCount: 0,
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:4000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    const fetchStats = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/auth/users");
        const users = response.data;
    
       
        const totalUsersCount = users.length;
        const activeUsersCount = users.filter(user => user.is_active === true).length;
        const inactiveUsersCount = users.filter(user => user.is_active === false).length;
    
   
        const today = new Date();
        today.setHours(0, 0, 0, 0); 
    
        const thirtyDaysLater = new Date();
        thirtyDaysLater.setDate(thirtyDaysLater.getDate() + 30);
    
        
        const newSignupsCount = users.filter(user => {
          const createdAt = new Date(user.createdAt);
          return createdAt >= today && createdAt <= thirtyDaysLater;
        }).length;
    
        setStats({ totalUsersCount, activeUsersCount, inactiveUsersCount, newSignupsCount });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    

    const fetchRecentActivity = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/auth/users");
        const users = response.data;
    
        const recent = users
          .map(user => ({
            email: user.email,
            action: user.lastLogin ? "logged in" : "registered",
            timestamp: new Date(user.lastLogin || user.createdAt)
          }))
          .sort((a, b) => b.timestamp - a.timestamp)
          .slice(0, 5); 
    
        setRecentActivity(recent);
      } catch (error) {
        console.error("Error fetching recent activity:", error);
      }
    };
    
    

    

    fetchUser();
    fetchStats();
    fetchRecentActivity();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const sidebarItems = [
    { icon: <Home size={20} />, title: "Dashboard" },
    { icon: <FileText size={20} />, title: "Reports" },
    { icon: <Users size={20} />, title: "Users" },
    { icon: <User size={20} />, title: "UsersCharts" },
    { icon: <BarChart2 size={20} />, title: "Charts" },
  ];

  const renderPageContent = () => {
    if (showEditProfile) {
      return <EditProfile onClose={() => setShowEditProfile(false)} />;
    }

    switch (activePage) {
      case "Dashboard":
        return (
          <div className="dashboard-main">
            <h1>Admin Dashboard</h1>
            <div className="stats-container">
              <div className="stat-card">
                <h3>Total Users</h3>
                <p className="stat-number">{stats.totalUsersCount || "Loading..."}</p>
              </div>
              <div className="stat-card">
                <h3>Active Users</h3>
                <p className="stat-number">{stats.activeUsersCount || "Loading..."}</p>
              </div>
              <div className="stat-card">
                <h3>Inactive Users</h3>
                <p className="stat-number">{stats.inactiveUsersCount || "Loading..."}</p>
              </div>
              <div className="stat-card">
                <h3>New Signups (30 days)</h3>
                <p className="stat-number">{stats.newSignupsCount || "Loading..."}</p>
              </div>
            </div>

            <div className="recent-activity">
  <h2>Recent Activity</h2>
  <div className="activity-list">
    {recentActivity.length > 0 ? (
      recentActivity.map((activity, index) => (
        <div key={index} className="activity-item">
          <div className="activity-icon">
            <Users size={16} />
          </div>
          <div className="activity-content">
            <p className="activity-text">{activity.email} {activity.action}</p>
            <p className="activity-time">{activity.timestamp.toLocaleString()}</p>
          </div>
        </div>
      ))
    ) : (
      <p>No recent activity.</p>
    )}
  </div>
</div>


          </div>
        );
      case "Reports":
        return <Reports />;
      case "Users":
        return <UsersComponent />;
      case "Charts":
        return <Charts />;
      case "UsersCharts":
          return <UsersCharts />;
      default:
        return (
          <div className="page-placeholder">
            <h2>{activePage}</h2>
            <p>This feature is coming soon!</p>
          </div>
        );
    }
  };

  return (
    <div className="dashboard-container">
      <div className={`sidebar ${isExpanded ? "expanded" : "collapsed"}`}>
        <div className="sidebar-header">
          <div className="logo-container">
            {isExpanded ? (
              <>
                <Trash2 className="logo-icon" />
                <span className="logo-text">HazWaste Admin</span>
              </>
            ) : (
              <Trash2 className="logo-icon" />
            )}
          </div>
          <button className="toggle-btn" onClick={toggleSidebar}>
            {isExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>
        <nav className="sidebar-menu">
          <ul>
            {sidebarItems.map((item, index) => (
              <li 
                key={index} 
                className={activePage === item.title ? "active" : ""}
                onClick={() => {
                  setActivePage(item.title);
                  setShowEditProfile(false);
                }}
              >
                <div className="menu-item">
                  <div className="icon">{item.icon}</div>
                  {isExpanded && <span className="title">{item.title}</span>}
                </div>
              </li>
            ))}
          </ul>
        </nav>
        <div className="sidebar-footer">
          {isExpanded && (
            <>
              <div className="user-actions">
                <button 
                  className="action-button"
                  onClick={() => setShowEditProfile(true)}
                  title="Edit Profile"
                >
                  <Edit size={16} />
                  <span>Edit Profile</span>
                </button>
                <button 
                  className="action-button"
                  onClick={handleLogout}
                  title="Logout"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
              <div className="user-info">
                <div className="user-avatar">A</div>
                <div className="user-details">
                  {user && <p className="user-email">{user.email}</p>}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="content-area">{renderPageContent()}</div>
    </div>
  );
};

export default AdminDashboard;
