import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Calendar, Users, Landmark, Building2, Globe2, HeartHandshake, Sparkles, CheckCircle2, ChevronRight, Award, Compass, Coins, ShieldCheck, Scale } from 'lucide-react';

export default function HomePage() {
  const roomCards = [
    {
      title: 'Women Entrepreneurs',
      desc: 'Founders at every stage, from self-help group enterprises to venture-funded startups.',
      icon: Users,
    },
    {
      title: 'Investors & VCs',
      desc: 'Early-stage funds, angel networks and impact investors scouting dealflow.',
      icon: Coins,
    },
    {
      title: 'Banks & NBFCs',
      desc: 'Priority-sector lending desks, Mudra and CGTMSE channels, staffed on the floor.',
      icon: Landmark,
    },
    {
      title: 'Government & Policy',
      desc: 'State and central schemes, procurement pathways, single-window clarity.',
      icon: Scale,
    },
    {
      title: 'Corporates & CSR',
      desc: 'Supply-chain inclusion, vendor onboarding, CSR partnerships.',
      icon: Building2,
    },
    {
      title: 'SHG Federations',
      desc: 'Mission Shakti federations and grassroots collectives, at scale.',
      icon: HeartHandshake,
    },
    {
      title: 'International Delegations',
      desc: 'Overseas delegates for cross-border trade and partnership.',
      icon: Globe2,
    },
  ];

  const pillars = [
    {
      id: 'capital',
      name: 'CAPITAL',
      tagline: 'Direct Access to Funding',
      bullets: [
        'Investor speed-meetings',
        'Pitch floor',
        'Bank and NBFC lending desks',
        'Grant and scheme clinics',
      ],
      icon: Coins,
    },
    {
      id: 'policy',
      name: 'POLICY',
      tagline: 'Navigating Government Frameworks',
      bullets: [
        'Scheme walkthroughs',
        'Registration and compliance help desks',
        'Direct access to officials',
        'Procurement pathways',
      ],
      icon: ShieldCheck,
    },
    {
      id: 'market',
      name: 'MARKET',
      tagline: 'Expanding Customer Horizons',
      bullets: [
        'Corporate buyer meetings',
        'Export readiness',
        'E-commerce onboarding',
        'Exhibition floor',
      ],
      icon: Building2,
    },
    {
      id: 'mentorship',
      name: 'MENTORSHIP',
      tagline: 'Expert Guidance & Follow-Through',
      bullets: [
        'One-to-one mentor sessions',
        'Sector masterclasses',
        'Peer circles',
        'Post-event follow-through',
      ],
      icon: Compass,
    },
  ];

  const marqueeSpeakers = [
    { name: 'Dr. Akshaya Jain', title: 'Founder & Convenor, Amaleeni Foundation' },
    { name: 'Nitinchandra Jain', title: 'Advisory Board / Trustee' },
    { name: 'Amruta Jain', title: 'Advisory Board / Trustee' },
    { name: 'Ashwini Kumar', title: 'Design & Communications Lead' },
    { name: 'Ramakrishna Padhy', title: 'Media & PR Lead' },
    { name: 'Priya Pawar', title: 'Core Operations' },
    { name: 'Sahil Sharma', title: 'Strategy & Outreach' },
  ];

  return (
    <div id="home" className="paper-texture min-h-screen">
      
      {/* 1.1 Hero Section - Mobile & Desktop Responsive */}
      <section className="relative min-h-[580px] sm:min-h-[680px] lg:min-h-[780px] bg-[url('/assets/background.png')] bg-cover bg-center bg-no-repeat pt-24 sm:pt-28 lg:pt-32 pb-6 lg:pb-12 flex flex-col justify-between overflow-hidden">
        
        {/* Main Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full grow flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center w-full">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-6 pt-1 pb-2 sm:pb-8 lg:pb-14 relative z-40 space-y-3 sm:space-y-4">
              
              {/* Date & Location Chip */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B3629]/10 border border-[#1B3629]/20 text-[#1B3629] text-[11px] sm:text-xs font-bold">
                <Calendar className="w-3.5 h-3.5 text-[#C83B46] shrink-0" />
                <span>12–13 March 2027</span>
                <span className="text-[#D49B4B]">•</span>
                <MapPin className="w-3.5 h-3.5 text-[#1B3629] shrink-0" />
                <span>India</span>
              </div>

              {/* Tagline & Main Headline */}
              <div className="space-y-0.5">
                <span className="block text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-[#D49B4B] font-sans">
                  From Vision to Venture
                </span>
                <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#1B3629] leading-[1.08] tracking-tight">
                  Empowered women,
                </h1>
                <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-[#C83B46] leading-[1.08] tracking-tight">
                  Stronger India
                </h2>
              </div>

              {/* Subhead Paragraph - BOLD & ENLARGED */}
              <div className="pt-1.5 space-y-2.5 text-[#1B3629] font-serif">
                <p className="text-lg sm:text-2xl lg:text-2xl font-bold text-[#1B3629] leading-snug">
                  A safe place for women. Infinite opportunities for your business.
                </p>
                <p className="text-base sm:text-lg lg:text-xl font-bold text-[#1B3629] leading-snug">
                  Amaleeni Womenpreneurs 2027 brings together women entrepreneurs face to face with investors, banks, corporates and policymakers.
                </p>
              </div>

              {/* Hero CTA Buttons - Side by Side on Mobile */}
              <div className="pt-2 pb-1 relative z-50 flex flex-row items-center gap-2.5 sm:gap-3">
                <a
                  href="https://forms.gle/aKo9HBzgCB14dvAB9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 sm:gap-2.5 bg-[#C83B46] hover:bg-[#A82B36] text-white px-4 sm:px-7 py-2.5 sm:py-3.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 shadow-lg hover:shadow-xl relative z-50 cursor-pointer border-2 border-white/20"
                >
                  <span>Register Now</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </a>

                <Link
                  to="/partner"
                  className="inline-flex items-center justify-center gap-1.5 sm:gap-2.5 bg-[#1B3629] hover:bg-[#12251C] text-white px-3.5 sm:px-6 py-2.5 sm:py-3.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 shadow-md relative z-50 cursor-pointer border-2 border-white/10"
                >
                  <span>Partner</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </Link>
              </div>

              {/* Caption Below Buttons - BOLD */}
              <p className="text-sm sm:text-base font-bold text-[#1B3629] font-serif pt-1.5">
                An initiative of the Amaleeni Foundation – ten years of work with women.
              </p>
            </div>

            {/* Hero Center/Right: Females Cutout Image - Mobile Optimized */}
            <div className="lg:col-span-6 relative flex justify-center lg:justify-center items-end h-full z-10 -mt-1 lg:mt-0">
              <div className="relative w-full max-w-xs sm:max-w-xl lg:max-w-4xl translate-y-3 sm:translate-y-6 lg:translate-y-8">
                <img
                  src="/assets/females.png"
                  alt="Empowered Professional Women"
                  className="w-full h-auto object-contain max-h-[250px] sm:max-h-[480px] lg:max-h-[680px] mx-auto filter drop-shadow-2xl origin-bottom"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Green Border Wave Overlay Layered ON TOP of females.png */}
        <div className="absolute bottom-0 left-0 right-0 w-full z-20 pointer-events-none leading-none">
          <img
            src="/assets/greenborder.png"
            alt="Green Wave Border"
            className="w-full h-auto min-h-[175px] sm:min-h-[160px] lg:min-h-[140px] object-cover object-bottom"
          />
        </div>

        {/* Bottom Feature Strip (Layered on top of greenborder.png with z-30) - 2x2 Grid on Mobile */}
        <div className="relative z-30 w-full pt-2 pb-3 sm:pb-5 px-2 sm:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-6 divide-y-0 sm:divide-x divide-[#37644D]/50">
              
              <div className="flex items-center gap-2 sm:gap-3 p-1 sm:p-0 sm:px-3 group cursor-pointer">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#1B3629]/90 border border-[#37644D] flex items-center justify-center text-[#FAF5EB] group-hover:scale-110 group-hover:text-[#C83B46] transition-all shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5 sm:w-5 sm:h-5 stroke-[1.8]" />
                </div>
                <div>
                  <h4 className="font-semibold text-[11px] sm:text-sm leading-tight text-[#FAF5EB] group-hover:text-white">
                    Safe &amp; Welcoming
                  </h4>
                  <p className="text-[9px] sm:text-[11px] text-[#A8C2B3]">Environment</p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 p-1 sm:p-0 sm:px-3 group cursor-pointer">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#1B3629]/90 border border-[#37644D] flex items-center justify-center text-[#FAF5EB] group-hover:scale-110 group-hover:text-[#C83B46] transition-all shrink-0">
                  <HeartHandshake className="w-3.5 h-3.5 sm:w-5 sm:h-5 stroke-[1.8]" />
                </div>
                <div>
                  <h4 className="font-semibold text-[11px] sm:text-sm leading-tight text-[#FAF5EB] group-hover:text-white">
                    Endless Business
                  </h4>
                  <p className="text-[9px] sm:text-[11px] text-[#A8C2B3]">Opportunities</p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 p-1 sm:p-0 sm:px-3 group cursor-pointer">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#1B3629]/90 border border-[#37644D] flex items-center justify-center text-[#FAF5EB] group-hover:scale-110 group-hover:text-[#C83B46] transition-all shrink-0">
                  <Users className="w-3.5 h-3.5 sm:w-5 sm:h-5 stroke-[1.8]" />
                </div>
                <div>
                  <h4 className="font-semibold text-[11px] sm:text-sm leading-tight text-[#FAF5EB] group-hover:text-white">
                    Women Support
                  </h4>
                  <p className="text-[9px] sm:text-[11px] text-[#A8C2B3]">Network</p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 p-1 sm:p-0 sm:px-3 group cursor-pointer">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#1B3629]/90 border border-[#37644D] flex items-center justify-center text-[#FAF5EB] group-hover:scale-110 group-hover:text-[#C83B46] transition-all shrink-0">
                  <Award className="w-3.5 h-3.5 sm:w-5 sm:h-5 stroke-[1.8]" />
                </div>
                <div>
                  <h4 className="font-semibold text-[11px] sm:text-sm leading-tight text-[#FAF5EB] group-hover:text-white">
                    Strong Ecosystem
                  </h4>
                  <p className="text-[9px] sm:text-[11px] text-[#A8C2B3]">for Growth</p>
                </div>
              </div>

            </div>
          </div>
        </div>

      </section>

      {/* 1.2 Stat Strip */}
      <section className="bg-[#1B3629] text-white py-8 border-y border-[#2D5440]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-[#2D5440]">
            <div className="pt-4 md:pt-0">
              <p className="font-serif text-3xl sm:text-4xl font-extrabold text-[#FAF5EB]">1,500+</p>
              <p className="text-xs uppercase tracking-widest text-[#A8C2B3] mt-1">Delegates</p>
            </div>
            <div className="pt-4 md:pt-0">
              <p className="font-serif text-3xl sm:text-4xl font-extrabold text-[#D49B4B]">250+</p>
              <p className="text-xs uppercase tracking-widest text-[#A8C2B3] mt-1">Investors &amp; Institutions</p>
            </div>
            <div className="pt-4 md:pt-0">
              <p className="font-serif text-3xl sm:text-4xl font-extrabold text-[#C83B46]">80+</p>
              <p className="text-xs uppercase tracking-widest text-[#A8C2B3] mt-1">Speakers</p>
            </div>
            <div className="pt-4 md:pt-0">
              <p className="font-serif text-3xl sm:text-4xl font-extrabold text-[#FAF5EB]">15+</p>
              <p className="text-xs uppercase tracking-widest text-[#A8C2B3] mt-1">Countries</p>
            </div>
          </div>
        </div>
      </section>

      {/* 1.3 The Idea */}
      <section className="py-20 bg-[#F4ECDC] border-b border-[#E8DCC8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C83B46]/10 text-[#C83B46] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>The Summit Idea</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#1B3629] leading-tight">
            Put women entrepreneurs in the room with the people who shape the business landscape.
          </h2>

          <p className="text-lg sm:text-xl text-[#3A5645] font-serif leading-relaxed">
            Amaleeni Womenpreneurs 2027 is a two-day business networking summit built on a simple premise: put women entrepreneurs in the room with the people who shape the business landscape. It aims to break down the barriers between action and intention.
          </p>

          <div className="bg-[#FAF5EB] rounded-2xl p-6 border border-[#E5D7C3] shadow-sm max-w-2xl mx-auto">
            <p className="font-serif text-lg font-bold text-[#C83B46]">
              A space for introductions, deals and real business opportunities. Not a conference of speeches.
            </p>
          </div>

          <div className="pt-4">
            <Link
              to="/programme"
              className="inline-flex items-center gap-2 bg-[#1B3629] hover:bg-[#12251C] text-white px-7 py-3 rounded-full text-base font-semibold transition-all shadow-md"
            >
              <span>View the full programme</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Video Showcase Section */}
      <section className="py-16 bg-[#1B3629] text-white border-b border-[#2D5440]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C83B46] text-white text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Summit Showcase</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#FAF5EB] leading-tight">
            Experience Amaleeni Womenpreneurs
          </h2>

          <div className="relative rounded-3xl overflow-hidden border-2 border-[#D49B4B] shadow-2xl bg-black max-w-4xl mx-auto">
            <video
              className="w-full h-auto max-h-[520px] object-cover rounded-3xl"
              controls
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              onEnded={(e) => {
                e.target.currentTime = 0;
                e.target.play();
              }}
            >
              <source src="/assets/SYU_WEB_LANDING PAGE VIDEO.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* 1.4 Who's In The Room */}
      <section className="py-20 bg-[#FAF5EB] border-b border-[#E8DCC8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#D49B4B]">
              Summit Network
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#1B3629] mt-2">
              Who's In The Room
            </h2>
            <p className="text-base text-[#4E6B5A] font-serif mt-3">
              Bringing together the complete spectrum of enterprise leaders, capital providers, and decision makers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roomCards.map((card, idx) => {
              const IconComp = card.icon;
              return (
                <div
                  key={card.title}
                  className={`paper-card rounded-3xl p-7 border border-[#E5D7C3] hover:shadow-xl transition-all duration-300 ${
                    idx === 0 ? 'md:col-span-2 lg:col-span-1 bg-[#F2E8D7]' : ''
                  }`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#1B3629] text-[#D49B4B] flex items-center justify-center mb-5">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#1B3629] mb-2">
                    {card.title}
                  </h3>
                  <p className="text-sm text-[#4E6B5A] font-serif leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-14 text-center">
            <a
              href="https://forms.gle/aKo9HBzgCB14dvAB9"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#C83B46] hover:bg-[#A82B36] text-white px-8 py-4 rounded-full text-base font-bold transition-all shadow-lg hover:shadow-xl"
            >
              <span>Register Now</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* 1.5 Pink Pages Spotlight Section */}
      <section className="py-20 bg-gradient-to-b from-[#FAF5EB] via-[#F5ECE0] to-[#FAF5EB] border-b border-[#E8DCC8] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C83B46]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D49B4B]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-gradient-to-br from-[#1B3629] via-[#162D22] to-[#0F2018] text-white rounded-3xl p-8 sm:p-12 lg:p-14 border-2 border-[#D49B4B]/40 shadow-2xl relative overflow-hidden">
            
            {/* Background watermark */}
            <div className="absolute -right-6 -bottom-8 opacity-10 pointer-events-none select-none">
              <span className="font-serif text-[180px] sm:text-[240px] font-extrabold text-[#D49B4B] leading-none">
                PP
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Details & Value Proposition */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C83B46] text-white text-xs font-bold uppercase tracking-wider shadow-sm">
                  <Sparkles className="w-4 h-4 text-[#D49B4B]" />
                  <span>Opportunity &amp; Business Directory</span>
                </div>

                <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#FAF5EB] leading-tight">
                  Pink Pages
                </h2>

                <p className="text-base sm:text-lg text-[#D9E6DF] font-serif leading-relaxed">
                  One Platform. One Network. A World of Opportunities. Amaleeni Foundation's business and opportunity directory for women entrepreneurs – built to put you in front of the people who can grow your enterprise, in India and beyond.
                </p>

                {/* Core User Highlight Callout */}
                <div className="bg-[#244735] p-5 sm:p-6 rounded-2xl border border-[#37644D] space-y-1.5 shadow-md">
                  <div className="flex items-center gap-2 text-[#D49B4B] text-xs font-bold uppercase tracking-wider">
                    <Award className="w-4 h-4" />
                    <span>Special Early Bird Summit Access</span>
                  </div>
                  <p className="font-serif text-lg sm:text-xl text-white font-semibold leading-snug">
                    "The registration for Pink Pages also gets you Early Bird access to Amaleeni Womenpreneurs 2027."
                  </p>
                </div>

                {/* Key Pillars */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#A8C2B3]">
                    <CheckCircle2 className="w-4 h-4 text-[#81C784] shrink-0" />
                    <span>State-wise &amp; Sector Directory Listing</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#A8C2B3]">
                    <CheckCircle2 className="w-4 h-4 text-[#81C784] shrink-0" />
                    <span>Investor &amp; Corporate Buyer Leads</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#A8C2B3]">
                    <CheckCircle2 className="w-4 h-4 text-[#81C784] shrink-0" />
                    <span>AW 2027 Summit Delegate Pass Included</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#A8C2B3]">
                    <CheckCircle2 className="w-4 h-4 text-[#81C784] shrink-0" />
                    <span>Verified Profile &amp; Member Portal</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Fee Card & Action Button */}
              <div className="lg:col-span-5 bg-[#FAF5EB] text-[#1B3629] rounded-3xl p-7 sm:p-9 border border-[#E0D2BC] shadow-2xl text-center space-y-6 flex flex-col justify-between">
                
                <div className="space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#7A6750] bg-[#F2E8D7] px-3.5 py-1 rounded-full border border-[#E0D2BC]">
                    Annual Membership
                  </span>
                  
                  <div className="pt-2">
                    <p className="text-xs uppercase tracking-wider font-bold text-[#7A6750]">
                      FEE:
                    </p>
                    <p className="font-serif text-5xl sm:text-6xl font-extrabold text-[#C83B46] tracking-tight">
                      ₹5,000
                    </p>
                    <p className="text-xs text-[#5A7B68] font-medium mt-1 font-serif">
                      All-Inclusive • 1 Year Directory + Summit 2027 Access
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#F2E8D7] border border-[#E0D2BC] text-xs text-[#4E6B5A] text-left space-y-2">
                  <p className="font-bold text-[#1B3629]">Included with registration:</p>
                  <ul className="space-y-1.5">
                    <li className="flex items-center gap-2">
                      <span className="text-[#C83B46] font-bold">✓</span>
                      <span>Verified Pink Pages Listing &amp; Business Profile</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#C83B46] font-bold">✓</span>
                      <span>Early Bird Access to Amaleeni Womenpreneurs 2027</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#C83B46] font-bold">✓</span>
                      <span>Direct B2B Inquiries, Investor &amp; Buyer Desks</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <Link
                    to="/pink-pages/register"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#C83B46] hover:bg-[#A82B36] text-white py-4 px-6 rounded-full text-base font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
                  >
                    <span>Register on Pink Pages</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>

                  <Link
                    to="/pink-pages"
                    className="w-full inline-flex items-center justify-center gap-1 text-xs font-bold text-[#1B3629] hover:text-[#C83B46] transition-colors py-1"
                  >
                    <span>Explore Pink Pages directory details</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>

              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 1.6 What Happens at Amaleeni (4 Pillars) */}
      <section className="py-20 bg-[#F4ECDC] border-b border-[#E8DCC8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-4xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#C83B46]">
              Four Program Tracks
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#1B3629] mt-2 mb-4">
              What Happens at Amaleeni
            </h2>
            <p className="text-lg text-[#2D4D3B] font-serif leading-relaxed italic bg-[#FAF5EB] p-6 rounded-2xl border border-[#E0D2BC]">
              "A skill to channel it. A market to prove it. A mentor to guide it. A platform to show it. Two days built around the four things a business actually needs."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div key={pillar.id} className="bg-[#FAF5EB] rounded-3xl p-8 border border-[#E5D7C3] shadow-md flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#C83B46] text-white flex items-center justify-center">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-serif text-3xl font-extrabold text-[#1B3629]">
                          {pillar.name}
                        </h3>
                        <p className="text-xs text-[#8A755A] font-semibold uppercase tracking-wider">
                          {pillar.tagline}
                        </p>
                      </div>
                    </div>

                    <ul className="mt-6 space-y-3">
                      {pillar.bullets.map((b, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-[#1B3629] font-medium">
                          <CheckCircle2 className="w-4 h-4 text-[#C83B46] shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-6 border-t border-[#E5D7C3]">
                    <Link
                      to="/programme"
                      className="text-xs font-bold text-[#1B3629] hover:text-[#C83B46] uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                    >
                      <span>Explore {pillar.name} Track Sessions</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 1.7 Speakers Marquee Strip */}
      <section className="py-16 bg-[#1B3629] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#D49B4B]">
              Distinguished Lineup
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-1">
              Speakers &amp; Mentors
            </h2>
          </div>
          <Link
            to="/team"
            className="hidden sm:inline-flex items-center gap-2 bg-[#C83B46] hover:bg-[#A82B36] text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-colors"
          >
            <span>Meet the team</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-none px-4 sm:px-8 justify-center">
          {marqueeSpeakers.map((s, idx) => (
            <div
              key={idx}
              className="shrink-0 w-72 bg-[#234533] rounded-2xl p-6 border border-[#2D5640] text-center flex flex-col items-center justify-center"
            >
              <h4 className="font-serif text-xl font-bold text-white">{s.name}</h4>
              <p className="text-xs text-[#D49B4B] font-semibold mt-1 font-serif">{s.title}</p>
            </div>
          ))}
        </div>

        <div className="text-center sm:hidden mt-6">
          <Link
            to="/team"
            className="inline-flex items-center gap-2 bg-[#C83B46] text-white px-6 py-2.5 rounded-full text-sm font-semibold"
          >
            <span>Meet the team</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 1.8 Why India */}
      <section className="py-20 bg-[#FAF5EB] border-b border-[#E8DCC8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#C83B46]">
                National Spotlight
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#1B3629]">
                Why India
              </h2>

              <p className="text-base sm:text-lg text-[#3A5645] font-serif leading-relaxed">
                India runs one of the largest women's collective movements anywhere in the world. Mission Shakti spans over 6 lakh self-help groups and roughly 70 lakh women members – an entrepreneurial base no other nation can match at this density.
              </p>

              <p className="text-base sm:text-lg text-[#3A5645] font-serif leading-relaxed">
                India has established dedicated departments and policies for women entrepreneurship. Amaleeni Womenpreneurs 2027 is built on top of that foundation, complementing nationwide efforts.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="bg-[#F2E8D7] rounded-2xl p-5 border border-[#E0D2BC] text-center">
                  <p className="font-serif text-3xl font-extrabold text-[#C83B46]">6 lakh+</p>
                  <p className="text-xs font-medium text-[#1B3629] mt-1">Self-Help Groups</p>
                </div>
                <div className="bg-[#F2E8D7] rounded-2xl p-5 border border-[#E0D2BC] text-center">
                  <p className="font-serif text-3xl font-extrabold text-[#1B3629]">70 lakh+</p>
                  <p className="text-xs font-medium text-[#1B3629] mt-1">Women Members</p>
                </div>
                <div className="bg-[#F2E8D7] rounded-2xl p-5 border border-[#E0D2BC] text-center">
                  <p className="font-serif text-3xl font-extrabold text-[#D49B4B]">Nationwide</p>
                  <p className="text-xs font-medium text-[#1B3629] mt-1">Mission Shakti Support</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#1B3629] text-white rounded-3xl p-8 border border-[#2A4E3B] shadow-xl space-y-6">
              <h3 className="font-serif text-2xl font-bold text-[#D49B4B]">
                1.9 Venue &amp; Host City
              </h3>
              <p className="text-sm text-[#A8C2B3] font-serif leading-relaxed">
                Hosted in India – seamlessly connected by air, rail, and road to major commercial centers.
              </p>

              <div className="bg-[#244735] p-5 rounded-2xl border border-[#2F5A43] space-y-2">
                <p className="text-xs uppercase tracking-wider text-[#D49B4B] font-bold">Venue Location</p>
                <p className="font-serif text-lg font-bold text-white">India</p>
              </div>

              <Link
                to="/programme#venue"
                className="inline-flex items-center gap-2 bg-[#C83B46] hover:bg-[#A82B36] text-white px-6 py-3 rounded-full text-sm font-semibold transition-colors"
              >
                <span>Venue details and map</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 1.10 Who Are We */}
      <section className="py-20 bg-[#F4ECDC] border-b border-[#E8DCC8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-8 text-center">
            
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#D49B4B]">
              Convening Body
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#1B3629]">
              Who Are We
            </h2>

            <p className="text-lg text-[#3A5645] font-serif leading-relaxed">
              Amaleeni Womenpreneurs 2027 is convened by the Amaleeni Foundation, founded by Dr. Akshaya Jain and working with women for ten years. The Foundation works from the belief that women are strong, but what's missing is the opportunity to use it – a skill, a market, a mentor, a room like this one.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="px-4 py-2 rounded-full bg-[#FAF5EB] border border-[#E2D4C0] text-xs font-bold text-[#1B3629]">
                Ten years of work
              </span>
              <span className="px-4 py-2 rounded-full bg-[#FAF5EB] border border-[#E2D4C0] text-xs font-bold text-[#C83B46]">
                Recognised by NITI Aayog
              </span>
              <span className="px-4 py-2 rounded-full bg-[#FAF5EB] border border-[#E2D4C0] text-xs font-bold text-[#D49B4B]">
                CSR-Certified
              </span>
              <span className="px-4 py-2 rounded-full bg-[#FAF5EB] border border-[#E2D4C0] text-xs font-bold text-[#1B3629]">
                Skill India–registered institute (CIATN)
              </span>
            </div>

            <div className="bg-[#FAF5EB] p-8 rounded-3xl border border-[#E5D7C3] shadow-md text-center max-w-3xl mx-auto space-y-4">
              <p className="font-serif text-xl text-[#1B3629] italic leading-relaxed">
                "I believe women have strength already within them. Our responsibility is to give them the chance to recognise it – a skill, a path to self-reliance, and the courage to begin again."
              </p>
              <p className="text-sm font-bold text-[#C83B46] uppercase tracking-wider">
                — Dr. Akshaya Jain, Founder &amp; Convenor
              </p>
            </div>

            <div>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-[#1B3629] hover:text-[#C83B46] font-bold text-base border-b-2 border-[#1B3629] pb-1 transition-colors"
              >
                <span>Read more about Amaleeni</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 1.11 Closing Band */}
      <section className="py-16 bg-[#1B3629] text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#FAF5EB] leading-tight">
            Two days. One floor. The introductions that change a business.
          </h2>

          <p className="text-sm sm:text-base text-[#D49B4B] font-serif italic">
            An initiative of the Amaleeni Foundation – awakening the strength within.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="https://forms.gle/aKo9HBzgCB14dvAB9"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-[#C83B46] hover:bg-[#A82B36] text-white px-8 py-3.5 rounded-full text-base font-bold transition-all shadow-lg text-center"
            >
              Register Now
            </a>

            <Link
              to="/partner"
              className="w-full sm:w-auto bg-transparent border-2 border-white hover:bg-white hover:text-[#1B3629] text-white px-8 py-3.5 rounded-full text-base font-bold transition-all"
            >
              Partner With Us
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
