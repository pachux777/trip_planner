import { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Users, 
  DollarSign, 
  Star, 
  TrendingUp, 
  Award, 
  Heart, 
  Share2, 
  Clock, 
  Navigation, 
  Sparkles, 
  Globe, 
  Plane, 
  Hotel, 
  Car, 
  Train, 
  Mountain, 
  Trees, 
  Sun, 
  Cloud, 
  Camera, 
  ChevronRight, 
  ArrowRight, 
  Play, 
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Bookmark,
  Filter,
  Grid,
  List,
  Eye,
  Download,
  Send,
  MessageCircle,
  ThumbsUp,
  Shield,
  Zap,
  Target,
  Compass,
  Route,
  Map,
  Wind,
  Thermometer,
  Droplets,
  Gauge
} from 'lucide-react';
import './PremiumHomepage.css';

const PremiumHomepage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [savedPlaces, setSavedPlaces] = useState([]);
  const [likedPlaces, setLikedPlaces] = useState([]);

  // Hero video background
  const heroVideo = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

  // Categories
  const categories = [
    { id: 'all', name: 'All Destinations', icon: Globe, color: '#667eea' },
    { id: 'popular', name: 'Popular', icon: TrendingUp, color: '#f59e0b' },
    { id: 'budget', name: 'Budget Friendly', icon: DollarSign, color: '#10b981' },
    { id: 'weekend', name: 'Weekend', icon: Calendar, color: '#3b82f6' },
    { id: 'luxury', name: 'Luxury', icon: Sparkles, color: '#8b5cf6' },
    { id: 'family', name: 'Family', icon: Users, color: '#ef4444' },
    { id: 'honeymoon', name: 'Honeymoon', icon: Heart, color: '#ec4899' },
    { id: 'adventure', name: 'Adventure', icon: Mountain, color: '#f97316' },
    { id: 'hidden', name: 'Hidden Gems', icon: Compass, color: '#06b6d4' }
  ];

  // Featured destinations
  const featuredDestinations = [
    {
      id: 1,
      name: 'Goa Beach Paradise',
      location: 'Goa',
      image: 'https://images.unsplash.com/photo-1512343879798-01e0e4352a18?w=600',
      video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      rating: 4.9,
      reviews: 2847,
      price: 4500,
      duration: '4 Days',
      category: 'popular',
      description: 'Experience the perfect blend of sun, sand, and sea with pristine beaches and vibrant nightlife.',
      highlights: ['Beach Parties', 'Water Sports', 'Portuguese Heritage', 'Seafood'],
      weather: { temp: '28°C', condition: 'Sunny', humidity: '65%', wind: '12 km/h' },
      bestTime: 'November to March',
      includes: ['Stay', 'Breakfast', 'Airport Transfer', 'Sightseeing'],
      tags: ['Beach', 'Nightlife', 'Heritage', 'Food'],
      trending: true,
      verified: true,
      discount: 20
    },
    {
      id: 2,
      name: 'Kerala Backwaters',
      location: 'Kerala',
      image: 'https://images.unsplash.com/photo-1559827268-dc66d52bef19?w=600',
      video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      rating: 4.8,
      reviews: 1923,
      price: 6500,
      duration: '5 Days',
      category: 'luxury',
      description: 'Cruise through serene backwaters in traditional houseboats surrounded by lush green landscapes.',
      highlights: ['Houseboat Stay', 'Ayurvedic Spa', 'Kathakali Dance', 'Tea Gardens'],
      weather: { temp: '32°C', condition: 'Humid', humidity: '80%', wind: '8 km/h' },
      bestTime: 'September to March',
      includes: ['Houseboat', 'All Meals', 'Spa Treatment', 'Cultural Shows'],
      tags: ['Backwaters', 'Houseboat', 'Ayurveda', 'Culture'],
      trending: false,
      verified: true,
      discount: 15
    },
    {
      id: 3,
      name: 'Rajasthan Royal Tour',
      location: 'Rajasthan',
      image: 'https://images.unsplash.com/photo-1524492412937-b784b5b9c7c9?w=600',
      rating: 4.7,
      reviews: 1654,
      price: 7500,
      duration: '6 Days',
      category: 'heritage',
      description: 'Immerse yourself in the royal heritage of Rajasthan with magnificent palaces and desert adventures.',
      highlights: ['Palace Stay', 'Desert Safari', 'Cultural Programs', 'Rajasthani Cuisine'],
      weather: { temp: '38°C', condition: 'Hot', humidity: '25%', wind: '15 km/h' },
      bestTime: 'October to March',
      includes: ['Heritage Hotels', 'Desert Safari', 'All Meals', 'Guide'],
      tags: ['Heritage', 'Palace', 'Desert', 'Culture'],
      trending: true,
      verified: true,
      discount: 25
    },
    {
      id: 4,
      name: 'Himalayan Adventure',
      location: 'Himachal Pradesh',
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600',
      rating: 4.9,
      reviews: 2103,
      price: 8500,
      duration: '7 Days',
      category: 'adventure',
      description: 'Conquer the mighty Himalayas with thrilling adventures and breathtaking mountain views.',
      highlights: ['Mountain Trekking', 'River Rafting', 'Paragliding', 'Camping'],
      weather: { temp: '18°C', condition: 'Clear', humidity: '45%', wind: '20 km/h' },
      bestTime: 'April to June',
      includes: ['Adventure Activities', 'Camping Gear', 'Meals', 'Instructor'],
      tags: ['Adventure', 'Mountains', 'Trekking', 'Camping'],
      trending: true,
      verified: true,
      discount: 30
    },
    {
      id: 5,
      name: 'Andaman Islands',
      location: 'Andaman & Nicobar',
      image: 'https://images.unsplash.com/photo-1540202404-1b627c8aeb30?w=600',
      rating: 4.8,
      reviews: 1432,
      price: 12000,
      duration: '5 Days',
      category: 'honeymoon',
      description: 'Discover pristine beaches, coral reefs, and exotic marine life in this tropical paradise.',
      highlights: ['Scuba Diving', 'Beach Resorts', 'Island Hopping', 'Sea Walking'],
      weather: { temp: '30°C', condition: 'Tropical', humidity: '75%', wind: '10 km/h' },
      bestTime: 'November to April',
      includes: ['Resort Stay', 'Water Sports', 'Island Tours', 'Meals'],
      tags: ['Island', 'Beach', 'Diving', 'Romantic'],
      trending: false,
      verified: true,
      discount: 10
    },
    {
      id: 6,
      name: 'Varanasi Spiritual Journey',
      location: 'Uttar Pradesh',
      image: 'https://images.unsplash.com/photo-1593696140826-c58b021acf8b?w=600',
      rating: 4.6,
      reviews: 987,
      price: 3500,
      duration: '3 Days',
      category: 'spiritual',
      description: 'Experience the spiritual heart of India with ancient temples and sacred river rituals.',
      highlights: ['Ganga Aarti', 'Temple Tours', 'Boat Ride', 'Spiritual Discourses'],
      weather: { temp: '35°C', condition: 'Warm', humidity: '55%', wind: '8 km/h' },
      bestTime: 'October to March',
      includes: ['Temple Stay', 'Ganga Aarti', 'Meals', 'Guide'],
      tags: ['Spiritual', 'Temple', 'Culture', 'Ganga'],
      trending: true,
      verified: true,
      discount: 20
    }
  ];

  // Budget trips
  const budgetTrips = [
    { destination: 'Munnar', price: 3500, duration: '3 Days', savings: 'Save 40%', image: 'https://images.unsplash.com/photo-1548199973-75cce1b4ea31?w=300' },
    { destination: 'Goa', price: 4500, duration: '4 Days', savings: 'Save 35%', image: 'https://images.unsplash.com/photo-1512343879798-01e0e4352a18?w=300' },
    { destination: 'Jaipur', price: 4000, duration: '3 Days', savings: 'Save 30%', image: 'https://images.unsplash.com/photo-1524492412937-b784b5b9c7c9?w=300' },
    { destination: 'Ooty', price: 2800, duration: '2 Days', savings: 'Save 45%', image: 'https://images.unsplash.com/photo-1559827268-dc88b52df2a8?w=300' }
  ];

  // User testimonials
  const testimonials = [
    {
      id: 1,
      name: 'Priya Sharma',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
      role: 'Marketing Manager',
      content: 'TripMaster made our Kerala trip absolutely magical! The houseboat experience was beyond words.',
      rating: 5,
      destination: 'Kerala Backwaters',
      date: '2 weeks ago'
    },
    {
      id: 2,
      name: 'Rahul Verma',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      role: 'Software Engineer',
      content: 'Best travel platform I\'ve used! The AI trip planner saved us so much time and money.',
      rating: 5,
      destination: 'Rajasthan Tour',
      date: '1 month ago'
    },
    {
      id: 3,
      name: 'Anita Patel',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      role: 'Teacher',
      content: 'The budget trip to Goa was perfect! Everything was well-organized and affordable.',
      rating: 5,
      destination: 'Goa Beach',
      date: '3 weeks ago'
    }
  ];

  // Travel blogs
  const blogs = [
    {
      id: 1,
      title: 'Hidden Gems of Kerala: Beyond the Backwaters',
      excerpt: 'Discover the lesser-known treasures of God\'s Own Country that most tourists miss.',
      image: 'https://images.unsplash.com/photo-1559827268-dc66d52bef19?w=400',
      author: 'Travel Expert',
      date: '2 days ago',
      readTime: '5 min read',
      category: 'Guide'
    },
    {
      id: 2,
      title: 'Ultimate Budget Guide: Explore India Under ₹5000',
      excerpt: 'Complete guide to experiencing the best of India without breaking the bank.',
      image: 'https://images.unsplash.com/photo-1524492412937-b784b5b9c7c9?w=400',
      author: 'Budget Traveler',
      date: '1 week ago',
      readTime: '8 min read',
      category: 'Budget'
    },
    {
      id: 3,
      title: 'Honeymoon Paradise: Best Romantic Destinations',
      excerpt: 'Most romantic destinations in India for your perfect honeymoon getaway.',
      image: 'https://images.unsplash.com/photo-1540202404-1b627c8aeb30?w=400',
      author: 'Romance Expert',
      date: '3 days ago',
      readTime: '6 min read',
      category: 'Romance'
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsLoading(true);
      // Simulate search
      setTimeout(() => {
        setIsLoading(false);
        // Navigate to search results
        console.log('Searching for:', searchQuery);
      }, 1500);
    }
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleSavePlace = (placeId) => {
    setSavedPlaces(prev => 
      prev.includes(placeId) 
        ? prev.filter(id => id !== placeId)
        : [...prev, placeId]
    );
  };

  const handleLikePlace = (placeId) => {
    setLikedPlaces(prev => 
      prev.includes(placeId) 
        ? prev.filter(id => id !== placeId)
        : [...prev, placeId]
    );
  };

  const filteredDestinations = selectedCategory === 'all' 
    ? featuredDestinations 
    : featuredDestinations.filter(dest => dest.category === selectedCategory);

  return (
    <div className="premium-homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <video
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
          <div className="hero-overlay"></div>
        </div>
        
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Explore India <span className="title-accent">Smarter</span>
            </h1>
            <p className="hero-subtitle">
              Discover incredible destinations, plan perfect trips, and create unforgettable memories with AI-powered travel intelligence
            </p>
          </div>

          {/* Main Search Bar */}
          <div className="hero-search">
            <form onSubmit={handleSearch} className="hero-search-form">
              <div className="search-input-group">
                <Search className="search-icon" />
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search any place in India..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-btn" disabled={isLoading}>
                  {isLoading ? (
                    <div className="search-spinner"></div>
                  ) : (
                    <>
                      <Navigation className="btn-icon" />
                      Search
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Quick Actions */}
            <div className="hero-actions">
              <button className="hero-btn primary">
                <Route className="btn-icon" />
                Plan Trip
              </button>
              <button className="hero-btn secondary">
                <MapPin className="btn-icon" />
                Explore Destinations
              </button>
              <button className="hero-btn tertiary">
                <DollarSign className="btn-icon" />
                Budget Trips
              </button>
            </div>
          </div>

          {/* Video Controls */}
          <div className="video-controls">
            <button
              className="video-btn"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause className="btn-icon" /> : <Play className="btn-icon" />}
            </button>
            <button
              className="video-btn"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? <VolumeX className="btn-icon" /> : <Volume2 className="btn-icon" />}
            </button>
            <button className="video-btn">
              <Maximize2 className="btn-icon" />
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <div className="scroll-text">Scroll to explore</div>
          <div className="scroll-arrow">
            <ChevronRight className="arrow-icon" />
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="destinations-section">
        <div className="section-header">
          <div className="section-title-group">
            <h2 className="section-title">Popular Destinations</h2>
            <p className="section-subtitle">Handpicked experiences that travelers love</p>
          </div>
          <div className="section-actions">
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
            <button className="filter-btn">
              <Filter className="btn-icon" />
              Filters
            </button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="category-filter">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => handleCategorySelect(category.id)}
              style={{ '--category-color': category.color }}
            >
              <category.icon className="category-icon" />
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Destinations Grid */}
        <div className={`destinations-grid ${viewMode}`}>
          {filteredDestinations.map((destination) => (
            <div key={destination.id} className="destination-card">
              <div className="destination-media">
                <img src={destination.image} alt={destination.name} className="destination-image" />
                <div className="destination-overlay">
                  <div className="destination-actions">
                    <button
                      className="action-btn"
                      onClick={() => handleSavePlace(destination.id)}
                    >
                      <Bookmark className={`action-icon ${savedPlaces.includes(destination.id) ? 'saved' : ''}`} />
                    </button>
                    <button
                      className="action-btn"
                      onClick={() => handleLikePlace(destination.id)}
                    >
                      <Heart className={`action-icon ${likedPlaces.includes(destination.id) ? 'liked' : ''}`} />
                    </button>
                    <button className="action-btn">
                      <Share2 className="action-icon" />
                    </button>
                  </div>
                  {destination.trending && (
                    <div className="trending-badge">
                      <TrendingUp className="badge-icon" />
                      Trending
                    </div>
                  )}
                  {destination.verified && (
                    <div className="verified-badge">
                      <Shield className="badge-icon" />
                      Verified
                    </div>
                  )}
                  {destination.discount && (
                    <div className="discount-badge">
                      {destination.discount}% OFF
                    </div>
                  )}
                </div>
              </div>

              <div className="destination-content">
                <div className="destination-header">
                  <div>
                    <h3 className="destination-name">{destination.name}</h3>
                    <div className="destination-location">
                      <MapPin className="location-icon" />
                      <span>{destination.location}</span>
                    </div>
                  </div>
                  <div className="destination-rating">
                    <Star className="rating-icon" />
                    <span>{destination.rating}</span>
                    <span className="reviews">({destination.reviews})</span>
                  </div>
                </div>

                <p className="destination-description">{destination.description}</p>

                <div className="destination-highlights">
                  {destination.highlights.slice(0, 3).map((highlight, index) => (
                    <span key={index} className="highlight-tag">{highlight}</span>
                  ))}
                </div>

                <div className="destination-weather">
                  <div className="weather-item">
                    <Thermometer className="weather-icon" />
                    <span>{destination.weather.temp}</span>
                  </div>
                  <div className="weather-item">
                    <Cloud className="weather-icon" />
                    <span>{destination.weather.condition}</span>
                  </div>
                  <div className="weather-item">
                    <Droplets className="weather-icon" />
                    <span>{destination.weather.humidity}</span>
                  </div>
                  <div className="weather-item">
                    <Wind className="weather-icon" />
                    <span>{destination.weather.wind}</span>
                  </div>
                </div>

                <div className="destination-footer">
                  <div className="destination-meta">
                    <div className="meta-item">
                      <Calendar className="meta-icon" />
                      <span>{destination.duration}</span>
                    </div>
                    <div className="meta-item">
                      <DollarSign className="meta-icon" />
                      <span>₹{destination.price}</span>
                    </div>
                  </div>
                  <button className="explore-btn">
                    Explore
                    <ArrowRight className="btn-icon" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Budget Trips Section */}
      <section className="budget-section">
        <div className="section-header">
          <div className="section-title-group">
            <h2 className="section-title">Best Budget Trips</h2>
            <p className="section-subtitle">Incredible experiences without breaking the bank</p>
          </div>
        </div>

        <div className="budget-grid">
          {budgetTrips.map((trip, index) => (
            <div key={index} className="budget-card">
              <div className="budget-image">
                <img src={trip.image} alt={trip.destination} />
                <div className="budget-overlay">
                  <div className="savings-badge">{trip.savings}</div>
                </div>
              </div>
              <div className="budget-content">
                <h3 className="budget-destination">{trip.destination}</h3>
                <div className="budget-meta">
                  <span className="budget-price">₹{trip.price}</span>
                  <span className="budget-duration">{trip.duration}</span>
                </div>
                <button className="budget-btn">
                  Book Now
                  <ArrowRight className="btn-icon" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="section-header">
          <div className="section-title-group">
            <h2 className="section-title">What Travelers Say</h2>
            <p className="section-subtitle">Real experiences from our valued customers</p>
          </div>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-header">
                <img src={testimonial.avatar} alt={testimonial.name} className="testimonial-avatar" />
                <div className="testimonial-info">
                  <h4 className="testimonial-name">{testimonial.name}</h4>
                  <p className="testimonial-role">{testimonial.role}</p>
                  <div className="testimonial-meta">
                    <span className="testimonial-destination">{testimonial.destination}</span>
                    <span className="testimonial-date">{testimonial.date}</span>
                  </div>
                </div>
              </div>
              
              <div className="testimonial-rating">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="rating-icon filled" />
                ))}
              </div>

              <p className="testimonial-content">"{testimonial.content}"</p>

              <div className="testimonial-actions">
                <button className="testimonial-action">
                  <ThumbsUp className="action-icon" />
                  Helpful
                </button>
                <button className="testimonial-action">
                  <MessageCircle className="action-icon" />
                  Reply
                </button>
                <button className="testimonial-action">
                  <Share2 className="action-icon" />
                  Share
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Travel Blogs Section */}
      <section className="blogs-section">
        <div className="section-header">
          <div className="section-title-group">
            <h2 className="section-title">Travel Stories</h2>
            <p className="section-subtitle">Inspiring tales and expert guides</p>
          </div>
          <button className="view-all-btn">
            View All
            <ArrowRight className="btn-icon" />
          </button>
        </div>

        <div className="blogs-grid">
          {blogs.map((blog) => (
            <article key={blog.id} className="blog-card">
              <div className="blog-image">
                <img src={blog.image} alt={blog.title} />
                <div className="blog-category">{blog.category}</div>
              </div>
              <div className="blog-content">
                <h3 className="blog-title">{blog.title}</h3>
                <p className="blog-excerpt">{blog.excerpt}</p>
                <div className="blog-meta">
                  <div className="blog-author">
                    <span className="author-name">{blog.author}</span>
                    <span className="blog-date">{blog.date}</span>
                  </div>
                  <div className="blog-read-time">
                    <Clock className="read-icon" />
                    <span>{blog.readTime}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <div className="cta-text">
            <h2 className="cta-title">Ready for Your Next Adventure?</h2>
            <p className="cta-subtitle">
              Join thousands of travelers who have discovered the magic of India with us
            </p>
          </div>
          <div className="cta-actions">
            <button className="cta-btn primary">
              <Plane className="btn-icon" />
              Start Planning
            </button>
            <button className="cta-btn secondary">
              <Download className="btn-icon" />
              Download App
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PremiumHomepage;
