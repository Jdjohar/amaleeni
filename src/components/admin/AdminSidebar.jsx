import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  Inbox, 
  Mail, 
  Settings, 
  LogOut, 
  Shield, 
  Sparkles 
} from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';

export default function AdminSidebar({ isOpen, onClose }) {
  const { adminUser, logoutAdmin, hasPermission } = useAdminAuth();

  const navItems = [
    { title: 'Dashboard Overview', path: '/admin', icon: LayoutDashboard, perm: 'dashboard' },
    { title: 'Pink Pages Members', path: '/admin/members', icon: Users, perm: 'members' },
    { title: 'Team Roster (/team)', path: '/admin/team', icon: UserCheck, perm: 'team' },
    { title: 'Form Submissions', path: '/admin/inquiries', icon: Inbox, perm: 'inquiries' },
    { title: 'Newsletter Subscribers', path: '/admin/subscribers', icon: Mail, perm: 'subscribers' },
    { title: 'Site Settings & Razorpay', path: '/admin/settings', icon: Settings, perm: 'settings' },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={onClose} 
          className="fixed inset-0 z-40 bg-[#0E1E16]/60 backdrop-blur-xs lg:hidden" 
        />
      )}

      <aside className={`fixed top-0 left-0 bottom-0 z-50 w-64 bg-[#1B3629] text-white flex flex-col justify-between transition-transform duration-300 border-r border-[#2F5A43] ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div>
          {/* Logo & Admin Branding */}
          <div className="p-6 border-b border-[#2F5A43] flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#C83B46] text-white flex items-center justify-center font-serif font-extrabold text-xl shadow-md">
              A
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg text-white leading-none">Amaleeni</h2>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#D49B4B] flex items-center gap-1 mt-1">
                <Shield className="w-3 h-3" />
                <span>Admin Suite</span>
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 overflow-y-auto">
            {navItems.map((item) => {
              if (item.perm !== 'dashboard' && !hasPermission(item.perm)) {
                return null;
              }
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/admin'}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-[#C83B46] text-white shadow-md'
                        : 'text-[#A8C2B3] hover:bg-[#234533] hover:text-white'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 text-[#D49B4B]" />
                  <span>{item.title}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-[#2F5A43]">
          <div className="bg-[#13281E] p-3.5 rounded-2xl border border-[#2B4E3B] mb-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#C83B46]/20 border border-[#C83B46]/40 flex items-center justify-center text-[#D49B4B] font-bold text-xs shrink-0">
              {adminUser?.full_name ? adminUser.full_name[0] : 'A'}
            </div>
            <div className="min-w-0 grow">
              <p className="text-xs font-bold text-white truncate">{adminUser?.full_name || 'Admin User'}</p>
              <p className="text-[10px] text-[#A8C2B3] capitalize">{adminUser?.role || 'Administrator'}</p>
            </div>
          </div>

          <button
            onClick={logoutAdmin}
            className="w-full flex items-center justify-center gap-2 bg-[#C83B46]/10 hover:bg-[#C83B46] text-[#C83B46] hover:text-white py-2.5 rounded-xl text-xs font-bold transition-all border border-[#C83B46]/30 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout Admin</span>
          </button>
        </div>
      </aside>
    </>
  );
}
