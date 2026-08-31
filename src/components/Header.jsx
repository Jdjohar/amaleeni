import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, LogIn, UserCheck, ShieldCheck, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, isPaidMember, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Pink Pages', path: '/pink-pages' },
    { name: 'Programme & Venue', path: '/programme' },
    { name: 'Team', path: '/team' },
    { name: 'About Amaleeni', path: '/about' },
    { name: 'Partner With Us', path: '/partner' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#F8F3EA]/95 backdrop-blur-md shadow-md py-3 border-b border-[#E5D7C3]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center group">
            <img
              src="/assets/logo.png"
              alt="Amaleeni Logo"
              className="h-14 sm:h-[75px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                e.currentTarget.src = "/assets/logo.png";
              }}
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative font-medium text-sm transition-colors duration-200 py-1 ${
                    isActive
                      ? 'text-[#1B3629] font-semibold'
                      : 'text-[#3E5C4B] hover:text-[#1B3629]'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C83B46] rounded-full transition-all duration-300" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action & Menu Toggle */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Link
                  to="/pink-pages/dashboard"
                  className="hidden sm:flex items-center gap-2 bg-[#1B3629] hover:bg-[#12251C] text-white px-4 py-2.5 rounded-full text-xs font-bold transition-all shadow-sm border border-[#37644D]"
                >
                  {isPaidMember ? (
                    <ShieldCheck className="w-3.5 h-3.5 text-[#81C784]" />
                  ) : (
                    <UserCheck className="w-3.5 h-3.5 text-[#D49B4B]" />
                  )}
                  <span>Dashboard ({user?.full_name?.split(' ')[0] || 'Member'})</span>
                </Link>

                <button
                  onClick={logout}
                  className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-[#7A6750] hover:text-[#C83B46] px-3.5 py-2.5 rounded-full border border-[#D9C7AF] bg-[#FAF5EB] hover:bg-[#F2E8D7] transition-all cursor-pointer"
                  title="Log Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-[#1B3629] hover:text-[#C83B46] px-3.5 py-2.5 rounded-full border border-[#D9C7AF] bg-[#FAF5EB] hover:bg-[#F2E8D7] transition-all"
                >
                  <LogIn className="w-3.5 h-3.5 text-[#C83B46]" />
                  <span>Member Login</span>
                </Link>

                <Link
                  to="/pink-pages/register"
                  className="hidden sm:flex items-center gap-2 bg-[#C83B46] hover:bg-[#A82B36] text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                >
                  <span>Register</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-full border border-[#1B3629]/30 flex items-center justify-center text-[#1B3629] hover:bg-[#1B3629]/10 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF5EB] border-b border-[#E2D4C0] shadow-xl px-6 py-6 transition-all animate-fadeIn">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-lg font-serif font-medium py-2 border-b border-[#EAE0D0] ${
                  location.pathname === link.path ? 'text-[#C83B46] font-bold' : 'text-[#1B3629]'
                }`}
              >
                {link.name}
              </Link>
            ))}
            {isAuthenticated ? (
              <>
                <Link
                  to="/pink-pages/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-2 w-full flex items-center justify-center gap-2 bg-[#1B3629] text-white py-3 rounded-full text-base font-semibold shadow-md"
                >
                  <ShieldCheck className="w-5 h-5 text-[#D49B4B]" />
                  <span>Go to Member Dashboard</span>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="mt-1 w-full flex items-center justify-center gap-2 bg-[#F2E8D7] text-[#C83B46] py-3 rounded-full text-base font-semibold border border-[#D9C7AF]"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Log Out</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-2 w-full flex items-center justify-center gap-2 bg-[#F2E8D7] text-[#1B3629] py-3 rounded-full text-base font-semibold border border-[#D9C7AF]"
                >
                  <LogIn className="w-5 h-5 text-[#C83B46]" />
                  <span>Member Login</span>
                </Link>

                <Link
                  to="/pink-pages/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-1 w-full flex items-center justify-center gap-2 bg-[#C83B46] text-white py-3 rounded-full text-base font-semibold shadow-md"
                >
                  <span>Register on Pink Pages</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
