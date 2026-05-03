import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Star, Users, Calendar, DollarSign, Plane, Home, Compass, User, LogOut } from 'lucide-react';

const MainPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Searching for: ${searchQuery}`);
  };

  const featuredDestinations = [
    {
      id: 1,
      name: 'Mumbai',
      price: '₹2,499',
      rating: 4.8,
      description: 'City of dreams and Bollywood glamour',
      image: 'https://images.unsplash.com/photo-1512343879798-01e0e4352a18?w=400'
    },
    {
      id: 2,
      name: 'Goa',
      price: '₹3,499',
      rating: 4.9,
      description: 'Beautiful beaches and vibrant nightlife',
      image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400'
    },
    {
      id: 3,
      name: 'Kerala',
      price: '₹4,999',
      rating: 4.7,
      description: 'Backwaters and serene landscapes',
      image: 'https://images.unsplash.com/photo-1559827268-dc88b52df2a8?w=400'
    }
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      {/* Header */}
      <div style={{
        background: 'white',
        padding: '20px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Plane style={{ width: '30px', height: '30px', color: '#667eea' }} />
          <h1 style={{ fontSize: '1.5rem', color: '#1a1a1a', margin: 0 }}>TripMaster Pro</h1>
        </div>
        <button
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            background: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          <LogOut style={{ width: '16px', height: '16px' }} />
          Logout
        </button>
      </div>

      {/* Hero Section */}
      <div style={{
        padding: '60px 20px',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white'
      }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '20px' }}>Welcome to TripMaster Pro</h2>
        <p style={{ fontSize: '1.2rem', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
          Your professional travel companion for exploring the incredible diversity of India
        </p>
        
        {/* Search Bar */}
        <form onSubmit={handleSearch} style={{
          display: 'flex',
          maxWidth: '500px',
          margin: '0 auto',
          gap: '10px'
        }}>
          <input
            type="text"
            placeholder="Search destinations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: 1,
              padding: '15px',
              border: 'none',
              borderRadius: '10px',
              fontSize: '1rem'
            }}
          />
          <button
            type="submit"
            style={{
              padding: '15px 30px',
              background: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            Search
          </button>
        </form>
      </div>

      {/* Featured Destinations */}
      <div style={{ padding: '60px 20px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '40px' }}>Featured Destinations</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {featuredDestinations.map((dest) => (
            <div key={dest.id} style={{
              background: 'white',
              borderRadius: '15px',
              overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease'
            }}>
              <img src={dest.image} alt={dest.name} style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover'
              }} />
              <div style={{ padding: '20px' }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '10px' }}>{dest.name}</h3>
                <p style={{ color: '#64748b', marginBottom: '15px' }}>{dest.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Star style={{ width: '16px', height: '16px', color: '#fbbf24', fill: '#fbbf24' }} />
                    <span>{dest.rating}</span>
                  </div>
                  <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#10b981' }}>{dest.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ padding: '40px 20px', background: '#f1f5f9' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <button style={{
            padding: '20px',
            background: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px'
          }}>
            <Compass style={{ width: '30px', height: '30px', color: '#667eea' }} />
            <span>Explore Places</span>
          </button>
          <button style={{
            padding: '20px',
            background: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px'
          }}>
            <Calendar style={{ width: '30px', height: '30px', color: '#667eea' }} />
            <span>Plan Trip</span>
          </button>
          <button style={{
            padding: '20px',
            background: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px'
          }}>
            <DollarSign style={{ width: '30px', height: '30px', color: '#667eea' }} />
            <span>Budget Trips</span>
          </button>
          <button style={{
            padding: '20px',
            background: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px'
          }}>
            <User style={{ width: '30px', height: '30px', color: '#667eea' }} />
            <span>My Dashboard</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
