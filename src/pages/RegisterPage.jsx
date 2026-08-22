import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CheckCircle2, Send, Sparkles, User, Mail, Phone, Building2, MapPin, Target, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function RegisterPage() {
  const location = useLocation();
  const [selectedFeeCategory, setSelectedFeeCategory] = useState('Early Bird Delegate');
  const [submitted, setSubmitted] = useState(false);
  const [refId, setRefId] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    orgName: '',
    delegateType: 'Entrepreneur / Founder',
    stage: 'Growth Stage (1-3 yrs)',
    sector: 'Manufacturing',
    location: 'Odisha',
    seeking: ['Capital & Funding', 'Market & Buyer Access'],
  });

  useEffect(() => {
    if (location.hash === '#form') {
      const el = document.getElementById('form');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  const feeCategories = [
    {
      title: 'Early Bird Delegate',
      price: '[₹ Fee]',
      access: 'Full 2-Day Summit Pass',
      includes: [
        'Access to all 4 program tracks (Capital, Policy, Market, Mentorship)',
        'Delegate networking directory access',
        'Official lunch & networking reception',
      ],
    },
    {
      title: 'Startup Founder Delegate',
      price: '[₹ Subsidized Fee]',
      access: 'Pitch Floor & Mentorship Priority',
      includes: [
        '1-on-1 Investor speed-meeting eligibility',
        'Single-window policy helpdesk registration',
        'Sector masterclass materials & toolkits',
      ],
    },
    {
      title: 'Institutional / Corporate Delegate',
      price: '[₹ Corporate Rate]',
      access: 'VIP & Procurement Pass',
      includes: [
        'Corporate buyer booth & vendor listing',
        'Government official briefing session',
        'Curated matchmaking CRM matching',
      ],
    },
  ];

  const handleSelectCategory = (catTitle) => {
    setSelectedFeeCategory(catTitle);
    const el = document.getElementById('form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCheckbox = (item) => {
    if (formData.seeking.includes(item)) {
      setFormData({ ...formData, seeking: formData.seeking.filter(i => i !== item) });
    } else {
      setFormData({ ...formData, seeking: [...formData.seeking, item] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const generatedRef = 'AW27-' + Math.floor(100000 + Math.random() * 900000);
    setRefId(generatedRef);
    setSubmitted(true);
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="paper-texture min-h-screen pt-28 sm:pt-32 pb-20">
      
      {/* 4.1 Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1B3629]/10 text-[#1B3629] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[#C83B46]" />
            <span>Delegate Registration</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-extrabold text-[#1B3629]">
            Claim your place.
          </h1>

          <p className="text-lg sm:text-xl text-[#3D5C4A] font-serif">
            Whether you are starting, building or scaling – this is the room. Your answers shape the meetings we arrange for you.
          </p>

          <p className="text-xs text-[#8A755A] font-semibold uppercase tracking-widest pt-2">
            One registration path for everyone – entrepreneurs, investors, banks, corporates and government all register as delegates.
          </p>
        </div>
      </section>

      {/* 4.2 Fees */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl font-bold text-[#1B3629]">
            Delegate Fee Tiers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {feeCategories.map((cat, idx) => (
            <div key={idx} className="bg-[#FAF5EB] rounded-3xl p-8 border border-[#E5D7C3] shadow-md flex flex-col justify-between hover:shadow-xl transition-shadow">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#C83B46]">
                  {cat.access}
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#1B3629] mt-1">{cat.title}</h3>
                <p className="font-serif text-3xl font-extrabold text-[#1B3629] mt-3">{cat.price}</p>

                <ul className="mt-6 space-y-3">
                  {cat.includes.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-[#4E6B5A] font-serif">
                      <CheckCircle2 className="w-4 h-4 text-[#C83B46] shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleSelectCategory(cat.title)}
                className="mt-8 w-full bg-[#1B3629] hover:bg-[#C83B46] text-white py-3 rounded-full text-sm font-bold transition-colors"
              >
                Select Category
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 4.3 Registration Form (#form) */}
      <section id="form" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF5EB] rounded-3xl p-8 sm:p-12 border border-[#E5D7C3] shadow-2xl space-y-6">
          
          <div className="text-center space-y-2 border-b border-[#E5D7C3] pb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C83B46]">
              Selected Tier: {selectedFeeCategory}
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#1B3629]">
              Delegate Information Form
            </h2>
            <p className="text-xs text-[#7A6750] font-serif">
              These details drive curated meeting matching. Held privately and never published.
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-20 h-20 rounded-full bg-[#1B3629] text-[#D49B4B] mx-auto flex items-center justify-center shadow-lg">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-serif text-3xl font-bold text-[#1B3629]">
                Registration Confirmed!
              </h3>
              <p className="text-sm text-[#C83B46] font-bold font-mono">
                Reference ID: {refId}
              </p>
              <p className="text-base text-[#4E6B5A] font-serif max-w-lg mx-auto leading-relaxed">
                Thank you, <span className="font-semibold text-[#1B3629]">{formData.fullName}</span>. A confirmation receipt, invoice details, and meeting matching portal link have been dispatched to <span className="font-semibold text-[#1B3629]">{formData.email}</span>.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-[#1B3629] text-white px-8 py-3 rounded-full text-sm font-semibold"
                >
                  Register Another Delegate
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1B3629] uppercase mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F2E8D7] border border-[#E0D2BC] text-sm text-[#1B3629] focus:outline-none focus:ring-2 focus:ring-[#C83B46]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#1B3629] uppercase mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F2E8D7] border border-[#E0D2BC] text-sm text-[#1B3629] focus:outline-none focus:ring-2 focus:ring-[#C83B46]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1B3629] uppercase mb-1">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F2E8D7] border border-[#E0D2BC] text-sm text-[#1B3629] focus:outline-none focus:ring-2 focus:ring-[#C83B46]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#1B3629] uppercase mb-1">Business / Organization Name</label>
                  <input
                    type="text"
                    placeholder="Enterprise or Organization"
                    value={formData.orgName}
                    onChange={e => setFormData({ ...formData, orgName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F2E8D7] border border-[#E0D2BC] text-sm text-[#1B3629] focus:outline-none focus:ring-2 focus:ring-[#C83B46]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1B3629] uppercase mb-1">Delegate Type</label>
                  <select
                    value={formData.delegateType}
                    onChange={e => setFormData({ ...formData, delegateType: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F2E8D7] border border-[#E0D2BC] text-sm text-[#1B3629]"
                  >
                    <option value="Entrepreneur / Founder">Entrepreneur / Founder</option>
                    <option value="Investor / VC / Angel">Investor / VC / Angel</option>
                    <option value="Bank / NBFC Representative">Bank / NBFC Representative</option>
                    <option value="Corporate & CSR Executive">Corporate &amp; CSR Executive</option>
                    <option value="Government & Policy Officer">Government &amp; Policy Officer</option>
                    <option value="SHG Federation Representative">SHG Federation Representative</option>
                    <option value="International Delegate">International Delegate</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1B3629] uppercase mb-1">Enterprise Stage</label>
                  <select
                    value={formData.stage}
                    onChange={e => setFormData({ ...formData, stage: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F2E8D7] border border-[#E0D2BC] text-sm text-[#1B3629]"
                  >
                    <option value="Ideation / Early Stage">Ideation / Early Stage</option>
                    <option value="Growth Stage (1-3 yrs)">Growth Stage (1-3 yrs)</option>
                    <option value="Established Enterprise (3+ yrs)">Established Enterprise (3+ yrs)</option>
                    <option value="Collective / SHG Federation">Collective / SHG Federation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1B3629] uppercase mb-1">Primary Sector</label>
                  <select
                    value={formData.sector}
                    onChange={e => setFormData({ ...formData, sector: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F2E8D7] border border-[#E0D2BC] text-sm text-[#1B3629]"
                  >
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Textiles & Handloom">Textiles &amp; Handloom</option>
                    <option value="IT & Tech">IT &amp; Tech</option>
                    <option value="Agri & Food Processing">Agri &amp; Food Processing</option>
                    <option value="Handicrafts (ODOP)">Handicrafts (ODOP)</option>
                    <option value="Healthcare & Services">Healthcare &amp; Services</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1B3629] uppercase mb-2">What are you seeking at Amaleeni Womenpreneurs 2027?</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['Capital & Funding', 'Government Schemes', 'Market & Buyer Access', 'Mentorship & Advice'].map(item => (
                    <label key={item} className="flex items-center gap-2 text-xs text-[#1B3629] cursor-pointer bg-[#F2E8D7] p-3 rounded-xl border border-[#E0D2BC]">
                      <input
                        type="checkbox"
                        checked={formData.seeking.includes(item)}
                        onChange={() => handleCheckbox(item)}
                        className="rounded text-[#C83B46] focus:ring-[#C83B46]"
                      />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-[#C83B46] hover:bg-[#A82B36] text-white py-4 rounded-full text-base font-bold transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <span>Submit Registration</span>
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          )}

        </div>
      </section>

    </div>
  );
}
