import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Users, 
  Star, 
  TrendingUp, 
  Heart, 
  Clock, 
  DollarSign, 
  Plane, 
  Train, 
  Bus, 
  Car, 
  Hotel, 
  Utensils, 
  Camera, 
  Compass,
  ArrowRight,
  Sparkles,
  Shield,
  Award,
  Zap
} from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import PremiumButton from '../components/ui/PremiumButton';
import '../styles/GlobalStyles.css';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');

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
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const categories = [
    { id: 'all', name: 'All Places', icon: Compass },
    { id: 'beaches', name: 'Beaches', icon: Plane },
    { id: 'mountains', name: 'Mountains', icon: MapPin },
    { id: 'heritage', name: 'Heritage', icon: Award },
    { id: 'adventure', name: 'Adventure', icon: Zap },
    { id: 'spiritual', name: 'Spiritual', icon: Sparkles }
  ];

  const popularDestinations = [
    {
      id: 1,
      name: 'Goa',
      description: 'Sun-kissed beaches and vibrant nightlife',
      image: 'https://images.unsplash.com/photo-1512343879798-01e0e4352a18?w=800',
      rating: 4.8,
      price: '₹3,499',
      category: 'beaches',
      trending: true,
      highlights: ['Baga Beach', 'Old Goa', 'Night Markets']
    },
    {
      id: 2,
      name: 'Munnar',
      description: 'Tea gardens and misty mountains',
      image: 'https://images.unsplash.com/photo-1605548197710-b7f7202237c5?w=800',
      rating: 4.9,
      price: '₹4,999',
      category: 'mountains',
      trending: true,
      highlights: ['Tea Plantations', 'Eravikulam Park', 'Mattupetty Dam']
    },
    {
      id: 3,
      name: 'Jaipur',
      description: 'Pink city of royal heritage',
      image: 'https://images.unsplash.com/photo-1524492412937-b784b5b9c7c9?w=800',
      rating: 4.7,
      price: '₹2,999',
      category: 'heritage',
      trending: false,
      highlights: ['City Palace', 'Amber Fort', 'Hawa Mahal']
    },
    {
      id: 4,
      name: 'Rishikesh',
      description: 'Yoga capital and adventure hub',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800',
      rating: 4.8,
      price: '₹2,499',
      category: 'adventure',
      trending: true,
      highlights: ['Ganga Aarti', 'River Rafting', 'Yoga Centers']
    },
    {
      id: 5,
      name: 'Varanasi',
      description: 'Spiritual heart of India',
      image: 'https://images.unsplash.com/photo-1524492412937-b784b5b9c7c9?w=800',
      rating: 4.9,
      price: '₹1,999',
      category: 'spiritual',
      trending: false,
      highlights: ['Ghats', 'Kashi Vishwanath', 'Ganga Aarti']
    },
    {
      id: 6,
      name: 'Kerala Backwaters',
      description: 'Serene houseboat experiences',
      image: 'https://images.unsplash.com/photo-1559827268-dc88b52df2a8?w=800',
      rating: 4.9,
      price: '₹5,999',
      category: 'beaches',
      trending: true,
      highlights: ['Alleppey', 'Houseboats', 'Kumarakom']
    }
  ];

  const budgetTrips = [
    {
      id: 1,
      title: 'Goa Backpack Trip',
      duration: '3 Days',
      price: '₹3,000',
      originalPrice: '₹5,000',
      image: 'https://images.unsplash.com/photo-1512343879798-01e0e4352a18?w=400',
      includes: ['Stay', 'Food', 'Transport']
    },
    {
      id: 2,
      title: 'Munnar Weekend',
      duration: '2 Days',
      price: '₹4,000',
      originalPrice: '₹6,000',
      image: 'https://images.unsplash.com/photo-1605548197710-b7f7202237c5?w=400',
      includes: ['Stay', 'Sightseeing', 'Guide']
    },
    {
      id: 3,
      title: 'Jaipur Heritage',
      duration: '4 Days',
      price: '₹5,000',
      originalPrice: '₹8,000',
      image: 'https://images.unsplash.com/photo-1524492412937-b784b5b9c7c9?w=400',
      includes: ['Stay', 'Food', 'Transport', 'Guide']
    },
    {
      id: 4,
      title: 'Rishikesh Adventure',
      duration: '3 Days',
      price: '₹2,500',
      originalPrice: '₹4,000',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400',
      includes: ['Stay', 'Activities', 'Meals']
    }
  ];

  const tripTypes = [
    { id: 'budget', name: 'Budget Trips', icon: DollarSign, description: 'Affordable adventures' },
    { id: 'premium', name: 'Premium', icon: Star, description: 'Luxury experiences' },
    { id: 'family', name: 'Family', icon: Users, description: 'Kid-friendly destinations' },
    { id: 'couple', name: 'Couple', icon: Heart, description: 'Romantic getaways' },
    { id: 'solo', name: 'Solo Travel', icon: Compass, description: 'Explore alone' },
    { id: 'group', name: 'Group Tours', icon: Users, description: 'Travel with friends' }
  ];

  const features = [
    {
      icon: Shield,
      title: 'Safe & Secure',
      description: 'Verified destinations and secure bookings'
    },
    {
      icon: Zap,
      title: 'Instant Booking',
      description: 'Quick and hassle-free reservation process'
    },
    {
      icon: Award,
      title: 'Best Prices',
      description: 'Competitive rates with price match guarantee'
    },
    {
      icon: Users,
      title: '24/7 Support',
      description: 'Round-the-clock customer assistance'
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Priya Sharma',
      trip: 'Goa Beach Trip',
      rating: 5,
      comment: 'Amazing experience! The booking process was smooth and the destination was exactly as described.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612c6c7?w=100'
    },
    {
      id: 2,
      name: 'Rahul Verma',
      trip: 'Munnar Getaway',
      rating: 5,
      comment: 'Perfect weekend getaway. The team helped us customize our trip and everything was well organized.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'
    },
    {
      id: 3,
      name: 'Anjali Patel',
      trip: 'Jaipur Heritage',
      rating: 4,
      comment: 'Great value for money! The heritage tour was informative and the guide was excellent.',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100'
    }
  ];

  const filteredDestinations = activeCategory === 'all' 
    ? popularDestinations 
    : popularDestinations.filter(dest => dest.category === activeCategory);

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero__background">
          <div className="hero__overlay"></div>
          <div className="hero__video-container">
            <img 
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920" 
              alt="India Travel Background"
              className="hero__background-image"
            />
          </div>
        </div>
        
        <div className="hero__content">
          <div className="container">
            <div className="hero__text">
              <h1 className="hero__title fade-in">
                Explore India <span className="hero__title-highlight">Smarter</span>
              </h1>
              <p className="hero__subtitle slide-in-up">
                Discover incredible destinations, plan perfect trips, and create unforgettable memories across the diverse landscape of India
              </p>
              
              {/* Search Bar */}
              <form onSubmit={handleSearch} className="hero__search slide-in-up">
                <div className="hero__search-container">
                  <div className="hero__search-input-group">
                    <Search className="hero__search-icon" />
                    <input
                      type="text"
                      placeholder="Search any place in India..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="hero__search-input"
                    />
                  </div>
                  <PremiumButton 
                    type="submit" 
                    variant="primary" 
                    size="lg"
                    className="hero__search-button"
                  >
                    Search Places
                  </PremiumButton>
                </div>
              </form>
              
              {/* Quick Actions */}
              <div className="hero__actions slide-in-up">
                <PremiumButton 
                  variant="primary" 
                  size="lg"
                  onClick={() => navigate('/planner')}
                  className="hero__action-btn"
                >
                  <Calendar />
                  Plan Trip
                </PremiumButton>
                <PremiumButton 
                  variant="secondary" 
                  size="lg"
                  onClick={() => navigate('/destinations')}
                  className="hero__action-btn"
                >
                  <Compass />
                  Explore
                </PremiumButton>
                <PremiumButton 
                  variant="outline" 
                  size="lg"
                  onClick={() => navigate('/budget')}
                  className="hero__action-btn"
                >
                  <DollarSign />
                  Budget Trips
                </PremiumButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="destinations">
        <div className="container">
          <div className="section__header">
            <h2 className="section__title">Popular Destinations</h2>
            <p className="section__subtitle">Explore India's most beloved places</p>
          </div>

          {/* Category Filters */}
          <div className="destinations__categories">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`destinations__category ${activeCategory === category.id ? 'active' : ''}`}
              >
                <category.icon className="destinations__category-icon" />
                <span>{category.name}</span>
              </button>
            ))}
          </div>

          {/* Destination Cards */}
          <div className="destinations__grid">
            {filteredDestinations.map((destination, index) => (
              <GlassCard 
                key={destination.id} 
                className="destinations__card fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="destinations__card-image">
                  <img src={destination.image} alt={destination.name} />
                  {destination.trending && (
                    <div className="destinations__trending-badge">
                      <TrendingUp className="destinations__trending-icon" />
                      <span>Trending</span>
                    </div>
                  )}
                  <div className="destinations__card-overlay">
                    <PremiumButton 
                      variant="primary" 
                      size="sm"
                      onClick={() => navigate(`/destination/${destination.id}`)}
                    >
                      Explore
                    </PremiumButton>
                  </div>
                </div>
                <div className="destinations__card-content">
                  <div className="destinations__card-header">
                    <h3 className="destinations__card-title">{destination.name}</h3>
                    <div className="destinations__card-rating">
                      <Star className="destinations__rating-star" />
                      <span>{destination.rating}</span>
                    </div>
                  </div>
                  <p className="destinations__card-description">{destination.description}</p>
                  <div className="destinations__card-highlights">
                    {destination.highlights.map((highlight, idx) => (
                      <span key={idx} className="destinations__highlight">{highlight}</span>
                    ))}
                  </div>
                  <div className="destinations__card-footer">
                    <div className="destinations__card-price">
                      <span className="destinations__price-amount">{destination.price}</span>
                      <span className="destinations__price-label">per person</span>
                    </div>
                    <button className="destinations__wishlist-btn">
                      <Heart />
                    </button>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Budget Trips Section */}
      <section className="budget-trips">
        <div className="container">
          <div className="section__header">
            <h2 className="section__title">Best Budget Trips</h2>
            <p className="section__subtitle">Incredible experiences that won't break the bank</p>
          </div>

          <div className="budget-trips__grid">
            {budgetTrips.map((trip, index) => (
              <GlassCard 
                key={trip.id} 
                className="budget-trips__card slide-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="budget-trips__card-image">
                  <img src={trip.image} alt={trip.title} />
                  <div className="budget-trips__discount-badge">
                    <span>Save {Math.round((1 - parseInt(trip.price.replace('₹', '')) / parseInt(trip.originalPrice.replace('₹', ''))) * 100)}%</span>
                  </div>
                </div>
                <div className="budget-trips__card-content">
                  <h3 className="budget-trips__card-title">{trip.title}</h3>
                  <div className="budget-trips__card-meta">
                    <span className="budget-trips__duration">
                      <Clock />
                      {trip.duration}
                    </span>
                    <div className="budget-trips__price">
                      <span className="budget-trips__current-price">{trip.price}</span>
                      <span className="budget-trips__original-price">{trip.originalPrice}</span>
                    </div>
                  </div>
                  <div className="budget-trips__includes">
                    <span className="budget-trips__includes-label">Includes:</span>
                    <div className="budget-trips__includes-list">
                      {trip.includes.map((item, idx) => (
                        <span key={idx} className="budget-trips__include-item">{item}</span>
                      ))}
                    </div>
                  </div>
                  <PremiumButton 
                    variant="primary" 
                    size="sm"
                    fullWidth
                    onClick={() => navigate(`/trip/${trip.id}`)}
                  >
                    Book Now
                  </PremiumButton>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Trip Types */}
      <section className="trip-types">
        <div className="container">
          <div className="section__header">
            <h2 className="section__title">Choose Your Adventure</h2>
            <p className="section__subtitle">Perfect trips for every type of traveler</p>
          </div>

          <div className="trip-types__grid">
            {tripTypes.map((type, index) => (
              <GlassCard 
                key={type.id} 
                className="trip-types__card scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => navigate(`/trips/${type.id}`)}
              >
                <div className="trip-types__card-icon">
                  <type.icon />
                </div>
                <h3 className="trip-types__card-title">{type.name}</h3>
                <p className="trip-types__card-description">{type.description}</p>
                <div className="trip-types__card-arrow">
                  <ArrowRight />
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div className="container">
          <div className="features__grid">
            {features.map((feature, index) => (
              <div key={index} className="features__item slide-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="features__icon">
                  <feature.icon />
                </div>
                <h3 className="features__title">{feature.title}</h3>
                <p className="features__description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="container">
          <div className="section__header">
            <h2 className="section__title">What Travelers Say</h2>
            <p className="section__subtitle">Real experiences from real travelers</p>
          </div>

          <div className="testimonials__grid">
            {testimonials.map((testimonial, index) => (
              <GlassCard 
                key={testimonial.id} 
                className="testimonials__card fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="testimonials__card-header">
                  <img src={testimonial.avatar} alt={testimonial.name} className="testimonials__avatar" />
                  <div className="testimonials__author">
                    <h4 className="testimonials__name">{testimonial.name}</h4>
                    <p className="testimonials__trip">{testimonial.trip}</p>
                  </div>
                  <div className="testimonials__rating">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="testimonials__rating-star" />
                    ))}
                  </div>
                </div>
                <p className="testimonials__comment">"{testimonial.comment}"</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <GlassCard className="cta__card">
            <div className="cta__content">
              <h2 className="cta__title">Ready to Start Your Journey?</h2>
              <p className="cta__subtitle">
                Join thousands of happy travelers and discover the magic of India with our expertly curated experiences
              </p>
              <div className="cta__actions">
                <PremiumButton 
                  variant="primary" 
                  size="lg"
                  onClick={() => navigate('/planner')}
                >
                  <Sparkles />
                  Plan Your Trip
                </PremiumButton>
                <PremiumButton 
                  variant="secondary" 
                  size="lg"
                  onClick={() => navigate('/destinations')}
                >
                  <Compass />
                  Browse Destinations
                </PremiumButton>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
