import { useState, useEffect } from 'react';
import { 
  MapPin, 
  Calendar, 
  Users, 
  DollarSign, 
  Car, 
  Bike, 
  Bus, 
  Train, 
  Plane, 
  Route, 
  Hotel, 
  Utensils, 
  Fuel, 
  Clock, 
  TrendingUp,
  Calculator,
  Navigation,
  Map,
  Star,
  ChevronRight,
  Check,
  AlertCircle
} from 'lucide-react';
import './SmartTripPlanner.css';

const SmartTripPlanner = () => {
  const [tripData, setTripData] = useState({
    from: '',
    to: '',
    startDate: '',
    endDate: '',
    members: '1',
    budget: '',
    transportation: 'car',
    tripType: 'budget'
  });

  const [tripResult, setTripResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const transportationOptions = [
    { id: 'car', name: 'Car', icon: Car, costPerKm: 8, speed: 60 },
    { id: 'bike', name: 'Bike', icon: Bike, costPerKm: 3, speed: 50 },
    { id: 'bus', name: 'Bus', icon: Bus, costPerKm: 2, speed: 40 },
    { id: 'train', name: 'Train', icon: Train, costPerKm: 4, speed: 80 },
    { id: 'flight', name: 'Flight', icon: Plane, costPerKm: 12, speed: 500 }
  ];

  const tripTypes = [
    { id: 'budget', name: 'Budget', multiplier: 0.7, color: '#22c55e' },
    { id: 'premium', name: 'Premium', multiplier: 1.5, color: '#8b5cf6' },
    { id: 'adventure', name: 'Adventure', multiplier: 1.2, color: '#f97316' },
    { id: 'relaxation', name: 'Relaxation', multiplier: 1.3, color: '#3b82f6' }
  ];

  const calculateDistance = (from, to) => {
    // Mock distance calculation - in real app, use Google Maps API
    const distances = {
      'mumbai-delhi': 1400,
      'delhi-mumbai': 1400,
      'bangalore-goa': 560,
      'goa-bangalore': 560,
      'delhi-jaipur': 280,
      'jaipur-delhi': 280,
      'chennai-kerala': 700,
      'kerala-chennai': 700,
      'mumbai-goa': 600,
      'goa-mumbai': 600
    };
    
    const key = `${from.toLowerCase()}-${to.toLowerCase()}`;
    return distances[key] || 500; // Default 500km
  };

  const calculateTrip = () => {
    if (!tripData.from || !tripData.to || !tripData.budget) {
      alert('Please fill all required fields');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const distance = calculateDistance(tripData.from, tripData.to);
      const transport = transportationOptions.find(t => t.id === tripData.transportation);
      const tripType = tripTypes.find(t => t.id === tripData.tripType);
      
      // Calculate costs
      const transportCost = distance * transport.costPerKm * parseInt(tripData.members);
      const fuelCost = transportCost * 0.3;
      const stayCost = parseInt(tripData.budget) * 0.4;
      const foodCost = parseInt(tripData.budget) * 0.2;
      const activitiesCost = parseInt(tripData.budget) * 0.1;
      
      const totalCost = transportCost + stayCost + foodCost + activitiesCost;
      
      // Generate itinerary
      const days = calculateDays(tripData.startDate, tripData.endDate);
      const itinerary = generateItinerary(tripData.from, tripData.to, days, tripData.tripType);
      
      // Find tourist places
      const touristPlaces = getTouristPlaces(tripData.to, tripData.tripType);
      
      // Money saving tips
      const savingTips = getSavingTips(tripData.tripType, tripData.transportation);

      setTripResult({
        distance,
        transport,
        tripType,
        costs: {
          transport: transportCost,
          fuel: fuelCost,
          stay: stayCost,
          food: foodCost,
          activities: activitiesCost,
          total: totalCost
        },
        days,
        itinerary,
        touristPlaces,
        savingTips,
        route: `${tripData.from} → ${tripData.to}`,
        estimatedTime: Math.ceil(distance / transport.speed)
      });

      setLoading(false);
      setShowResults(true);
    }, 2000);
  };

  const calculateDays = (start, end) => {
    if (!start || !end) return 3;
    const startDate = new Date(start);
    const endDate = new Date(end);
    return Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
  };

  const generateItinerary = (from, to, days, type) => {
    const templates = {
      budget: {
        day1: `Travel from ${from} to ${to}, check-in budget hotel, local street food tour`,
        day2: `Visit major attractions, use public transport, local market shopping`,
        day3: `Hidden gems exploration, budget activities, return preparation`
      },
      premium: {
        day1: `Luxury travel from ${from} to ${to}, 5-star hotel check-in, fine dining`,
        day2: `Premium attractions, private tours, exclusive experiences`,
        day3: `Spa & wellness, shopping, luxury return journey`
      },
      adventure: {
        day1: `Adventure travel to ${to}, adventure lodge check-in, local cuisine`,
        day2: `Adventure activities, trekking, water sports, camping`,
        day3: `Extreme sports, exploration, return with memories`
      },
      relaxation: {
        day1: `Comfortable travel to ${to}, resort check-in, spa treatment`,
        day2: `Wellness activities, meditation, nature walks, fine dining`,
        day3: `Relaxation, cultural experiences, rejuvenated return`
      }
    };

    const template = templates[type] || templates.budget;
    const itinerary = [];
    
    for (let i = 1; i <= days; i++) {
      const dayKey = i <= 3 ? `day${i}` : `day${(i % 3) + 1}`;
      itinerary.push({
        day: i,
        plan: template[dayKey] || `Day ${i} - Explore ${to} at your own pace`
      });
    }

    return itinerary;
  };

  const getTouristPlaces = (destination, type) => {
    const places = {
      goa: [
        { name: 'Baga Beach', type: 'Beach', rating: 4.5, distance: '15km', bestTime: 'Morning' },
        { name: 'Dudhsagar Falls', type: 'Waterfall', rating: 4.8, distance: '60km', bestTime: 'Early Morning' },
        { name: 'Old Goa Churches', type: 'Historical', rating: 4.6, distance: '10km', bestTime: 'Anytime' },
        { name: 'Anjuna Beach', type: 'Beach', rating: 4.4, distance: '20km', bestTime: 'Sunset' }
      ],
      mumbai: [
        { name: 'Gateway of India', type: 'Monument', rating: 4.7, distance: '2km', bestTime: 'Evening' },
        { name: 'Marine Drive', type: 'Scenic', rating: 4.6, distance: '5km', bestTime: 'Night' },
        { name: 'Elephanta Caves', type: 'Historical', rating: 4.5, distance: '30km', bestTime: 'Morning' }
      ],
      delhi: [
        { name: 'Red Fort', type: 'Historical', rating: 4.6, distance: '5km', bestTime: 'Morning' },
        { name: 'India Gate', type: 'Monument', rating: 4.5, distance: '3km', bestTime: 'Evening' },
        { name: 'Qutub Minar', type: 'Historical', rating: 4.7, distance: '15km', bestTime: 'Sunset' }
      ]
    };

    return places[destination.toLowerCase()] || [
      { name: 'Local Market', type: 'Shopping', rating: 4.3, distance: '5km', bestTime: 'Evening' },
      { name: 'City Center', type: 'Urban', rating: 4.4, distance: '2km', bestTime: 'Anytime' },
      { name: 'Tourist Spot', type: 'Attraction', rating: 4.5, distance: '10km', bestTime: 'Morning' }
    ];
  };

  const getSavingTips = (type, transport) => {
    const tips = {
      budget: [
        'Book hotels in advance for better rates',
        'Use public transport instead of private cabs',
        'Eat at local restaurants instead of tourist places',
        'Travel during off-season for lower prices'
      ],
      premium: [
        'Look for luxury package deals',
        'Use credit card points for upgrades',
        'Book premium experiences in advance',
        'Consider loyalty program benefits'
      ],
      adventure: [
        'Bring your own gear to save rentals',
        'Travel in groups for better rates',
        'Book adventure activities online',
        'Consider off-season adventure deals'
      ],
      relaxation: [
        'Book spa packages for better value',
        'Consider all-inclusive resorts',
        'Look for wellness package deals',
        'Travel during weekdays for lower rates'
      ]
    };

    const transportTips = {
      car: 'Share fuel costs if traveling with friends',
      bike: 'Perfect for solo budget travel',
      bus: 'Overnight buses save on accommodation',
      train: 'Book Tatkal for last-minute deals',
      flight: 'Compare prices across multiple airlines'
    };

    return [...(tips[type] || tips.budget), transportTips[transport] || ''];
  };

  const handleInputChange = (field, value) => {
    setTripData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="smart-trip-planner">
      <div className="planner-header">
        <h1 className="planner-title">
          <Route className="title-icon" />
          Smart Trip Planner
        </h1>
        <p className="planner-subtitle">
          Plan your perfect trip with AI-powered recommendations and cost optimization
        </p>
      </div>

      <div className="planner-container">
        <div className="planner-form glassmorphism">
          <div className="form-grid">
            {/* From Location */}
            <div className="form-group">
              <label className="form-label">
                <MapPin className="label-icon" />
                From
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter departure city"
                value={tripData.from}
                onChange={(e) => handleInputChange('from', e.target.value)}
              />
            </div>

            {/* To Location */}
            <div className="form-group">
              <label className="form-label">
                <MapPin className="label-icon" />
                To
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter destination city"
                value={tripData.to}
                onChange={(e) => handleInputChange('to', e.target.value)}
              />
            </div>

            {/* Dates */}
            <div className="form-group">
              <label className="form-label">
                <Calendar className="label-icon" />
                Start Date
              </label>
              <input
                type="date"
                className="form-input"
                value={tripData.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <Calendar className="label-icon" />
                End Date
              </label>
              <input
                type="date"
                className="form-input"
                value={tripData.endDate}
                onChange={(e) => handleInputChange('endDate', e.target.value)}
              />
            </div>

            {/* Members */}
            <div className="form-group">
              <label className="form-label">
                <Users className="label-icon" />
                Number of Members
              </label>
              <select
                className="form-input"
                value={tripData.members}
                onChange={(e) => handleInputChange('members', e.target.value)}
              >
                <option value="1">1 Person</option>
                <option value="2">2 People</option>
                <option value="3">3 People</option>
                <option value="4">4 People</option>
                <option value="5">5+ People</option>
              </select>
            </div>

            {/* Budget */}
            <div className="form-group">
              <label className="form-label">
                <DollarSign className="label-icon" />
                Budget (₹)
              </label>
              <input
                type="number"
                className="form-input"
                placeholder="Enter your budget"
                value={tripData.budget}
                onChange={(e) => handleInputChange('budget', e.target.value)}
              />
            </div>
          </div>

          {/* Transportation */}
          <div className="transportation-section">
            <label className="section-label">
              <Navigation className="label-icon" />
              Transportation
            </label>
            <div className="transportation-grid">
              {transportationOptions.map((option) => (
                <div
                  key={option.id}
                  className={`transport-option ${tripData.transportation === option.id ? 'active' : ''}`}
                  onClick={() => handleInputChange('transportation', option.id)}
                >
                  <option.icon className="transport-icon" />
                  <span className="transport-name">{option.name}</span>
                  <span className="transport-cost">₹{option.costPerKm}/km</span>
                </div>
              ))}
            </div>
          </div>

          {/* Trip Type */}
          <div className="trip-type-section">
            <label className="section-label">
              <Star className="label-icon" />
              Trip Type
            </label>
            <div className="trip-type-grid">
              {tripTypes.map((type) => (
                <div
                  key={type.id}
                  className={`trip-type-option ${tripData.tripType === type.id ? 'active' : ''}`}
                  onClick={() => handleInputChange('tripType', type.id)}
                  style={{ '--type-color': type.color }}
                >
                  <span className="trip-type-name">{type.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Plan Button */}
          <button
            className="plan-trip-btn"
            onClick={calculateTrip}
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="btn-spinner"></div>
                Planning Your Trip...
              </>
            ) : (
              <>
                <Calculator className="btn-icon" />
                PLAN MY TRIP
              </>
            )}
          </button>
        </div>

        {/* Results */}
        {showResults && tripResult && (
          <div className="trip-results glassmorphism">
            <div className="results-header">
              <h2 className="results-title">
                <Check className="title-icon" />
                Your Trip Plan
              </h2>
              <div className="trip-summary">
                <div className="summary-item">
                  <Route className="summary-icon" />
                  <span className="summary-text">{tripResult.route}</span>
                </div>
                <div className="summary-item">
                  <Clock className="summary-icon" />
                  <span className="summary-text">{tripResult.estimatedTime} hours</span>
                </div>
                <div className="summary-item">
                  <Users className="summary-icon" />
                  <span className="summary-text">{tripData.members} members</span>
                </div>
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="cost-breakdown">
              <h3 className="section-title">
                <DollarSign className="section-icon" />
                Cost Breakdown
              </h3>
              <div className="cost-grid">
                <div className="cost-item">
                  <div className="cost-header">
                    <tripResult.transport.icon className="cost-icon" />
                    <span className="cost-label">Transportation</span>
                  </div>
                  <span className="cost-amount">₹{tripResult.costs.transport.toLocaleString()}</span>
                </div>
                <div className="cost-item">
                  <div className="cost-header">
                    <Fuel className="cost-icon" />
                    <span className="cost-label">Fuel/Charges</span>
                  </div>
                  <span className="cost-amount">₹{tripResult.costs.fuel.toLocaleString()}</span>
                </div>
                <div className="cost-item">
                  <div className="cost-header">
                    <Hotel className="cost-icon" />
                    <span className="cost-label">Accommodation</span>
                  </div>
                  <span className="cost-amount">₹{tripResult.costs.stay.toLocaleString()}</span>
                </div>
                <div className="cost-item">
                  <div className="cost-header">
                    <Utensils className="cost-icon" />
                    <span className="cost-label">Food</span>
                  </div>
                  <span className="cost-amount">₹{tripResult.costs.food.toLocaleString()}</span>
                </div>
                <div className="cost-item">
                  <div className="cost-header">
                    <Map className="cost-icon" />
                    <span className="cost-label">Activities</span>
                  </div>
                  <span className="cost-amount">₹{tripResult.costs.activities.toLocaleString()}</span>
                </div>
                <div className="cost-item total">
                  <div className="cost-header">
                    <TrendingUp className="cost-icon" />
                    <span className="cost-label">Total Cost</span>
                  </div>
                  <span className="cost-amount">₹{tripResult.costs.total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Itinerary */}
            <div className="itinerary-section">
              <h3 className="section-title">
                <Calendar className="section-icon" />
                Day-wise Itinerary
              </h3>
              <div className="itinerary-grid">
                {tripResult.itinerary.map((day, index) => (
                  <div key={index} className="itinerary-day">
                    <div className="day-header">
                      <span className="day-number">Day {day.day}</span>
                      <ChevronRight className="day-icon" />
                    </div>
                    <p className="day-plan">{day.plan}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tourist Places */}
            <div className="tourist-places-section">
              <h3 className="section-title">
                <MapPin className="section-icon" />
                Tourist Places to Visit
              </h3>
              <div className="places-grid">
                {tripResult.touristPlaces.map((place, index) => (
                  <div key={index} className="place-card">
                    <div className="place-header">
                      <span className="place-name">{place.name}</span>
                      <div className="place-rating">
                        <Star className="rating-icon" />
                        <span>{place.rating}</span>
                      </div>
                    </div>
                    <div className="place-details">
                      <span className="place-type">{place.type}</span>
                      <span className="place-distance">{place.distance}</span>
                      <span className="place-time">{place.bestTime}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Money Saving Tips */}
            <div className="saving-tips-section">
              <h3 className="section-title">
                <TrendingUp className="section-icon" />
                Money Saving Tips
              </h3>
              <div className="tips-grid">
                {tripResult.savingTips.map((tip, index) => (
                  <div key={index} className="tip-item">
                    <AlertCircle className="tip-icon" />
                    <span className="tip-text">{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartTripPlanner;
