import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { API_URL } from '../config/api';
import '../styles/Profile.css';

const ProfilePage = () => {
  const { user, token } = useAuth();
  const [profile, setProfile] = useState({
    name: '',
    username: '',
    role: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [password, setPassword] = useState({ current: '', new: '', confirm: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || '',
        username: user.username || '',
        role: user.role || ''
      });
    }
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${API_URL}/auth/profile`,
        { name: profile.name },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Update failed');
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (password.new !== password.confirm) {
      setMessage('Passwords do not match');
      return;
    }
    try {
      await axios.put(
        `${API_URL}/auth/password`,
        { currentPassword: password.current, newPassword: password.new },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('Password changed successfully');
      setPassword({ current: '', new: '', confirm: '' });
    } catch (error) {
      setMessage(error.response?.data?.message || 'Password change failed');
    }
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      
      {message && <div className="message">{message}</div>}
      
      <div className="profile-section">
        <h3>Personal Information</h3>
        <form onSubmit={handleUpdate}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              disabled={!isEditing}
            />
          </div>
          <div className="form-group">
            <label>Username</label>
            <input type="text" value={profile.username} disabled />
          </div>
          <div className="form-group">
            <label>Role</label>
            <input type="text" value={profile.role} disabled />
          </div>
          {isEditing ? (
            <div className="button-group">
              <button type="submit" className="btn-save">Save</button>
              <button type="button" onClick={() => setIsEditing(false)} className="btn-cancel">Cancel</button>
            </div>
          ) : (
            <button type="button" onClick={() => setIsEditing(true)} className="btn-edit">Edit</button>
          )}
        </form>
      </div>

      <div className="profile-section">
        <h3>Change Password</h3>
        <form onSubmit={handlePasswordChange}>
          <div className="form-group">
            <label>Current Password</label>
            <input
              type="password"
              value={password.current}
              onChange={(e) => setPassword({ ...password, current: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              value={password.new}
              onChange={(e) => setPassword({ ...password, new: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              value={password.confirm}
              onChange={(e) => setPassword({ ...password, confirm: e.target.value })}
            />
          </div>
          <button type="submit" className="btn-save">Change Password</button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
