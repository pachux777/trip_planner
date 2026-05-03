import { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Calendar, Users, DollarSign, Plane, Train, Car, Bus, Bike, ArrowRight, Filter, Star, Clock, TrendingUp, ChevronDown, X, Loader2 } from 'lucide-react';
import './TripSearch.css';

const TripSearch = ({ onSearch, loading }) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState('1');
  const [budget, setBudget] = useState('');
  const [transportMode, setTransportMode] = useState('all');
  const [tripType, setTripType] = useState('oneway');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [popularDestinations, setPopularDestinations] = useState([]);
  const [searching, setSearching] = useState(false);

  const searchRef = useRef(null);

  // Popular destinations
  useEffect(() => {
    setPopularDestinations([
      { city: 'Mumbai', country: 'India', icon: '🏙️', trending: true, code: 'BOM' },
      { city: 'Delhi', country: 'India', icon: '🕌', trending: true, code: 'DEL' },
      { city: 'Bangalore', country: 'India', icon: '🌳', trending: false, code: 'BLR' },
      { city: 'Goa', country: 'India', icon: '🏖️', trending: true, code: 'GOI' },
      { city: 'Kerala', country: 'India', icon: '🌴', trending: false, code: 'COK' },
      { city: 'Rajasthan', country: 'India', icon: '🏰', trending: true, code: 'JAI' },
      { city: 'Varanasi', country: 'India', icon: '🕉️', trending: false, code: 'VNS' },
      { city: 'Agra', country: 'India', icon: '🕌', trending: true, code: 'AGR' }
    ]);

    // Load search history
    const saved = localStorage.getItem('tripSearchHistory');
    if (saved) {
      try {
        setSearchHistory(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading search history:', error);
      }
    }
  }, []);

  // Mock search suggestions
  const handleFromChange = (value) => {
    setFrom(value);
    if (value.length > 2) {
      // Mock suggestions - in real app, this would be an API call
      const mockSuggestions = [
        { name: 'Mumbai, Maharashtra, India', code: 'BOM' },
        { name: 'Delhi, Delhi, India', code: 'DEL' },
        { name: 'Bangalore, Karnataka, India', code: 'BLR' },
        { name: 'Chennai, Tamil Nadu, India', code: 'MAA' },
        { name: 'Kolkata, West Bengal, India', code: 'CCU' }
      ].filter(city => city.name.toLowerCase().includes(value.toLowerCase()));
      setFromSuggestions(mockSuggestions);
    } else {
      setFromSuggestions([]);
    }
  };

  const handleToChange = (value) => {
    setTo(value);
    if (value.length > 2) {
      // Mock suggestions - in real app, this would be an API call
      const mockSuggestions = [
        { name: 'Mumbai, Maharashtra, India', code: 'BOM' },
        { name: 'Delhi, Delhi, India', code: 'DEL' },
        { name: 'Bangalore, Karnataka, India', code: 'BLR' },
        { name: 'Chennai, Tamil Nadu, India', code: 'MAA' },
        { name: 'Kolkata, West Bengal, India', code: 'CCU' }
      ].filter(city => city.name.toLowerCase().includes(value.toLowerCase()));
      setToSuggestions(mockSuggestions);
    } else {
      setToSuggestions([]);
    }
  };

  const handleSearch = () => {
    if (!from || !to || !date) {
      alert('Please fill in all required fields');
      return;
    }

    const searchData = {
      from,
      to,
      date,
      returnDate: tripType === 'roundtrip' ? returnDate : null,
      passengers,
      budget,
      transportMode,
      tripType
    };

    // Save to search history
    const newHistory = [searchData, ...searchHistory.slice(0, 4)];
    setSearchHistory(newHistory);
    localStorage.setItem('tripSearchHistory', JSON.stringify(newHistory));

    // Call parent search function
    if (onSearch) {
      onSearch(searchData);
    }
  };

  const handleQuickSearch = (destination) => {
    setTo(destination.city);
    setToSuggestions([]);
  };

  const handleHistorySearch = (historyItem) => {
    setFrom(historyItem.from);
    setTo(historyItem.to);
    setDate(historyItem.date);
    setReturnDate(historyItem.returnDate || '');
    setPassengers(historyItem.passengers);
    setBudget(historyItem.budget || '');
    setTransportMode(historyItem.transportMode || 'all');
    setTripType(historyItem.tripType || 'oneway');
  };

  const transportModes = [
    { id: 'all', name: 'All', icon: Search, color: '#667eea' },
    { id: 'flight', name: 'Flight', icon: Plane, color: '#3b82f6' },
    { id: 'train', name: 'Train', icon: Train, color: '#22c55e' },
    { id: 'bus', name: 'Bus', icon: Bus, color: '#f59e0b' },
    { id: 'car', name: 'Car', icon: Car, color: '#a855f7' }
  ];

  return (
    <div className="trip-search-container">
      <div className="trip-search-header">
        <h1>Find Your Perfect Trip</h1>
        <p>Search millions of flights, trains, buses, and more</p>
      </div>

      <div className="trip-search-card">
        {/* Trip Type Selector */}
        <div className="trip-type-selector">
          <button
            className={`trip-type-btn ${tripType === 'oneway' ? 'active' : ''}`}
            onClick={() => setTripType('oneway')}
          >
            One Way
          </button>
          <button
            className={`trip-type-btn ${tripType === 'roundtrip' ? 'active' : ''}`}
            onClick={() => setTripType('roundtrip')}
          >
            Round Trip
          </button>
          <button
            className={`trip-type-btn ${tripType === 'multicity' ? 'active' : ''}`}
            onClick={() => setTripType('multicity')}
          >
            Multi City
          </button>
        </div>

        {/* Main Search Form */}
        <div className="search-form">
          {/* Quick Search Options */}
          <div className="quick-search-options">
            <div className="trip-button-container">
              <button 
                className="trip-main-btn"
                onClick={() => {
                  // Show trip options dropdown
                  const dropdown = document.getElementById('trip-options-dropdown');
                  dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
                }}
              >
                <Plane className="trip-icon" />
                Choose Trip
                <ChevronDown className="trip-chevron" />
              </button>
              <div id="trip-options-dropdown" className="trip-options-dropdown">
                <div className="trip-option" onClick={() => {
                  setFrom('Mumbai, Maharashtra, India');
                  setTo('Delhi, Delhi, India');
                  document.getElementById('trip-options-dropdown').style.display = 'none';
                }}>
                  <div className="trip-route">Mumbai → Delhi</div>
                  <div className="trip-details">Business Capital to Political Capital</div>
                </div>
                <div className="trip-option" onClick={() => {
                  setFrom('Bangalore, Karnataka, India');
                  setTo('Goa, India');
                  document.getElementById('trip-options-dropdown').style.display = 'none';
                }}>
                  <div className="trip-route">Bangalore → Goa</div>
                  <div className="trip-details">Silicon Valley to Beach Paradise</div>
                </div>
                <div className="trip-option" onClick={() => {
                  setFrom('Delhi, Delhi, India');
                  setTo('Jaipur, Rajasthan, India');
                  document.getElementById('trip-options-dropdown').style.display = 'none';
                }}>
                  <div className="trip-route">Delhi → Jaipur</div>
                  <div className="trip-details">Capital to Pink City</div>
                </div>
                <div className="trip-option" onClick={() => {
                  setFrom('Chennai, Tamil Nadu, India');
                  setTo('Kerala, India');
                  document.getElementById('trip-options-dropdown').style.display = 'none';
                }}>
                  <div className="trip-route">Chennai → Kerala</div>
                  <div className="trip-details">South India Cultural Tour</div>
                </div>
              </div>
            </div>
          </div>

          <div className="search-row">
            {/* From Location */}
            <div className="search-field">
              <label>From</label>
              <div className="input-with-suggestions">
                <MapPin className="field-icon" />
                <input
                  type="text"
                  placeholder="From: Enter departure city or airport"
                  value={from}
                  onChange={(e) => handleFromChange(e.target.value)}
                  className="search-input"
                />
                {fromSuggestions.length > 0 && (
                  <div className="suggestions-dropdown">
                    {fromSuggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="suggestion-item"
                        onClick={() => {
                          setFrom(suggestion.name);
                          setFromSuggestions([]);
                        }}
                      >
                        <div className="suggestion-main">{suggestion.name}</div>
                        <div className="suggestion-code">{suggestion.code}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Swap Button */}
            <button className="swap-btn" onClick={() => {
              const temp = from;
              setFrom(to);
              setTo(temp);
            }}>
              <ArrowRight className="swap-icon" />
            </button>

            {/* To Location */}
            <div className="search-field">
              <label>To</label>
              <div className="input-with-suggestions">
                <MapPin className="field-icon" />
                <input
                  type="text"
                  placeholder="To: Enter arrival city or airport"
                  value={to}
                  onChange={(e) => handleToChange(e.target.value)}
                  className="search-input"
                />
                {toSuggestions.length > 0 && (
                  <div className="suggestions-dropdown">
                    {toSuggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="suggestion-item"
                        onClick={() => {
                          setTo(suggestion.name);
                          setToSuggestions([]);
                        }}
                      >
                        <div className="suggestion-main">{suggestion.name}</div>
                        <div className="suggestion-code">{suggestion.code}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="search-row">
            {/* Departure Date */}
            <div className="search-field">
              <label>Departure Date</label>
              <div className="input-with-icon">
                <Calendar className="field-icon" />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="search-input"
                  min={new Date().toISOString().split('T')[0]}
                  title="Select departure date"
                />
              </div>
            </div>

            {/* Return Date (for round trip) */}
            {tripType === 'roundtrip' && (
              <div className="search-field">
                <label>Return Date</label>
                <div className="input-with-icon">
                  <Calendar className="field-icon" />
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="search-input"
                    min={date || new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
            )}

            {/* Passengers */}
            <div className="search-field">
              <label>Passengers</label>
              <div className="input-with-icon">
                <Users className="field-icon" />
                <select
                  value={passengers}
                  onChange={(e) => setPassengers(e.target.value)}
                  className="search-input"
                >
                  <option value="1">1 Passenger</option>
                  <option value="2">2 Passengers</option>
                  <option value="3">3 Passengers</option>
                  <option value="4">4 Passengers</option>
                  <option value="5">5+ Passengers</option>
                </select>
              </div>
            </div>
          </div>

          {/* Advanced Options */}
          <div className="advanced-section">
            <button
              className="advanced-toggle"
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              <Filter className="toggle-icon" />
              Advanced Options
              <ChevronDown className={`chevron ${showAdvanced ? 'open' : ''}`} />
            </button>

            {showAdvanced && (
              <div className="advanced-options">
                <div className="advanced-row">
                  {/* Budget */}
                  <div className="search-field">
                    <label>Budget (Optional)</label>
                    <div className="input-with-icon">
                      <DollarSign className="field-icon" />
                      <input
                        type="number"
                        placeholder="Max budget"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="search-input"
                      />
                    </div>
                  </div>

                  {/* Transport Mode */}
                  <div className="search-field">
                    <label>Transport Mode</label>
                    <div className="transport-modes">
                      {transportModes.map((mode) => (
                        <button
                          key={mode.id}
                          className={`transport-mode-btn ${transportMode === mode.id ? 'active' : ''}`}
                          onClick={() => setTransportMode(mode.id)}
                          style={{ '--mode-color': mode.color }}
                        >
                          <mode.icon className="mode-icon" />
                          <span>{mode.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Search Button */}
          <button
            className="search-btn"
            onClick={handleSearch}
            disabled={loading || searching}
          >
            {loading || searching ? (
              <Loader2 className="loading-spinner" />
            ) : (
              <Search className="search-icon" />
            )}
            {loading || searching ? 'Searching...' : 'Search Trips'}
          </button>
        </div>
      </div>

      {/* Popular Destinations */}
      <div className="popular-destinations">
        <h3>
          <TrendingUp className="section-icon" />
          Popular Destinations
        </h3>
        <div className="destinations-grid">
          {popularDestinations.map((dest, index) => (
            <button
              key={index}
              className="destination-card"
              onClick={() => handleQuickSearch(dest)}
            >
              <div className="destination-icon">{dest.icon}</div>
              <div className="destination-info">
                <div className="destination-name">{dest.city}</div>
                <div className="destination-country">{dest.country}</div>
              </div>
              {dest.trending && (
                <div className="trending-badge">
                  <TrendingUp className="trending-icon" />
                  Trending
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Search History */}
      {searchHistory.length > 0 && (
        <div className="search-history">
          <h3>
            <Clock className="section-icon" />
            Recent Searches
          </h3>
          <div className="history-list">
            {searchHistory.map((item, index) => (
              <div
                key={index}
                className="history-item"
                onClick={() => handleHistorySearch(item)}
              >
                <div className="history-route">
                  <span className="history-city">{item.from}</span>
                  <ArrowRight className="history-arrow" />
                  <span className="history-city">{item.to}</span>
                </div>
                <div className="history-details">
                  <span className="history-date">{item.date}</span>
                  {item.returnDate && (
                    <span className="history-return">→ {item.returnDate}</span>
                  )}
                  <span className="history-passengers">{item.passengers} passengers</span>
                </div>
                <button
                  className="history-remove"
                  onClick={(e) => {
                    e.stopPropagation();
                    const newHistory = searchHistory.filter((_, i) => i !== index);
                    setSearchHistory(newHistory);
                    localStorage.setItem('tripSearchHistory', JSON.stringify(newHistory));
                  }}
                >
                  <X className="remove-icon" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TripSearch;
