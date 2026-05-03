import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Star, 
  Clock, 
  Phone, 
  Globe, 
  Navigation, 
  Camera, 
  Heart, 
  Share2, 
  Calendar,
  Mountain,
  Water,
  Building,
  Trees,
  Sun,
  Cloud,
  Hotel,
  Utensils,
  Car,
  Train,
  Plane,
  TrendingUp,
  Award,
  Users,
  DollarSign,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import './PlaceDetails.css';

const PlaceDetails = () => {
  const { placeName } = useParams();
  const navigate = useNavigate();
  const [placeData, setPlaceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Simulate API call to get place details
    setTimeout(() => {
      setPlaceData(generatePlaceData(placeName));
      setLoading(false);
    }, 1000);
  }, [placeName]);

  const generatePlaceData = (place) => {
    const placeDatabase = {
      'idukki': {
        name: 'Idukki',
        state: 'Kerala',
        description: 'A beautiful hill district known for its tea plantations, wildlife sanctuaries, and stunning landscapes.',
        image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
        rating: 4.7,
        bestTime: 'September to March',
        weather: 'Pleasant (15-25°C)',
        category: 'Hill Station',
        attractions: [
          { name: 'Munnar Tea Plantations', type: 'Natural', rating: 4.8, distance: '30km', time: '2 hours', image: 'https://images.unsplash.com/photo-1548199973-75cce1b4ea31?w=300' },
          { name: 'Idukki Wildlife Sanctuary', type: 'Wildlife', rating: 4.6, distance: '45km', time: '3 hours', image: 'https://images.unsplash.com/photo-1559827268-dc88b52df2a8?w=300' },
          { name: 'Thekkady', type: 'Nature', rating: 4.9, distance: '60km', time: '4 hours', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300' },
          { name: 'Idukki Dam', type: 'Engineering', rating: 4.5, distance: '55km', time: '3.5 hours', image: 'https://images.unsplash.com/photo-1540202404-1b627c8aeb30?w=300' },
          { name: 'Ramakkalmedu', type: 'Viewpoint', rating: 4.7, distance: '40km', time: '2.5 hours', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300' },
          { name: 'Vagamon', type: 'Hill Station', rating: 4.8, distance: '35km', time: '2 hours', image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300' }
        ],
        hiddenGems: [
          { name: 'Kulamavu', description: 'Serene village with pristine landscapes', rating: 4.4 },
          { name: 'Kattappana', description: 'Lesser-known spice plantation area', rating: 4.3 },
          { name: 'Nadukani', description: 'Beautiful viewpoint with valley views', rating: 4.5 }
        ],
        waterfalls: [
          { name: 'Cheeyappara Waterfalls', height: '1000ft', bestTime: 'Monsoon', distance: '25km' },
          { name: 'Valara Waterfalls', height: '1000ft', bestTime: 'Monsoon', distance: '30km' },
          { name: 'Thottiyar Waterfalls', height: '200ft', bestTime: 'Post-monsoon', distance: '40km' }
        ],
        hillStations: [
          { name: 'Munnar', elevation: '1600m', specialty: 'Tea Gardens', distance: '30km' },
          { name: 'Vagamon', elevation: '1100m', specialty: 'Meadows', distance: '35km' },
          { name: 'Kumily', elevation: '900m', specialty: 'Spice Plantations', distance: '60km' }
        ],
        viewpoints: [
          { name: 'Ramakkalmedu', elevation: '1200m', view: 'Western Ghats', distance: '40km' },
          { name: 'Kulamavu', elevation: '800m', view: 'Reservoir', distance: '25km' },
          { name: 'Calvary Mount', elevation: '600m', view: 'Town View', distance: '15km' }
        ],
        temples: [
          { name: 'Mangala Devi Temple', deity: 'Goddess', built: 'Ancient', distance: '50km' },
          { name: 'Idukki Arch Dam Temple', deity: 'Shiva', built: 'Modern', distance: '55km' }
        ],
        lakes: [
          { name: 'Idukki Reservoir', area: '60 sq km', activities: 'Boating, Fishing', distance: '55km' },
          { name: 'Kulamavu Lake', area: '15 sq km', activities: 'Kayaking', distance: '25km' }
        ],
        resorts: [
          { name: 'The Leaf Munnar', price: '₹8000/night', rating: 4.8, distance: '30km' },
          { name: 'Parakkat Nature Resort', price: '₹6000/night', rating: 4.6, distance: '35km' },
          { name: 'Chandys Windy Woods', price: '₹7000/night', rating: 4.7, distance: '32km' }
        ],
        nearbyPlaces: [
          { name: 'Munnar', distance: '30km', time: '1 hour', attractions: 'Tea Gardens, Eravikulam Park' },
          { name: 'Thekkady', distance: '60km', time: '2 hours', attractions: 'Periyar Wildlife Sanctuary' },
          { name: 'Kottayam', distance: '80km', time: '2.5 hours', attractions: 'Backwaters, Churches' }
        ],
        transportation: {
          byCar: { time: '4 hours from Kochi', distance: '130km', cost: '₹3000' },
          byTrain: { time: '6 hours from Kochi', distance: '150km', cost: '₹500' },
          byBus: { time: '5 hours from Kochi', distance: '140km', cost: '₹300' },
          byFlight: { time: '1 hour to Kochi + 4 hours road', distance: '130km', cost: '₹5000' }
        },
        budget: {
          budget: { daily: '₹1500-2500', stay: '₹800-1500', food: '₹400-600', transport: '₹300-400' },
          mid: { daily: '₹3000-5000', stay: '₹2000-3500', food: '₹800-1200', transport: '₹600-1000' },
          luxury: { daily: '₹8000-15000', stay: '₹5000-10000', food: '₹2000-4000', transport: '₹1500-3000' }
        }
      },
      'goa': {
        name: 'Goa',
        state: 'Goa',
        description: 'India\'s smallest state known for its beaches, nightlife, and Portuguese heritage.',
        image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800',
        rating: 4.8,
        bestTime: 'November to March',
        weather: 'Tropical (25-35°C)',
        category: 'Beach Destination',
        attractions: [
          { name: 'Baga Beach', type: 'Beach', rating: 4.6, distance: '15km', time: '30 mins', image: 'https://images.unsplash.com/photo-1512343879798-01e0e4352a18?w=300' },
          { name: 'Anjuna Beach', type: 'Beach', rating: 4.5, distance: '20km', time: '45 mins', image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300' },
          { name: 'Old Goa Churches', type: 'Historical', rating: 4.7, distance: '10km', time: '20 mins', image: 'https://images.unsplash.com/photo-1548199973-75cce1b4ea31?w=300' },
          { name: 'Dudhsagar Falls', type: 'Waterfall', rating: 4.9, distance: '60km', time: '2 hours', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300' }
        ]
      }
    };

    return placeDatabase[place.toLowerCase()] || placeDatabase['idukki'];
  };

  if (loading) {
    return (
      <div className="place-details-loading">
        <div className="loading-spinner"></div>
        <p>Loading place details...</p>
      </div>
    );
  }

  if (!placeData) {
    return (
      <div className="place-details-error">
        <h2>Place not found</h2>
        <p>The place "{placeName}" could not be found.</p>
        <button onClick={() => navigate('/main')} className="back-btn">
          <ArrowLeft className="btn-icon" />
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="place-details">
      {/* Hero Section */}
      <div className="place-hero">
        <div className="hero-image">
          <img src={placeData.image} alt={placeData.name} />
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <button onClick={() => navigate('/main')} className="back-btn">
            <ArrowLeft className="btn-icon" />
            Back
          </button>
          <div className="place-header">
            <h1 className="place-title">{placeData.name}</h1>
            <div className="place-meta">
              <span className="place-state">{placeData.state}</span>
              <span className="place-category">{placeData.category}</span>
            </div>
            <div className="place-rating">
              <Star className="rating-icon" />
              <span>{placeData.rating}</span>
              <span className="rating-text">({Math.floor(Math.random() * 1000) + 500} reviews)</span>
            </div>
          </div>
          <div className="place-info">
            <div className="info-item">
              <Calendar className="info-icon" />
              <span>Best Time: {placeData.bestTime}</span>
            </div>
            <div className="info-item">
              <Sun className="info-icon" />
              <span>Weather: {placeData.weather}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="place-content">
        <div className="content-tabs">
          <button
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <Globe className="tab-icon" />
            Overview
          </button>
          <button
            className={`tab-btn ${activeTab === 'attractions' ? 'active' : ''}`}
            onClick={() => setActiveTab('attractions')}
          >
            <Camera className="tab-icon" />
            Attractions
          </button>
          <button
            className={`tab-btn ${activeTab === 'hidden' ? 'active' : ''}`}
            onClick={() => setActiveTab('hidden')}
          >
            <Mountain className="tab-icon" />
            Hidden Gems
          </button>
          <button
            className={`tab-btn ${activeTab === 'nature' ? 'active' : ''}`}
            onClick={() => setActiveTab('nature')}
          >
            <Trees className="tab-icon" />
            Nature
          </button>
          <button
            className={`tab-btn ${activeTab === 'stay' ? 'active' : ''}`}
            onClick={() => setActiveTab('stay')}
          >
            <Hotel className="tab-icon" />
            Stay
          </button>
          <button
            className={`tab-btn ${activeTab === 'transport' ? 'active' : ''}`}
            onClick={() => setActiveTab('transport')}
          >
            <Car className="tab-icon" />
            Transport
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'overview' && (
            <div className="overview-content">
              <div className="overview-section">
                <h2>About {placeData.name}</h2>
                <p className="place-description">{placeData.description}</p>
              </div>

              <div className="quick-info-grid">
                <div className="info-card glassmorphism">
                  <Calendar className="card-icon" />
                  <h3>Best Time to Visit</h3>
                  <p>{placeData.bestTime}</p>
                </div>
                <div className="info-card glassmorphism">
                  <Sun className="card-icon" />
                  <h3>Weather</h3>
                  <p>{placeData.weather}</p>
                </div>
                <div className="info-card glassmorphism">
                  <Star className="card-icon" />
                  <h3>Rating</h3>
                  <p>{placeData.rating}/5.0</p>
                </div>
                <div className="info-card glassmorphism">
                  <MapPin className="card-icon" />
                  <h3>Category</h3>
                  <p>{placeData.category}</p>
                </div>
              </div>

              <div className="nearby-places">
                <h2>Nearby Places</h2>
                <div className="nearby-grid">
                  {placeData.nearbyPlaces.map((place, index) => (
                    <div key={index} className="nearby-card glassmorphism">
                      <h3>{place.name}</h3>
                      <div className="nearby-info">
                        <div className="info-row">
                          <Navigation className="row-icon" />
                          <span>{place.distance}</span>
                        </div>
                        <div className="info-row">
                          <Clock className="row-icon" />
                          <span>{place.time}</span>
                        </div>
                      </div>
                      <p className="nearby-attractions">{place.attractions}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'attractions' && (
            <div className="attractions-content">
              <h2>Top Attractions</h2>
              <div className="attractions-grid">
                {placeData.attractions.map((attraction, index) => (
                  <div key={index} className="attraction-card glassmorphism">
                    <div className="attraction-image">
                      <img src={attraction.image} alt={attraction.name} />
                      <div className="attraction-overlay"></div>
                    </div>
                    <div className="attraction-content">
                      <h3>{attraction.name}</h3>
                      <div className="attraction-meta">
                        <span className="attraction-type">{attraction.type}</span>
                        <div className="attraction-rating">
                          <Star className="rating-icon" />
                          <span>{attraction.rating}</span>
                        </div>
                      </div>
                      <div className="attraction-details">
                        <div className="detail-item">
                          <Navigation className="detail-icon" />
                          <span>{attraction.distance}</span>
                        </div>
                        <div className="detail-item">
                          <Clock className="detail-icon" />
                          <span>{attraction.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'hidden' && (
            <div className="hidden-content">
              <h2>Hidden Gems</h2>
              <div className="hidden-grid">
                {placeData.hiddenGems.map((gem, index) => (
                  <div key={index} className="hidden-card glassmorphism">
                    <h3>{gem.name}</h3>
                    <p>{gem.description}</p>
                    <div className="hidden-rating">
                      <Star className="rating-icon" />
                      <span>{gem.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'nature' && (
            <div className="nature-content">
              <div className="nature-section">
                <h2><Water className="section-icon" /> Waterfalls</h2>
                <div className="waterfall-grid">
                  {placeData.waterfalls.map((waterfall, index) => (
                    <div key={index} className="waterfall-card glassmorphism">
                      <h3>{waterfall.name}</h3>
                      <div className="waterfall-details">
                        <div className="detail-row">
                          <Mountain className="detail-icon" />
                          <span>Height: {waterfall.height}</span>
                        </div>
                        <div className="detail-row">
                          <Calendar className="detail-icon" />
                          <span>Best Time: {waterfall.bestTime}</span>
                        </div>
                        <div className="detail-row">
                          <Navigation className="detail-icon" />
                          <span>Distance: {waterfall.distance}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="nature-section">
                <h2><Mountain className="section-icon" /> Hill Stations</h2>
                <div className="hill-station-grid">
                  {placeData.hillStations.map((station, index) => (
                    <div key={index} className="hill-station-card glassmorphism">
                      <h3>{station.name}</h3>
                      <div className="station-details">
                        <div className="detail-row">
                          <Mountain className="detail-icon" />
                          <span>Elevation: {station.elevation}</span>
                        </div>
                        <div className="detail-row">
                          <Star className="detail-icon" />
                          <span>Specialty: {station.specialty}</span>
                        </div>
                        <div className="detail-row">
                          <Navigation className="detail-icon" />
                          <span>Distance: {station.distance}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="nature-section">
                <h2><Sun className="section-icon" /> View Points</h2>
                <div className="viewpoint-grid">
                  {placeData.viewpoints.map((viewpoint, index) => (
                    <div key={index} className="viewpoint-card glassmorphism">
                      <h3>{viewpoint.name}</h3>
                      <div className="viewpoint-details">
                        <div className="detail-row">
                          <Mountain className="detail-icon" />
                          <span>Elevation: {viewpoint.elevation}</span>
                        </div>
                        <div className="detail-row">
                          <Camera className="detail-icon" />
                          <span>View: {viewpoint.view}</span>
                        </div>
                        <div className="detail-row">
                          <Navigation className="detail-icon" />
                          <span>Distance: {viewpoint.distance}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="nature-section">
                <h2><Building className="section-icon" /> Temples</h2>
                <div className="temple-grid">
                  {placeData.temples.map((temple, index) => (
                    <div key={index} className="temple-card glassmorphism">
                      <h3>{temple.name}</h3>
                      <div className="temple-details">
                        <div className="detail-row">
                          <Users className="detail-icon" />
                          <span>Deity: {temple.deity}</span>
                        </div>
                        <div className="detail-row">
                          <Clock className="detail-icon" />
                          <span>Built: {temple.built}</span>
                        </div>
                        <div className="detail-row">
                          <Navigation className="detail-icon" />
                          <span>Distance: {temple.distance}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="nature-section">
                <h2><Water className="section-icon" /> Lakes</h2>
                <div className="lake-grid">
                  {placeData.lakes.map((lake, index) => (
                    <div key={index} className="lake-card glassmorphism">
                      <h3>{lake.name}</h3>
                      <div className="lake-details">
                        <div className="detail-row">
                          <Water className="detail-icon" />
                          <span>Area: {lake.area}</span>
                        </div>
                        <div className="detail-row">
                          <Users className="detail-icon" />
                          <span>Activities: {lake.activities}</span>
                        </div>
                        <div className="detail-row">
                          <Navigation className="detail-icon" />
                          <span>Distance: {lake.distance}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'stay' && (
            <div className="stay-content">
              <h2>Resorts & Accommodation</h2>
              <div className="resorts-grid">
                {placeData.resorts.map((resort, index) => (
                  <div key={index} className="resort-card glassmorphism">
                    <h3>{resort.name}</h3>
                    <div className="resort-details">
                      <div className="detail-row">
                        <DollarSign className="detail-icon" />
                        <span>{resort.price}</span>
                      </div>
                      <div className="detail-row">
                        <Star className="detail-icon" />
                        <span>Rating: {resort.rating}</span>
                      </div>
                      <div className="detail-row">
                        <Navigation className="detail-icon" />
                        <span>Distance: {resort.distance}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="budget-section">
                <h2>Budget Planning</h2>
                <div className="budget-grid">
                  {Object.entries(placeData.budget).map(([type, budget]) => (
                    <div key={type} className="budget-card glassmorphism">
                      <h3>{type.charAt(0).toUpperCase() + type.slice(1)} Budget</h3>
                      <div className="budget-details">
                        <div className="budget-item">
                          <span className="budget-label">Daily:</span>
                          <span className="budget-amount">{budget.daily}</span>
                        </div>
                        <div className="budget-item">
                          <span className="budget-label">Stay:</span>
                          <span className="budget-amount">{budget.stay}</span>
                        </div>
                        <div className="budget-item">
                          <span className="budget-label">Food:</span>
                          <span className="budget-amount">{budget.food}</span>
                        </div>
                        <div className="budget-item">
                          <span className="budget-label">Transport:</span>
                          <span className="budget-amount">{budget.transport}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'transport' && (
            <div className="transport-content">
              <h2>Transportation Options</h2>
              <div className="transport-grid">
                {Object.entries(placeData.transportation).map(([mode, transport]) => (
                  <div key={mode} className="transport-card glassmorphism">
                    <div className="transport-header">
                      {mode === 'byCar' && <Car className="transport-icon" />}
                      {mode === 'byTrain' && <Train className="transport-icon" />}
                      {mode === 'byBus' && <Bus className="transport-icon" />}
                      {mode === 'byFlight' && <Plane className="transport-icon" />}
                      <h3>{mode.charAt(0).toUpperCase() + mode.slice(1)}</h3>
                    </div>
                    <div className="transport-details">
                      <div className="detail-row">
                        <Clock className="detail-icon" />
                        <span>{transport.time}</span>
                      </div>
                      <div className="detail-row">
                        <Navigation className="detail-icon" />
                        <span>{transport.distance}</span>
                      </div>
                      <div className="detail-row">
                        <DollarSign className="detail-icon" />
                        <span>{transport.cost}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaceDetails;
