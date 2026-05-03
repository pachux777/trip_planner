import { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Linkedin, 
  Send, 
  Heart, 
  Compass, 
  Calendar, 
  Users, 
  Award, 
  Shield, 
  Zap, 
  Target, 
  Plane, 
  Hotel, 
  Utensils, 
  Car, 
  Train, 
  Camera, 
  BookOpen, 
  HelpCircle, 
  FileText, 
  ChevronRight, 
  ArrowRight, 
  Star, 
  TrendingUp, 
  Clock, 
  Navigation
} from 'lucide-react';
import './ProfessionalFooter.css';

const ProfessionalFooter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };

  const footerLinks = {
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Story', href: '/story' },
      { name: 'Team', href: '/team' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
      { name: 'Blog', href: '/blog' }
    ],
    services: [
      { name: 'Trip Planning', href: '/planner' },
      { name: 'Hotel Booking', href: '/hotels' },
      { name: 'Flight Booking', href: '/flights' },
      { name: 'Car Rentals', href: '/cars' },
      { name: 'Travel Insurance', href: '/insurance' },
      { name: 'Visa Services', href: '/visa' }
    ],
    destinations: [
      { name: 'Goa', href: '/destinations/goa' },
      { name: 'Kerala', href: '/destinations/kerala' },
      { name: 'Rajasthan', href: '/destinations/rajasthan' },
      { name: 'Himalaya', href: '/destinations/himalaya' },
      { name: 'Andaman', href: '/destinations/andaman' },
      { name: 'All Destinations', href: '/destinations' }
    ],
    support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'FAQs', href: '/faqs' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Cookie Policy', href: '/cookies' }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: '#', name: 'Facebook' },
    { icon: Twitter, href: '#', name: 'Twitter' },
    { icon: Instagram, href: '#', name: 'Instagram' },
    { icon: Youtube, href: '#', name: 'YouTube' },
    { icon: Linkedin, href: '#', name: 'LinkedIn' }
  ];

  const featuredDestinations = [
    { name: 'Goa Beach Paradise', image: 'https://images.unsplash.com/photo-1512343879798-01e0e4352a18?w=150', rating: 4.9 },
    { name: 'Kerala Backwaters', image: 'https://images.unsplash.com/photo-1559827268-dc88b52df2a8?w=150', rating: 4.8 },
    { name: 'Rajasthan Heritage', image: 'https://images.unsplash.com/photo-1524492412937-b784b5b9c7c9?w=150', rating: 4.7 },
    { name: 'Himalayan Adventure', image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=150', rating: 4.9 }
  ];

  const travelStats = [
    { icon: Users, number: '50K+', label: 'Happy Travelers' },
    { icon: MapPin, number: '500+', label: 'Destinations' },
    { icon: Award, number: '100+', label: 'Awards' },
    { icon: Star, number: '4.8', label: 'Average Rating' }
  ];

  return (
    <footer className="professional-footer">
      {/* Main Footer Content */}
      <div className="footer-content">
        <div className="footer-container">
          {/* Company Info */}
          <div className="footer-section company-section">
            <div className="footer-brand">
              <div className="brand-logo">
                <Plane className="logo-icon" />
                <span className="logo-text">TripMaster Pro</span>
              </div>
              <p className="brand-description">
                Your trusted companion for discovering the incredible diversity and beauty of India. 
                We make travel planning simple, enjoyable, and unforgettable.
              </p>
              <div className="social-links">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="social-link"
                    title={social.name}
                  >
                    <social.icon className="social-icon" />
                  </a>
                ))}
              </div>
            </div>

            {/* Travel Stats */}
            <div className="travel-stats">
              {travelStats.map((stat, index) => (
                <div key={index} className="stat-item">
                  <stat.icon className="stat-icon" />
                  <div className="stat-content">
                    <span className="stat-number">{stat.number}</span>
                    <span className="stat-label">{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section links-section">
            <div className="links-grid">
              <div className="links-column">
                <h3 className="links-title">Company</h3>
                <ul className="links-list">
                  {footerLinks.company.map((link, index) => (
                    <li key={index}>
                      <a href={link.href} className="footer-link">
                        <ChevronRight className="link-icon" />
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="links-column">
                <h3 className="links-title">Services</h3>
                <ul className="links-list">
                  {footerLinks.services.map((link, index) => (
                    <li key={index}>
                      <a href={link.href} className="footer-link">
                        <ChevronRight className="link-icon" />
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="links-column">
                <h3 className="links-title">Destinations</h3>
                <ul className="links-list">
                  {footerLinks.destinations.map((link, index) => (
                    <li key={index}>
                      <a href={link.href} className="footer-link">
                        <ChevronRight className="link-icon" />
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="links-column">
                <h3 className="links-title">Support</h3>
                <ul className="links-list">
                  {footerLinks.support.map((link, index) => (
                    <li key={index}>
                      <a href={link.href} className="footer-link">
                        <ChevronRight className="link-icon" />
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Featured Destinations */}
          <div className="footer-section featured-section">
            <h3 className="section-title">Popular Destinations</h3>
            <div className="featured-grid">
              {featuredDestinations.map((destination, index) => (
                <div key={index} className="featured-card">
                  <img src={destination.image} alt={destination.name} className="featured-image" />
                  <div className="featured-overlay">
                    <h4 className="featured-name">{destination.name}</h4>
                    <div className="featured-rating">
                      <Star className="rating-icon" />
                      <span>{destination.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="footer-section newsletter-section">
            <h3 className="section-title">
              <Mail className="title-icon" />
              Stay Updated
            </h3>
            <p className="newsletter-description">
              Get the latest travel tips, exclusive deals, and destination recommendations delivered to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <div className="newsletter-input-group">
                <Mail className="input-icon" />
                <input
                  type="email"
                  className="newsletter-input"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="newsletter-btn">
                  {subscribed ? (
                    <>
                      <Heart className="btn-icon" />
                      Subscribed!
                    </>
                  ) : (
                    <>
                      <Send className="btn-icon" />
                      Subscribe
                    </>
                  )}
                </button>
              </div>
            </form>
            <p className="newsletter-note">
              Join 50,000+ travelers. Unsubscribe anytime.
            </p>
          </div>

          {/* Contact Info */}
          <div className="footer-section contact-section">
            <h3 className="section-title">
              <Phone className="title-icon" />
              Get in Touch
            </h3>
            <div className="contact-info">
              <div className="contact-item">
                <Phone className="contact-icon" />
                <div className="contact-details">
                  <span className="contact-label">Phone</span>
                  <a href="tel:+919876543210" className="contact-value">+91 98765 43210</a>
                </div>
              </div>
              <div className="contact-item">
                <Mail className="contact-icon" />
                <div className="contact-details">
                  <span className="contact-label">Email</span>
                  <a href="mailto:info@tripmasterpro.com" className="contact-value">info@tripmasterpro.com</a>
                </div>
              </div>
              <div className="contact-item">
                <MapPin className="contact-icon" />
                <div className="contact-details">
                  <span className="contact-label">Office</span>
                  <span className="contact-value">123, MG Road, Bangalore, India</span>
                </div>
              </div>
              <div className="contact-item">
                <Clock className="contact-icon" />
                <div className="contact-details">
                  <span className="contact-label">Hours</span>
                  <span className="contact-value">Mon-Sat: 9AM-9PM, Sun: 10AM-6PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="trust-badges">
        <div className="badges-container">
          <div className="badge-item">
            <Shield className="badge-icon" />
            <span className="badge-text">Secure Booking</span>
          </div>
          <div className="badge-item">
            <Award className="badge-icon" />
            <span className="badge-text">Best Price Guarantee</span>
          </div>
          <div className="badge-item">
            <Users className="badge-icon" />
            <span className="badge-text">24/7 Support</span>
          </div>
          <div className="badge-item">
            <Zap className="badge-icon" />
            <span className="badge-text">Instant Confirmation</span>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="footer-bottom">
        <div className="bottom-container">
          <div className="bottom-left">
            <p className="copyright">
              © 2024 TripMaster Pro. All rights reserved. Made with{' '}
              <Heart className="heart-icon" />{' '}
              in India.
            </p>
          </div>
          <div className="bottom-right">
            <div className="payment-methods">
              <span className="payment-label">We Accept:</span>
              <div className="payment-icons">
                <div className="payment-icon visa">VISA</div>
                <div className="payment-icon mastercard">MC</div>
                <div className="payment-icon rupay">RUPAY</div>
                <div className="payment-icon upi">UPI</div>
                <div className="payment-icon paypal">PP</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ProfessionalFooter;
