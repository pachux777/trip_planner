import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, MapPin, Navigation, DollarSign, Clock, 
  Calendar, Star, TrendingUp, Bot, Sparkles,
  ChevronRight, Map, Camera, Utensils, Hotel,
  Compass, Heart, Download, Share2
} from 'lucide-react';
import './AIPlanner.css';

const AIPlanner = ({ onTripDataChange }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [aiPlan, setAiPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);

  // Call onTripDataChange when AI plan is available
  useEffect(() => {
    if (aiPlan && onTripDataChange) {
      onTripDataChange(aiPlan);
    }
  }, [aiPlan, onTripDataChange]);

  // Predefined AI suggestions
  const predefinedSuggestions = [
    {
      title: '2 day trip to Munnar with ₹5000',
      query: 'I need 2 day trip to Munnar with ₹5000',
      description: 'Complete Munnar experience within budget'
    },
    {
      title: 'Weekend Goa trip for couple',
      query: 'Plan weekend trip to Goa for 2 people',
      description: 'Romantic beach getaway'
    },
    {
      title: 'Family vacation to Rajasthan',
      query: 'Family trip to Rajasthan for 4 people 5 days',
      description: 'Cultural heritage tour for family'
    },
    {
      title: 'Adventure in Himalayas',
      query: 'Adventure trip to Manali with ₹8000 for 3 days',
      description: 'Thrilling mountain experience'
    },
    {
      title: 'Spiritual journey to Varanasi',
      query: 'Spiritual trip to Varanasi with ₹3000 for 2 days',
      description: 'Sacred Ganges experience'
    },
    {
      title: 'South India temple tour',
      query: 'Temple tour South India 7 days budget ₹15000',
      description: 'Ancient temples and culture'
    },
    {
      title: 'Beach hopping in Kerala',
      query: 'Beach tour Kerala 4 days with ₹6000',
      description: 'Beautiful beaches and backwaters'
    },
    {
      title: 'Wildlife safari',
      query: 'Wildlife safari to Ranthambore with ₹4000',
      description: 'Tiger reserve adventure'
    }
  ];

  const handleQueryChange = (value) => {
    setQuery(value);
    if (value.length > 3) {
      const filtered = predefinedSuggestions.filter(suggestion =>
        suggestion.title.toLowerCase().includes(value.toLowerCase()) ||
        suggestion.query.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 4);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionSelect = (suggestion) => {
    setQuery(suggestion.query);
    setSelectedSuggestion(suggestion);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const generateAIPlan = () => {
    if (!query.trim()) return;
    
    setLoading(true);
    
    // Simulate AI API call
    setTimeout(() => {
      const plan = generatePlanFromQuery(query);
      setAiPlan(plan);
      setLoading(false);
    }, 2000);
  };

  const generatePlanFromQuery = (queryText) => {
    // Parse query to extract key information
    const destination = extractDestination(queryText);
    const duration = extractDuration(queryText);
    const budget = extractBudget(queryText);
    const travelers = extractTravelers(queryText);
    const tripType = extractTripType(queryText);

    // Generate AI plan based on parsed data
    return {
      query: queryText,
      destination: destination || 'Munnar',
      duration: duration || 2,
      budget: budget || 5000,
      travelers: travelers || 2,
      tripType: tripType || 'leisure',
      itinerary: generateItinerary(destination, duration, budget),
      costBreakdown: generateCostBreakdown(budget, duration, travelers),
      recommendations: generateRecommendations(tripType, destination),
      weather: generateWeatherInfo(destination),
      bestTimeToVisit: generateBestTime(destination),
      packingList: generatePackingList(tripType, duration),
      emergencyInfo: generateEmergencyInfo(destination)
    };
  };

  const extractDestination = (text) => {
    const destinations = ['Munnar', 'Goa', 'Manali', 'Varanasi', 'Ranthambore', 'Kerala', 'Rajasthan', 'Ooty', 'Darjeeling'];
    for (const dest of destinations) {
      if (text.toLowerCase().includes(dest.toLowerCase())) {
        return dest;
      }
    }
    return null;
  };

  const extractDuration = (text) => {
    const durationMatch = text.match(/(\d+)\s*(day|days)/i);
    return durationMatch ? parseInt(durationMatch[1]) : null;
  };

  const extractBudget = (text) => {
    const budgetMatch = text.match(/₹?(\d+)/);
    return budgetMatch ? parseInt(budgetMatch[1]) : null;
  };

  const extractTravelers = (text) => {
    const peopleMatch = text.match(/(\d+)\s*(people|person|couple|family)/i);
    if (peopleMatch) {
      const count = parseInt(peopleMatch[1]);
      if (peopleMatch[2].includes('couple')) return 2;
      if (peopleMatch[2].includes('family')) return 4;
      return count;
    }
    return null;
  };

  const extractTripType = (text) => {
    if (text.toLowerCase().includes('adventure')) return 'adventure';
    if (text.toLowerCase().includes('spiritual') || text.toLowerCase().includes('temple')) return 'spiritual';
    if (text.toLowerCase().includes('beach')) return 'beach';
    if (text.toLowerCase().includes('family')) return 'family';
    if (text.toLowerCase().includes('romantic') || text.toLowerCase().includes('couple')) return 'romantic';
    if (text.toLowerCase().includes('wildlife') || text.toLowerCase().includes('safari')) return 'wildlife';
    return 'leisure';
  };

  const generateItinerary = (destination, duration, budget) => {
    const baseItinerary = {
      'Munnar': [
        {
          day: 1,
          title: 'Arrival & Tea Gardens',
          activities: [
            'Check into budget hotel',
            'Visit Tea Museum',
            'Explore Eravikulam National Park',
            'Sunset at Echo Point'
          ],
          meals: ['Breakfast', 'Lunch', 'Dinner'],
          estimatedCost: 2000
        },
        {
          day: 2,
          title: 'Hills & Dam',
          activities: [
            'Mattupetty Dam boat ride',
            'Top Station viewpoint',
            'Kundala Lake',
            'Shopping for spices'
          ],
          meals: ['Breakfast', 'Lunch'],
          estimatedCost: 1800
        }
      ],
      'Goa': [
        {
          day: 1,
          title: 'Beaches & Nightlife',
          activities: [
            'Baga Beach relaxation',
            'Water sports at Calangute',
            'Anjuna flea market',
            'Beach shack dinner'
          ],
          meals: ['Breakfast', 'Lunch', 'Dinner'],
          estimatedCost: 2500
        },
        {
          day: 2,
          title: 'Culture & Heritage',
          activities: [
            'Old Goa churches',
            'Spice plantation tour',
            'Dudhsagar Falls',
            'Panjim city tour'
          ],
          meals: ['Breakfast', 'Lunch'],
          estimatedCost: 2000
        }
      ]
    };

    return baseItinerary[destination] || baseItinerary['Munnar'];
  };

  const generateCostBreakdown = (budget, duration, travelers) => {
    const perPersonBudget = budget / travelers;
    return {
      accommodation: {
        amount: Math.round(perPersonBudget * 0.4),
        percentage: 40,
        description: 'Budget hotels or guesthouses'
      },
      food: {
        amount: Math.round(perPersonBudget * 0.3),
        percentage: 30,
        description: 'Local restaurants and street food'
      },
      transportation: {
        amount: Math.round(perPersonBudget * 0.2),
        percentage: 20,
        description: 'Public transport or shared taxis'
      },
      activities: {
        amount: Math.round(perPersonBudget * 0.1),
        percentage: 10,
        description: 'Sightseeing and experiences'
      }
    };
  };

  const generateRecommendations = (tripType, destination) => {
    const recommendations = {
      adventure: [
        'Pack light but include warm clothes',
        'Carry basic first aid kit',
        'Book accommodations in advance',
        'Keep some emergency cash'
      ],
      spiritual: [
        'Dress modestly for temple visits',
        'Remove shoes before entering temples',
        'Carry offerings for prayers',
        'Respect local customs'
      ],
      beach: [
        'Carry sunscreen and hat',
        'Pack swimwear and towels',
        'Waterproof phone case',
        'Beach sandals recommended'
      ],
      family: [
        'Pack snacks for kids',
        'Include entertainment for travel',
        'First aid essentials',
        'Comfortable walking shoes'
      ]
    };

    return recommendations[tripType] || recommendations.leisure;
  };

  const generateWeatherInfo = (destination) => {
    const weatherData = {
      'Munnar': {
        temperature: '22°C',
        condition: 'Pleasant',
        bestSeason: 'Sep - Mar',
        rainfall: 'Moderate'
      },
      'Goa': {
        temperature: '28°C',
        condition: 'Hot & Humid',
        bestSeason: 'Nov - Feb',
        rainfall: 'Low'
      },
      'Manali': {
        temperature: '15°C',
        condition: 'Cool',
        bestSeason: 'Mar - Jun',
        rainfall: 'Low'
      }
    };

    return weatherData[destination] || weatherData['Munnar'];
  };

  const generateBestTime = (destination) => {
    const bestTimes = {
      'Munnar': 'September to March (winter months)',
      'Goa': 'November to February (winter months)',
      'Manali': 'March to June (summer months)',
      'Varanasi': 'October to March (winter months)'
    };

    return bestTimes[destination] || 'October to March';
  };

  const generatePackingList = (tripType, duration) => {
    const baseList = [
      'Clothes for ' + duration + ' days',
      'Toiletries',
      'First aid kit',
      'Phone charger',
      'Camera',
      'Cash and cards'
    ];

    const typeSpecific = {
      adventure: ['Hiking shoes', 'Backpack', 'Water bottle', 'Energy bars'],
      spiritual: ['Modest clothes', 'Offerings', 'Prayer mat'],
      beach: ['Swimwear', 'Sunscreen', 'Hat', 'Sunglasses', 'Towel'],
      family: ['Kids essentials', 'Entertainment', 'Snacks', 'Extra clothes']
    };

    return [...baseList, ...(typeSpecific[tripType] || [])];
  };

  const generateEmergencyInfo = (destination) => {
    return {
      emergencyContacts: ['Police: 100', 'Ambulance: 108', 'Tourist Helpline: 1363'],
      nearbyHospitals: ['District Hospital', 'Medical College'],
      importantDocuments: ['ID proof', 'Address proof', 'Medical insurance'],
      localCustoms: ['Respect local traditions', 'Bargain respectfully', 'Ask permission before photos']
    };
  };

  return (
    <div className="ai-planner">
      <div className="planner-header">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="header-content"
        >
          <div className="ai-badge">
            <Bot className="ai-icon" />
            <span>AI Smart Planner</span>
            <Sparkles className="sparkle-icon" />
          </div>
          <h1 className="page-title">
            Tell me about your dream trip
          </h1>
          <p className="page-subtitle">
            Just describe what you want, and I'll create the perfect itinerary
          </p>
        </motion.div>
      </div>

      <div className="planner-content">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="query-section"
        >
          <div className="query-input-group">
            <label className="input-label">
              <Search size={18} />
              Describe your trip
            </label>
            <div className="input-wrapper">
              <input
                type="text"
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                placeholder="e.g., 2 day trip to Munnar with ₹5000"
                className="query-input"
              />
              {showSuggestions && suggestions.length > 0 && (
                <div className="suggestions-dropdown">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      onClick={() => handleSuggestionSelect(suggestion)}
                      className="suggestion-item"
                    >
                      <div className="suggestion-content">
                        <div className="suggestion-title">{suggestion.title}</div>
                        <div className="suggestion-desc">{suggestion.description}</div>
                      </div>
                      <ChevronRight className="suggestion-arrow" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button
            onClick={generateAIPlan}
            disabled={!query.trim() || loading}
            className="generate-button"
          >
            {loading ? (
              <div className="loading-spinner"></div>
            ) : (
              <>
                <Bot size={20} />
                Generate AI Plan
              </>
            )}
          </button>
        </motion.div>

        {selectedSuggestion && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="selected-query"
          >
            <div className="selected-content">
              <h3>Selected Query:</h3>
              <p>{selectedSuggestion.title}</p>
              <button 
                onClick={() => setSelectedSuggestion(null)}
                className="clear-button"
              >
                Clear
              </button>
            </div>
          </motion.div>
        )}

        {aiPlan && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="ai-plan-results"
          >
            {/* Plan Overview */}
            <div className="plan-overview">
              <h2 className="section-title">
                <Map size={20} />
                Your AI-Generated Trip Plan
              </h2>
              <div className="overview-cards">
                <div className="overview-card">
                  <div className="card-icon">
                    <MapPin />
                  </div>
                  <div className="card-content">
                    <h3>Destination</h3>
                    <p>{aiPlan.destination}</p>
                  </div>
                </div>
                <div className="overview-card">
                  <div className="card-icon">
                    <Calendar />
                  </div>
                  <div className="card-content">
                    <h3>Duration</h3>
                    <p>{aiPlan.duration} days</p>
                  </div>
                </div>
                <div className="overview-card">
                  <div className="card-icon">
                    <Users />
                  </div>
                  <div className="card-content">
                    <h3>Travelers</h3>
                    <p>{aiPlan.travelers} people</p>
                  </div>
                </div>
                <div className="overview-card">
                  <div className="card-icon">
                    <DollarSign />
                  </div>
                  <div className="card-content">
                    <h3>Total Budget</h3>
                    <p>₹{aiPlan.budget.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Weather & Best Time */}
            <div className="weather-section">
              <div className="weather-card">
                <h3 className="weather-title">
                  <Star size={16} />
                  Weather & Best Time
                </h3>
                <div className="weather-info">
                  <div className="weather-item">
                    <span>Temperature</span>
                    <span>{aiPlan.weather.temperature}</span>
                  </div>
                  <div className="weather-item">
                    <span>Condition</span>
                    <span>{aiPlan.weather.condition}</span>
                  </div>
                  <div className="weather-item">
                    <span>Best Season</span>
                    <span className="highlight">{aiPlan.bestTimeToVisit}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="cost-breakdown">
              <h2 className="section-title">
                <DollarSign size={20} />
                Smart Budget Breakdown
              </h2>
              <div className="breakdown-chart">
                {Object.entries(aiPlan.costBreakdown).map(([category, data]) => (
                  <div key={category} className="budget-item">
                    <div className="budget-header">
                      <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
                      <span className="budget-percentage">{data.percentage}%</span>
                    </div>
                    <div className="budget-amount">₹{data.amount.toLocaleString()}</div>
                    <p className="budget-desc">{data.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Day-wise Itinerary */}
            <div className="itinerary-section">
              <h2 className="section-title">
                <Calendar size={20} />
                Day-wise Itinerary
              </h2>
              <div className="itinerary-days">
                {aiPlan.itinerary.map((day, index) => (
                  <div key={index} className="day-card">
                    <div className="day-header">
                      <h3>Day {day.day}</h3>
                      <h4>{day.title}</h4>
                    </div>
                    <div className="day-activities">
                      {day.activities.map((activity, actIndex) => (
                        <div key={actIndex} className="activity-item">
                          <Camera size={14} />
                          <span>{activity}</span>
                        </div>
                      ))}
                    </div>
                    <div className="day-meals">
                      <h5>Meals:</h5>
                      <div className="meals-list">
                        {day.meals.map((meal, mealIndex) => (
                          <span key={mealIndex} className="meal-tag">
                            <Utensils size={12} />
                            {meal}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="day-cost">
                      <span>Est. Cost: ₹{day.estimatedCost.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="recommendations-section">
              <h2 className="section-title">
                <TrendingUp size={20} />
                AI Recommendations
              </h2>
              <div className="recommendations-grid">
                {aiPlan.recommendations.map((rec, index) => (
                  <div key={index} className="recommendation-card">
                    <div className="rec-icon">💡</div>
                    <p>{rec}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Packing List */}
            <div className="packing-section">
              <h2 className="section-title">
                <Compass size={20} />
                Smart Packing List
              </h2>
              <div className="packing-grid">
                {aiPlan.packingList.map((item, index) => (
                  <div key={index} className="packing-item">
                    <input type="checkbox" id={`pack-${index}`} />
                    <label htmlFor={`pack-${index}`} className="packing-label">
                      {item}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Info */}
            <div className="emergency-section">
              <h2 className="section-title">
                <Heart size={20} />
                Emergency Information
              </h2>
              <div className="emergency-cards">
                <div className="emergency-card">
                  <h3>Emergency Contacts</h3>
                  <ul>
                    {aiPlan.emergencyInfo.emergencyContacts.map((contact, index) => (
                      <li key={index}>{contact}</li>
                    ))}
                  </ul>
                </div>
                <div className="emergency-card">
                  <h3>Nearby Hospitals</h3>
                  <ul>
                    {aiPlan.emergencyInfo.nearbyHospitals.map((hospital, index) => (
                      <li key={index}>{hospital}</li>
                    ))}
                  </ul>
                </div>
                <div className="emergency-card">
                  <h3>Important Documents</h3>
                  <ul>
                    {aiPlan.emergencyInfo.importantDocuments.map((doc, index) => (
                      <li key={index}>{doc}</li>
                    ))}
                  </ul>
                </div>
                <div className="emergency-card">
                  <h3>Local Customs</h3>
                  <ul>
                    {aiPlan.emergencyInfo.localCustoms.map((custom, index) => (
                      <li key={index}>{custom}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <button className="action-btn primary">
                <Download size={20} />
                Download PDF
              </button>
              <button className="action-btn secondary">
                <Share2 size={20} />
                Share Plan
              </button>
              <button className="action-btn tertiary">
                <Heart size={20} />
                Save Trip
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AIPlanner;
