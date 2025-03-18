// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { Calendar, Users, UserCheck, UserX, Download, Search, Filter } from 'lucide-react';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
// import '../css/Charts.css';

// const UserDashboard = () => {
//   const [users, setUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [stats, setStats] = useState({
//     activeUsersCount: 0,
//     newSignupsCount: 0
//   });
//   const [dailyData, setDailyData] = useState([]);
//   const [userTypes, setUserTypes] = useState([]);
//   const [genderData, setGenderData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState('overview');
//   const [dateRange, setDateRange] = useState('7days');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [usersPerPage] = useState(10);
//   const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'asc' });
//   const [selectedChartType, setSelectedChartType] = useState('line');
//   const [filterType, setFilterType] = useState('all');

//   // Fetch data from backend
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
        
//         // Fetch users from existing API endpoint
//         const usersResponse = await axios.get("http://localhost:4000/api/auth/users");
//         setUsers(usersResponse.data);
//         setFilteredUsers(usersResponse.data);

//         // Fetch stats from existing API endpoint
//         const statsResponse = await axios.get("http://localhost:4000/api/auth/stats");
//         setStats(statsResponse.data);

//         // Process data for charts based on actual user data
//         processChartData(usersResponse.data);
        
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     // Process data with the selected date range
//     if (users.length > 0) {
//       processChartData(users, dateRange);
//     }
//   }, [dateRange, users]);

//   // Filter users when search term or filter type changes
//   useEffect(() => {
//     let filtered = [...users];
    
//     // Apply search filter
//     if (searchTerm.trim() !== '') {
//       filtered = filtered.filter(user => 
//         user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         user.location?.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
    
//     // Apply user type filter
//     if (filterType === 'active') {
//       filtered = filtered.filter(user => user.is_active === true);
//     } else if (filterType === 'inactive') {
//       filtered = filtered.filter(user => user.is_active === false);
//     }
    
//     setFilteredUsers(filtered);
//     setCurrentPage(1);
//   }, [searchTerm, filterType, users]);

//   const processChartData = (userData, range = '7days') => {
//     if (!userData || userData.length === 0) return;
    
//     // Process gender distribution from actual user data
//     const genderCounts = { male: 0, female: 0, other: 0 };
//     userData.forEach(user => {
//       if (user.gender) {
//         genderCounts[user.gender.toLowerCase()]++;
//       }
//     });
    
//     const genderChartData = [
//       { name: 'Male', value: genderCounts.male },
//       { name: 'Female', value: genderCounts.female },
//       { name: 'Other', value: genderCounts.other }
//     ];
//     setGenderData(genderChartData);

//     // Process user role distribution
//     const roleCounts = { user: 0, admin: 0, moderator: 0 };
//     userData.forEach(user => {
//       if (user.role) {
//         roleCounts[user.role.toLowerCase()] = (roleCounts[user.role.toLowerCase()] || 0) + 1;
//       } else {
//         roleCounts.user++;
//       }
//     });
    
//     const roleChartData = [
//       { name: 'Regular Users', value: roleCounts.user },
//       { name: 'Admins', value: roleCounts.admin || 0 },
//       { name: 'Moderators', value: roleCounts.moderator || 0 }
//     ];
//     setUserTypes(roleChartData);

//     // Process daily data based on actual user registration dates
//     const now = new Date();
//     const dailyStats = [];
    
//     // Determine days to show based on range
//     let daysToShow = 7;
//     if (range === '30days') daysToShow = 30;
//     if (range === '90days') daysToShow = 90;
    
//     for (let i = daysToShow - 1; i >= 0; i--) {
//       const date = new Date(now);
//       date.setDate(now.getDate() - i);
//       const dateString = date.toLocaleDateString('en-US', { 
//         weekday: daysToShow <= 7 ? 'short' : undefined, 
//         month: 'short', 
//         day: 'numeric' 
//       });
      
//       // Count users registered on this day from actual data
//       const startOfDay = new Date(date);
//       startOfDay.setHours(0, 0, 0, 0);
      
//       const endOfDay = new Date(date);
//       endOfDay.setHours(23, 59, 59, 999);
      
//       const newSignups = userData.filter(user => {
//         const createdAt = new Date(user.createdAt);
//         return createdAt >= startOfDay && createdAt <= endOfDay;
//       }).length;
      
//       // Count active/inactive users
//       const activeUsers = userData.filter(user => {
//         return user.is_active === true;
//       }).length;
      
//       const inactiveUsers = userData.length - activeUsers;
      
//       dailyStats.push({
//         date: dateString,
//         activeUsers,
//         newSignups,
//         inactiveUsers,
//         totalUsers: activeUsers + inactiveUsers
//       });
//     }
    
//     setDailyData(dailyStats);
//   };

//   const generatePDF = async () => {
//     const input = document.getElementById('dashboard-content');
//     const canvas = await html2canvas(input);
//     const imgData = canvas.toDataURL('image/png');
//     const pdf = new jsPDF('p', 'mm', 'a4', true);
//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = pdf.internal.pageSize.getHeight();
//     const imgWidth = canvas.width;
//     const imgHeight = canvas.height;
//     const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
//     const imgX = (pdfWidth - imgWidth * ratio) / 2;
//     const imgY = 30;
    
