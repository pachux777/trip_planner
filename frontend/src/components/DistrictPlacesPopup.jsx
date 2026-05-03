import React, { useState } from 'react';
import { X, MapPin, Star, Camera, Clock, DollarSign, Navigation, ArrowLeft, Search, Filter, Heart, Share2, Calendar, Users, Hotel, Utensils, TrendingUp, Award, Shield, Zap, Compass, Eye, Globe } from 'lucide-react';
import './DistrictPlacesPopup.css';

const DistrictPlacesPopup = ({ district, onClose, onPlaceSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPlace, setSelectedPlace] = useState(null);

  // Comprehensive database of all districts and their tourist places
  const districtPlacesDatabase = {
    'Kasaragod': {
      state: 'Kerala',
      description: 'Northernmost district of Kerala, known for beaches, forts, and cultural heritage',
      categories: {
        'Beaches': [
          { name: 'Bekal Beach', rating: 4.5, description: 'Famous beach with Bekal Fort backdrop', image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400', entryFee: 'Free', timing: '6 AM - 6 PM' },
          { name: 'Chandragiri Beach', rating: 4.3, description: 'Peaceful beach with sunset views', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400', entryFee: 'Free', timing: '6 AM - 6 PM' },
          { name: 'Kappil Beach', rating: 4.4, description: 'Secluded beach with backwaters', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400', entryFee: 'Free', timing: '6 AM - 6 PM' },
          { name: 'Ajanur Beach', rating: 4.2, description: 'Less crowded pristine beach', image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400', entryFee: 'Free', timing: '6 AM - 6 PM' }
        ],
        'Historical Places': [
          { name: 'Bekal Fort', rating: 4.7, description: 'Largest fort in Kerala, preserved monument', image: 'https://images.unsplash.com/photo-1519671482749-fd1f983eca6b?w=400', entryFee: '₹20', timing: '8 AM - 6 PM' },
          { name: 'Chandragiri Fort', rating: 4.3, description: 'Historical fort built by Shivappa Nayaka', image: 'https://images.unsplash.com/photo-1519671482749-fd1f983eca6b?w=400', entryFee: '₹10', timing: '9 AM - 5 PM' },
          { name: 'Kottappuram Fort', rating: 4.1, description: 'Ancient fort ruins', image: 'https://images.unsplash.com/photo-1519671482749-fd1f983eca6b?w=400', entryFee: 'Free', timing: 'Sunrise - Sunset' },
          { name: 'Madhur Temple', rating: 4.6, description: 'Ancient Shiva temple with unique architecture', image: 'https://images.unsplash.com/photo-1519671482749-fd1f983eca6b?w=400', entryFee: 'Free', timing: '5 AM - 12 PM, 5 PM - 8 PM' }
        ],
        'Religious Sites': [
          { name: 'Ananthapura Lake Temple', rating: 4.8, description: 'Only lake temple in Kerala', image: 'https://images.unsplash.com/photo-1519671482749-fd1f983eca6b?w=400', entryFee: 'Free', timing: '6 AM - 12 PM, 5 PM - 8 PM' },
          { name: 'Mallikarjuna Temple', rating: 4.4, description: 'Ancient Shiva temple', image: 'https://images.unsplash.com/photo-1519671482749-fd1f983eca6b?w=400', entryFee: 'Free', timing: '6 AM - 12 PM, 4 PM - 8 PM' },
          { name: 'Manjeswaram Sree Mahalingeshwara Temple', rating: 4.5, description: 'Famous Shiva temple', image: 'https://images.unsplash.com/photo-1519671482749-fd1f983eca6b?w=400', entryFee: 'Free', timing: '5 AM - 12 PM, 5 PM - 8 PM' },
          { name: 'Adoor Temple', rating: 4.3, description: 'Ancient Krishna temple', image: 'https://images.unsplash.com/photo-1519671482749-fd1f983eca6b?w=400', entryFee: 'Free', timing: '5 AM - 11 AM, 5 PM - 9 PM' }
        ],
        'Nature & Wildlife': [
          { name: 'Karengudi Reserve Forest', rating: 4.2, description: 'Dense forest with diverse wildlife', image: 'https://images.unsplash.com/photo-1519671482749-fd1f983eca6b?w=400', entryFee: '₹50', timing: '6 AM - 5 PM' },
          { name: 'Paivalike Wetlands', rating: 4.3, description: 'Bird watching paradise', image: 'https://images.unsplash.com/photo-1519671482749-fd1f983eca6b?w=400', entryFee: 'Free', timing: '6 AM - 6 PM' },
          { name: 'Nileshwaram River', rating: 4.1, description: 'Scenic river for boating', image: 'https://images.unsplash.com/photo-1519671482749-fd1f983eca6b?w=400', entryFee: '₹100', timing: '8 AM - 6 PM' },
          { name: 'Shanthapura Lake', rating: 4.0, description: 'Peaceful lake for relaxation', image: 'https://images.unsplash.com/photo-1519671482749-fd1f983eca6b?w=400', entryFee: 'Free', timing: 'Sunrise - Sunset' }
        ],
        'Cultural Sites': [
          { name: 'Rashtriya Sanskrit Sansthan', rating: 4.4, description: 'Sanskrit research center', image: 'https://images.unsplash.com/photo-1519671482749-fd1f983eca6b?w=400', entryFee: 'Free', timing: '9 AM - 5 PM' },
          { name: 'Yakshagana Training Center', rating: 4.6, description: 'Traditional art form training', image: 'https://images.unsplash.com/photo-1519671482749-fd1f983eca6b?w=400', entryFee: 'Free', timing: '10 AM - 6 PM' },
          { name: 'Folklore Museum', rating: 4.2, description: 'Traditional artifacts and culture', image: 'https://images.unsplash.com/photo-1519671482749-fd1f983eca6b?w=400', entryFee: '₹20', timing: '10 AM - 5 PM' }
        ]
      }
    },
    'Kannur': {
      state: 'Kerala',
      description: 'City of Looms and Lores, known for beaches and handloom industry',
      categories: {
        'Beaches': [
          { name: 'Muzhappilangad Beach', rating: 4.6, description: 'Longest drive-in beach in Kerala', image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400', entryFee: 'Free', timing: '6 AM - 6 PM' },
          { name: 'Payyambalam Beach', rating: 4.4, description: 'Popular beach with garden', image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400', entryFee: 'Free', timing: '6 AM - 6 PM' },
          { name: 'Kizhunna Beach', rating: 4.3, description: 'Rocky beach with cliffs', image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400', entryFee: 'Free', timing: '6 AM - 6 PM' },
          { name: 'Thottada Beach', rating: 4.2, description: 'Clean and less crowded beach', image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400', entryFee: 'Free', timing: '6 AM - 6 PM' }
        ],
        'Historical Places': [
          { name: 'St. Angelo Fort', rating: 4.5, description: 'Portuguese fort with sea views', image: 'https://images.unsplash.com/photo-1519671482749-fd1f983eca6b?w=400', entryFee: '₹20', timing: '8 AM - 6 PM' },
          { name: 'Arakkal Museum', rating: 4.3, description: 'Arakkal royal family museum', image: 'https://images.unsplash.com/photo-1519671482749-fd1f983eca6b?w=400', entryFee: '₹10', timing: '9 AM - 5 PM' },
          { name: 'Kannur Fort', rating: 4.1, description: 'Historical fort ruins', image: 'https://images.unsplash.com/photo-1519671482749-fd1f983eca6b?w=400', entryFee: 'Free', timing: 'Sunrise - Sunset' }
        ],
        'Religious Sites': [
          { name: 'Parassinikadavu Temple', rating: 4.7, description: 'Famous Muthappan temple', image: 'https://images.unsplash.com/photo-1519671482749-fd1f983eca6b?w=400', entryFee: 'Free', timing: '5 AM - 12 PM, 5 PM - 8 PM' },
          { name: 'Kottiyur Temple', rating: 4.5, description: 'Ancient Shiva temple', image: 'https://images.unsplash.com/photo-1519671482749-fd1f983eca6b?w=400', entryFee: 'Free', timing: '4 AM - 1 PM, 3 PM - 9 PM' },
          { name: 'Trichambaram Temple', rating: 4.4, description: 'Krishna temple with architecture', image: 'https://images.unsplash.com/photo-1519671482749-fd1f983eca6b?w=400', entryFee: 'Free', timing: '5 AM - 12 PM, 4 PM - 8 PM' }
        ],
        'Nature & Wildlife': [
          { name: 'Palakkayam Thattu', rating: 4.5, description: 'Hill station with panoramic views', image: 'https://images.unsplash.com/photo-1519671482749-fd1f983eca6b?w=400', entryFee: '₹30', timing: '6 AM - 5 PM' },
          { name: 'Ezhimala Hill', rating: 4.3, description: 'Historic hill with sea views', image: 'https://images.unsplash.com/photo-1519671482749-fd1f983eca6b?w=400', entryFee: 'Free', timing: '6 AM - 6 PM' },
          { name: 'Vayalapara Malappuram', rating: 4.2, description: 'Trekking destination', image: 'https://images.unsplash.com/photo-1519671482749-fd1f983eca6b?w=400', entryFee: 'Free', timing: '6 AM - 5 PM' }
        ]
      }
    },
    'Munnar': {
      state: 'Kerala',
      description: 'Hill station known for tea gardens and misty mountains',
      categories: {
        'Tea Gardens': [
          { name: 'Tata Tea Museum', rating: 4.5, description: 'Tea processing and history', image: 'https://images.unsplash.com/photo-1605548197710-b7f7202237c5?w=400', entryFee: '₹100', timing: '9 AM - 5 PM' },
          { name: 'Kannan Devan Hills', rating: 4.7, description: 'Vast tea plantations', image: 'https://images.unsplash.com/photo-1605548197710-b7f7202237c5?w=400', entryFee: 'Free', timing: '6 AM - 6 PM' },
          { name: 'Lock Heart Tea Museum', rating: 4.4, description: 'Tea history and tasting', image: 'https://images.unsplash.com/photo-1605548197710-b7f7202237c5?w=400', entryFee: '₹75', timing: '9 AM - 5 PM' },
          { name: 'Sevenmallay Tea Estate', rating: 4.3, description: 'Scenic tea garden', image: 'https://images.unsplash.com/photo-1605548197710-b7f7202237c5?w=400', entryFee: 'Free', timing: '6 AM - 6 PM' }
        ],
        'Hills & Viewpoints': [
          { name: 'Anamudi Peak', rating: 4.8, description: 'Highest peak in South India', image: 'https://images.unsplash.com/photo-1605548197710-b7f7202237c5?w=400', entryFee: '₹200', timing: '6 AM - 2 PM' },
          { name: 'Echo Point', rating: 4.5, description: 'Natural echo phenomenon', image: 'https://images.unsplash.com/photo-1605548197710-b7f7202237c5?w=400', entryFee: 'Free', timing: '6 AM - 6 PM' },
          { name: 'Top Station', rating: 4.6, description: 'Highest viewpoint', image: 'https://images.unsplash.com/photo-1605548197710-b7f7202237c5?w=400', entryFee: '₹50', timing: '6 AM - 5 PM' },
          { name: 'Mattupetty Dam', rating: 4.4, description: 'Scenic dam with boating', image: 'https://images.unsplash.com/photo-1605548197710-b7f7202237c5?w=400', entryFee: '₹100', timing: '9 AM - 5 PM' }
        ],
        'Wildlife Sanctuaries': [
          { name: 'Eravikulam National Park', rating: 4.7, description: 'Nilgiri Tahr habitat', image: 'https://images.unsplash.com/photo-1605548197710-b7f7202237c5?w=400', entryFee: '₹150', timing: '7 AM - 4 PM' },
          { name: 'Chinnar Wildlife Sanctuary', rating: 4.5, description: 'Thorny forest wildlife', image: 'https://images.unsplash.com/photo-1605548197710-b7f7202237c5?w=400', entryFee: '₹100', timing: '6 AM - 5 PM' },
          { name: 'Kurinjimala Sanctuary', rating: 4.3, description: 'Neelakurinji flowers', image: 'https://images.unsplash.com/photo-1605548197710-b7f7202237c5?w=400', entryFee: '₹50', timing: '6 AM - 5 PM' }
        ],
        'Waterfalls & Lakes': [
          { name: 'Lakshmi Waterfalls', rating: 4.4, description: 'Beautiful waterfall', image: 'https://images.unsplash.com/photo-1605548197710-b7f7202237c5?w=400', entryFee: 'Free', timing: '6 AM - 5 PM' },
          { name: 'Attukal Waterfalls', rating: 4.5, description: 'Scenic waterfall', image: 'https://images.unsplash.com/photo-1605548197710-b7f7202237c5?w=400', entryFee: '₹50', timing: '6 AM - 5 PM' },
          { name: 'Kundala Lake', rating: 4.3, description: 'Serene lake', image: 'https://images.unsplash.com/photo-1605548197710-b7f7202237c5?w=400', entryFee: '₹100', timing: '8 AM - 5 PM' }
        ]
      }
    },
    'Mumbai': {
      state: 'Maharashtra',
      description: 'Financial capital and entertainment hub of India',
      categories: {
        'Historical Monuments': [
          { name: 'Gateway of India', rating: 4.7, description: 'Iconic monument built in 1924', image: 'https://images.unsplash.com/photo-1514212480185-3414345e6c6c?w=400', entryFee: 'Free', timing: '24 Hours' },
          { name: 'Chhatrapati Shivaji Terminus', rating: 4.6, description: 'UNESCO World Heritage Site', image: 'https://images.unsplash.com/photo-1514212480185-3414345e6c6c?w=400', entryFee: 'Free', timing: '5 AM - 12 AM' },
          { name: 'Elephanta Caves', rating: 4.5, description: 'Ancient rock-cut caves', image: 'https://images.unsplash.com/photo-1514212480185-3414345e6c6c?w=400', entryFee: '₹40', timing: '9 AM - 5 PM' },
          { name: 'Haji Ali Dargah', rating: 4.8, description: 'Floating mosque', image: 'https://images.unsplash.com/photo-1514212480185-3414345e6c6c?w=400', entryFee: 'Free', timing: '5 AM - 10 PM' }
        ],
        'Beaches': [
          { name: 'Marine Drive', rating: 4.6, description: 'Queen\'s Necklace promenade', image: 'https://images.unsplash.com/photo-1514212480185-3414345e6c6c?w=400', entryFee: 'Free', timing: '24 Hours' },
          { name: 'Juhu Beach', rating: 4.4, description: 'Popular beach with street food', image: 'https://images.unsplash.com/photo-1514212480185-3414345e6c6c?w=400', entryFee: 'Free', timing: '24 Hours' },
          { name: 'Versova Beach', rating: 4.3, description: 'Cleaner beach with fishing village', image: 'https://images.unsplash.com/photo-1514212480185-3414345e6c6c?w=400', entryFee: 'Free', timing: '24 Hours' },
          { name: 'Aksa Beach', rating: 4.5, description: 'Peaceful beach in Malad', image: 'https://images.unsplash.com/photo-1514212480185-3414345e6c6c?w=400', entryFee: 'Free', timing: '24 Hours' }
        ],
        'Religious Sites': [
          { name: 'Siddhivinayak Temple', rating: 4.7, description: 'Famous Ganesh temple', image: 'https://images.unsplash.com/photo-1514212480185-3414345e6c6c?w=400', entryFee: 'Free', timing: '5 AM - 10 PM' },
          { name: 'Mahalakshmi Temple', rating: 4.5, description: 'Goddess Mahalakshmi temple', image: 'https://images.unsplash.com/photo-1514212480185-3414345e6c6c?w=400', entryFee: 'Free', timing: '6 AM - 9 PM' },
          { name: 'Mount Mary Church', rating: 4.4, description: 'Beautiful church in Bandra', image: 'https://images.unsplash.com/photo-1514212480185-3414345e6c6c?w=400', entryFee: 'Free', timing: '6 AM - 7 PM' },
          { name: 'Babulnath Temple', rating: 4.3, description: 'Ancient Shiva temple', image: 'https://images.unsplash.com/photo-1514212480185-3414345e6c6c?w=400', entryFee: 'Free', timing: '6 AM - 9 PM' }
        ],
        'Entertainment': [
          { name: 'Film City', rating: 4.5, description: 'Bollywood film studio', image: 'https://images.unsplash.com/photo-1514212480185-3414345e6c6c?w=400', entryFee: '₹500', timing: '10 AM - 6 PM' },
          { name: 'Essel World', rating: 4.4, description: 'Amusement park', image: 'https://images.unsplash.com/photo-1514212480185-3414345e6c6c?w=400', entryFee: '₹800', timing: '10 AM - 7 PM' },
          { name: 'Madh Island', rating: 4.3, description: 'Weekend getaway', image: 'https://images.unsplash.com/photo-1514212480185-3414345e6c6c?w=400', entryFee: 'Free', timing: '24 Hours' }
        ]
      }
    }
  };

  const districtData = districtPlacesDatabase[district] || null;

  if (!districtData) {
    return (
      <div className="district-places-overlay">
        <div className="district-places-container">
          <div className="district-places-header">
            <button onClick={onClose} className="back-btn">
              <ArrowLeft size={24} />
            </button>
            <h2 className="district-title">No Data Available</h2>
            <button onClick={onClose} className="close-btn">
              <X size={24} />
            </button>
          </div>
          <div className="no-data">
            <p>No tourist places found for {district}</p>
          </div>
        </div>
      </div>
    );
  }

  const allPlaces = Object.entries(districtData.categories).flatMap(([category, places]) => 
    places.map(place => ({ ...place, category }))
  );

  const filteredPlaces = allPlaces.filter(place => {
    const matchesSearch = place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         place.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || place.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = Object.keys(districtData.categories);

  const handlePlaceClick = (place) => {
    setSelectedPlace(place);
    if (onPlaceSelect) {
      onPlaceSelect({
        ...place,
        district: district,
        state: districtData.state
      });
    }
  };

  return (
    <div className="district-places-overlay">
      <div className="district-places-container">
        <div className="district-places-header">
          <button onClick={onClose} className="back-btn">
            <ArrowLeft size={24} />
          </button>
          <div className="header-info">
            <h2 className="district-title">{district}</h2>
            <p className="district-subtitle">{districtData.state} • {allPlaces.length} Tourist Places</p>
          </div>
          <button onClick={onClose} className="close-btn">
            <X size={24} />
          </button>
        </div>

        <div className="district-description">
          <p>{districtData.description}</p>
        </div>

        <div className="places-filters">
          <div className="search-filter">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search places..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="category-filter">
            <Filter className="filter-icon" />
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="category-select">
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="places-stats">
          <div className="stat-card">
            <MapPin className="stat-icon" />
            <div className="stat-info">
              <span className="stat-number">{filteredPlaces.length}</span>
              <span className="stat-label">Places Found</span>
            </div>
          </div>
          <div className="stat-card">
            <Star className="stat-icon" />
            <div className="stat-info">
              <span className="stat-number">
                {filteredPlaces.length > 0 ? 
                  (filteredPlaces.reduce((sum, place) => sum + place.rating, 0) / filteredPlaces.length).toFixed(1) : 
                  '0.0'
                }
              </span>
              <span className="stat-label">Avg Rating</span>
            </div>
          </div>
          <div className="stat-card">
            <Camera className="stat-icon" />
            <div className="stat-info">
              <span className="stat-number">{categories.length}</span>
              <span className="stat-label">Categories</span>
            </div>
          </div>
        </div>

        <div className="places-grid">
          {filteredPlaces.map((place, index) => (
            <div key={index} className="place-card" onClick={() => handlePlaceClick(place)}>
              <div className="place-image">
                <img src={place.image} alt={place.name} />
                <div className="place-rating">
                  <Star className="rating-icon" />
                  <span>{place.rating}</span>
                </div>
              </div>
              <div className="place-content">
                <h3 className="place-name">{place.name}</h3>
                <p className="place-description">{place.description}</p>
                <div className="place-category-badge">
                  <span>{place.category}</span>
                </div>
                <div className="place-details">
                  <div className="place-detail">
                    <Clock className="detail-icon" />
                    <span>{place.timing}</span>
                  </div>
                  <div className="place-detail">
                    <DollarSign className="detail-icon" />
                    <span>{place.entryFee}</span>
                  </div>
                </div>
                <div className="place-actions">
                  <button className="place-action-btn">
                    <Heart size={16} />
                  </button>
                  <button className="place-action-btn">
                    <Share2 size={16} />
                  </button>
                  <button className="place-action-btn">
                    <Navigation size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedPlace && (
          <div className="place-detail-modal">
            <div className="modal-content">
              <div className="modal-header">
                <h3>{selectedPlace.name}</h3>
                <button onClick={() => setSelectedPlace(null)} className="modal-close">
                  <X size={20} />
                </button>
              </div>
              <div className="modal-body">
                <img src={selectedPlace.image} alt={selectedPlace.name} className="modal-image" />
                <div className="modal-info">
                  <p className="modal-description">{selectedPlace.description}</p>
                  <div className="modal-details">
                    <div className="modal-detail">
                      <Star className="detail-icon" />
                      <span>Rating: {selectedPlace.rating}</span>
                    </div>
                    <div className="modal-detail">
                      <Clock className="detail-icon" />
                      <span>Timing: {selectedPlace.timing}</span>
                    </div>
                    <div className="modal-detail">
                      <DollarSign className="detail-icon" />
                      <span>Entry Fee: {selectedPlace.entryFee}</span>
                    </div>
                    <div className="modal-detail">
                      <MapPin className="detail-icon" />
                      <span>{district}, {districtData.state}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DistrictPlacesPopup;
