import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Programme & Venue', path: '/programme' },
    { name: 'Team', path: '/team' },
    { name: 'About Amaleeni', path: '/about' },
    { name: 'Partner With Us', path: '/partner' },
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
              className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
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
            <a
              href="https://forms.gle/aKo9HBzgCB14dvAB9"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 bg-[#C83B46] hover:bg-[#A82B36] text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              <span>Register Now</span>
              <ArrowRight className="w-4 h-4" />
            </a>

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
            <a
              href="https://forms.gle/aKo9HBzgCB14dvAB9"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-4 w-full flex items-center justify-center gap-2 bg-[#C83B46] text-white py-3 rounded-full text-base font-semibold shadow-md"
            >
              <span>Register Now</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
