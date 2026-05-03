import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Mail, Lock, Eye, EyeOff, 
  ArrowRight, Smartphone, Chrome,
  AlertCircle, CheckCircle
} from 'lucide-react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [googleLoading, setGoogleLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);

  useEffect(() => {
    // Check for Google OAuth callback
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      handleGoogleCallback(code);
    }
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(password)) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      // Simulate API call
      setTimeout(() => {
        const mockUser = {
          id: 1,
          name: email.split('@')[0],
          email: email,
          isAdmin: email === 'admin@travelpro.com'
        };
        
        localStorage.setItem('user', JSON.stringify(mockUser));
        onLogin(mockUser);
        setLoading(false);
      }, 1500);
    } catch (error) {
      setErrors({ general: 'Login failed. Please try again.' });
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setGoogleLoading(true);
    
    // Simulate Google OAuth
    setTimeout(() => {
      const mockUser = {
        id: 2,
        name: 'Google User',
        email: 'user@gmail.com',
        isAdmin: false
      };
      
      localStorage.setItem('user', JSON.stringify(mockUser));
      onLogin(mockUser);
      setGoogleLoading(false);
    }, 2000);
  };

  const handleGoogleCallback = async (code) => {
    try {
      // Exchange code for access token
      const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          code: code,
          client_id: 'YOUR_GOOGLE_CLIENT_ID',
          client_secret: 'YOUR_GOOGLE_CLIENT_SECRET',
          redirect_uri: window.location.origin,
          grant_type: 'authorization_code',
        }),
      });
      
      const data = await response.json();
      // Handle user info and login
      console.log('Google login successful:', data);
    } catch (error) {
      console.error('Google login error:', error);
    }
  };

  const handlePhoneLogin = () => {
    setShowOtp(true);
    setIsLogin(false);
  };

  const handleSendOtp = async () => {
    if (!email || !validateEmail(email)) {
      setErrors({ email: 'Please enter a valid email address' });
      return;
    }
    
    setLoading(true);
    
    try {
      // Simulate OTP sending
      setTimeout(() => {
        setOtpSent(true);
        setLoading(false);
      }, 1500);
    } catch (error) {
      setErrors({ general: 'Failed to send OTP. Please try again.' });
      setLoading(false);
    }
  };

  const handleOtpLogin = async (e) => {
    e.preventDefault();
    
    if (!otp || otp.length !== 6) {
      setErrors({ otp: 'Please enter a valid 6-digit OTP' });
      return;
    }
    
    setLoading(true);
    
    try {
      // Simulate OTP verification
      setTimeout(() => {
        const mockUser = {
          id: 3,
          name: email.split('@')[0],
          email: email,
          isAdmin: false
        };
        
        localStorage.setItem('user', JSON.stringify(mockUser));
        onLogin(mockUser);
        setLoading(false);
      }, 1500);
    } catch (error) {
      setErrors({ general: 'OTP verification failed. Please try again.' });
      setLoading(false);
    }
  };

  const handleRegister = () => {
    setIsLogin(false);
    setErrors({});
    setEmail('');
    setPassword('');
    setOtp('');
    setOtpSent(false);
    setShowOtp(false);
  };

  const handleLogin = () => {
    setIsLogin(true);
    setErrors({});
    setEmail('');
    setPassword('');
    setOtp('');
    setOtpSent(false);
    setShowOtp(false);
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="background-overlay"></div>
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
          <div className="shape shape-5"></div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="login-card"
      >
        <div className="login-header">
          <div className="brand-logo">
            <div className="logo-icon">
              <User size={32} />
            </div>
            <h1>TravelPro</h1>
            <p>Your Premium Travel Companion</p>
          </div>
          
          <div className="auth-toggle">
            <button
              className={`toggle-btn ${isLogin ? 'active' : ''}`}
              onClick={handleLogin}
            >
              Login
            </button>
            <button
              className={`toggle-btn ${!isLogin ? 'active' : ''}`}
              onClick={handleRegister}
            >
              Register
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {isLogin ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="auth-form"
            >
              <form onSubmit={handleEmailLogin} className="login-form">
                <div className="form-group">
                  <label className="form-label">
                    <Mail size={18} />
                    Email Address
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className={`form-input ${errors.email ? 'error' : ''}`}
                    />
                    {errors.email && (
                      <div className="error-message">
                        <AlertCircle size={14} />
                        {errors.email}
                      </div>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <Lock size={18} />
                    Password
                  </label>
                  <div className="input-wrapper">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className={`form-input ${errors.password ? 'error' : ''}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="password-toggle"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                    {errors.password && (
                      <div className="error-message">
                        <AlertCircle size={14} />
                        {errors.password}
                      </div>
                    )}
                  </div>
                </div>

                <div className="form-actions">
                  <button
                    type="submit"
                    disabled={loading}
                    className="submit-btn"
                  >
                    {loading ? (
                      <div className="loading-spinner"></div>
                    ) : (
                      <>
                        Sign In
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </div>
              </form>

              <div className="divider">
                <span>OR</span>
              </div>

              <div className="social-login">
                <button
                  onClick={handleGoogleLogin}
                  disabled={googleLoading}
                  className="social-btn google"
                >
                  {googleLoading ? (
                    <div className="loading-spinner"></div>
                  ) : (
                    <>
                      <Chrome size={20} />
                      Continue with Google
                    </>
                  )}
                </button>
                
                <button
                  onClick={handlePhoneLogin}
                  className="social-btn phone"
                >
                  <Smartphone size={20} />
                  Continue with Phone
                </button>
              </div>

              {errors.general && (
                <div className="general-error">
                  <AlertCircle size={16} />
                  {errors.general}
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="register"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="auth-form"
            >
              {!showOtp ? (
                <form onSubmit={handleSendOtp} className="register-form">
                  <div className="form-group">
                    <label className="form-label">
                      <Mail size={18} />
                      Email Address
                    </label>
                    <div className="input-wrapper">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className={`form-input ${errors.email ? 'error' : ''}`}
                      />
                      {errors.email && (
                        <div className="error-message">
                          <AlertCircle size={14} />
                          {errors.email}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="form-actions">
                    <button
                      type="submit"
                      disabled={loading}
                      className="submit-btn"
                    >
                      {loading ? (
                        <div className="loading-spinner"></div>
                      ) : (
                        <>
                          Send OTP
                          <ArrowRight size={18} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleOtpLogin} className="otp-form">
                  <div className="otp-header">
                    <CheckCircle className="success-icon" />
                    <span>OTP sent to {email}</span>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <Lock size={18} />
                      Enter OTP
                    </label>
                    <div className="input-wrapper">
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                        placeholder="Enter 6-digit OTP"
                        maxLength={6}
                        className={`form-input ${errors.otp ? 'error' : ''}`}
                      />
                      {errors.otp && (
                        <div className="error-message">
                          <AlertCircle size={14} />
                          {errors.otp}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="form-actions">
                    <button
                      type="submit"
                      disabled={loading}
                      className="submit-btn"
                    >
                      {loading ? (
                        <div className="loading-spinner"></div>
                      ) : (
                        <>
                          Verify OTP
                          <ArrowRight size={18} />
                        </>
                      )}
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setShowOtp(false)}
                      className="back-btn"
                    >
                      Back
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Login;
