import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, MapPin, Navigation, DollarSign, Clock, 
  Calendar, Star, TrendingDown, TrendingUp, 
  Users, Hotel, Utensils, Bus, Train, 
  Car, Bike, ChevronRight, Info, AlertCircle,
  Lightbulb, Wallet, Route, Compass
} from 'lucide-react';
import './BudgetPlanner.css';

const BudgetPlanner = ({ onTripDataChange }) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);
  const [selectedFrom, setSelectedFrom] = useState(null);
  const [selectedTo, setSelectedTo] = useState(null);
  const [tripDuration, setTripDuration] = useState('2');
  const [travelers, setTravelers] = useState('2');
  const [budgetData, setBudgetData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [backpackerMode, setBackpackerMode] = useState(false);

  // Call onTripDataChange when budget data is available
  useEffect(() => {
    if (budgetData && onTripDataChange) {
      onTripDataChange(budgetData);
    }
  }, [budgetData, onTripDataChange]);

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

  // Budget database for different routes
  const budgetDatabase = {
    'Kasaragod-Munnar': {
      distance: 380,
      baseLocation: 'Bangalore',
      transportOptions: {
        bus: { cost: 700, duration: '8 hours', type: 'KSRTC Bus' },
        train: { cost: 850, duration: '10 hours', type: 'Train + Bus' },
        bike: { cost: 1200, duration: '7 hours', type: 'Bike Fuel' },
        sharedTaxi: { cost: 1500, duration: '6 hours', type: 'Shared Taxi' },
        car: { cost: 2500, duration: '6 hours', type: 'Private Car' }
      },
      accommodation: {
        budget: { cost: 800, type: 'Budget Hotel/Guest House' },
        mid: { cost: 1500, type: '3-Star Hotel' },
        luxury: { cost: 3000, type: 'Resort' }
      },
      food: {
        budget: { cost: 400, type: 'Local Restaurants' },
        mid: { cost: 700, type: 'Mid-range Restaurants' },
        luxury: { cost: 1200, type: 'Fine Dining' }
      },
      activities: {
        'Tea Garden Tour': 200,
        'Eravikulam National Park': 300,
        'Mattupetty Dam': 150,
        'Echo Point': 100,
        'Top Station': 400,
        'Kundala Lake': 250
      },
      bestTime: 'Sep - Mar',
      tips: [
        'Book bus tickets in advance for better rates',
        'Try local Kerala food for authentic experience',
        'Stay in Munnar town for cheaper options',
        'Visit tea gardens early morning for best views',
        'Carry warm clothes as evenings are cold'
      ],
      cheapestDay: 'Tuesday',
      sharedJeepAvailable: true,
      hostelsAvailable: true,
      freeSightseeing: ['Tea Garden Views', 'Local Markets', 'Nature Walks']
    },
    'Bangalore-Goa': {
      distance: 560,
      baseLocation: 'Bangalore',
      transportOptions: {
        bus: { cost: 1200, duration: '12 hours', type: 'Sleeper Bus' },
        train: { cost: 1500, duration: '14 hours', type: 'Train' },
        bike: { cost: 2200, duration: '10 hours', type: 'Bike Fuel' },
        sharedTaxi: { cost: 3000, duration: '9 hours', type: 'Shared Taxi' },
        car: { cost: 4500, duration: '9 hours', type: 'Private Car' }
      },
      accommodation: {
        budget: { cost: 600, type: 'Beach Shack/Hostel' },
        mid: { cost: 1500, type: '3-Star Hotel' },
        luxury: { cost: 3500, type: 'Beach Resort' }
      },
      food: {
        budget: { cost: 500, type: 'Beach Shacks' },
        mid: { cost: 800, type: 'Restaurants' },
        luxury: { cost: 1500, type: 'Fine Dining' }
      },
      activities: {
        'Beach Hopping': 0,
        'Dudhsagar Falls': 800,
        'Old Goa Churches': 200,
        'Spice Plantation': 600,
        'Water Sports': 1500,
        'Night Market': 300
      },
      bestTime: 'Nov - Feb',
      tips: [
        'Visit during weekdays for cheaper stays',
        'Try Goan fish curry rice for authentic taste',
        'Rent a scooter for local travel (₹300/day)',
        'North Goa is cheaper than South Goa',
        'Bargain at local markets for best deals'
      ],
      cheapestDay: 'Wednesday',
      sharedJeepAvailable: false,
      hostelsAvailable: true,
      freeSightseeing: ['Beaches', 'Markets', 'Churches']
    },
    'Kochi-Munnar': {
      distance: 130,
      baseLocation: 'Kochi',
      transportOptions: {
        bus: { cost: 400, duration: '4 hours', type: 'KSRTC Bus' },
        train: { cost: 500, duration: '5 hours', type: 'Train + Bus' },
        bike: { cost: 600, duration: '3.5 hours', type: 'Bike Fuel' },
        sharedTaxi: { cost: 1000, duration: '3 hours', type: 'Shared Taxi' },
        car: { cost: 1800, duration: '3 hours', type: 'Private Car' }
      },
      accommodation: {
        budget: { cost: 800, type: 'Budget Hotel' },
        mid: { cost: 1500, type: '3-Star Hotel' },
        luxury: { cost: 3000, type: 'Resort' }
      },
      food: {
        budget: { cost: 400, type: 'Local Restaurants' },
        mid: { cost: 700, type: 'Mid-range Restaurants' },
        luxury: { cost: 1200, type: 'Fine Dining' }
      },
      activities: {
        'Tea Garden Tour': 200,
        'Eravikulam National Park': 300,
        'Mattupetty Dam': 150,
        'Echo Point': 100,
        'Top Station': 400,
        'Kundala Lake': 250
      },
      bestTime: 'Sep - Mar',
      tips: [
        'Book bus tickets in advance for better rates',
        'Try local Kerala food for authentic experience',
        'Stay in Munnar town for cheaper options',
        'Visit tea gardens early morning for best views',
        'Carry warm clothes as evenings are cold'
      ],
      cheapestDay: 'Tuesday',
      sharedJeepAvailable: true,
      hostelsAvailable: true,
      freeSightseeing: ['Tea Garden Views', 'Local Markets', 'Nature Walks']
    }
  };

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

  const generateBudgetPlan = () => {
    if (!selectedFrom || !selectedTo) {
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const routeKey = `${selectedFrom.name}-${selectedTo.name}`;
      const data = budgetDatabase[routeKey] || budgetDatabase['Kasaragod-Munnar']; // Fallback
      
      if (data) {
        const cheapestTransport = Object.entries(data.transportOptions).reduce((min, [key, value]) => 
          value.cost < min.cost ? { key, ...value } : min, 
          { cost: Infinity }
        );

        const baseBudget = {
          transport: cheapestTransport.cost,
          accommodation: backpackerMode ? 400 : data.accommodation.budget.cost,
          food: backpackerMode ? 250 : data.food.budget.cost,
          activities: Object.values(data.activities).reduce((sum, cost) => sum + cost, 0) / 2
        };

        const totalBudget = {
          transport: baseBudget.transport * parseInt(tripDuration),
          accommodation: baseBudget.accommodation * parseInt(tripDuration),
          food: baseBudget.food * parseInt(tripDuration),
          activities: baseBudget.activities,
          total: 0
        };

        totalBudget.total = totalBudget.transport + totalBudget.accommodation + totalBudget.food + totalBudget.activities;
        totalBudget.total = totalBudget.total * (parseInt(travelers) / 2);

        setBudgetData({
          ...data,
          cheapestTransport,
          calculatedBudget: totalBudget,
          distance: data.distance || calculateDistance(
            selectedFrom.lat, selectedFrom.lng,
            selectedTo.lat, selectedTo.lng
          )
        });
      }
      
      setLoading(false);
    }, 1500);
  };

  const getTripPlans = () => {
    if (!budgetData) return [];
    
    const base = budgetData.calculatedBudget;
    return [
      {
        duration: '1 Day',
        budget: Math.round(base.total * 0.6),
        description: 'Quick budget trip with main attractions'
      },
      {
        duration: '2 Days',
        budget: Math.round(base.total),
        description: 'Complete budget experience with all attractions'
      },
      {
        duration: '3 Days',
        budget: Math.round(base.total * 1.3),
        description: 'Extended trip with leisure time'
      }
    ];
  };

  return (
    <div className="budget-planner">
      <div className="planner-header">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="header-content"
        >
          <h1 className="page-title">
            <DollarSign className="title-icon" />
            Budget Friendly Trip Planner
          </h1>
          <p className="page-subtitle">
            Find the cheapest way to explore India
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
                  placeholder="Search starting place..."
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
                  placeholder="Search destination..."
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
                Trip Duration
              </label>
              <select 
                value={tripDuration} 
                onChange={(e) => setTripDuration(e.target.value)}
                className="search-input"
              >
                <option value="1">1 Day</option>
                <option value="2">2 Days</option>
                <option value="3">3 Days</option>
                <option value="5">5 Days</option>
              </select>
            </div>

            <div className="search-input-group">
              <label className="input-label">
                <Users size={18} />
                Travelers
              </label>
              <select 
                value={travelers} 
                onChange={(e) => setTravelers(e.target.value)}
                className="search-input"
              >
                <option value="1">Solo</option>
                <option value="2">Couple</option>
                <option value="4">Family (4)</option>
                <option value="6">Group (6)</option>
              </select>
            </div>
          </div>

          <div className="budget-options">
            <label className="backpacker-toggle">
              <input
                type="checkbox"
                checked={backpackerMode}
                onChange={(e) => setBackpackerMode(e.target.checked)}
              />
              <span className="toggle-label">
                <Wallet size={16} />
                Backpacker Mode (Ultra Low Budget)
              </span>
            </label>
          </div>

          <button
            onClick={generateBudgetPlan}
            disabled={!selectedFrom || !selectedTo || loading}
            className="plan-button"
          >
            {loading ? (
              <div className="loading-spinner"></div>
            ) : (
              <>
                <DollarSign size={20} />
                Generate Budget Plan
              </>
            )}
          </button>
        </motion.div>

        {budgetData && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="budget-results"
          >
            {/* Route Overview */}
            <div className="route-overview">
              <h2 className="section-title">
                <Route size={20} />
                Cheapest Route
              </h2>
              <div className="route-card cheapest">
                <div className="route-header">
                  <div className="route-info">
                    <span className="route-name">{budgetData.cheapestTransport.type}</span>
                    <span className="route-cost">₹{budgetData.cheapestTransport.cost}</span>
                  </div>
                  <div className="route-time">
                    <Clock size={16} />
                    {budgetData.cheapestTransport.duration}
                  </div>
                </div>
                <div className="route-details">
                  <div className="detail-item">
                    <span>Distance</span>
                    <span>{budgetData.distance} km</span>
                  </div>
                  <div className="detail-item">
                    <span>Best Day to Travel</span>
                    <span className="highlight">{budgetData.cheapestDay}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Budget Breakdown */}
            <div className="budget-breakdown">
              <h2 className="section-title">
                <Wallet size={20} />
                Detailed Budget Breakdown
              </h2>
              <div className="breakdown-grid">
                <div className="breakdown-item">
                  <div className="item-header">
                    <Bus className="item-icon" />
                    <span className="item-title">Transportation</span>
                  </div>
                  <div className="item-cost">₹{budgetData.calculatedBudget.transport}</div>
                  <div className="item-details">
                    {Object.entries(budgetData.transportOptions).map(([key, option]) => (
                      <div key={key} className="option-row">
                        <span>{option.type}</span>
                        <span>₹{option.cost}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="breakdown-item">
                  <div className="item-header">
                    <Hotel className="item-icon" />
                    <span className="item-title">Accommodation</span>
                  </div>
                  <div className="item-cost">₹{budgetData.calculatedBudget.accommodation}</div>
                  <div className="item-details">
                    {Object.entries(budgetData.accommodation).map(([key, option]) => (
                      <div key={key} className="option-row">
                        <span>{option.type}</span>
                        <span>₹{option.cost}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="breakdown-item">
                  <div className="item-header">
                    <Utensils className="item-icon" />
                    <span className="item-title">Food</span>
                  </div>
                  <div className="item-cost">₹{budgetData.calculatedBudget.food}</div>
                  <div className="item-details">
                    {Object.entries(budgetData.food).map(([key, option]) => (
                      <div key={key} className="option-row">
                        <span>{option.type}</span>
                        <span>₹{option.cost}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="breakdown-item">
                  <div className="item-header">
                    <Star className="item-icon" />
                    <span className="item-title">Activities</span>
                  </div>
                  <div className="item-cost">₹{Math.round(budgetData.calculatedBudget.activities)}</div>
                  <div className="item-details">
                    {Object.entries(budgetData.activities).map(([name, cost]) => (
                      <div key={name} className="option-row">
                        <span>{name}</span>
                        <span>₹{cost}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="total-budget">
                <div className="total-header">
                  <TrendingUp className="total-icon" />
                  <span>Total Budget</span>
                </div>
                <div className="total-amount">
                  <span className="amount">₹{budgetData.calculatedBudget.total.toLocaleString()}</span>
                  <span className="duration">for {tripDuration} days, {travelers} travelers</span>
                </div>
              </div>
            </div>

            {/* Trip Plans */}
            <div className="trip-plans">
              <h2 className="section-title">
                <Calendar size={20} />
                Trip Plans
              </h2>
              <div className="plans-grid">
                {getTripPlans().map((plan, index) => (
                  <div key={index} className="plan-card">
                    <div className="plan-header">
                      <h4 className="plan-duration">{plan.duration}</h4>
                      <div className="plan-budget">₹{plan.budget.toLocaleString()}</div>
                    </div>
                    <p className="plan-description">{plan.description}</p>
                    <button className="plan-button">
                      Select Plan
                      <ChevronRight size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Money Saving Tips */}
            <div className="money-tips">
              <h2 className="section-title">
                <Lightbulb size={20} />
                Money Saving Tips
              </h2>
              <div className="tips-grid">
                {budgetData.tips.map((tip, index) => (
                  <div key={index} className="tip-item">
                    <div className="tip-icon">💡</div>
                    <span className="tip-text">{tip}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Options */}
            <div className="additional-options">
              <h2 className="section-title">
                <Info size={20} />
                Additional Budget Options
              </h2>
              <div className="options-grid">
                {budgetData.sharedJeepAvailable && (
                  <div className="option-card">
                    <Car className="option-icon" />
                    <h3>Shared Jeep Available</h3>
                    <p>Split costs with other travelers</p>
                    <div className="option-badge">Available</div>
                  </div>
                )}
                
                {budgetData.hostelsAvailable && (
                  <div className="option-card">
                    <Users className="option-icon" />
                    <h3>Hostel Options</h3>
                    <p>Dormitory beds from ₹300/night</p>
                    <div className="option-badge">Budget</div>
                  </div>
                )}

                <div className="option-card">
                  <Compass className="option-icon" />
                  <h3>Free Sightseeing</h3>
                  <p>Explore these places for free</p>
                  <div className="option-list">
                    {budgetData.freeSightseeing.map((place, index) => (
                      <span key={index}>{place}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BudgetPlanner;
