import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, MapPin, Navigation, DollarSign, Calendar, 
  Home, Map, Calculator, User, Settings, 
  LogOut, Menu, X, ChevronRight, 
  Clock, Star, Heart, Share2, Download
} from 'lucide-react';
import PremiumHero from './components/PremiumHero';
import PlaceSearch from './components/PlaceSearch';
import TripPlanner from './components/TripPlanner';
import BudgetPlanner from './components/BudgetPlanner';
import AIPlanner from './components/AIPlanner';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import TripSaver from './components/TripSaver';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [currentTripData, setCurrentTripData] = useState(null);
  const [currentPlannerType, setCurrentPlannerType] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
    }

    // Register service worker for PWA
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered:', registration);
          
          // Request notification permission
          if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission().then((permission) => {
              console.log('Notification permission:', permission);
            });
          }
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setCurrentPage('home');
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'destinations', label: 'Destinations', icon: Map },
    { id: 'planner', label: 'Trip Planner', icon: Navigation },
    { id: 'budget', label: 'Budget Planner', icon: Calculator },
    { id: 'ai', label: 'AI Planner', icon: Star },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <PremiumHero onNavigate={setCurrentPage} />;
      case 'destinations':
        return <PlaceSearch />;
      case 'planner':
        return (
          <div>
            <TripPlanner 
              onTripDataChange={(data) => {
                setCurrentTripData(data);
                setCurrentPlannerType('normal');
              }} 
            />
            {currentTripData && currentPlannerType === 'normal' && (
              <TripSaver 
                tripData={currentTripData} 
                plannerType={currentPlannerType} 
              />
            )}
          </div>
        );
      case 'budget':
        return (
          <div>
            <BudgetPlanner 
              onTripDataChange={(data) => {
                setCurrentTripData(data);
                setCurrentPlannerType('budget');
              }} 
            />
            {currentTripData && currentPlannerType === 'budget' && (
              <TripSaver 
                tripData={currentTripData} 
                plannerType={currentPlannerType} 
              />
            )}
          </div>
        );
      case 'ai':
        return (
          <div>
            <AIPlanner 
              onTripDataChange={(data) => {
                setCurrentTripData(data);
                setCurrentPlannerType('ai');
              }} 
            />
            {currentTripData && currentPlannerType === 'ai' && (
              <TripSaver 
                tripData={currentTripData} 
                plannerType={currentPlannerType} 
              />
            )}
          </div>
        );
      case 'admin':
        return <AdminDashboard onLogout={handleLogout} />;
      default:
        return <PremiumHero onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      {/* Navigation Bar */}
      <motion.nav 
        className="navbar"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="nav-container">
          <div className="nav-brand">
            <div className="brand-logo">
              <Navigation className="logo-icon" />
              <span>TravelPro</span>
            </div>
          </div>

          <div className="nav-menu">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div className="nav-actions">
            <button 
              onClick={toggleDarkMode}
              className="theme-toggle"
              title="Toggle theme"
            >
              {darkMode ? <div className="sun-icon">☀️</div> : <div className="moon-icon">🌙</div>}
            </button>
            
            {user ? (
              <div className="user-menu">
                <button className="user-btn">
                  <User size={20} />
                  <span>{user.name}</span>
                </button>
                <div className="user-dropdown">
                  <button onClick={() => setCurrentPage('my-trips')}>
                    <Heart size={16} />
                    My Trips
                  </button>
                  <button onClick={handleLogout}>
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <button 
                onClick={() => setCurrentPage('login')}
                className="login-btn"
              >
                <User size={20} />
                Login
              </button>
            )}
          </div>

          <button 
            className="mobile-menu-toggle"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.3 }}
          >
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setShowMobileMenu(false);
                }}
                className={`mobile-nav-item ${currentPage === item.id ? 'active' : ''}`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="main-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="page-content"
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>TravelPro</h4>
            <p>Your premium travel companion for exploring India</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <div className="footer-links">
              <button onClick={() => setCurrentPage('home')}>Home</button>
              <button onClick={() => setCurrentPage('destinations')}>Destinations</button>
              <button onClick={() => setCurrentPage('planner')}>Trip Planner</button>
            </div>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p>support@travelpro.com</p>
            <div className="social-links">
              <button>📧</button>
              <button>📱</button>
              <button>💬</button>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 TravelPro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;