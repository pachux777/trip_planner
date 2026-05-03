import React, { useState, useEffect } from 'react';
import { Search, Wallet, Bus, Train, Car, Bike, Hotel, Utensils, MapPin, Clock, DollarSign, TrendingUp, Calendar, Users, Star, ChevronRight, Filter, ArrowLeft, Save, Share2, Heart, Info, Navigation, Route } from 'lucide-react';
import RealTimePlaceSearch from './RealTimePlaceSearch';
import './BudgetTrip.css';

const BudgetTrip = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [budgetData, setBudgetData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tripDuration, setTripDuration] = useState('2');
  const [travelers, setTravelers] = useState('2');

  // Budget calculation database
  const budgetDatabase = {
    'Munnar': {
      baseLocation: 'Bangalore',
      transportOptions: {
        bus: { cost: 500, duration: '6 hours', type: 'KSRTC Bus' },
        train: { cost: 700, duration: '8 hours', type: 'Train + Bus' },
        bike: { cost: 900, duration: '5 hours', type: 'Bike Fuel' },
        sharedTaxi: { cost: 1200, duration: '4 hours', type: 'Shared Taxi' },
        car: { cost: 2000, duration: '4 hours', type: 'Private Car' }
      },
      accommodation: {
        budget: { cost: 800, type: 'Budget Hotel/Guest House' },
        mid: { cost: 1500, type: '3-Star Hotel' },
        luxury: { cost: 3000, type: 'Resort' }
      },
      food: {
        budget: { cost: 500, type: 'Local Restaurants' },
        mid: { cost: 800, type: 'Mid-range Restaurants' },
        luxury: { cost: 1500, type: 'Fine Dining' }
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
      ]
    },
    'Goa': {
      baseLocation: 'Bangalore',
      transportOptions: {
        bus: { cost: 1500, duration: '10 hours', type: 'Sleeper Bus' },
        train: { cost: 1200, duration: '12 hours', type: 'Train' },
        bike: { cost: 2000, duration: '8 hours', type: 'Bike Fuel' },
        sharedTaxi: { cost: 2500, duration: '7 hours', type: 'Shared Taxi' },
        car: { cost: 4000, duration: '7 hours', type: 'Private Car' }
      },
      accommodation: {
        budget: { cost: 1200, type: 'Beach Shack/Guest House' },
        mid: { cost: 2500, type: '3-Star Hotel' },
        luxury: { cost: 5000, type: 'Beach Resort' }
      },
      food: {
        budget: { cost: 600, type: 'Beach Shacks' },
        mid: { cost: 1000, type: 'Restaurants' },
        luxury: { cost: 2000, type: 'Fine Dining' }
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
      ]
    },
    'Ooty': {
      baseLocation: 'Bangalore',
      transportOptions: {
        bus: { cost: 400, duration: '7 hours', type: 'KSRTC Bus' },
        train: { cost: 600, duration: '9 hours', type: 'Toy Train + Bus' },
        bike: { cost: 800, duration: '6 hours', type: 'Bike Fuel' },
        sharedTaxi: { cost: 1500, duration: '5 hours', type: 'Shared Taxi' },
        car: { cost: 2500, duration: '5 hours', type: 'Private Car' }
      },
      accommodation: {
        budget: { cost: 1000, type: 'Budget Hotel' },
        mid: { cost: 2000, type: '3-Star Hotel' },
        luxury: { cost: 4000, type: 'Resort' }
      },
      food: {
        budget: { cost: 400, type: 'Local Restaurants' },
        mid: { cost: 700, type: 'Mid-range Restaurants' },
        luxury: { cost: 1200, type: 'Fine Dining' }
      },
      activities: {
        'Botanical Garden': 100,
        'Ooty Lake': 200,
        'Doddabetta Peak': 150,
        'Rose Garden': 100,
        'Tea Museum': 200,
        'Nilgiri Mountain Railway': 800
      },
      bestTime: 'Mar - Jun',
      tips: [
        'Book toy train tickets online in advance',
        'Try homemade chocolates and local tea',
        'Stay near Charing Cross for convenience',
        'Visit early morning to avoid crowds',
        'Carry umbrella for sudden weather changes'
      ]
    },
    'Bekal Fort': {
      baseLocation: 'Mangalore',
      transportOptions: {
        bus: { cost: 150, duration: '2 hours', type: 'Local Bus' },
        train: { cost: 200, duration: '1.5 hours', type: 'Train' },
        bike: { cost: 300, duration: '1.5 hours', type: 'Bike Fuel' },
        sharedTaxi: { cost: 800, duration: '1 hour', type: 'Shared Taxi' },
        car: { cost: 1500, duration: '1 hour', type: 'Private Car' }
      },
      accommodation: {
        budget: { cost: 600, type: 'Budget Hotel' },
        mid: { cost: 1200, type: '3-Star Hotel' },
        luxury: { cost: 2500, type: 'Beach Resort' }
      },
      food: {
        budget: { cost: 300, type: 'Local Restaurants' },
        mid: { cost: 500, type: 'Mid-range Restaurants' },
        luxury: { cost: 1000, type: 'Fine Dining' }
      },
      activities: {
        'Bekal Fort': 50,
        'Bekal Beach': 0,
        'Chandragiri Fort': 30,
        'Kappil Beach': 0,
        'Ananthapura Temple': 0,
        'Nileshwaram': 100
      },
      bestTime: 'Oct - Mar',
      tips: [
        'Visit fort during sunset for best views',
        'Try Malabar cuisine at local restaurants',
        'Combine with nearby beaches for full day',
        'Stay in Kasaragod for budget options',
        'Best for photography enthusiasts'
      ]
    },
    'Wayanad': {
      baseLocation: 'Calicut',
      transportOptions: {
        bus: { cost: 300, duration: '3 hours', type: 'KSRTC Bus' },
        train: { cost: 400, duration: '4 hours', type: 'Train + Bus' },
        bike: { cost: 600, duration: '2.5 hours', type: 'Bike Fuel' },
        sharedTaxi: { cost: 1200, duration: '2 hours', type: 'Shared Taxi' },
        car: { cost: 2000, duration: '2 hours', type: 'Private Car' }
      },
      accommodation: {
        budget: { cost: 800, type: 'Budget Hotel/Home Stay' },
        mid: { cost: 1500, type: '3-Star Hotel' },
        luxury: { cost: 3000, type: 'Resort' }
      },
      food: {
        budget: { cost: 400, type: 'Local Restaurants' },
        mid: { cost: 700, type: 'Mid-range Restaurants' },
        luxury: { cost: 1200, type: 'Fine Dining' }
      },
      activities: {
        'Edakkal Caves': 300,
        'Soochipara Falls': 200,
        'Pookode Lake': 150,
        'Banasura Sagar Dam': 100,
        'Thirunelly Temple': 100,
        'Chembra Peak': 500
      },
      bestTime: 'Oct - May',
      tips: [
        'Best for trekking and nature lovers',
        'Try local Kerala sadhya for authentic food',
        'Book home stays for better experience',
        'Carry rain gear during monsoon',
        'Visit Edakkal caves early morning'
      ]
    }
  };

  const handlePlaceSelect = (place) => {
    setSelectedPlace(place);
    calculateBudget(place.name);
  };

  const calculateBudget = (placeName) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const data = budgetDatabase[placeName];
      if (data) {
        const cheapestTransport = Object.entries(data.transportOptions).reduce((min, [key, value]) => 
          value.cost < min.cost ? { key, ...value } : min, 
          { cost: Infinity }
        );

        const totalBudget = {
          transport: cheapestTransport.cost,
          accommodation: data.accommodation.budget.cost,
          food: data.food.budget.cost,
          activities: Object.values(data.activities).reduce((sum, cost) => sum + cost, 0) / 2,
          total: 0
        };

        totalBudget.total = totalBudget.transport + totalBudget.accommodation + totalBudget.food + totalBudget.total;
        totalBudget.total = totalBudget.total * parseInt(tripDuration) * (parseInt(travelers) / 2);

        setBudgetData({
          ...data,
          cheapestTransport,
          calculatedBudget: totalBudget
        });
      }
      setLoading(false);
    }, 1000);
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
    <div className="budget-trip">
      <div className="budget-header">
        <button onClick={onBack} className="back-btn">
          <ArrowLeft size={24} />
        </button>
        <div className="header-content">
          <h1 className="page-title">
            <Wallet className="title-icon" />
            Budget Trip Planner
          </h1>
          <p className="page-subtitle">Find the cheapest way to explore India</p>
        </div>
      </div>

      <div className="budget-search">
        <div className="search-container">
          <h2 className="search-title">Where do you want to go?</h2>
          <RealTimePlaceSearch
            value={searchQuery}
            onChange={setSearchQuery}
            onSelect={handlePlaceSelect}
            placeholder="Search destination: Munnar, Goa, Ooty..."
            className="budget-search-input"
          />
        </div>

        <div className="trip-settings">
          <div className="setting-group">
            <label className="setting-label">
              <Calendar size={16} />
              Trip Duration
            </label>
            <select value={tripDuration} onChange={(e) => setTripDuration(e.target.value)} className="setting-select">
              <option value="1">1 Day</option>
              <option value="2">2 Days</option>
              <option value="3">3 Days</option>
              <option value="5">5 Days</option>
            </select>
          </div>
          
          <div className="setting-group">
            <label className="setting-label">
              <Users size={16} />
              Travelers
            </label>
            <select value={travelers} onChange={(e) => setTravelers(e.target.value)} className="setting-select">
              <option value="1">Solo</option>
              <option value="2">Couple</option>
              <option value="4">Family (4)</option>
              <option value="6">Group (6)</option>
            </select>
          </div>
        </div>
      </div>

      {loading && (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Calculating best budget options...</p>
        </div>
      )}

      {budgetData && !loading && (
        <div className="budget-results">
          <div className="destination-header">
            <h2 className="destination-name">{selectedPlace?.name}</h2>
            <div className="destination-meta">
              <span className="meta-item">
                <MapPin size={16} />
                {budgetData.baseLocation} → {selectedPlace?.name}
              </span>
              <span className="meta-item">
                <Clock size={16} />
                Best Time: {budgetData.bestTime}
              </span>
            </div>
          </div>

          <div className="budget-overview">
            <div className="overview-card cheapest">
              <div className="card-header">
                <TrendingUp className="card-icon" />
                <h3>Cheapest Route</h3>
              </div>
              <div className="transport-details">
                <div className="transport-option">
                  <span className="transport-type">{budgetData.cheapestTransport.type}</span>
                  <span className="transport-cost">₹{budgetData.cheapestTransport.cost}</span>
                </div>
                <div className="transport-time">
                  <Clock size={14} />
                  {budgetData.cheapestTransport.duration}
                </div>
              </div>
            </div>

            <div className="overview-card total">
              <div className="card-header">
                <DollarSign className="card-icon" />
                <h3>Total Budget</h3>
              </div>
              <div className="total-amount">
                <span className="amount">₹{budgetData.calculatedBudget.total.toLocaleString()}</span>
                <span className="duration">for {tripDuration} days, {travelers} travelers</span>
              </div>
            </div>
          </div>

          <div className="budget-breakdown">
            <h3 className="section-title">Detailed Breakdown</h3>
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
          </div>

          <div className="trip-plans">
            <h3 className="section-title">Trip Plans</h3>
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

          <div className="money-tips">
            <h3 className="section-title">
              <Info className="section-icon" />
              Money Saving Tips
            </h3>
            <div className="tips-grid">
              {budgetData.tips.map((tip, index) => (
                <div key={index} className="tip-item">
                  <div className="tip-icon">💡</div>
                  <span className="tip-text">{tip}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="action-buttons">
            <button className="action-btn primary">
              <Save size={20} />
              Save Trip
            </button>
            <button className="action-btn secondary">
              <Share2 size={20} />
              Share Plan
            </button>
            <button className="action-btn tertiary">
              <Heart size={20} />
              Add to Favorites
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetTrip;
