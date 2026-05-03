import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, MapPin, Navigation, DollarSign, Calendar, 
  Star, Heart, Share2, Download, Play, 
  ArrowRight, Compass, Globe, Clock
} from 'lucide-react';
import './PremiumHero.css';

const PremiumHero = ({ onNavigate }) => {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(0);

  // Cinematic background images
  const backgrounds = [
    'https://images.unsplash.com/photo-1488646953014-85d44ab8ba8?w=1920',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920',
    'https://images.unsplash.com/photo-1519671482749-fd1f983eca6b?w=1920',
    'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1920',
    'https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?w=1920'
  ];

  // Real Indian places database
  const indianPlaces = [
    { name: 'Kochi', state: 'Kerala', type: 'city', lat: 9.9312, lng: 76.2673 },
    { name: 'Munnar', state: 'Kerala', type: 'hill_station', lat: 10.0889, lng: 77.0595 },
    { name: 'Bangalore', state: 'Karnataka', type: 'city', lat: 12.9716, lng: 77.5946 },
    { name: 'Kasaragod', state: 'Kerala', type: 'city', lat: 12.4994, lng: 74.8494 },
    { name: 'Goa', state: 'Goa', type: 'state', lat: 15.2993, lng: 74.1240 },
    { name: 'Taj Mahal', state: 'Uttar Pradesh', type: 'monument', lat: 27.1751, lng: 78.0421 },
    { name: 'Ooty', state: 'Tamil Nadu', type: 'hill_station', lat: 11.4104, lng: 76.6950 },
    { name: 'Kanyakumari', state: 'Tamil Nadu', type: 'city', lat: 8.0883, lng: 77.5495 },
    { name: 'Jaipur', state: 'Rajasthan', type: 'city', lat: 26.9124, lng: 75.7873 },
    { name: 'Mumbai', state: 'Maharashtra', type: 'city', lat: 19.0760, lng: 72.8777 },
    { name: 'Delhi', state: 'Delhi', type: 'city', lat: 28.7041, lng: 77.1025 },
    { name: 'Hyderabad', state: 'Telangana', type: 'city', lat: 17.3850, lng: 78.4867 },
    { name: 'Chennai', state: 'Tamil Nadu', type: 'city', lat: 13.0827, lng: 80.2707 },
    { name: 'Kolkata', state: 'West Bengal', type: 'city', lat: 22.5726, lng: 88.3639 },
    { name: 'Agra', state: 'Uttar Pradesh', type: 'city', lat: 27.1767, lng: 78.0081 },
    { name: 'Varanasi', state: 'Uttar Pradesh', type: 'city', lat: 25.3176, lng: 82.9739 },
    { name: 'Rishikesh', state: 'Uttarakhand', type: 'city', lat: 30.0869, lng: 78.2676 },
    { name: 'Manali', state: 'Himachal Pradesh', type: 'hill_station', lat: 32.2396, lng: 77.1887 },
    { name: 'Leh', state: 'Ladakh', type: 'city', lat: 34.1526, lng: 77.5771 },
    { name: 'Shimla', state: 'Himachal Pradesh', type: 'hill_station', lat: 31.1048, lng: 77.1734 },
    { name: 'Darjeeling', state: 'West Bengal', type: 'hill_station', lat: 27.0497, lng: 88.2636 },
    { name: 'Pondicherry', state: 'Pondicherry', type: 'city', lat: 11.9416, lng: 79.8083 },
    { name: 'Coimbatore', state: 'Tamil Nadu', type: 'city', lat: 11.0168, lng: 76.9558 },
    { name: 'Mysore', state: 'Karnataka', type: 'city', lat: 12.2958, lng: 76.6394 },
    { name: 'Trivandrum', state: 'Kerala', type: 'city', lat: 8.5241, lng: 76.9366 },
    { name: 'Vijayawada', state: 'Andhra Pradesh', type: 'city', lat: 16.5062, lng: 80.6480 },
    { name: 'Visakhapatnam', state: 'Andhra Pradesh', type: 'city', lat: 17.6868, lng: 83.2185 },
    { name: 'Madurai', state: 'Tamil Nadu', type: 'city', lat: 9.9252, lng: 78.1198 },
    { name: 'Tirupati', state: 'Andhra Pradesh', type: 'city', lat: 13.6288, lng: 79.4191 },
    { name: 'Shirdi', state: 'Maharashtra', type: 'city', lat: 19.7680, lng: 74.3868 },
    { name: 'Amritsar', state: 'Punjab', type: 'city', lat: 31.6340, lng: 74.8723 },
    { name: 'Chandigarh', state: 'Punjab', type: 'city', lat: 30.7333, lng: 76.7794 },
    { name: 'Lucknow', state: 'Uttar Pradesh', type: 'city', lat: 26.8467, lng: 80.9462 },
    { name: 'Bhopal', state: 'Madhya Pradesh', type: 'city', lat: 23.2599, lng: 77.4126 },
    { name: 'Indore', state: 'Madhya Pradesh', type: 'city', lat: 22.7196, lng: 75.8577 },
    { name: 'Ahmedabad', state: 'Gujarat', type: 'city', lat: 23.0225, lng: 72.5714 },
    { name: 'Surat', state: 'Gujarat', type: 'city', lat: 21.1702, lng: 72.8311 },
    { name: 'Jaipur', state: 'Rajasthan', type: 'city', lat: 26.9124, lng: 75.7873 },
    { name: 'Udaipur', state: 'Rajasthan', type: 'city', lat: 24.5780, lng: 73.6867 },
    { name: 'Jodhpur', state: 'Rajasthan', type: 'city', lat: 26.2389, lng: 73.0243 },
    { name: 'Jaisalmer', state: 'Rajasthan', type: 'city', lat: 26.9157, lng: 70.9230 },
    { name: 'Pushkar', state: 'Rajasthan', type: 'city', lat: 26.4897, lng: 74.5511 },
    { name: 'Ranthambore', state: 'Rajasthan', type: 'city', lat: 25.9939, lng: 76.3667 },
    { name: 'Khajuraho', state: 'Madhya Pradesh', type: 'city', lat: 24.8317, lng: 79.9186 },
    { name: 'Orchha', state: 'Madhya Pradesh', type: 'city', lat: 25.3548, lng: 78.6642 },
    { name: 'Sanchi', state: 'Madhya Pradesh', type: 'city', lat: 23.4855, lng: 77.7355 },
    { name: 'Gwalior', state: 'Madhya Pradesh', type: 'city', lat: 26.2124, lng: 78.1772 },
    { name: 'Bhubaneswar', state: 'Odisha', type: 'city', lat: 20.2961, lng: 85.8245 },
    { name: 'Puri', state: 'Odisha', type: 'city', lat: 19.8135, lng: 85.8312 },
    { name: 'Konark', state: 'Odisha', type: 'city', lat: 19.8876, lng: 86.0915 },
    { name: 'Cuttack', state: 'Odisha', type: 'city', lat: 20.4625, lng: 85.8830 },
    { name: 'Rourkela', state: 'Odisha', type: 'city', lat: 22.2587, lng: 84.8530 },
    { name: 'Bokaro', state: 'Jharkhand', type: 'city', lat: 23.2913, lng: 86.0943 },
    { name: 'Ranchi', state: 'Jharkhand', type: 'city', lat: 23.3441, lng: 85.3096 },
    { name: 'Jamshedpur', state: 'Jharkhand', type: 'city', lat: 22.8046, lng: 86.2029 },
    { name: 'Dhanbad', state: 'Jharkhand', type: 'city', lat: 23.7957, lng: 86.4304 },
    { name: 'Dehradun', state: 'Uttarakhand', type: 'city', lat: 30.3165, lng: 78.0322 },
    { name: 'Nainital', state: 'Uttarakhand', type: 'city', lat: 29.3847, lng: 79.4636 },
    { name: 'Haridwar', state: 'Uttarakhand', type: 'city', lat: 29.9457, lng: 78.1626 },
    { name: 'Mussoorie', state: 'Uttarakhand', type: 'hill_station', lat: 30.4591, lng: 78.0657 },
    { name: 'Gangtok', state: 'Sikkim', type: 'city', lat: 27.3314, lng: 88.6138 },
    { name: 'Pelling', state: 'Sikkim', type: 'city', lat: 27.3115, lng: 88.2395 },
    { name: 'Lachung', state: 'Sikkim', type: 'city', lat: 27.5435, lng: 88.6520 },
    { name: 'Imphal', state: 'Manipur', type: 'city', lat: 24.8170, lng: 93.9368 },
    { name: 'Churachandpur', state: 'Manipur', type: 'city', lat: 24.6650, lng: 93.9159 },
    { name: 'Aizawl', state: 'Mizoram', type: 'city', lat: 23.7271, lng: 92.8609 },
    { name: 'Lunglei', state: 'Mizoram', type: 'city', lat: 22.8667, lng: 92.7530 },
    { name: 'Kohima', state: 'Nagaland', type: 'city', lat: 25.6701, lng: 94.1078 },
    { name: 'Dimapur', state: 'Nagaland', type: 'city', lat: 25.9128, lng: 93.7300 },
    { name: 'Agartala', state: 'Tripura', type: 'city', lat: 23.8315, lng: 91.2868 },
    { name: 'Shillong', state: 'Meghalaya', type: 'city', lat: 25.5788, lng: 91.8933 },
    { name: 'Guwahati', state: 'Assam', type: 'city', lat: 26.1445, lng: 91.7362 },
    { name: 'Kaziranga', state: 'Assam', type: 'city', lat: 26.4525, lng: 92.3220 },
    { name: 'Tezpur', state: 'Assam', type: 'city', lat: 26.6298, lng: 92.7974 },
    { name: 'Jorhat', state: 'Assam', type: 'city', lat: 26.7574, lng: 94.2013 },
    { name: 'Silchar', state: 'Assam', type: 'city', lat: 24.8317, lng: 92.7773 },
    { name: 'Dibrugarh', state: 'Assam', type: 'city', lat: 27.4728, lng: 94.9059 },
    { name: 'Itanagar', state: 'Arunachal Pradesh', type: 'city', lat: 27.0844, lng: 93.6053 },
    { name: 'Tawang', state: 'Arunachal Pradesh', type: 'city', lat: 27.5892, lng: 91.8689 },
    { name: 'Bomdila', state: 'Arunachal Pradesh', type: 'city', lat: 27.9347, lng: 92.6610 },
    { name: 'Port Blair', state: 'Andaman & Nicobar', type: 'city', lat: 11.6230, lng: 92.7265 },
    { name: 'Kavaratti', state: 'Lakshadweep', type: 'city', lat: 10.5667, lng: 72.6417 }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundImage(prev => (prev + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleFromSearch = (query) => {
    setFromLocation(query);
    if (query.length > 2) {
      const filtered = indianPlaces.filter(place => 
        place.name.toLowerCase().includes(query.toLowerCase()) ||
        place.state.toLowerCase().includes(query.toLowerCase()) ||
        place.type.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5);
      setFromSuggestions(filtered);
      setShowFromSuggestions(true);
    } else {
      setFromSuggestions([]);
      setShowFromSuggestions(false);
    }
  };

  const handleToSearch = (query) => {
    setToLocation(query);
    if (query.length > 2) {
      const filtered = indianPlaces.filter(place => 
        place.name.toLowerCase().includes(query.toLowerCase()) ||
        place.state.toLowerCase().includes(query.toLowerCase()) ||
        place.type.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5);
      setToSuggestions(filtered);
      setShowToSuggestions(true);
    } else {
      setToSuggestions([]);
      setShowToSuggestions(false);
    }
  };

  const handleFromSelect = (place) => {
    setFromLocation(place.name);
    setFromSuggestions([]);
    setShowFromSuggestions(false);
  };

  const handleToSelect = (place) => {
    setToLocation(place.name);
    setToSuggestions([]);
    setShowToSuggestions(false);
  };

  const handleNormalTrip = () => {
    if (fromLocation && toLocation) {
      onNavigate('planner');
    }
  };

  const handleBudgetTrip = () => {
    onNavigate('budget');
  };

  const tripCategories = [
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

  const popularDestinations = [
    { name: 'Mumbai', state: 'Maharashtra', image: 'https://images.unsplash.com/photo-1512343879798-01e0e4352a18?w=300', rating: 4.8 },
    { name: 'Delhi', state: 'Delhi', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=300', rating: 4.7 },
    { name: 'Bangalore', state: 'Karnataka', image: 'https://images.unsplash.com/photo-1534418224573-6e05a9c6b4c7?w=300', rating: 4.6 },
    { name: 'Goa', state: 'Goa', image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=300', rating: 4.9 },
    { name: 'Kerala', state: 'Kerala', image: 'https://images.unsplash.com/photo-1605548197710-b7f7202237c5?w=300', rating: 4.9 },
    { name: 'Rajasthan', state: 'Rajasthan', image: 'https://images.unsplash.com/photo-1524492412937-b784b5b9c7c9?w=300', rating: 4.8 }
  ];

  // Search suggestions using OpenStreetMap Nominatim API
  const handleSearch = async (query) => {
    setSearchQuery(query);
    
    if (query.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${query}, India&format=json&limit=8&addressdetails=1`
      );
      const data = await response.json();
      
      const formattedSuggestions = data.map(item => ({
        name: item.display_name.split(',')[0],
        fullName: item.display_name,
        state: item.address?.state || '',
        lat: item.lat,
        lon: item.lon,
        type: item.type
      }));
      
      setSuggestions(formattedSuggestions);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Search error:', error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.fullName);
    setShowSuggestions(false);
    if (onSearch) {
      onSearch(suggestion);
    }
  };

  const handleCategoryClick = (category) => {
    if (onCategorySelect) {
      onCategorySelect(category);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      if (onSearch) {
        onSearch({ query: searchQuery, type: 'search' });
      }
      setShowSuggestions(false);
    }
  };

  return (
    <div className="premium-hero">
      <div className="hero-background">
        <div className="hero-overlay"></div>
        <video 
          className="hero-video" 
          autoPlay 
          muted 
          loop 
          playsInline
        >
          <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" type="video/mp4" />
        </video>
      </div>
      
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            <span className="title-highlight">Discover</span> Incredible India
          </h1>
          <p className="hero-subtitle">
            Search any place in India and plan your perfect trip with smart recommendations
          </p>
        </div>

        {/* Premium Search Bar */}
        <div className="premium-search-container">
          <form onSubmit={handleSearchSubmit} className="search-form">
            <div className="search-input-wrapper">
              <Search className="search-icon" />
              <input
                type="text"
                className="premium-search-input"
                placeholder="Search any place in India... (cities, districts, villages, tourist spots)"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
              />
              {loading && <div className="search-spinner"></div>}
            </div>
            <button type="submit" className="search-button">
              <Search className="btn-icon" />
              Search
            </button>
          </form>

          {/* Search Suggestions */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="search-suggestions">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <MapPin className="suggestion-icon" />
                  <div className="suggestion-content">
                    <div className="suggestion-name">{suggestion.name}</div>
                    <div className="suggestion-details">
                      {suggestion.state && <span className="suggestion-state">{suggestion.state}</span>}
                      <span className="suggestion-type">{suggestion.type}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
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
                className="category-card glassmorphism"
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

        {/* Popular Destinations */}
        <div className="popular-destinations">
          <h2 className="destinations-title">
            <Star className="title-icon" />
            Trending Destinations
          </h2>
          <div className="destinations-grid">
            {popularDestinations.map((destination, index) => (
              <div key={index} className="destination-card glassmorphism">
                <div className="destination-image">
                  <img src={destination.image} alt={destination.name} />
                  <div className="destination-overlay"></div>
                </div>
                <div className="destination-info">
                  <h3 className="destination-name">{destination.name}</h3>
                  <p className="destination-state">{destination.state}</p>
                  <div className="destination-rating">
                    <Star className="rating-icon" />
                    <span>{destination.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumHero;
