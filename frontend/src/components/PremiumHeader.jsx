import { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Menu, 
  X, 
  User, 
  Bell, 
  Globe, 
  Compass, 
  Navigation, 
  Calendar, 
  Heart, 
  Settings, 
  ChevronDown,
  Moon,
  Sun,
  Plane,
  Sparkles
} from 'lucide-react';
import './PremiumHeader.css';

const PremiumHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  const navigationItems = [
    { name: 'Home', icon: Compass, href: '/' },
    { name: 'Explore', icon: MapPin, href: '/explore' },
    { name: 'Trip Planner', icon: Navigation, href: '/planner' },
    { name: 'Budget Trips', icon: Calendar, href: '/budget' },
    { name: 'History', icon: Heart, href: '/history' },
    { name: 'About', icon: Globe, href: '/about' },
    { name: 'Contact', icon: Settings, href: '/contact' }
  ];

  const quickSearches = [
    'Goa', 'Kerala', 'Rajasthan', 'Himalaya', 'Andaman', 'Munnar', 'Jaipur', 'Varanasi'
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode');
  };

  return (
    <>
      <header className={`premium-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          {/* Logo */}
          <div className="header-logo">
            <div className="logo-wrapper">
              <Plane className="logo-icon" />
              <span className="logo-text">TripMaster</span>
              <Sparkles className="logo-sparkle" />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="header-nav">
            <ul className="nav-list">
              {navigationItems.map((item, index) => (
                <li key={index} className="nav-item">
                  <a href={item.href} className="nav-link">
                    <item.icon className="nav-icon" />
                    <span>{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Search Bar */}
          <div className="header-search">
            <form onSubmit={handleSearch} className="search-form">
              <div className="search-input-wrapper">
                <Search className="search-icon" />
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search destinations, activities, experiences..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setShowSearchDropdown(true)}
                  onBlur={() => setTimeout(() => setShowSearchDropdown(false), 200)}
                />
                <button type="submit" className="search-btn">
                  <Navigation className="btn-icon" />
                </button>
              </div>
              
              {/* Search Dropdown */}
              {showSearchDropdown && (
                <div className="search-dropdown">
                  <div className="dropdown-header">
                    <span className="dropdown-title">Popular Searches</span>
                  </div>
                  <div className="dropdown-content">
                    {quickSearches.map((search, index) => (
                      <button
                        key={index}
                        className="search-suggestion"
                        onClick={() => setSearchQuery(search)}
                      >
                        <MapPin className="suggestion-icon" />
                        <span>{search}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Header Actions */}
          <div className="header-actions">
            <button
              className="action-btn"
              onClick={toggleDarkMode}
              title="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun className="action-icon" /> : <Moon className="action-icon" />}
            </button>
            
            <button className="action-btn" title="Notifications">
              <Bell className="action-icon" />
              <span className="notification-badge">3</span>
            </button>
            
            <button className="action-btn" title="User Profile">
              <User className="action-icon" />
            </button>
            
            <button className="btn-primary">Get Started</button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="menu-icon" /> : <Menu className="menu-icon" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-header">
          <div className="mobile-logo">
            <Plane className="logo-icon" />
            <span className="logo-text">TripMaster</span>
          </div>
          <button
            className="mobile-menu-close"
            onClick={() => setIsMenuOpen(false)}
          >
            <X className="close-icon" />
          </button>
        </div>
        
        <nav className="mobile-nav">
          <ul className="mobile-nav-list">
            {navigationItems.map((item, index) => (
              <li key={index} className="mobile-nav-item">
                <a href={item.href} className="mobile-nav-link">
                  <item.icon className="mobile-nav-icon" />
                  <span>{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="mobile-menu-footer">
          <button className="btn-primary btn-full">Get Started</button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="mobile-menu-overlay"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
};

export default PremiumHeader;
