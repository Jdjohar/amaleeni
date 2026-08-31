import React, { createContext, useContext, useState } from 'react';
import { registerUserApi, loginUserApi, verifyPaymentApi } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem('ama_token');
    } catch {
      return null;
    }
  });

  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('ama_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [isLoading, setIsLoading] = useState(false);

  // Save session state helper
  const saveSession = (newToken, newUser) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('ama_token', newToken);
    localStorage.setItem('ama_user', JSON.stringify(newUser));
  };

  // Register
  const register = async (formData) => {
    setIsLoading(true);
    try {
      const response = await registerUserApi(formData);
      if (response && response.user) {
        saveSession(response.token || 'auth_token_' + response.user.id, response.user);
        return { success: true, user: response.user, message: response.message };
      }
      throw new Error('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Login
  const login = async (email, password, botTrap = '') => {
    setIsLoading(true);
    try {
      const response = await loginUserApi(email, password, botTrap);
      if (response && response.user) {
        saveSession(response.token || 'auth_token_' + response.user.id, response.user);
        return { success: true, user: response.user };
      }
      throw new Error('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Update payment to PAID
  const updatePaymentSuccess = async (paymentResult) => {
    if (!user) return;
    const response = await verifyPaymentApi({
      userId: user.id,
      razorpayOrderId: paymentResult.razorpayOrderId,
      razorpayPaymentId: paymentResult.razorpayPaymentId,
      razorpaySignature: paymentResult.razorpaySignature,
      isMock: paymentResult.isMock,
    });

    const updated = response.user || { ...user, payment_status: 'PAID', paid_at: new Date().toISOString() };
    setUser(updated);
    localStorage.setItem('ama_user', JSON.stringify(updated));
    return updated;
  };

  // Logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('ama_token');
    localStorage.removeItem('ama_user');
  };

  const value = {
    user,
    token,
    isAuthenticated: Boolean(user),
    isPaidMember: user?.payment_status === 'PAID',
    isLoading,
    register,
    login,
    updatePaymentSuccess,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
