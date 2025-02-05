import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Home.css'; // Import CSS for styling

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="home-container">
      <h1>User Management System</h1>
      {user ? (
        <div className="logged-in">
          <p>You are logged in as <strong>{user.name}</strong></p>
          <Link to="/dashboard">
            <button className="primary-btn">Go to Dashboard</button>
          </Link>
        </div>
      ) : (
        <div className="auth-options">
          <p>Please login or register to continue.</p>
          <div className="button-group">
            <Link to="/login">
              <button className="primary-btn">Login</button>
            </Link>
            <Link to="/register">
              <button className="secondary-btn">Register</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
