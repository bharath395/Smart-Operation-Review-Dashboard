import React from 'react';
import { FaTimes } from 'react-icons/fa';
import './UserProfileModal.css';

const UserProfileModal = ({ isOpen, onClose, user }) => {
  if (!isOpen) return null;

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="profile-modal-overlay" onClick={handleOverlayClick}>
      <div className="profile-modal-container">
        {/* Close Icon */}
        <button className="profile-modal-close" onClick={onClose}>
          <FaTimes />
        </button>

        {/* Modal Content */}
        <div className="profile-modal-content">
          {/* Title */}
          <h2 className="profile-modal-title">User Profile</h2>
          
          {/* Divider */}
          <div className="profile-divider"></div>

          {/* Avatar Section */}
          <div className="profile-avatar-section">
            <div className="profile-avatar">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} />
              ) : (
                <div className="profile-avatar-placeholder">
                  <span className="profile-initials">{getInitials(user?.name)}</span>
                </div>
              )}
            </div>
          </div>

          {/* User Details */}
          <div className="profile-details">
            <div className="profile-detail-item">
              <span className="profile-detail-label">Worker ID</span>
              <span className="profile-detail-value">{user?.worker_id || '119283'}</span>
            </div>
            
            <div className="profile-divider-thin"></div>
            
            <div className="profile-detail-item">
              <span className="profile-detail-label">Full Name</span>
              <span className="profile-detail-value">{user?.name || 'N/A'}</span>
            </div>
            
            <div className="profile-divider-thin"></div>
            
            <div className="profile-detail-item">
              <span className="profile-detail-label">Role</span>
              <span className="profile-detail-value">
                <span className={`profile-role-badge ${user?.role?.toLowerCase()}`}>
                  {user?.role || 'N/A'}
                </span>
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="profile-modal-actions">
            <button className="profile-close-btn" onClick={onClose}>
              <span>Close</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;