import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Search, 
  User, 
  Heart, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Compass, 
  Home, 
  Moon, 
  Sun,
  LogOut,
  Settings,
  Bell
} from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import PremiumButton from '../ui/PremiumButton';
import './PremiumHeader.css';

const PremiumHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.body.classList.add('dark-mode');
    }
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setUserDropdown(false);
    setShowSearch(false);
  }, [location]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setShowSearch(false);
    }
  };

  const navigationItems = [
    { id: 'home', name: 'Home', icon: Home, path: '/' },
    { id: 'explore', name: 'Explore', icon: Compass, path: '/destinations' },
    { id: 'planner', name: 'Trip Planner', icon: Calendar, path: '/planner' },
    { id: 'budget', name: 'Budget Trips', icon: DollarSign, path: '/budget' },
    { id: 'history', name: 'History', icon: MapPin, path: '/history' }
  ];

  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
    setUserDropdown(false);
  };

  const isActivePath = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header className={`premium-header ${isScrolled ? 'premium-header--scrolled' : ''}`}>
        <div className="premium-header__container">
          {/* Logo */}
          <div className="premium-header__logo">
            <button onClick={() => navigate('/')} className="premium-header__logo-btn">
              <Compass className="premium-header__logo-icon" />
              <span className="premium-header__logo-text">TripMaster</span>
              <span className="premium-header__logo-pro">Pro</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="premium-header__nav">
            <ul className="premium-header__nav-list">
              {navigationItems.map(item => (
                <li key={item.id} className="premium-header__nav-item">
                  <button
                    onClick={() => navigate(item.path)}
                    className={`premium-header__nav-link ${isActivePath(item.path) ? 'active' : ''}`}
                  >
                    <item.icon className="premium-header__nav-icon" />
                    <span>{item.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right Actions */}
          <div className="premium-header__actions">
            {/* Search Button */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="premium-header__action-btn premium-header__search-btn"
            >
              <Search />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="premium-header__action-btn premium-header__theme-btn"
            >
              {isDarkMode ? <Sun /> : <Moon />}
            </button>

            {/* User Actions */}
            {user ? (
              <div className="premium-header__user">
                <button
                  onClick={() => setUserDropdown(!userDropdown)}
                  className="premium-header__user-btn"
                >
                  <User />
                  <span className="premium-header__user-name">{user.name}</span>
                </button>
                
                {userDropdown && (
                  <GlassCard className="premium-header__user-dropdown">
                    <button
                      onClick={() => navigate('/dashboard')}
                      className="premium-header__dropdown-item"
                    >
                      <Settings />
                      Dashboard
                    </button>
                    <button
                      onClick={() => navigate('/favorites')}
                      className="premium-header__dropdown-item"
                    >
                      <Heart />
                      Favorites
                    </button>
                    <button
                      onClick={() => navigate('/settings')}
                      className="premium-header__dropdown-item"
                    >
                      <Settings />
                      Settings
                    </button>
                    <hr className="premium-header__dropdown-divider" />
                    <button
                      onClick={handleLogout}
                      className="premium-header__dropdown-item premium-header__dropdown-item--danger"
                    >
                      <LogOut />
                      Logout
                    </button>
                  </GlassCard>
                )}
              </div>
            ) : (
              <div className="premium-header__auth">
                <PremiumButton
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/login')}
                >
                  Login
                </PremiumButton>
                <PremiumButton
                  variant="primary"
                  size="sm"
                  onClick={() => navigate('/register')}
                >
                  Sign Up
                </PremiumButton>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="premium-header__mobile-toggle"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Search Bar (Expanded) */}
        {showSearch && (
          <div className="premium-header__search-expanded">
            <form onSubmit={handleSearch} className="premium-header__search-form">
              <div className="premium-header__search-input-group">
                <Search className="premium-header__search-icon" />
                <input
                  type="text"
                  placeholder="Search destinations, activities, hotels..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="premium-header__search-input"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowSearch(false)}
                  className="premium-header__search-close"
                >
                  <X />
                </button>
              </div>
            </form>
          </div>
        )}
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="premium-header__mobile-menu">
          <GlassCard className="premium-header__mobile-menu-content">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="premium-header__mobile-search">
              <div className="premium-header__mobile-search-input-group">
                <Search className="premium-header__mobile-search-icon" />
                <input
                  type="text"
                  placeholder="Search destinations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="premium-header__mobile-search-input"
                />
              </div>
            </form>

            {/* Mobile Navigation */}
            <nav className="premium-header__mobile-nav">
              <ul className="premium-header__mobile-nav-list">
                {navigationItems.map(item => (
                  <li key={item.id} className="premium-header__mobile-nav-item">
                    <button
                      onClick={() => {
                        navigate(item.path);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`premium-header__mobile-nav-link ${isActivePath(item.path) ? 'active' : ''}`}
                    >
                      <item.icon className="premium-header__mobile-nav-icon" />
                      <span>{item.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Mobile User Actions */}
            <div className="premium-header__mobile-actions">
              <button
                onClick={toggleDarkMode}
                className="premium-header__mobile-action-btn"
              >
                {isDarkMode ? <Sun /> : <Moon />}
                <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
              </button>

              {user ? (
                <>
                  <button
                    onClick={() => {
                      navigate('/dashboard');
                      setIsMobileMenuOpen(false);
                    }}
                    className="premium-header__mobile-action-btn"
                  >
                    <User />
                    <span>Dashboard</span>
                  </button>
                  <button
                    onClick={() => {
                      navigate('/favorites');
                      setIsMobileMenuOpen(false);
                    }}
                    className="premium-header__mobile-action-btn"
                  >
                    <Heart />
                    <span>Favorites</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="premium-header__mobile-action-btn premium-header__mobile-action-btn--danger"
                  >
                    <LogOut />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <PremiumButton
                    variant="ghost"
                    size="sm"
                    fullWidth
                    onClick={() => {
                      navigate('/login');
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Login
                  </PremiumButton>
                  <PremiumButton
                    variant="primary"
                    size="sm"
                    fullWidth
                    onClick={() => {
                      navigate('/register');
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Sign Up
                  </PremiumButton>
                </>
              )}
            </div>
          </GlassCard>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="premium-header__mobile-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default PremiumHeader;
