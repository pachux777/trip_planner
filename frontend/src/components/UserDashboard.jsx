import { useState, useEffect } from 'react';
import { 
  User, 
  Calendar, 
  Heart, 
  Bookmark, 
  Clock, 
  MapPin, 
  Star, 
  TrendingUp, 
  Download, 
  Share2, 
  Settings, 
  Bell, 
  Search, 
  Filter, 
  Grid, 
  List, 
  Camera, 
  Hotel, 
  Utensils, 
  Car, 
  Train, 
  Plane, 
  DollarSign, 
  Users, 
  Award, 
  Target, 
  Zap, 
  Compass, 
  Globe, 
  Navigation, 
  Route, 
  Eye, 
  Edit, 
  Trash2, 
  Plus, 
  ChevronRight, 
  ArrowRight, 
  BarChart, 
  PieChart, 
  Activity, 
  TrendingUp as TrendingUpIcon,
  CheckCircle,
  AlertCircle,
  Info,
  X,
  Menu
} from 'lucide-react';
import './UserDashboard.css';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [savedPlaces, setSavedPlaces] = useState([]);
  const [plannedTrips, setPlannedTrips] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [userStats, setUserStats] = useState({
    totalTrips: 0,
    savedPlaces: 0,
    totalSpent: 0,
    destinationsVisited: 0
  });

  // Mock data
  useEffect(() => {
    // Load saved data from localStorage
    const savedPlacesData = localStorage.getItem('savedPlaces');
    const plannedTripsData = localStorage.getItem('plannedTrips');
    const searchHistoryData = localStorage.getItem('searchHistory');
    
    if (savedPlacesData) setSavedPlaces(JSON.parse(savedPlacesData));
    if (plannedTripsData) setPlannedTrips(JSON.parse(plannedTripsData));
    if (searchHistoryData) setSearchHistory(JSON.parse(searchHistoryData));

    // Generate mock data
    generateMockData();
  }, []);

  const generateMockData = () => {
    // Mock saved places
    const mockSavedPlaces = [
      {
        id: 1,
        name: 'Munnar',
        location: 'Kerala',
        image: 'https://images.unsplash.com/photo-1548199973-75cce1b4ea31?w=300',
        rating: 4.8,
        savedDate: '2024-01-15',
        category: 'hill station'
      },
      {
        id: 2,
        name: 'Goa',
        location: 'Goa',
        image: 'https://images.unsplash.com/photo-1512343879798-01e0e4352a18?w=300',
        rating: 4.9,
        savedDate: '2024-01-10',
        category: 'beach'
      },
      {
        id: 3,
        name: 'Jaipur',
        location: 'Rajasthan',
        image: 'https://images.unsplash.com/photo-1524492412937-b784b5b9c7c9?w=300',
        rating: 4.7,
        savedDate: '2024-01-05',
        category: 'heritage'
      }
    ];

    // Mock planned trips
    const mockPlannedTrips = [
      {
        id: 1,
        destination: 'Kerala Backwaters',
        startDate: '2024-02-15',
        endDate: '2024-02-20',
        budget: 15000,
        members: 2,
        status: 'upcoming',
        image: 'https://images.unsplash.com/photo-1559827268-dc88b52df2a8?w=300',
        activities: ['Houseboat Stay', 'Ayurvedic Spa', 'Kathakali Dance']
      },
      {
        id: 2,
        destination: 'Rajasthan Royal Tour',
        startDate: '2024-03-10',
        endDate: '2024-03-17',
        budget: 25000,
        members: 4,
        status: 'planning',
        image: 'https://images.unsplash.com/photo-1524492412937-b784b5b9c7c9?w=300',
        activities: ['Palace Stay', 'Desert Safari', 'Cultural Programs']
      }
    ];

    // Mock search history
    const mockSearchHistory = [
      { query: 'Goa beaches', timestamp: '2024-01-20T10:30:00Z', results: 15 },
      { query: 'Kerala hill stations', timestamp: '2024-01-19T15:45:00Z', results: 8 },
      { query: 'Rajasthan heritage sites', timestamp: '2024-01-18T09:20:00Z', results: 12 }
    ];

    // Mock recent activity
    const mockRecentActivity = [
      {
        id: 1,
        type: 'saved_place',
        title: 'Saved Munnar to favorites',
        timestamp: '2024-01-20T14:30:00Z',
        icon: Heart
      },
      {
        id: 2,
        type: 'planned_trip',
        title: 'Created Kerala Backwaters trip',
        timestamp: '2024-01-19T11:20:00Z',
        icon: Calendar
      },
      {
        id: 3,
        type: 'search',
        title: 'Searched for Goa beaches',
        timestamp: '2024-01-18T16:45:00Z',
        icon: Search
      }
    ];

    // Mock notifications
    const mockNotifications = [
      {
        id: 1,
        type: 'price_drop',
        title: 'Price Drop Alert',
        message: '20% off on Kerala packages',
        timestamp: '2 hours ago',
        read: false
      },
      {
        id: 2,
        type: 'recommendation',
        title: 'New Recommendation',
        message: 'Based on your search, check out Andaman',
        timestamp: '1 day ago',
        read: false
      }
    ];

    // Mock user stats
    const mockUserStats = {
      totalTrips: 12,
      savedPlaces: 28,
      totalSpent: 125000,
      destinationsVisited: 15
    };

    setSavedPlaces(mockSavedPlaces);
    setPlannedTrips(mockPlannedTrips);
    setSearchHistory(mockSearchHistory);
    setRecentActivity(mockRecentActivity);
    setNotifications(mockNotifications);
    setUserStats(mockUserStats);
  };

  const handleRemoveSavedPlace = (placeId) => {
    setSavedPlaces(prev => prev.filter(place => place.id !== placeId));
  };

  const handleDeleteTrip = (tripId) => {
    setPlannedTrips(prev => prev.filter(trip => trip.id !== tripId));
  };

  const handleMarkNotificationRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const handleDownloadTrip = (trip) => {
    const tripText = `
TRIP PLAN: ${trip.destination}
========================
Duration: ${trip.startDate} to ${trip.endDate}
Budget: ₹${trip.budget}
Members: ${trip.members}
Activities: ${trip.activities.join(', ')}
Status: ${trip.status}
    `;
    
    const blob = new Blob([tripText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `trip-${trip.destination}-${trip.startDate}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShareTrip = (trip) => {
    const shareText = `Planning a trip to ${trip.destination} from ${trip.startDate} to ${trip.endDate}! Budget: ₹${trip.budget}`;
    if (navigator.share) {
      navigator.share({
        title: `Trip to ${trip.destination}`,
        text: shareText
      });
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Trip details copied to clipboard!');
    }
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart },
    { id: 'saved', name: 'Saved Places', icon: Heart },
    { id: 'trips', name: 'Planned Trips', icon: Calendar },
    { id: 'history', name: 'Search History', icon: Clock },
    { id: 'activity', name: 'Activity', icon: Activity }
  ];

  return (
    <div className="user-dashboard">
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <div className="user-info">
              <div className="user-avatar">
                <User className="avatar-icon" />
              </div>
              <div className="user-details">
                <h2 className="user-name">Welcome back, Traveler!</h2>
                <p className="user-subtitle">Your personalized travel dashboard</p>
              </div>
            </div>
          </div>
          <div className="header-right">
            <div className="header-actions">
              <button className="action-btn">
                <Search className="btn-icon" />
              </button>
              <button className="action-btn notification-btn">
                <Bell className="btn-icon" />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="notification-badge">
                    {notifications.filter(n => !n.read).length}
                  </span>
                )}
              </button>
              <button className="action-btn">
                <Settings className="btn-icon" />
              </button>
              <button
                className="mobile-menu-btn"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="btn-icon" /> : <Menu className="btn-icon" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="stats-overview">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon-wrapper">
              <Route className="stat-icon" />
            </div>
            <div className="stat-content">
              <h3 className="stat-number">{userStats.totalTrips}</h3>
              <p className="stat-label">Total Trips</p>
            </div>
            <div className="stat-trend">
              <TrendingUpIcon className="trend-icon" />
              <span className="trend-text">+12%</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon-wrapper">
              <Heart className="stat-icon" />
            </div>
            <div className="stat-content">
              <h3 className="stat-number">{userStats.savedPlaces}</h3>
              <p className="stat-label">Saved Places</p>
            </div>
            <div className="stat-trend">
              <TrendingUpIcon className="trend-icon" />
              <span className="trend-text">+8%</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon-wrapper">
              <DollarSign className="stat-icon" />
            </div>
            <div className="stat-content">
              <h3 className="stat-number">₹{userStats.totalSpent.toLocaleString()}</h3>
              <p className="stat-label">Total Spent</p>
            </div>
            <div className="stat-trend">
              <TrendingUpIcon className="trend-icon" />
              <span className="trend-text">+15%</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon-wrapper">
              <MapPin className="stat-icon" />
            </div>
            <div className="stat-content">
              <h3 className="stat-number">{userStats.destinationsVisited}</h3>
              <p className="stat-label">Destinations</p>
            </div>
            <div className="stat-trend">
              <TrendingUpIcon className="trend-icon" />
              <span className="trend-text">+20%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="dashboard-tabs">
        <div className="tabs-container">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon className="tab-icon" />
              <span className="tab-label">{tab.name}</span>
            </button>
          ))}
        </div>
        <div className="tab-actions">
          <div className="view-toggle">
            <button
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <Grid className="btn-icon" />
            </button>
            <button
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <List className="btn-icon" />
            </button>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="overview-content">
            <div className="overview-grid">
              <div className="overview-section">
                <h3 className="section-title">
                  <TrendingUp className="section-icon" />
                  Recent Activity
                </h3>
                <div className="activity-list">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="activity-item">
                      <div className="activity-icon-wrapper">
                        <activity.icon className="activity-icon" />
                      </div>
                      <div className="activity-content">
                        <h4 className="activity-title">{activity.title}</h4>
                        <p className="activity-time">
                          {new Date(activity.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="overview-section">
                <h3 className="section-title">
                  <Target className="section-icon" />
                  Quick Actions
                </h3>
                <div className="quick-actions">
                  <button className="quick-action-btn">
                    <Plus className="btn-icon" />
                    Plan New Trip
                  </button>
                  <button className="quick-action-btn">
                    <Search className="btn-icon" />
                    Explore Places
                  </button>
                  <button className="quick-action-btn">
                    <Bookmark className="btn-icon" />
                    Save Destination
                  </button>
                  <button className="quick-action-btn">
                    <Share2 className="btn-icon" />
                    Share Plans
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Saved Places Tab */}
        {activeTab === 'saved' && (
          <div className="saved-places-content">
            <div className={`places-grid ${viewMode}`}>
              {savedPlaces.map((place) => (
                <div key={place.id} className="place-card">
                  <div className="place-image">
                    <img src={place.image} alt={place.name} />
                    <div className="place-overlay">
                      <button className="overlay-btn">
                        <Eye className="btn-icon" />
                      </button>
                      <button className="overlay-btn">
                        <Share2 className="btn-icon" />
                      </button>
                      <button 
                        className="overlay-btn remove-btn"
                        onClick={() => handleRemoveSavedPlace(place.id)}
                      >
                        <Trash2 className="btn-icon" />
                      </button>
                    </div>
                  </div>
                  <div className="place-content">
                    <h3 className="place-name">{place.name}</h3>
                    <p className="place-location">{place.location}</p>
                    <div className="place-meta">
                      <div className="place-rating">
                        <Star className="rating-icon" />
                        <span>{place.rating}</span>
                      </div>
                      <span className="place-category">{place.category}</span>
                    </div>
                    <p className="place-date">Saved on {place.savedDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Planned Trips Tab */}
        {activeTab === 'trips' && (
          <div className="planned-trips-content">
            <div className={`trips-grid ${viewMode}`}>
              {plannedTrips.map((trip) => (
                <div key={trip.id} className="trip-card">
                  <div className="trip-image">
                    <img src={trip.image} alt={trip.destination} />
                    <div className="trip-status">
                      <span className={`status-badge ${trip.status}`}>
                        {trip.status}
                      </span>
                    </div>
                  </div>
                  <div className="trip-content">
                    <h3 className="trip-destination">{trip.destination}</h3>
                    <div className="trip-dates">
                      <Calendar className="date-icon" />
                      <span>{trip.startDate} to {trip.endDate}</span>
                    </div>
                    <div className="trip-meta">
                      <div className="meta-item">
                        <DollarSign className="meta-icon" />
                        <span>₹{trip.budget}</span>
                      </div>
                      <div className="meta-item">
                        <Users className="meta-icon" />
                        <span>{trip.members} members</span>
                      </div>
                    </div>
                    <div className="trip-activities">
                      <h4>Activities:</h4>
                      <div className="activities-list">
                        {trip.activities.map((activity, index) => (
                          <span key={index} className="activity-tag">{activity}</span>
                        ))}
                      </div>
                    </div>
                    <div className="trip-actions">
                      <button className="trip-action-btn">
                        <Edit className="btn-icon" />
                        Edit
                      </button>
                      <button 
                        className="trip-action-btn"
                        onClick={() => handleDownloadTrip(trip)}
                      >
                        <Download className="btn-icon" />
                        Download
                      </button>
                      <button 
                        className="trip-action-btn"
                        onClick={() => handleShareTrip(trip)}
                      >
                        <Share2 className="btn-icon" />
                        Share
                      </button>
                      <button 
                        className="trip-action-btn delete-btn"
                        onClick={() => handleDeleteTrip(trip.id)}
                      >
                        <Trash2 className="btn-icon" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Search History Tab */}
        {activeTab === 'history' && (
          <div className="search-history-content">
            <div className="history-list">
              {searchHistory.map((search, index) => (
                <div key={index} className="history-item">
                  <div className="history-icon-wrapper">
                    <Search className="history-icon" />
                  </div>
                  <div className="history-content">
                    <h4 className="search-query">{search.query}</h4>
                    <p className="search-details">
                      {search.results} results • {new Date(search.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <button className="history-action-btn">
                    <Search className="btn-icon" />
                    Search Again
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Activity Tab */}
        {activeTab === 'activity' && (
          <div className="activity-content">
            <div className="activity-timeline">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="timeline-item">
                  <div className="timeline-marker">
                    <activity.icon className="timeline-icon" />
                  </div>
                  <div className="timeline-content">
                    <h4 className="timeline-title">{activity.title}</h4>
                    <p className="timeline-time">
                      {new Date(activity.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Notifications Dropdown */}
      {notifications.length > 0 && (
        <div className="notifications-dropdown">
          <div className="notifications-header">
            <h3>Notifications</h3>
            <button className="clear-all-btn">Clear All</button>
          </div>
          <div className="notifications-list">
            {notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`notification-item ${!notification.read ? 'unread' : ''}`}
                onClick={() => handleMarkNotificationRead(notification.id)}
              >
                <div className="notification-icon-wrapper">
                  <Info className="notification-icon" />
                </div>
                <div className="notification-content">
                  <h4 className="notification-title">{notification.title}</h4>
                  <p className="notification-message">{notification.message}</p>
                  <span className="notification-time">{notification.timestamp}</span>
                </div>
                {!notification.read && (
                  <div className="notification-indicator"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
