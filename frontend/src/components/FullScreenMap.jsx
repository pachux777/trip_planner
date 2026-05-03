import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Search, Loader, MapPin, Navigation, X, AlertCircle } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './FullScreenMap.css';

// Fix Leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom marker icon with modern design
const createCustomMarker = () => {
  return L.divIcon({
    html: `
      <div class="custom-marker">
        <div class="marker-pin">
          <div class="marker-inner"></div>
        </div>
        <div class="marker-shadow"></div>
      </div>
    `,
    className: 'leaflet-div-icon',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
  });
};

// Component to control map view
const MapController = ({ center, zoom }) => {
  const map = useMap();
  
  useEffect(() => {
    if (center && center.lat && center.lng) {
      map.setView([center.lat, center.lng], zoom || 15, {
        animate: true,
        duration: 1
      });
    }
  }, [center, zoom, map]);
  
  return null;
};

const FullScreenMap = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 20.5937, lng: 78.9629 }); // India center
  const [mapZoom, setMapZoom] = useState(5);
  const [showResults, setShowResults] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [searchError, setSearchError] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
  const mapRef = useRef(null);
  const searchRef = useRef(null);
  const debounceTimer = useRef(null);

  // Search places using Nominatim API
  const searchPlaces = useCallback(async (query) => {
    if (!query || query.length < 2) {
      setSearchResults([]);
      setShowResults(false);
      setSearchError('');
      return;
    }

    setLoading(true);
    setSearchError('');
    
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=5&countrycodes=in`,
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
        
        setSearchResults(results);
        setShowResults(true);
        setSelectedIndex(-1);
      } else {
        // Try fuzzy search for typos
        await fuzzySearch(query);
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchError('Unable to search. Please try again.');
      setSearchResults([]);
      setShowResults(true);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fuzzy search for typos and variations
  const fuzzySearch = async (query) => {
    try {
      const variations = [
        query,
        query.toLowerCase(),
        query.replace(/\s+/g, ''), // Remove spaces
        query + ' India',
        query.split(' ').join(', '), // Add commas between words
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
        setSearchResults(uniqueResults);
        setShowResults(true);
      } else {
        setSearchError('No places found. Try different keywords.');
        setSearchResults([]);
        setShowResults(true);
      }
    } catch (error) {
      setSearchError('Search failed. Please check your connection.');
      setSearchResults([]);
      setShowResults(true);
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

  // Handle place selection
  const handlePlaceSelect = (place) => {
    setSelectedLocation(place);
    setMapCenter({ lat: place.lat, lng: place.lng });
    setMapZoom(15);
    setShowResults(false);
    setSearchQuery(place.displayName);
    setSearchError('');
  };

  // Get user location
  const getUserLocation = () => {
    if (!navigator.geolocation) {
      setSearchError('Geolocation is not supported by your browser');
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const userLoc = { lat: latitude, lng: longitude };
        setUserLocation(userLoc);
        setMapCenter(userLoc);
        setMapZoom(15);
        setLoading(false);
        setSearchError('');
      },
      (error) => {
        console.error('Error getting location:', error);
        setSearchError('Unable to get your location. Please check permissions.');
        setLoading(false);
      }
    );
  };

  // Debounced search
  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      searchPlaces(searchQuery);
    }, 300);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [searchQuery, searchPlaces]);

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!showResults || searchResults.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < searchResults.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < searchResults.length) {
          handlePlaceSelect(searchResults[selectedIndex]);
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

  // Format place display
  const formatPlaceDisplay = (place) => {
    const parts = [];
    if (place.address?.city && place.address?.city !== place.displayName) {
      parts.push(place.address.city);
    }
    if (place.address?.district) {
      parts.push(place.address.district);
    }
    if (place.address?.state) {
      parts.push(place.address.state);
    }
    return parts.join(', ');
  };

  return (
    <div className="fullscreen-map-container">
      {/* Search Bar */}
      <div className="search-container" ref={searchRef}>
        <div className="search-wrapper">
          <div className="search-input-container">
            <Search className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search any place in India..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => searchQuery.length >= 2 && setShowResults(true)}
            />
            {loading && <Loader className="loading-spinner" />}
            {searchQuery && (
              <button
                className="clear-button"
                onClick={() => {
                  setSearchQuery('');
                  setSearchResults([]);
                  setShowResults(false);
                  setSearchError('');
                }}
              >
                <X className="clear-icon" />
              </button>
            )}
          </div>
          
          <button
            className="location-button"
            onClick={getUserLocation}
            disabled={loading}
            title="Find my location"
          >
            <Navigation className="location-icon" />
          </button>
        </div>
        
        {/* Search Results */}
        {showResults && (
          <div className="search-results">
            {loading ? (
              <div className="loading-state">
                <Loader className="spinner" />
                <span>Searching...</span>
              </div>
            ) : searchError ? (
              <div className="error-state">
                <AlertCircle className="error-icon" />
                <span>{searchError}</span>
              </div>
            ) : searchResults.length === 0 ? (
              <div className="no-results">
                <MapPin className="no-results-icon" />
                <span>No places found</span>
                <p>Try different keywords or check spelling</p>
              </div>
            ) : (
              <div className="results-list">
                {searchResults.map((place, index) => (
                  <div
                    key={place.id}
                    className={`result-item ${index === selectedIndex ? 'selected' : ''}`}
                    onClick={() => handlePlaceSelect(place)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    onMouseLeave={() => setSelectedIndex(-1)}
                  >
                    <div className="result-icon">
                      <span className="place-icon">{place.icon}</span>
                    </div>
                    <div className="result-content">
                      <div className="result-name">
                        {place.displayName}
                        {place.isFuzzy && <span className="fuzzy-badge">Similar</span>}
                      </div>
                      <div className="result-details">
                        {formatPlaceDisplay(place)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Map */}
      <div className="map-wrapper">
        <MapContainer
          center={[mapCenter.lat, mapCenter.lng]}
          zoom={mapZoom}
          style={{ height: '100vh', width: '100%' }}
          ref={mapRef}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='© OpenStreetMap contributors'
          />
          
          <MapController center={mapCenter} zoom={mapZoom} />
          
          {/* Selected Location Marker */}
          {selectedLocation && (
            <Marker
              position={[selectedLocation.lat, selectedLocation.lng]}
              icon={createCustomMarker()}
            >
              <Popup>
                <div className="popup-content">
                  <h4>{selectedLocation.displayName}</h4>
                  {selectedLocation.address && (
                    <div className="popup-address">
                      {selectedLocation.address.city && (
                        <div className="address-line">{selectedLocation.address.city}</div>
                      )}
                      {selectedLocation.address.district && (
                        <div className="address-line">{selectedLocation.address.district}</div>
                      )}
                      {selectedLocation.address.state && (
                        <div className="address-line">{selectedLocation.address.state}</div>
                      )}
                    </div>
                  )}
                  <div className="popup-coords">
                    {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
                  </div>
                </div>
              </Popup>
            </Marker>
          )}
          
          {/* User Location Marker */}
          {userLocation && (
            <Marker
              position={[userLocation.lat, userLocation.lng]}
              icon={createCustomMarker()}
            >
              <Popup>
                <div className="popup-content">
                  <h4>Your Location</h4>
                  <div className="popup-coords">
                    {userLocation.lat.toFixed(6)}, {userLocation.lng.toFixed(6)}
                  </div>
                </div>
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default FullScreenMap;