//     pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
//     pdf.save('user-analytics-report.pdf');
//   };

//   // Sorting function
//   const requestSort = (key) => {
//     let direction = 'asc';
//     if (sortConfig.key === key && sortConfig.direction === 'asc') {
//       direction = 'desc';
//     }
//     setSortConfig({ key, direction });
    
//     // Sort the filtered users
//     const sortedUsers = [...filteredUsers].sort((a, b) => {
//       if (a[key] < b[key]) {
//         return sortConfig.direction === 'asc' ? -1 : 1;
//       }
//       if (a[key] > b[key]) {
//         return sortConfig.direction === 'asc' ? 1 : -1;
//       }
//       return 0;
//     });
    
//     setFilteredUsers(sortedUsers);
//   };

//   // Get current users for pagination
//   const indexOfLastUser = currentPage * usersPerPage;
//   const indexOfFirstUser = indexOfLastUser - usersPerPage;
//   const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

//   // Change page
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   if (loading) {
//     return (
//       <div className="loading-container">
//         <div className="spinner"></div>
//         <span className="loading-text">Loading dashboard data...</span>
//       </div>
//     );
//   }

//   // Calculate totals for the stats
//   const totalUsers = users.length;
//   const activeUsers = stats.activeUsersCount || users.filter(user => user.is_active).length;
//   const newSignups = stats.newSignupsCount;
//   const inactiveUsers = totalUsers - activeUsers;


//   const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

//   return (
//     <div className="dashboard">
//       <div className="dashboard-header">
//         <h1 className="dashboard-title">User Analytics Dashboard</h1>
//         <div className="dashboard-actions">
//           <div className="tab-buttons">
//             <button 
//               className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
//               onClick={() => setActiveTab('overview')}
//             >
//               Overview
//             </button>
//             <button 
//               className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
//               onClick={() => setActiveTab('users')}
//             >
//               Users
//             </button>
//             <button 
//               className={`tab-btn ${activeTab === 'activity' ? 'active' : ''}`}
//               onClick={() => setActiveTab('activity')}
//             >
//               Activity
//             </button>
//           </div>
          
//           <button 
//             onClick={generatePDF}
//             className="btn btn-download"
//           >
//             <Download className="icon" size={18} />
//             Download Report
//           </button>
//         </div>
//       </div>
      
//       <div className="container-fluid dashboard-content" id="dashboard-content">
//         {/* Control Panel - Now inline */}
//         <div className="controls-wrapper">
//           <div className="date-range-selector">
//             <span className="control-label">Time Period:</span>
//             <button 
//               className={`date-btn ${dateRange === '7days' ? 'active' : ''}`}
//               onClick={() => setDateRange('7days')}
//             >
//               7 Days
//             </button>
//             <button 
//               className={`date-btn ${dateRange === '30days' ? 'active' : ''}`}
//               onClick={() => setDateRange('30days')}
//             >
//               30 Days
//             </button>
//             <button 
//               className={`date-btn ${dateRange === '90days' ? 'active' : ''}`}
//               onClick={() => setDateRange('90days')}
//             >
//               90 Days
//             </button>
//           </div>
          
//           {activeTab === 'overview' && (
//             <div className="chart-type-selector">
//               <span className="control-label">Chart Type:</span>
//               <select 
//                 value={selectedChartType} 
//                 onChange={(e) => setSelectedChartType(e.target.value)}
//                 className="chart-select"
//               >
//                 <option value="line">Line Chart</option>
//                 <option value="bar">Bar Chart</option>
//                 <option value="area">Area Chart</option>
//               </select>
//             </div>
//           )}
//         </div>

//         {/* Stats Cards */}
//         <div className="stats-row">
//           <div className="stat-card-wrapper">
//             <div className="stat-card">
//               <div className="stat-card-body">
//                 <div className="stat-content">
//                   <div>
//                     <h6 className="stat-subtitle">Total Users</h6>
//                     <h2 className="stat-title">{totalUsers}</h2>
//                   </div>
//                   <div className="stat-icon total-users">
//                     <Users className="icon" />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           <div className="stat-card-wrapper">
//             <div className="stat-card">
//               <div className="stat-card-body">
//                 <div className="stat-content">
//                   <div>
//                     <h6 className="stat-subtitle">Active Users</h6>
//                     <h2 className="stat-title">{activeUsers}</h2>
//                   </div>
//                   <div className="stat-icon active-users">
//                     <UserCheck className="icon" />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           <div className="stat-card-wrapper">
//             <div className="stat-card">
//               <div className="stat-card-body">
//                 <div className="stat-content">
//                   <div>
//                     <h6 className="stat-subtitle">New Signups (30 days)</h6>
//                     <h2 className="stat-title">{newSignups}</h2>
//                   </div>
//                   <div className="stat-icon new-signups">
//                     <Calendar className="icon" />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           <div className="stat-card-wrapper">
//             <div className="stat-card">
//               <div className="stat-card-body">
//                 <div className="stat-content">
//                   <div>
//                     <h6 className="stat-subtitle">Inactive Users</h6>
//                     <h2 className="stat-title">{inactiveUsers}</h2>
//                   </div>
//                   <div className="stat-icon inactive-users">
//                     <UserX className="icon" />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Main content based on active tab */}
//         {activeTab === 'overview' && (
//           <>
//             {/* Charts - Row 1 */}
//             <div className="charts-row">
//               <div className="chart-card-lg">
//                 <div className="card">
//                   <div className="card-body">
//                     <h5 className="card-title">User Activity ({dateRange === '7days' ? 'Last 7 Days' : dateRange === '30days' ? 'Last 30 Days' : 'Last 90 Days'})</h5>
//                     <div className="chart-container">
//                       <ResponsiveContainer width="100%" height={300}>
//                         {selectedChartType === 'line' ? (
//                           <LineChart data={dailyData}>
//                             <CartesianGrid strokeDasharray="3 3" />
//                             <XAxis dataKey="date" />
//                             <YAxis />
//                             <Tooltip />
//                             <Legend />
//                             <Line type="monotone" dataKey="activeUsers" stroke="#0088FE" name="Active Users" />
//                             <Line type="monotone" dataKey="activeUsers" stroke="#0088FE" name="Active Users" />
//                             <Line type="monotone" dataKey="newSignups" stroke="#00C49F" name="New Signups" />
//                             <Line type="monotone" dataKey="inactiveUsers" stroke="#FF8042" name="Inactive Users" />
//                           </LineChart>
//                         ) : selectedChartType === 'bar' ? (
//                           <BarChart data={dailyData}>
//                             <CartesianGrid strokeDasharray="3 3" />
//                             <XAxis dataKey="date" />
//                             <YAxis />
//                             <Tooltip />
//                             <Legend />
//                             <Bar dataKey="activeUsers" fill="#0088FE" name="Active Users" />
//                             <Bar dataKey="newSignups" fill="#00C49F" name="New Signups" />
//                             <Bar dataKey="inactiveUsers" fill="#FF8042" name="Inactive Users" />
//                           </BarChart>
//                         ) : (
//                           <LineChart data={dailyData}
//                             margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
//                             <CartesianGrid strokeDasharray="3 3" />
//                             <XAxis dataKey="date" />
//                             <YAxis />
//                             <Tooltip />
//                             <Legend />
//                             <Line type="monotone" dataKey="activeUsers" stroke="#0088FE" strokeWidth={2} fill="#0088FE" fillOpacity={0.3} />
//                             <Line type="monotone" dataKey="newSignups" stroke="#00C49F" strokeWidth={2} fill="#00C49F" fillOpacity={0.3} />
//                             <Line type="monotone" dataKey="inactiveUsers" stroke="#FF8042" strokeWidth={2} fill="#FF8042" fillOpacity={0.3} />
//                           </LineChart>
//                         )}
//                       </ResponsiveContainer>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="chart-card-sm">
//                 <div className="card">
//                   <div className="card-body">
//                     <h5 className="card-title">Daily New Signups</h5>
//                     <div className="chart-container">
//                       <ResponsiveContainer width="100%" height={300}>
//                         <BarChart data={dailyData}>
//                           <CartesianGrid strokeDasharray="3 3" />
//                           <XAxis dataKey="date" />
//                           <YAxis />
//                           <Tooltip />
//                           <Bar dataKey="newSignups" fill="#8884d8" name="New Signups" />
//                         </BarChart>
//                       </ResponsiveContainer>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Charts - Row 2 */}
//             <div className="charts-row">
//               <div className="chart-card-md">
//                 <div className="card">
//                   <div className="card-body">
//                     <h5 className="card-title">User Types Distribution</h5>
//                     <div className="chart-container">
//                       <ResponsiveContainer width="100%" height={300}>
//                         <PieChart>
//                           <Pie
//                             data={userTypes}
//                             cx="50%"
//                             cy="50%"
//                             labelLine={false}
//                             outerRadius={100}
//                             fill="#8884d8"
//                             dataKey="value"
//                             label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//                           >
//                             {userTypes.map((entry, index) => (
//                               <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                             ))}
//                           </Pie>
//                           <Tooltip />
//                           <Legend />
//                         </PieChart>
//                       </ResponsiveContainer>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="chart-card-md">
//                 <div className="card">
//                   <div className="card-body">
//                     <h5 className="card-title">Gender Distribution</h5>
//                     <div className="chart-container">
//                       <ResponsiveContainer width="250%" height={390}>
//                         <PieChart>
//                           <Pie
//                             data={genderData}
//                             cx="50%"
//                             cy="50%"
//                             labelLine={false}
//                             outerRadius={100}
//                             fill="#8884d8"
//                             dataKey="value"
//                             label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//                           >
//                             {genderData.map((entry, index) => (
//                               <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                             ))}
//                           </Pie>
//                           <Tooltip />
//                           <Legend />
//                         </PieChart>
//                       </ResponsiveContainer>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </>
//         )}
        
//         {/* User Table Tab */}
//         {activeTab === 'users' && (
//           <div className="users-table-container">
//             <div className="card">
//               <div className="card-body">
//                 <div className="table-header">
//                   <h5 className="card-title">User Details</h5>
//                   <div className="search-filter">
//                     <div className="search-container">
//                       <Search className="search-icon" size={18} />
//                       <input 
//                         type="text" 
//                         className="search-input" 
//                         placeholder="Search users..." 
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                       />
//                     </div>
//                     <div className="filter-dropdown">
//                       <Filter className="filter-icon" size={18} />
//                       <select 
//                         className="filter-select"
//                         value={filterType}
//                         onChange={(e) => setFilterType(e.target.value)}
//                       >
//                         <option value="all">All Users</option>
//                         <option value="active">Active Only</option>
//                         <option value="inactive">Inactive Only</option>
//                       </select>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="table-responsive">
//                   <table className="table">
//                     <thead>
//                       <tr>
//                         <th onClick={() => requestSort('_id')}>ID {sortConfig.key === '_id' && (sortConfig.direction === 'asc' ? '▲' : '▼')}</th>
//                         <th onClick={() => requestSort('username')}>Username {sortConfig.key === 'username' && (sortConfig.direction === 'asc' ? '▲' : '▼')}</th>
//                         <th onClick={() => requestSort('email')}>Email {sortConfig.key === 'email' && (sortConfig.direction === 'asc' ? '▲' : '▼')}</th>
//                         <th onClick={() => requestSort('role')}>Role {sortConfig.key === 'role' && (sortConfig.direction === 'asc' ? '▲' : '▼')}</th>
//                         <th onClick={() => requestSort('gender')}>Gender {sortConfig.key === 'gender' && (sortConfig.direction === 'asc' ? '▲' : '▼')}</th>
//                         <th onClick={() => requestSort('is_active')}>Status {sortConfig.key === 'is_active' && (sortConfig.direction === 'asc' ? '▲' : '▼')}</th>
//                         <th onClick={() => requestSort('location')}>Location {sortConfig.key === 'location' && (sortConfig.direction === 'asc' ? '▲' : '▼')}</th>
//                         <th onClick={() => requestSort('createdAt')}>Created {sortConfig.key === 'createdAt' && (sortConfig.direction === 'asc' ? '▲' : '▼')}</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {currentUsers.map(user => (
//                         <tr key={user._id} className="user-row">
//                           <td>{user._id.substring(0, 6)}...</td>
//                           <td>{user.username}</td>
//                           <td>{user.email}</td>
//                           <td>
//                             <span className={`badge ${
//                               user.role === 'admin' ? 'badge-admin' : 
//                               user.role === 'moderator' ? 'badge-moderator' : 
//                               'badge-user'
//                             }`}>
//                               {user.role || 'user'}
//                             </span>
//                           </td>
//                           <td>{user.gender}</td>
//                           <td>
//                             <span className={`badge ${user.is_active ? 'badge-active' : 'badge-inactive'}`}>
//                               {user.is_active ? 'Active' : 'Inactive'}
//                             </span>
//                           </td>
//                           <td>{user.location}</td>
//                           <td>{new Date(user.createdAt).toLocaleDateString()}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//                 <div className="pagination-container">
//                   <span className="pagination-info">
//                     Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length} users
//                   </span>
//                   <nav aria-label="User pagination">
//                     <ul className="pagination">
//                       <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
//                         <a className="page-link" href="#" onClick={() => paginate(currentPage - 1)}>Previous</a>
//                       </li>
//                       {Array.from({ length: Math.ceil(filteredUsers.length / usersPerPage) }, (_, i) => (
//                         <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
//                           <a className="page-link" href="#" onClick={() => paginate(i + 1)}>{i + 1}</a>
//                         </li>
//                       )).slice(Math.max(currentPage - 3, 0), Math.min(currentPage + 2, Math.ceil(filteredUsers.length / usersPerPage)))}
//                       <li className={`page-item ${currentPage === Math.ceil(filteredUsers.length / usersPerPage) ? 'disabled' : ''}`}>
//                         <a className="page-link" href="#" onClick={() => paginate(currentPage + 1)}>Next</a>
//                       </li>
//                     </ul>
//                   </nav>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
        
//         {/* User Activity Tab */}
//         {activeTab === 'activity' && (
//           <div className="activity-container">
//             <div className="card">
//               <div className="card-body">
//                 <h5 className="card-title">User Activity Trends</h5>
//                 <p className="card-text">User engagement metrics over time based on login and registration activity.</p>
//                 <div className="chart-controls">
//                   <div className="chart-type-buttons">
//                     <button 
//                       className={`btn-toggle ${selectedChartType === 'bar' ? 'active' : ''}`}
//                       onClick={() => setSelectedChartType('bar')}
//                     >
//                       Bar
//                     </button>
//                     <button 
//                       className={`btn-toggle ${selectedChartType === 'line' ? 'active' : ''}`}
//                       onClick={() => setSelectedChartType('line')}
//                     >
//                       Line
//                     </button>
//                     <button 
//                       className={`btn-toggle ${selectedChartType === 'area' ? 'active' : ''}`}
//                       onClick={() => setSelectedChartType('area')}
//                     >
//                       Area
//                     </button>
//                   </div>
//                 </div>
//                 <div className="chart-container">
//                   <ResponsiveContainer width="100%" height={400}>
//                     {selectedChartType === 'bar' ? (
//                       <BarChart 
//                         data={dailyData}
//                         margin={{top: 20, right: 30, left: 20, bottom: 5}}
//                       >
//                         <CartesianGrid strokeDasharray="3 3" />
//                         <XAxis dataKey="date" />
//                         <YAxis />
//                         <Tooltip />
//                         <Legend />
//                         <Bar dataKey="activeUsers" stackId="a" fill="#0088FE" name="Active Users" />
//                         <Bar dataKey="inactiveUsers" stackId="a" fill="#FF8042" name="Inactive Users" />
//                       </BarChart>
//                     ) : selectedChartType === 'line' ? (
//                       <LineChart 
//                         data={dailyData}
//                         margin={{top: 20, right: 30, left: 20, bottom: 5}}
//                       >
//                         <CartesianGrid strokeDasharray="3 3" />
//                         <XAxis dataKey="date" />
//                         <YAxis />
//                         <Tooltip />
//                         <Legend />
//                         <Line type="monotone" dataKey="activeUsers" stroke="#0088FE" name="Active Users" />
//                         <Line type="monotone" dataKey="inactiveUsers" stroke="#FF8042" name="Inactive Users" />
//                       </LineChart>
//                     ) : (
//                       <LineChart 
//                         data={dailyData}
//                         margin={{top: 20, right: 30, left: 20, bottom: 5}}
//                       >
//                         <CartesianGrid strokeDasharray="3 3" />
//                         <XAxis dataKey="date" />
//                         <YAxis />
//                         <Tooltip />
//                         <Legend />
//                         <Line type="monotone" dataKey="activeUsers" stroke="#0088FE" fill="#0088FE" fillOpacity={0.3} name="Active Users" />
//                         <Line type="monotone" dataKey="inactiveUsers" stroke="#FF8042" fill="#FF8042" fillOpacity={0.3} name="Inactive Users" />
//                       </LineChart>
//                     )}
//                   </ResponsiveContainer>
//                 </div>
                
//                 <div className="activity-metrics">
//                   <div className="metric-card">
//                     <h6>Average Active Users</h6>
//                     <p className="metric-value">
//                       {Math.round(dailyData.reduce((sum, item) => sum + item.activeUsers, 0) / dailyData.length)}
//                     </p>
//                   </div>
//                   <div className="metric-card">
//                     <h6>Peak Active Day</h6>
//                     <p className="metric-value">
//                       {dailyData.reduce((max, item) => item.activeUsers > max.activeUsers ? item : max, { activeUsers: 0 }).date}
//                     </p>
//                   </div>
//                   <div className="metric-card">
//                     <h6>Total New Signups</h6>
//                     <p className="metric-value">
//                       {dailyData.reduce((sum, item) => sum + item.newSignups, 0)}
//                     </p>
//                     </div>
//                   <div className="metric-card">
//                     <h6>Growth Rate</h6>
//                     <p className="metric-value">
//                       {dailyData.length > 1 ? 
//                         ((dailyData[dailyData.length - 1].totalUsers - dailyData[0].totalUsers) / 
//                         dailyData[0].totalUsers * 100).toFixed(1) + '%' : '0%'}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
            
        
//             <div className="activity-details-row">
//               <div className="card">
//                 <div className="card-body">
//                   <h5 className="card-title">User Engagement Statistics</h5>
//                   <div className="chart-container">
//                     <ResponsiveContainer width="100%" height={300}>
//                       <BarChart data={dailyData}>
//                         <CartesianGrid strokeDasharray="3 3" />
//                         <XAxis dataKey="date" />
//                         <YAxis />
//                         <Tooltip />
//                         <Legend />
//                         <Bar dataKey="newSignups" fill="#00C49F" name="New Signups" />
//                       </BarChart>
//                     </ResponsiveContainer>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
      
//       <div className="dashboard-footer">
//         <div className="footer-content">
//           <p>© {new Date().getFullYear()} User Analytics Dashboard</p>
//           <p className="update-info">Last updated: {new Date().toLocaleString()}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { Calendar, Users, UserCheck, UserX, Download, Search, Filter } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import '../css/Charts.css';

const UserDashboard = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [stats, setStats] = useState({
    activeUsersCount: 0,
    newSignupsCount: 0
  });
  const [dailyData, setDailyData] = useState([]);
  const [userTypes, setUserTypes] = useState([]);
  const [genderData, setGenderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('7days');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'asc' });
  const [selectedChartType, setSelectedChartType] = useState('line');
  const [filterType, setFilterType] = useState('all');

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch users from existing API endpoint
        const usersResponse = await axios.get("http://localhost:4000/api/auth/users");
        setUsers(usersResponse.data);
        setFilteredUsers(usersResponse.data);

        // Fetch stats from existing API endpoint
        const statsResponse = await axios.get("http://localhost:4000/api/auth/stats");
        setStats(statsResponse.data);

        // Process data for charts based on actual user data
        processChartData(usersResponse.data);

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
    if (users.length > 0) {
      processChartData(users, dateRange);
    }
  }, [dateRange, users]);

  // Filter users when search term or filter type changes
  useEffect(() => {
    let filtered = [...users];

    // Apply search filter
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(user =>
        user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.location?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply user type filter
    if (filterType === 'active') {
      filtered = filtered.filter(user => user.is_active === true);
    } else if (filterType === 'inactive') {
      filtered = filtered.filter(user => user.is_active === false);
    }

    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [searchTerm, filterType, users]);

  const processChartData = (userData, range = '7days') => {
    if (!userData || userData.length === 0) return;

    // Process gender distribution from actual user data
    const genderCounts = { male: 0, female: 0, other: 0 };
    userData.forEach(user => {
      if (user.gender) {
        genderCounts[user.gender.toLowerCase()]++;
      }
    });

    const genderChartData = [
      { name: 'Male', value: genderCounts.male },
      { name: 'Female', value: genderCounts.female },
      { name: 'Other', value: genderCounts.other }
    ];
    setGenderData(genderChartData);

    // Process user role distribution
    const roleCounts = { user: 0, admin: 0, moderator: 0 };
    userData.forEach(user => {
      if (user.role) {
        roleCounts[user.role.toLowerCase()] = (roleCounts[user.role.toLowerCase()] || 0) + 1;
      } else {
        roleCounts.user++;
      }
    });

    const roleChartData = [
      { name: 'Regular Users', value: roleCounts.user },
      { name: 'Admins', value: roleCounts.admin || 0 },
      { name: 'Moderators', value: roleCounts.moderator || 0 }
    ];
    setUserTypes(roleChartData);

    // Process daily data based on actual user registration dates
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

      // Count users registered on this day from actual data
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      const newSignups = userData.filter(user => {
        const createdAt = new Date(user.createdAt);
        return createdAt >= startOfDay && createdAt <= endOfDay;
      }).length;

      // Count active/inactive users
      const activeUsers = userData.filter(user => {
        return user.is_active === true;
      }).length;

      const inactiveUsers = userData.length - activeUsers;

      dailyStats.push({
        date: dateString,
        activeUsers,
        newSignups,
        inactiveUsers,
        totalUsers: activeUsers + inactiveUsers
      });
    }

    setDailyData(dailyStats);
  };

  // Function to download individual charts as PDF
  const downloadChartAsPDF = async (chartId, fileName) => {
    const input = document.getElementById(chartId);
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
    pdf.save(`${fileName}.pdf`);
  };

  // Function to calculate chart summaries
  const getChartSummary = (data, key) => {
    const total = data.reduce((sum, item) => sum + item[key], 0);
    const average = (total / data.length).toFixed(2);
    const max = Math.max(...data.map(item => item[key]));
    const min = Math.min(...data.map(item => item[key]));
    return { total, average, max, min };
  };

  // Generate PDF for the entire dashboard
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
    pdf.save('user-analytics-report.pdf');
  };

  // Sorting function
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    // Sort the filtered users
    const sortedUsers = [...filteredUsers].sort((a, b) => {
      if (a[key] < b[key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setFilteredUsers(sortedUsers);
  };

  // Get current users for pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

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

  // Calculate totals for the stats
  const totalUsers = users.length;
  const activeUsers = stats.activeUsersCount || users.filter(user => user.is_active).length;
  const newSignups = stats.newSignupsCount;
  const inactiveUsers = totalUsers - activeUsers;

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">User Analytics Dashboard</h1>
        <div className="dashboard-actions">
          <div className="tab-buttons">
            <button
              className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
              onClick={() => setActiveTab('users')}
            >
              Users
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
        {/* Control Panel */}
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
                    <h6 className="stat-subtitle">Total Users</h6>
                    <h2 className="stat-title">{totalUsers}</h2>
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
                    <h6 className="stat-subtitle">Active Users</h6>
                    <h2 className="stat-title">{activeUsers}</h2>
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
                    <h6 className="stat-subtitle">New Signups (30 days)</h6>
                    <h2 className="stat-title">{newSignups}</h2>
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
                    <h6 className="stat-subtitle">Inactive Users</h6>
                    <h2 className="stat-title">{inactiveUsers}</h2>
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
                    <h5 className="card-title">User Activity ({dateRange === '7days' ? 'Last 7 Days' : dateRange === '30days' ? 'Last 30 Days' : 'Last 90 Days'})</h5>
                    <div className="chart-container" id="user-activity-chart">
                      <ResponsiveContainer width="100%" height={300}>
                        {selectedChartType === 'line' ? (
                          <LineChart data={dailyData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="activeUsers" stroke="#0088FE" name="Active Users" />
                            <Line type="monotone" dataKey="newSignups" stroke="#00C49F" name="New Signups" />
                            <Line type="monotone" dataKey="inactiveUsers" stroke="#FF8042" name="Inactive Users" />
                          </LineChart>
                        ) : selectedChartType === 'bar' ? (
                          <BarChart data={dailyData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="activeUsers" fill="#0088FE" name="Active Users" />
                            <Bar dataKey="newSignups" fill="#00C49F" name="New Signups" />
                            <Bar dataKey="inactiveUsers" fill="#FF8042" name="Inactive Users" />
                          </BarChart>
                        ) : (
                          <LineChart data={dailyData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="activeUsers" stroke="#0088FE" strokeWidth={2} fill="#0088FE" fillOpacity={0.3} />
                            <Line type="monotone" dataKey="newSignups" stroke="#00C49F" strokeWidth={2} fill="#00C49F" fillOpacity={0.3} />
                            <Line type="monotone" dataKey="inactiveUsers" stroke="#FF8042" strokeWidth={2} fill="#FF8042" fillOpacity={0.3} />
                          </LineChart>
                        )}
                      </ResponsiveContainer>
                    </div>
                    <div className="chart-summary">
                      <p><strong>Summary:</strong> Active users: {getChartSummary(dailyData, 'activeUsers').total}, New signups: {getChartSummary(dailyData, 'newSignups').total}, Inactive users: {getChartSummary(dailyData, 'inactiveUsers').total}</p>
                    </div>
                    <button
                      className="btn btn-download-chart"
                      onClick={() => downloadChartAsPDF('user-activity-chart', 'user-activity-report')}
                    >
                      <Download className="icon" size={18} />
                      Download Chart
                    </button>
                  </div>
                </div>
              </div>

              <div className="chart-card-sm">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Daily New Signups</h5>
                    <div className="chart-container" id="daily-signups-chart">
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={dailyData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="newSignups" fill="#8884d8" name="New Signups" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="chart-summary">
                      <p><strong>Summary:</strong> Total new signups: {getChartSummary(dailyData, 'newSignups').total}, Average: {getChartSummary(dailyData, 'newSignups').average}</p>
                    </div>
                    <button
                      className="btn btn-download-chart"
                      onClick={() => downloadChartAsPDF('daily-signups-chart', 'daily-signups-report')}
                    >
                      <Download className="icon" size={18} />
                      Download Chart
                    </button>
                  </div>
                </div>
              </div>
            </div>

            
            <div className="charts-row">
              <div className="chart-card-md">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">User Types Distribution</h5>
                    <div className="chart-container" id="user-types-chart">
                      <ResponsiveContainer width="100%" height={300}>
                        <RadarChart outerRadius={150} data={userTypes}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey="name" />
                          <PolarRadiusAxis />
                          <Radar name="User Types" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                          <Tooltip />
                          <Legend />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="chart-summary">
                      <p><strong>Summary:</strong> Regular Users: {userTypes[0]?.value}, Admins: {userTypes[1]?.value}, Moderators: {userTypes[2]?.value}</p>
                    </div>
                    <button
                      className="btn btn-download-chart"
                      onClick={() => downloadChartAsPDF('user-types-chart', 'user-types-report')}
                    >
                      <Download className="icon" size={18} />
                      Download Chart
                    </button>
                  </div>
                </div>
              </div>

              <div className="chart-card-md">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Gender Distribution</h5>
                    <div className="chart-container" id="gender-distribution-chart">
                      <ResponsiveContainer width="100%" height={300}>
                        <RadarChart outerRadius={150} data={genderData}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey="name" />
                          <PolarRadiusAxis />
                          <Radar name="Gender" dataKey="value" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                          <Tooltip />
                          <Legend />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="chart-summary">
                      <p><strong>Summary:</strong> Male: {genderData[0]?.value}, Female: {genderData[1]?.value}, Other: {genderData[2]?.value}</p>
                    </div>
                    <button
                      className="btn btn-download-chart"
                      onClick={() => downloadChartAsPDF('gender-distribution-chart', 'gender-distribution-report')}
                    >
                      <Download className="icon" size={18} />
                      Download Chart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* User Table Tab */}
        {activeTab === 'users' && (
          <div className="users-table-container">
            <div className="card">
              <div className="card-body">
                <div className="table-header">
                  <h5 className="card-title">User Details</h5>
                  <div className="search-filter">
                    <div className="search-container">
                      <Search className="search-icon" size={18} />
                      <input
                        type="text"
                        className="search-input"
                        placeholder="Search users..."
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
                        <option value="all">All Users</option>
                        <option value="active">Active Only</option>
                        <option value="inactive">Inactive Only</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th onClick={() => requestSort('_id')}>ID {sortConfig.key === '_id' && (sortConfig.direction === 'asc' ? '▲' : '▼')}</th>
                        <th onClick={() => requestSort('username')}>Username {sortConfig.key === 'username' && (sortConfig.direction === 'asc' ? '▲' : '▼')}</th>
                        <th onClick={() => requestSort('email')}>Email {sortConfig.key === 'email' && (sortConfig.direction === 'asc' ? '▲' : '▼')}</th>
                        <th onClick={() => requestSort('role')}>Role {sortConfig.key === 'role' && (sortConfig.direction === 'asc' ? '▲' : '▼')}</th>
                        <th onClick={() => requestSort('gender')}>Gender {sortConfig.key === 'gender' && (sortConfig.direction === 'asc' ? '▲' : '▼')}</th>
                        <th onClick={() => requestSort('is_active')}>Status {sortConfig.key === 'is_active' && (sortConfig.direction === 'asc' ? '▲' : '▼')}</th>
                        <th onClick={() => requestSort('location')}>Location {sortConfig.key === 'location' && (sortConfig.direction === 'asc' ? '▲' : '▼')}</th>
                        <th onClick={() => requestSort('createdAt')}>Created {sortConfig.key === 'createdAt' && (sortConfig.direction === 'asc' ? '▲' : '▼')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentUsers.map(user => (
                        <tr key={user._id} className="user-row">
                          <td>{user._id.substring(0, 6)}...</td>
                          <td>{user.username}</td>
                          <td>{user.email}</td>
                          <td>
                            <span className={`badge ${
                              user.role === 'admin' ? 'badge-admin' :
                                user.role === 'moderator' ? 'badge-moderator' :
                                  'badge-user'
                            }`}>
                              {user.role || 'user'}
                            </span>
                          </td>
                          <td>{user.gender}</td>
                          <td>
                            <span className={`badge ${user.is_active ? 'badge-active' : 'badge-inactive'}`}>
                              {user.is_active ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td>{user.location}</td>
                          <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="pagination-container">
                  <span className="pagination-info">
                    Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length} users
                  </span>
                  <nav aria-label="User pagination">
                    <ul className="pagination">
                      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <a className="page-link" href="#" onClick={() => paginate(currentPage - 1)}>Previous</a>
                      </li>
                      {Array.from({ length: Math.ceil(filteredUsers.length / usersPerPage) }, (_, i) => (
                        <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                          <a className="page-link" href="#" onClick={() => paginate(i + 1)}>{i + 1}</a>
                        </li>
                      )).slice(Math.max(currentPage - 3, 0), Math.min(currentPage + 2, Math.ceil(filteredUsers.length / usersPerPage)))}
                      <li className={`page-item ${currentPage === Math.ceil(filteredUsers.length / usersPerPage) ? 'disabled' : ''}`}>
                        <a className="page-link" href="#" onClick={() => paginate(currentPage + 1)}>Next</a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* User Activity Tab */}
        {activeTab === 'activity' && (
          <div className="activity-container">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">User Activity Trends</h5>
                <p className="card-text">User engagement metrics over time based on login and registration activity.</p>
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
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="activeUsers" stackId="a" fill="#0088FE" name="Active Users" />
                        <Bar dataKey="inactiveUsers" stackId="a" fill="#FF8042" name="Inactive Users" />
                      </BarChart>
                    ) : selectedChartType === 'line' ? (
                      <LineChart
                        data={dailyData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="activeUsers" stroke="#0088FE" name="Active Users" />
                        <Line type="monotone" dataKey="inactiveUsers" stroke="#FF8042" name="Inactive Users" />
                      </LineChart>
                    ) : (
                      <LineChart
                        data={dailyData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="activeUsers" stroke="#0088FE" fill="#0088FE" fillOpacity={0.3} name="Active Users" />
                        <Line type="monotone" dataKey="inactiveUsers" stroke="#FF8042" fill="#FF8042" fillOpacity={0.3} name="Inactive Users" />
                      </LineChart>
                    )}
                  </ResponsiveContainer>
                </div>

                <div className="activity-metrics">
                  <div className="metric-card">
                    <h6>Average Active Users</h6>
                    <p className="metric-value">
                      {Math.round(dailyData.reduce((sum, item) => sum + item.activeUsers, 0) / dailyData.length)}
                    </p>
                  </div>
                  <div className="metric-card">
                    <h6>Peak Active Day</h6>
                    <p className="metric-value">
                      {dailyData.reduce((max, item) => item.activeUsers > max.activeUsers ? item : max, { activeUsers: 0 }).date}
                    </p>
                  </div>
                  <div className="metric-card">
                    <h6>Total New Signups</h6>
                    <p className="metric-value">
                      {dailyData.reduce((sum, item) => sum + item.newSignups, 0)}
                    </p>
                  </div>
                  <div className="metric-card">
                    <h6>Growth Rate</h6>
                    <p className="metric-value">
                      {dailyData.length > 1 ?
                        ((dailyData[dailyData.length - 1].totalUsers - dailyData[0].totalUsers) /
                        dailyData[0].totalUsers * 100).toFixed(1) + '%' : '0%'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="activity-details-row">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">User Engagement Statistics</h5>
                  <div className="chart-container">
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={dailyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="newSignups" fill="#00C49F" name="New Signups" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="dashboard-footer">
        <div className="footer-content">
          <p>© {new Date().getFullYear()} User Analytics Dashboard</p>
          <p className="update-info">Last updated: {new Date().toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;