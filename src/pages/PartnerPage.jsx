import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Send, CheckCircle2, Sparkles, Building2, ShieldCheck, Target, HeartHandshake, FileText, Globe2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PartnerPage() {
  const location = useLocation();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    orgName: '',
    contactName: '',
    email: '',
    phone: '',
    partnerTier: 'Principal Partner',
    message: '',
  });

  useEffect(() => {
    if (location.hash === '#enquiry') {
      const el = document.getElementById('enquiry');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  const whyPartnerPoints = [
    { title: 'Reach', desc: 'Delegates across 15+ states and 15+ countries, in one place.', icon: Globe2 },
    { title: 'CSR Alignment', desc: 'Women’s economic empowerment, skill development and livelihood generation, all reportable under Schedule VII.', icon: ShieldCheck },
    { title: 'Supply Chain', desc: 'Direct access to women-led vendors for procurement and supplier diversity targets.', icon: Building2 },
    { title: 'Government Proximity', desc: 'State and central officials present across both days.', icon: Target },
    { title: 'Track Record', desc: 'Convened by a NITI Aayog–recognised, CSR-certified foundation with ten years of work behind it.', icon: AwardIcon },
  ];

  function AwardIcon(props) {
    return <Sparkles {...props} />;
  }

  const tiers = [
    { title: 'Principal Partner', level: '[Investment Level]', benefits: ['Prominent branding across all mainstage sessions & press collateral', 'VIP access to state government roundtable', 'Curated meeting matchmaking with top delegates'] },
    { title: 'Capital Track Sponsor', level: '[Investment Level]', benefits: ['Exclusive naming rights for Capital Pitch Floor & Bank Desks', 'Direct access to startup dealflow & founder pitch decks', 'Dedicated keynote spot'] },
    { title: 'Policy Track Sponsor', level: '[Investment Level]', benefits: ['Branding across Single-Window Policy Helpdesks', 'Inclusion in policy walkthrough sessions', 'Official report co-branding'] },
    { title: 'Market Track Sponsor', level: '[Investment Level]', benefits: ['Corporate buyer booth & vendor onboarding lounge', 'Logo on export & e-commerce workshop collateral', 'Exhibition floor priority placement'] },
    { title: 'Mentorship Track Sponsor', level: '[Investment Level]', benefits: ['Branding across 1-on-1 Mentorship Circles & Masterclasses', 'Right to nominate mentors', 'Post-event follow-through tracking'] },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="paper-texture min-h-screen pt-28 sm:pt-32 pb-20">
      
      {/* 6.1 Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1B3629]/10 text-[#1B3629] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[#C83B46]" />
            <span>Corporate &amp; CSR Strategic Partnerships</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-extrabold text-[#1B3629] leading-tight">
            Put your CSR where the entrepreneurs are.
          </h1>

          <p className="text-lg sm:text-xl text-[#3D5C4A] font-serif leading-relaxed max-w-3xl mx-auto">
            Amaleeni Womenpreneurs 2027 puts your brand in front of thousands of women entrepreneurs and the investors, banks and institutions backing them.
          </p>

          <div className="pt-2">
            <a
              href="#enquiry"
              className="inline-flex items-center gap-2 bg-[#C83B46] hover:bg-[#A82B36] text-white px-8 py-4 rounded-full text-base font-bold transition-all shadow-lg"
            >
              <span>Request the partnership deck</span>
              <FileText className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 6.2 Why Partner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#D49B4B]">Strategic Value</span>
          <h2 className="font-serif text-4xl font-bold text-[#1B3629] mt-1">Why Partner With Amaleeni</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {whyPartnerPoints.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div key={idx} className="bg-[#FAF5EB] rounded-3xl p-7 border border-[#E5D7C3] shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-[#1B3629] text-[#D49B4B] flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#1B3629] mb-2">{p.title}</h3>
                <p className="text-sm text-[#4E6B5A] font-serif leading-relaxed">{p.desc}</p>
              </div>
            );
          })}
        </div>

        {/* 6.2b What you are actually funding */}
        <div className="bg-[#1B3629] text-white rounded-3xl p-8 sm:p-12 border border-[#2B4E3B] shadow-xl space-y-4 max-w-4xl mx-auto text-center">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF5EB]">
            What You Are Actually Funding
          </h3>
          <p className="text-base sm:text-lg text-[#A8C2B3] font-serif leading-relaxed">
            Amaleeni is set out to recognise the capability of women – in businesses already running, products already selling, collectives already organised. What's missing is access: to capital, to buyers, to policy, and to the people who hold those.
          </p>
          <p className="text-base sm:text-lg font-semibold text-[#D49B4B] font-serif italic pt-2">
            A partnership with Amaleeni funds the shortest route between a woman who is building something and looking for a way to reach the broader market.
          </p>
        </div>
      </section>

      {/* 6.3 Partnership Tiers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#C83B46]">Sponsorship Packages</span>
          <h2 className="font-serif text-7xl font-bold text-[#1B3629] mt-1">Partnership Tiers</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tiers.map((t, idx) => (
            <div key={idx} className="bg-[#FAF5EB] rounded-3xl p-8 border border-[#E5D7C3] shadow-md flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-[#C83B46] uppercase tracking-wider">{t.level}</span>
                <h3 className="font-serif text-2xl font-bold text-[#1B3629] mt-1 mb-4">{t.title}</h3>
                <ul className="space-y-3">
                  {t.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-[#4E6B5A] font-serif">
                      <CheckCircle2 className="w-4 h-4 text-[#C83B46] shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="#enquiry"
                className="mt-8 w-full bg-[#1B3629] hover:bg-[#C83B46] text-white py-3 rounded-full text-sm font-bold text-center transition-colors"
              >
                Inquire for Tier
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* 6.4 Enquiry Form (#enquiry) */}
      <section id="enquiry" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF5EB] rounded-3xl p-8 sm:p-12 border border-[#E5D7C3] shadow-2xl space-y-6">
          <div className="text-center space-y-2 border-b border-[#E5D7C3] pb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C83B46]">Corporate Partnership Inquiry</span>
            <h2 className="font-serif text-3xl font-bold text-[#1B3629]">Request Partnership Deck</h2>
            <p className="text-xs text-[#7A6750] font-serif">Our Secretariat will share the detailed deck and Schedule VII compliance documentation.</p>
          </div>

          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <CheckCircle2 className="w-16 h-16 text-[#D49B4B] mx-auto" />
              <h3 className="font-serif text-3xl font-bold text-[#1B3629]">Partnership Inquiry Received!</h3>
              <p className="text-base text-[#4E6B5A] font-serif max-w-md mx-auto">
                Thank you for your interest. Our Partnership Lead will reach out to <span className="font-semibold text-[#1B3629]">{formData.email}</span>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  placeholder="Organization / Company Name *"
                  value={formData.orgName}
                  onChange={e => setFormData({ ...formData, orgName: e.target.value })}
                  className="px-4 py-3 rounded-xl bg-[#F2E8D7] border border-[#E0D2BC] text-sm text-[#1B3629] focus:outline-none focus:ring-2 focus:ring-[#C83B46]"
                />
                <input
                  type="text"
                  required
                  placeholder="Contact Person Name *"
                  value={formData.contactName}
                  onChange={e => setFormData({ ...formData, contactName: e.target.value })}
                  className="px-4 py-3 rounded-xl bg-[#F2E8D7] border border-[#E0D2BC] text-sm text-[#1B3629] focus:outline-none focus:ring-2 focus:ring-[#C83B46]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="email"
                  required
                  placeholder="Official Email Address *"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="px-4 py-3 rounded-xl bg-[#F2E8D7] border border-[#E0D2BC] text-sm text-[#1B3629] focus:outline-none focus:ring-2 focus:ring-[#C83B46]"
                />
                <input
                  type="tel"
                  placeholder="Contact Phone Number"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="px-4 py-3 rounded-xl bg-[#F2E8D7] border border-[#E0D2BC] text-sm text-[#1B3629] focus:outline-none focus:ring-2 focus:ring-[#C83B46]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1B3629] uppercase mb-1">Partnership Interest Tier</label>
                <select
                  value={formData.partnerTier}
                  onChange={e => setFormData({ ...formData, partnerTier: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#F2E8D7] border border-[#E0D2BC] text-sm text-[#1B3629]"
                >
                  <option value="Principal Partner">Principal Partner</option>
                  <option value="Capital Track Sponsor">Capital Track Sponsor</option>
                  <option value="Policy Track Sponsor">Policy Track Sponsor</option>
                  <option value="Market Track Sponsor">Market Track Sponsor</option>
                  <option value="Mentorship Track Sponsor">Mentorship Track Sponsor</option>
                  <option value="General CSR Partner">General CSR Partner</option>
                </select>
              </div>

              <textarea
                rows={3}
                placeholder="Message or specific partnership goals..."
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#F2E8D7] border border-[#E0D2BC] text-sm text-[#1B3629]"
              ></textarea>

              <button
                type="submit"
                className="w-full bg-[#C83B46] hover:bg-[#A82B36] text-white py-4 rounded-full text-base font-bold transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <span>Submit Inquiry</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </section>

    </div>
  );
}
