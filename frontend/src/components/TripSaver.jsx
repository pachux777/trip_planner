import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Save, Share2, Download, Heart, Star, 
  Copy, Mail, MessageCircle, Smartphone,
  Calendar, MapPin, Users, Clock,
  Check, X, AlertCircle, Upload
} from 'lucide-react';
import './TripSaver.css';

const TripSaver = ({ tripData, plannerType }) => {
  const [savedTrips, setSavedTrips] = useState([]);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [tripName, setTripName] = useState('');
  const [tripDescription, setTripDescription] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [shareLink, setShareLink] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const [saving, setSaving] = useState(false);
  const [sharing, setSharing] = useState(false);

  useEffect(() => {
    loadSavedTrips();
    checkIfTripSaved();
  }, [tripData]);

  const loadSavedTrips = () => {
    const saved = localStorage.getItem('savedTrips');
    if (saved) {
      setSavedTrips(JSON.parse(saved));
    }
  };

  const checkIfTripSaved = () => {
    const saved = localStorage.getItem('savedTrips');
    if (saved) {
      const trips = JSON.parse(saved);
      const exists = trips.some(trip => 
        trip.from === tripData.from && 
        trip.to === tripData.to && 
        trip.plannerType === plannerType
      );
      setIsSaved(exists);
    }
  };

  const saveTrip = async () => {
    if (!tripName.trim()) {
      alert('Please enter a trip name');
      return;
    }

    setSaving(true);
    
    try {
      const newTrip = {
        id: Date.now(),
        name: tripName,
        description: tripDescription,
        from: tripData.from,
        to: tripData.to,
        plannerType: plannerType,
        data: tripData,
        createdAt: new Date().toISOString(),
        isFavorite: isFavorite
      };

      const updatedTrips = [...savedTrips, newTrip];
      setSavedTrips(updatedTrips);
      localStorage.setItem('savedTrips', JSON.stringify(updatedTrips));
      
      // Register for background sync
      if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
        const registration = await navigator.serviceWorker.ready;
        await registration.sync.register('background-sync-trips');
      }

      setIsSaved(true);
      setShowSaveModal(false);
      setTripName('');
      setTripDescription('');
      
      // Show success notification
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Trip Saved!', {
          body: `${tripName} has been saved successfully.`,
          icon: '/icon-192.png'
        });
      }
    } catch (error) {
      console.error('Error saving trip:', error);
      alert('Failed to save trip. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const shareTrip = async (method) => {
    setSharing(true);
    
    try {
      const shareData = {
        title: `Trip to ${tripData.to}`,
        text: `Check out my trip from ${tripData.from} to ${tripData.to} planned with TravelPro!`,
        url: window.location.href
      };

      switch (method) {
        case 'native':
          if (navigator.share) {
            await navigator.share(shareData);
          } else {
            throw new Error('Web Share API not supported');
          }
          break;
          
        case 'link':
          const link = `${window.location.origin}/shared-trip/${Date.now()}`;
          setShareLink(link);
          break;
          
        case 'email':
          const subject = encodeURIComponent(`Trip to ${tripData.to}`);
          const body = encodeURIComponent(shareData.text + '\n\n' + window.location.href);
          window.location.href = `mailto:?subject=${subject}&body=${body}`;
          break;
          
        case 'whatsapp':
          const whatsappText = encodeURIComponent(shareData.text + ' ' + window.location.href);
          window.open(`https://wa.me/?text=${whatsappText}`, '_blank');
          break;
          
        case 'sms':
          const smsText = encodeURIComponent(shareData.text + ' ' + window.location.href);
          window.open(`sms:?body=${smsText}`, '_blank');
          break;
      }
    } catch (error) {
      console.error('Error sharing trip:', error);
      alert('Failed to share trip. Please try again.');
    } finally {
      setSharing(false);
    }
  };

  const copyShareLink = () => {
    navigator.clipboard.writeText(shareLink);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const downloadTrip = () => {
    const tripJson = JSON.stringify({
      name: tripName || `Trip to ${tripData.to}`,
      plannerType: plannerType,
      data: tripData,
      exportedAt: new Date().toISOString()
    }, null, 2);

    const blob = new Blob([tripJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `trip-${tripData.to.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const deleteSavedTrip = (tripId) => {
    if (confirm('Are you sure you want to delete this saved trip?')) {
      const updatedTrips = savedTrips.filter(trip => trip.id !== tripId);
      setSavedTrips(updatedTrips);
      localStorage.setItem('savedTrips', JSON.stringify(updatedTrips));
      
      if (tripData && tripData.id === tripId) {
        setIsSaved(false);
      }
    }
  };

  const toggleFavorite = (tripId) => {
    const updatedTrips = savedTrips.map(trip => 
      trip.id === tripId ? { ...trip, isFavorite: !trip.isFavorite } : trip
    );
    setSavedTrips(updatedTrips);
    localStorage.setItem('savedTrips', JSON.stringify(updatedTrips));
  };

  const loadSavedTrip = (trip) => {
    // Emit custom event to load trip data
    const event = new CustomEvent('loadSavedTrip', { detail: trip });
    window.dispatchEvent(event);
  };

  return (
    <div className="trip-saver">
      {/* Save and Share Buttons */}
      <div className="trip-actions">
        <button
          onClick={() => setShowSaveModal(true)}
          className={`action-btn save-btn ${isSaved ? 'saved' : ''}`}
        >
          <Save size={18} />
          {isSaved ? 'Saved' : 'Save Trip'}
        </button>
        
        <button
          onClick={() => setShowShareModal(true)}
          className="action-btn share-btn"
        >
          <Share2 size={18} />
          Share
        </button>
        
        <button
          onClick={downloadTrip}
          className="action-btn download-btn"
        >
          <Download size={18} />
          Export
        </button>
      </div>

      {/* Save Modal */}
      <AnimatePresence>
        {showSaveModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
            onClick={() => setShowSaveModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="modal-content save-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3>
                  <Save size={20} />
                  Save Trip
                </h3>
                <button
                  onClick={() => setShowSaveModal(false)}
                  className="close-btn"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="modal-body">
                <div className="form-group">
                  <label>Trip Name *</label>
                  <input
                    type="text"
                    value={tripName}
                    onChange={(e) => setTripName(e.target.value)}
                    placeholder="Enter trip name"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={tripDescription}
                    onChange={(e) => setTripDescription(e.target.value)}
                    placeholder="Add trip description (optional)"
                    className="form-textarea"
                    rows={3}
                  />
                </div>

                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={isFavorite}
                      onChange={(e) => setIsFavorite(e.target.checked)}
                    />
                    <Heart size={16} className={isFavorite ? 'filled' : ''} />
                    Mark as favorite
                  </label>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  onClick={() => setShowSaveModal(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={saveTrip}
                  disabled={saving}
                  className="btn-primary"
                >
                  {saving ? (
                    <div className="spinner"></div>
                  ) : (
                    <>
                      <Save size={16} />
                      Save Trip
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
            onClick={() => setShowShareModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="modal-content share-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3>
                  <Share2 size={20} />
                  Share Trip
                </h3>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="close-btn"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="modal-body">
                <div className="share-options">
                  <button
                    onClick={() => shareTrip('native')}
                    disabled={sharing}
                    className="share-option"
                  >
                    <Share2 size={24} />
                    <span>Share</span>
                  </button>

                  <button
                    onClick={() => shareTrip('email')}
                    disabled={sharing}
                    className="share-option"
                  >
                    <Mail size={24} />
                    <span>Email</span>
                  </button>

                  <button
                    onClick={() => shareTrip('whatsapp')}
                    disabled={sharing}
                    className="share-option whatsapp"
                  >
                    <MessageCircle size={24} />
                    <span>WhatsApp</span>
                  </button>

                  <button
                    onClick={() => shareTrip('sms')}
                    disabled={sharing}
                    className="share-option sms"
                  >
                    <Smartphone size={24} />
                    <span>SMS</span>
                  </button>

                  <button
                    onClick={() => shareTrip('link')}
                    disabled={sharing}
                    className="share-option"
                  >
                    <Copy size={24} />
                    <span>Copy Link</span>
                  </button>
                </div>

                {shareLink && (
                  <div className="share-link">
                    <div className="link-input">
                      <input
                        type="text"
                        value={shareLink}
                        readOnly
                        className="form-input"
                      />
                      <button
                        onClick={copyShareLink}
                        className="copy-btn"
                      >
                        {copySuccess ? (
                          <Check size={16} />
                        ) : (
                          <Copy size={16} />
                        )}
                      </button>
                    </div>
                    {copySuccess && (
                      <div className="success-message">
                        <Check size={14} />
                        Link copied to clipboard!
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="modal-footer">
                <button
                  onClick={() => setShowShareModal(false)}
                  className="btn-secondary"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Saved Trips Sidebar */}
      {savedTrips.length > 0 && (
        <div className="saved-trips-sidebar">
          <div className="sidebar-header">
            <h3>
              <Save size={18} />
              Saved Trips
            </h3>
            <span className="trip-count">{savedTrips.length}</span>
          </div>

          <div className="saved-trips-list">
            {savedTrips.map((trip) => (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="saved-trip-item"
              >
                <div className="trip-info">
                  <div className="trip-header">
                    <h4>{trip.name}</h4>
                    <button
                      onClick={() => toggleFavorite(trip.id)}
                      className="favorite-btn"
                    >
                      <Heart 
                        size={16} 
                        className={trip.isFavorite ? 'filled' : ''} 
                      />
                    </button>
                  </div>
                  
                  <div className="trip-details">
                    <div className="trip-route">
                      <MapPin size={14} />
                      <span>{trip.from} → {trip.to}</span>
                    </div>
                    
                    <div className="trip-meta">
                      <span className="planner-type">{trip.plannerType}</span>
                      <span className="date">
                        {new Date(trip.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {trip.description && (
                    <p className="trip-description">{trip.description}</p>
                  )}
                </div>

                <div className="trip-actions">
                  <button
                    onClick={() => loadSavedTrip(trip)}
                    className="action-icon load-btn"
                    title="Load trip"
                  >
                    <Upload size={16} />
                  </button>
                  
                  <button
                    onClick={() => deleteSavedTrip(trip.id)}
                    className="action-icon delete-btn"
                    title="Delete trip"
                  >
                    <X size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TripSaver;
