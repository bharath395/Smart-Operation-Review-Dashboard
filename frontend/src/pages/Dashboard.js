import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { productionService, issueService, authService } from '../services/api';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import ProductionForm from '../components/ProductionForm';
import IssueForm from '../components/IssueForm';
import UserProfileModal from '../components/UserProfileModal';
import { FaTachometerAlt, FaIndustry, FaExclamationTriangle, FaFileAlt, FaSignOutAlt, FaBell, FaUserCheck, FaBars, FaUser, FaMoon, FaSun } from 'react-icons/fa';
import '../App.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const [data, setData] = useState(null);
  const [issues, setIssues] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showIssueForm, setShowIssueForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [editIssue, setEditIssue] = useState(null);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [notifications, setNotifications] = useState([]);
  const [pendingUsers, setPendingUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [allData, setAllData] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profile, setProfile] = useState({ name: '', username: '', role: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [password, setPassword] = useState({ current: '', new: '', confirm: '' });
  const [message, setMessage] = useState('');
  const [showProfileModal, setShowProfileModal] = useState(false);

  const pendingIssues = issues.filter(i => i.status === 'Pending').length;
  const inProgressIssues = issues.filter(i => i.status === 'In Progress').length;
  const totalActiveIssues = pendingIssues + inProgressIssues;

  useEffect(() => {
    fetchAllData();
    fetchIssues();
    if (['admin', 'manager'].includes(user?.role)) {
      fetchNotifications();
      fetchPendingUsers();
      fetchAllUsers();
      const interval = setInterval(() => {
        fetchNotifications();
        fetchPendingUsers();
        fetchAllUsers();
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [user]);

  useEffect(() => {
    if (activeMenu === 'production') {
      fetchFilteredData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate, activeMenu]);

  const fetchAllData = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const response = await productionService.getAll(today);
      setAllData(response.data);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchFilteredData = async () => {
    try {
      const response = await productionService.getAll(selectedDate);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchIssues = async () => {
    try {
      const response = await issueService.getAll();
      setIssues(response.data);
    } catch (error) {
      console.error('Error fetching issues:', error);
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await authService.getNotifications();
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const fetchPendingUsers = async () => {
    try {
      const response = await authService.getPendingUsers();
      setPendingUsers(response.data);
    } catch (error) {
      console.error('Error fetching pending users:', error);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const response = await authService.getAllUsers();
      setAllUsers(response.data);
    } catch (error) {
      console.error('Error fetching all users:', error);
    }
  };

  const handleApproveUser = async (id) => {
    try {
      await authService.approveUser(id);
      alert('User approved successfully!');
      // Refresh all lists after approval
      await fetchPendingUsers();
      await fetchAllUsers();
      await fetchNotifications();
    } catch (error) {
      console.error('Error approving user:', error);
      alert('Error approving user');
    }
  };

  const handleRejectUser = async (id) => {
    if (window.confirm('Are you sure you want to reject this user?')) {
      try {
        await authService.rejectUser(id);
        fetchPendingUsers();
        fetchNotifications();
        alert('User rejected successfully!');
      } catch (error) {
        console.error('Error rejecting user:', error);
      }
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await authService.deleteUser(id);
        fetchAllUsers();
        alert('User deleted successfully!');
      } catch (error) {
        console.error('Error deleting user:', error);
        alert(error.response?.data?.message || 'Error deleting user');
      }
    }
  };

  const handleEdit = (item) => {
    setEditData(item);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        await productionService.delete(id);
        if (activeMenu === 'production') {
          fetchFilteredData();
        } else {
          fetchAllData();
        }
      } catch (error) {
        console.error('Error deleting data:', error);
      }
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditData(null);
    if (activeMenu === 'production') {
      fetchFilteredData();
    } else {
      fetchAllData();
    }
  };

  const handleEditIssue = (item) => {
    setEditIssue(item);
    setShowIssueForm(true);
  };

  const handleDeleteIssue = async (id) => {
    if (window.confirm('Are you sure you want to delete this issue?')) {
      try {
        await issueService.delete(id);
        await fetchIssues();
        alert('Issue deleted successfully!');
      } catch (error) {
        console.error('Error deleting issue:', error);
        alert('Error deleting issue');
      }
    }
  };

  const handleIssueFormClose = () => {
    setShowIssueForm(false);
    setEditIssue(null);
    fetchIssues();
  };

  const downloadProductionReport = () => {
    const csv = [
      ['Line', 'Machine', 'Total Issued', 'Total Production', 'Defective', 'OEE %', 'Power (kW)'],
      ...data.data.map(item => [
        item.line,
        item.machine,
        item.totalIssued,
        item.totalProduction,
        item.defective,
        item.oee,
        item.powerUtilize || 'N/A'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Production_Report_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const downloadIssuesReport = () => {
    const csv = [
      ['Date', 'Line', 'Machine', 'Problem', 'Status', 'Deadline', 'Reported By', 'Resolved Time'],
      ...issues.map(item => [
        item.date,
        item.line,
        item.machine,
        `"${item.problem}"`,
        item.status,
        item.deadline,
        item.reportedBy,
        item.resolvedTime
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Issues_Report_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  if (!allData) return <div className="loading">Loading...</div>;

  const dashboardData = allData;
  const availability = dashboardData.totalIssued > 0
    ? ((dashboardData.totalProduction / dashboardData.totalIssued) * 100).toFixed(2)
    : '0.00';
  const quality = dashboardData.totalProduction > 0
    ? (((dashboardData.totalProduction - dashboardData.totalDefective) / dashboardData.totalProduction) * 100).toFixed(2)
    : '0.00';
  const performance = dashboardData.avgOEE ? Number(dashboardData.avgOEE).toFixed(2) : '0.00';

  const dayWiseData = {
    labels: dashboardData.data.map(item => `${item.line} - ${item.machine}`),
    datasets: [
      {
        label: 'Total Production',
        data: dashboardData.data.map(item => item.totalProduction),
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        tension: 0.4
      },
      {
        label: 'Total Issued',
        data: dashboardData.data.map(item => item.totalIssued),
        borderColor: '#2196F3',
        backgroundColor: 'rgba(33, 150, 243, 0.1)',
        tension: 0.4
      }
    ]
  };

  const oeeData = {
    labels: dashboardData.data.map(item => `${item.line} - ${item.machine}`),
    datasets: [
      {
        label: 'OEE %',
        data: dashboardData.data.map(item => item.oee),
        backgroundColor: '#FF9800',
        borderColor: '#FF9800',
        borderWidth: 1
      }
    ]
  };

  // Weekly Power Utilization Data
  const getWeeklyPowerData = () => {
    const weeklyData = {};
    dashboardData.data.forEach(item => {
      const week = `Week ${Math.ceil(new Date().getDate() / 7)}`;
      if (!weeklyData[week]) {
        weeklyData[week] = [];
      }
      weeklyData[week].push(parseFloat(item.powerUtilize));
    });
    
    const weeks = Object.keys(weeklyData);
    const avgPowerByWeek = weeks.map(week => {
      const powers = weeklyData[week];
      return (powers.reduce((sum, power) => sum + power, 0) / powers.length).toFixed(1);
    });
    
    return {
      labels: weeks,
      datasets: [
        {
          label: 'Avg Power Utilization (kW)',
          data: avgPowerByWeek,
          borderColor: '#9C27B0',
          backgroundColor: 'rgba(156, 39, 176, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#9C27B0',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 6
        }
      ]
    };
  };

  const weeklyPowerData = getWeeklyPowerData();

  // Machine Health Status Data
  const getMachineHealthData = () => {
    const healthData = {};
    const lines = ['Line A', 'Line B', 'Line C', 'Line D'];
    const machines = ['M1', 'M2', 'M3', 'M4', 'M5'];
    
    lines.forEach(line => {
      machines.forEach(machine => {
        const machineKey = `${line}-${machine}`;
        const machineData = dashboardData.data.filter(item => 
          item.line === line && item.machine === machine
        );
        
        if (machineData.length > 0) {
          const avgOEE = machineData.reduce((sum, item) => sum + parseFloat(item.oee), 0) / machineData.length;
          const avgPower = machineData.reduce((sum, item) => sum + parseFloat(item.powerUtilize), 0) / machineData.length;
          const defectRate = machineData.reduce((sum, item) => sum + (item.defective / item.totalProduction * 100), 0) / machineData.length;
          
          // Determine health status based on multiple factors
          let status = 'Good';
          let score = 100;
          
          if (avgOEE < 75) { status = 'Critical'; score -= 30; }
          else if (avgOEE < 85) { status = 'Warning'; score -= 15; }
          
          if (defectRate > 5) { status = 'Critical'; score -= 25; }
          else if (defectRate > 3) { status = 'Warning'; score -= 10; }
          
          if (avgPower < 75) { status = 'Warning'; score -= 10; }
          
          // Machine-specific adjustments
          if (machine === 'M5') score -= 5; // Older machine
          if (machine === 'M1') score += 5; // Best machine
          
          healthData[machineKey] = {
            line,
            machine,
            status,
            score: Math.max(0, Math.min(100, score)),
            oee: avgOEE.toFixed(1),
            power: avgPower.toFixed(1),
            defectRate: defectRate.toFixed(2)
          };
        }
      });
    });
    
    return Object.values(healthData);
  };

  const machineHealthData = getMachineHealthData();
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'Good': return '#4CAF50';
      case 'Warning': return '#FF9800';
      case 'Critical': return '#f44336';
      default: return '#9E9E9E';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Good': return '✅';
      case 'Warning': return '⚠️';
      case 'Critical': return '🔴';
      default: return '⚪';
    }
  };

  const metricsData = {
    labels: ['Production', 'Defective'],
    datasets: [
      {
        data: [dashboardData.totalProduction, dashboardData.totalDefective],
        backgroundColor: ['#4CAF50', '#f44336'],
        borderWidth: 2
      }
    ]
  };

  const issueStatusData = {
    labels: ['Pending', 'In Progress', 'Resolved'],
    datasets: [
      {
        label: 'Issues',
        data: [
          issues.filter(i => i.status === 'Pending').length,
          issues.filter(i => i.status === 'In Progress').length,
          issues.filter(i => i.status === 'Resolved').length
        ],
        backgroundColor: ['#FFC107', '#2196F3', '#4CAF50'],
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="dashboard-layout">
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>BA PRODUCTIONS</h2>
        </div>
        <nav className="sidebar-nav">
          <div className={`nav-item ${activeMenu === 'dashboard' ? 'active' : ''}`} onClick={() => { setActiveMenu('dashboard'); setSidebarOpen(false); }}>
            <FaTachometerAlt /> <span>Dashboard</span>
          </div>
          <div className={`nav-item ${activeMenu === 'production' ? 'active' : ''}`} onClick={() => { setActiveMenu('production'); setSidebarOpen(false); }}>
            <FaIndustry /> <span>Production</span>
          </div>
          <div className={`nav-item ${activeMenu === 'issues' ? 'active' : ''}`} onClick={() => { setActiveMenu('issues'); setSidebarOpen(false); }}>
            <FaExclamationTriangle /> <span>Issues</span>
          </div>
          {['admin', 'manager'].includes(user?.role) && (
            <div className={`nav-item ${activeMenu === 'approvals' ? 'active' : ''}`} onClick={() => { setActiveMenu('approvals'); setSidebarOpen(false); }}>
              <FaUserCheck /> <span>Approvals</span>
              {pendingUsers.length > 0 && <span className="menu-badge">{pendingUsers.length}</span>}
            </div>
          )}
          <div className={`nav-item ${activeMenu === 'reports' ? 'active' : ''}`} onClick={() => { setActiveMenu('reports'); setSidebarOpen(false); }}>
            <FaFileAlt /> <span>Reports</span>
          </div>
          <div className={`nav-item ${activeMenu === 'profile' ? 'active' : ''}`} onClick={() => { setActiveMenu('profile'); setSidebarOpen(false); }}>
            <FaUser /> <span>Profile</span>
          </div>
          <div className="nav-item logout" onClick={logout}>
            <FaSignOutAlt /> <span>Logout</span>
          </div>
        </nav>
      </aside>

      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>}

      <div className="main-content">
        <header className="dashboard-header">
          <div className="header-left">
            <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <FaBars />
            </button>
            <h1>Dashboard</h1>
          </div>
          <div className="header-right">
            <button className="theme-toggle" onClick={toggleTheme}>
              {isDarkMode ? <FaSun /> : <FaMoon />}
            </button>
            <span className="user-info" onClick={() => setShowProfileModal(true)}>
              Welcome, {user?.name} ({user?.role})
            </span>
            {['admin', 'manager'].includes(user?.role) && (
              <div className="notification-icon" onClick={() => setShowNotifications(!showNotifications)}>
                <FaBell />
                {notifications.length > 0 && <span className="notification-badge">{notifications.reduce((sum, n) => sum + n.count, 0)}</span>}
              </div>
            )}
          </div>
        </header>

        {showNotifications && ['admin', 'manager'].includes(user?.role) && (
          <div className="notification-panel">
            <h3>Notifications</h3>
            {notifications.length === 0 ? (
              <p>No new notifications</p>
            ) : (
              notifications.map((notif, index) => (
                <div key={index} className="notification-item" onClick={() => {
                  if (notif.type === 'user_approval') setActiveMenu('approvals');
                  setShowNotifications(false);
                }}>
                  <span className="notif-icon">{notif.type === 'user_approval' ? '👤' : '⚠️'}</span>
                  <span>{notif.message}</span>
                </div>
              ))
            )}
          </div>
        )}

        {activeMenu === 'dashboard' && (
          <>
            <div className="kpi-container">
              <div className="kpi-card">
                <h3>Total Issued</h3>
                <p className="kpi-value">{dashboardData.totalIssued}</p>
              </div>
              <div className="kpi-card">
                <h3>Total Production</h3>
                <p className="kpi-value">{dashboardData.totalProduction}</p>
              </div>
              <div className="kpi-card">
                <h3>Defective Rate</h3>
                <p className="kpi-value">{dashboardData.defectiveRate}%</p>
              </div>
              <div className="kpi-card">
                <h3>Average OEE</h3>
                <p className="kpi-value">{dashboardData.avgOEE}%</p>
              </div>
              <div className="kpi-card">
                <h3>Availability</h3>
                <p className="kpi-value">{availability}%</p>
              </div>
              <div className="kpi-card">
                <h3>Performance</h3>
                <p className="kpi-value">{performance}%</p>
              </div>
              <div className="kpi-card">
                <h3>Quality</h3>
                <p className="kpi-value">{quality}%</p>
              </div>
              <div className="kpi-card">
                <h3>Avg Power Utilize</h3>
                <p className="kpi-value">{dashboardData.avgPowerUtilize} kW</p>
              </div>
              <div className="kpi-card issue-card">
                <h3>Total Active Issues</h3>
                <p className="kpi-value">{totalActiveIssues}</p>
                <div className="issue-breakdown">
                  <span className="pending-count">Pending: {pendingIssues}</span>
                  <span className="progress-count">In Progress: {inProgressIssues}</span>
                </div>
              </div>
            </div>

            <div className="charts-container">
              <div className="chart-box">
                <h3>Line-Machine Production</h3>
                <Line data={dayWiseData} options={{ responsive: true, maintainAspectRatio: true }} />
              </div>
              
              <div className="chart-box">
                <h3>Line-Machine OEE Performance</h3>
                <Bar data={oeeData} options={{ responsive: true, maintainAspectRatio: true }} />
              </div>

              <div className="chart-box">
                <h3>Weekly Power Utilization Trend</h3>
                <Line data={weeklyPowerData} options={{ 
                  responsive: true, 
                  maintainAspectRatio: true,
                  plugins: {
                    legend: {
                      display: true,
                      position: 'top'
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: false,
                      min: 70,
                      max: 100,
                      title: {
                        display: true,
                        text: 'Power (kW)'
                      }
                    },
                    x: {
                      title: {
                        display: true,
                        text: 'Week'
                      }
                    }
                  }
                }} />
              </div>

              <div className="chart-box small">
                <h3>Production Metrics</h3>
                <Doughnut data={metricsData} options={{ responsive: true, maintainAspectRatio: true }} />
              </div>

              <div className="chart-box small">
                <h3>Issue Status</h3>
                <Doughnut data={issueStatusData} options={{ responsive: true, maintainAspectRatio: true }} />
              </div>

              <div className="chart-box machine-health">
                <h3>Machine Health Status</h3>
                <div className="machine-health-grid">
                  {machineHealthData.map((machine, index) => (
                    <div key={index} className={`machine-card ${machine.status.toLowerCase()}`}>
                      <div className="machine-header">
                        <span className="machine-name">{machine.line} - {machine.machine}</span>
                        <span className="status-icon">{getStatusIcon(machine.status)}</span>
                      </div>
                      <div className="machine-metrics">
                        <div className="metric">
                          <span className="metric-label">OEE</span>
                          <span className="metric-value">{machine.oee}%</span>
                        </div>
                        <div className="metric">
                          <span className="metric-label">Power</span>
                          <span className="metric-value">{machine.power}kW</span>
                        </div>
                        <div className="metric">
                          <span className="metric-label">Defects</span>
                          <span className="metric-value">{machine.defectRate}%</span>
                        </div>
                      </div>
                      <div className="health-score">
                        <div className="score-bar">
                          <div 
                            className="score-fill" 
                            style={{ 
                              width: `${machine.score}%`, 
                              backgroundColor: getStatusColor(machine.status) 
                            }}
                          ></div>
                        </div>
                        <span className="score-text">{machine.score}/100</span>
                      </div>
                      <div className={`status-badge ${machine.status.toLowerCase()}`}>
                        {machine.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {activeMenu === 'reports' && (
          <div className="content-section">
            <div className="report-section">
              <h3>Download Reports</h3>
              <div className="report-buttons">
                <button onClick={downloadProductionReport} className="download-btn">
                  📊 Download Production Report
                </button>
                <button onClick={downloadIssuesReport} className="download-btn">
                  ⚠️ Download Issues Report
                </button>
              </div>
            </div>
          </div>
        )}

        {activeMenu === 'production' && (
          <div className="content-section">
            <div className="date-filter-section">
              <label>Select Date: </label>
              <input 
                type="date" 
                value={selectedDate} 
                onChange={(e) => setSelectedDate(e.target.value)}
                max={new Date().toISOString().split('T')[0]}
              />
            </div>
            
            {['admin', 'manager', 'supervisor'].includes(user?.role) && (
              <button onClick={() => setShowForm(true)} className="add-btn">Add Production Data</button>
            )}
            
            <div className="data-table">
              <h3>Production Records</h3>
              <table>
                <thead>
                  <tr>
                    <th>Line</th>
                    <th>Machine</th>
                    <th>Issued</th>
                    <th>Production</th>
                    <th>Defective</th>
                    <th>OEE %</th>
                    <th>Power (kW)</th>
                    {['admin', 'manager', 'supervisor'].includes(user?.role) && <th>Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {data.data.map(item => (
                    <tr key={item.id}>
                      <td>{item.line}</td>
                      <td>{item.machine}</td>
                      <td>{item.totalIssued}</td>
                      <td>{item.totalProduction}</td>
                      <td>{item.defective}</td>
                      <td>{item.oee}%</td>
                      <td>{item.powerUtilize || 'N/A'}</td>
                      {['admin', 'manager', 'supervisor'].includes(user?.role) && (
                        <td>
                          <button onClick={() => handleEdit(item)} className="edit-btn">Edit</button>
                          <button onClick={() => handleDelete(item.id)} className="delete-btn">Delete</button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeMenu === 'issues' && (
          <div className="content-section">
            {['admin', 'manager', 'supervisor'].includes(user?.role) && (
              <button onClick={() => setShowIssueForm(true)} className="add-btn">Report Issue</button>
            )}
            
            <div className="data-table">
              <h3>Machine Issues</h3>
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Line</th>
                    <th>Machine</th>
                    <th>Problem</th>
                    <th>Status</th>
                    <th>Deadline</th>
                    <th>Reported By</th>
                    <th>Resolved Time</th>
                    {['admin', 'manager', 'supervisor'].includes(user?.role) && <th>Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {issues.map(item => {
                    const isOverdue = (item.status === 'Pending' || item.status === 'In Progress') && 
                                      new Date(item.deadline) < new Date();
                    return (
                      <tr key={item.id} className={isOverdue ? 'overdue-row' : ''}>
                        <td>{item.date}</td>
                        <td>{item.line}</td>
                        <td>{item.machine}</td>
                        <td>{item.problem}</td>
                        <td>
                          <span className={`status-badge ${item.status.toLowerCase().replace(' ', '-')}`}>
                            {item.status}
                          </span>
                        </td>
                        <td>
                          {item.deadline}
                          {isOverdue && <span className="overdue-badge">⚠️ OVERDUE</span>}
                        </td>
                        <td>{item.reportedBy}</td>
                        <td>{item.resolvedTime}</td>
                        {['admin', 'manager', 'supervisor'].includes(user?.role) && (
                          <td>
                            <button onClick={() => handleEditIssue(item)} className="edit-btn">Edit</button>
                            <button onClick={() => handleDeleteIssue(item.id)} className="delete-btn">Delete</button>
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeMenu === 'approvals' && ['admin', 'manager'].includes(user?.role) && (
          <div className="content-section">
            <div className="data-table">
              <h3>Pending User Approvals</h3>
              {pendingUsers.length === 0 ? (
                <p>No pending user approvals</p>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Worker ID</th>
                      <th>Username</th>
                      <th>Full Name</th>
                      <th>Role</th>
                      <th>Requested At</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingUsers.map(user => (
                      <tr key={user.id}>
                        <td>{user.worker_id}</td>
                        <td>{user.username}</td>
                        <td>{user.name}</td>
                        <td><span className="role-badge">{user.role}</span></td>
                        <td>{new Date(user.requestedAt).toLocaleString()}</td>
                        <td>
                          <button onClick={() => handleApproveUser(user.id)} className="edit-btn">Approve</button>
                          <button onClick={() => handleRejectUser(user.id)} className="delete-btn">Reject</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <div className="data-table" style={{marginTop: '30px'}}>
              <h3>All Users</h3>
              <table>
                <thead>
                  <tr>
                    <th>Worker ID</th>
                    <th>Username</th>
                    <th>Full Name</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allUsers.map(user => (
                    <tr key={user.id}>
                      <td>{user.worker_id}</td>
                      <td>{user.username}</td>
                      <td>{user.name}</td>
                      <td><span className="role-badge">{user.role}</span></td>
                      <td>
                        <button onClick={() => handleDeleteUser(user.id)} className="delete-btn">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeMenu === 'profile' && (
          <div className="content-section">
            <div className="profile-container">
              {message && <div className="message">{message}</div>}
              
              <div className="profile-section">
                <h3>Personal Information</h3>
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  try {
                    await authService.updateProfile({ name: profile.name });
                    setMessage('Profile updated successfully');
                    setIsEditing(false);
                  } catch (error) {
                    setMessage(error.response?.data?.message || 'Update failed');
                  }
                }}>
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      value={profile.name || user?.name || ''}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="form-group">
                    <label>Username</label>
                    <input type="text" value={user?.username || ''} disabled />
                  </div>
                  <div className="form-group">
                    <label>Role</label>
                    <input type="text" value={user?.role || ''} disabled />
                  </div>
                  {isEditing ? (
                    <div className="button-group">
                      <button type="submit" className="edit-btn">Save</button>
                      <button type="button" onClick={() => setIsEditing(false)} className="delete-btn">Cancel</button>
                    </div>
                  ) : (
                    <button type="button" onClick={() => setIsEditing(true)} className="edit-btn">Edit</button>
                  )}
                </form>
              </div>

              <div className="profile-section">
                <h3>Change Password</h3>
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  if (password.new !== password.confirm) {
                    setMessage('Passwords do not match');
                    return;
                  }
                  try {
                    await authService.changePassword({ currentPassword: password.current, newPassword: password.new });
                    setMessage('Password changed successfully');
                    setPassword({ current: '', new: '', confirm: '' });
                  } catch (error) {
                    setMessage(error.response?.data?.message || 'Password change failed');
                  }
                }}>
                  <div className="form-group">
                    <label>Current Password</label>
                    <input
                      type="password"
                      value={password.current}
                      onChange={(e) => setPassword({ ...password, current: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>New Password</label>
                    <input
                      type="password"
                      value={password.new}
                      onChange={(e) => setPassword({ ...password, new: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Confirm Password</label>
                    <input
                      type="password"
                      value={password.confirm}
                      onChange={(e) => setPassword({ ...password, confirm: e.target.value })}
                    />
                  </div>
                  <button type="submit" className="edit-btn">Change Password</button>
                </form>
              </div>
            </div>
          </div>
        )}

        {showForm && (
          <ProductionForm
            data={editData}
            onClose={handleFormClose}
          />
        )}

        {showIssueForm && (
          <IssueForm
            data={editIssue}
            onClose={handleIssueFormClose}
          />
        )}

        <UserProfileModal 
          isOpen={showProfileModal}
          onClose={() => setShowProfileModal(false)}
          user={{
            id: user?.id,
            worker_id: user?.worker_id,
            name: user?.name,
            role: user?.role,
            avatar: null
          }}
        />
      </div>
    </div>
  );
};

export default Dashboard;
