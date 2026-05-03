import { useState } from 'react';
import { Search, MapPin, DollarSign, Users, Heart, Mountain, Calendar, Sparkles, TrendingUp, Star } from 'lucide-react';
import './BasicHero.css';

const BasicHero = ({ onSearch, onCategorySelect }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const tripCategories = [
    {
      id: 'budget',
      name: 'Budget Friendly Trips',
      icon: DollarSign,
      color: '#22c55e',
      description: 'Affordable adventures across India',
      destinations: ['Goa', 'Rishikesh', 'Munnar', 'Pushkar']
    },
    {
      id: 'luxury',
      name: 'Luxury Trips',
      icon: Sparkles,
      color: '#8b5cf6',
      description: 'Premium travel experiences',
      destinations: ['Udaipur', 'Jaipur', 'Goa', 'Kerala']
    },
    {
      id: 'family',
      name: 'Family Trips',
      icon: Users,
      color: '#3b82f6',
      description: 'Perfect for the whole family',
      destinations: ['Ooty', 'Shimla', 'Mysore', 'Darjeeling']
    },
    {
      id: 'couple',
      name: 'Couple Trips',
      icon: Heart,
      color: '#ef4444',
      description: 'Romantic getaways',
      destinations: ['Kashmir', 'Andaman', 'Goa', 'Udaipur']
    },
    {
      id: 'adventure',
      name: 'Adventure Trips',
      icon: Mountain,
      color: '#f97316',
      description: 'Thrilling experiences',
      destinations: ['Ladakh', 'Rishikesh', 'Manali', 'Coorg']
    },
    {
      id: 'weekend',
      name: 'Weekend Trips',
      icon: Calendar,
      color: '#06b6d4',
      description: 'Quick weekend escapes',
      destinations: ['Lonavala', 'Mysore', 'Pondicherry', 'Hampi']
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() && onSearch) {
      onSearch({ query: searchQuery, type: 'search' });
    }
  };

  const handleCategoryClick = (category) => {
    if (onCategorySelect) {
      onCategorySelect(category);
    }
  };

  return (
    <div className="basic-hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            <span className="title-highlight">Discover</span> Incredible India
          </h1>
          <p className="hero-subtitle">
            Search any place in India and plan your perfect trip with smart recommendations
          </p>
        </div>

        {/* Search Bar */}
        <div className="search-container">
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-wrapper">
              <Search className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="Search any place in India..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button type="submit" className="search-button">
              <Search className="btn-icon" />
              Search
            </button>
          </form>
        </div>

        {/* Trip Categories */}
        <div className="trip-categories">
          <h2 className="categories-title">
            <TrendingUp className="title-icon" />
            Explore Trip Categories
          </h2>
          <div className="categories-grid">
            {tripCategories.map((category) => (
              <div
                key={category.id}
                className="category-card"
                onClick={() => handleCategoryClick(category)}
                style={{ '--category-color': category.color }}
              >
                <div className="category-icon-wrapper">
                  <category.icon className="category-icon" />
                </div>
                <h3 className="category-name">{category.name}</h3>
                <p className="category-description">{category.description}</p>
                <div className="category-destinations">
                  {category.destinations.map((dest, index) => (
                    <span key={index} className="destination-tag">{dest}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicHero;
