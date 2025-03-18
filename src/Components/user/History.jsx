import React, { useState, useEffect } from "react";
import { Search, Grid, Filter, Calendar } from "lucide-react";
import axios from "axios";
import "../css/Reports.css";

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [wasteScans, setWasteScans] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [loggedInUserEmail, setLoggedInUserEmail] = useState("");
  const [fetchingUser, setFetchingUser] = useState(false);

  useEffect(() => {
    const fetchUserEmail = async () => {
      setFetchingUser(true);
      try {
        const token = localStorage.getItem("token"); // Retrieve the token from localStorage
        if (!token) {
          throw new Error("No token found");
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
        setLoggedInUserEmail(data.email); // Set the logged-in user's email
      } catch (error) {
        console.error("Error fetching user email:", error);
      } finally {
        setFetchingUser(false);
      }
    };

    fetchUserEmail();
  }, []);

  // Fetch reports for the logged-in user
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/reports/reports");
        // Filter reports by the logged-in user's email
        const userReports = response.data.filter(
          (scan) => scan.userEmail === loggedInUserEmail
        );
        setWasteScans(userReports);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };

    if (loggedInUserEmail) {
      fetchReports();
    }
  }, [loggedInUserEmail]);

  // Filter waste scans by search term and status
  const filteredWasteScans = wasteScans
    .filter((scan) =>
      scan.detectedClass?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scan.userFeedback?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scan.status?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((scan) =>
      statusFilter === "" || scan.status.toLowerCase() === statusFilter.toLowerCase()
    );

  return (
    <div className="reports-container">
      <header className="reports-header">
        <h1>Waste Scan History</h1>
        <div className="actions-bar">
          <div className="search-wrapper">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search waste items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="view-options">
            <button className="view-button active">
              <Grid size={20} />
            </button>
            <button
              className="filter-button"
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <Filter size={20} />
              <span>Filter</span>
            </button>
          </div>
        </div>
      </header>

      {filterOpen && (
        <div className="filter-option">
          <label>
            Status:
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="">All</option>
              <option value="Pending">Pending</option>
              <option value="Resolved">Resolved</option>
              <option value="Archived">Archived</option>
            </select>
          </label>
        </div>
      )}

      <div className="status-display">
        <h2>Current Status: {statusFilter || "All"}</h2>
      </div>

      <div className="waste-grid">
        {filteredWasteScans.length > 0 ? (
          filteredWasteScans.map((scan) => (
            <div key={scan._id} className="waste-card">
              <div className="waste-image">
                <img src={scan.imageUrl || "/images/default.png"} alt={scan.detectedClass} />
              </div>
              <div className="waste-content">
                <h2>{scan.detectedClass}</h2>
                <div className="waste-category">
                  <span className={`category-tag ${scan.status.toLowerCase()}`}>{scan.status}</span>
                </div>
                <div className="waste-date">
                  <Calendar size={16} />
                  <span>{new Date(scan.reportedAt).toLocaleDateString()}</span>
                </div>
                <p className="waste-description">{scan.userFeedback}</p>
                <div className="waste-submitted-by">
                  <strong>Reported by:</strong> {scan.userEmail}
                </div>
                <div className="waste-disposal">
                  <strong>Location:</strong> {scan.location}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No waste scans found.</p>
        )}
      </div>
    </div>
  );
};

export default Reports;