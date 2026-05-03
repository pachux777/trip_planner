import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search, MapPin, Navigation, Loader, X, Globe, Train, Plane, Bus, Hotel, Restaurant, ShoppingBag, Camera, Mountain, Beach, Temple } from 'lucide-react';
import axios from 'axios';
import './LocationSearch.css';

const LocationSearch = ({ 
  placeholder = "Search for any place in India...", 
  onPlaceSelect,
  defaultValue = "",
  showNearMe = true,
  className = ""
}) => {
  const [query, setQuery] = useState(defaultValue);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
  const searchRef = useRef(null);
  const resultsRef = useRef(null);
  const debounceTimer = useRef(null);

  // Load search history from localStorage
  useEffect(() => {
    const history = localStorage.getItem('locationSearchHistory');
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
  }, []);

  // Get user location
  const getUserLocation = useCallback(() => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lon: longitude });
        
        // Get nearby places
        try {
          const response = await axios.get('http://localhost:5000/api/places/nearby', {
            params: { lat: latitude, lon: longitude, radius: 10000 }
          });
          setNearbyPlaces(response.data.results || []);
        } catch (error) {
          console.error('Error getting nearby places:', error);
        }
        
        setLoading(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        setLoading(false);
        alert('Unable to get your location. Please check your permissions.');
      }
    );
  }, []);

  // Search places with debounce
  const searchPlaces = useCallback(async (searchQuery) => {
    if (!searchQuery || searchQuery.length < 2) {
      setResults([]);
      setShowResults(false);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/places/search', {
        params: { q: searchQuery, limit: 10 }
      });
      
      setResults(response.data.results || []);
      setShowResults(true);
      setSelectedIndex(-1);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

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

  // Handle place selection
  const handlePlaceSelect = (place) => {
    setQuery(place.displayName || place.name);
    setShowResults(false);
    
    // Add to search history
    const newHistory = [place, ...searchHistory.filter(h => h.id !== place.id)].slice(0, 5);
    setSearchHistory(newHistory);
    localStorage.setItem('locationSearchHistory', JSON.stringify(newHistory));
    
    if (onPlaceSelect) {
      onPlaceSelect(place);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!showResults || results.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < results.length) {
          handlePlaceSelect(results[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowResults(false);
        setSelectedIndex(-1);
        break;
    }
  };

  // Click outside to close results
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get category icon
  const getCategoryIcon = (category, type) => {
    const iconMap = {
      'tourism': Camera,
      'amenity': Restaurant,
      'shop': ShoppingBag,
      'highway': MapPin,
      'place': MapPin,
      'natural': Mountain,
      'leisure': Camera,
      'transport': Train,
      'restaurant': Restaurant,
      'hotel': Hotel,
      'beach': Beach,
      'temple': Temple,
      'airport': Plane,
      'railway': Train,
      'bus': Bus,
    };

    const Icon = iconMap[category] || MapPin;
    return <Icon className="place-icon" />;
  };

  // Format place display
  const formatPlaceDisplay = (place) => {
    const parts = [];
    if (place.address?.city && place.address?.city !== place.displayName) {
      parts.push(place.address.city);
    }
    if (place.address?.state) {
      parts.push(place.address.state);
    }
    return parts.join(', ');
  };

  return (
    <div className={`location-search ${className}`} ref={searchRef}>
      <div className="search-input-container">
        <div className="search-input-wrapper">
          <Search className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => query.length >= 2 && setShowResults(true)}
          />
          {loading && <Loader className="loading-icon" />}
          {query && (
            <button
              className="clear-btn"
              onClick={() => {
                setQuery('');
                setResults([]);
                setShowResults(false);
              }}
            >
              <X className="clear-icon" />
            </button>
          )}
        </div>
        
        {showNearMe && (
          <button
            className="near-me-btn"
            onClick={getUserLocation}
            disabled={loading}
            title="Find places near me"
          >
            <Navigation className="near-me-icon" />
          </button>
        )}
      </div>

      {/* Search Results */}
      {showResults && (
        <div className="search-results" ref={resultsRef}>
          {/* Loading State */}
          {loading && (
            <div className="loading-state">
              <Loader className="spinner" />
              <span>Searching...</span>
            </div>
          )}

          {/* No Results */}
          {!loading && results.length === 0 && query.length >= 2 && (
            <div className="no-results">
              <MapPin className="no-results-icon" />
              <span>No places found for "{query}"</span>
              <p>Try searching with different keywords or check spelling</p>
            </div>
          )}

          {/* Search Results List */}
          {!loading && results.length > 0 && (
            <div className="results-list">
              {results.map((place, index) => (
                <div
                  key={place.id}
                  className={`result-item ${index === selectedIndex ? 'selected' : ''}`}
                  onClick={() => handlePlaceSelect(place)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  onMouseLeave={() => setSelectedIndex(-1)}
                >
                  <div className="result-icon">
                    {place.icon || getCategoryIcon(place.category, place.type)}
                  </div>
                  <div className="result-content">
                    <div className="result-name">{place.displayName}</div>
                    <div className="result-details">
                      {formatPlaceDisplay(place)}
                    </div>
                    {place.type && (
                      <div className="result-type">{place.type}</div>
                    )}
                  </div>
                  <div className="result-coords">
                    {place.lat.toFixed(4)}, {place.lon.toFixed(4)}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Search History */}
          {!loading && results.length === 0 && searchHistory.length > 0 && query.length < 2 && (
            <div className="search-history">
              <div className="history-header">
                <span>Recent Searches</span>
                <button
                  className="clear-history"
                  onClick={() => {
                    setSearchHistory([]);
                    localStorage.removeItem('locationSearchHistory');
                  }}
                >
                  Clear
                </button>
              </div>
              {searchHistory.map((place, index) => (
                <div
                  key={`history-${place.id}-${index}`}
                  className="result-item history-item"
                  onClick={() => handlePlaceSelect(place)}
                >
                  <div className="result-icon">
                    <MapPin className="history-icon" />
                  </div>
                  <div className="result-content">
                    <div className="result-name">{place.displayName}</div>
                    <div className="result-details">{formatPlaceDisplay(place)}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Nearby Places */}
          {nearbyPlaces.length > 0 && (
            <div className="nearby-places">
              <div className="nearby-header">
                <Navigation className="nearby-header-icon" />
                <span>Nearby Places</span>
              </div>
              {nearbyPlaces.slice(0, 5).map((place, index) => (
                <div
                  key={`nearby-${place.id}-${index}`}
                  className="result-item nearby-item"
                  onClick={() => handlePlaceSelect(place)}
                >
                  <div className="result-icon">
                    {getCategoryIcon(place.category, place.type)}
                  </div>
                  <div className="result-content">
                    <div className="result-name">{place.displayName}</div>
                    <div className="result-details">Near your location</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LocationSearch;
