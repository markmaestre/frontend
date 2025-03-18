import React, { useState, useEffect } from "react";
import { Search, Grid, Filter, Calendar, CheckCircle, Archive, List, Trash2, AlertCircle, X } from "lucide-react";
import axios from "axios";
import "../css/AllReports.css";

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [wasteScans, setWasteScans] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [loading, setLoading] = useState(true);
  const [selectedScan, setSelectedScan] = useState(null);
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:4000/api/reports/reports");
        setWasteScans(response.data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  // Handle Resolve Button Click
  const handleResolve = async (id) => {
    try {
      await axios.put(`http://localhost:4000/api/reports/resolve/${id}`);
      
      // Update UI
      setWasteScans((prev) =>
        prev.map((scan) => (scan._id === id ? { ...scan, status: "Resolved" } : scan))
      );
      
      // Show success toast
      showToast("Report successfully resolved!");
    } catch (error) {
      console.error("Error resolving report:", error);
      showToast("Failed to resolve report", "error");
    }
  };

  // Handle Archive Button Click
  const handleArchive = async (id) => {
    setSelectedScan(wasteScans.find(scan => scan._id === id));
    document.getElementById("archiveModal").classList.add("active");
  };

  // Submit Archive Form
  const submitArchive = async (e) => {
    e.preventDefault();
    const feedback = document.getElementById("archiveFeedback").value;
    
    try {
      await axios.put(`http://localhost:4000/api/reports/archive/${selectedScan._id}`, { feedback });
      
      // Update UI
      setWasteScans((prev) =>
        prev.map((scan) =>
          scan._id === selectedScan._id ? { ...scan, status: "Archived", archiveFeedback: feedback } : scan
        )
      );
      
      // Close modal and show success toast
      closeModal();
      showToast("Report archived successfully!");
    } catch (error) {
      console.error("Error archiving report:", error);
      showToast("Failed to archive report", "error");
    }
  };

  // Close the modal
  const closeModal = () => {
    document.getElementById("archiveModal").classList.remove("active");
    setSelectedScan(null);
  };

  // Show toast message
  const showToast = (message, type = "success") => {
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <span>${message}</span>
      <button onclick="this.parentElement.remove()"><X size={16} /></button>
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 5000);
  };

  // Handle sorting
  const handleSort = (criteria) => {
    if (sortBy === criteria) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(criteria);
      setSortOrder("asc");
    }
  };

  // Apply filters and sorting
  const filteredAndSortedWasteScans = wasteScans
    .filter((scan) =>
      (scan.detectedClass?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scan.userFeedback?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scan.status?.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "" || scan.status.toLowerCase() === statusFilter.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "date") {
        return sortOrder === "asc" 
          ? new Date(a.reportedAt) - new Date(b.reportedAt)
          : new Date(b.reportedAt) - new Date(a.reportedAt);
      } else if (sortBy === "class") {
        return sortOrder === "asc"
          ? a.detectedClass.localeCompare(b.detectedClass)
          : b.detectedClass.localeCompare(a.detectedClass);
      }
      return 0;
    });

  // Get status icon based on status
  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "resolved":
        return <CheckCircle size={16} />;
      case "archived":
        return <Archive size={16} />;
      case "pending":
        return <AlertCircle size={16} />;
      default:
        return <AlertCircle size={16} />;
    }
  };

  return (
    <div className="reports-container">
      <header className="reports-header">
        <h1>Waste Scan Reports</h1>
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
            <button 
              className={`view-button ${viewMode === "grid" ? "active" : ""}`}
              onClick={() => setViewMode("grid")}
            >
              <Grid size={20} />
            </button>
            <button 
              className={`view-button ${viewMode === "list" ? "active" : ""}`}
              onClick={() => setViewMode("list")}
            >
              <List size={20} />
            </button>
            <button
              className={`filter-button ${filterOpen ? "active" : ""}`}
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <Filter size={20} />
              <span>Filter</span>
            </button>
          </div>
        </div>
      </header>

      {filterOpen && (
        <div className="filter-panel">
          <div className="filter-group">
            <label>Status:</label>
            <div className="filter-option">
              <button 
                className={statusFilter === "" ? "active" : ""} 
                onClick={() => setStatusFilter("")}
              >
                All
              </button>
              <button 
                className={statusFilter === "pending" ? "active" : ""} 
                onClick={() => setStatusFilter("pending")}
              >
                Pending
              </button>
              <button 
                className={statusFilter === "resolved" ? "active" : ""} 
                onClick={() => setStatusFilter("resolved")}
              >
                Resolved
              </button>
              <button 
                className={statusFilter === "archived" ? "active" : ""} 
                onClick={() => setStatusFilter("archived")}
              >
                Archived
              </button>
            </div>
          </div>
          
          <div className="filter-group">
            <label>Sort By:</label>
            <div className="filter-option">
              <button 
                className={sortBy === "date" ? "active" : ""} 
                onClick={() => handleSort("date")}
              >
                Date {sortBy === "date" && (sortOrder === "asc" ? "↑" : "↓")}
              </button>
              <button 
                className={sortBy === "class" ? "active" : ""} 
                onClick={() => handleSort("class")}
              >
                Waste Type {sortBy === "class" && (sortOrder === "asc" ? "↑" : "↓")}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="status-summary">
        <div className="status-badge">
          <span className="status-count">{wasteScans.filter(scan => scan.status === "Pending").length}</span>
          <span className="status-label">Pending</span>
        </div>
        <div className="status-badge">
          <span className="status-count">{wasteScans.filter(scan => scan.status === "Resolved").length}</span>
          <span className="status-label">Resolved</span>
        </div>
        <div className="status-badge">
          <span className="status-count">{wasteScans.filter(scan => scan.status === "Archived").length}</span>
          <span className="status-label">Archived</span>
        </div>
      </div>

      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading reports...</p>
        </div>
      ) : (
        <>
          {viewMode === "grid" ? (
            <div className="waste-grid">
              {filteredAndSortedWasteScans.length > 0 ? (
                filteredAndSortedWasteScans.map((scan) => (
                  <div key={scan._id} className={`waste-card ${scan.status.toLowerCase()}`}>
                    <div className="waste-image">
                      <img src={scan.imageUrl || "/images/default.png"} alt={scan.detectedClass} />
                      <span className={`status-tag ${scan.status.toLowerCase()}`}>
                        {getStatusIcon(scan.status)}
                        {scan.status}
                      </span>
                    </div>
                    <div className="waste-content">
                      <h2>{scan.detectedClass}</h2>
                      <div className="waste-date">
                        <Calendar size={16} />
                        <span>{new Date(scan.reportedAt).toLocaleDateString()}</span>
                      </div>
                      <p className="waste-description">{scan.userFeedback}</p>
                      <div className="waste-details">
                        <div className="waste-submitted-by">
                          <strong>Reported by:</strong> {scan.userEmail}
                        </div>
                        <div className="waste-location">
                          <strong>Location:</strong> {scan.location}
                        </div>
                      </div>

                      {scan.status !== "Archived" && (
                        <div className="waste-actions">
                          {scan.status !== "Resolved" && (
                            <button 
                              className="resolve-button"
                              onClick={() => handleResolve(scan._id)}
                            >
                              <CheckCircle size={16} />
                              Resolve
                            </button>
                          )}
                          <button 
                            className="archive-button"
                            onClick={() => handleArchive(scan._id)}
                          >
                            <Archive size={16} />
                            Archive
                          </button>
                        </div>
                      )}
                      
                      {scan.archiveFeedback && (
                        <div className="archive-feedback">
                          <strong>Archive Note:</strong> {scan.archiveFeedback}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-results">
                  <Trash2 size={48} />
                  <p>No waste scans found matching your criteria.</p>
                  <button onClick={() => {setSearchTerm(""); setStatusFilter("");}}>Clear Filters</button>
                </div>
              )}
            </div>
          ) : (
            <div className="waste-list">
              <table>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th onClick={() => handleSort("class")}>
                      Waste Type {sortBy === "class" && (sortOrder === "asc" ? "↑" : "↓")}
                    </th>
                    <th onClick={() => handleSort("date")}>
                      Date {sortBy === "date" && (sortOrder === "asc" ? "↑" : "↓")}
                    </th>
                    <th>Location</th>
                    <th>Reported By</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAndSortedWasteScans.length > 0 ? (
                    filteredAndSortedWasteScans.map((scan) => (
                      <tr key={scan._id} className={scan.status.toLowerCase()}>
                        <td className="image-cell">
                          <img src={scan.imageUrl || "/images/default.png"} alt={scan.detectedClass} />
                        </td>
                        <td>{scan.detectedClass}</td>
                        <td>{new Date(scan.reportedAt).toLocaleDateString()}</td>
                        <td>{scan.location}</td>
                        <td>{scan.userEmail}</td>
                        <td>
                          <span className={`status-tag ${scan.status.toLowerCase()}`}>
                            {getStatusIcon(scan.status)}
                            {scan.status}
                          </span>
                        </td>
                        <td>
                          <div className="table-actions">
                            {scan.status !== "Resolved" && (
                              <button 
                                className="icon-button resolve"
                                title="Resolve"
                                onClick={() => handleResolve(scan._id)}
                              >
                                <CheckCircle size={16} />
                              </button>
                            )}
                            <button 
                              className="icon-button archive"
                              title="Archive"
                              onClick={() => handleArchive(scan._id)}
                            >
                              <Archive size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="no-results-cell">
                        <div className="no-results">
                          <Trash2 size={48} />
                          <p>No waste scans found matching your criteria.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* Archive Modal */}
      <div id="archiveModal" className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h2>Archive Report</h2>
            <button className="close-button" onClick={closeModal}>
              <X size={20} />
            </button>
          </div>
          <div className="modal-body">
            {selectedScan && (
              <>
                <div className="modal-info">
                  <strong>Waste Type:</strong> {selectedScan.detectedClass}
                </div>
                <form onSubmit={submitArchive}>
                  <div className="form-group">
                    <label htmlFor="archiveFeedback">Archive Feedback:</label>
                    <textarea 
                      id="archiveFeedback"
                      placeholder="Enter your feedback or reason for archiving..."
                      required
                    ></textarea>
                    </div>
                  <div className="form-actions">
                    <button type="button" className="cancel-button" onClick={closeModal}>Cancel</button>
                    <button type="submit" className="submit-button">Archive Report</button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <div id="toastContainer" className="toast-container"></div>
    </div>
  );
};

export default Reports;