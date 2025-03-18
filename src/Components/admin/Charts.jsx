import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, Users, UserCheck, UserX, Download, Search, Filter } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import '../css/Charts.css';

const UserDashboard = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [stats, setStats] = useState({
    totalReports: 0,
    resolvedReports: 0,
    newReports: 0,
    archivedReports: 0
  });
  const [dailyData, setDailyData] = useState([]);
  const [reportTypes, setReportTypes] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('7days');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [reportsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: 'created_at', direction: 'desc' });
  const [selectedChartType, setSelectedChartType] = useState('line');
  const [filterType, setFilterType] = useState('all');

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch reports from API endpoint
        const reportsResponse = await axios.get("http://localhost:4000/api/reports/reports");
        setReports(reportsResponse.data);
        setFilteredReports(reportsResponse.data);

        // Calculate stats based on reports
        const totalReports = reportsResponse.data.length;
        const resolvedReports = reportsResponse.data.filter(report => report.status === "Success").length;
        const archivedReports = reportsResponse.data.filter(report => report.status === "Archived").length;
        
        // Calculate new reports in the last 30 days
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const newReports = reportsResponse.data.filter(report => 
          new Date(report.created_at) > thirtyDaysAgo
        ).length;
        
        setStats({
          totalReports,
          resolvedReports,
          newReports,
          archivedReports
        });

        // Process data for charts based on actual report data
        processChartData(reportsResponse.data);
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Process data with the selected date range
    if (reports.length > 0) {
      processChartData(reports, dateRange);
    }
  }, [dateRange, reports]);

  // Filter reports when search term or filter type changes
  useEffect(() => {
    let filtered = [...reports];
    
    // Apply search filter
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(report => 
        report.detectedClass?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.userEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.location?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply report type filter
    if (filterType === 'resolved') {
      filtered = filtered.filter(report => report.status === "Success");
    } else if (filterType === 'archived') {
      filtered = filtered.filter(report => report.status === "Archived");
    } else if (filterType === 'pending') {
      filtered = filtered.filter(report => !report.status || report.status === "Pending");
    }
    
    setFilteredReports(filtered);
    setCurrentPage(1);
  }, [searchTerm, filterType, reports]);

  const processChartData = (reportData, range = '7days') => {
    if (!reportData || reportData.length === 0) return;
    
    // Process report type distribution
    const typeCounts = {};
    reportData.forEach(report => {
      if (report.detectedClass) {
        typeCounts[report.detectedClass] = (typeCounts[report.detectedClass] || 0) + 1;
      }
    });
    
    const reportTypeData = Object.keys(typeCounts).map(key => ({
      name: key,
      value: typeCounts[key]
    }));
    
    // Sort by count and take top 5
    reportTypeData.sort((a, b) => b.value - a.value);
    setReportTypes(reportTypeData.slice(0, 5));

    // Process status distribution
    const statusCounts = {
      'Success': reportData.filter(report => report.status === "Success").length,
      'Archived': reportData.filter(report => report.status === "Archived").length,
      'Pending': reportData.filter(report => !report.status || report.status === "Pending").length
    };
    
    const statusChartData = [
      { name: 'Resolved', value: statusCounts['Success'] },
      { name: 'Archived', value: statusCounts['Archived'] },
      { name: 'Pending', value: statusCounts['Pending'] }
    ];
    
    setStatusData(statusChartData);

    // Process daily data based on actual report dates
    const now = new Date();
    const dailyStats = [];
    
    // Determine days to show based on range
    let daysToShow = 7;
    if (range === '30days') daysToShow = 30;
    if (range === '90days') daysToShow = 90;
    
    for (let i = daysToShow - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(now.getDate() - i);
      const dateString = date.toLocaleDateString('en-US', { 
        weekday: daysToShow <= 7 ? 'short' : undefined, 
        month: 'short', 
        day: 'numeric' 
      });
      
      // Count reports submitted on this day
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
      
      const newReports = reportData.filter(report => {
        const createdAt = new Date(report.created_at);
        return createdAt >= startOfDay && createdAt <= endOfDay;
      }).length;
      
      // Count resolved reports on this day
      const resolvedReports = reportData.filter(report => {
        const updatedAt = new Date(report.updated_at);
        return updatedAt >= startOfDay && updatedAt <= endOfDay && report.status === "Success";
      }).length;
      
      // Count archived reports on this day
      const archivedReports = reportData.filter(report => {
        const updatedAt = new Date(report.updated_at);
        return updatedAt >= startOfDay && updatedAt <= endOfDay && report.status === "Archived";
      }).length;
      
      dailyStats.push({
        date: dateString,
        newReports,
        resolvedReports,
        archivedReports,
        totalReports: newReports + resolvedReports + archivedReports
      });
    }
    
    setDailyData(dailyStats);
  };

  const handleResolveReport = async (id) => {
    try {
      await axios.put(`http://localhost:4000/api/reports/resolve/${id}`);
      
      // Refresh reports after resolution
      const reportsResponse = await axios.get("http://localhost:4000/api/reports/reports");
      setReports(reportsResponse.data);
      
      // Update stats and charts
      processChartData(reportsResponse.data, dateRange);
      
      alert("Report resolved successfully!");
    } catch (error) {
      console.error("Error resolving report:", error);
      alert("Failed to resolve report");
    }
  };

  const handleArchiveReport = async (id) => {
    const feedback = prompt("Please provide feedback for archiving this report:");
    if (!feedback) return;
    
    try {
      await axios.put(`http://localhost:4000/api/reports/archive/${id}`, { feedback });
      
      // Refresh reports after archiving
      const reportsResponse = await axios.get("http://localhost:4000/api/reports/reports");
      setReports(reportsResponse.data);
      
      // Update stats and charts
      processChartData(reportsResponse.data, dateRange);
      
      alert("Report archived successfully!");
    } catch (error) {
      console.error("Error archiving report:", error);
      alert("Failed to archive report");
    }
  };

  const generatePDF = async () => {
    const input = document.getElementById('dashboard-content');
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4', true);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    const imgY = 30;
    
    pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
    pdf.save('hazwaste-report-analytics.pdf');
  };

  // Sorting function
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    
    // Sort the filtered reports
    const sortedReports = [...filteredReports].sort((a, b) => {
      if (a[key] < b[key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    
    setFilteredReports(sortedReports);
  };

  // Get current reports for pagination
  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = filteredReports.slice(indexOfFirstReport, indexOfLastReport);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <span className="loading-text">Loading dashboard data...</span>
      </div>
    );
  }

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">HazWaste Report Analytics</h1>
        <div className="dashboard-actions">
          <div className="tab-buttons">
            <button 
              className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`tab-btn ${activeTab === 'reports' ? 'active' : ''}`}
              onClick={() => setActiveTab('reports')}
            >
              Reports
            </button>
            <button 
              className={`tab-btn ${activeTab === 'activity' ? 'active' : ''}`}
              onClick={() => setActiveTab('activity')}
            >
              Activity
            </button>
          </div>
          
          <button 
            onClick={generatePDF}
            className="btn btn-download"
          >
            <Download className="icon" size={18} />
            Download Report
          </button>
        </div>
      </div>
      
      <div className="container-fluid dashboard-content" id="dashboard-content">
        {/* Control Panel - Now inline */}
        <div className="controls-wrapper">
          <div className="date-range-selector">
            <span className="control-label">Time Period:</span>
            <button 
              className={`date-btn ${dateRange === '7days' ? 'active' : ''}`}
              onClick={() => setDateRange('7days')}
            >
              7 Days
            </button>
            <button 
              className={`date-btn ${dateRange === '30days' ? 'active' : ''}`}
              onClick={() => setDateRange('30days')}
            >
              30 Days
            </button>
            <button 
              className={`date-btn ${dateRange === '90days' ? 'active' : ''}`}
              onClick={() => setDateRange('90days')}
            >
              90 Days
            </button>
          </div>
          
          {activeTab === 'overview' && (
            <div className="chart-type-selector">
              <span className="control-label">Chart Type:</span>
              <select 
                value={selectedChartType} 
                onChange={(e) => setSelectedChartType(e.target.value)}
                className="chart-select"
              >
                <option value="line">Line Chart</option>
                <option value="bar">Bar Chart</option>
                <option value="area">Area Chart</option>
              </select>
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="stats-row">
          <div className="stat-card-wrapper">
            <div className="stat-card">
              <div className="stat-card-body">
                <div className="stat-content">
                  <div>
                    <h6 className="stat-subtitle">Total Reports</h6>
                    <h2 className="stat-title">{stats.totalReports}</h2>
                  </div>
                  <div className="stat-icon total-users">
                    <Users className="icon" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="stat-card-wrapper">
            <div className="stat-card">
              <div className="stat-card-body">
                <div className="stat-content">
                  <div>
                    <h6 className="stat-subtitle">Resolved Reports</h6>
                    <h2 className="stat-title">{stats.resolvedReports}</h2>
                  </div>
                  <div className="stat-icon active-users">
                    <UserCheck className="icon" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="stat-card-wrapper">
            <div className="stat-card">
              <div className="stat-card-body">
                <div className="stat-content">
                  <div>
                    <h6 className="stat-subtitle">New Reports (30 days)</h6>
                    <h2 className="stat-title">{stats.newReports}</h2>
                  </div>
                  <div className="stat-icon new-signups">
                    <Calendar className="icon" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="stat-card-wrapper">
            <div className="stat-card">
              <div className="stat-card-body">
                <div className="stat-content">
                  <div>
                    <h6 className="stat-subtitle">Archived Reports</h6>
                    <h2 className="stat-title">{stats.archivedReports}</h2>
                  </div>
                  <div className="stat-icon inactive-users">
                    <UserX className="icon" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content based on active tab */}
        {activeTab === 'overview' && (
          <>
            {/* Charts - Row 1 */}
            <div className="charts-row">
              <div className="chart-card-lg">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Report Activity ({dateRange === '7days' ? 'Last 7 Days' : dateRange === '30days' ? 'Last 30 Days' : 'Last 90 Days'})</h5>
                    <div className="chart-container">
                      <ResponsiveContainer width="100%" height={300}>
                        {selectedChartType === 'line' ? (
                          <LineChart data={dailyData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="newReports" stroke="#0088FE" name="New Reports" />
                            <Line type="monotone" dataKey="resolvedReports" stroke="#00C49F" name="Resolved Reports" />
                            <Line type="monotone" dataKey="archivedReports" stroke="#FF8042" name="Archived Reports" />
                          </LineChart>
                        ) : selectedChartType === 'bar' ? (
                          <BarChart data={dailyData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="newReports" fill="#0088FE" name="New Reports" />
                            <Bar dataKey="resolvedReports" fill="#00C49F" name="Resolved Reports" />
                            <Bar dataKey="archivedReports" fill="#FF8042" name="Archived Reports" />
                          </BarChart>
                        ) : (
                          <LineChart data={dailyData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="newReports" stroke="#0088FE" strokeWidth={2} fill="#0088FE" fillOpacity={0.3} />
                            <Line type="monotone" dataKey="resolvedReports" stroke="#00C49F" strokeWidth={2} fill="#00C49F" fillOpacity={0.3} />
                            <Line type="monotone" dataKey="archivedReports" stroke="#FF8042" strokeWidth={2} fill="#FF8042" fillOpacity={0.3} />
                          </LineChart>
                        )}
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>

              <div className="chart-card-sm">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Daily New Reports</h5>
                    <div className="chart-container">
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={dailyData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="newReports" fill="#8884d8" name="New Reports" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts - Row 2 */}
            <div className="charts-row">
              <div className="chart-card-md">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Report Types Distribution</h5>
                    <div className="chart-container">
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={reportTypes}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {reportTypes.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>

              <div className="chart-card-md">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Status Distribution</h5>
                    <div className="chart-container">
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={statusData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {statusData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        
        {/* Reports Table Tab */}
        {activeTab === 'reports' && (
          <div className="reports-table-container">
            <div className="card">
              <div className="card-body">
                <div className="table-header">
                  <h5 className="card-title">Report Details</h5>
                  <div className="search-filter">
                    <div className="search-container">
                      <Search className="search-icon" size={18} />
                      <input 
                        type="text" 
                        className="search-input" 
                        placeholder="Search reports..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <div className="filter-dropdown">
                      <Filter className="filter-icon" size={18} />
                      <select 
                        className="filter-select"
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                      >
                        <option value="all">All Reports</option>
                        <option value="pending">Pending Only</option>
                        <option value="resolved">Resolved Only</option>
                        <option value="archived">Archived Only</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th onClick={() => requestSort('_id')}>ID {sortConfig.key === '_id' && (sortConfig.direction === 'asc' ? '▲' : '▼')}</th>
                        <th onClick={() => requestSort('detectedClass')}>Waste Type {sortConfig.key === 'detectedClass' && (sortConfig.direction === 'asc' ? '▲' : '▼')}</th>
                        <th onClick={() => requestSort('confidence')}>Confidence {sortConfig.key === 'confidence' && (sortConfig.direction === 'asc' ? '▲' : '▼')}</th>
                        <th onClick={() => requestSort('userEmail')}>Reporter {sortConfig.key === 'userEmail' && (sortConfig.direction === 'asc' ? '▲' : '▼')}</th>
                        <th onClick={() => requestSort('location')}>Location {sortConfig.key === 'location' && (sortConfig.direction === 'asc' ? '▲' : '▼')}</th>
                        <th onClick={() => requestSort('status')}>Status {sortConfig.key === 'status' && (sortConfig.direction === 'asc' ? '▲' : '▼')}</th>
                        <th onClick={() => requestSort('created_at')}>Created {sortConfig.key === 'created_at' && (sortConfig.direction === 'asc' ? '▲' : '▼')}</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentReports.map(report => (
                        <tr key={report._id} className="report-row">
                          <td>{report._id.substring(0, 6)}...</td>
                          <td>{report.detectedClass}</td>
                          <td>{report.confidence?.toFixed(2)}%</td>
                          <td>{report.userEmail}</td>
                          <td>{report.location}</td>
                          <td>
                            <span className={`badge ${
                              report.status === 'Success' ? 'badge-active' : 
                              report.status === 'Archived' ? 'badge-inactive' : 
                              'badge-user'
                            }`}>
                              {report.status || 'Pending'}
                            </span>
                          </td>
                          <td>{new Date(report.created_at).toLocaleDateString()}</td>
                          <td>
                            {(!report.status || report.status === 'Pending') && (
                              <>
                                <button 
                                  className="btn btn-sm btn-success mr-1" 
                                  onClick={() => handleResolveReport(report._id)}
                                >
                                  Resolve
                                </button>
                                <button 
                                  className="btn btn-sm btn-secondary" 
                                  onClick={() => handleArchiveReport(report._id)}
                                >
                                  Archive
                                </button>
                              </>
                            )}
                            {report.status && (
                              <span>{report.status === 'Success' ? 'Resolved' : 'Archived'}</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="pagination-container">
                  <span className="pagination-info">
                    Showing {indexOfFirstReport + 1} to {Math.min(indexOfLastReport, filteredReports.length)} of {filteredReports.length} reports
                  </span>
                  <nav aria-label="Report pagination">
                    <ul className="pagination">
                      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <a className="page-link" href="#" onClick={() => paginate(currentPage - 1)}>Previous</a>
                      </li>
                      {Array.from({ length: Math.ceil(filteredReports.length / reportsPerPage) }, (_, i) => (
                        <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                          <a className="page-link" href="#" onClick={() => paginate(i + 1)}>{i + 1}</a>
                        </li>
                      )).slice(Math.max(currentPage - 3, 0), Math.min(currentPage + 2, Math.ceil(filteredReports.length / reportsPerPage)))}
                      <li className={`page-item ${currentPage === Math.ceil(filteredReports.length / reportsPerPage) ? 'disabled' : ''}`}>
                        <a className="page-link" href="#" onClick={() => paginate(currentPage + 1)}>Next</a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Report Activity Tab */}
        {activeTab === 'activity' && (
          <div className="activity-container">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Report Activity Trends</h5>
                <p className="card-text">Report submission and resolution metrics over time.</p>
                <div className="chart-controls">
                  <div className="chart-type-buttons">
                    <button 
                      className={`btn-toggle ${selectedChartType === 'bar' ? 'active' : ''}`}
                      onClick={() => setSelectedChartType('bar')}
                    >
                      Bar
                    </button>
                    <button 
                      className={`btn-toggle ${selectedChartType === 'line' ? 'active' : ''}`}
                      onClick={() => setSelectedChartType('line')}
                    >
                      Line
                    </button>
                    <button 
                      className={`btn-toggle ${selectedChartType === 'area' ? 'active' : ''}`}
                      onClick={() => setSelectedChartType('area')}
                    >
                      Area
                    </button>
                  </div>
                </div>
                <div className="chart-container">
                  <ResponsiveContainer width="100%" height={400}>
                    {selectedChartType === 'bar' ? (
                      <BarChart 
                        data={dailyData}
                        margin={{top: 20, right: 30, left: 20, bottom: 5}}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="newReports" fill="#0088FE" name="New Reports" />
                        <Bar dataKey="resolvedReports" fill="#00C49F" name="Resolved Reports" />
                        <Bar dataKey="archivedReports" fill="#FF8042" name="Archived Reports" />
                      </BarChart>
                    ) : selectedChartType === 'line' ? (
                      <LineChart 
                        data={dailyData}
                        margin={{top: 20, right: 30, left: 20, bottom: 5}}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="newReports" stroke="#0088FE" activeDot={{r: 8}} name="New Reports" />
                        <Line type="monotone" dataKey="resolvedReports" stroke="#00C49F" name="Resolved Reports" />
                        <Line type="monotone" dataKey="archivedReports" stroke="#FF8042" name="Archived Reports" />
                      </LineChart>
                    ) : (
                      <LineChart 
                        data={dailyData}
                        margin={{top: 20, right: 30, left: 20, bottom: 5}}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="newReports" stroke="#0088FE" strokeWidth={2} fill="#0088FE" fillOpacity={0.3} name="New Reports" />
                        <Line type="monotone" dataKey="resolvedReports" stroke="#00C49F" strokeWidth={2} fill="#00C49F" fillOpacity={0.3} name="Resolved Reports" />
                        <Line type="monotone" dataKey="archivedReports" stroke="#FF8042" strokeWidth={2} fill="#FF8042" fillOpacity={0.3} name="Archived Reports" />
                      </LineChart>
                    )}
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            <div className="activity-details mt-4">
              <div className="row">
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Report Type Distribution</h5>
                      <div className="chart-container">
                        <ResponsiveContainer width="100%" height={300}>
                          <PieChart>
                            <Pie
                              data={reportTypes}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={100}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            >
                              {reportTypes.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Resolution Rate</h5>
                      <div className="chart-container">
                        <ResponsiveContainer width="100%" height={300}>
                          <PieChart>
                            <Pie
                              data={statusData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={100}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            >
                              {statusData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;