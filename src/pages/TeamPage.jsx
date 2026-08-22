import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { UserCheck, Sparkles, Send, CheckCircle2, Globe2, Award, Compass, Coins, ShieldCheck, Building2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function TeamPage() {
  const location = useLocation();
  const [selectedTrack, setSelectedTrack] = useState('All');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [nominationType, setNominationType] = useState('speaker');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    expertise: 'Capital & Investment',
    bio: '',
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

  const speakers = [
    { name: 'Dr. Akshaya Jain', role: 'Founder & Convenor, Amaleeni Foundation', track: 'Mentorship', bio: 'Aesthetic Physician, Founder of Skintillatingg & Chromocosmo Institute (CIATN). 10+ years dedicated to women’s self-reliance.', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80' },
    { name: 'Suhani Roy', role: 'Managing Director, Horizon Capital', track: 'Capital', bio: 'Pioneer early-stage venture investor backing women-founded MSMEs and consumer tech brands.', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80' },
    { name: 'Meera Patnaik', role: 'State Director, Mission Shakti Odisha', track: 'Policy', bio: 'Leading the flagship collective initiative empowering 70 lakh women across 6 lakh self-help groups.', img: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80' },
    { name: 'Radhika Sen', role: 'Head of Global Supply Diversity, Apex Corp', track: 'Market', bio: 'Architect of inclusive corporate vendor programs connecting women producers with global retail chains.', img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80' },
    { name: 'Dr. Kavita Menon', role: 'Senior Policy Advisor, NITI Aayog', track: 'Policy', bio: 'Policy expert specializing in priority sector lending, Women Entrepreneurship Platform (WEP), and MSME incentives.', img: 'https://images.unsplash.com/photo-1598550874175-4d0ef436c909?auto=format&fit=crop&w=400&q=80' },
    { name: 'Rajesh Malhotra', role: 'Chief Credit Officer, National Small Business Bank', track: 'Capital', bio: 'Spearheading Mudra & CGTMSE collateral-free loan disbursals for first-generation women founders.', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
  ];

  const advisoryBoard = [
    { name: 'Padma Shri Dr. R. K. Mohanty', designation: 'Senior Industry Advisor & Economist', affiliation: 'Odisha State Economic Board' },
    { name: 'Shalini Tripathi', designation: 'Former Executive Director', affiliation: 'Reserve Bank of India (NABARD Division)' },
    { name: 'Prof. Ananya Das', designation: 'Dean of Entrepreneurship', affiliation: 'XIM University Bhubaneswar' },
    { name: 'Vikramjit Singh', designation: 'Partner', affiliation: 'Impact Venture Partners' },
  ];

  const organizingTeam = [
    { name: 'Dr. Akshaya Jain', role: 'Founder & Convenor, Amaleeni Foundation' },
    { name: '[Name]', role: 'Event Director' },
    { name: '[Name]', role: 'Partnerships & Sponsorship Lead' },
    { name: '[Name]', role: 'Delegate Experience Lead' },
    { name: '[Name]', role: 'Communications & Media Lead' },
    { name: '[Name]', role: 'Odisha Chapter Coordinator' },
  ];

  const filteredSpeakers = selectedTrack === 'All' ? speakers : speakers.filter(s => s.track === selectedTrack);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="paper-texture min-h-screen pt-28 sm:pt-32 pb-20">
      
      {/* 3.1 Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1B3629]/10 text-[#1B3629] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[#C83B46]" />
            <span>Summit Leadership</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-extrabold text-[#1B3629]">
            The people in the room.
          </h1>

          <p className="text-lg sm:text-xl text-[#3D5C4A] font-serif">
            The speakers, mentors and advisors shaping Amaleeni Womenpreneurs 2027.
          </p>
        </div>
      </section>

      {/* 3.2 Speakers & Mentors Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <h2 className="font-serif text-3xl font-bold text-[#1B3629]">
            Speakers &amp; Mentors Lineup
          </h2>

          {/* Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {['All', 'Capital', 'Policy', 'Market', 'Mentorship'].map(t => (
              <button
                key={t}
                onClick={() => setSelectedTrack(t)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all border ${
                  selectedTrack === t
                    ? 'bg-[#C83B46] text-white border-[#C83B46]'
                    : 'bg-[#F2E8D7] text-[#1B3629] border-[#E0D2BC] hover:bg-[#E2D4C0]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSpeakers.map((s, idx) => (
            <div key={idx} className="bg-[#FAF5EB] rounded-3xl p-7 border border-[#E5D7C3] shadow-md flex flex-col justify-between hover:shadow-xl transition-shadow">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <img src={s.img} alt={s.name} className="w-16 h-16 rounded-full object-cover border-2 border-[#D49B4B] shadow-sm" />
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#1B3629]">{s.name}</h3>
                    <p className="text-xs text-[#C83B46] font-semibold mt-0.5">{s.role}</p>
                  </div>
                </div>
                <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#1B3629]/10 text-[#1B3629] text-[10px] font-bold uppercase mb-3">
                  {s.track} Track
                </span>
                <p className="text-sm text-[#4E6B5A] font-serif leading-relaxed">
                  {s.bio}
                </p>
              </div>
              <div className="pt-4 mt-6 border-t border-[#E5D7C3] flex items-center justify-between text-xs text-[#8A755A]">
                <span>Session Leader</span>
                <Globe2 className="w-4 h-4 text-[#1B3629] hover:text-[#C83B46] cursor-pointer" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3.3 Advisory Board & Patrons */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-[#F4ECDC] rounded-3xl p-8 sm:p-12 border border-[#E8DCC8]">
          <div className="mb-8">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#D49B4B]">
              Institutional Governance
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#1B3629] mt-1">
              Advisory Board &amp; Patrons
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {advisoryBoard.map((item, i) => (
              <div key={i} className="bg-[#FAF5EB] p-6 rounded-2xl border border-[#E0D2BC]">
                <h4 className="font-serif text-lg font-bold text-[#1B3629]">{item.name}</h4>
                <p className="text-xs font-semibold text-[#C83B46] mt-1">{item.designation}</p>
                <p className="text-xs text-[#7A6750] mt-1 font-serif">{item.affiliation}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3.4 Organising Team */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="mb-8 text-center">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#C83B46]">
            Event Secretariat
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#1B3629] mt-1">
            Organising Team
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {organizingTeam.map((t, idx) => (
            <div key={idx} className="bg-[#FAF5EB] p-6 rounded-2xl border border-[#E5D7C3] flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#1B3629] text-white flex items-center justify-center font-serif font-bold">
                {idx + 1}
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold text-[#1B3629]">{t.name}</h4>
                <p className="text-xs text-[#8A755A] font-semibold">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3.5 Call to action – Form (#form) */}
      <section id="form" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1B3629] text-white rounded-3xl p-8 sm:p-12 border border-[#2D5440] shadow-2xl space-y-6">
          
          <div className="text-center space-y-3">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#D49B4B]">
              Call for Lineup Nominations
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#FAF5EB] leading-snug">
              "The woman who once needed an opportunity becomes the woman who creates one."
            </h2>
            <p className="text-base text-[#A8C2B3] font-serif max-w-2xl mx-auto">
              We are building the 2027 lineup now. Nominate a speaker, or apply to mentor on the floor.
            </p>
          </div>

          <div className="flex justify-center gap-4 pt-2">
            <button
              onClick={() => setNominationType('speaker')}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                nominationType === 'speaker' ? 'bg-[#C83B46] text-white' : 'bg-[#244735] text-[#A8C2B3] hover:text-white'
              }`}
            >
              Nominate a Speaker
            </button>
            <button
              onClick={() => setNominationType('mentor')}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                nominationType === 'mentor' ? 'bg-[#C83B46] text-white' : 'bg-[#244735] text-[#A8C2B3] hover:text-white'
              }`}
            >
              Apply to Mentor
            </button>
          </div>

          {formSubmitted ? (
            <div className="bg-[#244735] p-8 rounded-2xl text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-[#D49B4B] mx-auto" />
              <h3 className="font-serif text-2xl font-bold text-white">Nomination Received!</h3>
              <p className="text-sm text-[#A8C2B3] font-serif">
                Thank you for contributing to Amaleeni Womenpreneurs 2027. Our Secretariat will review your application.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  placeholder="Full Name *"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="px-4 py-3 rounded-xl bg-[#244735] border border-[#345E47] text-white placeholder-gray-400 text-sm focus:outline-none focus:border-[#C83B46]"
                />
                <input
                  type="email"
                  required
                  placeholder="Email Address *"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="px-4 py-3 rounded-xl bg-[#244735] border border-[#345E47] text-white placeholder-gray-400 text-sm focus:outline-none focus:border-[#C83B46]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="px-4 py-3 rounded-xl bg-[#244735] border border-[#345E47] text-white placeholder-gray-400 text-sm focus:outline-none focus:border-[#C83B46]"
                />
                <input
                  type="text"
                  placeholder="Organization / Company"
                  value={formData.organization}
                  onChange={e => setFormData({ ...formData, organization: e.target.value })}
                  className="px-4 py-3 rounded-xl bg-[#244735] border border-[#345E47] text-white placeholder-gray-400 text-sm focus:outline-none focus:border-[#C83B46]"
                />
              </div>

              <textarea
                rows={3}
                required
                placeholder="Brief bio or topic proposal..."
                value={formData.bio}
                onChange={e => setFormData({ ...formData, bio: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#244735] border border-[#345E47] text-white placeholder-gray-400 text-sm focus:outline-none focus:border-[#C83B46]"
              ></textarea>

              <button
                type="submit"
                className="w-full bg-[#C83B46] hover:bg-[#A82B36] text-white py-3.5 rounded-full text-base font-bold transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Submit Nomination</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}

        </div>
      </section>

    </div>
  );
}
