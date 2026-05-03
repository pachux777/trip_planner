import { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  MapPin, 
  Navigation, 
  Clock, 
  Star, 
  TrendingUp, 
  Filter, 
  Grid, 
  List, 
  Heart, 
  Share2, 
  Bookmark, 
  Eye, 
  Camera, 
  Calendar, 
  Users, 
  DollarSign, 
  Thermometer, 
  Cloud, 
  Wind, 
  Droplets, 
  Globe, 
  Mountain, 
  Trees, 
  Sun, 
  Hotel, 
  Utensils, 
  Car, 
  Train, 
  Plane, 
  Bus, 
  Route, 
  Compass, 
  Map, 
  Navigation as NavigationIcon,
  X,
  ChevronRight,
  Sparkles,
  Award,
  Shield,
  Zap
} from 'lucide-react';
import './IndiaSearchSystem.css';

const IndiaSearchSystem = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [savedPlaces, setSavedPlaces] = useState([]);
  const [likedPlaces, setLikedPlaces] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [trendingPlaces, setTrendingPlaces] = useState([]);
  const searchInputRef = useRef(null);

  // Search categories
  const categories = [
    { id: 'all', name: 'All Places', icon: Globe, color: '#667eea' },
    { id: 'states', name: 'States', icon: Map, color: '#f59e0b' },
    { id: 'districts', name: 'Districts', icon: Navigation, color: '#10b981' },
    { id: 'cities', name: 'Cities', icon: Hotel, color: '#3b82f6' },
    { id: 'villages', name: 'Villages', icon: Trees, color: '#ef4444' },
    { id: 'tourist', name: 'Tourist Spots', icon: Camera, color: '#8b5cf6' },
    { id: 'stations', name: 'Stations', icon: Train, color: '#f97316' },
    { id: 'airports', name: 'Airports', icon: Plane, color: '#06b6d4' },
    { id: 'beaches', name: 'Beaches', icon: Sun, color: '#ec4899' },
    { id: 'temples', name: 'Temples', icon: Sparkles, color: '#84cc16' },
    { id: 'lakes', name: 'Lakes', icon: Droplets, color: '#14b8a6' },
    { id: 'hill', name: 'Hill Stations', icon: Mountain, color: '#a855f7' }
  ];

  // Mock data for Indian places
  const mockPlaces = [
    {
      id: 1,
      name: 'Munnar',
      type: 'hill',
      category: 'tourist',
      state: 'Kerala',
      district: 'Idukki',
      description: 'Beautiful hill station known for tea plantations and misty mountains',
      image: 'https://images.unsplash.com/photo-1548199973-75cce1b4ea31?w=600',
      rating: 4.8,
      reviews: 2847,
      bestTime: 'September to March',
      weather: { temp: '18°C', condition: 'Pleasant', humidity: '65%', wind: '12 km/h' },
      attractions: ['Tea Gardens', 'Eravikulam Park', 'Mattupetty Dam', 'Top Station'],
      nearby: ['Thekkady', 'Alleppey', 'Kochi', 'Kumarakom'],
      hotels: ['The Leaf Munnar', 'Parakkat Nature Resort', 'Chandys Windy Woods'],
      food: ['Kerala Sadhya', 'Appam with Stew', 'Puttu and Kadala Curry'],
      transport: {
        car: { time: '4 hours from Kochi', distance: '130km', cost: '₹3000' },
        train: { time: '6 hours from Kochi', distance: '150km', cost: '₹500' },
        bus: { time: '5 hours from Kochi', distance: '140km', cost: '₹300' },
        flight: { time: '1 hour to Kochi + 4 hours road', distance: '130km', cost: '₹5000' }
      },
      budget: {
        budget: { daily: '₹1500-2500', stay: '₹800-1500', food: '₹400-600', transport: '₹300-400' },
        mid: { daily: '₹3000-5000', stay: '₹2000-3500', food: '₹800-1200', transport: '₹600-1000' },
        luxury: { daily: '₹8000-15000', stay: '₹5000-10000', food: '₹2000-4000', transport: '₹1500-3000' }
      },
      trending: true,
      verified: true,
      tags: ['Hill Station', 'Tea Gardens', 'Romantic', 'Nature', 'Photography']
    },
    {
      id: 2,
      name: 'Goa',
      type: 'beach',
      category: 'tourist',
      state: 'Goa',
      district: 'North Goa',
      description: 'Famous for its beaches, nightlife, and Portuguese heritage',
      image: 'https://images.unsplash.com/photo-1512343879798-01e0e4352a18?w=600',
      rating: 4.9,
      reviews: 3421,
      bestTime: 'November to March',
      weather: { temp: '28°C', condition: 'Sunny', humidity: '75%', wind: '15 km/h' },
      attractions: ['Baga Beach', 'Anjuna Beach', 'Old Goa Churches', 'Dudhsagar Falls'],
      nearby: ['Mumbai', 'Pune', 'Bangalore', 'Hampi'],
      hotels: ['Taj Resort & Convention Centre', 'W Goa', 'Grand Hyatt Goa'],
      food: ['Goan Fish Curry', 'Vindaloo', 'Bebinca', 'Feni'],
      transport: {
        car: { time: '10 hours from Mumbai', distance: '600km', cost: '₹8000' },
        train: { time: '12 hours from Mumbai', distance: '650km', cost: '₹1200' },
        bus: { time: '14 hours from Mumbai', distance: '620km', cost: '₹800' },
        flight: { time: '1 hour from Mumbai', distance: '450km', cost: '₹4000' }
      },
      budget: {
        budget: { daily: '₹2000-3000', stay: '₹1000-2000', food: '₹600-800', transport: '₹400-600' },
        mid: { daily: '₹4000-6000', stay: '₹2500-4000', food: '₹1000-1500', transport: '₹800-1200' },
        luxury: { daily: '₹10000-20000', stay: '₹6000-12000', food: '₹2000-4000', transport: '₹2000-4000' }
      },
      trending: true,
      verified: true,
      tags: ['Beach', 'Nightlife', 'Heritage', 'Water Sports', 'Party']
    },
    {
      id: 3,
      name: 'Jaipur',
      type: 'city',
      category: 'tourist',
      state: 'Rajasthan',
      district: 'Jaipur',
      description: 'Pink City known for its royal palaces and rich cultural heritage',
      image: 'https://images.unsplash.com/photo-1524492412937-b784b5b9c7c9?w=600',
      rating: 4.7,
      reviews: 2156,
      bestTime: 'October to March',
      weather: { temp: '35°C', condition: 'Hot', humidity: '25%', wind: '18 km/h' },
      attractions: ['Amber Fort', 'City Palace', 'Hawa Mahal', 'Jantar Mantar'],
      nearby: ['Delhi', 'Agra', 'Udaipur', 'Jodhpur'],
      hotels: ['Rambagh Palace', 'ITC Rajputana', 'Fairmont Jaipur'],
      food: ['Dal Baati Churma', 'Gatte ki Sabzi', 'Ker Sangri', 'Mawa Kachori'],
      transport: {
        car: { time: '5 hours from Delhi', distance: '280km', cost: '₹4000' },
        train: { time: '4 hours from Delhi', distance: '300km', cost: '₹800' },
        bus: { time: '6 hours from Delhi', distance: '290km', cost: '₹600' },
        flight: { time: '1 hour from Delhi', distance: '230km', cost: '₹3500' }
      },
      budget: {
        budget: { daily: '₹1800-2800', stay: '₹1000-1800', food: '₹500-700', transport: '₹300-500' },
        mid: { daily: '₹3500-5500', stay: '₹2000-3000', food: '₹800-1200', transport: '₹700-1000' },
        luxury: { daily: '₹9000-16000', stay: '₹5000-8000', food: '₹2000-3500', transport: '₹1500-2500' }
      },
      trending: true,
      verified: true,
      tags: ['Heritage', 'Palace', 'Culture', 'Shopping', 'Architecture']
    },
    {
      id: 4,
      name: 'Varanasi',
      type: 'spiritual',
      category: 'tourist',
      state: 'Uttar Pradesh',
      district: 'Varanasi',
      description: 'Ancient spiritual city on the banks of the Ganges River',
      image: 'https://images.unsplash.com/photo-1593696140826-c58b021acf8b?w=600',
      rating: 4.6,
      reviews: 1876,
      bestTime: 'October to March',
      weather: { temp: '32°C', condition: 'Warm', humidity: '55%', wind: '10 km/h' },
      attractions: ['Kashi Vishwanath Temple', 'Ganga Aarti', 'Sarnath', 'Assi Ghat'],
      nearby: ['Allahabad', 'Lucknow', 'Khajuraho', 'Ayodhya'],
      hotels: ['Taj Ganges', 'Brijrama Palace', 'Hotel Clarks Varanasi'],
      food: ['Kachori Sabzi', 'Baati Chokha', 'Tamatar Chaat', 'Malaiyo'],
      transport: {
        car: { time: '8 hours from Lucknow', distance: '320km', cost: '₹5000' },
        train: { time: '6 hours from Lucknow', distance: '300km', cost: '₹600' },
        bus: { time: '8 hours from Lucknow', distance: '310km', cost: '₹400' },
        flight: { time: '1 hour from Lucknow', distance: '250km', cost: '₹3000' }
      },
      budget: {
        budget: { daily: '₹1200-2000', stay: '₹800-1200', food: '₹300-500', transport: '₹200-400' },
        mid: { daily: '₹2500-4000', stay: '₹1500-2500', food: '₹600-900', transport: '₹400-600' },
        luxury: { daily: '₹6000-10000', stay: '₹3000-5000', food: '₹1500-2500', transport: '₹1000-2000' }
      },
      trending: true,
      verified: true,
      tags: ['Spiritual', 'Temple', 'Ganga', 'Culture', 'Ancient']
    },
    {
      id: 5,
      name: 'Andaman Islands',
      type: 'island',
      category: 'tourist',
      state: 'Andaman & Nicobar',
      district: 'South Andaman',
      description: 'Tropical paradise with pristine beaches and coral reefs',
      image: 'https://images.unsplash.com/photo-1540202404-1b627c8aeb30?w=600',
      rating: 4.8,
      reviews: 1432,
      bestTime: 'November to April',
      weather: { temp: '30°C', condition: 'Tropical', humidity: '80%', wind: '12 km/h' },
      attractions: ['Cellular Jail', 'Radhanagar Beach', 'Ross Island', 'Havelock Island'],
      nearby: ['Port Blair', 'Neil Island', 'Baratang Island', 'Long Island'],
      hotels: ['Sea Shell', 'Taj Exotica', 'Silver Sand Beach Resort'],
      food: ['Seafood Curry', 'Coconut Prawns', 'Fish Fry', 'Island Fruits'],
      transport: {
        car: { time: 'N/A', distance: 'N/A', cost: 'N/A' },
        train: { time: 'N/A', distance: 'N/A', cost: 'N/A' },
        bus: { time: 'N/A', distance: 'N/A', cost: 'N/A' },
        flight: { time: '2.5 hours from Chennai', distance: '1200km', cost: '₹8000' }
      },
      budget: {
        budget: { daily: '₹2500-3500', stay: '₹1500-2500', food: '₹800-1000', transport: '₹200-400' },
        mid: { daily: '₹5000-7000', stay: '₹3000-4500', food: '₹1500-2000', transport: '₹500-800' },
        luxury: { daily: '₹12000-20000', stay: '₹8000-12000', food: '₹3000-5000', transport: '₹1000-2000' }
      },
      trending: false,
      verified: true,
      tags: ['Island', 'Beach', 'Scuba', 'Adventure', 'Romantic']
    },
    {
      id: 6,
      name: 'Leh Ladakh',
      type: 'mountain',
      category: 'tourist',
      state: 'Ladakh',
      district: 'Leh',
      description: 'High-altitude desert with stunning landscapes and Buddhist monasteries',
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600',
      rating: 4.9,
      reviews: 1987,
      bestTime: 'April to June',
      weather: { temp: '15°C', condition: 'Cool', humidity: '30%', wind: '20 km/h' },
      attractions: ['Pangong Lake', 'Nubra Valley', 'Khardung La Pass', 'Hemis Monastery'],
      nearby: ['Srinagar', 'Manali', 'Zanskar', 'Kargil'],
      hotels: ['The Grand Dragon', 'Ladakh Heights', 'Hotel Singge Palace'],
      food: ['Thukpa', 'Momos', 'Butter Tea', 'Apricot Jam'],
      transport: {
        car: { time: '2 days from Delhi', distance: '1000km', cost: '₹15000' },
        train: { time: 'N/A', distance: 'N/A', cost: 'N/A' },
        bus: { time: '2 days from Delhi', distance: '1000km', cost: '₹3000' },
        flight: { time: '1.5 hours from Delhi', distance: '650km', cost: '₹8000' }
      },
      budget: {
        budget: { daily: '₹2000-3000', stay: '₹1000-2000', food: '₹600-800', transport: '₹400-600' },
        mid: { daily: '₹4000-6000', stay: '₹2500-3500', food: '₹1000-1500', transport: '₹800-1200' },
        luxury: { daily: '₹10000-18000', stay: '₹6000-10000', food: '₹2000-3500', transport: '₹2000-4000' }
      },
      trending: true,
      verified: true,
      tags: ['Mountain', 'Adventure', 'Buddhist', 'Landscape', 'Photography']
    }
  ];

  useEffect(() => {
    // Load search history from localStorage
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }

    // Load recent searches
    const savedRecent = localStorage.getItem('recentSearches');
    if (savedRecent) {
      setRecentSearches(JSON.parse(savedRecent));
    }

    // Set trending places
    setTrendingPlaces(mockPlaces.filter(place => place.trending));
  }, []);

  // OpenStreetMap Nominatim API search
  const searchPlaces = async (query) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=in&limit=10`
      );
      const data = await response.json();
      
      // Transform API results to our format
      const transformedResults = data.map((item, index) => ({
        id: Date.now() + index,
        name: item.display_name.split(',')[0],
        fullName: item.display_name,
        type: 'osm',
        category: 'tourist',
        state: extractState(item.display_name),
        district: extractDistrict(item.display_name),
        description: `Location in ${extractState(item.display_name)}`,
        image: `https://picsum.photos/seed/${item.place_id}/600/400`,
        rating: 4.5 + Math.random() * 0.5,
        reviews: Math.floor(Math.random() * 1000) + 100,
        lat: parseFloat(item.lat),
        lon: parseFloat(item.lon),
        trending: false,
        verified: false,
        tags: extractTags(item.display_name)
      }));

      return transformedResults;
    } catch (error) {
      console.error('Search error:', error);
      return [];
    }
  };

  const extractState = (displayName) => {
    const states = ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman & Nicobar', 'Chandigarh', 'Dadra and Nagar Haveli', 'Daman and Diu', 'Delhi', 'Jammu & Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'];
    
    for (let state of states) {
      if (displayName.includes(state)) {
        return state;
      }
    }
    return 'Unknown';
  };

  const extractDistrict = (displayName) => {
    const parts = displayName.split(',');
    if (parts.length > 1) {
      return parts[parts.length - 2].trim();
    }
    return 'Unknown';
  };

  const extractTags = (displayName) => {
    const tags = [];
    if (displayName.toLowerCase().includes('temple')) tags.push('Temple');
    if (displayName.toLowerCase().includes('beach')) tags.push('Beach');
    if (displayName.toLowerCase().includes('fort')) tags.push('Fort');
    if (displayName.toLowerCase().includes('park')) tags.push('Park');
    if (displayName.toLowerCase().includes('lake')) tags.push('Lake');
    if (displayName.toLowerCase().includes('mountain')) tags.push('Mountain');
    if (displayName.toLowerCase().includes('river')) tags.push('River');
    return tags;
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setShowSuggestions(false);

    try {
      // Search in mock data first
      const mockResults = mockPlaces.filter(place =>
        place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.district.toLowerCase().includes(searchQuery.toLowerCase())
      );

      // Then search via OpenStreetMap API
      const apiResults = await searchPlaces(searchQuery);

      // Combine results
      const allResults = [...mockResults, ...apiResults];
      setSearchResults(allResults);

      // Update search history
      const newSearch = {
        query: searchQuery,
        timestamp: new Date().toISOString(),
        resultsCount: allResults.length
      };
      const updatedHistory = [newSearch, ...searchHistory.slice(0, 9)];
      setSearchHistory(updatedHistory);
      localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));

      // Update recent searches
      const updatedRecent = [searchQuery, ...recentSearches.filter(s => s !== searchQuery).slice(0, 4)];
      setRecentSearches(updatedRecent);
      localStorage.setItem('recentSearches', JSON.stringify(updatedRecent));

    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 2) {
      setIsLoading(true);
      try {
        const results = await searchPlaces(query);
        setSuggestions(results.slice(0, 5));
        setShowSuggestions(true);
      } catch (error) {
        console.error('Suggestions failed:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.name);
    setShowSuggestions(false);
    searchInputRef.current?.focus();
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    if (categoryId === 'all') {
      setSearchResults(mockPlaces);
    } else {
      const filtered = mockPlaces.filter(place => place.category === categoryId || place.type === categoryId);
      setSearchResults(filtered);
    }
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

  const handlePlaceClick = (place) => {
    setSelectedPlace(place);
  };

  const filteredResults = selectedCategory === 'all' 
    ? searchResults 
    : searchResults.filter(place => place.category === selectedCategory || place.type === selectedCategory);

  return (
    <div className="india-search-system">
      {/* Search Header */}
      <div className="search-header">
        <div className="search-container">
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-wrapper">
              <Search className="search-icon" />
              <input
                ref={searchInputRef}
                type="text"
                className="search-input"
                placeholder="Search any place in India... (states, districts, cities, villages, tourist spots)"
                value={searchQuery}
                onChange={handleInputChange}
                onFocus={() => setShowSuggestions(true)}
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

            {/* Search Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="search-suggestions">
                <div className="suggestions-header">
                  <span className="suggestions-title">Suggestions</span>
                </div>
                <div className="suggestions-list">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="suggestion-item"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <MapPin className="suggestion-icon" />
                      <div className="suggestion-content">
                        <div className="suggestion-name">{suggestion.name}</div>
                        <div className="suggestion-location">{suggestion.fullName}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </form>

          {/* Quick Actions */}
          <div className="search-actions">
            <button className="action-btn">
              <Filter className="btn-icon" />
              Filters
            </button>
            <button className="action-btn">
              <Clock className="btn-icon" />
              History
            </button>
          </div>
        </div>

        {/* Recent Searches */}
        {recentSearches.length > 0 && (
          <div className="recent-searches">
            <div className="recent-header">
              <Clock className="recent-icon" />
              <span className="recent-title">Recent Searches</span>
            </div>
            <div className="recent-list">
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  className="recent-item"
                  onClick={() => setSearchQuery(search)}
                >
                  <Search className="recent-icon" />
                  {search}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Category Filter */}
      <div className="category-filter">
        <div className="filter-header">
          <h3 className="filter-title">Browse by Category</h3>
        </div>
        <div className="category-grid">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => handleCategorySelect(category.id)}
              style={{ '--category-color': category.color }}
            >
              <category.icon className="category-icon" />
              <span className="category-name">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Trending Places */}
      {trendingPlaces.length > 0 && searchQuery === '' && (
        <div className="trending-section">
          <div className="section-header">
            <div className="section-title-group">
              <h2 className="section-title">
                <TrendingUp className="title-icon" />
                Trending Places
              </h2>
              <p className="section-subtitle">Most popular destinations right now</p>
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
            </div>
          </div>

          <div className={`places-grid ${viewMode}`}>
            {trendingPlaces.map((place) => (
              <div key={place.id} className="place-card">
                <div className="place-media">
                  <img src={place.image} alt={place.name} className="place-image" />
                  <div className="place-overlay">
                    <div className="place-actions">
                      <button
                        className="action-btn"
                        onClick={() => handleSavePlace(place.id)}
                      >
                        <Bookmark className={`action-icon ${savedPlaces.includes(place.id) ? 'saved' : ''}`} />
                      </button>
                      <button
                        className="action-btn"
                        onClick={() => handleLikePlace(place.id)}
                      >
                        <Heart className={`action-icon ${likedPlaces.includes(place.id) ? 'liked' : ''}`} />
                      </button>
                      <button className="action-btn">
                        <Share2 className="action-icon" />
                      </button>
                    </div>
                    {place.trending && (
                      <div className="trending-badge">
                        <TrendingUp className="badge-icon" />
                        Trending
                      </div>
                    )}
                    {place.verified && (
                      <div className="verified-badge">
                        <Shield className="badge-icon" />
                        Verified
                      </div>
                    )}
                  </div>
                </div>

                <div className="place-content">
                  <div className="place-header">
                    <div>
                      <h3 className="place-name">{place.name}</h3>
                      <div className="place-location">
                        <MapPin className="location-icon" />
                        <span>{place.district}, {place.state}</span>
                      </div>
                    </div>
                    <div className="place-rating">
                      <Star className="rating-icon" />
                      <span>{place.rating}</span>
                      <span className="reviews">({place.reviews})</span>
                    </div>
                  </div>

                  <p className="place-description">{place.description}</p>

                  <div className="place-tags">
                    {place.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="tag">{tag}</span>
                    ))}
                  </div>

                  <div className="place-weather">
                    <div className="weather-item">
                      <Thermometer className="weather-icon" />
                      <span>{place.weather.temp}</span>
                    </div>
                    <div className="weather-item">
                      <Cloud className="weather-icon" />
                      <span>{place.weather.condition}</span>
                    </div>
                    <div className="weather-item">
                      <Droplets className="weather-icon" />
                      <span>{place.weather.humidity}</span>
                    </div>
                  </div>

                  <div className="place-footer">
                    <div className="place-meta">
                      <div className="meta-item">
                        <Calendar className="meta-icon" />
                        <span>Best: {place.bestTime}</span>
                      </div>
                    </div>
                    <button
                      className="explore-btn"
                      onClick={() => handlePlaceClick(place)}
                    >
                      <Eye className="btn-icon" />
                      Explore
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search Results */}
      {filteredResults.length > 0 && (
        <div className="search-results">
          <div className="results-header">
            <h2 className="results-title">
              Found {filteredResults.length} places for "{searchQuery}"
            </h2>
            <div className="results-actions">
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

          <div className={`places-grid ${viewMode}`}>
            {filteredResults.map((place) => (
              <div key={place.id} className="place-card">
                <div className="place-media">
                  <img src={place.image} alt={place.name} className="place-image" />
                  <div className="place-overlay">
                    <div className="place-actions">
                      <button
                        className="action-btn"
                        onClick={() => handleSavePlace(place.id)}
                      >
                        <Bookmark className={`action-icon ${savedPlaces.includes(place.id) ? 'saved' : ''}`} />
                      </button>
                      <button
                        className="action-btn"
                        onClick={() => handleLikePlace(place.id)}
                      >
                        <Heart className={`action-icon ${likedPlaces.includes(place.id) ? 'liked' : ''}`} />
                      </button>
                      <button className="action-btn">
                        <Share2 className="action-icon" />
                      </button>
                    </div>
                    {place.trending && (
                      <div className="trending-badge">
                        <TrendingUp className="badge-icon" />
                        Trending
                      </div>
                    )}
                    {place.verified && (
                      <div className="verified-badge">
                        <Shield className="badge-icon" />
                        Verified
                      </div>
                    )}
                  </div>
                </div>

                <div className="place-content">
                  <div className="place-header">
                    <div>
                      <h3 className="place-name">{place.name}</h3>
                      <div className="place-location">
                        <MapPin className="location-icon" />
                        <span>{place.district || 'Unknown'}, {place.state}</span>
                      </div>
                    </div>
                    <div className="place-rating">
                      <Star className="rating-icon" />
                      <span>{place.rating}</span>
                      <span className="reviews">({place.reviews})</span>
                    </div>
                  </div>

                  <p className="place-description">{place.description}</p>

                  <div className="place-tags">
                    {place.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="tag">{tag}</span>
                    ))}
                  </div>

                  {place.weather && (
                    <div className="place-weather">
                      <div className="weather-item">
                        <Thermometer className="weather-icon" />
                        <span>{place.weather.temp}</span>
                      </div>
                      <div className="weather-item">
                        <Cloud className="weather-icon" />
                        <span>{place.weather.condition}</span>
                      </div>
                      <div className="weather-item">
                        <Droplets className="weather-icon" />
                        <span>{place.weather.humidity}</span>
                      </div>
                    </div>
                  )}

                  <div className="place-footer">
                    <div className="place-meta">
                      {place.bestTime && (
                        <div className="meta-item">
                          <Calendar className="meta-icon" />
                          <span>Best: {place.bestTime}</span>
                        </div>
                      )}
                    </div>
                    <button
                      className="explore-btn"
                      onClick={() => handlePlaceClick(place)}
                    >
                      <Eye className="btn-icon" />
                      Explore
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {searchQuery && filteredResults.length === 0 && !isLoading && (
        <div className="no-results">
          <div className="no-results-content">
            <MapPin className="no-results-icon" />
            <h3>No places found</h3>
            <p>Try searching with different keywords or browse our categories</p>
            <button
              className="clear-search-btn"
              onClick={() => {
                setSearchQuery('');
                setSearchResults([]);
              }}
            >
              Clear Search
            </button>
          </div>
        </div>
      )}

      {/* Place Details Modal */}
      {selectedPlace && (
        <div className="place-modal-overlay" onClick={() => setSelectedPlace(null)}>
          <div className="place-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">{selectedPlace.name}</h2>
              <button
                className="modal-close"
                onClick={() => setSelectedPlace(null)}
              >
                <X className="close-icon" />
              </button>
            </div>

            <div className="modal-content">
              <div className="modal-hero">
                <img src={selectedPlace.image} alt={selectedPlace.name} className="modal-image" />
                <div className="modal-hero-overlay">
                  <div className="modal-actions">
                    <button className="modal-action-btn">
                      <Bookmark className="action-icon" />
                    </button>
                    <button className="modal-action-btn">
                      <Heart className="action-icon" />
                    </button>
                    <button className="modal-action-btn">
                      <Share2 className="action-icon" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="modal-info">
                <div className="modal-meta">
                  <div className="meta-item">
                    <MapPin className="meta-icon" />
                    <span>{selectedPlace.district}, {selectedPlace.state}</span>
                  </div>
                  <div className="meta-item">
                    <Star className="meta-icon" />
                    <span>{selectedPlace.rating} ({selectedPlace.reviews} reviews)</span>
                  </div>
                </div>

                <p className="modal-description">{selectedPlace.description}</p>

                {selectedPlace.attractions && (
                  <div className="modal-section">
                    <h3 className="section-title">
                      <Camera className="section-icon" />
                      Tourist Attractions
                    </h3>
                    <div className="attractions-grid">
                      {selectedPlace.attractions.map((attraction, index) => (
                        <div key={index} className="attraction-item">
                          <MapPin className="attraction-icon" />
                          {attraction}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedPlace.nearby && (
                  <div className="modal-section">
                    <h3 className="section-title">
                      <NavigationIcon className="section-icon" />
                      Nearby Places
                    </h3>
                    <div className="nearby-grid">
                      {selectedPlace.nearby.map((place, index) => (
                        <div key={index} className="nearby-item">
                          <Compass className="nearby-icon" />
                          {place}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedPlace.hotels && (
                  <div className="modal-section">
                    <h3 className="section-title">
                      <Hotel className="section-icon" />
                      Hotels & Accommodation
                    </h3>
                    <div className="hotels-grid">
                      {selectedPlace.hotels.map((hotel, index) => (
                        <div key={index} className="hotel-item">
                          <Hotel className="hotel-icon" />
                          {hotel}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedPlace.food && (
                  <div className="modal-section">
                    <h3 className="section-title">
                      <Utensils className="section-icon" />
                      Local Food
                    </h3>
                    <div className="food-grid">
                      {selectedPlace.food.map((food, index) => (
                        <div key={index} className="food-item">
                          <Utensils className="food-icon" />
                          {food}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedPlace.transport && (
                  <div className="modal-section">
                    <h3 className="section-title">
                      <Route className="section-icon" />
                      Transportation Options
                    </h3>
                    <div className="transport-grid">
                      {Object.entries(selectedPlace.transport).map(([mode, details]) => (
                        <div key={mode} className="transport-item">
                          <div className="transport-header">
                            {mode === 'car' && <Car className="transport-icon" />}
                            {mode === 'train' && <Train className="transport-icon" />}
                            {mode === 'bus' && <Bus className="transport-icon" />}
                            {mode === 'flight' && <Plane className="transport-icon" />}
                            <span className="transport-mode">{mode.charAt(0).toUpperCase() + mode.slice(1)}</span>
                          </div>
                          <div className="transport-details">
                            <div className="transport-detail">
                              <Clock className="detail-icon" />
                              <span>{details.time}</span>
                            </div>
                            <div className="transport-detail">
                              <NavigationIcon className="detail-icon" />
                              <span>{details.distance}</span>
                            </div>
                            <div className="transport-detail">
                              <DollarSign className="detail-icon" />
                              <span>{details.cost}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedPlace.budget && (
                  <div className="modal-section">
                    <h3 className="section-title">
                      <DollarSign className="section-icon" />
                      Budget Estimates
                    </h3>
                    <div className="budget-grid">
                      {Object.entries(selectedPlace.budget).map(([type, budget]) => (
                        <div key={type} className="budget-item">
                          <div className="budget-header">
                            <span className="budget-type">{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                            <span className="budget-daily">₹{budget.daily}/day</span>
                          </div>
                          <div className="budget-details">
                            <div className="budget-detail">
                              <Hotel className="detail-icon" />
                              <span>Stay: ₹{budget.stay}</span>
                            </div>
                            <div className="budget-detail">
                              <Utensils className="detail-icon" />
                              <span>Food: ₹{budget.food}</span>
                            </div>
                            <div className="budget-detail">
                              <Car className="detail-icon" />
                              <span>Transport: ₹{budget.transport}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndiaSearchSystem;
