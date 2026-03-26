import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import '../App.css';

const AdminPanel = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('pending');
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pendingResponse, allUsersResponse] = await Promise.all([
          fetch('http://localhost:5000/api/auth/pending-users', {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          fetch('http://localhost:5000/api/auth/all-users', {
            headers: { 'Authorization': `Bearer ${token}` }
          })
        ]);
        
        const pendingData = await pendingResponse.json();
        const allUsersData = await allUsersResponse.json();
        
        setPendingUsers(pendingData);
        setAllUsers(allUsersData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, [token]);

  const fetchPendingUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/pending-users', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setPendingUsers(data);
    } catch (error) {
      console.error('Error fetching pending users:', error);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/all-users', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setAllUsers(data);
    } catch (error) {
      console.error('Error fetching all users:', error);
    }
  };

  const handleApprove = async (userId) => {
    setLoading(true);
    try {
      await fetch(`http://localhost:5000/api/auth/approve-user/${userId}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchPendingUsers();
      fetchAllUsers();
    } catch (error) {
      console.error('Error approving user:', error);
    }
    setLoading(false);
  };

  const handleReject = async (userId) => {
    setLoading(true);
    try {
      await fetch(`http://localhost:5000/api/auth/reject-user/${userId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchPendingUsers();
    } catch (error) {
      console.error('Error rejecting user:', error);
    }
    setLoading(false);
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setLoading(true);
      try {
        await fetch(`http://localhost:5000/api/auth/delete-user/${userId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        fetchAllUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
      setLoading(false);
    }
  };

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>Admin Panel</h1>
        <div className="admin-tabs">
          <button 
            className={`tab-btn ${activeTab === 'pending' ? 'active' : ''}`}
            onClick={() => setActiveTab('pending')}
          >
            Pending Approvals ({pendingUsers.length})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            All Users ({allUsers.length})
          </button>
        </div>
      </div>

      {activeTab === 'pending' && (
        <div className="users-table-container">
          <h2>Pending User Approvals</h2>
          {pendingUsers.length === 0 ? (
            <p className="no-data">No pending approvals</p>
          ) : (
            <table className="users-table">
              <thead>
                <tr>
                  <th>Worker ID</th>
                  <th>Name</th>
                  <th>Username</th>
                  <th>Role</th>
                  <th>Requested At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingUsers.map(user => (
                  <tr key={user.id}>
                    <td>{user.worker_id}</td>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>
                      <span className={`role-badge ${user.role}`}>
                        {user.role}
                      </span>
                    </td>
                    <td>{new Date(user.requestedAt).toLocaleDateString()}</td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="approve-btn"
                          onClick={() => handleApprove(user.id)}
                          disabled={loading}
                        >
                          Approve
                        </button>
                        <button 
                          className="reject-btn"
                          onClick={() => handleReject(user.id)}
                          disabled={loading}
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {activeTab === 'users' && (
        <div className="users-table-container">
          <h2>All Users</h2>
          {allUsers.length === 0 ? (
            <p className="no-data">No users found</p>
          ) : (
            <table className="users-table">
              <thead>
                <tr>
                  <th>Worker ID</th>
                  <th>Name</th>
                  <th>Username</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {allUsers.map(user => (
                  <tr key={user.id}>
                    <td>{user.worker_id}</td>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>
                      <span className={`role-badge ${user.role}`}>
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <button 
                        className="delete-btn"
                        onClick={() => handleDelete(user.id)}
                        disabled={loading}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;