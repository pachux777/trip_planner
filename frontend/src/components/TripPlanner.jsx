import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, MapPin, Navigation, Car, Train, 
  Bus, Plane, DollarSign, Clock, 
  Calendar, Star, Route, ChevronRight,
  Cloud, Hotel, Utensils, Camera,
  TrendingUp, AlertCircle
} from 'lucide-react';
import './TripPlanner.css';

const TripPlanner = ({ onTripDataChange }) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);
  const [selectedFrom, setSelectedFrom] = useState(null);
  const [selectedTo, setSelectedTo] = useState(null);
  const [tripData, setTripData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedTransport, setSelectedTransport] = useState('train');

  // Call onTripDataChange when trip data is available
  useEffect(() => {
    if (tripData && onTripDataChange) {
      onTripDataChange(tripData);
    }
  }, [tripData, onTripDataChange]);

  // Indian places database
  const indianPlaces = [
    { name: 'Kochi', state: 'Kerala', lat: 9.9312, lng: 76.2673 },
    { name: 'Munnar', state: 'Kerala', lat: 10.0889, lng: 77.0595 },
    { name: 'Bangalore', state: 'Karnataka', lat: 12.9716, lng: 77.5946 },
    { name: 'Kasaragod', state: 'Kerala', lat: 12.4994, lng: 74.8494 },
    { name: 'Goa', state: 'Goa', lat: 15.2993, lng: 74.1240 },
    { name: 'Taj Mahal', state: 'Uttar Pradesh', lat: 27.1751, lng: 78.0421 },
    { name: 'Ooty', state: 'Tamil Nadu', lat: 11.4104, lng: 76.6950 },
    { name: 'Delhi', state: 'Delhi', lat: 28.7041, lng: 77.1025 },
    { name: 'Mumbai', state: 'Maharashtra', lat: 19.0760, lng: 72.8777 },
    { name: 'Hyderabad', state: 'Telangana', lat: 17.3850, lng: 78.4867 },
    { name: 'Chennai', state: 'Tamil Nadu', lat: 13.0827, lng: 80.2707 },
    { name: 'Kolkata', state: 'West Bengal', lat: 22.5726, lng: 88.3639 },
    { name: 'Jaipur', state: 'Rajasthan', lat: 26.9124, lng: 75.7873 },
    { name: 'Manali', state: 'Himachal Pradesh', lat: 32.2396, lng: 77.1887 },
    { name: 'Leh', state: 'Ladakh', lat: 34.1526, lng: 77.5771 },
    { name: 'Shimla', state: 'Himachal Pradesh', lat: 31.1048, lng: 77.1734 }
  ];

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const handleFromSearch = (query) => {
    setFrom(query);
    if (query.length > 2) {
      const filtered = indianPlaces.filter(place => 
        place.name.toLowerCase().includes(query.toLowerCase()) ||
        place.state.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5);
      setFromSuggestions(filtered);
      setShowFromSuggestions(true);
    } else {
      setFromSuggestions([]);
      setShowFromSuggestions(false);
    }
  };

  const handleToSearch = (query) => {
    setTo(query);
    if (query.length > 2) {
      const filtered = indianPlaces.filter(place => 
        place.name.toLowerCase().includes(query.toLowerCase()) ||
        place.state.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5);
      setToSuggestions(filtered);
      setShowToSuggestions(true);
    } else {
      setToSuggestions([]);
      setShowToSuggestions(false);
    }
  };

  const handleFromSelect = (place) => {
    setFrom(place.name);
    setSelectedFrom(place);
    setFromSuggestions([]);
    setShowFromSuggestions(false);
  };

  const handleToSelect = (place) => {
    setTo(place.name);
    setSelectedTo(place);
    setToSuggestions([]);
    setShowToSuggestions(false);
  };

  const generateTripPlan = () => {
    if (!selectedFrom || !selectedTo) {
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const distance = calculateDistance(
        selectedFrom.lat, selectedFrom.lng,
        selectedTo.lat, selectedTo.lng
      );

      const travelTime = Math.round(distance / 60); // Assuming 60 km/h average speed
      
      // Generate realistic cost estimates
      const transportCosts = {
        train: {
          icon: Train,
          name: 'Train',
          cost: Math.round(distance * 2.5),
          duration: `${Math.round(travelTime * 1.5)} hours`,
          comfort: 'Comfortable',
          rating: 4.2
        },
        bus: {
          icon: Bus,
          name: 'Bus',
          cost: Math.round(distance * 1.8),
          duration: `${Math.round(travelTime * 1.8)} hours`,
          comfort: 'Economy',
          rating: 3.8
        },
        flight: {
          icon: Plane,
          name: 'Flight',
          cost: Math.round(distance * 8),
          duration: `${Math.round(travelTime * 0.3)} hours`,
          comfort: 'Premium',
          rating: 4.5
        },
        car: {
          icon: Car,
          name: 'Self Drive',
          cost: Math.round(distance * 4),
          duration: `${travelTime} hours`,
          comfort: 'Flexible',
          rating: 4.0
        }
      };

      const nearbyAttractions = [
        { name: 'Heritage Site', distance: '15 km', rating: 4.6 },
        { name: 'Natural Park', distance: '25 km', rating: 4.4 },
        { name: 'Local Market', distance: '8 km', rating: 4.2 },
        { name: 'Scenic Viewpoint', distance: '30 km', rating: 4.8 }
      ];

      const hotels = [
        { name: 'Budget Hotel', price: Math.round(distance * 50), rating: 4.0, type: 'Budget' },
        { name: 'Mid-Range Hotel', price: Math.round(distance * 120), rating: 4.3, type: 'Mid-Range' },
        { name: 'Luxury Resort', price: Math.round(distance * 250), rating: 4.7, type: 'Luxury' }
      ];

      const weather = {
        temperature: '28°C',
        condition: 'Partly Cloudy',
        humidity: '65%',
        wind: '12 km/h'
      };

      setTripData({
        distance: Math.round(distance),
        duration: travelTime,
        from: selectedFrom,
        to: selectedTo,
        transportOptions: transportCosts,
        nearbyAttractions,
        hotels,
        weather,
        bestRoute: {
          name: 'NH 44 Expressway',
          distance: Math.round(distance * 1.1),
          time: `${Math.round(travelTime * 1.2)} hours`,
          condition: 'Good',
          scenic: false
        },
        alternateRoutes: [
          {
            name: 'Scenic Highway',
            distance: Math.round(distance * 1.3),
            time: `${Math.round(travelTime * 1.4)} hours`,
            condition: 'Good',
            scenic: true
          },
          {
            name: 'Mountain Route',
            distance: Math.round(distance * 1.2),
            time: `${Math.round(travelTime * 1.6)} hours`,
            condition: 'Moderate',
            scenic: true
          }
        ]
      });
      
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="trip-planner">
      <div className="planner-header">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="header-content"
        >
          <h1 className="page-title">
            <Route className="title-icon" />
            Smart Trip Planner
          </h1>
          <p className="page-subtitle">
            Plan your journey with real-time routes and cost estimates
          </p>
        </motion.div>
      </div>

      <div className="planner-content">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="search-section"
        >
          <div className="search-grid">
            <div className="search-input-group">
              <label className="input-label">
                <MapPin size={18} />
                From Location
              </label>
              <div className="input-wrapper">
                <input
                  type="text"
                  value={from}
                  onChange={(e) => handleFromSearch(e.target.value)}
                  onFocus={() => setShowFromSuggestions(true)}
                  placeholder="Enter departure city..."
                  className="search-input"
                />
                {showFromSuggestions && fromSuggestions.length > 0 && (
                  <div className="suggestions-dropdown">
                    {fromSuggestions.map((place, index) => (
                      <div
                        key={index}
                        onClick={() => handleFromSelect(place)}
                        className="suggestion-item"
                      >
                        <div className="suggestion-info">
                          <span className="place-name">{place.name}</span>
                          <span className="place-state">{place.state}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="search-input-group">
              <label className="input-label">
                <Navigation size={18} />
                To Location
              </label>
              <div className="input-wrapper">
                <input
                  type="text"
                  value={to}
                  onChange={(e) => handleToSearch(e.target.value)}
                  onFocus={() => setShowToSuggestions(true)}
                  placeholder="Enter destination..."
                  className="search-input"
                />
                {showToSuggestions && toSuggestions.length > 0 && (
                  <div className="suggestions-dropdown">
                    {toSuggestions.map((place, index) => (
                      <div
                        key={index}
                        onClick={() => handleToSelect(place)}
                        className="suggestion-item"
                      >
                        <div className="suggestion-info">
                          <span className="place-name">{place.name}</span>
                          <span className="place-state">{place.state}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="search-input-group">
              <label className="input-label">
                <Calendar size={18} />
                Travel Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          <button
            onClick={generateTripPlan}
            disabled={!selectedFrom || !selectedTo || loading}
            className="plan-button"
          >
            {loading ? (
              <div className="loading-spinner"></div>
            ) : (
              <>
                <Navigation size={20} />
                Generate Trip Plan
              </>
            )}
          </button>
        </motion.div>

        {tripData && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="trip-results"
          >
            {/* Route Details */}
            <div className="route-details">
              <h2 className="section-title">
                <Route size={20} />
                Route Details
              </h2>
              <div className="route-info">
                <div className="route-stat">
                  <span className="stat-label">Distance</span>
                  <span className="stat-value">{tripData.distance} km</span>
                </div>
                <div className="route-stat">
                  <span className="stat-label">Est. Time</span>
                  <span className="stat-value">{tripData.duration} hours</span>
                </div>
                <div className="route-stat">
                  <span className="stat-label">Best Route</span>
                  <span className="stat-value">{tripData.bestRoute.name}</span>
                </div>
                <div className="route-stat">
                  <span className="stat-label">Road Condition</span>
                  <span className="stat-value good">{tripData.bestRoute.condition}</span>
                </div>
              </div>

              <div className="route-options">
                <h3>Available Routes</h3>
                <div className="routes-grid">
                  <div className="route-card primary">
                    <h4>{tripData.bestRoute.name}</h4>
                    <div className="route-details">
                      <span>{tripData.bestRoute.distance} km</span>
                      <span>{tripData.bestRoute.time}</span>
                    </div>
                    <div className="route-badge recommended">Recommended</div>
                  </div>
                  {tripData.alternateRoutes.map((route, index) => (
                    <div key={index} className="route-card">
                      <h4>{route.name}</h4>
                      <div className="route-details">
                        <span>{route.distance} km</span>
                        <span>{route.time}</span>
                      </div>
                      {route.scenic && (
                        <div className="route-badge scenic">Scenic</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Transportation Options */}
            <div className="transport-section">
              <h2 className="section-title">
                <Car size={20} />
                Transportation Options
              </h2>
              <div className="transport-grid">
                {Object.values(tripData.transportOptions).map((transport, index) => (
                  <div
                    key={index}
                    className={`transport-card ${selectedTransport === transport.name.toLowerCase() ? 'selected' : ''}`}
                    onClick={() => setSelectedTransport(transport.name.toLowerCase())}
                  >
                    <transport.icon className="transport-icon" />
                    <h3>{transport.name}</h3>
                    <div className="transport-details">
                      <div className="transport-cost">₹{transport.cost}</div>
                      <div className="transport-duration">{transport.duration}</div>
                      <div className="transport-comfort">{transport.comfort}</div>
                    </div>
                    <div className="transport-rating">
                      <Star size={14} />
                      {transport.rating}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weather Information */}
            <div className="weather-section">
              <h2 className="section-title">
                <Cloud size={20} />
                Weather at Destination
              </h2>
              <div className="weather-card">
                <div className="weather-main">
                  <div className="temperature">{tripData.weather.temperature}</div>
                  <div className="condition">{tripData.weather.condition}</div>
                </div>
                <div className="weather-details">
                  <div className="weather-detail">
                    <span>Humidity</span>
                    <span>{tripData.weather.humidity}</span>
                  </div>
                  <div className="weather-detail">
                    <span>Wind</span>
                    <span>{tripData.weather.wind}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Nearby Attractions */}
            <div className="attractions-section">
              <h2 className="section-title">
                <Camera size={20} />
                Nearby Attractions
              </h2>
              <div className="attractions-grid">
                {tripData.nearbyAttractions.map((attraction, index) => (
                  <div key={index} className="attraction-card">
                    <h3>{attraction.name}</h3>
                    <div className="attraction-details">
                      <span>{attraction.distance}</span>
                      <div className="attraction-rating">
                        <Star size={14} />
                        {attraction.rating}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hotel Options */}
            <div className="hotels-section">
              <h2 className="section-title">
                <Hotel size={20} />
                Accommodation Options
              </h2>
              <div className="hotels-grid">
                {tripData.hotels.map((hotel, index) => (
                  <div key={index} className="hotel-card">
                    <div className="hotel-type">{hotel.type}</div>
                    <h3>{hotel.name}</h3>
                    <div className="hotel-details">
                      <div className="hotel-price">₹{hotel.price}/night</div>
                      <div className="hotel-rating">
                        <Star size={14} />
                        {hotel.rating}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cost Summary */}
            <div className="cost-summary">
              <h2 className="section-title">
                <DollarSign size={20} />
                Cost Summary
              </h2>
              <div className="summary-card">
                <div className="summary-item">
                  <span>Transportation ({tripData.transportOptions[selectedTransport]?.name})</span>
                  <span>₹{tripData.transportOptions[selectedTransport]?.cost}</span>
                </div>
                <div className="summary-item">
                  <span>Accommodation (Budget Hotel)</span>
                  <span>₹{tripData.hotels[0]?.price}</span>
                </div>
                <div className="summary-item">
                  <span>Food & Local Transport</span>
                  <span>₹{Math.round(tripData.distance * 100)}</span>
                </div>
                <div className="summary-divider"></div>
                <div className="summary-item total">
                  <span>Total Estimated Cost</span>
                  <span>₹{tripData.transportOptions[selectedTransport]?.cost + tripData.hotels[0]?.price + Math.round(tripData.distance * 100)}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TripPlanner;
