import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Sparkles, ArrowRight, Award, Building2, CheckCircle2 } from 'lucide-react';

export default function AdvisoryBoardPage() {
  useEffect(() => {
    document.title = "Advisory Board | Amaleeni Foundation Governance";
    window.scrollTo(0, 0);
  }, []);

  const boardMembers = [
    {
      name: 'Dr. Akshaya Jain',
      role: 'Founder & Convenor, Amaleeni Foundation',
      bio: "Leading Amaleeni for over ten years, working to build women's economic independence and confidence. Also an aesthetic physician and founder of Skintillatingg and the Chromocosmo Institute (CIATN).",
      img: '/assets/Akshaya Jain.jpeg',
    },
    {
      name: 'Nitinchandra Jain',
      role: 'Trustee & Strategic Advisor',
      bio: "Oversees Amaleeni's governance, holding the Foundation to the mission it set ten years ago and charting the strategic decisions that carry it forward. Brings a long-standing background in institution-building and organisational strategy to the Trust, working closely with the Founder & Convenor to keep Amaleeni's programmes aligned with its founding vision as they scale.",
      img: '/assets/Nitinchandra Jain.png',
    },
    {
      name: 'Amruta Jain',
      role: 'Trustee & Governing Member',
      bio: "Guides Amaleeni's philanthropic outreach and empowerment programmes into communities across Western and Northern India. Focuses on grassroots engagement and partner relationships, helping the Foundation's initiatives reach the women who stand to benefit most, and supports the Trust's governance as it grows its footprint year on year.",
      img: '/assets/Amruta Jain.png',
    },
  ];

  return (
    <div className="paper-texture min-h-screen pt-28 sm:pt-32 pb-20">
      
      {/* 9.1 Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1B3629]/10 text-[#1B3629] text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-[#C83B46]" />
            <span>Governance &amp; Oversight</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-extrabold text-[#1B3629]">
            Our Advisory Board
          </h1>

          <p className="text-lg sm:text-xl text-[#3D5C4A] font-serif">
            Governance and strategic direction for the Amaleeni Foundation.
          </p>
        </div>
      </section>

      {/* 9.2 Board Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {boardMembers.map((member, idx) => (
            <div key={idx} className="bg-[#FAF5EB] rounded-3xl p-8 border border-[#E5D7C3] shadow-md flex flex-col justify-between hover:shadow-xl transition-all">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-[#D49B4B] shadow-md shrink-0"
                    onError={(e) => {
                      e.currentTarget.src = "/assets/logo.png";
                    }}
                  />
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#1B3629]">{member.name}</h3>
                    <p className="text-xs text-[#C83B46] font-bold mt-1 leading-snug">{member.role}</p>
                  </div>
                </div>

                <p className="text-sm text-[#4E6B5A] font-serif leading-relaxed">
                  {member.bio}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#E5D7C3] flex items-center justify-between text-xs text-[#8A755A] font-semibold">
                <span>Governing Trustee</span>
                <CheckCircle2 className="w-4 h-4 text-[#1B3629]" />
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-[#8A755A] font-serif mt-8 italic">
          Additional advisor cards can be added here as further appointments are confirmed.
        </p>
      </section>

      {/* 9.3 Closing */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1B3629] text-white rounded-3xl p-8 sm:p-12 border border-[#2D5440] shadow-2xl text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C83B46]/20 text-[#FAF5EB] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#D49B4B]" />
            <span>Institutional Credentials</span>
          </div>

          <p className="font-serif text-lg sm:text-xl font-bold text-[#FAF5EB] max-w-2xl mx-auto leading-relaxed">
            Ten years of work with women · Recognised by NITI Aayog · CSR-Certified · Skill India–registered institute (CIATN).
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#A8C2B3] pt-2">
            <Link to="/team" className="hover:text-white font-semibold underline underline-offset-4 decoration-[#D49B4B] transition-colors">
              Meet the wider team →
            </Link>
            <span>•</span>
            <Link to="/about" className="hover:text-white font-semibold underline underline-offset-4 decoration-[#D49B4B] transition-colors">
              Read more about Amaleeni →
            </Link>
          </div>

          <div className="pt-4">
            <Link
              to="/partner"
              className="inline-flex items-center gap-2 bg-[#C83B46] hover:bg-[#A82B36] text-white px-8 py-3.5 rounded-full text-base font-bold transition-all shadow-lg hover:shadow-xl"
            >
              <span>Partner With Us</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
