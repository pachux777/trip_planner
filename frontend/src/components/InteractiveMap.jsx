import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Search, Loader, MapPin, Navigation, X, Sun, Moon, Layers } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './InteractiveMap.css';

// Fix Leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom marker icon
const createCustomIcon = (color = '#667eea') => {
  return L.divIcon({
    html: `
      <div style="
        background: ${color};
        width: 30px;
        height: 30px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 3px solid white;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          width: 10px;
          height: 10px;
          background: white;
          border-radius: 50%;
          transform: rotate(45deg);
        "></div>
      </div>
    `,
    className: 'custom-marker',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30]
  });
};

// Component to move map to new location
const MapController = ({ center, zoom }) => {
  const map = useMap();
  
  useEffect(() => {
    if (center && center.lat && center.lng) {
      map.setView([center.lat, center.lng], zoom || 13);
    }
  }, [center, zoom, map]);
  
  return null;
};

const InteractiveMap = ({ 
  height = '400px', 
  onLocationSelect,
  defaultCenter = { lat: 20.5937, lng: 78.9629 }, // India center
  defaultZoom = 5,
  showSearch = true,
  darkMode = false 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [mapZoom, setMapZoom] = useState(defaultZoom);
  const [showResults, setShowResults] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(darkMode);
  const [mapStyle, setMapStyle] = useState('standard');
  
  const mapRef = useRef(null);
  const searchRef = useRef(null);
  const debounceTimer = useRef(null);

  // Map tile configurations
  const tileLayers = {
    standard: {
      light: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      dark: 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
      attribution: '© OpenStreetMap contributors'
    },
    satellite: {
      light: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      dark: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: '© Esri'
    },
    terrain: {
      light: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      dark: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      attribution: '© OpenTopoMap'
    }
  };

  // Get current tile URL
  const getCurrentTileUrl = () => {
    const style = tileLayers[mapStyle] || tileLayers.standard;
    return isDarkMode && style.dark ? style.dark : style.light;
  };

  // Search places with Nominatim API
  const searchPlaces = useCallback(async (query) => {
    if (!query || query.length < 2) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=5&countrycodes=in`,
        {
          headers: {
            'User-Agent': 'TravelPlannerPro/1.0'
          }
        }
      );
      
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
      } else {
        // No exact results, try fuzzy search
        await fuzzySearch(query);
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
      setShowResults(true);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fuzzy search for typos
  const fuzzySearch = async (query) => {
    try {
      // Try with common variations and partial matches
      const variations = [
        query,
        query.replace(/\s+/g, ''), // Remove spaces
        query.toLowerCase(),
        query + ' India'
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

      setSearchResults(uniqueResults);
      setShowResults(true);
    } catch (error) {
      setSearchResults([]);
      setShowResults(true);
    }
  };

  // Get place icon based on type
  const getPlaceIcon = (category, type) => {
    const iconMap = {
      'tourism': '🏛️',
      'amenity': '🏢',
      'shop': '🛍️',
      'highway': '🛣️',
      'place': '📍',
      'natural': '🌳',
      'leisure': '🎯',
      'building': '🏠',
      'transport': '🚉',
      'restaurant': '🍽️',
      'hotel': '🏨',
      'attraction': '🎢',
      'museum': '🏛️',
      'park': '🌳',
      'beach': '🏖️',
      'temple': '🛕',
      'airport': '✈️',
      'railway': '🚂',
      'bus': '🚌',
      'hospital': '🏥',
      'school': '🏫',
      'bank': '🏦'
    };

    if (type === 'airport' || category === 'aeroway') return '✈️';
    if (type === 'railway_station' || category === 'railway') return '🚂';
    if (type === 'bus_station' || type === 'bus_stop') return '🚌';
    if (type === 'hotel' || category === 'accommodation') return '🏨';
    if (type === 'restaurant' || category === 'food') return '🍽️';
    if (type === 'beach' || category === 'natural') return '🏖️';
    if (type === 'temple' || type === 'church' || type === 'mosque') return '🛕';
    
    return iconMap[category] || '📍';
  };

  // Handle place selection
  const handlePlaceSelect = (place) => {
    setSelectedLocation(place);
    setMapCenter({ lat: place.lat, lng: place.lng });
    setMapZoom(15);
    setShowResults(false);
    setSearchQuery(place.displayName);
    
    if (onLocationSelect) {
      onLocationSelect(place);
    }
  };

  // Get user location
  const getUserLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
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
      },
      (error) => {
        console.error('Error getting location:', error);
        setLoading(false);
        alert('Unable to get your location. Please check your permissions.');
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
    if (place.address?.state) {
      parts.push(place.address.state);
    }
    return parts.join(', ');
  };

  return (
    <div className="interactive-map-container">
      {/* Search Bar */}
      {showSearch && (
        <div className="map-search-container" ref={searchRef}>
          <div className="search-input-wrapper">
            <Search className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search any place in India..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery.length >= 2 && setShowResults(true)}
            />
            {loading && <Loader className="loading-icon" />}
            {searchQuery && (
              <button
                className="clear-btn"
                onClick={() => {
                  setSearchQuery('');
                  setSearchResults([]);
                  setShowResults(false);
                }}
              >
                <X className="clear-icon" />
              </button>
            )}
          </div>
          
          <button
            className="location-btn"
            onClick={getUserLocation}
            disabled={loading}
            title="Find my location"
          >
            <Navigation className="location-icon" />
          </button>
        </div>
      )}

      {/* Search Results */}
      {showResults && (
        <div className="search-results">
          {loading ? (
            <div className="loading-state">
              <Loader className="spinner" />
              <span>Searching...</span>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="no-results">
              <MapPin className="no-results-icon" />
              <span>No places found for "{searchQuery}"</span>
              <p>Try different keywords or check spelling</p>
            </div>
          ) : (
            <div className="results-list">
              {searchResults.map((place) => (
                <div
                  key={place.id}
                  className="result-item"
                  onClick={() => handlePlaceSelect(place)}
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
                    <div className="result-type">{place.type}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Map Controls */}
      <div className="map-controls">
        <button
          className="control-btn"
          onClick={() => setIsDarkMode(!isDarkMode)}
          title="Toggle dark mode"
        >
          {isDarkMode ? <Sun className="control-icon" /> : <Moon className="control-icon" />}
        </button>
        
        <div className="style-selector">
          <button
            className={`style-btn ${mapStyle === 'standard' ? 'active' : ''}`}
            onClick={() => setMapStyle('standard')}
            title="Standard map"
          >
            🗺️
          </button>
          <button
            className={`style-btn ${mapStyle === 'satellite' ? 'active' : ''}`}
            onClick={() => setMapStyle('satellite')}
            title="Satellite view"
          >
            🛰️
          </button>
          <button
            className={`style-btn ${mapStyle === 'terrain' ? 'active' : ''}`}
            onClick={() => setMapStyle('terrain')}
            title="Terrain view"
          >
            ⛰️
          </button>
        </div>
      </div>

      {/* Map */}
      <div className="map-wrapper" style={{ height }}>
        <MapContainer
          center={[mapCenter.lat, mapCenter.lng]}
          zoom={mapZoom}
          style={{ height: '100%', width: '100%' }}
          ref={mapRef}
        >
          <TileLayer
            url={getCurrentTileUrl()}
            attribution={tileLayers[mapStyle]?.attribution || '© OpenStreetMap contributors'}
          />
          
          <MapController center={mapCenter} zoom={mapZoom} />
          
          {/* Selected Location Marker */}
          {selectedLocation && (
            <Marker
              position={[selectedLocation.lat, selectedLocation.lng]}
              icon={createCustomIcon('#667eea')}
            >
              <Popup>
                <div className="popup-content">
                  <h4>{selectedLocation.displayName}</h4>
                  <p>{selectedLocation.name}</p>
                  {selectedLocation.address && (
                    <div className="popup-address">
                      {selectedLocation.address.city && <span>{selectedLocation.address.city}</span>}
                      {selectedLocation.address.district && <span>, {selectedLocation.address.district}</span>}
                      {selectedLocation.address.state && <span>, {selectedLocation.address.state}</span>}
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
              icon={createCustomIcon('#22c55e')}
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

export default InteractiveMap;
