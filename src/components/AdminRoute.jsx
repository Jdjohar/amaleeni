import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';

export default function AdminRoute({ children, permission = null }) {
  const { adminUser, hasPermission } = useAdminAuth();

  if (!adminUser) {
    return <Navigate to="/admin/login" replace />;
  }

  if (permission && !hasPermission(permission)) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4 text-center">
        <div className="max-w-md mx-auto bg-[#FAF5EB] p-8 rounded-3xl border border-[#C83B46] shadow-xl space-y-4">
          <h2 className="font-serif text-2xl font-bold text-[#C83B46]">Access Restricted</h2>
          <p className="text-sm text-[#4E6B5A]">
            Your team member account does not have permission to view the <strong>{permission}</strong> section.
          </p>
        </div>
      </div>
    );
  }

  return children;
}
