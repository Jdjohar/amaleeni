import React, { useState } from 'react';
import { X, Send, CheckCircle2, Building2, User, Mail, Phone, MapPin, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ContactModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    sector: 'Manufacturing',
    district: 'Lucknow',
    investmentRange: '₹10 Lakh - ₹50 Lakh',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Trigger confetti celebration
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#C83B46', '#1B3629', '#D49B4B', '#FFFFFF'],
    });
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0E1E16]/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#FAF5EB] rounded-3xl max-w-2xl w-full border border-[#E5D7C3] shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="bg-[#1B3629] text-white p-6 sm:p-8 flex items-center justify-between relative">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C83B46] text-white text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>UP Single Window Support</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF5EB]">
              Start Your Business in Uttar Pradesh
            </h3>
            <p className="text-xs sm:text-sm text-[#A8C2B3] mt-1 font-serif">
              Amaleeni Foundation advisors will contact you within 24 hours.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto">
          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-20 h-20 rounded-full bg-[#1B3629] text-[#D49B4B] mx-auto flex items-center justify-center shadow-lg animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="font-serif text-3xl font-bold text-[#1B3629]">
                Application Submitted Successfully!
              </h4>
              <p className="text-base text-[#4E6B5A] font-serif max-w-md mx-auto">
                Thank you, <span className="font-semibold text-[#1B3629]">{formData.fullName}</span>. Our UP Business Facilitation Officer will reach out to you at <span className="font-semibold text-[#1B3629]">{formData.phone}</span> with custom scheme details.
              </p>

              <div className="pt-6">
                <button
                  onClick={handleReset}
                  className="bg-[#C83B46] hover:bg-[#A82B36] text-white px-8 py-3 rounded-full text-sm font-semibold transition-all shadow-md"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1B3629] uppercase tracking-wider mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#8A755A] absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sunita Sharma"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F2E8D7] border border-[#E0D2BC] text-[#1B3629] text-sm focus:outline-none focus:ring-2 focus:ring-[#C83B46]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1B3629] uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#8A755A] absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      required
                      placeholder="sunita@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F2E8D7] border border-[#E0D2BC] text-[#1B3629] text-sm focus:outline-none focus:ring-2 focus:ring-[#C83B46]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1B3629] uppercase tracking-wider mb-1">
                    Mobile Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#8A755A] absolute left-3.5 top-3.5" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F2E8D7] border border-[#E0D2BC] text-[#1B3629] text-sm focus:outline-none focus:ring-2 focus:ring-[#C83B46]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1B3629] uppercase tracking-wider mb-1">
                    Business Sector
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-[#8A755A] absolute left-3.5 top-3.5" />
                    <select
                      value={formData.sector}
                      onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F2E8D7] border border-[#E0D2BC] text-[#1B3629] text-sm focus:outline-none focus:ring-2 focus:ring-[#C83B46]"
                    >
                      <option value="Manufacturing">Manufacturing &amp; Industry</option>
                      <option value="Textiles">Textiles &amp; Garments</option>
                      <option value="IT">IT, Software &amp; Tech</option>
                      <option value="Food Processing">Food Processing &amp; Agri</option>
                      <option value="Handicrafts">Handicrafts &amp; ODOP</option>
                      <option value="Services">Healthcare &amp; Services</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1B3629] uppercase tracking-wider mb-1">
                    Preferred UP District
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-[#8A755A] absolute left-3.5 top-3.5" />
                    <select
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F2E8D7] border border-[#E0D2BC] text-[#1B3629] text-sm focus:outline-none focus:ring-2 focus:ring-[#C83B46]"
                    >
                      <option value="Lucknow">Lucknow</option>
                      <option value="Noida">Noida / Greater Noida</option>
                      <option value="Kanpur">Kanpur</option>
                      <option value="Varanasi">Varanasi</option>
                      <option value="Gorakhpur">Gorakhpur</option>
                      <option value="Meerut">Meerut</option>
                      <option value="Other">Other UP District</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1B3629] uppercase tracking-wider mb-1">
                    Estimated Investment
                  </label>
                  <select
                    value={formData.investmentRange}
                    onChange={(e) => setFormData({ ...formData, investmentRange: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F2E8D7] border border-[#E0D2BC] text-[#1B3629] text-sm focus:outline-none focus:ring-2 focus:ring-[#C83B46]"
                  >
                    <option value="Under ₹10 Lakh">Under ₹10 Lakh</option>
                    <option value="₹10 Lakh - ₹50 Lakh">₹10 Lakh - ₹50 Lakh</option>
                    <option value="₹50 Lakh - ₹2 Crore">₹50 Lakh - ₹2 Crore</option>
                    <option value="₹2 Crore+">Above ₹2 Crore</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1B3629] uppercase tracking-wider mb-1">
                  Tell Us About Your Business Plan
                </label>
                <textarea
                  rows={3}
                  placeholder="Share a brief overview of your business idea or requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F2E8D7] border border-[#E0D2BC] text-[#1B3629] text-sm focus:outline-none focus:ring-2 focus:ring-[#C83B46]"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#C83B46] hover:bg-[#A82B36] text-white py-3.5 rounded-full text-base font-bold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <span>Submit Consultation Application</span>
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
