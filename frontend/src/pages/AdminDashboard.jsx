import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  LayoutDashboard,
  Users,
  MapPin,
  Plane,
  LogOut,
  TrendingUp,
  DollarSign,
  UserCheck,
  Trash2,
  Search,
  Shield,
  Home,
  Calendar,
  CreditCard,
  Star,
} from "lucide-react";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [cities, setCities] = useState([]);
  const [trips, setTrips] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) {
      navigate("/");
      return;
    }

    const user = JSON.parse(savedUser);
    setCurrentUser(user);
    loadAllData();
  }, [navigate]);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [usersRes, citiesRes, tripsRes, hotelsRes] = await Promise.all([
        axios.get("http://localhost:5000/users"),
        axios.get("http://localhost:5000/cities"),
        axios.get("http://localhost:5000/trips"),
        axios.get("http://localhost:5000/hotels"),
      ]);

      setUsers(usersRes.data.users || []);
      setCities(citiesRes.data.cities || []);
      setTrips(tripsRes.data.trips || []);
      setHotels(hotelsRes.data || []);
    } catch (error) {
      console.log("Error loading admin data:", error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const deleteUser = async (userId) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`http://localhost:5000/users/${userId}`);
      loadAllData();
      alert("User deleted successfully");
    } catch (error) {
      alert("Failed to delete user");
    }
  };

  const deleteTrip = async (tripId) => {
    if (!confirm("Are you sure you want to delete this trip?")) return;
    try {
      await axios.delete(`http://localhost:5000/trips/${tripId}`);
      loadAllData();
      alert("Trip deleted successfully");
    } catch (error) {
      alert("Failed to delete trip");
    }
  };

  // Calculate stats
  const totalRevenue = trips.reduce(
    (sum, trip) => sum + (trip.total_estimated_cost || 0),
    0
  );
  const totalUsers = users.length;
  const totalTrips = trips.length;
  const totalCities = cities.length;

  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTrips = trips.filter(
    (t) =>
      t.user_id?.toString().includes(searchTerm) ||
      t.id?.toString().includes(searchTerm)
  );

  if (!currentUser) return null;

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand">
          <Shield className="admin-brand-icon" />
          <div>
            <h2>Admin Panel</h2>
            <span>TripPlanner Pro</span>
          </div>
        </div>

        <nav className="admin-sidebar-nav">
          <button
            className={`admin-nav-item ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            <LayoutDashboard className="nav-icon" />
            <span>Overview</span>
          </button>
          <button
            className={`admin-nav-item ${activeTab === "users" ? "active" : ""}`}
            onClick={() => setActiveTab("users")}
          >
            <Users className="nav-icon" />
            <span>Users</span>
          </button>
          <button
            className={`admin-nav-item ${activeTab === "trips" ? "active" : ""}`}
            onClick={() => setActiveTab("trips")}
          >
            <Plane className="nav-icon" />
            <span>All Trips</span>
          </button>
          <button
            className={`admin-nav-item ${activeTab === "cities" ? "active" : ""}`}
            onClick={() => setActiveTab("cities")}
          >
            <MapPin className="nav-icon" />
            <span>Cities</span>
          </button>
          <button
            className={`admin-nav-item ${activeTab === "hotels" ? "active" : ""}`}
            onClick={() => setActiveTab("hotels")}
          >
            <Home className="nav-icon" />
            <span>Hotels</span>
          </button>
        </nav>

        <div className="admin-sidebar-footer">
          <div className="admin-user-info">
            <div className="admin-avatar">
              <Shield />
            </div>
            <div>
              <p className="admin-name">{currentUser.name}</p>
              <p className="admin-role">Administrator</p>
            </div>
          </div>
          <button className="admin-logout-btn" onClick={logout}>
            <LogOut className="logout-icon" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-header">
          <h1>
            {activeTab === "overview" && "Dashboard Overview"}
            {activeTab === "users" && "User Management"}
            {activeTab === "trips" && "Trip Management"}
            {activeTab === "cities" && "City Management"}
            {activeTab === "hotels" && "Hotel Management"}
          </h1>
          <div className="admin-search">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        {loading && <div className="admin-loading">Loading...</div>}

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="admin-content">
            <div className="admin-stats-grid">
              <div className="admin-stat-card users">
                <div className="stat-icon">
                  <Users />
                </div>
                <div className="stat-info">
                  <h3>{totalUsers}</h3>
                  <p>Total Users</p>
                </div>
              </div>
              <div className="admin-stat-card trips">
                <div className="stat-icon">
                  <Plane />
                </div>
                <div className="stat-info">
                  <h3>{totalTrips}</h3>
                  <p>Total Trips</p>
                </div>
              </div>
              <div className="admin-stat-card cities">
                <div className="stat-icon">
                  <MapPin />
                </div>
                <div className="stat-info">
                  <h3>{totalCities}</h3>
                  <p>Destinations</p>
                </div>
              </div>
              <div className="admin-stat-card revenue">
                <div className="stat-icon">
                  <DollarSign />
                </div>
                <div className="stat-info">
                  <h3>₹{totalRevenue.toLocaleString()}</h3>
                  <p>Total Revenue</p>
                </div>
              </div>
            </div>

            <div className="admin-recent-section">
              <h2>Recent Trips</h2>
              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Trip ID</th>
                      <th>User ID</th>
                      <th>Days</th>
                      <th>People</th>
                      <th>Budget</th>
                      <th>Total Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trips.slice(0, 5).map((trip) => (
                      <tr key={trip.id}>
                        <td>#{trip.id}</td>
                        <td>User #{trip.user_id}</td>
                        <td>{trip.days}</td>
                        <td>{trip.people_count}</td>
                        <td>₹{trip.budget}</td>
                        <td>₹{trip.total_estimated_cost}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <div className="admin-content">
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Role</th>
                    <th>Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td>#{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>
                        <span className={`role-badge ${user.role}`}>
                          {user.role}
                        </span>
                      </td>
                      <td>
                        {new Date(user.created_at).toLocaleDateString()}
                      </td>
                      <td>
                        <button
                          className="delete-btn"
                          onClick={() => deleteUser(user.id)}
                        >
                          <Trash2 />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Trips Tab */}
        {activeTab === "trips" && (
          <div className="admin-content">
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Trip ID</th>
                    <th>User ID</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Days</th>
                    <th>People</th>
                    <th>Budget</th>
                    <th>Total Cost</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTrips.map((trip) => (
                    <tr key={trip.id}>
                      <td>#{trip.id}</td>
                      <td>User #{trip.user_id}</td>
                      <td>City #{trip.from_city_id}</td>
                      <td>City #{trip.to_city_id}</td>
                      <td>{trip.days}</td>
                      <td>{trip.people_count}</td>
                      <td>₹{trip.budget}</td>
                      <td>₹{trip.total_estimated_cost}</td>
                      <td>
                        <button
                          className="delete-btn"
                          onClick={() => deleteTrip(trip.id)}
                        >
                          <Trash2 />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Cities Tab */}
        {activeTab === "cities" && (
          <div className="admin-content">
            <div className="admin-cards-grid">
              {cities.map((city) => (
                <div key={city.id} className="admin-city-card">
                  <div className="city-header">
                    <MapPin className="city-icon" />
                    <h3>{city.city_name}</h3>
                  </div>
                  <p className="city-state">{city.state_name}</p>
                  <div className="city-details">
                    <span>
                      <DollarSign className="detail-icon" />
                      ₹{city.avg_budget_per_day}/day
                    </span>
                    <span>
                      <Star className="detail-icon" />
                      {city.best_season}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hotels Tab */}
        {activeTab === "hotels" && (
          <div className="admin-content">
            <div className="admin-cards-grid">
              {hotels.map((hotel) => (
                <div key={hotel.id} className="admin-hotel-card">
                  <div className="hotel-header">
                    <Home className="hotel-icon" />
                    <h3>{hotel.name}</h3>
                  </div>
                  <p className="hotel-location">{hotel.location}</p>
                  <div className="hotel-details">
                    <span>
                      <DollarSign className="detail-icon" />
                      ₹{hotel.price}/night
                    </span>
                    <span>
                      <Star className="detail-icon" />
                      {hotel.rating} ★
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;
