import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  MapPin,
  Calendar,
  Users,
  Wallet,
  Search,
  LogOut,
  Plane,
  Hotel,
  Compass,
  ChevronRight,
  Star,
  Clock,
  TrendingUp,
  User,
  Save,
  History,
  X,
  Shield,
  Bus,
  Train,
  Bike,
  Car,
  Loader2,
} from "lucide-react";
import FullScreenMap from "../components/FullScreenMap";
// import IndiaPlaceSearch from "../components/IndiaPlaceSearch";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [cities, setCities] = useState([]);
  const [myTrips, setMyTrips] = useState([]);
  const [loading, setLoading] = useState(false);

  // Trip planner states
  const [fromCity, setFromCity] = useState("");
  const [fromLocation, setFromLocation] = useState(null);
  const [toCity, setToCity] = useState("");
  const [toLocation, setToLocation] = useState(null);
  const [days, setDays] = useState("");
  const [budget, setBudget] = useState("");
  const [peopleCount, setPeopleCount] = useState("1");
  const [transportMode, setTransportMode] = useState("bus");
  const [tripResult, setTripResult] = useState(null);
  const [citySearch, setCitySearch] = useState("");
  const [showMap, setShowMap] = useState(false);

  // Transport options with costs per person
  const transportOptions = [
    { id: "bus", name: "Bus", icon: Bus, cost: 500, color: "#3b82f6" },
    { id: "train", name: "Train", icon: Train, cost: 800, color: "#22c55e" },
    { id: "car", name: "Car", icon: Car, cost: 1500, color: "#f59e0b" },
    { id: "bike", name: "Bike", icon: Bike, cost: 300, color: "#a855f7" },
    { id: "airplane", name: "Airplane", icon: Plane, cost: 5000, color: "#ef4444" },
  ];

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) {
      navigate("/");
      return;
    }

    try {
      const user = JSON.parse(savedUser);
      if (user.isAdmin) {
        navigate("/admin");
        return;
      }

      setCurrentUser(user);
      // Cities are no longer loaded from database - using live search instead
      setCities([]);
      
      // Load trips in background to not block main page
      setTimeout(() => {
        loadMyTrips(user.id);
      }, 100);
    } catch (error) {
      console.error("User data error:", error);
      localStorage.removeItem("user");
      navigate("/");
    }
  }, [navigate]);

  const loadMyTrips = async (userId) => {
    try {
      const tripsRes = await axios.get(
        `http://localhost:5000/my-trips/${userId}`
      );
      setMyTrips(tripsRes.data || []);
    } catch (error) {
      console.log("Error loading trips:", error);
      // Don't block page load if trips fail to load
      setMyTrips([]);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  // Calculate costs for all transport modes
  const calculateAllTransportOptions = (distance, totalPeople, totalDays, avgDailyBudget) => {
    const costPerKm = {
      bus: 2,
      train: 1.5,
      car: 8,
      bike: 1,
      airplane: 15
    };

    const baseCosts = {
      hotel: Math.round(totalDays * (avgDailyBudget * 0.6) * totalPeople),
      food: Math.round(totalDays * (avgDailyBudget * 0.25) * totalPeople),
      sightseeing: Math.round(totalDays * (avgDailyBudget * 0.15) * totalPeople)
    };

    return transportOptions.map(option => {
      let transportCostPerPerson;
      if (distance > 0) {
        transportCostPerPerson = Math.round(distance * (costPerKm[option.id] || 2));
      } else {
        transportCostPerPerson = option.cost;
      }
      const transportCost = transportCostPerPerson * totalPeople;
      const totalCost = baseCosts.hotel + baseCosts.food + baseCosts.sightseeing + transportCost;
      
      return {
        ...option,
        transportCost,
        transportCostPerPerson,
        totalCost,
        baseCosts
      };
    }).sort((a, b) => a.totalCost - b.totalCost);
  };

  // Find budget-friendly alternatives
  const findBudgetAlternatives = (fromCityData, toCityData, budget, days, people) => {
    const alternatives = [];
    
    // Find nearby cities (same state or neighboring)
    const nearbyCities = cities.filter(city => {
      if (city.id === fromCityData.id || city.id === toCityData.id) return false;
      // Same state or popular tourist destinations
      return city.state_name === fromCityData.state_name ||
             city.state_name === toCityData.state_name ||
             city.avg_budget_per_day < 2000; // Budget-friendly cities
    }).slice(0, 5);

    nearbyCities.forEach(city => {
      const dailyBudget = city.avg_budget_per_day || 1500;
      const hotel = Math.round(days * (dailyBudget * 0.6) * people);
      const food = Math.round(days * (dailyBudget * 0.25) * people);
      const sightseeing = Math.round(days * (dailyBudget * 0.15) * people);
      const transport = 500 * people; // Estimated
      const total = hotel + food + sightseeing + transport;
      
      if (total <= budget) {
        alternatives.push({
          city,
          totalCost: total,
          savings: budget - total
        });
      }
    });

    return alternatives.sort((a, b) => a.totalCost - b.totalCost).slice(0, 3);
  };

  const createTripPlan = async () => {
    if (!fromCity || !toCity || !days || !budget || !peopleCount) {
      alert("Please fill all fields");
      return;
    }

    if (!fromLocation || !toLocation) {
      alert("Please select valid locations from the search suggestions");
      return;
    }

    setLoading(true);

    try {
      const totalDays = Number(days);
      const totalBudget = Number(budget);
      const totalPeople = Number(peopleCount);

      // Use selected location data directly - no database validation needed
      const fromCityData = {
        id: 1,
        city_name: fromLocation.displayName,
        state_name: fromLocation.address?.state || 'Unknown',
        avg_budget_per_day: 1500 // Default budget
      };

      const toCityData = {
        id: 2,
        city_name: toLocation.displayName,
        state_name: toLocation.address?.state || 'Unknown',
        avg_budget_per_day: 1500 // Default budget
      };

      // Calculate distance between coordinates using Haversine formula
      let distance = 0;
      if (fromLocation.lat && fromLocation.lng && toLocation.lat && toLocation.lng) {
        const R = 6371; // Earth's radius in km
        const dLat = (toLocation.lat - fromLocation.lat) * Math.PI / 180;
        const dLon = (toLocation.lng - fromLocation.lng) * Math.PI / 180;
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(fromLocation.lat * Math.PI / 180) * Math.cos(toLocation.lat * Math.PI / 180) *
          Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        distance = R * c;
      }

      // Calculate city-specific costs based on avg_budget_per_day
      const fromCityDailyBudget = fromCityData.avg_budget_per_day || 1500;
      const toCityDailyBudget = toCityData.avg_budget_per_day || 1500;
      const avgDailyBudget = (fromCityDailyBudget + toCityDailyBudget) / 2;

      // Calculate costs based on actual data
      const hotelCost = Math.round(totalDays * (avgDailyBudget * 0.6) * totalPeople); // 60% of daily budget for hotel
      const foodCost = Math.round(totalDays * (avgDailyBudget * 0.25) * totalPeople); // 25% for food
      const sightseeingCost = Math.round(totalDays * (avgDailyBudget * 0.15) * totalPeople); // 15% for activities

      // Calculate transport cost based on distance and mode
      const selectedTransport = transportOptions.find(t => t.id === transportMode);
      let transportCostPerPerson = selectedTransport ? selectedTransport.cost : 500;

      // If we have actual distance, calculate more accurate transport cost
      if (distance > 0) {
        const costPerKm = {
          bus: 2,
          train: 1.5,
          car: 8,
          bike: 1,
          airplane: 15
        };
        transportCostPerPerson = Math.round(distance * (costPerKm[transportMode] || 2));
      }

      const transportCost = transportCostPerPerson * totalPeople;
      const estimatedTotal = hotelCost + foodCost + transportCost + sightseeingCost;
      const remaining = totalBudget - estimatedTotal;

      // Budget status with detailed recommendations
      let status = "";
      let statusColor = "";
      let recommendation = "";

      if (remaining < 0) {
        const deficit = Math.abs(remaining);
        status = "Budget Insufficient";
        statusColor = "red";
        recommendation = `You need ₹${deficit.toLocaleString()} more. Consider: \n• Reducing days to ${Math.floor(totalBudget / (estimatedTotal / totalDays))}\n• Choosing cheaper transport (Bus/Bike)\n• Selecting a nearby destination`;
      } else if (remaining < totalBudget * 0.1) {
        status = "Tight Budget";
        statusColor = "orange";
        recommendation = "Budget is tight. Keep some buffer for unexpected expenses.";
      } else if (remaining > totalBudget * 0.3) {
        status = "Excellent Budget!";
        statusColor = "blue";
        recommendation = `You have ₹${remaining.toLocaleString()} extra! You can:\n• Upgrade hotel\n• Add more days\n• Try activities/excursions`;
      } else {
        status = "Perfect Budget";
        statusColor = "green";
        recommendation = "Your budget is well planned for this trip!";
      }

      // Calculate all transport options for comparison
      const allTransportOptions = calculateAllTransportOptions(distance, totalPeople, totalDays, avgDailyBudget);
      
      // Find budget-friendly alternatives if current trip is over budget
      let budgetAlternatives = [];
      if (remaining < 0) {
        budgetAlternatives = findBudgetAlternatives(fromCityData, toCityData, totalBudget, totalDays, totalPeople);
      }

      setTripResult({
        fromCity,
        toCity,
        fromCityData,
        toCityData,
        totalDays,
        totalBudget,
        totalPeople,
        transportMode,
        transportName: selectedTransport?.name || "Bus",
        distance,
        routeFound: !!routeData,
        hotelCost,
        foodCost,
        transportCost,
        sightseeingCost,
        estimatedTotal,
        remaining,
        status,
        statusColor,
        recommendation,
        allTransportOptions,
        budgetAlternatives,
        bestTransport: allTransportOptions[0], // Cheapest option
      });

    } catch (error) {
      console.error("Error creating trip plan:", error);
      alert("Failed to create trip plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const saveTrip = async () => {
    if (!tripResult) return;

    try {
      setLoading(true);
      await axios.post("http://localhost:5000/trips", {
        user_id: currentUser.id,
        from_city_id: 1,
        to_city_id: 2,
        budget: tripResult.totalBudget,
        days: tripResult.totalDays,
        people_count: tripResult.totalPeople,
        trip_type: "family",
        transport_mode: tripResult.transportMode,
        total_estimated_cost: tripResult.estimatedTotal,
      });

      alert("Trip saved successfully!");
      loadMyTrips(currentUser.id);
      setTripResult(null);
      setFromCity("");
      setFromLocation(null);
      setToCity("");
      setToLocation(null);
      setDays("");
      setBudget("");
      setPeopleCount("1");
      setTransportMode("bus");
    } catch (error) {
      alert("Failed to save trip");
    } finally {
      setLoading(false);
    }
  };

  // Always render dashboard - authentication handled in useEffect

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <Plane className="brand-logo" />
          <span>TripPlanner</span>
        </div>

        <nav className="sidebar-nav">
          <a href="#planner" className="nav-item active">
            <Compass className="nav-icon" />
            <span>Trip Planner</span>
          </a>
          <a href="#cities" className="nav-item">
            <MapPin className="nav-icon" />
            <span>Explore Cities</span>
          </a>
          <a href="#trips" className="nav-item">
            <History className="nav-icon" />
            <span>My Trips</span>
          </a>
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">
              <User />
            </div>
            <div className="user-details">
              <p className="user-name">{currentUser.name}</p>
              <p className="user-email">{currentUser.email}</p>
            </div>
          </div>
          <button className="logout-btn" onClick={logout}>
            <LogOut className="logout-icon" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="dashboard-header">
          <h1>Plan Your Next Adventure</h1>
          <p>Discover, plan, and track your perfect trip</p>
        </header>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon blue">
              <MapPin />
            </div>
            <div className="stat-info">
              <h3>{cities.length}</h3>
              <p>Destinations</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon green">
              <Plane />
            </div>
            <div className="stat-info">
              <h3>{myTrips.length}</h3>
              <p>My Trips</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon purple">
              <Wallet />
            </div>
            <div className="stat-info">
              <h3>
                ₹
                {myTrips.reduce(
                  (sum, trip) => sum + (trip.total_estimated_cost || 0),
                  0
                )}
              </h3>
              <p>Total Spent</p>
            </div>
          </div>
        </div>

        {/* Trip Planner Section */}
        <section id="planner" className="planner-section">
          <div className="section-header">
            <Compass className="section-icon" />
            <h2>Smart Trip Planner</h2>
          </div>

          <div className="planner-card">
            <div className="planner-form">
              <div className="form-row">
                <div className="form-group">
                  <label>
                    <MapPin className="label-icon" />
                    From Location
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Enter departure location..."
                    value={fromCity}
                    onChange={(e) => setFromCity(e.target.value)}
                    disabled={loading}
                  />
                </div>
                <div className="form-group">
                  <label>
                    <MapPin className="label-icon" />
                    To Location
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Enter destination..."
                    value={toCity}
                    onChange={(e) => setToCity(e.target.value)}
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>
                    <Calendar className="label-icon" />
                    Duration (Days)
                  </label>
                  <input
                    type="number"
                    placeholder="Number of days"
                    value={days}
                    onChange={(e) => setDays(e.target.value)}
                    min="1"
                  />
                </div>
                <div className="form-group">
                  <label>
                    <Users className="label-icon" />
                    Travelers
                  </label>
                  <input
                    type="number"
                    placeholder="Number of people"
                    value={peopleCount}
                    onChange={(e) => setPeopleCount(e.target.value)}
                    min="1"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group full-width">
                  <label>
                    <Wallet className="label-icon" />
                    Budget (₹)
                  </label>
                  <input
                    type="number"
                    placeholder="Enter your budget"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    min="1"
                  />
                </div>
              </div>

              {/* Transport Mode Selection */}
              <div className="transport-section">
                <label className="transport-label">
                  <Plane className="label-icon" />
                  Select Transportation
                </label>
                <div className="transport-options">
                  {transportOptions.map((option) => {
                    const IconComponent = option.icon;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        className={`transport-btn ${transportMode === option.id ? "active" : ""}`}
                        onClick={() => setTransportMode(option.id)}
                        style={{
                          borderColor: transportMode === option.id ? option.color : undefined,
                          background: transportMode === option.id ? `${option.color}20` : undefined,
                        }}
                      >
                        <IconComponent
                          className="transport-icon"
                          style={{ color: option.color }}
                        />
                        <span className="transport-name">{option.name}</span>
                        <span className="transport-cost">₹{option.cost}/person</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                className="plan-btn"
                onClick={createTripPlan}
                disabled={loading}
              >
                <Search className="btn-icon" />
                {loading ? "Planning..." : "Plan My Trip"}
              </button>
            </div>

            {/* Trip Result */}
            {tripResult && (
              <div className="trip-result">
                <div className="result-header">
                  <h3>
                    <Plane className="result-icon" />
                    {tripResult.fromCity} → {tripResult.toCity}
                  </h3>
                  <button
                    className="close-btn"
                    onClick={() => setTripResult(null)}
                  >
                    <X />
                  </button>
                </div>

                {/* Route Info */}
                {tripResult.routeFound && (
                  <div className="route-info">
                    <div className="route-badge">
                      <MapPin className="route-icon" />
                      <span>Verified Route Found</span>
                    </div>
                  </div>
                )}

                <div className="result-details">
                  <div className="detail-row">
                    <span className="detail-label">Duration:</span>
                    <span className="detail-value">
                      {tripResult.totalDays} days
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Travelers:</span>
                    <span className="detail-value">
                      {tripResult.totalPeople} people
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Transport:</span>
                    <span className="detail-value transport-value">
                      {tripResult.transportName}
                    </span>
                  </div>
                  {tripResult.distance > 0 && (
                    <div className="detail-row">
                      <span className="detail-label">Distance:</span>
                      <span className="detail-value">
                        {tripResult.distance} km
                      </span>
                    </div>
                  )}
                </div>

                <div className="cost-breakdown">
                  <h4>Cost Breakdown</h4>
                  <div className="cost-item">
                    <span>
                      <Hotel className="cost-icon" /> Accommodation
                    </span>
                    <span>₹{tripResult.hotelCost}</span>
                  </div>
                  <div className="cost-item">
                    <span>
                      <Clock className="cost-icon" /> Food & Dining
                    </span>
                    <span>₹{tripResult.foodCost}</span>
                  </div>
                  <div className="cost-item">
                    <span>
                      <Plane className="cost-icon" /> Transport
                    </span>
                    <span>₹{tripResult.transportCost}</span>
                  </div>
                  <div className="cost-item">
                    <span>
                      <Compass className="cost-icon" /> Sightseeing
                    </span>
                    <span>₹{tripResult.sightseeingCost}</span>
                  </div>
                </div>

                <div className="result-summary">
                  <div className="summary-row">
                    <span>Total Estimated:</span>
                    <span className="total-cost">
                      ₹{tripResult.estimatedTotal}
                    </span>
                  </div>
                  <div className="summary-row">
                    <span>Your Budget:</span>
                    <span>₹{tripResult.totalBudget}</span>
                  </div>
                  <div className="summary-row">
                    <span>Remaining:</span>
                    <span
                      className={`remaining ${tripResult.remaining < 0 ? "negative" : "positive"}`}
                    >
                      ₹{tripResult.remaining}
                    </span>
                  </div>
                </div>

                <div className={`status-badge ${tripResult.statusColor}`}>
                  <TrendingUp className="status-icon" />
                  {tripResult.status}
                </div>

                {/* Recommendations */}
                {tripResult.recommendation && (
                  <div className="recommendation-box">
                    <h4>
                      <Compass className="rec-icon" />
                      Recommendation
                    </h4>
                    <p style={{ whiteSpace: 'pre-line' }}>{tripResult.recommendation}</p>
                  </div>
                )}

                {/* All Transport Options Comparison */}
                {tripResult.allTransportOptions && tripResult.allTransportOptions.length > 0 && (
                  <div className="transport-comparison">
                    <h4>
                      <Plane className="rec-icon" />
                      Best Transport Options (Sorted by Price)
                    </h4>
                    <div className="transport-table">
                      {tripResult.allTransportOptions.map((option, index) => {
                        const IconComponent = option.icon;
                        const isSelected = tripResult.transportMode === option.id;
                        const isBest = index === 0;
                        return (
                          <div 
                            key={option.id} 
                            className={`transport-row ${isSelected ? 'selected' : ''} ${isBest ? 'best' : ''}`}
                          >
                            <div className="transport-info">
                              <IconComponent className="transport-row-icon" style={{ color: option.color }} />
                              <span className="transport-row-name">{option.name}</span>
                              {isBest && <span className="best-badge">CHEAPEST</span>}
                              {isSelected && <span className="selected-badge">SELECTED</span>}
                            </div>
                            <div className="transport-prices">
                              <span className="transport-total">₹{option.totalCost.toLocaleString()}</span>
                              <span className="transport-breakdown">
                                (Transport: ₹{option.transportCost.toLocaleString()})
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    {tripResult.bestTransport && tripResult.bestTransport.id !== tripResult.transportMode && (
                      <p className="savings-tip">
                        💡 Switch to <strong>{tripResult.bestTransport.name}</strong> to save ₹{(tripResult.estimatedTotal - tripResult.bestTransport.totalCost).toLocaleString()}!
                      </p>
                    )}
                  </div>
                )}

                {/* Budget-Friendly Alternatives */}
                {tripResult.budgetAlternatives && tripResult.budgetAlternatives.length > 0 && (
                  <div className="budget-alternatives">
                    <h4>
                      <Wallet className="rec-icon" />
                      Budget-Friendly Destinations Within Your Budget
                    </h4>
                    <div className="alternatives-list">
                      {tripResult.budgetAlternatives.map((alt, index) => (
                        <div key={alt.city.id} className="alternative-card">
                          <div className="alt-rank">#{index + 1}</div>
                          <div className="alt-info">
                            <h5>{alt.city.city_name}</h5>
                            <p>{alt.city.state_name}</p>
                            <span className="alt-season">{alt.city.best_season}</span>
                          </div>
                          <div className="alt-cost">
                            <span className="alt-total">₹{alt.totalCost.toLocaleString()}</span>
                            <span className="alt-savings">Save ₹{alt.savings.toLocaleString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  className="save-trip-btn"
                  onClick={saveTrip}
                  disabled={loading}
                >
                  <Save className="btn-icon" />
                  {loading ? "Saving..." : "Save This Trip"}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Cities Section */}
        <section id="cities" className="cities-section">
          <div className="section-header">
            <MapPin className="section-icon" />
            <h2>Explore Destinations</h2>
            <button 
              className="view-toggle-btn"
              onClick={() => setShowMap(!showMap)}
            >
              {showMap ? "Grid View" : "Map View"}
            </button>
          </div>

          {!showMap && (
            <div className="search-bar">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search cities or states..."
                value={citySearch}
                onChange={(e) => setCitySearch(e.target.value)}
              />
            </div>
          )}

          {showMap ? (
            <div className="map-container">
              <FullScreenMap />
            </div>
          ) : (
            <div className="cities-grid">
              {filteredCities.map((city) => (
                <div key={city.id} className="city-card">
                  <div className="city-image">
                    <MapPin className="city-placeholder" />
                  </div>
                  <div className="city-info">
                    <h3>{city.city_name}</h3>
                    <p>{city.state_name}</p>
                    <div className="city-meta">
                      <span className="budget">
                        <Wallet className="meta-icon" />₹
                        {city.avg_budget_per_day}/day
                      </span>
                      <span className="season">
                        <Star className="meta-icon" />
                        {city.best_season}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* My Trips Section */}
        <section id="trips" className="trips-section">
          <div className="section-header">
            <History className="section-icon" />
            <h2>My Trip History</h2>
          </div>

          <div className="trips-list">
            {myTrips.length === 0 ? (
              <div className="empty-state">
                <Plane className="empty-icon" />
                <p>No trips yet. Start planning your first adventure!</p>
              </div>
            ) : (
              myTrips.map((trip) => (
                <div key={trip.id} className="trip-card">
                  <div className="trip-info">
                    <h4>Trip #{trip.id}</h4>
                    <div className="trip-meta">
                      <span>
                        <Calendar className="meta-icon" />
                        {trip.days} days
                      </span>
                      <span>
                        <Users className="meta-icon" />
                        {trip.people_count} people
                      </span>
                    </div>
                  </div>
                  <div className="trip-cost">
                    <span className="label">Total Cost</span>
                    <span className="amount">₹{trip.total_estimated_cost}</span>
                  </div>
                  <ChevronRight className="trip-arrow" />
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
