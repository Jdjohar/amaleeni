import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Sparkles,
  Send,
  CheckCircle2,
  Globe2,
  Layers,
  ArrowRight,
  User
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function TeamPage() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'leadership', 'secretariat', 'table'
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

  // Exact Roster from Amaleeni Secretariat Table with Added Member Photos
  const officialRoster = [
    {
      name: 'Dr. Akshaya Jain',
      role: 'Founder & Convenor, Amaleeni Foundation',
      category: 'Leadership',
      bio: 'Aesthetic Physician, Founder of Skintillatingg & Chromocosmo Institute (CIATN). 10+ years dedicated to women’s economic self-reliance and community empowerment.',
      status: 'Confirmed',
      image: '/assets/Akshaya Jain.jpeg',
    },
    {
      name: 'Nitinchandra Jain',
      role: 'Trustee & Strategic Advisor',
      category: 'Leadership',
      bio: 'Advising on institutional governance, strategic alignment, and long-term organizational initiatives of Amaleeni Foundation.',
      status: 'Confirmed',
      image: '/assets/Nitinchandra Jain.png',
    },
    {
      name: 'Amruta Jain',
      role: 'Trustee & Governing Member',
      category: 'Leadership',
      bio: 'Guiding philanthropic outreach, community coordination, and empowerment programs across Western and Northern India.',
      status: 'Confirmed',
      image: '/assets/Amruta Jain.png',
    },
    {
      name: 'Priya Pawar',
      role: 'Core Management & Operations',
      category: 'Leadership',
      bio: 'Coordinating floor operations, institutional logistics, and delegate stakeholder engagement for the summit.',
      status: 'Confirmed',
      image: '/assets/Priya Pawar.jpeg',
    },
    {
      name: 'Sahil Sharma',
      role: 'Strategy & Technology Outreach',
      category: 'Leadership',
      bio: 'Managing digital architecture, portal operations, and ecosystem engagement for Amaleeni Womenpreneurs 2027.',
      status: 'Confirmed',
      image: '/assets/Sahil Sharma.png',
    },
    {
      name: 'Ashwini Kumar',
      role: 'Design & Communications Lead',
      category: 'Secretariat',
      bio: 'Directing summit visual identity, brand communications, creative digital media, and attendee storytelling.',
      status: 'Confirmed',
      image: '/assets/Aswini-Kumar.png',
    },
    {
      name: 'Ramakrishna Padhy',
      role: 'Media & PR Lead',
      category: 'Secretariat',
      bio: 'Steering national press relations, media alliances, broadcast channels, and global summit publicity.',
      status: 'Confirmed',
      image: '/assets/RAMAKRISHNA.png',
    },
  ];

  const filteredTeam =
    activeTab === 'all'
      ? officialRoster
      : activeTab === 'leadership'
      ? officialRoster.filter((m) => m.category === 'Leadership')
      : activeTab === 'secretariat'
      ? officialRoster.filter((m) => m.category === 'Secretariat')
      : officialRoster;

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
      
      {/* 3.1 Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1B3629]/10 text-[#1B3629] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[#C83B46]" />
            <span>Summit Organization &amp; Leadership</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-extrabold text-[#1B3629]">
            The Team Behind Amaleeni
          </h1>

          <p className="text-lg sm:text-xl text-[#3D5C4A] font-serif">
            The foundation leadership, advisors, and secretariat leads shaping Amaleeni Womenpreneurs 2027.
          </p>
        </div>
      </section>

      {/* Navigation Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 bg-[#FAF5EB] p-2 rounded-2xl border border-[#E5D7C3] max-w-2xl mx-auto shadow-sm">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-[#1B3629] text-white shadow-md'
                : 'text-[#1B3629] hover:bg-[#F2E8D7]'
            }`}
          >
            All Members ({officialRoster.length})
          </button>
          
          <button
            onClick={() => setActiveTab('leadership')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'leadership'
                ? 'bg-[#1B3629] text-white shadow-md'
                : 'text-[#1B3629] hover:bg-[#F2E8D7]'
            }`}
          >
            Leadership &amp; Trustees (5)
          </button>

          <button
            onClick={() => setActiveTab('secretariat')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'secretariat'
                ? 'bg-[#1B3629] text-white shadow-md'
                : 'text-[#1B3629] hover:bg-[#F2E8D7]'
            }`}
          >
            Secretariat &amp; Leads (6)
          </button>

          <button
            onClick={() => setActiveTab('table')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'table'
                ? 'bg-[#C83B46] text-white shadow-md'
                : 'text-[#C83B46] hover:bg-[#F2E8D7]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Official Roster Table</span>
          </button>
        </div>
      </section>

      {/* 3.2 Official Roster Table View (Matches image directly) */}
      {activeTab === 'table' ? (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 animate-fadeIn">
          <div className="bg-[#FAF5EB] rounded-3xl border-2 border-[#E5D7C3] shadow-xl overflow-hidden">
            <div className="bg-[#1B3629] text-white px-6 sm:px-8 py-5 flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold">
                  Official Team Roster
                </h3>
                <p className="text-xs text-[#A8C2B3] mt-0.5">
                  Amaleeni Foundation • Summit Organization Directory
                </p>
              </div>
              <span className="text-xs bg-[#FAF5EB]/10 border border-[#FAF5EB]/20 text-[#FAF5EB] px-3 py-1 rounded-full">
                11 Positions
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F2E8D7] border-b border-[#E0D2BC] text-xs font-bold uppercase tracking-wider text-[#1B3629]">
                    <th className="py-4 px-6 sm:px-8 w-1/3">Name</th>
                    <th className="py-4 px-6 sm:px-8">Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAE0D0] text-sm text-[#1B3629]">
                  {officialRoster.map((item, idx) => (
                    <tr
                      key={idx}
                      className={`hover:bg-[#F7EFE1] transition-colors ${
                        item.name === '[Name]' ? 'bg-[#FAF5EB]/60' : ''
                      }`}
                    >
                      <td className="py-4 px-6 sm:px-8 font-serif font-bold text-base">
                        <div className="flex items-center gap-3">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-10 h-10 rounded-full object-cover object-top border border-[#D49B4B] shadow-sm shrink-0 bg-[#EAE0D0]"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-[#EAE0D0] border border-dashed border-[#D9C7AF] flex items-center justify-center shrink-0 text-[#7A6750]">
                              <User className="w-5 h-5 opacity-40" />
                            </div>
                          )}
                          <span>
                            {item.name === '[Name]' ? (
                              <span className="font-mono text-[#7A6750] font-normal bg-[#EAE0D0] px-2 py-0.5 rounded text-xs">
                                [Appointment in Progress]
                              </span>
                            ) : (
                              item.name
                            )}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6 sm:px-8 text-[#3D5C4A] font-medium">
                        {item.role || <span className="text-[#8A755A] italic">Trustee / Member</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-6 bg-[#F2E8D7] border-t border-[#E0D2BC] text-xs text-[#7A6750] flex flex-col sm:flex-row items-center justify-between gap-3">
              <span>Looking to join the secretariat or coordinate your state chapter?</span>
              <a
                href="#form"
                className="inline-flex items-center gap-1 text-[#C83B46] font-bold hover:underline"
              >
                <span>Apply below</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </section>
      ) : (
        /* 3.3 Cards Grid View */
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTeam.map((member, idx) => (
              <div
                key={idx}
                className={`bg-[#FAF5EB] rounded-3xl p-6 sm:p-7 border transition-all duration-300 flex flex-col justify-between hover:shadow-xl ${
                  member.name === 'Dr. Akshaya Jain'
                    ? 'border-2 border-[#C83B46] shadow-md bg-gradient-to-b from-[#FAF5EB] to-[#F5EDE1]'
                    : member.name === '[Name]'
                    ? 'border-dashed border-[#D9C7AF] opacity-90'
                    : 'border-[#E5D7C3] shadow-md hover:border-[#1B3629]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                        member.category === 'Leadership'
                          ? 'bg-[#1B3629] text-[#D49B4B]'
                          : 'bg-[#C83B46]/10 text-[#C83B46]'
                      }`}
                    >
                      {member.category}
                    </span>

                    <span className="text-[10px] font-bold text-[#7A6750]">
                      {member.status}
                    </span>
                  </div>

                  {/* Member Photo */}
                  {member.image ? (
                    <div className="relative mb-4 overflow-hidden rounded-2xl border-2 border-[#D49B4B]/30 shadow-sm bg-[#F2E8D7] aspect-[4/3] w-full group">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  ) : member.name === '[Name]' ? (
                    <div className="relative mb-4 overflow-hidden rounded-2xl border-2 border-dashed border-[#D9C7AF] bg-[#F2E8D7]/40 aspect-[4/3] w-full flex flex-col items-center justify-center text-[#7A6750] gap-1.5">
                      <User className="w-9 h-9 opacity-30 text-[#1B3629]" />
                      <span className="text-xs font-mono text-[#8A755A] font-semibold">[Appointment Open]</span>
                    </div>
                  ) : null}

                  <h3 className="font-serif text-2xl font-bold text-[#1B3629]">
                    {member.name === '[Name]' ? (
                      <span className="text-[#8A755A] font-sans text-lg font-semibold italic">
                        [Appointment in Progress]
                      </span>
                    ) : (
                      member.name
                    )}
                  </h3>

                  <p className="text-xs font-bold text-[#C83B46] mt-1">
                    {member.role || 'Trustee & Council Member'}
                  </p>

                  <p className="text-xs sm:text-sm text-[#4E6B5A] font-serif leading-relaxed mt-3">
                    {member.bio}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-[#E5D7C3] flex items-center justify-between text-xs text-[#8A755A]">
                  <span className="font-medium">Amaleeni Foundation</span>
                  <Globe2 className="w-4 h-4 text-[#1B3629]" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => setActiveTab('table')}
              className="inline-flex items-center gap-2 bg-[#F2E8D7] hover:bg-[#E5D7C3] text-[#1B3629] px-6 py-2.5 rounded-full text-xs font-bold border border-[#D9C7AF] transition-colors cursor-pointer"
            >
              <Layers className="w-4 h-4 text-[#C83B46]" />
              <span>Switch to Official Roster Table View</span>
            </button>
          </div>
        </section>
      )}

      {/* 3.5 Call to action – Form (#form) */}
      <section id="form" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1B3629] text-white rounded-3xl p-8 sm:p-12 border border-[#2D5440] shadow-2xl space-y-6">
          
          <div className="text-center space-y-3">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#D49B4B]">
              Call for Lineup Nominations &amp; Leads
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#FAF5EB] leading-snug">
              "The woman who once needed an opportunity becomes the woman who creates one."
            </h2>
            <p className="text-base text-[#A8C2B3] font-serif max-w-2xl mx-auto">
              We are building the 2027 lineup and secretariat now. Nominate a speaker, apply to mentor, or volunteer for secretariat lead positions.
            </p>
          </div>

          <div className="flex justify-center gap-4 pt-2">
            <button
              onClick={() => setNominationType('speaker')}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all cursor-pointer ${
                nominationType === 'speaker' ? 'bg-[#C83B46] text-white' : 'bg-[#244735] text-[#A8C2B3] hover:text-white'
              }`}
            >
              Nominate a Speaker
            </button>
            <button
              onClick={() => setNominationType('mentor')}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all cursor-pointer ${
                nominationType === 'mentor' ? 'bg-[#C83B46] text-white' : 'bg-[#244735] text-[#A8C2B3] hover:text-white'
              }`}
            >
              Apply to Mentor / Lead
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
                placeholder="Brief bio or role/topic proposal..."
                value={formData.bio}
                onChange={e => setFormData({ ...formData, bio: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#244735] border border-[#345E47] text-white placeholder-gray-400 text-sm focus:outline-none focus:border-[#C83B46]"
              ></textarea>

              <button
                type="submit"
                className="w-full bg-[#C83B46] hover:bg-[#A82B36] text-white py-3.5 rounded-full text-base font-bold transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
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
