
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Plane, User, Mail, Lock, Phone, ArrowRight, Globe, Shield, Key } from "lucide-react";
import "./Auth.css";

function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isAdminLogin, setIsAdminLogin] = useState(false);

  // Login fields
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Admin secret codes
  const [secretCode, setSecretCode] = useState("");
  const ADMIN_SECRETS = ["pachu123cr7", "8086252497"];

  // Register fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!loginEmail || !loginPassword) {
      alert("Please enter email and password");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(loginEmail)) {
      alert("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);
      
      // Check backend connection first
      console.log("Attempting login to backend...");
      
      const res = await axios.post("http://localhost:5000/login", {
        email: loginEmail.trim().toLowerCase(),
        password: loginPassword,
      });

      console.log("Login response:", res.data);

      if (res.data.success) {
        // Store user data
        const userData = {
          ...res.data.user,
          loginTime: new Date().toISOString()
        };
        localStorage.setItem("user", JSON.stringify(userData));
        
        // Navigate to main page
        navigate("/main");
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      
      // Fallback: Allow login for testing purposes
      if (error.code === 'ECONNREFUSED' || error.message.includes('Network Error')) {
        console.log("Backend not available, using fallback authentication");
        
        // Create fallback user
        const fallbackUser = {
          id: Date.now(),
          name: loginEmail.split('@')[0],
          email: loginEmail.trim().toLowerCase(),
          isAdmin: false,
          loginTime: new Date().toISOString(),
          isFallback: true
        };
        
        localStorage.setItem("user", JSON.stringify(fallbackUser));
        navigate("/main");
        return;
      }
      
      if (error.response) {
        // Backend responded with error
        alert(error.response.data.message || "Login failed. Please check your credentials.");
      } else if (error.request) {
        // Network error
        alert("Cannot connect to server. Please check your internet connection.");
      } else {
        // Other error
        alert("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    if (!secretCode) {
      alert("Please enter secret code");
      return;
    }

    if (!ADMIN_SECRETS.includes(secretCode)) {
      alert("Invalid secret code!");
      return;
    }

    try {
      setLoading(true);
      
      // Create admin user object
      const adminUser = {
        id: 1,
        name: "Admin",
        email: "admin@tripplanner.com",
        isAdmin: true
      };

      localStorage.setItem("user", JSON.stringify(adminUser));
      navigate("/admin");
    } catch (error) {
      alert("Admin login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    if (!name || !email || !password || !phone) {
      alert("Please fill all fields");
      return;
    }

    // Validate name
    if (name.trim().length < 2) {
      alert("Please enter a valid name (at least 2 characters)");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    // Validate phone number (exactly 10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      alert("Please enter a valid 10-digit phone number");
      return;
    }

    // Validate password length
    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    try {
      setLoading(true);
      
      console.log("Attempting registration...");
      
      const response = await axios.post("http://localhost:5000/register", {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        phone,
      });

      console.log("Registration response:", response.data);

      if (response.data.success) {
        alert("Registered successfully! Please login to continue.");
        
        // Clear form and switch to login
        setIsLogin(true);
        setName("");
        setEmail("");
        setPassword("");
        setPhone("");
        
        // Pre-fill login email
        setLoginEmail(email.trim().toLowerCase());
      } else {
        alert(response.data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      
      // Fallback: Allow registration for testing purposes
      if (error.code === 'ECONNREFUSED' || error.message.includes('Network Error')) {
        console.log("Backend not available, using fallback registration");
        
        // Create fallback user
        const fallbackUser = {
          id: Date.now(),
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: phone,
          isAdmin: false,
          loginTime: new Date().toISOString(),
          isFallback: true
        };
        
        localStorage.setItem("user", JSON.stringify(fallbackUser));
        navigate("/main");
        return;
      }
      
      if (error.response) {
        // Backend responded with error
        alert(error.response.data.message || "Registration failed. Please try again.");
      } else if (error.request) {
        // Network error
        alert("Cannot connect to server. Please check your internet connection.");
      } else {
        // Other error
        alert("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <div className="auth-brand">
          <Globe className="brand-icon" />
          <h1>TripPlanner Pro</h1>
          <p>Your ultimate travel companion</p>
        </div>
        <div className="auth-features">
          <div className="feature-item">
            <Plane className="feature-icon" />
            <span>Plan trips effortlessly</span>
          </div>
          <div className="feature-item">
            <Globe className="feature-icon" />
            <span>Discover new destinations</span>
          </div>
          <div className="feature-item">
            <User className="feature-icon" />
            <span>Track your travel history</span>
          </div>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-card">
          <div className="auth-tabs">
            <button
              className={`auth-tab ${isLogin ? "active" : ""}`}
              onClick={() => setIsLogin(true)}
            >
              Sign In
            </button>
            <button
              className={`auth-tab ${!isLogin ? "active" : ""}`}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>

          {isLogin ? (
            <form onSubmit={isAdminLogin ? handleAdminLogin : handleLogin} className="auth-form">
              <h2>{isAdminLogin ? "Admin Access" : "Welcome Back!"}</h2>
              <p className="auth-subtitle">
                {isAdminLogin ? "Enter admin credentials & secret code" : "Enter your details to continue"}
              </p>

              {isAdminLogin && (
                <div className="admin-badge">
                  <Shield className="admin-icon" />
                  <span>Admin Panel</span>
                </div>
              )}

              {!isAdminLogin && (
                <>
                  <div className="input-group">
                    <Mail className="input-icon" />
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="input-group">
                    <Lock className="input-icon" />
                    <input
                      type="password"
                      placeholder="Password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                    />
                  </div>
                </>
              )}

              {isAdminLogin && (
                <div className="input-group">
                  <Key className="input-icon" />
                  <input
                    type="password"
                    placeholder="Secret Code"
                    value={secretCode}
                    onChange={(e) => setSecretCode(e.target.value)}
                    required
                  />
                </div>
              )}

              <button type="submit" className={`auth-btn ${isAdminLogin ? "admin-btn" : ""}`} disabled={loading}>
                {loading ? (isAdminLogin ? "Verifying..." : "Signing In...") : (isAdminLogin ? "Access Admin Panel" : "Sign In")}
                <ArrowRight className="btn-icon" />
              </button>

              <div className="admin-toggle">
                <button
                  type="button"
                  className="admin-toggle-btn"
                  onClick={() => {
                    setIsAdminLogin(!isAdminLogin);
                    setSecretCode("");
                  }}
                >
                  {isAdminLogin ? (
                    <>
                      <User className="toggle-icon" />
                      Back to User Login
                    </>
                  ) : (
                    <>
                      <Shield className="toggle-icon" />
                      Admin Login
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="auth-form">
              <h2>Create Account</h2>
              <p className="auth-subtitle">Join us and start planning</p>

              <div className="input-group">
                <User className="input-icon" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <Mail className="input-icon" />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <Phone className="input-icon" />
                <input
                  type="tel"
                  placeholder="Phone Number (10 digits)"
                  value={phone}
                  onChange={(e) => {
                    // Only allow numbers and limit to 10 digits
                    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                    setPhone(value);
                  }}
                  maxLength={10}
                  pattern="[0-9]{10}"
                  title="Please enter exactly 10 digits"
                  required
                />
              </div>

              <div className="input-group">
                <Lock className="input-icon" />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="auth-btn" disabled={loading}>
                {loading ? "Creating Account..." : "Create Account"}
                <ArrowRight className="btn-icon" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
