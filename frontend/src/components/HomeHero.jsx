import React, { useState } from 'react';
import { Search, MapPin, Wallet, Navigation, Star, Clock, TrendingUp, Users, Hotel, Utensils, Camera, Sparkles, ArrowRight, Location, Route, Calendar, Heart, Share2, Bookmark } from 'lucide-react';
import './HomeHero.css';

const HomeHero = ({ onBudgetTripClick, onLocalTripClick }) => {
  const [activeCard, setActiveCard] = useState(null);

  const handleCardHover = (cardName) => {
    setActiveCard(cardName);
  };

  const handleCardLeave = () => {
    setActiveCard(null);
  };

  return (
    <div className="home-hero">
      <div className="hero-background">
        <div className="hero-overlay"></div>
      </div>
      
      <div className="hero-content">
        <div className="hero-header">
          <h1 className="hero-title">
            <span className="title-highlight">Discover</span> Your Perfect Journey
          </h1>
          <p className="hero-subtitle">
            Choose between Budget-Friendly Adventures or Local Hidden Gems
          </p>
        </div>

        <div className="hero-cards">
          {/* Budget Trip Card */}
          <div 
            className={`hero-card budget-card ${activeCard === 'budget' ? 'active' : ''}`}
            onMouseEnter={() => handleCardHover('budget')}
            onMouseLeave={handleCardLeave}
            onClick={onBudgetTripClick}
          >
            <div className="card-glow"></div>
            <div className="card-content">
              <div className="card-icon-wrapper">
                <div className="card-icon">
                  <Wallet size={48} />
                </div>
                <div className="icon-sparkles">
                  <Sparkles size={16} className="sparkle-1" />
                  <Sparkles size={12} className="sparkle-2" />
                  <Sparkles size={14} className="sparkle-3" />
                </div>
              </div>
              
              <h3 className="card-title">Budget Trip</h3>
              <p className="card-description">
                Smart travel without breaking the bank. Find the cheapest ways to explore India.
              </p>
              
              <div className="card-features">
                <div className="feature-item">
                  <TrendingUp size={16} />
                  <span>Cheapest Routes</span>
                </div>
                <div className="feature-item">
                  <Route size={16} />
                  <span>Smart Transport</span>
                </div>
                <div className="feature-item">
                  <Hotel size={16} />
                  <span>Budget Stays</span>
                </div>
                <div className="feature-item">
                  <Utensils size={16} />
                  <span>Local Food</span>
                </div>
              </div>
              
              <div className="card-stats">
                <div className="stat">
                  <span className="stat-number">50%</span>
                  <span className="stat-label">Savings</span>
                </div>
                <div className="stat">
                  <span className="stat-number">100+</span>
                  <span className="stat-label">Cities</span>
                </div>
                <div className="stat">
                  <span className="stat-number">24/7</span>
                  <span className="stat-label">Support</span>
                </div>
              </div>
              
              <button className="card-button">
                <span>Start Budget Trip</span>
                <ArrowRight size={20} />
              </button>
            </div>
          </div>

          {/* Local Trip Card */}
          <div 
            className={`hero-card local-card ${activeCard === 'local' ? 'active' : ''}`}
            onMouseEnter={() => handleCardHover('local')}
            onMouseLeave={handleCardLeave}
            onClick={onLocalTripClick}
          >
            <div className="card-glow"></div>
            <div className="card-content">
              <div className="card-icon-wrapper">
                <div className="card-icon">
                  <Location size={48} />
                </div>
                <div className="icon-sparkles">
                  <Sparkles size={16} className="sparkle-1" />
                  <Sparkles size={12} className="sparkle-2" />
                  <Sparkles size={14} className="sparkle-3" />
                </div>
              </div>
              
              <h3 className="card-title">Local Trip</h3>
              <p className="card-description">
                Discover hidden gems near you. Explore local attractions within your reach.
              </p>
              
              <div className="card-features">
                <div className="feature-item">
                  <MapPin size={16} />
                  <span>Nearby Places</span>
                </div>
                <div className="feature-item">
                  <Camera size={16} />
                  <span>Hidden Gems</span>
                </div>
                <div className="feature-item">
                  <Navigation size={16} />
                  <span>Quick Routes</span>
                </div>
                <div className="feature-item">
                  <Clock size={16} />
                  <span>Day Trips</span>
                </div>
              </div>
              
              <div className="card-stats">
                <div className="stat">
                  <span className="stat-number">10km</span>
                  <span className="stat-label">Radius</span>
                </div>
                <div className="stat">
                  <span className="stat-number">500+</span>
                  <span className="stat-label">Places</span>
                </div>
                <div className="stat">
                  <span className="stat-number">Real</span>
                  <span className="stat-label">Time</span>
                </div>
              </div>
              
              <button className="card-button">
                <span>Explore Locally</span>
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="hero-quick-actions">
          <div className="quick-search">
            <Search size={20} className="search-icon" />
            <input 
              type="text" 
              placeholder="Quick search: Munnar, Goa, Ooty..." 
              className="quick-search-input"
            />
          </div>
          
          <div className="quick-links">
            <button className="quick-link">
              <Heart size={16} />
              <span>Favorites</span>
            </button>
            <button className="quick-link">
              <Bookmark size={16} />
              <span>Saved</span>
            </button>
            <button className="quick-link">
              <Share2 size={16} />
              <span>Share</span>
            </button>
          </div>
        </div>

        <div className="hero-footer">
          <div className="trust-badges">
            <div className="badge">
              <Users size={16} />
              <span>50K+ Happy Travelers</span>
            </div>
            <div className="badge">
              <Star size={16} />
              <span>4.8/5 Rating</span>
            </div>
            <div className="badge">
              <Calendar size={16} />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHero;
