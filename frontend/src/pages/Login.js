import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../config/api';
import '../App.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [workerId, setWorkerId] = useState('');
  const [role, setRole] = useState('operator');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (isSignup) {
      try {
        const response = await fetch(`${API_URL}/auth/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password, name, worker_id: workerId, role })
        });
        const data = await response.json();

        if (response.ok) {
          setSuccess(data.message);
          setUsername('');
          setPassword('');
          setName('');
          setWorkerId('');
          setRole('operator');
          setTimeout(() => setIsSignup(false), 2000);
        } else {
          setError(data.message);
        }
      } catch (err) {
        console.error('Signup error:', err);
        setError('Registration failed. Please check if backend server is running.');
      }
    } else {
      try {
        await login(username, password);
        navigate('/dashboard');
      } catch (err) {
        setError(err.response?.data?.message || 'Invalid username or password');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <span className="login-chip">OPERATIONS PORTAL</span>
          <h1>BA PRODUCTIONS</h1>
          <p>Smart Production Operation Review Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {isSignup && (
            <>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter full name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Worker ID</label>
                <input
                  type="text"
                  value={workerId}
                  onChange={(e) => setWorkerId(e.target.value)}
                  placeholder="Enter worker ID (e.g., 119283)"
                  pattern="[0-9]+"
                  title="Worker ID must contain only numbers"
                  required
                />
              </div>
              <div className="form-group">
                <label>Role</label>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="operator">Operator</option>
                  <option value="manager">Manager</option>
                  <option value="supervisor">Supervisor</option>
                </select>
              </div>
            </>
          )}

          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <button type="submit" className="login-btn">
            {isSignup ? 'Sign Up' : 'Login'}
          </button>

          <div className="toggle-form">
            <p>
              {isSignup ? 'Already have an account?' : "Don't have an account?"}
              <span onClick={() => {
                setIsSignup(!isSignup);
                setError('');
                setSuccess('');
              }}>
                {isSignup ? ' Login' : ' Sign Up'}
              </span>
            </p>
          </div>
        </form>

      </div>
    </div>
  );
};

export default Login;
