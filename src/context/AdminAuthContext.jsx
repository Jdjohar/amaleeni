import React, { createContext, useContext, useState, useEffect } from 'react';
import { adminLoginApi, fetchSiteSettingsApi, saveSiteSettingsApi } from '../services/api';

const AdminAuthContext = createContext();

export function AdminAuthProvider({ children }) {
  const [adminUser, setAdminUser] = useState(() => {
    const saved = localStorage.getItem('ama_admin_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [adminToken, setAdminToken] = useState(() => localStorage.getItem('ama_admin_token') || null);
  const [siteSettings, setSiteSettings] = useState({});
  const [isLoadingSettings, setIsLoadingSettings] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setIsLoadingSettings(true);
    try {
      const res = await fetchSiteSettingsApi();
      if (res && res.settings) {
        setSiteSettings(res.settings);
      }
    } catch (e) {
      console.warn('Unable to load dynamic site settings:', e);
    } finally {
      setIsLoadingSettings(false);
    }
  };

  const updateSettings = async (newSettings) => {
    const res = await saveSiteSettingsApi(newSettings);
    if (res && res.status === 'success') {
      setSiteSettings((prev) => ({ ...prev, ...newSettings }));
      return res;
    }
    throw new Error('Failed to update site settings.');
  };

  const loginAdmin = async (email, password) => {
    const res = await adminLoginApi(email, password);
    if (res && res.token && res.user) {
      setAdminUser(res.user);
      setAdminToken(res.token);
      localStorage.setItem('ama_admin_user', JSON.stringify(res.user));
      localStorage.setItem('ama_admin_token', res.token);
      return res.user;
    }
    throw new Error(res.message || 'Admin authentication failed.');
  };

  const logoutAdmin = () => {
    setAdminUser(null);
    setAdminToken(null);
    localStorage.removeItem('ama_admin_user');
    localStorage.removeItem('ama_admin_token');
  };

  const hasPermission = (permissionKey) => {
    if (!adminUser) return false;
    if (adminUser.role === 'admin') return true;
    const perms = adminUser.permissions || [];
    if (perms.includes('all')) return true;
    return perms.includes(permissionKey);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        adminUser,
        adminToken,
        siteSettings,
        isLoadingSettings,
        loginAdmin,
        logoutAdmin,
        hasPermission,
        updateSettings,
        loadSettings,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  return useContext(AdminAuthContext);
}
