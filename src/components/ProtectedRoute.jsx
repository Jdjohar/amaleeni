import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles } from 'lucide-react';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="paper-texture min-h-screen flex items-center justify-center pt-24 pb-20">
        <div className="bg-[#FAF5EB] p-8 rounded-3xl border border-[#E5D7C3] shadow-lg text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#1B3629] text-[#D49B4B] mx-auto flex items-center justify-center animate-spin">
            <Sparkles className="w-6 h-6" />
          </div>
          <p className="text-sm font-bold text-[#1B3629] font-serif">Verifying Member Session...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login page and preserve the intended route
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
