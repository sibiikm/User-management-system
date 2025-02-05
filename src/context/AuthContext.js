import React, { createContext, useContext, useState, useEffect } from 'react';

// Create Auth Context
const AuthContext = createContext();

// Custom Hook to use AuthContext
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from localStorage on startup
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Login Function
  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = users.find(u => u.email === email && u.password === password);

    if (existingUser) {
      setUser(existingUser);
      localStorage.setItem('user', JSON.stringify(existingUser));
      return true;
    }
    return false;
  };

  // Logout Function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Register Function
  const register = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const newUser = { name, email, password };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
