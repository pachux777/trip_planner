import { useState, useEffect } from 'react';
import { 
  DollarSign, 
  MapPin, 
  Clock, 
  Users, 
  Calendar, 
  TrendingUp, 
  Star, 
  Heart, 
  Share2, 
  ChevronRight, 
  Route, 
  Hotel, 
  Utensils, 
  Car, 
  Train, 
  Bus, 
  Camera, 
  Mountain, 
  Trees, 
  Award, 
  CheckCircle
} from 'lucide-react';
import './BudgetTrips.css';

const BudgetTrips = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [savedTrips, setSavedTrips] = useState([]);

  const budgetTrips = [
    {
      id: 1,
      name: 'Munnar Budget Paradise',
      destination: 'Munnar, Kerala',
      duration: '3 Days / 2 Nights',
      price: 3500,
      originalPrice: 5500,
      rating: 4.8,
      reviews: 245,
      image: 'https://images.unsplash.com/photo-1548199973-75cce1b4ea31?w=400',
      category: 'hill-station',
      difficulty: 'Easy',
      bestTime: 'Sep - Mar',
      groupSize: '2-6',
      includes: ['Stay', 'Breakfast', 'Sightseeing', 'Transport'],
      highlights: ['Tea Garden Tours', 'Eravikulam Park', 'Mattupetty Dam'],
      itinerary: [
        'Day 1: Arrival in Munnar, Tea Garden Visit',
        'Day 2: Eravikulam National Park, Mattupetty Dam',
        'Day 3: Local Sightseeing, Departure'
      ],
      transport: {
        type: 'bus',
        cost: 800,
        from: 'Kochi',
        duration: '4 hours'
      },
      accommodation: {
        name: 'Budget Homestay',
        type: 'Homestay',
        rating: 4.2,
        cost: 1200
      },
      food: {
        included: 'Breakfast',
        dailyBudget: 500,
        recommendations: ['Local Keralan Food', 'Street Food', 'Hotel Restaurants']
      },
      activities: [
        { name: 'Tea Garden Tour', cost: 200, duration: '2 hours' },
        { name: 'Eravikulam Park', cost: 150, duration: '3 hours' },
        { name: 'Mattupetty Dam', cost: 100, duration: '1 hour' }
      ]
    },
    {
      id: 2,
      name: 'Goa Backpack Adventure',
      destination: 'Goa',
      duration: '4 Days / 3 Nights',
      price: 4500,
      originalPrice: 7000,
      rating: 4.9,
      reviews: 312,
      image: 'https://images.unsplash.com/photo-1512343879798-01e0e4352a18?w=400',
      category: 'beach',
      difficulty: 'Easy',
      bestTime: 'Nov - Mar',
      groupSize: '1-8',
      includes: ['Stay', 'Breakfast', 'Beach Activities', 'Transport'],
      highlights: ['Baga Beach', 'Anjuna Beach', 'Old Goa Churches'],
      itinerary: [
        'Day 1: Arrival, Beach Relaxation',
        'Day 2: North Goa Beach Tour',
        'Day 3: South Goa & Old Goa',
        'Day 4: Water Sports, Departure'
      ],
      transport: {
        type: 'train',
        cost: 600,
        from: 'Mumbai',
        duration: '12 hours'
      },
      accommodation: {
        name: 'Beach Side Guest House',
        type: 'Guest House',
        rating: 4.0,
        cost: 1800
      },
      food: {
        included: 'Breakfast',
        dailyBudget: 600,
        recommendations: ['Beach Shacks', 'Local Goan Food', 'Seafood Specialties']
      },
      activities: [
        { name: 'Beach Volleyball', cost: 0, duration: '2 hours' },
        { name: 'Water Sports', cost: 500, duration: '3 hours' },
        { name: 'Dolphin Watching', cost: 300, duration: '2 hours' }
      ]
    },
    {
      id: 3,
      name: 'Ooty Quick Escape',
      destination: 'Ooty, Tamil Nadu',
      duration: '2 Days / 1 Night',
      price: 2800,
      originalPrice: 4200,
      rating: 4.6,
      reviews: 189,
      image: 'https://images.unsplash.com/photo-1559827268-dc88b52df2a8?w=400',
      category: 'hill-station',
      difficulty: 'Easy',
      bestTime: 'Mar - Jun',
      groupSize: '2-4',
      includes: ['Stay', 'Breakfast', 'Botanical Garden', 'Transport'],
      highlights: ['Botanical Garden', 'Ooty Lake', 'Doddabetta Peak'],
      itinerary: [
        'Day 1: Arrival, Botanical Garden, Ooty Lake',
        'Day 2: Doddabetta Peak, Local Market, Departure'
      ],
      transport: {
        type: 'bus',
        cost: 500,
        from: 'Bangalore',
        duration: '6 hours'
      },
      accommodation: {
        name: 'Ooty Budget Hotel',
        type: 'Hotel',
        rating: 3.8,
        cost: 1000
      },
      food: {
        included: 'Breakfast',
        dailyBudget: 400,
        recommendations: ['South Indian Food', 'Local Restaurants', 'Hotel Dining']
      },
      activities: [
        { name: 'Botanical Garden', cost: 50, duration: '2 hours' },
        { name: 'Boat Riding', cost: 200, duration: '1 hour' },
        { name: 'Toy Train', cost: 300, duration: '2 hours' }
      ]
    },
    {
      id: 4,
      name: 'Idukki Weekend Special',
      destination: 'Idukki, Kerala',
      duration: '2 Days / 1 Night',
      price: 3200,
      originalPrice: 5000,
      rating: 4.7,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400',
      category: 'wildlife',
      difficulty: 'Moderate',
      bestTime: 'Sep - Mar',
      groupSize: '2-6',
      includes: ['Stay', 'Breakfast', 'Wildlife Sanctuary', 'Transport'],
      highlights: ['Idukki Wildlife Sanctuary', 'Dam Visit', 'Spice Plantations'],
      itinerary: [
        'Day 1: Arrival, Idukki Wildlife Sanctuary',
        'Day 2: Dam Visit, Spice Plantation Tour, Departure'
      ],
      transport: {
        type: 'car',
        cost: 1200,
        from: 'Kochi',
        duration: '4 hours'
      },
      accommodation: {
        name: 'Wildlife Resort',
        type: 'Resort',
        rating: 4.1,
        cost: 1000
      },
      food: {
        included: 'Breakfast',
        dailyBudget: 450,
        recommendations: ['Local Kerala Food', 'Resort Restaurant', 'Street Food']
      },
      activities: [
        { name: 'Wildlife Safari', cost: 400, duration: '3 hours' },
        { name: 'Dam Visit', cost: 100, duration: '1 hour' },
        { name: 'Spice Plantation Tour', cost: 200, duration: '2 hours' }
      ]
    },
    {
      id: 5,
      name: 'Jaipur Budget Heritage',
      destination: 'Jaipur, Rajasthan',
      duration: '3 Days / 2 Nights',
      price: 4000,
      originalPrice: 6500,
      rating: 4.8,
      reviews: 278,
      image: 'https://images.unsplash.com/photo-1524492412937-b784b5b9c7c9?w=400',
      category: 'heritage',
      difficulty: 'Easy',
      bestTime: 'Oct - Mar',
      groupSize: '2-8',
      includes: ['Stay', 'Breakfast', 'Heritage Sites', 'Transport'],
      highlights: ['Amber Fort', 'City Palace', 'Hawa Mahal', 'Local Markets'],
      itinerary: [
        'Day 1: Arrival, Amber Fort, Local Market',
        'Day 2: City Palace, Hawa Mahal, Jantar Mantar',
        'Day 3: Local Sightseeing, Departure'
      ],
      transport: {
        type: 'train',
        cost: 700,
        from: 'Delhi',
        duration: '4 hours'
      },
      accommodation: {
        name: 'Heritage Guest House',
        type: 'Guest House',
        rating: 4.3,
        cost: 1500
      },
      food: {
        included: 'Breakfast',
        dailyBudget: 550,
        recommendations: ['Rajasthani Thali', 'Local Restaurants', 'Street Food']
      },
      activities: [
        { name: 'Amber Fort', cost: 200, duration: '3 hours' },
        { name: 'City Palace', cost: 150, duration: '2 hours' },
        { name: 'Local Market Shopping', cost: 300, duration: '2 hours' }
      ]
    },
    {
      id: 6,
      name: 'Manali Budget Adventure',
      destination: 'Manali, Himachal Pradesh',
      duration: '4 Days / 3 Nights',
      price: 5500,
      originalPrice: 8500,
      rating: 4.9,
      reviews: 324,
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400',
      category: 'adventure',
      difficulty: 'Moderate',
      bestTime: 'Apr - Jun',
      groupSize: '2-6',
      includes: ['Stay', 'Breakfast', 'Adventure Activities', 'Transport'],
      highlights: ['Solang Valley', 'Rohtang Pass', 'Hadimba Temple'],
      itinerary: [
        'Day 1: Arrival, Local Sightseeing',
        'Day 2: Solang Valley Adventure',
        'Day 3: Rohtang Pass (if accessible)',
        'Day 4: Hadimba Temple, Departure'
      ],
      transport: {
        type: 'bus',
        cost: 1000,
        from: 'Delhi',
        duration: '14 hours'
      },
      accommodation: {
        name: 'Manali Budget Hostel',
        type: 'Hostel',
        rating: 4.4,
        cost: 2000
      },
      food: {
        included: 'Breakfast',
        dailyBudget: 500,
        recommendations: ['Himachali Food', 'Local Restaurants', 'Cafes']
      },
      activities: [
        { name: 'Paragliding', cost: 1500, duration: '1 hour' },
        { name: 'Skiing', cost: 1000, duration: '2 hours' },
        { name: 'River Rafting', cost: 800, duration: '2 hours' }
      ]
    }
  ];

  const categories = [
    { id: 'all', name: 'All Trips', icon: Route },
    { id: 'hill-station', name: 'Hill Stations', icon: Mountain },
    { id: 'beach', name: 'Beach', icon: Trees },
    { id: 'heritage', name: 'Heritage', icon: Award },
    { id: 'adventure', name: 'Adventure', icon: Camera },
    { id: 'wildlife', name: 'Wildlife', icon: Trees }
  ];

  const filteredTrips = selectedCategory === 'all' 
    ? budgetTrips 
    : budgetTrips.filter(trip => trip.category === selectedCategory);

  const saveTrip = (tripId) => {
    if (savedTrips.includes(tripId)) {
      setSavedTrips(savedTrips.filter(id => id !== tripId));
    } else {
      setSavedTrips([...savedTrips, tripId]);
    }
  };

  const shareTrip = (trip) => {
    if (navigator.share) {
      navigator.share({
        title: trip.name,
        text: `Check out this budget trip to ${trip.destination} for only ₹${trip.price}!`,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(
        `Check out this budget trip to ${trip.destination} for only ₹${trip.price}!\n${window.location.href}`
      );
      alert('Trip details copied to clipboard!');
    }
  };

  return (
    <div className="budget-trips">
      <div className="trips-header">
        <h1 className="trips-title">
          <DollarSign className="title-icon" />
          Best Budget Trips Across India
        </h1>
        <p className="trips-subtitle">
          Discover amazing budget-friendly adventures without compromising on experiences
        </p>
      </div>

      {/* Category Filter */}
      <div className="category-filter">
        <div className="filter-buttons">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <category.icon className="filter-icon" />
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Trips Grid */}
      <div className="trips-grid">
        {filteredTrips.map((trip) => (
          <div key={trip.id} className="trip-card glassmorphism">
            {/* Image Section */}
            <div className="trip-image">
              <img src={trip.image} alt={trip.name} />
              <div className="image-overlay">
                <div className="trip-price">
                  <span className="current-price">₹{trip.price}</span>
                  <span className="original-price">₹{trip.originalPrice}</span>
                  <span className="discount">{Math.round((1 - trip.price / trip.originalPrice) * 100)}% OFF</span>
                </div>
                <div className="trip-actions">
                  <button
                    className="action-btn"
                    onClick={() => saveTrip(trip.id)}
                  >
                    <Heart className={`action-icon ${savedTrips.includes(trip.id) ? 'saved' : ''}`} />
                  </button>
                  <button
                    className="action-btn"
                    onClick={() => shareTrip(trip)}
                  >
                    <Share2 className="action-icon" />
                  </button>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="trip-content">
              <div className="trip-header">
                <h3 className="trip-name">{trip.name}</h3>
                <div className="trip-rating">
                  <Star className="rating-icon" />
                  <span>{trip.rating}</span>
                  <span className="reviews">({trip.reviews} reviews)</span>
                </div>
              </div>

              <div className="trip-meta">
                <div className="meta-item">
                  <MapPin className="meta-icon" />
                  <span>{trip.destination}</span>
                </div>
                <div className="meta-item">
                  <Clock className="meta-icon" />
                  <span>{trip.duration}</span>
                </div>
                <div className="meta-item">
                  <Users className="meta-icon" />
                  <span>{trip.groupSize}</span>
                </div>
                <div className="meta-item">
                  <TrendingUp className="meta-icon" />
                  <span>{trip.difficulty}</span>
                </div>
              </div>

              {/* Highlights */}
              <div className="trip-highlights">
                <h4>Highlights</h4>
                <div className="highlights-list">
                  {trip.highlights.map((highlight, index) => (
                    <div key={index} className="highlight-item">
                      <CheckCircle className="highlight-icon" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Includes */}
              <div className="trip-includes">
                <h4>What's Included</h4>
                <div className="includes-list">
                  {trip.includes.map((item, index) => (
                    <div key={index} className="include-item">
                      <CheckCircle className="include-icon" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cost Breakdown */}
              <div className="cost-breakdown">
                <h4>Cost Breakdown</h4>
                <div className="cost-list">
                  <div className="cost-item">
                    <div className="cost-header">
                      <Hotel className="cost-icon" />
                      <span>Accommodation</span>
                    </div>
                    <span className="cost-value">₹{trip.accommodation.cost}</span>
                  </div>
                  <div className="cost-item">
                    <div className="cost-header">
                      <Car className="cost-icon" />
                      <span>Transport</span>
                    </div>
                    <span className="cost-value">₹{trip.transport.cost}</span>
                  </div>
                  <div className="cost-item">
                    <div className="cost-header">
                      <Utensils className="cost-icon" />
                      <span>Food</span>
                    </div>
                    <span className="cost-value">₹{trip.food.dailyBudget * parseInt(trip.duration.split(' ')[0])}</span>
                  </div>
                  <div className="cost-item">
                    <div className="cost-header">
                      <Camera className="cost-icon" />
                      <span>Activities</span>
                    </div>
                    <span className="cost-value">₹{trip.activities.reduce((sum, act) => sum + act.cost, 0)}</span>
                  </div>
                </div>
              </div>

              {/* Book Button */}
              <button className="book-trip-btn">
                <Calendar className="btn-icon" />
                Book This Trip
                <ChevronRight className="btn-icon-right" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <div className="stats-grid">
          <div className="stat-card glassmorphism">
            <div className="stat-icon-wrapper">
              <DollarSign className="stat-icon" />
            </div>
            <div className="stat-content">
              <h3>Avg. Trip Cost</h3>
              <p>₹{Math.round(budgetTrips.reduce((sum, trip) => sum + trip.price, 0) / budgetTrips.length)}</p>
            </div>
          </div>
          <div className="stat-card glassmorphism">
            <div className="stat-icon-wrapper">
              <Star className="stat-icon" />
            </div>
            <div className="stat-content">
              <h3>Avg. Rating</h3>
              <p>{(budgetTrips.reduce((sum, trip) => sum + trip.rating, 0) / budgetTrips.length).toFixed(1)}/5.0</p>
            </div>
          </div>
          <div className="stat-card glassmorphism">
            <div className="stat-icon-wrapper">
              <Users className="stat-icon" />
            </div>
            <div className="stat-content">
              <h3>Total Reviews</h3>
              <p>{budgetTrips.reduce((sum, trip) => sum + trip.reviews, 0).toLocaleString()}</p>
            </div>
          </div>
          <div className="stat-card glassmorphism">
            <div className="stat-icon-wrapper">
              <Award className="stat-icon" />
            </div>
            <div className="stat-content">
              <h3>Saved Trips</h3>
              <p>{savedTrips.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetTrips;
