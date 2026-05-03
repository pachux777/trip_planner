import { useState, useEffect } from 'react';
import { 
  MapPin, 
  Calendar, 
  Users, 
  DollarSign, 
  Car, 
  Bike, 
  Train, 
  Plane, 
  Bus, 
  Route, 
  Clock, 
  Star, 
  TrendingUp, 
  Award, 
  Heart, 
  Share2, 
  Download, 
  Send, 
  Navigation, 
  Hotel, 
  Utensils, 
  Camera, 
  Mountain, 
  Trees, 
  Sun, 
  Cloud, 
  Wind, 
  Thermometer, 
  Droplets, 
  Compass, 
  Map, 
  Sparkles, 
  Zap, 
  Target, 
  Shield, 
  Brain, 
  Lightbulb, 
  CheckCircle, 
  AlertCircle, 
  ChevronRight, 
  ArrowRight, 
  Plus, 
  Minus, 
  Info, 
  Filter, 
  Search,
  Globe,
  Navigation as NavigationIcon
} from 'lucide-react';
import './SmartAITripPlanner.css';

const SmartAITripPlanner = () => {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    startDate: '',
    endDate: '',
    members: 1,
    budget: '',
    transportation: 'car',
    tripType: 'budget'
  });

  const [tripPlan, setTripPlan] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [savedPlans, setSavedPlans] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // Transportation options
  const transportationOptions = [
    { id: 'car', name: 'Car', icon: Car, description: 'Flexible and convenient' },
    { id: 'bike', name: 'Bike', icon: Bike, description: 'Economical and adventurous' },
    { id: 'train', name: 'Train', icon: Train, description: 'Comfortable and scenic' },
    { id: 'bus', name: 'Bus', icon: Bus, description: 'Budget-friendly' },
    { id: 'flight', name: 'Flight', icon: Plane, description: 'Fastest option' }
  ];

  // Trip types
  const tripTypes = [
    { id: 'budget', name: 'Budget', icon: DollarSign, color: '#10b981', description: 'Economical travel' },
    { id: 'premium', name: 'Premium', icon: Sparkles, color: '#8b5cf6', description: 'Luxury experience' },
    { id: 'family', name: 'Family', icon: Users, color: '#3b82f6', description: 'Family-friendly' },
    { id: 'couple', name: 'Couple', icon: Heart, color: '#ef4444', description: 'Romantic getaway' },
    { id: 'adventure', name: 'Adventure', icon: Mountain, color: '#f97316', description: 'Thrilling experiences' },
    { id: 'solo', name: 'Solo', icon: Compass, color: '#06b6d4', description: 'Personal journey' }
  ];

  // Popular destinations
  const popularDestinations = [
    { id: 1, name: 'Goa', state: 'Goa', type: 'beach', image: 'https://images.unsplash.com/photo-1512343879798-01e0e4352a18?w=300' },
    { id: 2, name: 'Munnar', state: 'Kerala', type: 'hill', image: 'https://images.unsplash.com/photo-1548199973-75cce1b4ea31?w=300' },
    { id: 3, name: 'Jaipur', state: 'Rajasthan', type: 'heritage', image: 'https://images.unsplash.com/photo-1524492412937-b784b5b9c7c9?w=300' },
    { id: 4, name: 'Varanasi', state: 'Uttar Pradesh', type: 'spiritual', image: 'https://images.unsplash.com/photo-1593696140826-c58b021acf8b?w=300' },
    { id: 5, name: 'Manali', state: 'Himachal Pradesh', type: 'adventure', image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300' },
    { id: 6, name: 'Andaman', state: 'Andaman & Nicobar', type: 'island', image: 'https://images.unsplash.com/photo-1540202404-1b627c8aeb30?w=300' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDestinationSelect = (destination, field) => {
    setFormData(prev => ({
      ...prev,
      [field]: destination.name
    }));
  };

  const generateTripPlan = async () => {
    if (!formData.from || !formData.to || !formData.startDate || !formData.endDate || !formData.budget) {
      alert('Please fill in all required fields');
      return;
    }

    setIsGenerating(true);
    setShowResults(false);

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 3000));

    const days = calculateDaysBetween(formData.startDate, formData.endDate);
    const plan = generateDetailedPlan(days);
    
    setTripPlan(plan);
    setShowResults(true);
    setIsGenerating(false);
  };

  const calculateDaysBetween = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const timeDiff = endDate.getTime() - startDate.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
  };

  const generateDetailedPlan = (days) => {
    const distance = calculateDistance(formData.from, formData.to);
    const transportCost = calculateTransportCost(formData.transportation, distance);
    const dailyBudget = parseInt(formData.budget) / days;
    
    const plan = {
      id: Date.now(),
      from: formData.from,
      to: formData.to,
      startDate: formData.startDate,
      endDate: formData.endDate,
      members: formData.members,
      totalBudget: parseInt(formData.budget),
      transportation: formData.transportation,
      tripType: formData.tripType,
      days: days,
      distance: distance,
      estimatedCost: transportCost + (dailyBudget * days * 0.7), // 70% for accommodation and food
      bestRoute: generateBestRoute(formData.from, formData.to),
      itinerary: generateItinerary(days, formData.to, dailyBudget),
      recommendations: generateRecommendations(formData.tripType, formData.to),
      hiddenGems: generateHiddenGems(formData.to),
      moneySavingTips: generateMoneySavingTips(formData.tripType, dailyBudget),
      weatherInfo: generateWeatherInfo(formData.to, formData.startDate),
      packingList: generatePackingList(formData.tripType, days),
      emergencyContacts: generateEmergencyContacts(formData.to),
      created: new Date().toISOString()
    };

    return plan;
  };

  const calculateDistance = (from, to) => {
    // Mock distance calculation (in km)
    const distances = {
      'Delhi-Mumbai': 1400,
      'Mumbai-Goa': 600,
      'Delhi-Jaipur': 280,
      'Bangalore-Mysore': 150,
      'Chennai-Pondicherry': 160,
      'Kolkata-Darjeeling': 600
    };
    
    const key = `${from}-${to}`;
    const reverseKey = `${to}-${from}`;
    
    return distances[key] || distances[reverseKey] || Math.floor(Math.random() * 1000) + 200;
  };

  const calculateTransportCost = (transport, distance) => {
    const costs = {
      car: Math.floor(distance * 8), // ₹8 per km
      bike: Math.floor(distance * 4), // ₹4 per km
      train: Math.floor(distance * 2), // ₹2 per km
      bus: Math.floor(distance * 1.5), // ₹1.5 per km
      flight: Math.floor(distance * 10) // ₹10 per km (simplified)
    };
    return costs[transport] || costs.car;
  };

  const generateBestRoute = (from, to) => {
    return {
      route: `${from} → ${to}`,
      waypoints: [
        { name: 'Rest Stop 1', distance: '200km', time: '2.5 hours' },
        { name: 'Rest Stop 2', distance: '400km', time: '5 hours' }
      ],
      totalDistance: calculateDistance(from, to),
      estimatedTime: `${Math.ceil(calculateDistance(from, to) / 60)} hours`,
      fuelStops: Math.floor(calculateDistance(from, to) / 400),
      tolls: Math.floor(calculateDistance(from, to) / 100) * 50
    };
  };

  const generateItinerary = (days, destination, dailyBudget) => {
    const attractions = {
      'Goa': ['Baga Beach', 'Anjuna Beach', 'Old Goa Churches', 'Dudhsagar Falls', 'Spice Plantation'],
      'Munnar': ['Tea Gardens', 'Eravikulam Park', 'Mattupetty Dam', 'Top Station', 'Echo Point'],
      'Jaipur': ['Amber Fort', 'City Palace', 'Hawa Mahal', 'Jantar Mantar', 'Jal Mahal'],
      'Varanasi': ['Kashi Vishwanath Temple', 'Ganga Aarti', 'Sarnath', 'Assi Ghat', 'Man Mandir'],
      'Manali': ['Solang Valley', 'Rohtang Pass', 'Hadimba Temple', 'Old Manali', 'Vashisht Temple'],
      'Andaman': ['Cellular Jail', 'Radhanagar Beach', 'Ross Island', 'Havelock Island', 'Neil Island']
    };

    const destinationAttractions = attractions[destination] || ['Local Market', 'City Center', 'Tourist Spot'];

    return Array.from({ length: days }, (_, dayIndex) => ({
      day: dayIndex + 1,
      title: `Day ${dayIndex + 1}: ${dayIndex === 0 ? 'Arrival & Exploration' : dayIndex === days - 1 ? 'Departure' : 'Adventure Continues'}`,
      activities: [
        {
          time: '09:00 AM',
          title: 'Breakfast',
          description: 'Start your day with a delicious local breakfast',
          cost: Math.floor(dailyBudget * 0.15),
          duration: '1 hour',
          icon: Utensils
        },
        {
          time: '10:30 AM',
          title: destinationAttractions[dayIndex % destinationAttractions.length],
          description: `Explore the famous ${destinationAttractions[dayIndex % destinationAttractions.length]}`,
          cost: Math.floor(dailyBudget * 0.2),
          duration: '3 hours',
          icon: Camera
        },
        {
          time: '02:00 PM',
          title: 'Lunch',
          description: 'Enjoy authentic local cuisine',
          cost: Math.floor(dailyBudget * 0.15),
          duration: '1.5 hours',
          icon: Utensils
        },
        {
          time: '04:00 PM',
          title: destinationAttractions[(dayIndex + 1) % destinationAttractions.length],
          description: `Visit ${destinationAttractions[(dayIndex + 1) % destinationAttractions.length]}`,
          cost: Math.floor(dailyBudget * 0.2),
          duration: '2.5 hours',
          icon: MapPin
        },
        {
          time: '07:00 PM',
          title: 'Dinner',
          description: 'End your day with a memorable dinner',
          cost: Math.floor(dailyBudget * 0.2),
          duration: '1.5 hours',
          icon: Utensils
        },
        {
          time: '09:00 PM',
          title: 'Free Time',
          description: 'Explore the local markets or relax',
          cost: 0,
          duration: '2 hours',
          icon: Clock
        }
      ],
      totalCost: dailyBudget,
      highlights: [
        destinationAttractions[dayIndex % destinationAttractions.length],
        'Local cuisine experience',
        'Cultural immersion'
      ]
    }));
  };

  const generateRecommendations = (tripType, destination) => {
    const recommendations = {
      budget: [
        { type: 'accommodation', name: 'Budget Hotels', description: 'Clean and comfortable stays under ₹1000/night' },
        { type: 'food', name: 'Local Eateries', description: 'Authentic local food at reasonable prices' },
        { type: 'transport', name: 'Public Transport', description: 'Buses and trains for budget travel' }
      ],
      premium: [
        { type: 'accommodation', name: 'Luxury Resorts', description: '5-star hotels with premium amenities' },
        { type: 'food', name: 'Fine Dining', description: 'Best restaurants and culinary experiences' },
        { type: 'transport', name: 'Private Transport', description: 'Comfortable private vehicles with drivers' }
      ],
      family: [
        { type: 'accommodation', name: 'Family Resorts', description: 'Kid-friendly accommodations with activities' },
        { type: 'food', name: 'Family Restaurants', description: 'Restaurants with kids menu and play areas' },
        { type: 'activity', name: 'Family Activities', description: 'Suitable activities for all ages' }
      ],
      couple: [
        { type: 'accommodation', name: 'Romantic Stays', description: 'Intimate and romantic accommodations' },
        { type: 'food', name: 'Candlelight Dinners', description: 'Romantic dining experiences' },
        { type: 'activity', name: 'Couple Activities', description: 'Romantic activities and experiences' }
      ],
      adventure: [
        { type: 'activity', name: 'Adventure Sports', description: 'Thrilling adventure activities' },
        { type: 'accommodation', name: 'Adventure Camps', description: 'Camps and stays for adventure seekers' },
        { type: 'transport', name: 'Adventure Transport', description: '4x4 vehicles and adventure transport' }
      ],
      solo: [
        { type: 'accommodation', name: 'Solo-Friendly Stays', description: 'Safe accommodations for solo travelers' },
        { type: 'food', name: 'Local Food Tours', description: 'Food experiences perfect for solo travelers' },
        { type: 'activity', name: 'Solo Activities', description: 'Activities perfect for solo exploration' }
      ]
    };

    return recommendations[tripType] || recommendations.budget;
  };

  const generateHiddenGems = (destination) => {
    const hiddenGems = {
      'Goa': ['Arambol Beach', 'Butterfly Beach', 'Chorao Island', 'Divar Island'],
      'Munnar': ['Kolukkumalai Tea Estate', 'Lakkom Waterfalls', 'Pothamedu Viewpoint', 'Kundala Dam'],
      'Jaipur': ['Panna Meena ka Kund', 'Sisodia Rani Garden', 'Jawahar Circle', 'Albert Hall Museum'],
      'Varanasi': ['Man Mandir Ghat', 'Darbhanga Ghat', 'Kedar Ghat', 'Shivala Ghat'],
      'Manali': ['Nehru Kund', 'Van Vihar National Park', 'Jagatsukh Temple', 'Manu Temple'],
      'Andaman': ['Baratang Island', 'Long Island', 'Neil Island', 'Havelock Island']
    };

    return hiddenGems[destination] || ['Local Market', 'Hidden Beach', 'Secret Viewpoint', 'Local Temple'];
  };

  const generateMoneySavingTips = (tripType, dailyBudget) => {
    const tips = {
      budget: [
        'Book accommodations in advance for better rates',
        'Use public transport for local travel',
        'Eat at local restaurants instead of tourist places',
        'Visit free attractions and parks',
        'Travel during off-peak seasons'
      ],
      premium: [
        'Look for luxury deals and packages',
        'Book premium accommodations with included meals',
        'Use loyalty programs for upgrades',
        'Travel during shoulder seasons for better rates',
        'Combine luxury with budget experiences'
      ],
      family: [
        'Look for family packages and discounts',
        'Choose accommodations with kitchen facilities',
        'Pack snacks and water for kids',
        'Visit free family-friendly attractions',
        'Travel during school off-season'
      ],
      couple: [
        'Book romantic packages for couples',
        'Look for honeymoon deals',
        'Choose accommodations with romantic amenities',
        'Dine at restaurants with couple discounts',
        'Travel during shoulder seasons'
      ],
      adventure: [
        'Book adventure activities in groups',
        'Look for adventure packages',
        'Carry your own gear when possible',
        'Combine multiple activities for discounts',
        'Travel during adventure off-season'
      ],
      solo: [
        'Stay in hostels or budget accommodations',
        'Use public transport',
        'Join group tours for better rates',
        'Cook your own meals when possible',
        'Travel during shoulder seasons'
      ]
    };

    return tips[tripType] || tips.budget;
  };

  const generateWeatherInfo = (destination, startDate) => {
    const weatherData = {
      'Goa': { temp: '28°C', condition: 'Sunny', humidity: '75%', wind: '15 km/h', bestTime: 'Nov-Mar' },
      'Munnar': { temp: '18°C', condition: 'Pleasant', humidity: '65%', wind: '12 km/h', bestTime: 'Sep-Mar' },
      'Jaipur': { temp: '35°C', condition: 'Hot', humidity: '25%', wind: '18 km/h', bestTime: 'Oct-Mar' },
      'Varanasi': { temp: '32°C', condition: 'Warm', humidity: '55%', wind: '10 km/h', bestTime: 'Oct-Mar' },
      'Manali': { temp: '15°C', condition: 'Cool', humidity: '45%', wind: '20 km/h', bestTime: 'Apr-Jun' },
      'Andaman': { temp: '30°C', condition: 'Tropical', humidity: '80%', wind: '12 km/h', bestTime: 'Nov-Apr' }
    };

    return weatherData[destination] || { temp: '25°C', condition: 'Pleasant', humidity: '60%', wind: '10 km/h', bestTime: 'Oct-Mar' };
  };

  const generatePackingList = (tripType, days) => {
    const baseItems = ['Clothes', 'Toiletries', 'Medications', 'Important documents', 'Cash/Cards', 'Phone charger'];
    
    const specificItems = {
      budget: ['Budget backpack', 'Water bottle', 'Snacks', 'Travel pillow', 'Basic first aid kit'],
      premium: ['Luggage set', 'Travel accessories', 'Formal wear', 'Gadgets', 'Premium toiletries'],
      family: ['Kids entertainment', 'Family first aid kit', 'Extra clothes', 'Snacks', 'Toys'],
      couple: ['Romantic outfits', 'Camera', 'Special gifts', 'Candles', 'Wine'],
      adventure: ['Adventure gear', 'First aid kit', 'Energy bars', 'Water purification', 'Navigation tools'],
      solo: ['Travel journal', 'Books', 'Camera', 'Power bank', 'Security items']
    };

    return [...baseItems, ...(specificItems[tripType] || specificItems.budget)];
  };

  const generateEmergencyContacts = (destination) => {
    return {
      police: '100',
      ambulance: '108',
      touristHelpline: '1363',
      localHospital: '+91-XXXXXXXXXX',
      emergencyServices: '+91-XXXXXXXXXX',
      hotelContact: '+91-XXXXXXXXXX',
      localGuide: '+91-XXXXXXXXXX'
    };
  };

  const savePlan = () => {
    if (tripPlan) {
      setSavedPlans(prev => [...prev, tripPlan]);
      alert('Trip plan saved successfully!');
    }
  };

  const sharePlan = () => {
    if (tripPlan) {
      const shareText = `Check out my ${tripPlan.days}-day trip to ${tripPlan.to}! Budget: ₹${tripPlan.totalBudget}`;
      if (navigator.share) {
        navigator.share({
          title: `${tripPlan.days}-day Trip to ${tripPlan.to}`,
          text: shareText
        });
      } else {
        navigator.clipboard.writeText(shareText);
        alert('Trip plan copied to clipboard!');
      }
    }
  };

  const downloadPlan = () => {
    if (tripPlan) {
      const planText = generatePlanText(tripPlan);
      const blob = new Blob([planText], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `trip-plan-${tripPlan.to}-${tripPlan.startDate}.txt`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const generatePlanText = (plan) => {
    let text = `TRIP PLAN: ${plan.from} to ${plan.to}\n`;
    text += `========================\n`;
    text += `Duration: ${plan.days} days (${plan.startDate} to ${plan.endDate})\n`;
    text += `Budget: ₹${plan.totalBudget}\n`;
    text += `Transportation: ${plan.transportation}\n`;
    text += `Trip Type: ${plan.tripType}\n\n`;
    
    text += `BEST ROUTE:\n`;
    text += `-----------\n`;
    text += `${plan.bestRoute.route}\n`;
    text += `Distance: ${plan.bestRoute.totalDistance}km\n`;
    text += `Estimated Time: ${plan.bestRoute.estimatedTime}\n`;
    text += `Fuel Stops: ${plan.bestRoute.fuelStops}\n`;
    text += `Tolls: ₹${plan.bestRoute.tolls}\n\n`;
    
    text += `ITINERARY:\n`;
    text += `----------\n`;
    plan.itinerary.forEach((day, index) => {
      text += `${day.title}\n`;
      text += `Total Cost: ₹${day.totalCost}\n`;
      text += `Highlights: ${day.highlights.join(', ')}\n`;
      day.activities.forEach(activity => {
        text += `${activity.time} - ${activity.title} (${activity.cost})\n`;
      });
      text += '\n';
    });
    
    text += `RECOMMENDATIONS:\n`;
    text += `----------------\n`;
    plan.recommendations.forEach(rec => {
      text += `${rec.name}: ${rec.description}\n`;
    });
    
    text += `\nHIDDEN GEMS:\n`;
    text += `------------\n`;
    plan.hiddenGems.forEach((gem, index) => {
      text += `${index + 1}. ${gem}\n`;
    });
    
    text += `\nMONEY SAVING TIPS:\n`;
    text += `------------------\n`;
    plan.moneySavingTips.forEach((tip, index) => {
      text += `${index + 1}. ${tip}\n`;
    });
    
    text += `\nPACKING LIST:\n`;
    text += `-------------\n`;
    plan.packingList.forEach((item, index) => {
      text += `${index + 1}. ${item}\n`;
    });
    
    text += `\nEMERGENCY CONTACTS:\n`;
    text += `------------------\n`;
    Object.entries(plan.emergencyContacts).forEach(([key, value]) => {
      text += `${key}: ${value}\n`;
    });
    
    return text;
  };

  return (
    <div className="smart-ai-trip-planner">
      {/* Header */}
      <div className="planner-header">
        <div className="header-content">
          <div className="header-text">
            <h1 className="header-title">
              <Brain className="title-icon" />
              Smart AI Trip Planner
            </h1>
            <p className="header-subtitle">
              Get personalized travel plans powered by AI. Just tell us where you want to go, and we'll create the perfect itinerary for you.
            </p>
          </div>
          <div className="header-features">
            <div className="feature-item">
              <Zap className="feature-icon" />
              <span>AI-Powered</span>
            </div>
            <div className="feature-item">
              <Target className="feature-icon" />
              <span>Personalized</span>
            </div>
            <div className="feature-item">
              <Shield className="feature-icon" />
              <span>Verified Plans</span>
            </div>
          </div>
        </div>
      </div>

      {/* Planner Form */}
      <div className="planner-form">
        <div className="form-grid">
          {/* From */}
          <div className="form-group">
            <label className="form-label">
              <MapPin className="label-icon" />
              From
            </label>
            <div className="input-wrapper">
              <input
                type="text"
                className="form-input"
                placeholder="Starting location"
                value={formData.from}
                onChange={handleInputChange}
                name="from"
              />
              <div className="destination-suggestions">
                {popularDestinations.slice(0, 3).map(dest => (
                  <button
                    key={dest.id}
                    className="suggestion-btn"
                    onClick={() => handleDestinationSelect(dest, 'from')}
                  >
                    <MapPin className="btn-icon" />
                    {dest.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* To */}
          <div className="form-group">
            <label className="form-label">
              <NavigationIcon className="label-icon" />
              To
            </label>
            <div className="input-wrapper">
              <input
                type="text"
                className="form-input"
                placeholder="Destination"
                value={formData.to}
                onChange={handleInputChange}
                name="to"
              />
              <div className="destination-suggestions">
                {popularDestinations.slice(0, 3).map(dest => (
                  <button
                    key={dest.id}
                    className="suggestion-btn"
                    onClick={() => handleDestinationSelect(dest, 'to')}
                  >
                    <MapPin className="btn-icon" />
                    {dest.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="form-group">
            <label className="form-label">
              <Calendar className="label-icon" />
              Travel Dates
            </label>
            <div className="date-inputs">
              <input
                type="date"
                className="form-input date-input"
                value={formData.startDate}
                onChange={handleInputChange}
                name="startDate"
              />
              <input
                type="date"
                className="form-input date-input"
                value={formData.endDate}
                onChange={handleInputChange}
                name="endDate"
              />
            </div>
          </div>

          {/* Members */}
          <div className="form-group">
            <label className="form-label">
              <Users className="label-icon" />
              Number of Members
            </label>
            <div className="member-selector">
              <button
                className="member-btn"
                onClick={() => setFormData(prev => ({ ...prev, members: Math.max(1, prev.members - 1) }))}
              >
                <Minus className="btn-icon" />
              </button>
              <span className="member-count">{formData.members}</span>
              <button
                className="member-btn"
                onClick={() => setFormData(prev => ({ ...prev, members: prev.members + 1 }))}
              >
                <Plus className="btn-icon" />
              </button>
            </div>
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
              placeholder="Total budget"
              value={formData.budget}
              onChange={handleInputChange}
              name="budget"
            />
          </div>

          {/* Transportation */}
          <div className="form-group">
            <label className="form-label">
              <Route className="label-icon" />
              Transportation
            </label>
            <div className="transportation-options">
              {transportationOptions.map(option => (
                <button
                  key={option.id}
                  className={`transport-option ${formData.transportation === option.id ? 'active' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, transportation: option.id }))}
                >
                  <option.icon className="option-icon" />
                  <div className="option-content">
                    <span className="option-name">{option.name}</span>
                    <span className="option-description">{option.description}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Trip Type */}
          <div className="form-group">
            <label className="form-label">
              <Lightbulb className="label-icon" />
              Trip Type
            </label>
            <div className="trip-type-options">
              {tripTypes.map(type => (
                <button
                  key={type.id}
                  className={`trip-type-option ${formData.tripType === type.id ? 'active' : ''}`}
                  style={{ '--type-color': type.color }}
                  onClick={() => setFormData(prev => ({ ...prev, tripType: type.id }))}
                >
                  <type.icon className="type-icon" />
                  <div className="type-content">
                    <span className="type-name">{type.name}</span>
                    <span className="type-description">{type.description}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <div className="form-actions">
          <button
            className="generate-btn"
            onClick={generateTripPlan}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <div className="btn-spinner"></div>
                <span>Generating AI Plan...</span>
              </>
            ) : (
              <>
                <Brain className="btn-icon" />
                <span>Generate Perfect Trip</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Results */}
      {showResults && tripPlan && (
        <div className="trip-results">
          <div className="results-header">
            <div className="results-title">
              <h2>
                <CheckCircle className="title-icon" />
                Your Perfect Trip Plan
              </h2>
              <p>
                {tripPlan.days}-day journey from {tripPlan.from} to {tripPlan.to}
              </p>
            </div>
            <div className="results-actions">
              <button className="action-btn" onClick={savePlan}>
                <Heart className="btn-icon" />
                Save
              </button>
              <button className="action-btn" onClick={sharePlan}>
                <Share2 className="btn-icon" />
                Share
              </button>
              <button className="action-btn" onClick={downloadPlan}>
                <Download className="btn-icon" />
                Download
              </button>
            </div>
          </div>

          {/* Trip Overview */}
          <div className="trip-overview">
            <div className="overview-grid">
              <div className="overview-item">
                <div className="overview-icon-wrapper">
                  <Route className="overview-icon" />
                </div>
                <div className="overview-content">
                  <h3>Route</h3>
                  <p>{tripPlan.bestRoute.route}</p>
                  <span className="overview-details">
                    {tripPlan.bestRoute.totalDistance}km • {tripPlan.bestRoute.estimatedTime}
                  </span>
                </div>
              </div>
              <div className="overview-item">
                <div className="overview-icon-wrapper">
                  <DollarSign className="overview-icon" />
                </div>
                <div className="overview-content">
                  <h3>Budget</h3>
                  <p>₹{tripPlan.totalBudget}</p>
                  <span className="overview-details">
                    ₹{Math.floor(tripPlan.totalBudget / tripPlan.days)}/day
                  </span>
                </div>
              </div>
              <div className="overview-item">
                <div className="overview-icon-wrapper">
                  <Calendar className="overview-icon" />
                </div>
                <div className="overview-content">
                  <h3>Duration</h3>
                  <p>{tripPlan.days} days</p>
                  <span className="overview-details">
                    {tripPlan.startDate} to {tripPlan.endDate}
                  </span>
                </div>
              </div>
              <div className="overview-item">
                <div className="overview-icon-wrapper">
                  <Users className="overview-icon" />
                </div>
                <div className="overview-content">
                  <h3>Members</h3>
                  <p>{tripPlan.members} travelers</p>
                  <span className="overview-details">
                    {tripPlan.tripType} trip
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Best Route */}
          <div className="route-section">
            <h3 className="section-title">
              <NavigationIcon className="section-icon" />
              Best Route Information
            </h3>
            <div className="route-details">
              <div className="route-info">
                <div className="info-item">
                  <span className="info-label">Total Distance:</span>
                  <span className="info-value">{tripPlan.bestRoute.totalDistance} km</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Estimated Time:</span>
                  <span className="info-value">{tripPlan.bestRoute.estimatedTime}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Fuel Stops:</span>
                  <span className="info-value">{tripPlan.bestRoute.fuelStops} stops</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Toll Costs:</span>
                  <span className="info-value">₹{tripPlan.bestRoute.tolls}</span>
                </div>
              </div>
              <div className="waypoints">
                <h4>Recommended Waypoints</h4>
                <div className="waypoint-list">
                  {tripPlan.bestRoute.waypoints.map((waypoint, index) => (
                    <div key={index} className="waypoint">
                      <MapPin className="waypoint-icon" />
                      <div className="waypoint-content">
                        <span className="waypoint-name">{waypoint.name}</span>
                        <span className="waypoint-details">
                          {waypoint.distance} • {waypoint.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Itinerary */}
          <div className="itinerary-section">
            <h3 className="section-title">
              <Calendar className="section-icon" />
              Day-by-Day Itinerary
            </h3>
            <div className="itinerary-timeline">
              {tripPlan.itinerary.map((day, index) => (
                <div
                  key={index}
                  className={`day-card ${selectedDay === index ? 'active' : ''}`}
                  onClick={() => setSelectedDay(selectedDay === index ? null : index)}
                >
                  <div className="day-header">
                    <div className="day-title">{day.title}</div>
                    <div className="day-cost">₹{day.totalCost}</div>
                  </div>
                  <div className="day-activities">
                    {day.activities.map((activity, actIndex) => (
                      <div key={actIndex} className="activity">
                        <div className="activity-time">{activity.time}</div>
                        <div className="activity-content">
                          <div className="activity-header">
                            <activity.icon className="activity-icon" />
                            <span className="activity-title">{activity.title}</span>
                            <span className="activity-cost">₹{activity.cost}</span>
                          </div>
                          <p className="activity-description">{activity.description}</p>
                          <span className="activity-duration">{activity.duration}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="day-highlights">
                    <h4>Highlights</h4>
                    <div className="highlights">
                      {day.highlights.map((highlight, hIndex) => (
                        <span key={hIndex} className="highlight-tag">{highlight}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="recommendations-section">
            <h3 className="section-title">
              <Star className="section-icon" />
              AI Recommendations
            </h3>
            <div className="recommendations-grid">
              {tripPlan.recommendations.map((rec, index) => (
                <div key={index} className="recommendation-card">
                  <div className="recommendation-header">
                    <h4 className="recommendation-title">{rec.name}</h4>
                    <span className="recommendation-type">{rec.type}</span>
                  </div>
                  <p className="recommendation-description">{rec.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hidden Gems */}
          <div className="hidden-gems-section">
            <h3 className="section-title">
              <Compass className="section-icon" />
              Hidden Gems
            </h3>
            <div className="hidden-gems-grid">
              {tripPlan.hiddenGems.map((gem, index) => (
                <div key={index} className="hidden-gem">
                  <div className="gem-icon-wrapper">
                    <Sparkles className="gem-icon" />
                  </div>
                  <span className="gem-name">{gem}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Money Saving Tips */}
          <div className="tips-section">
            <h3 className="section-title">
              <DollarSign className="section-icon" />
              Money Saving Tips
            </h3>
            <div className="tips-list">
              {tripPlan.moneySavingTips.map((tip, index) => (
                <div key={index} className="tip-item">
                  <Lightbulb className="tip-icon" />
                  <span className="tip-text">{tip}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Weather Info */}
          <div className="weather-section">
            <h3 className="section-title">
              <Cloud className="section-icon" />
              Weather Information
            </h3>
            <div className="weather-card">
              <div className="weather-main">
                <div className="weather-icon-wrapper">
                  <Sun className="weather-main-icon" />
                </div>
                <div className="weather-temp">{tripPlan.weatherInfo.temp}</div>
                <div className="weather-condition">{tripPlan.weatherInfo.condition}</div>
              </div>
              <div className="weather-details">
                <div className="weather-detail">
                  <Thermometer className="detail-icon" />
                  <span className="detail-label">Temperature</span>
                  <span className="detail-value">{tripPlan.weatherInfo.temp}</span>
                </div>
                <div className="weather-detail">
                  <Droplets className="detail-icon" />
                  <span className="detail-label">Humidity</span>
                  <span className="detail-value">{tripPlan.weatherInfo.humidity}</span>
                </div>
                <div className="weather-detail">
                  <Wind className="detail-icon" />
                  <span className="detail-label">Wind</span>
                  <span className="detail-value">{tripPlan.weatherInfo.wind}</span>
                </div>
                <div className="weather-detail">
                  <Calendar className="detail-icon" />
                  <span className="detail-label">Best Time</span>
                  <span className="detail-value">{tripPlan.weatherInfo.bestTime}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Packing List */}
          <div className="packing-section">
            <h3 className="section-title">
              <Globe className="section-icon" />
              Packing List
            </h3>
            <div className="packing-grid">
              {tripPlan.packingList.map((item, index) => (
                <div key={index} className="packing-item">
                  <CheckCircle className="packing-icon" />
                  <span className="packing-name">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Contacts */}
          <div className="emergency-section">
            <h3 className="section-title">
              <AlertCircle className="section-icon" />
              Emergency Contacts
            </h3>
            <div className="emergency-grid">
              {Object.entries(tripPlan.emergencyContacts).map(([key, value], index) => (
                <div key={index} className="emergency-item">
                  <div className="emergency-icon-wrapper">
                    <Phone className="emergency-icon" />
                  </div>
                  <div className="emergency-content">
                    <span className="emergency-label">{key}</span>
                    <span className="emergency-value">{value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartAITripPlanner;
