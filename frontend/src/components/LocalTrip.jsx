import React, { useState, useEffect } from 'react';
import { Location, MapPin, Navigation, Clock, DollarSign, Star, Search, Filter, ArrowLeft, Route, Camera, Mountain, TreePine, Anchor, Users, Heart, Share2, Save, Compass, Globe, Wifi, Coffee, Parking, Restroom } from 'lucide-react';
import './LocalTrip.css';

const LocalTrip = ({ onBack }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedRadius, setSelectedRadius] = useState('25');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState({ lat: 12.9716, lng: 77.5946 }); // Default: Bangalore

  // Local places database
  const localPlacesDatabase = {
    'Bangalore': {
      lat: 12.9716,
      lng: 77.5946,
      places: {
        '10km': [
          {
            name: 'Lalbagh Botanical Garden',
            category: 'Parks',
            distance: 8.5,
            travelTime: '25 mins',
            budget: 100,
            rating: 4.6,
            description: 'Beautiful botanical garden with diverse plant species',
            highlights: ['Glass House', 'Rose Garden', 'Lake'],
            facilities: ['Parking', 'Restrooms', 'Cafe'],
            image: 'https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?w=400'
          },
          {
            name: 'Cubbon Park',
            category: 'Parks',
            distance: 6.2,
            travelTime: '20 mins',
            budget: 0,
            rating: 4.4,
            description: 'Urban park perfect for morning walks',
            highlights: ['Walking Trails', 'Playground', 'Museum'],
            facilities: ['Parking', 'Restrooms'],
            image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400'
          },
          {
            name: 'Bangalore Palace',
            category: 'Historical',
            distance: 9.1,
            travelTime: '30 mins',
            budget: 230,
            rating: 4.3,
            description: 'Historic palace with beautiful architecture',
            highlights: ['Palace Tour', 'Photography', 'Gardens'],
            facilities: ['Parking', 'Restrooms', 'Guide'],
            image: 'https://images.unsplash.com/photo-1519671482749-fd1f983eca6b?w=400'
          },
          {
            name: 'ISKCON Temple',
            category: 'Religious',
            distance: 7.8,
            travelTime: '25 mins',
            budget: 50,
            rating: 4.7,
            description: 'Beautiful Krishna temple',
            highlights: ['Temple Architecture', 'Prasadam', 'Gift Shop'],
            facilities: ['Parking', 'Restrooms', 'Cafe'],
            image: 'https://images.unsplash.com/photo-1519671482749-fd1f983eca6b?w=400'
          }
        ],
        '25km': [
          {
            name: 'Nandi Hills',
            category: 'Hills',
            distance: 22.5,
            travelTime: '1 hour',
            budget: 200,
            rating: 4.5,
            description: 'Popular hill station with sunrise views',
            highlights: ['Sunrise Point', 'Trekking', 'Photography'],
            facilities: ['Parking', 'Restrooms', 'Food Stalls'],
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'
          },
          {
            name: 'Wonderla Amusement Park',
            category: 'Entertainment',
            distance: 18.7,
            travelTime: '45 mins',
            budget: 1200,
            rating: 4.6,
            description: 'Large amusement park with thrilling rides',
            highlights: ['Water Rides', 'Roller Coasters', 'Family Fun'],
            facilities: ['Parking', 'Restrooms', 'Food Court', 'Lockers'],
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'
          },
          {
            name: 'Art of Living Ashram',
            category: 'Spiritual',
            distance: 21.3,
            travelTime: '50 mins',
            budget: 0,
            rating: 4.8,
            description: 'Peaceful spiritual retreat center',
            highlights: ['Meditation Hall', 'Gardens', 'Lake View'],
            facilities: ['Parking', 'Restrooms', 'Cafe'],
            image: 'https://images.unsplash.com/photo-1519671482749-fd1f983eca6b?w=400'
          },
          {
            name: 'Shivoham Shiva Temple',
            category: 'Religious',
            distance: 15.2,
            travelTime: '35 mins',
            budget: 100,
            rating: 4.4,
            description: 'Modern Shiva temple with huge statue',
            highlights: ['108ft Shiva Statue', 'Meditation', 'Photography'],
            facilities: ['Parking', 'Restrooms'],
            image: 'https://images.unsplash.com/photo-1519671482749-fd1f983eca6b?w=400'
          },
          {
            name: 'Innovative Film City',
            category: 'Entertainment',
            distance: 24.8,
            travelTime: '1 hour',
            budget: 800,
            rating: 4.2,
            description: 'Film city with various attractions',
            highlights: ['Film Sets', 'Adventure Sports', 'Museum'],
            facilities: ['Parking', 'Restrooms', 'Food Court'],
            image: 'https://images.unsplash.com/photo-1519671482749-fd1f983eca6b?w=400'
          }
        ],
        '50km': [
          {
            name: 'Mysore Palace',
            category: 'Historical',
            distance: 45.3,
            travelTime: '1.5 hours',
            budget: 300,
            rating: 4.7,
            description: 'Magnificent royal palace',
            highlights: ['Palace Tour', 'Light Show', 'Museum'],
            facilities: ['Parking', 'Restrooms', 'Guide', 'Cafe'],
            image: 'https://images.unsplash.com/photo-1519671482749-fd1f983eca6b?w=400'
          },
          {
            name: 'Brindavan Gardens',
            category: 'Parks',
            distance: 48.7,
            travelTime: '1.5 hours',
            budget: 150,
            rating: 4.5,
            description: 'Beautiful gardens with musical fountain',
            highlights: ['Musical Fountain', 'Boating', 'Photography'],
            facilities: ['Parking', 'Restrooms', 'Food Stalls'],
            image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400'
          },
          {
            name: 'Srirangapatna',
            category: 'Historical',
            distance: 42.1,
            travelTime: '1.5 hours',
            budget: 200,
            rating: 4.4,
            description: 'Historic town with temples',
            highlights: ['Ranganathaswamy Temple', 'Tipu Sultan Tomb', 'River View'],
            facilities: ['Parking', 'Restrooms', 'Guides'],
            image: 'https://images.unsplash.com/photo-1519671482749-fd1f983eca6b?w=400'
          },
          {
            name: 'Bheemeshwari Adventure',
            category: 'Adventure',
            distance: 35.6,
            travelTime: '1 hour',
            budget: 1500,
            rating: 4.6,
            description: 'Adventure camp with water sports',
            highlights: ['River Rafting', 'Trekking', 'Camping'],
            facilities: ['Parking', 'Restrooms', 'Camping', 'Food'],
            image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400'
          },
          {
            name: 'Chunchi Falls',
            category: 'Waterfalls',
            distance: 38.9,
            travelTime: '1 hour',
            budget: 100,
            rating: 4.3,
            description: 'Beautiful waterfall',
            highlights: ['Waterfall View', 'Photography', 'Trekking'],
            facilities: ['Parking', 'Restrooms', 'Food Stalls'],
            image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400'
          }
        ],
        '100km': [
          {
            name: 'Mysore Zoo',
            category: 'Wildlife',
            distance: 48.2,
            travelTime: '1.5 hours',
            budget: 250,
            rating: 4.6,
            description: 'Well-maintained zoo with diverse animals',
            highlights: ['Animal Safari', 'Bird Park', 'Butterfly Park'],
            facilities: ['Parking', 'Restrooms', 'Food Court', 'Wheelchair Access'],
            image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400'
          },
          {
            name: 'Ranganathittu Bird Sanctuary',
            category: 'Wildlife',
            distance: 52.3,
            travelTime: '1.5 hours',
            budget: 150,
            rating: 4.5,
            description: 'Bird sanctuary with boat rides',
            highlights: ['Bird Watching', 'Boat Safari', 'Photography'],
            facilities: ['Parking', 'Restrooms', 'Guide'],
            image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400'
          },
          {
            name: 'Shivanasamudra Falls',
            category: 'Waterfalls',
            distance: 85.7,
            travelTime: '2 hours',
            budget: 200,
            rating: 4.7,
            description: 'Magnificent waterfall',
            highlights: ['Waterfall View', 'Photography', 'Nature Walk'],
            facilities: ['Parking', 'Restrooms', 'Food Stalls'],
            image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400'
          },
          {
            name: 'Talakadu',
            category: 'Historical',
            distance: 78.4,
            travelTime: '2 hours',
            budget: 100,
            rating: 4.2,
            description: 'Historic temple town buried in sand',
            highlights: ['Ancient Temples', 'Sand Dunes', 'River View'],
            facilities: ['Parking', 'Restrooms', 'Guides'],
            image: 'https://images.unsplash.com/photo-1519671482749-fd1f983eca6b?w=400'
          }
        ]
      }
    },
    'Munnar': {
      lat: 10.0889,
      lng: 77.0595,
      places: {
        '10km': [
          {
            name: 'Eravikulam National Park',
            category: 'Wildlife',
            distance: 8.2,
            travelTime: '25 mins',
            budget: 300,
            rating: 4.7,
            description: 'Home to endangered Nilgiri Tahr',
            highlights: ['Wildlife Safari', 'Mountain Views', 'Trekking'],
            facilities: ['Parking', 'Restrooms', 'Guide', 'Cafe'],
            image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400'
          },
          {
            name: 'Mattupetty Dam',
            category: 'Lakes',
            distance: 6.5,
            travelTime: '20 mins',
            budget: 200,
            rating: 4.5,
            description: 'Beautiful dam with boating facilities',
            highlights: ['Boat Ride', 'Photography', 'Mountain Views'],
            facilities: ['Parking', 'Restrooms', 'Food Stalls'],
            image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400'
          },
          {
            name: 'Echo Point',
            category: 'Viewpoints',
            distance: 9.8,
            travelTime: '30 mins',
            budget: 50,
            rating: 4.4,
            description: 'Natural echo phenomenon point',
            highlights: ['Echo Effect', 'Mountain Views', 'Photography'],
            facilities: ['Parking', 'Restrooms', 'Food Stalls'],
            image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400'
          }
        ],
        '25km': [
          {
            name: 'Top Station',
            category: 'Viewpoints',
            distance: 22.3,
            travelTime: '1 hour',
            budget: 150,
            rating: 4.6,
            description: 'Highest viewpoint in Munnar',
            highlights: ['Panoramic Views', 'Photography', 'Tea Gardens'],
            facilities: ['Parking', 'Restrooms', 'Food Stalls'],
            image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400'
          },
          {
            name: 'Kundala Lake',
            category: 'Lakes',
            distance: 18.7,
            travelTime: '45 mins',
            budget: 250,
            rating: 4.4,
            description: 'Serene lake with boating',
            highlights: ['Boat Ride', 'Photography', 'Nature Walk'],
            facilities: ['Parking', 'Restrooms', 'Food Stalls'],
            image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400'
          },
          {
            name: 'Chinnar Wildlife Sanctuary',
            category: 'Wildlife',
            distance: 24.5,
            travelTime: '1 hour',
            budget: 400,
            rating: 4.5,
            description: 'Diverse wildlife sanctuary',
            highlights: ['Wildlife Safari', 'Trekking', 'Nature Photography'],
            facilities: ['Parking', 'Restrooms', 'Guide', 'Camping'],
            image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400'
          }
        ],
        '50km': [
          {
            name: 'Anamudi Peak',
            category: 'Hills',
            distance: 45.8,
            travelTime: '1.5 hours',
            budget: 500,
            rating: 4.8,
            description: 'Highest peak in South India',
            highlights: ['Trekking', 'Mountain Views', 'Photography'],
            facilities: ['Parking', 'Restrooms', 'Guide'],
            image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400'
          },
          {
            name: 'Lakshmi Waterfalls',
            category: 'Waterfalls',
            distance: 38.9,
            travelTime: '1 hour',
            budget: 200,
            rating: 4.3,
            description: 'Beautiful waterfall',
            highlights: ['Waterfall View', 'Trekking', 'Photography'],
            facilities: ['Parking', 'Restrooms', 'Food Stalls'],
            image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400'
          }
        ],
        '100km': [
          {
            name: 'Thekkady',
            category: 'Wildlife',
            distance: 85.3,
            travelTime: '2 hours',
            budget: 800,
            rating: 4.7,
            description: 'Famous wildlife sanctuary',
            highlights: ['Periyar Wildlife Sanctuary', 'Boat Safari', 'Spice Plantation'],
            facilities: ['Parking', 'Restrooms', 'Guide', 'Resorts'],
            image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400'
          }
        ]
      }
    },
    'Goa': {
      lat: 15.2993,
      lng: 74.1240,
      places: {
        '10km': [
          {
            name: 'Baga Beach',
            category: 'Beaches',
            distance: 8.5,
            travelTime: '25 mins',
            budget: 0,
            rating: 4.5,
            description: 'Popular beach with water sports',
            highlights: ['Water Sports', 'Beach Shacks', 'Nightlife'],
            facilities: ['Parking', 'Restrooms', 'Food Stalls', 'Lifeguards'],
            image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400'
          },
          {
            name: 'Calangute Beach',
            category: 'Beaches',
            distance: 6.2,
            travelTime: '20 mins',
            budget: 0,
            rating: 4.4,
            description: 'Lively beach with activities',
            highlights: ['Water Sports', 'Beach Markets', 'Restaurants'],
            facilities: ['Parking', 'Restrooms', 'Food Stalls', 'Lifeguards'],
            image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400'
          },
          {
            name: 'Anjuna Beach',
            category: 'Beaches',
            distance: 9.1,
            travelTime: '30 mins',
            budget: 0,
            rating: 4.3,
            description: 'Famous for flea market',
            highlights: ['Flea Market', 'Beach Parties', 'Photography'],
            facilities: ['Parking', 'Restrooms', 'Food Stalls'],
            image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400'
          }
        ],
        '25km': [
          {
            name: 'Dudhsagar Falls',
            category: 'Waterfalls',
            distance: 22.5,
            travelTime: '1 hour',
            budget: 800,
            rating: 4.8,
            description: 'Magnificent waterfall',
            highlights: ['Waterfall View', 'Trekking', 'Photography'],
            facilities: ['Parking', 'Restrooms', 'Food Stalls'],
            image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400'
          },
          {
            name: 'Old Goa Churches',
            category: 'Historical',
            distance: 18.7,
            travelTime: '45 mins',
            budget: 200,
            rating: 4.6,
            description: 'UNESCO World Heritage churches',
            highlights: ['Basilica of Bom Jesus', 'Se Cathedral', 'Photography'],
            facilities: ['Parking', 'Restrooms', 'Guide'],
            image: 'https://images.unsplash.com/photo-1519671482749-fd1f983eca6b?w=400'
          },
          {
            name: 'Spice Plantation',
            category: 'Nature',
            distance: 21.3,
            travelTime: '50 mins',
            budget: 600,
            rating: 4.5,
            description: 'Guided spice plantation tour',
            highlights: ['Spice Garden Tour', 'Elephant Ride', 'Traditional Lunch'],
            facilities: ['Parking', 'Restrooms', 'Restaurant'],
            image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400'
          }
        ],
        '50km': [
          {
            name: 'Palolem Beach',
            category: 'Beaches',
            distance: 45.3,
            travelTime: '1.5 hours',
            budget: 0,
            rating: 4.7,
            description: 'Beautiful crescent-shaped beach',
            highlights: ['Beach Huts', 'Dolphin Watching', 'Photography'],
            facilities: ['Parking', 'Restrooms', 'Food Stalls', 'Lifeguards'],
            image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400'
          },
          {
            name: 'Aguada Fort',
            category: 'Historical',
            distance: 48.7,
            travelTime: '1.5 hours',
            budget: 150,
            rating: 4.4,
            description: 'Historic Portuguese fort',
            highlights: ['Fort Tour', 'Lighthouse', 'Sea Views'],
            facilities: ['Parking', 'Restrooms', 'Guide'],
            image: 'https://images.unsplash.com/photo-1519671482749-fd1f983eca6b?w=400'
          }
        ],
        '100km': [
          {
            name: 'Netravali Wildlife Sanctuary',
            category: 'Wildlife',
            distance: 85.7,
            travelTime: '2 hours',
            budget: 500,
            rating: 4.3,
            description: 'Less crowded wildlife sanctuary',
            highlights: ['Wildlife Safari', 'Trekking', 'Photography'],
            facilities: ['Parking', 'Restrooms', 'Guide'],
            image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400'
          }
        ]
      }
    }
  };

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log('Using default location');
        }
      );
    }
  }, []);

  useEffect(() => {
    if (userLocation) {
      loadNearbyPlaces();
    }
  }, [userLocation, selectedRadius, selectedCategory]);

  const loadNearbyPlaces = () => {
    setLoading(true);
    
    // Simulate API call to find nearby places
    setTimeout(() => {
      // Find nearest city in database
      const cities = Object.keys(localPlacesDatabase);
      let nearestCity = 'Bangalore'; // default
      let minDistance = Infinity;
      
      cities.forEach(city => {
        const cityData = localPlacesDatabase[city];
        const distance = calculateDistance(
          userLocation.lat, userLocation.lng,
          cityData.lat, cityData.lng
        );
        if (distance < minDistance) {
          minDistance = distance;
          nearestCity = city;
        }
      });
      
      const places = localPlacesDatabase[nearestCity]?.places[selectedRadius] || [];
      
      let filteredPlaces = places;
      if (selectedCategory !== 'all') {
        filteredPlaces = places.filter(place => place.category === selectedCategory);
      }
      
      if (searchQuery) {
        filteredPlaces = filteredPlaces.filter(place =>
          place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          place.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      setNearbyPlaces(filteredPlaces);
      setCurrentLocation(nearestCity);
      setLoading(false);
    }, 1000);
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

  const getCategoryIcon = (category) => {
    const icons = {
      'Beaches': <Anchor size={20} />,
      'Hills': <Mountain size={20} />,
      'Parks': <TreePine size={20} />,
      'Wildlife': <Compass size={20} />,
      'Historical': <Location size={20} />,
      'Waterfalls': <Navigation size={20} />,
      'Lakes': <Navigation size={20} />,
      'Viewpoints': <Camera size={20} />,
      'Entertainment': <Star size={20} />,
      'Religious': <Location size={20} />,
      'Adventure': <Compass size={20} />,
      'Nature': <TreePine size={20} />,
      'Spiritual': <Location size={20} />
    };
    return icons[category] || <MapPin size={20} />;
  };

  const getFacilityIcon = (facility) => {
    const icons = {
      'Parking': <Parking size={16} />,
      'Restrooms': <Restroom size={16} />,
      'Cafe': <Coffee size={16} />,
      'Food': <Coffee size={16} />,
      'Food Stalls': <Coffee size={16} />,
      'Food Court': <Coffee size={16} />,
      'Restaurant': <Coffee size={16} />,
      'Restaurants': <Coffee size={16} />,
      'Wifi': <Wifi size={16} />,
      'Guide': <Users size={16} />,
      'Guides': <Users size={16} />,
      'Lifeguards': <Users size={16} />,
      'Lockers': <Save size={16} />,
      'Camping': <Tent size={16} />,
      'Wheelchair Access': <Users size={16} />
    };
    return icons[facility] || <Star size={16} />;
  };

  return (
    <div className="local-trip">
      <div className="local-header">
        <button onClick={onBack} className="back-btn">
          <ArrowLeft size={24} />
        </button>
        <div className="header-content">
          <h1 className="page-title">
            <Location className="title-icon" />
            Local Trip Explorer
          </h1>
          <p className="page-subtitle">Discover hidden gems near you</p>
        </div>
      </div>

      <div className="local-controls">
        <div className="radius-selector">
          <label className="control-label">
            <Globe size={16} />
            Search Radius
          </label>
          <div className="radius-options">
            {['10km', '25km', '50km', '100km'].map(radius => (
              <button
                key={radius}
                className={`radius-btn ${selectedRadius === radius ? 'active' : ''}`}
                onClick={() => setSelectedRadius(radius)}
              >
                {radius}
              </button>
            ))}
          </div>
        </div>

        <div className="category-filter">
          <label className="control-label">
            <Filter size={16} />
            Category
          </label>
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-select"
          >
            <option value="all">All Categories</option>
            <option value="Beaches">Beaches</option>
            <option value="Hills">Hills</option>
            <option value="Parks">Parks</option>
            <option value="Wildlife">Wildlife</option>
            <option value="Historical">Historical</option>
            <option value="Waterfalls">Waterfalls</option>
            <option value="Lakes">Lakes</option>
            <option value="Viewpoints">Viewpoints</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Religious">Religious</option>
            <option value="Adventure">Adventure</option>
            <option value="Nature">Nature</option>
            <option value="Spiritual">Spiritual</option>
          </select>
        </div>

        <div className="search-container">
          <div className="search-input-wrapper">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Search places..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
      </div>

      <div className="location-info">
        <div className="location-card">
          <div className="location-header">
            <MapPin size={20} />
            <span className="location-name">Current Area: {currentLocation}</span>
          </div>
          <div className="location-coords">
            <span>Lat: {userLocation.lat.toFixed(4)}, Lng: {userLocation.lng.toFixed(4)}</span>
          </div>
        </div>
      </div>

      {loading && (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Finding nearby places...</p>
        </div>
      )}

      {!loading && nearbyPlaces.length > 0 && (
        <div className="places-grid">
          <div className="places-header">
            <h2 className="places-title">
              {nearbyPlaces.length} Places Found within {selectedRadius}
            </h2>
          </div>
          
          {nearbyPlaces.map((place, index) => (
            <div key={index} className="place-card">
              <div className="place-image">
                <img src={place.image} alt={place.name} />
                <div className="place-rating">
                  <Star size={16} />
                  <span>{place.rating}</span>
                </div>
              </div>
              
              <div className="place-content">
                <div className="place-header">
                  <div className="place-info">
                    <h3 className="place-name">{place.name}</h3>
                    <div className="place-category">
                      {getCategoryIcon(place.category)}
                      <span>{place.category}</span>
                    </div>
                  </div>
                  <div className="place-distance">
                    <MapPin size={16} />
                    <span>{place.distance} km</span>
                  </div>
                </div>
                
                <p className="place-description">{place.description}</p>
                
                <div className="place-highlights">
                  <h4>Highlights</h4>
                  <div className="highlights-list">
                    {place.highlights.map((highlight, idx) => (
                      <span key={idx} className="highlight-tag">{highlight}</span>
                    ))}
                  </div>
                </div>
                
                <div className="place-details">
                  <div className="detail-item">
                    <Clock size={16} />
                    <span>{place.travelTime}</span>
                  </div>
                  <div className="detail-item">
                    <DollarSign size={16} />
                    <span>₹{place.budget}</span>
                  </div>
                </div>
                
                <div className="place-facilities">
                  <h4>Facilities</h4>
                  <div className="facilities-list">
                    {place.facilities.map((facility, idx) => (
                      <div key={idx} className="facility-item">
                        {getFacilityIcon(facility)}
                        <span>{facility}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="place-actions">
                  <button className="action-btn primary">
                    <Route size={16} />
                    Get Directions
                  </button>
                  <button className="action-btn secondary">
                    <Heart size={16} />
                    Save
                  </button>
                  <button className="action-btn tertiary">
                    <Share2 size={16} />
                    Share
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && nearbyPlaces.length === 0 && (
        <div className="no-results">
          <div className="no-results-icon">
            <Search size={48} />
          </div>
          <h3>No places found</h3>
          <p>Try adjusting your search radius or filters</p>
        </div>
      )}
    </div>
  );
};

export default LocalTrip;
