import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, DollarSign, MapPin, TrendingUp, 
  Settings, LogOut, Moon, Sun, Shield,
  Eye, Download, Upload, Activity, Calendar,
  Clock, Star, AlertCircle, CheckCircle,
  BarChart3, PieChart, LineChart, Filter,
  Search, Bell, Menu, X, ChevronDown,
  FileText, Database, Server, Globe,
  Mail, Phone, Map, Navigation
} from 'lucide-react';
import './AdminDashboard.css';

const AdminDashboard = ({ onLogout }) => {
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState(3);
  const [dateRange, setDateRange] = useState('7d');

  // Mock data for dashboard
  const dashboardStats = {
    totalUsers: 15420,
    activeUsers: 8934,
    totalTrips: 45678,
    revenue: 2847500,
    conversionRate: 68.5,
    avgTripValue: 62.3,
    topDestinations: [
      { name: 'Munnar', trips: 3421, revenue: 213450 },
      { name: 'Goa', trips: 2896, revenue: 189320 },
      { name: 'Manali', trips: 2143, revenue: 156780 },
      { name: 'Kochi', trips: 1987, revenue: 134560 },
      { name: 'Ooty', trips: 1654, revenue: 98760 }
    ],
    recentActivity: [
      { id: 1, user: 'John Doe', action: 'Created trip to Munnar', time: '2 min ago', type: 'trip' },
      { id: 2, user: 'Jane Smith', action: 'Registered new account', time: '5 min ago', type: 'user' },
      { id: 3, user: 'Mike Johnson', action: 'Completed Goa trip', time: '12 min ago', type: 'trip' },
      { id: 4, user: 'Sarah Wilson', action: 'Used budget planner', time: '18 min ago', type: 'planner' },
      { id: 5, user: 'Tom Brown', action: 'Generated AI itinerary', time: '25 min ago', type: 'ai' }
    ],
    revenueChart: [
      { month: 'Jan', revenue: 180000 },
      { month: 'Feb', revenue: 220000 },
      { month: 'Mar', revenue: 195000 },
      { month: 'Apr', revenue: 245000 },
      { month: 'May', revenue: 280000 },
      { month: 'Jun', revenue: 310000 },
      { month: 'Jul', revenue: 290000 }
    ],
    userGrowth: [
      { month: 'Jan', users: 12000 },
      { month: 'Feb', users: 12800 },
      { month: 'Mar', users: 13500 },
      { month: 'Apr', users: 14200 },
      { month: 'May', users: 14800 },
      { month: 'Jun', users: 15200 },
      { month: 'Jul', users: 15420 }
    ]
  };

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'trips', label: 'Trips', icon: MapPin },
    { id: 'revenue', label: 'Revenue', icon: DollarSign },
    { id: 'analytics', label: 'Analytics', icon: LineChart },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    onLogout();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  const getActivityIcon = (type) => {
    switch(type) {
      case 'user': return Users;
      case 'trip': return MapPin;
      case 'planner': return DollarSign;
      case 'ai': return Star;
      default: return Activity;
    }
  };

  return (
    <div className={`admin-dashboard ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* Header */}
      <header className="admin-header">
        <div className="header-left">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="menu-toggle"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="search-bar">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search users, trips, destinations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="header-right">
          <div className="date-selector">
            <select value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
              <option value="24h">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
          </div>

          <div className="notifications">
            <button className="notification-btn">
              <Bell size={20} />
              {notifications > 0 && <span className="notification-badge">{notifications}</span>}
            </button>
          </div>

          <button onClick={toggleDarkMode} className="theme-toggle">
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <div className="admin-profile">
            <div className="profile-info">
              <span className="admin-name">Admin</span>
              <ChevronDown size={16} />
            </div>
            <div className="profile-dropdown">
              <button onClick={handleLogout} className="logout-btn">
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="admin-layout">
        {/* Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside
              initial={{ x: -250 }}
              animate={{ x: 0 }}
              exit={{ x: -250 }}
              transition={{ duration: 0.3 }}
              className="admin-sidebar"
            >
              <div className="sidebar-header">
                <Shield size={24} />
                <span>Admin Panel</span>
              </div>
              <nav className="sidebar-nav">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                  >
                    <item.icon size={20} />
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="admin-main">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="tab-content"
              >
                <div className="dashboard-overview">
                  {/* Stats Cards */}
                  <div className="stats-grid">
                    <div className="stat-card">
                      <div className="stat-icon users">
                        <Users size={24} />
                      </div>
                      <div className="stat-content">
                        <h3>{formatNumber(dashboardStats.totalUsers)}</h3>
                        <p>Total Users</p>
                        <span className="stat-change positive">+12.5%</span>
                      </div>
                    </div>

                    <div className="stat-card">
                      <div className="stat-icon revenue">
                        <DollarSign size={24} />
                      </div>
                      <div className="stat-content">
                        <h3>{formatCurrency(dashboardStats.revenue)}</h3>
                        <p>Total Revenue</p>
                        <span className="stat-change positive">+18.2%</span>
                      </div>
                    </div>

                    <div className="stat-card">
                      <div className="stat-icon trips">
                        <MapPin size={24} />
                      </div>
                      <div className="stat-content">
                        <h3>{formatNumber(dashboardStats.totalTrips)}</h3>
                        <p>Total Trips</p>
                        <span className="stat-change positive">+8.7%</span>
                      </div>
                    </div>

                    <div className="stat-card">
                      <div className="stat-icon conversion">
                        <TrendingUp size={24} />
                      </div>
                      <div className="stat-content">
                        <h3>{dashboardStats.conversionRate}%</h3>
                        <p>Conversion Rate</p>
                        <span className="stat-change positive">+3.2%</span>
                      </div>
                    </div>
                  </div>

                  {/* Charts Section */}
                  <div className="charts-section">
                    <div className="chart-container">
                      <h3>Revenue Overview</h3>
                      <div className="chart-placeholder">
                        <LineChart size={48} />
                        <p>Revenue chart visualization</p>
                        <div className="chart-data">
                          {dashboardStats.revenueChart.map((item, index) => (
                            <div key={index} className="chart-bar">
                              <div className="bar" style={{ height: `${(item.revenue / 310000) * 100}%` }}></div>
                              <span>{item.month}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="chart-container">
                      <h3>User Growth</h3>
                      <div className="chart-placeholder">
                        <BarChart3 size={48} />
                        <p>User growth visualization</p>
                        <div className="chart-data">
                          {dashboardStats.userGrowth.map((item, index) => (
                            <div key={index} className="chart-bar">
                              <div className="bar" style={{ height: `${(item.users / 15420) * 100}%` }}></div>
                              <span>{item.month}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Top Destinations */}
                  <div className="top-destinations">
                    <h3>Top Destinations</h3>
                    <div className="destinations-grid">
                      {dashboardStats.topDestinations.map((dest, index) => (
                        <div key={index} className="destination-card">
                          <div className="destination-rank">#{index + 1}</div>
                          <div className="destination-info">
                            <h4>{dest.name}</h4>
                            <div className="destination-stats">
                              <span>{formatNumber(dest.trips)} trips</span>
                              <span>{formatCurrency(dest.revenue)}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'users' && (
              <motion.div
                key="users"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="tab-content"
              >
                <div className="users-management">
                  <div className="section-header">
                    <h2>User Management</h2>
                    <div className="section-actions">
                      <button className="action-btn">
                        <Download size={16} />
                        Export
                      </button>
                      <button className="action-btn">
                        <Upload size={16} />
                        Import
                      </button>
                    </div>
                  </div>
                  <div className="users-grid">
                    {[1, 2, 3, 4, 5, 6].map((user) => (
                      <div key={user} className="user-card">
                        <div className="user-avatar">
                          <Users size={24} />
                        </div>
                        <div className="user-info">
                          <h4>User {user}</h4>
                          <p>user{user}@example.com</p>
                          <span className="user-status active">Active</span>
                        </div>
                        <div className="user-actions">
                          <button className="action-icon">
                            <Eye size={16} />
                          </button>
                          <button className="action-icon">
                            <Settings size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="tab-content"
              >
                <div className="admin-settings">
                  <h2>Admin Settings</h2>
                  <div className="settings-grid">
                    <div className="setting-card">
                      <h3>General Settings</h3>
                      <div className="setting-item">
                        <label>Site Maintenance Mode</label>
                        <button className="toggle-switch">OFF</button>
                      </div>
                      <div className="setting-item">
                        <label>Debug Mode</label>
                        <button className="toggle-switch">OFF</button>
                      </div>
                    </div>
                    <div className="setting-card">
                      <h3>Security Settings</h3>
                      <div className="setting-item">
                        <label>Two-Factor Auth</label>
                        <button className="toggle-switch">ON</button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Activity Feed */}
      <div className="activity-feed">
        <h3>Recent Activity</h3>
        <div className="activity-list">
          {dashboardStats.recentActivity.map((activity) => {
            const Icon = getActivityIcon(activity.type);
            return (
              <div key={activity.id} className="activity-item">
                <div className="activity-icon">
                  <Icon size={16} />
                </div>
                <div className="activity-content">
                  <p>{activity.action}</p>
                  <span>{activity.user} • {activity.time}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
