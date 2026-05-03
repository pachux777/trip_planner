import { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Globe, 
  Calendar, 
  Users, 
  DollarSign, 
  Plane, 
  Hotel, 
  Car, 
  Train, 
  Star, 
  TrendingUp, 
  Award, 
  Clock, 
  ChevronRight, 
  ArrowRight, 
  Heart, 
  Share2, 
  Filter, 
  Menu, 
  X, 
  Home,
  Compass,
  Map,
  Settings,
  Bell,
  User,
  Sparkles,
  Zap,
  Shield,
  Target,
  Navigation,
  Camera,
  Mountain,
  Trees,
  Sun,
  Cloud
} from 'lucide-react';
import './ProfessionalHome.css';

const ProfessionalHome = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [featuredDestinations, setFeaturedDestinations] = useState([]);
  const [stats, setStats] = useState({
    totalTrips: 15420,
    happyTravelers: 89756,
    destinations: 342,
    yearsOfService: 12
  });

  const categories = [
    { id: 'all', name: 'All Destinations', icon: Globe, color: '#667eea', description: 'Explore every corner of India' },
    { id: 'adventure', name: 'Adventure', icon: Mountain, color: '#f97316', description: 'Thrilling experiences await' },
    { id: 'beach', name: 'Beach', icon: Sun, color: '#06b6d4', description: 'Relax by the ocean' },
    { id: 'heritage', name: 'Heritage', icon: Award, color: '#8b5cf6', description: 'Discover rich history' },
    { id: 'nature', name: 'Nature', icon: Trees, color: '#22c55e', description: 'Connect with nature' },
    { id: 'spiritual', name: 'Spiritual', icon: Sparkles, color: '#ec4899', description: 'Find inner peace' }
  ];

  const destinations = [
    { 
      id: 1, 
      name: 'Munnar', 
      state: 'Kerala', 
      image: 'https://images.unsplash.com/photo-1548199973-75cce1b4ea31?w=400', 
      rating: 4.8, 
      price: '₹3,500',
      duration: '3 Days',
      category: 'nature',
      description: 'Tea gardens and misty mountains'
    },
    { 
      id: 2, 
      name: 'Goa', 
      state: 'Goa', 
      image: 'https://images.unsplash.com/photo-1512343879798-01e0e4352a18?w=400', 
      rating: 4.9, 
      price: '₹4,500',
      duration: '4 Days',
      category: 'beach',
      description: 'Beaches, nightlife, and Portuguese heritage'
    },
    { 
      id: 3, 
      name: 'Jaipur', 
      state: 'Rajasthan', 
      image: 'https://images.unsplash.com/photo-1524492412937-b784b5b9c7c9?w=400', 
      rating: 4.7, 
      price: '₹4,000',
      duration: '3 Days',
      category: 'heritage',
      description: 'Pink City and royal palaces'
    },
    { 
      id: 4, 
      name: 'Manali', 
      state: 'Himachal Pradesh', 
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400', 
      rating: 4.9, 
      price: '₹5,500',
      duration: '4 Days',
      category: 'adventure',
      description: 'Adventure sports and snow-capped peaks'
    },
    { 
      id: 5, 
      name: 'Varanasi', 
      state: 'Uttar Pradesh', 
      image: 'https://images.unsplash.com/photo-1593696140826-c58b021acf8b?w=400', 
      rating: 4.6, 
      price: '₹3,000',
      duration: '2 Days',
      category: 'spiritual',
      description: 'Ancient city on the Ganges'
    },
    { 
      id: 6, 
      name: 'Andaman', 
      state: 'Andaman & Nicobar', 
      image: 'https://images.unsplash.com/photo-1540202404-1b627c8aeb30?w=400', 
      rating: 4.8, 
      price: '₹8,000',
      duration: '5 Days',
      category: 'beach',
      description: 'Pristine beaches and coral reefs'
    }
  ];

  const services = [
    {
      icon: Plane,
      title: 'Flight Booking',
      description: 'Best deals on domestic and international flights',
      features: ['Price comparison', 'Instant booking', '24/7 support']
    },
    {
      icon: Hotel,
      title: 'Hotel Reservations',
      description: 'Handpicked hotels and resorts across India',
      features: ['Verified properties', 'Best price guarantee', 'Free cancellation']
    },
    {
      icon: Car,
      title: 'Car Rentals',
      description: 'Self-drive and chauffeur-driven cars',
      features: ['Multiple vehicle types', 'GPS navigation', 'Insurance included']
    },
    {
      icon: Train,
      title: 'Train Tickets',
      description: 'IRCTC authorized booking platform',
      features: ['Tatkal booking', 'Seat selection', 'Real-time tracking']
    }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Marketing Manager',
      content: 'The trip planning experience was seamless. Everything was perfectly organized!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100'
    },
    {
      name: 'Rahul Verma',
      role: 'Software Engineer',
      content: 'Best travel platform I\'ve used. The recommendations are spot on!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'
    },
    {
      name: 'Anita Patel',
      role: 'Teacher',
      content: 'Amazing customer service and attention to detail. Highly recommended!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100'
    }
  ];

  useEffect(() => {
    // Simulate loading destinations
    setTimeout(() => {
      setFeaturedDestinations(destinations);
    }, 1000);
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const filtered = destinations.filter(dest => 
        dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.state.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
      setIsLoading(false);
    }, 1500);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    const filtered = categoryId === 'all' 
      ? destinations 
      : destinations.filter(dest => dest.category === categoryId);
    setFeaturedDestinations(filtered);
  };

  return (
    <div className="professional-home">
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <div className="header-left">
            <div className="logo">
              <Compass className="logo-icon" />
              <span className="logo-text">TripMaster Pro</span>
            </div>
          </div>

          <nav className="header-nav">
            <a href="#" className="nav-link active">Home</a>
            <a href="#" className="nav-link">Destinations</a>
            <a href="#" className="nav-link">Trip Planner</a>
            <a href="#" className="nav-link">Services</a>
            <a href="#" className="nav-link">About</a>
          </nav>

          <div className="header-right">
            <button className="icon-btn">
              <Bell className="icon" />
            </button>
            <button className="icon-btn">
              <User className="icon" />
            </button>
            <button className="btn-primary">Get Started</button>
          </div>

          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="icon" /> : <Menu className="icon" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
        <nav className="mobile-nav">
          <a href="#" className="mobile-nav-link active">Home</a>
          <a href="#" className="mobile-nav-link">Destinations</a>
          <a href="#" className="mobile-nav-link">Trip Planner</a>
          <a href="#" className="mobile-nav-link">Services</a>
          <a href="#" className="mobile-nav-link">About</a>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Discover Your Perfect Journey
              <span className="title-accent"> Across Incredible India</span>
            </h1>
            <p className="hero-subtitle">
              Plan, book, and experience unforgettable journeys with AI-powered recommendations 
              and personalized itineraries tailored just for you.
            </p>
          </div>

          {/* Search Bar */}
          <div className="search-container">
            <form onSubmit={handleSearch} className="search-form">
              <div className="search-input-group">
                <div className="search-input-wrapper">
                  <Search className="search-icon" />
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search destinations, activities, or experiences..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button type="submit" className="search-btn" disabled={isLoading}>
                  {isLoading ? (
                    <div className="spinner"></div>
                  ) : (
                    <>
                      <Search className="btn-icon" />
                      Search
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Quick Filters */}
            <div className="quick-filters">
              <div className="filter-label">Popular:</div>
              <div className="filter-tags">
                <span className="filter-tag" onClick={() => setSearchQuery('Goa')}>Goa</span>
                <span className="filter-tag" onClick={() => setSearchQuery('Kerala')}>Kerala</span>
                <span className="filter-tag" onClick={() => setSearchQuery('Rajasthan')}>Rajasthan</span>
                <span className="filter-tag" onClick={() => setSearchQuery('Himalaya')}>Himalaya</span>
                <span className="filter-tag" onClick={() => setSearchQuery('Andaman')}>Andaman</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-icon-wrapper">
              <Target className="stat-icon" />
            </div>
            <div className="stat-content">
              <h3 className="stat-number">{stats.totalTrips.toLocaleString()}+</h3>
              <p className="stat-label">Trips Planned</p>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon-wrapper">
              <Users className="stat-icon" />
            </div>
            <div className="stat-content">
              <h3 className="stat-number">{stats.happyTravelers.toLocaleString()}+</h3>
              <p className="stat-label">Happy Travelers</p>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon-wrapper">
              <MapPin className="stat-icon" />
            </div>
            <div className="stat-content">
              <h3 className="stat-number">{stats.destinations}+</h3>
              <p className="stat-label">Destinations</p>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon-wrapper">
              <Award className="stat-icon" />
            </div>
            <div className="stat-content">
              <h3 className="stat-number">{stats.yearsOfExperience}+</h3>
              <p className="stat-label">Years Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <div className="section-header">
          <h2 className="section-title">Explore by Category</h2>
          <p className="section-subtitle">Find your perfect travel experience</p>
        </div>
        <div className="categories-grid">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`category-card ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category.id)}
              style={{ '--category-color': category.color }}
            >
              <div className="category-icon-wrapper">
                <category.icon className="category-icon" />
              </div>
              <h3 className="category-title">{category.name}</h3>
              <p className="category-description">{category.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="destinations">
        <div className="section-header">
          <h2 className="section-title">Featured Destinations</h2>
          <p className="section-subtitle">Handpicked experiences for your next adventure</p>
        </div>
        <div className="destinations-grid">
          {featuredDestinations.map((destination) => (
            <div key={destination.id} className="destination-card">
              <div className="destination-image">
                <img src={destination.image} alt={destination.name} />
                <div className="destination-overlay">
                  <div className="destination-actions">
                    <button className="action-btn">
                      <Heart className="action-icon" />
                    </button>
                    <button className="action-btn">
                      <Share2 className="action-icon" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="destination-content">
                <div className="destination-header">
                  <h3 className="destination-name">{destination.name}</h3>
                  <div className="destination-rating">
                    <Star className="rating-icon" />
                    <span>{destination.rating}</span>
                  </div>
                </div>
                <p className="destination-state">{destination.state}</p>
                <p className="destination-description">{destination.description}</p>
                <div className="destination-meta">
                  <span className="meta-item">
                    <Clock className="meta-icon" />
                    {destination.duration}
                  </span>
                  <span className="meta-item">
                    <DollarSign className="meta-icon" />
                    {destination.price}
                  </span>
                </div>
                <button className="destination-btn">
                  Explore Now
                  <ArrowRight className="btn-icon" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="services">
        <div className="section-header">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">Complete travel solutions under one roof</p>
        </div>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon-wrapper">
                <service.icon className="service-icon" />
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <ul className="service-features">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="feature-item">
                    <Zap className="feature-icon" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="section-header">
          <h2 className="section-title">What Our Travelers Say</h2>
          <p className="section-subtitle">Real experiences from our valued customers</p>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-rating">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="rating-icon filled" />
                ))}
              </div>
              <p className="testimonial-content">"{testimonial.content}"</p>
              <div className="testimonial-author">
                <img src={testimonial.avatar} alt={testimonial.name} className="author-avatar" />
                <div className="author-info">
                  <h4 className="author-name">{testimonial.name}</h4>
                  <p className="author-role">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Start Your Journey?</h2>
          <p className="cta-subtitle">
            Join thousands of travelers who have discovered the magic of India with us
          </p>
          <div className="cta-buttons">
            <button className="btn-primary btn-large">
              Plan Your Trip
              <ArrowRight className="btn-icon" />
            </button>
            <button className="btn-secondary btn-large">
              Download App
              <Navigation className="btn-icon" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <Compass className="logo-icon" />
              <span className="logo-text">TripMaster Pro</span>
            </div>
            <p className="footer-description">
              Your trusted companion for discovering the incredible diversity and beauty of India.
            </p>
            <div className="social-links">
              <a href="#" className="social-link">
                <Globe className="social-icon" />
              </a>
              <a href="#" className="social-link">
                <Camera className="social-icon" />
              </a>
              <a href="#" className="social-link">
                <Share2 className="social-icon" />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Destinations</a></li>
              <li><a href="#">Trip Planner</a></li>
              <li><a href="#">Services</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Popular Destinations</h3>
            <ul className="footer-links">
              <li><a href="#">Goa</a></li>
              <li><a href="#">Kerala</a></li>
              <li><a href="#">Rajasthan</a></li>
              <li><a href="#">Himalaya</a></li>
              <li><a href="#">Andaman</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Contact Info</h3>
            <ul className="footer-links">
              <li><a href="tel:+919876543210">+91 98765 43210</a></li>
              <li><a href="mailto:info@tripmasterpro.com">info@tripmasterpro.com</a></li>
              <li><a href="#">24/7 Customer Support</a></li>
              <li><a href="#">Emergency Helpline</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 TripMaster Pro. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProfessionalHome;
