import React from 'react';
import { Menu, ExternalLink, Sparkles, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';

export default function AdminHeader({ onMenuClick, title }) {
  const { adminUser } = useAdminAuth();

  return (
    <header className="sticky top-0 z-30 bg-[#FAF5EB]/90 backdrop-blur-md border-b border-[#E5D7C3] px-4 sm:px-8 py-4 flex items-center justify-between shadow-xs">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden w-10 h-10 rounded-xl bg-[#F2E8D7] border border-[#E0D2BC] flex items-center justify-center text-[#1B3629]"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h1 className="font-serif text-xl sm:text-2xl font-bold text-[#1B3629]">
            {title}
          </h1>
          <p className="text-xs text-[#7A6750]">
            Amaleeni Foundation Management Console
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Link
          to="/"
          target="_blank"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#1B3629]/10 hover:bg-[#1B3629] text-[#1B3629] hover:text-white text-xs font-bold transition-all border border-[#1B3629]/20"
        >
          <Globe className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">View Live Site</span>
          <ExternalLink className="w-3 h-3" />
        </Link>
      </div>
    </header>
  );
}
