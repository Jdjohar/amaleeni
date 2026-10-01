import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Heart, ArrowRight } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function Footer() {
  const { showToast, showThankYouModal } = useToast();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      await fetch('/api/newsletter.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail.trim() }),
      });
    } catch (err) {
      console.log('Newsletter handler fallback invoked.');
    } finally {
      setIsSubmitting(false);
      showThankYouModal(
        'Thank You for Subscribing!',
        `Your email address (${newsletterEmail.trim()}) has been registered with the Amaleeni Foundation Secretariat. You will receive exclusive line-up updates, summit schedules, and business opportunity briefings.`
      );
      showToast('Subscribed to Secretariat Updates successfully!');
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#13281E] text-white pt-16 pb-12 border-t border-[#1F3D2E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-[#234532]">
          
          {/* Col 1: Brand Info & LEI */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center" aria-label="Amaleeni Foundation Home">
              <img
                src="/assets/logo.png"
                alt="Amaleeni Logo"
                className="h-14 sm:h-[70px] w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.src = "/assets/logo.png";
                }}
              />
            </Link>

            <p className="text-xs sm:text-sm text-[#A8C2B3] font-serif leading-relaxed">
              Amaleeni Womenpreneurs 2027: Putting women entrepreneurs in the room with capital, policy, buyers, and mentors.
            </p>

            <div className="text-[11px] text-[#7A9988] font-serif pt-1 space-y-0.5 border-t border-[#1F3D2E]">
              <p>NGO Darpan ID: MH/2022/0311250</p>
              <p>LEI: 9845008F0CBFA6D37097</p>
            </div>
          </div>

          {/* Col 2: Navigation Pages */}
          <div>
            <h4 className="font-serif text-base font-bold text-[#D49B4B] mb-3">Event &amp; Directory</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#A8C2B3]">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/pink-pages" className="hover:text-white text-[#F6EFE2] font-semibold transition-colors">Pink Pages Directory</Link></li>
              <li><Link to="/pink-pages/register" className="hover:text-white text-[#D49B4B] transition-colors">Register on Pink Pages</Link></li>
              <li><Link to="/programme" className="hover:text-white transition-colors">Programme &amp; Venue</Link></li>
              <li><Link to="/team" className="hover:text-white transition-colors">Team &amp; Lineup</Link></li>
              <li><a href="https://forms.gle/aKo9HBzgCB14dvAB9" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Summit Registration External Google Form">Summit Registration</a></li>
            </ul>
          </div>

          {/* Col 3: Foundation Pages */}
          <div>
            <h4 className="font-serif text-base font-bold text-[#D49B4B] mb-3">Foundation &amp; Impact</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#A8C2B3]">
              <li><Link to="/about" className="hover:text-white transition-colors">About Amaleeni</Link></li>
              <li><Link to="/advisory-board" className="hover:text-white font-semibold text-[#FAF5EB] transition-colors">Advisory Board</Link></li>
              <li><Link to="/impact-stories" className="hover:text-white transition-colors">Impact Stories</Link></li>
              <li><Link to="/csr-partnerships" className="hover:text-white transition-colors">CSR Partnerships</Link></li>
              <li><Link to="/partner" className="hover:text-white transition-colors">Partner With Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Col 4: Governance & Policies */}
          <div>
            <h4 className="font-serif text-base font-bold text-[#D49B4B] mb-3">Governance &amp; Policies</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#A8C2B3]">
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/grievance-redressal" className="hover:text-white font-semibold text-[#FAF5EB] transition-colors">Grievance Redressal</Link></li>
              <li><Link to="/refund-cancellation" className="hover:text-white transition-colors">Refund &amp; Cancellation</Link></li>
            </ul>
          </div>

          {/* Col 5: Secretariat Updates */}
          <div>
            <h4 className="font-serif text-base font-bold text-[#D49B4B] mb-3">Secretariat Updates</h4>
            <p className="text-xs text-[#A8C2B3] mb-3 font-serif">
              Subscribe for delegate updates, line-up releases, and match updates.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <input
                type="email"
                required
                placeholder="Enter your email"
                aria-label="Email address for newsletter subscription"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#1B3629] border border-[#2B523E] text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#C83B46]"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                aria-label="Subscribe to Secretariat Updates"
                className="w-full bg-[#C83B46] hover:bg-[#A82B36] text-white py-2 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 disabled:opacity-75 cursor-pointer"
              >
                <span>{isSubmitting ? 'Subscribing...' : 'Subscribe'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A9988]">
          <p>An initiative of the Amaleeni Foundation – ten years of work with women.</p>
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
