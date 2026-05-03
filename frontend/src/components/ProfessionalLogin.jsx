import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Lock, 
  Phone, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  Plane, 
  Globe, 
  Shield, 
  Key, 
  CheckCircle, 
  AlertCircle,
  MapPin,
  Calendar,
  Users,
  Star
} from 'lucide-react';
import './ProfessionalLogin.css';

const ProfessionalLogin = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  // Login fields
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  // Admin login
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [secretCode, setSecretCode] = useState('');
  const ADMIN_SECRETS = ['pachu123cr7', '8086252497'];

  const features = [
    { icon: MapPin, text: 'Explore 500+ Destinations' },
    { icon: Calendar, text: 'Flexible Booking Options' },
    { icon: Users, text: '24/7 Customer Support' },
    { icon: Star, text: 'Best Price Guarantee' }
  ];

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  const validateLogin = () => {
    const newErrors = {};
    
    if (!loginEmail) {
      newErrors.loginEmail = 'Email is required';
    } else if (!validateEmail(loginEmail)) {
      newErrors.loginEmail = 'Please enter a valid email address';
    }
    
    if (!loginPassword) {
      newErrors.loginPassword = 'Password is required';
    } else if (loginPassword.length < 6) {
      newErrors.loginPassword = 'Password must be at least 6 characters';
    }
    
    if (isAdminLogin && !ADMIN_SECRETS.includes(secretCode)) {
      newErrors.secretCode = 'Invalid admin secret code';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateRegister = () => {
    const newErrors = {};
    
    if (!name) {
      newErrors.name = 'Name is required';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!validateLogin()) return;
    
    setLoading(true);
    setSuccessMessage('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (isAdminLogin) {
        // Admin login
        const userData = {
          id: Date.now(),
          name: loginEmail.split('@')[0],
          email: loginEmail,
          isAdmin: true,
          loginTime: new Date().toISOString()
        };
        
        localStorage.setItem('user', JSON.stringify(userData));
        navigate('/admin');
      } else {
        // Regular user login
        const userData = {
          id: Date.now(),
          name: loginEmail.split('@')[0],
          email: loginEmail,
          isAdmin: false,
          loginTime: new Date().toISOString()
        };
        
        localStorage.setItem('user', JSON.stringify(userData));
        navigate('/main');
      }
    } catch (error) {
      setErrors({ general: 'Login failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!validateRegister()) return;
    
    setLoading(true);
    setSuccessMessage('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const userData = {
        id: Date.now(),
        name: name.trim(),
        email: email.trim(),
        phone: phone,
        isAdmin: false,
        loginTime: new Date().toISOString()
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      setSuccessMessage('Registration successful! Redirecting...');
      
      setTimeout(() => {
        navigate('/main');
      }, 2000);
    } catch (error) {
      setErrors({ general: 'Registration failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="professional-login">
      <div className="login-container">
        {/* Left Side - Branding */}
        <div className="login-branding">
          <div className="branding-content">
            <div className="brand-header">
              <div className="brand-logo">
                <Plane className="logo-icon" />
                <span className="brand-name">TripMaster Pro</span>
              </div>
              <h1 className="brand-title">Discover Incredible India</h1>
              <p className="brand-subtitle">
                Your ultimate travel companion for exploring the diverse beauty of India
              </p>
            </div>
            
            <div className="brand-features">
              {features.map((feature, index) => (
                <div key={index} className="feature-item">
                  <feature.icon className="feature-icon" />
                  <span className="feature-text">{feature.text}</span>
                </div>
              ))}
            </div>
            
            <div className="brand-stats">
              <div className="stat-item">
                <div className="stat-number">15K+</div>
                <div className="stat-label">Happy Travelers</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">500+</div>
                <div className="stat-label">Destinations</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">98%</div>
                <div className="stat-label">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="login-form-section">
          <div className="form-container">
            <div className="form-header">
              <h2 className="form-title">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="form-subtitle">
                {isLogin 
                  ? 'Sign in to continue your journey' 
                  : 'Join us to start exploring India'
                }
              </p>
            </div>

            {successMessage && (
              <div className="success-message">
                <CheckCircle className="message-icon" />
                {successMessage}
              </div>
            )}

            {errors.general && (
              <div className="error-message">
                <AlertCircle className="message-icon" />
                {errors.general}
              </div>
            )}

            {isLogin ? (
              <form onSubmit={handleLogin} className="login-form">
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <div className="input-wrapper">
                    <Mail className="input-icon" />
                    <input
                      type="email"
                      className={`form-input ${errors.loginEmail ? 'error' : ''}`}
                      placeholder="Enter your email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                    />
                  </div>
                  {errors.loginEmail && (
                    <span className="error-text">{errors.loginEmail}</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Password</label>
                  <div className="input-wrapper">
                    <Lock className="input-icon" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className={`form-input ${errors.loginPassword ? 'error' : ''}`}
                      placeholder="Enter your password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="toggle-icon" /> : <Eye className="toggle-icon" />}
                    </button>
                  </div>
                  {errors.loginPassword && (
                    <span className="error-text">{errors.loginPassword}</span>
                  )}
                </div>

                <div className="form-options">
                  <label className="checkbox-label">
                    <input type="checkbox" className="checkbox" />
                    <span className="checkbox-text">Remember me</span>
                  </label>
                  <a href="#" className="forgot-link">Forgot password?</a>
                </div>

                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? (
                    <div className="btn-spinner"></div>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="btn-icon" />
                    </>
                  )}
                </button>

                <div className="admin-toggle">
                  <button
                    type="button"
                    className="admin-btn"
                    onClick={() => setIsAdminLogin(!isAdminLogin)}
                  >
                    <Key className="admin-icon" />
                    {isAdminLogin ? 'Regular Login' : 'Admin Login'}
                  </button>
                </div>

                {isAdminLogin && (
                  <div className="admin-section">
                    <div className="form-group">
                      <label className="form-label">Admin Secret Code</label>
                      <div className="input-wrapper">
                        <Shield className="input-icon" />
                        <input
                          type="password"
                          className={`form-input ${errors.secretCode ? 'error' : ''}`}
                          placeholder="Enter admin secret code"
                          value={secretCode}
                          onChange={(e) => setSecretCode(e.target.value)}
                        />
                      </div>
                      {errors.secretCode && (
                        <span className="error-text">{errors.secretCode}</span>
                      )}
                    </div>
                  </div>
                )}

                <div className="form-footer">
                  <p className="footer-text">
                    Don't have an account?{' '}
                    <button
                      type="button"
                      className="link-btn"
                      onClick={() => {
                        setIsLogin(false);
                        setErrors({});
                      }}
                    >
                      Sign up
                    </button>
                  </p>
                </div>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="register-form">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <div className="input-wrapper">
                    <User className="input-icon" />
                    <input
                      type="text"
                      className={`form-input ${errors.name ? 'error' : ''}`}
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  {errors.name && (
                    <span className="error-text">{errors.name}</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <div className="input-wrapper">
                    <Mail className="input-icon" />
                    <input
                      type="email"
                      className={`form-input ${errors.email ? 'error' : ''}`}
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  {errors.email && (
                    <span className="error-text">{errors.email}</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <div className="input-wrapper">
                    <Phone className="input-icon" />
                    <input
                      type="tel"
                      className={`form-input ${errors.phone ? 'error' : ''}`}
                      placeholder="Enter 10-digit phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      maxLength={10}
                    />
                  </div>
                  {errors.phone && (
                    <span className="error-text">{errors.phone}</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Password</label>
                  <div className="input-wrapper">
                    <Lock className="input-icon" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className={`form-input ${errors.password ? 'error' : ''}`}
                      placeholder="Create a password (min 6 characters)"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="toggle-icon" /> : <Eye className="toggle-icon" />}
                    </button>
                  </div>
                  {errors.password && (
                    <span className="error-text">{errors.password}</span>
                  )}
                </div>

                <div className="form-options">
                  <label className="checkbox-label">
                    <input type="checkbox" className="checkbox" />
                    <span className="checkbox-text">
                      I agree to the{' '}
                      <a href="#" className="link">Terms of Service</a> and{' '}
                      <a href="#" className="link">Privacy Policy</a>
                    </span>
                  </label>
                </div>

                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? (
                    <div className="btn-spinner"></div>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="btn-icon" />
                    </>
                  )}
                </button>

                <div className="form-footer">
                  <p className="footer-text">
                    Already have an account?{' '}
                    <button
                      type="button"
                      className="link-btn"
                      onClick={() => {
                        setIsLogin(true);
                        setErrors({});
                      }}
                    >
                      Sign in
                    </button>
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalLogin;
