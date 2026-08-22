import React, { useState } from 'react';
import { ShieldCheck, Award, Zap, Building, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';

export default function AboutUP({ onOpenContact }) {
  const [activeTab, setActiveTab] = useState(0);

  const highlights = [
    {
      icon: ShieldCheck,
      title: 'Safety & 24/7 Security Framework',
      subtitle: 'Safe Cities Initiative & Dedicated Women Helpline',
      description:
        'Uttar Pradesh has pioneered state-wide safety infrastructure for women professionals including Safe City projects, Pink Police Outposts, dedicated transport corridors, and instant emergency response networks.',
      stats: '100% District Safety Coverage',
      points: [
        'Dedicated Mission Shakti 4.0 programs in all industrial zones',
        '24/7 Pink Patrols and safe workplace compliance audits',
        'Express grievance redressal for women entrepreneurs',
      ],
    },
    {
      icon: Award,
      title: 'Women Entrepreneurship Subsidies',
      subtitle: 'Financial Grants & 100% Stamp Duty Waivers',
      description:
        'Under the UP Women Entrepreneurship Policy, registered women-led MSMEs enjoy up to 100% stamp duty exemption, capital interest subsidies up to 25%, and direct seed funding access.',
      stats: '₹5,000 Cr Allocated Fund',
      points: [
        '100% Stamp duty exemption on land purchase for factories',
        'Capital subsidy of 20-25% for first-generation founders',
        'Collateral-free credit guarantee coverage up to ₹5 Crores',
      ],
    },
    {
      icon: Zap,
      title: 'Nivesh Mitra Single Window Portal',
      subtitle: 'Fast-Track Digital Clearance in 15 Days',
      description:
        'Experience seamless business setup with Uttar Pradesh’s unified digital portal. Obtain NOCs, environmental clearances, power connections, and GST registrations with zero physical hassle.',
      stats: '15-Day SLA Clearance',
      points: [
        'Over 400+ government services integrated into 1 login',
        'Dedicated Relationship Managers assigned to women founders',
        'Transparent digital tracking & automated approvals',
      ],
    },
    {
      icon: Building,
      title: 'World-Class Industrial Infrastructure',
      subtitle: 'Expressways, Defense Corridors & Women Parks',
      description:
        'UP boasts India’s largest network of expressways, upcoming Noida International Airport, dedicated Women IT Parks in Lucknow and Noida, and plug-and-play manufacturing hubs.',
      stats: '6 International Corridors',
      points: [
        'Dedicated Women’s Industrial Parks with daycare & health clinics',
        'Strategic connectivity to Delhi-NCR and Mumbai ports',
        'Subsidized power tariffs for eco-friendly manufacturing units',
      ],
    },
  ];

  return (
    <section id="about-up" className="py-20 bg-[#F4ECDC] relative overflow-hidden border-t border-[#E8DCC8]">
      {/* Decorative subtle background circle */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D49B4B]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1B3629]/10 text-[#1B3629] text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4 text-[#C83B46]" />
            <span>Empowering Women Enterprise in UP</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#1B3629] leading-tight">
            Why Uttar Pradesh is India’s Top Destination for Women Founders
          </h2>
          <p className="mt-4 text-lg text-[#4A6454] font-serif">
            A state transformed by progressive policies, bulletproof security, world-class infrastructure, and infinite growth avenues for women entrepreneurs.
          </p>
        </div>

        {/* Impact Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-16">
          <div className="paper-card rounded-2xl p-6 text-center border border-[#E0D2BC]">
            <p className="font-serif text-4xl sm:text-5xl font-bold text-[#C83B46]">50,000+</p>
            <p className="text-sm font-medium text-[#1B3629] mt-2">Women-Led MSMEs Registered</p>
          </div>
          <div className="paper-card rounded-2xl p-6 text-center border border-[#E0D2BC]">
            <p className="font-serif text-4xl sm:text-5xl font-bold text-[#1B3629]">100%</p>
            <p className="text-sm font-medium text-[#1B3629] mt-2">Stamp Duty Exemption</p>
          </div>
          <div className="paper-card rounded-2xl p-6 text-center border border-[#E0D2BC]">
            <p className="font-serif text-4xl sm:text-5xl font-bold text-[#D49B4B]">75</p>
            <p className="text-sm font-medium text-[#1B3629] mt-2">Districts with Mission Shakti Units</p>
          </div>
          <div className="paper-card rounded-2xl p-6 text-center border border-[#E0D2BC]">
            <p className="font-serif text-4xl sm:text-5xl font-bold text-[#C83B46]">₹10,000 Cr+</p>
            <p className="text-sm font-medium text-[#1B3629] mt-2">Direct Investments Facilitated</p>
          </div>
        </div>

        {/* Tab Navigation & Detailed Feature View */}
        <div className="bg-[#FAF5EB] rounded-3xl p-6 sm:p-10 border border-[#E5D7C3] shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Tabs List */}
            <div className="lg:col-span-5 space-y-3">
              {highlights.map((item, idx) => {
                const IconComponent = item.icon;
                const isSelected = activeTab === idx;
                return (
                  <button
                    key={item.title}
                    onClick={() => setActiveTab(idx)}
                    className={`w-full text-left p-5 rounded-2xl transition-all duration-300 flex items-center justify-between border ${
                      isSelected
                        ? 'bg-[#1B3629] text-white border-[#1B3629] shadow-md translate-x-2'
                        : 'bg-[#F2E8D7] text-[#1B3629] border-[#E2D4BF] hover:bg-[#EAE0CD]'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          isSelected ? 'bg-[#C83B46] text-white' : 'bg-[#1B3629]/10 text-[#1B3629]'
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-base leading-snug">{item.title}</h4>
                        <p className={`text-xs ${isSelected ? 'text-[#B8D4C4]' : 'text-[#5C7867]'}`}>
                          {item.stats}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className={`w-5 h-5 ${isSelected ? 'text-[#D49B4B]' : 'text-[#8AA896]'}`} />
                  </button>
                );
              })}
            </div>

            {/* Right Detailed Tab Content */}
            <div className="lg:col-span-7 bg-[#F4ECDC] p-6 sm:p-8 rounded-2xl border border-[#E2D4BF]">
              <div className="inline-block px-3 py-1 rounded-md bg-[#C83B46]/10 text-[#C83B46] text-xs font-bold uppercase tracking-wider mb-3">
                {highlights[activeTab].subtitle}
              </div>
              
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1B3629]">
                {highlights[activeTab].title}
              </h3>
              
              <p className="mt-4 text-[#3D5A49] leading-relaxed font-serif text-base sm:text-lg">
                {highlights[activeTab].description}
              </p>

              <div className="mt-6 space-y-3">
                {highlights[activeTab].points.map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#C83B46] shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-[#1B3629] font-medium">{point}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-[#E0D2BC] flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs font-bold text-[#8A755A] uppercase tracking-widest">
                  Key Initiative &bull; Mission Shakti
                </span>
                <button
                  onClick={onOpenContact}
                  className="w-full sm:w-auto bg-[#1B3629] hover:bg-[#12251C] text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <span>Apply for UP Incentive Scheme</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
