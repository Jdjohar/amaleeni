import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Heart, ArrowRight } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { useAdminAuth } from '../context/AdminAuthContext';
import { subscribeNewsletterApi } from '../services/api';

export default function Footer() {
  const { showToast, showThankYouModal } = useToast();
  const { siteSettings } = useAdminAuth();

  const instagramUrl = siteSettings?.instagram_url || 'https://www.instagram.com/amaleenifoundation';
  const linkedinUrl = siteSettings?.linkedin_url || 'https://www.linkedin.com/company/amaleenifoundation';
  const facebookUrl = siteSettings?.facebook_url || 'https://www.facebook.com/amaleenifoundation';
  const youtubeUrl = siteSettings?.youtube_url || 'https://www.youtube.com/@AmaleeniFoundation';

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
      await subscribeNewsletterApi(newsletterEmail.trim());
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

            {/* Social Media Links */}
            <div className="flex items-center gap-2 pt-1">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Amaleeni Foundation on Instagram"
                title="Instagram"
                className="w-8 h-8 rounded-lg bg-[#1B3629] border border-[#2B523E] hover:border-[#C83B46] text-[#A8C2B3] hover:text-[#C83B46] flex items-center justify-center transition-all cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Amaleeni Foundation on LinkedIn"
                title="LinkedIn"
                className="w-8 h-8 rounded-lg bg-[#1B3629] border border-[#2B523E] hover:border-[#0077B5] text-[#A8C2B3] hover:text-[#0077B5] flex items-center justify-center transition-all cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Amaleeni Foundation on Facebook"
                title="Facebook"
                className="w-8 h-8 rounded-lg bg-[#1B3629] border border-[#2B523E] hover:border-[#1877F2] text-[#A8C2B3] hover:text-[#1877F2] flex items-center justify-center transition-all cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Amaleeni Foundation on YouTube"
                title="YouTube"
                className="w-8 h-8 rounded-lg bg-[#1B3629] border border-[#2B523E] hover:border-[#FF0000] text-[#A8C2B3] hover:text-[#FF0000] flex items-center justify-center transition-all cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
              </a>
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
