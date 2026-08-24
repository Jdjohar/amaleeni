import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Heart, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#13281E] text-white pt-16 pb-12 border-t border-[#1F3D2E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#234532]">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center">
              <img
                src="/assets/logo.png"
                alt="Amaleeni Logo"
                className="h-10 sm:h-12 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.src = "/assets/logo.png";
                }}
              />
            </Link>

            <p className="text-sm text-[#A8C2B3] font-serif leading-relaxed max-w-sm">
              Amaleeni Womenpreneurs 2027: From Vision to Venture. Putting women entrepreneurs in the room with capital, policy, buyers, and mentors.
            </p>

           
          </div>

          {/* Col 2: Navigation Pages */}
          <div>
            <h4 className="font-serif text-lg font-bold text-[#D49B4B] mb-4">Event Pages</h4>
            <ul className="space-y-2 text-sm text-[#A8C2B3]">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/programme" className="hover:text-white transition-colors">Programme &amp; Venue</Link></li>
              <li><Link to="/team" className="hover:text-white transition-colors">Team &amp; Lineup</Link></li>
              <li><a href="https://forms.gle/aKo9HBzgCB14dvAB9" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Register Now</a></li>
            </ul>
          </div>

          {/* Col 3: Foundation Pages */}
          <div>
            <h4 className="font-serif text-lg font-bold text-[#D49B4B] mb-4">Foundation &amp; Partners</h4>
            <ul className="space-y-2 text-sm text-[#A8C2B3]">
              <li><Link to="/about" className="hover:text-white transition-colors">About Amaleeni</Link></li>
              <li><Link to="/partner" className="hover:text-white transition-colors">Partner With Us</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms &amp; Conditions</Link></li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h4 className="font-serif text-lg font-bold text-[#D49B4B] mb-4">Secretariat Updates</h4>
            <p className="text-xs text-[#A8C2B3] mb-3 font-serif">
              Subscribe for delegate updates, line-up releases, and match updates.
            </p>
            <div className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3.5 py-2 rounded-xl bg-[#1B3629] border border-[#2B523E] text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#C83B46]"
              />
              <button className="w-full bg-[#C83B46] hover:bg-[#A82B36] text-white py-2 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5">
                <span>Subscribe</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A9988]">
          <p>An initiative of the Amaleeni Foundation – awakening the strength within.</p>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <p>
              Design &amp; Impact Partner: <span className="text-[#D49B4B] font-semibold">SYU Design</span>
            </p>
            <span className="hidden sm:inline text-[#37644D]">•</span>
            <span>&copy; 2027 Amaleeni Foundation. All Rights Reserved.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
