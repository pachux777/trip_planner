import { useState, useEffect, useRef, useCallback } from 'react';
import { Search, Loader2, MapPin, AlertCircle } from 'lucide-react';
import './IndiaPlaceSearch.css';

const IndiaPlaceSearch = ({ 
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
  const debounceTimer = useRef(null);
  const searchRef = useRef(null);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('indiaRecentSearches');
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
    localStorage.setItem('indiaRecentSearches', JSON.stringify(newRecent));
  };

  // Search all India places using OpenStreetMap Nominatim API
  const searchPlaces = useCallback(async (searchQuery) => {
    if (!searchQuery || searchQuery.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      // Add caching for better performance
      const cacheKey = `search_${searchQuery.toLowerCase()}`;
      const cached = localStorage.getItem(cacheKey);
      
      if (cached) {
        try {
          const cachedData = JSON.parse(cached);
          if (Date.now() - cachedData.timestamp < 300000) { // 5 minutes cache
            setSuggestions(cachedData.results);
            setShowSuggestions(true);
            setLoading(false);
            return;
          }
        } catch (error) {
          console.error('Cache parse error:', error);
          localStorage.removeItem(cacheKey);
        }
      }
      
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery)}&format=json&addressdetails=1&limit=10&countrycodes=in`,
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
          class: place.class,
          importance: place.importance || 0,
          icon: getPlaceIcon(place.class, place.type)
        }));
        
        // Cache results for better performance
        localStorage.setItem(cacheKey, JSON.stringify({
          results,
          timestamp: Date.now()
        }));
        
        setSuggestions(results);
        setShowSuggestions(true);
      } else {
        // Try fuzzy search for typos and variations
        await fuzzySearch(searchQuery);
      }
    } catch (error) {
      console.error('Search error:', error);
      setError('Search network error. Please check connection.');
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
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(variation)}&format=json&addressdetails=1&limit=5&countrycodes=in`,
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
                class: place.class,
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

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        break;
      case 'ArrowUp':
        e.preventDefault();
        break;
      case 'Enter':
        e.preventDefault();
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
    <div className={`india-place-search ${className}`} ref={searchRef}>
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
        {query && (
          <button
            className="clear-button"
            onClick={() => {
              setQuery('');
              onChange('');
              setSuggestions([]);
              setShowSuggestions(false);
              setError('');
            }}
          >
            ×
          </button>
        )}
      </div>
      
      {/* Error State */}
      {error && (
        <div className="error-state">
          <AlertCircle className="error-icon" />
          <span>{error}</span>
        </div>
      )}

      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <div className="suggestions-dropdown">
          {loading ? (
            <div className="loading-state">
              <Loader2 className="spinner" />
              <span>Searching all India places...</span>
            </div>
          ) : suggestions.length === 0 ? (
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
                    <span className="section-icon">🕐</span>
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
              <div className="suggestions-section">
                <div className="section-header">
                  <span className="section-icon">🔍</span>
                  <span>All India Places</span>
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
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default IndiaPlaceSearch;
