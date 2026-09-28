import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Handshake, Award, FileText, ArrowRight, Building2, CheckCircle2 } from 'lucide-react';

export default function CSRPartnershipsPage() {
  useEffect(() => {
    document.title = "CSR Partnerships | Invest in Women-Led Entrepreneurship";
    window.scrollTo(0, 0);
  }, []);

  const partners = [
    {
      title: 'Suvidha Finserv Foundation',
      role: 'Training Subsidy Partner',
      desc: "Supported the 8-Day Clinical Cosmetology Training's 70% fee subsidy for 40 participants.",
    },
    {
      title: 'Nirmaan Industries CSR Cell',
      role: 'Principal Summit Partner',
      desc: 'Principal Partner for Amaleeni Womenpreneurs 2027, sponsoring the Capital Pitch Floor.',
    },
    {
      title: 'Bridge Corporate Partners',
      role: 'Vendor Integration Partner',
      desc: 'Vendor-onboarding partner connecting Pink Pages members to its supply chain.',
    },
  ];

  return (
    <div className="paper-texture min-h-screen pt-28 sm:pt-32 pb-20">
      
      {/* 15.1 Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1B3629]/10 text-[#1B3629] text-xs font-bold uppercase tracking-wider">
            <Handshake className="w-4 h-4 text-[#C83B46]" />
            <span>Corporate Impact</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-extrabold text-[#1B3629]">
            CSR Partnerships
          </h1>

          <p className="text-lg sm:text-xl text-[#3D5C4A] font-serif">
            Organisations investing in women-led entrepreneurship alongside us.
          </p>
        </div>
      </section>

      {/* 15.2 Partners Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {partners.map((p, idx) => (
            <div key={idx} className="bg-[#FAF5EB] rounded-3xl p-8 border border-[#E5D7C3] shadow-md flex flex-col justify-between hover:shadow-xl transition-all">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#1B3629] text-[#D49B4B] flex items-center justify-center mb-6">
                  <Building2 className="w-6 h-6" />
                </div>

                <span className="text-xs font-bold text-[#C83B46] uppercase tracking-wider block mb-1">
                  {p.role}
                </span>

                <h3 className="font-serif text-2xl font-bold text-[#1B3629] mb-3">
                  {p.title}
                </h3>

                <p className="text-sm text-[#4E6B5A] font-serif leading-relaxed">
                  {p.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#E5D7C3] flex items-center justify-between text-xs text-[#8A755A] font-semibold">
                <span>Schedule VII Eligible</span>
                <CheckCircle2 className="w-4 h-4 text-[#1B3629]" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 15.3 Closing & Action */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1B3629] text-white rounded-3xl p-8 sm:p-12 border border-[#2D5440] shadow-2xl text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C83B46]/20 text-[#FAF5EB] text-xs font-semibold">
            <Award className="w-3.5 h-3.5 text-[#D49B4B]" />
            <span>CSR Certified &amp; Schedule VII Compliant</span>
          </div>

          <p className="font-serif text-lg sm:text-xl font-bold text-[#FAF5EB] max-w-2xl mx-auto leading-relaxed">
            Convened by a NITI Aayog–recognised, CSR-certified foundation with ten years of work behind it. Partnerships are reportable under Schedule VII.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/partner#enquiry"
              className="w-full sm:w-auto bg-[#C83B46] hover:bg-[#A82B36] text-white px-8 py-3.5 rounded-full text-base font-bold transition-all shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2"
            >
              <span>Request the partnership deck</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="pt-2">
            <Link
              to="/partner"
              className="text-sm text-[#D49B4B] hover:text-white font-bold underline underline-offset-4 transition-colors"
            >
              See partnership tiers →
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
