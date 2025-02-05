import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Login.css'; // Import CSS for styling

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });

  // Run validation on email and password changes
  useEffect(() => {
    if (touched.email || touched.password) {
      validateForm();
    }
  }, [email, password, touched]);

  const validateForm = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValid(emailPattern.test(email) && password.length >= 6);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      if (response) {
        toast.success('Login successful! Redirecting...', {
          position: 'top-center',
          autoClose: 2000,
        });
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        throw new Error();
      }
    } catch (error) {
      setError('Invalid email or password');
      toast.error('Invalid email or password', { position: 'top-center' });
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
            required
          />
          {touched.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && (
            <p className="error">Invalid email format</p>
          )}
        </div>

        <div className="input-group">
          <input
            type="password"
            placeholder="Password (min. 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
            required
          />
          {touched.password && password.length < 6 && (
            <p className="error">Password must be at least 6 characters</p>
          )}
        </div>

        <button type="submit" disabled={!isValid}>Login</button>
      </form>
      <p>Don't have an account? <a href="/register">Register</a></p>
    </div>
  );
};

export default Login;
