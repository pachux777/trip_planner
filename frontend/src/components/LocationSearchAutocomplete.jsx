import { useState, useEffect, useRef, useCallback } from 'react';
import { Search, Loader2, MapPin, AlertCircle, Navigation, Mic, Clock, Star } from 'lucide-react';
import './LocationSearchAutocomplete.css';

const LocationSearchAutocomplete = ({ 
  placeholder, 
  value, 
  onChange, 
  onSelect, 
  className = '',
  disabled = false 
}) => {
  const [query, setQuery] = useState(value || '');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [error, setError] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [showQuickChips, setShowQuickChips] = useState(true);
  const debounceTimer = useRef(null);
  const searchRef = useRef(null);
  const recognitionRef = useRef(null);

  // Popular Kerala destinations
  const popularKeralaDestinations = [
    { name: 'Munnar', displayName: 'Munnar', type: 'city' },
    { name: 'Alleppey', displayName: 'Alleppey', type: 'city' },
    { name: 'Kochi', displayName: 'Kochi', type: 'city' },
    { name: 'Kozhikode', displayName: 'Kozhikode', type: 'city' },
    { name: 'Kovalam', displayName: 'Kovalam', type: 'city' },
    { name: 'Thekkady', displayName: 'Thekkady', type: 'city' },
    { name: 'Kumarakom', displayName: 'Kumarakom', type: 'city' },
    { name: 'Wayanad', displayName: 'Wayanad', type: 'city' },
    { name: 'Kasaragod', displayName: 'Kasaragod', type: 'city' },
    { name: 'Thrissur', displayName: 'Thrissur', type: 'city' }
  ];

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading recent searches:', error);
      }
    }
  }, []);

  // Save search to recent searches
  const saveToRecentSearches = (place) => {
    const newRecent = [place, ...recentSearches.filter(item => item.id !== place.id)].slice(0, 5);
    setRecentSearches(newRecent);
    localStorage.setItem('recentSearches', JSON.stringify(newRecent));
  };

  // Search places using OpenStreetMap Nominatim API
  const searchPlaces = useCallback(async (searchQuery) => {
    if (!searchQuery || searchQuery.length < 2) {
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
            'User-Agent': 'TravelPlannerPro/1.0'
          }
        }
      );
      
      if (!response.ok) {
        throw new Error('Search failed');
      }
      
      const data = await response.json();
      
      if (data && data.length > 0) {
        const results = data.map(place => ({
          id: place.place_id,
          name: place.display_name,
          displayName: place.display_name.split(',')[0].trim(),
          lat: parseFloat(place.lat),
          lng: parseFloat(place.lon),
          address: {
            city: place.address?.city || place.address?.town || place.address?.village,
            district: place.address?.county || place.address?.district,
            state: place.address?.state,
            country: place.address?.country
          },
          type: place.type,
          importance: place.importance || 0,
          icon: getPlaceIcon(place.class, place.type)
        }));
        
        setSuggestions(results);
        setShowSuggestions(true);
      } else {
        // Try fuzzy search for typos and variations
        await fuzzySearch(searchQuery);
      }
    } catch (error) {
      console.error('Search error:', error);
      setError('Unable to search. Please try again.');
      setSuggestions([]);
      setShowSuggestions(false);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fuzzy search for typos and variations
  const fuzzySearch = async (searchQuery) => {
    try {
      const variations = [
        searchQuery,
        searchQuery.toLowerCase(),
        searchQuery.replace(/\s+/g, ''), // Remove spaces
        searchQuery + ' India',
        searchQuery.split(' ').join(', '), // Add commas between words
      ];

      const allResults = [];
      
      for (const variation of variations) {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(variation)}&format=json&addressdetails=1&limit=3&countrycodes=in`,
            {
              headers: {
                'User-Agent': 'TravelPlannerPro/1.0'
              }
            }
          );
          
          if (response.ok) {
            const data = await response.json();
            if (data && data.length > 0) {
              allResults.push(...data.map(place => ({
                id: place.place_id,
                name: place.display_name,
                displayName: place.display_name.split(',')[0].trim(),
                lat: parseFloat(place.lat),
                lng: parseFloat(place.lon),
                address: {
                  city: place.address?.city || place.address?.town || place.address?.village,
                  district: place.address?.county || place.address?.district,
                  state: place.address?.state,
                  country: place.address?.country
                },
                type: place.type,
                importance: place.importance || 0,
                icon: getPlaceIcon(place.class, place.type),
                isFuzzy: true
              })));
            }
          }
        } catch (err) {
          // Continue to next variation
        }
      }

      // Remove duplicates and sort by importance
      const uniqueResults = allResults
        .filter((place, index, self) => 
          index === self.findIndex(p => p.id === place.id)
        )
        .sort((a, b) => (b.importance || 0) - (a.importance || 0))
        .slice(0, 5);

      if (uniqueResults.length > 0) {
        setSuggestions(uniqueResults);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } catch (error) {
      setError('Search failed. Please check your connection.');
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Get place icon based on type
  const getPlaceIcon = (category, type) => {
    if (type === 'airport' || category === 'aeroway') return '✈️';
    if (type === 'railway_station' || category === 'railway') return '🚂';
    if (type === 'bus_station' || type === 'bus_stop') return '🚌';
    if (type === 'hotel' || category === 'accommodation') return '🏨';
    if (type === 'restaurant' || category === 'food') return '🍽️';
    if (type === 'beach' || category === 'natural') return '🏖️';
    if (type === 'temple' || type === 'church' || type === 'mosque') return '🛕';
    if (category === 'tourism') return '🏛️';
    if (category === 'amenity') return '🏢';
    if (category === 'shop') return '🛍️';
    if (category === 'highway') return '🛣️';
    if (category === 'place') return '📍';
    if (category === 'leisure') return '🎯';
    if (category === 'building') return '🏠';
    
    return '📍';
  };

  // Get AI-powered place information
  const getAIPlaceInfo = async (placeName) => {
    try {
      // Simulate AI integration - in production, connect to real AI service
      const aiResponse = await fetch(`https://api.example.com/places/info?q=${encodeURIComponent(placeName)}`, {
        headers: {
          'Authorization': 'Bearer YOUR_AI_API_KEY',
          'Content-Type': 'application/json'
        }
      });
      
      if (aiResponse.ok) {
        return await aiResponse.json();
      }
    } catch (error) {
      console.log('AI service unavailable, using fallback data');
      return null;
    }
  };

  // Get travel website information
  const getTravelWebsiteInfo = async (placeName) => {
    const websites = [
      { name: 'TripAdvisor', url: `https://www.tripadvisor.com/Search?q=${encodeURIComponent(placeName)}` },
      { name: 'MakeMyTrip', url: `https://www.makemytrip.com/hotels/${encodeURIComponent(placeName)}` },
      { name: 'Goibibo', url: `https://www.goibibo.com/hotels/search.html?keyword=${encodeURIComponent(placeName)}` },
      { name: 'Cleartrip', url: `https://www.cleartrip.com/hotels/${encodeURIComponent(placeName)}` },
      { name: 'Yatra', url: `https://www.yatra.com/hotels/${encodeURIComponent(placeName)}` }
    ];
    return websites;
  };

  // Debounced search
  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      searchPlaces(query);
    }, 300);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [query, searchPlaces]);

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onChange(value);
  };

  // Handle place selection
  const handlePlaceSelect = (place) => {
    setQuery(place.displayName);
    onChange(place.displayName);
    onSelect(place);
    saveToRecentSearches(place);
    setShowSuggestions(false);
    setError('');
  };

  // Get current location
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Reverse geocoding to get place name
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`,
            {
              headers: {
                'User-Agent': 'TravelPlannerPro/1.0'
              }
            }
          );
          
          if (response.ok) {
            const data = await response.json();
            const place = {
              id: 'current-location',
              name: data.display_name || 'Current Location',
              displayName: data.address?.city || data.address?.town || data.address?.village || 'Current Location',
              lat: latitude,
              lng: longitude,
              address: data.address,
              type: 'current_location',
              icon: '📍'
            };
            handlePlaceSelect(place);
          } else {
            // Fallback to coordinates
            const place = {
              id: 'current-location',
              name: 'Current Location',
              displayName: 'Current Location',
              lat: latitude,
              lng: longitude,
              address: {},
              type: 'current_location',
              icon: '📍'
            };
            handlePlaceSelect(place);
          }
        } catch (error) {
          console.error('Reverse geocoding failed:', error);
          // Fallback to coordinates
          const place = {
            id: 'current-location',
            name: 'Current Location',
            displayName: 'Current Location',
            lat: latitude,
            lng: longitude,
            address: {},
            type: 'current_location',
            icon: '📍'
          };
          handlePlaceSelect(place);
        }
        setLoading(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        setError('Unable to get your location. Please check permissions.');
        setLoading(false);
      }
    );
  };

  // Voice search functionality
  const startVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setError('Voice search is not supported in your browser');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-IN';

    recognition.onstart = () => {
      setIsListening(true);
      setError('');
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      onChange(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setError('Voice search failed. Please try again.');
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  // Stop voice search
  const stopVoiceSearch = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  // Get nearby places (simplified version)
  const getNearbyPlaces = async () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Search for nearby places around current location
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?q=amenities&format=json&addressdetails=1&limit=10&viewbox=${longitude-0.1},${latitude+0.1},${longitude+0.1},${latitude-0.1}`,
            {
              headers: {
                'User-Agent': 'TravelPlannerPro/1.0'
              }
            }
          );
          
          if (response.ok) {
            const data = await response.json();
            const places = data.map(place => ({
              id: place.place_id,
              name: place.display_name,
              displayName: place.display_name.split(',')[0].trim(),
              lat: parseFloat(place.lat),
              lng: parseFloat(place.lon),
              address: place.address,
              type: place.type,
              importance: place.importance || 0,
              icon: getPlaceIcon(place.class, place.type)
            }));
            setNearbyPlaces(places);
            setShowSuggestions(true);
          }
        } catch (error) {
          console.error('Error getting nearby places:', error);
          setError('Unable to find nearby places.');
        }
        setLoading(false);
      },
      (error) => {
        console.error('Error getting location for nearby places:', error);
        setError('Unable to get your location for nearby places.');
        setLoading(false);
      }
    );
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        // Implement arrow down logic
        break;
      case 'ArrowUp':
        e.preventDefault();
        // Implement arrow up logic
        break;
      case 'Enter':
        e.preventDefault();
        // Select first suggestion
        if (suggestions.length > 0) {
          handlePlaceSelect(suggestions[0]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        break;
    }
  };

  // Click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`location-search ${className}`} ref={searchRef}>
      <div className="search-input-container">
        <Search className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length >= 2 && setShowSuggestions(true)}
          disabled={disabled}
        />
        {loading && <Loader2 className="loading-spinner" />}
        
        {/* Action Buttons */}
        <div className="search-actions">
          {/* Current Location Button */}
          <button
            className="action-button location-button"
            onClick={getCurrentLocation}
            disabled={disabled || loading}
            title="Use current location"
          >
            <Navigation className="action-icon" />
          </button>
          
          {/* Voice Search Button */}
          <button
            className={`action-button voice-button ${isListening ? 'listening' : ''}`}
            onClick={isListening ? stopVoiceSearch : startVoiceSearch}
            disabled={disabled || loading}
            title={isListening ? "Stop voice search" : "Start voice search"}
          >
            {isListening ? (
              <div className="voice-indicator">
                <span className="voice-dot"></span>
                <span className="voice-dot"></span>
                <span className="voice-dot"></span>
              </div>
            ) : (
              <Mic className="action-icon" />
            )}
          </button>
          
          {/* Nearby Places Button */}
          <button
            className="action-button nearby-button"
            onClick={getNearbyPlaces}
            disabled={disabled || loading}
            title="Find nearby places"
          >
            <MapPin className="action-icon" />
          </button>
          
          {/* Clear Button */}
          {query && (
            <button
              className="action-button clear-button"
              onClick={() => {
                setQuery('');
                onChange('');
                setSuggestions([]);
                setShowSuggestions(false);
                setError('');
              }}
              title="Clear search"
            >
              ×
            </button>
          )}
        </div>
      </div>
      
      {/* Error State */}
      {error && (
        <div className="error-state">
          <AlertCircle className="error-icon" />
          <span>{error}</span>
        </div>
      )}

      {/* Quick Chips - Popular Kerala Destinations */}
      {!query && showQuickChips && popularKeralaDestinations.length > 0 && (
        <div className="quick-chips">
          <div className="chips-header">
            <Star className="chips-icon" />
            <span>Popular Kerala Destinations</span>
            <button
              className="chips-toggle"
              onClick={() => setShowQuickChips(!showQuickChips)}
            >
              ×
            </button>
          </div>
          <div className="chips-container">
            {popularKeralaDestinations.map((destination, index) => (
              <button
                key={index}
                className="chip-button"
                onClick={() => {
                  const place = {
                    id: `popular-${index}`,
                    name: destination.displayName,
                    displayName: destination.displayName,
                    address: { state: 'Kerala' },
                    type: destination.type,
                    icon: '🌴'
                  };
                  handlePlaceSelect(place);
                }}
              >
                {destination.displayName}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <div className="suggestions-dropdown">
          {loading ? (
            <div className="loading-state">
              <Loader2 className="spinner" />
              <span>Searching...</span>
            </div>
          ) : suggestions.length === 0 && nearbyPlaces.length === 0 && recentSearches.length === 0 ? (
            <div className="no-results">
              <MapPin className="no-results-icon" />
              <span>No places found</span>
              <p>Try different keywords or check spelling</p>
            </div>
          ) : (
            <div className="suggestions-list">
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div className="suggestions-section">
                  <div className="section-header">
                    <Clock className="section-icon" />
                    <span>Recent Searches</span>
                  </div>
                  {recentSearches.map((place, index) => (
                    <div
                      key={`recent-${place.id}`}
                      className="suggestion-item recent-item"
                      onClick={() => handlePlaceSelect(place)}
                    >
                      <div className="suggestion-icon">
                        <span>{place.icon}</span>
                      </div>
                      <div className="suggestion-content">
                        <div className="suggestion-name">
                          {place.displayName}
                        </div>
                        <div className="suggestion-details">
                          {place.address?.state && (
                            <span>{place.address.state}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Nearby Places */}
              {nearbyPlaces.length > 0 && (
                <div className="suggestions-section">
                  <div className="section-header">
                    <MapPin className="section-icon" />
                    <span>Nearby Places</span>
                  </div>
                  {nearbyPlaces.map((place, index) => (
                    <div
                      key={`nearby-${place.id}`}
                      className="suggestion-item nearby-item"
                      onClick={() => handlePlaceSelect(place)}
                    >
                      <div className="suggestion-icon">
                        <span>{place.icon}</span>
                      </div>
                      <div className="suggestion-content">
                        <div className="suggestion-name">
                          {place.displayName}
                        </div>
                        <div className="suggestion-details">
                          {place.address?.city && (
                            <span>{place.address.city}</span>
                          )}
                          {place.address?.district && (
                            <span>{place.address.district}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Search Results */}
              {suggestions.length > 0 && (
                <div className="suggestions-section">
                  <div className="section-header">
                    <Search className="section-icon" />
                    <span>Search Results</span>
                  </div>
                  {suggestions.map((place, index) => (
                    <div
                      key={place.id}
                      className="suggestion-item search-result-item"
                      onClick={() => handlePlaceSelect(place)}
                    >
                      <div className="suggestion-icon">
                        <span>{place.icon}</span>
                      </div>
                      <div className="suggestion-content">
                        <div className="suggestion-name">
                          {place.displayName}
                          {place.isFuzzy && <span className="fuzzy-badge">Similar</span>}
                        </div>
                        <div className="suggestion-details">
                          {place.address?.city && place.address?.city !== place.displayName && (
                            <span>{place.address.city}</span>
                          )}
                          {place.address?.district && (
                            <span>{place.address.district}</span>
                          )}
                          {place.address?.state && (
                            <span>{place.address.state}</span>
                          )}
                        </div>
                        
                        {/* External Links */}
                        <div className="external-links">
                          <button
                            className="external-link-btn ai-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              // AI info would open modal with detailed information
                              alert('AI integration coming soon! This will show detailed place information, weather, and recommendations.');
                            }}
                            title="Get AI-powered insights"
                          >
                            🤖 AI Info
                          </button>
                          <button
                            className="external-link-btn web-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Open travel websites
                              const websites = getTravelWebsiteInfo(place.displayName);
                              if (websites && websites.length > 0) {
                                // Open first website in new tab
                                window.open(websites[0].url, '_blank');
                              }
                            }}
                            title="Search on travel websites"
                          >
                            🌐 Travel Sites
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LocationSearchAutocomplete;
