import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Search, MapPin, Loader2, X, Navigation, Clock, Star, Building, TreePine, Plane, Train, Anchor, Mountain, Camera } from 'lucide-react';
import './RealTimePlaceSearch.css';

const RealTimePlaceSearch = ({ 
  value, 
  onChange, 
  onSelect, 
  onDistrictSearch,
  placeholder = "Search places in India...", 
  className = "",
  disabled = false 
}) => {
  const [query, setQuery] = useState(value || '');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [error, setError] = useState('');
  const searchTimeoutRef = useRef(null);
  const searchRef = useRef(null);

  // Debounce search with 300ms delay
  const debouncedSearch = useCallback((searchQuery) => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(async () => {
      if (searchQuery.length < 2) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      setLoading(true);
      setError('');
      
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery)}&format=json&addressdetails=1&limit=8&countrycodes=in`,
          {
            headers: {
              'User-Agent': 'TripPlanner/1.0'
            }
          }
        );

        if (!response.ok) {
          throw new Error('Search failed');
        }

        const data = await response.json();
        
        // Process and enhance the results
        const processedSuggestions = data.map((place, index) => {
          const displayName = place.display_name.split(',')[0];
          const city = place.address?.city || place.address?.town || place.address?.village || '';
          const district = place.address?.county || place.address?.district || '';
          const state = place.address?.state || '';
          const country = place.address?.country || '';
          
          return {
            id: place.place_id || index,
            name: displayName,
            fullName: place.display_name,
            city: city,
            district: district,
            state: state,
            country: country,
            lat: parseFloat(place.lat),
            lng: parseFloat(place.lon),
            type: place.type || 'unknown',
            importance: place.importance || 0,
            icon: getPlaceIcon(place.type, place.class),
            category: getCategory(place.type, place.class)
          };
        });

        setSuggestions(processedSuggestions);
        setShowSuggestions(true);
      } catch (err) {
        setError('Search failed. Please try again.');
        setSuggestions([]);
        setShowSuggestions(false);
      } finally {
        setLoading(false);
      }
    }, 300);
  }, []);

  // Get appropriate icon for place type
  const getPlaceIcon = (type, placeClass) => {
    if (type?.includes('city') || type?.includes('town')) return <Building className="place-icon" />;
    if (type?.includes('village') || placeClass?.includes('place')) return <MapPin className="place-icon" />;
    if (type?.includes('airport') || placeClass?.includes('aeroway')) return <Plane className="place-icon" />;
    if (type?.includes('station') || placeClass?.includes('railway')) return <Train className="place-icon" />;
    if (type?.includes('beach')) return <Anchor className="place-icon" />;
    if (type?.includes('mountain') || type?.includes('peak')) return <Mountain className="place-icon" />;
    if (type?.includes('forest') || type?.includes('park')) return <TreePine className="place-icon" />;
    if (type?.includes('attraction') || type?.includes('monument')) return <Camera className="place-icon" />;
    return <MapPin className="place-icon" />;
  };

  // Get category for place
  const getCategory = (type, placeClass) => {
    if (type?.includes('city') || type?.includes('town')) return 'City';
    if (type?.includes('village')) return 'Village';
    if (type?.includes('airport')) return 'Airport';
    if (type?.includes('station')) return 'Station';
    if (type?.includes('beach')) return 'Beach';
    if (type?.includes('landmark') || type?.includes('monument')) return 'Landmark';
    if (type?.includes('natural')) return 'Natural';
    return 'Place';
  };

  // List of known districts for detection
  const knownDistricts = [
    'Kasaragod', 'Kannur', 'Wayanad', 'Kozhikode', 'Malappuram', 'Palakkad', 'Thrissur', 'Ernakulam', 'Idukki', 'Kottayam', 'Alappuzha', 'Pathanamthitta', 'Kollam', 'Thiruvananthapuram',
    'Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad', 'Kolhapur', 'Satara', 'Raigad',
    'Bangalore', 'Mysore', 'Mangalore', 'Hubli', 'Dharwad', 'Belgaum', 'Gulbarga', 'Bidar',
    'Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirupur', 'Erode', 'Vellore',
    'Delhi', 'New Delhi', 'North Delhi', 'South Delhi', 'East Delhi', 'West Delhi',
    'Kolkata', 'Howrah', 'North 24 Parganas', 'South 24 Parganas', 'Hooghly', 'Burdwan',
    'Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar', 'Khammam',
    'Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Ajmer', 'Bikaner', 'Alwar',
    'Lucknow', 'Kanpur', 'Ghaziabad', 'Agra', 'Varanasi', 'Meerut', 'Allahabad',
    'Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar',
    'Bhopal', 'Indore', 'Gwalior', 'Jabalpur', 'Ujjain',
    'Chandigarh', 'Panchkula', 'Mohali',
    'Dehradun', 'Haridwar', 'Rishikesh', 'Nainital', 'Mussoorie',
    'Shimla', 'Manali', 'Dharamshala', 'Solan', 'Mandi',
    'Srinagar', 'Jammu', 'Anantnag', 'Baramulla',
    'Guwahati', 'Silchar', 'Dibrugarh', 'Jorhat',
    'Bhubaneswar', 'Cuttack', 'Rourkela', 'Puri',
    'Patna', 'Gaya', 'Muzaffarpur', 'Bhagalpur',
    'Raipur', 'Bhilai', 'Durg', 'Bilaspur',
    'Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro',
    'Panaji', 'Margao', 'Vasco da Gama',
    'Gangtok', 'Namchi', 'Gyalshing',
    'Itanagar', 'Naharlagun',
    'Kohima', 'Dimapur',
    'Imphal', 'Churachandpur',
    'Aizawl', 'Lunglei',
    'Agartala', 'Udaipur',
    'Dispur', 'Guwahati',
    'Port Blair',
    'Lakshadweep',
    'Kavaratti',
    'Munnar', 'Ooty', 'Shimla', 'Manali', 'Darjeeling', 'Gangtok', 'Leh', 'Ladakh'
  ];

  // Handle input change
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setQuery(inputValue);
    setSelectedIndex(-1);
    
    if (onChange) {
      onChange(inputValue);
    }

    // Check if input matches a known district
    const lowerInput = inputValue.toLowerCase();
    const matchedDistrict = knownDistricts.find(district => 
      district.toLowerCase() === lowerInput
    );

    if (matchedDistrict && onDistrictSearch) {
      onDistrictSearch(matchedDistrict);
      return;
    }

    debouncedSearch(inputValue);
  };

  // Handle place selection
  const handleSelectPlace = (place) => {
    setQuery(place.name);
    setShowSuggestions(false);
    setSelectedIndex(-1);
    
    if (onSelect) {
      onSelect(place);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSelectPlace(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className={`real-time-place-search ${className}`} ref={searchRef}>
      <div className="search-input-container">
        <div className="search-input-wrapper">
          {loading ? (
            <Loader2 className="search-icon loading" />
          ) : (
            <Search className="search-icon" />
          )}
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="search-input"
            disabled={disabled}
            autoComplete="off"
          />
          {query && (
            <button
              onClick={() => {
                setQuery('');
                setSuggestions([]);
                setShowSuggestions(false);
                setSelectedIndex(-1);
                if (onChange) onChange('');
              }}
              className="clear-btn"
            >
              <X size={16} />
            </button>
          )}
        </div>
        
        {error && <div className="search-error">{error}</div>}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="suggestions-dropdown">
          <div className="suggestions-header">
            <span className="suggestions-count">{suggestions.length} places found</span>
          </div>
          {suggestions.map((place, index) => (
            <div
              key={place.id}
              className={`suggestion-item ${index === selectedIndex ? 'selected' : ''}`}
              onClick={() => handleSelectPlace(place)}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              <div className="suggestion-icon">
                {place.icon}
              </div>
              <div className="suggestion-content">
                <div className="suggestion-header">
                  <h4 className="place-name">{place.name}</h4>
                  <span className="place-category">{place.category}</span>
                </div>
                <div className="place-details">
                  {place.city && <span className="place-city">{place.city}</span>}
                  {place.district && <span className="place-district">{place.district}</span>}
                  {place.state && <span className="place-state">{place.state}</span>}
                </div>
                <div className="place-coordinates">
                  <Navigation className="coord-icon" />
                  <span>{place.lat.toFixed(4)}, {place.lng.toFixed(4)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showSuggestions && !loading && suggestions.length === 0 && query.length >= 2 && (
        <div className="no-results">
          <div className="no-results-icon">
            <Search />
          </div>
          <div className="no-results-text">
            <h4>No places found</h4>
            <p>Try searching with different keywords</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RealTimePlaceSearch;
