import React, { useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/UserDashboard.css';
import { Home, Clock, Map as MapIcon, Camera, BookOpen, GamepadIcon, ChevronLeft, ChevronRight, Search, Trash2, Edit, LogOut } from 'lucide-react';
import Map from './Maps';
import History from './History';
import Scan from './Scan';
import Education from './Education';
import Game from './Game';
import EditProfile from './EditProfile'; 
import axios from "axios";

const UserDashboard = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activePage, setActivePage] = useState('Dashboard');
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [user, setUser] = useState(null);
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
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/ ";
  };
  
  const sidebarItems = [
    { icon: <Home size={20} />, title: 'Dashboard' },
    { icon: <Clock size={20} />, title: 'History' },
    { icon: <MapIcon size={20} />, title: 'Maps' },
    { icon: <Camera size={20} />, title: 'Scan' },
    { icon: <BookOpen size={20} />, title: 'Education' },
    { icon: <GamepadIcon size={20} />, title: 'Game' },
  ];

  const renderPageContent = () => {
    if (showEditProfile) {
      return <EditProfile onClose={() => setShowEditProfile(false)} />;
    }
    
    switch (activePage) {
      case 'Dashboard':
        return (
          <div className="welcome-container">
            <div className="welcome-content">
              <h1>Welcome to</h1>
              <h2>HazWaste</h2>
              <p>
                AI and Mail-Based Waste Classification with Facility Mapping System. 
                Your one-stop solution for responsible hazardous waste management.
                Start exploring our features to make a positive environmental impact today.
              </p>
              <Link to="/LoginRegister">
                <button className="get-started-button">Get Started</button>
              </Link>
            </div>
            <div className="welcome-graphics">
              <div className="hexagon-icon top-right"></div>
              <div className="hexagon-icon bottom-left"></div>
              <div className="pulse-circle"></div>
              
              <div className="chart-bar-container">
                {Array(8).fill().map((_, i) => (
                  <div 
                    key={i} 
                    className="chart-bar" 
                    style={{ 
                      height: `${Math.random() * 120 + 40}px`,
                      backgroundColor: i % 2 === 0 ? '#00bfa6' : '#2e7d32'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        );
      case 'Maps':
        return <Map />;
      case 'History':
        return <History />;
      case 'Scan':
        return <Scan />;
      case 'Education':
        return <Education />;
      case 'Game':
        return <Game />;
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
      <div className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
        <div className="sidebar-header">
          <div className="logo-container">
            {isExpanded ? (
              <>
                <Trash2 className="logo-icon" />
                <span className="logo-text">HazWaste</span>
              </>
            ) : (
              <Trash2 className="logo-icon" />
            )}
          </div>
          <button className="toggle-btn" onClick={toggleSidebar}>
            {isExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>
        <div className="search-container">
          {isExpanded ? (
            <div className="search-box">
              <Search size={10} />
              <input type="text" placeholder="Search" />
            </div>
          ) : (
            <div className="search-icon-only">
              <Search size={20} />
            </div>
          )}
        </div>
        <nav className="sidebar-menu">
          <ul>
            {sidebarItems.map((item, index) => (
              <li 
                key={index} 
                className={activePage === item.title ? 'active' : ''}
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
                <div className="user-avatar">P</div>
                <div className="user-details">
                {user && <p className="user-email"><user size={16} /> {user.email}</p>}
                </div>
              </div>  
            </>
          )}
          {!isExpanded && (
            <div className="collapsed-user-actions">
              <button 
                className="action-button-small"
                onClick={() => setShowEditProfile(true)}
                title="Edit Profile"
              >
                <Edit size={16} />
              </button>
              <button 
                className="action-button-small"
                onClick={handleLogout}
                title="Logout"
              >
                <LogOut size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="content-area">
        {renderPageContent()}
      </div>
    </div>
  );
};

export default UserDashboard;