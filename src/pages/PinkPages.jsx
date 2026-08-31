import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  Globe2,
  Building2,
  Users,
  Compass,
  Coins,
  Briefcase,
  GraduationCap,
  HeartPulse,
  ShoppingBag,
  Zap,
  Truck,
  Scale,
  Palette,
  Dumbbell,
  Microscope,
  Heart,
  Landmark,
  Layers,
  Award,
  CheckCircle2,
  TrendingUp,
  Cpu,
  Search,
  MessageSquare
} from 'lucide-react';

export default function PinkPages({ onOpenContact }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 2.2 What is Pink Pages - 6 Pillars
  const pillars = [
    {
      title: 'Business Directory',
      desc: 'A structured profile of you and your enterprise.',
      icon: Building2,
      tag: 'Structured Profile',
    },
    {
      title: 'Sector Network',
      desc: 'Grouped by industry and professional expertise.',
      icon: Layers,
      tag: '18+ Verticals',
    },
    {
      title: 'Opportunity Engine',
      desc: 'Summits, trade missions, investments and partnerships.',
      icon: TrendingUp,
      tag: 'High-Impact Matches',
    },
    {
      title: 'Global Connect',
      desc: 'International buyers, investors, chambers and networks.',
      icon: Globe2,
      tag: 'Cross-Border Access',
    },
    {
      title: 'Visibility Platform',
      desc: 'A profile that helps you be discovered.',
      icon: Sparkles,
      tag: 'Searchable & Ranked',
    },
    {
      title: 'Community',
      desc: 'Peer-to-peer introductions, mentorship and collaboration.',
      icon: Users,
      tag: 'Founder Circles',
    },
  ];

  // 2.3 Who is Pink Pages for - 6 Audiences
  const targetProfiles = [
    {
      title: 'Entrepreneurs',
      desc: 'Founders, co-founders and women-led businesses.',
      icon: Briefcase,
      badge: 'Founders & Co-founders',
    },
    {
      title: 'MSME & Industry Leaders',
      desc: 'Manufacturers, exporters and industrial enterprises.',
      icon: Building2,
      badge: 'Manufacturing & Scale',
    },
    {
      title: 'Professionals',
      desc: 'Doctors, lawyers, consultants, architects, engineers and experts.',
      icon: Award,
      badge: 'Practice & Advisory',
    },
    {
      title: 'Investors',
      desc: 'Angel investors, family offices and women exploring investment.',
      icon: Coins,
      badge: 'Capital & Angel Networks',
    },
    {
      title: 'Startups & Innovators',
      desc: 'Technology, innovation and emerging businesses.',
      icon: Cpu,
      badge: 'Tech & High-Growth',
    },
    {
      title: 'Creators & Leaders',
      desc: 'Artists, authors, media, influencers and community leaders.',
      icon: Palette,
      badge: 'Culture & Impact',
    },
  ];

  // 2.4 Every sector, one directory - 18 Sectors
  const sectors = [
    { name: 'Agriculture & Agri-Business', icon: Heart },
    { name: 'Manufacturing & Engineering', icon: Building2 },
    { name: 'Technology & Digital', icon: Cpu },
    { name: 'Healthcare & Life Sciences', icon: HeartPulse },
    { name: 'Beauty, Aesthetics & Wellness', icon: Sparkles },
    { name: 'Education & Skill Development', icon: GraduationCap },
    { name: 'Finance & Investment', icon: Coins },
    { name: 'Fashion, Textiles & Lifestyle', icon: ShoppingBag },
    { name: 'Food, Hospitality & Tourism', icon: Compass },
    { name: 'Infrastructure & Real Estate', icon: Building2 },
    { name: 'Energy & Sustainability', icon: Zap },
    { name: 'Logistics & Supply Chain', icon: Truck },
    { name: 'Legal, Consulting & Professional Services', icon: Scale },
    { name: 'Media, Arts & Creative Industries', icon: Palette },
    { name: 'Sports & Fitness', icon: Dumbbell },
    { name: 'Science, Research & Innovation', icon: Microscope },
    { name: 'Social Impact & Development', icon: Users },
    { name: 'Public Leadership & Institutions', icon: Landmark },
  ];

  // 2.5 How it works - 4 Steps
  const howItWorksSteps = [
    {
      step: '01',
      title: 'Register',
      desc: 'Submit your business and professional details.',
      action: 'Fill quick profile form',
    },
    {
      step: '02',
      title: 'Get Profiled',
      desc: 'We build your Pink Pages opportunity profile.',
      action: 'Curated verification',
    },
    {
      step: '03',
      title: 'Get Connected',
      desc: 'Log in and find relevant national and international opportunities.',
      action: 'Targeted matchmaking',
    },
    {
      step: '04',
      title: 'Participate',
      desc: 'Join summits, B2B meetings and programmes as they open up to members.',
      action: 'Real dealflow & events',
    },
  ];

  // 2.6 What you get - 7 items
  const deliverables = [
    {
      title: 'Profile',
      desc: 'Your business listed in the Pink Pages directory.',
      icon: Sparkles,
    },
    {
      title: 'Networking',
      desc: 'Access to a growing women-led business community.',
      icon: Users,
    },
    {
      title: 'Opportunities',
      desc: 'Relevant national and international programmes, as they open.',
      icon: TrendingUp,
    },
    {
      title: 'Market Access',
      desc: 'Potential buyer, distributor and partnership introductions.',
      icon: Building2,
    },
    {
      title: 'Investment Connect',
      desc: 'Access to relevant investor and pitch opportunities.',
      icon: Coins,
    },
    {
      title: 'Knowledge',
      desc: 'Masterclasses, market briefings and mentorship opportunities.',
      icon: GraduationCap,
    },
    {
      title: 'Directory Access',
      desc: 'Browse and find opportunities yourself, by sector, state and business type.',
      icon: Search,
    },
  ];

  return (
    <div className="paper-texture min-h-screen pt-24 sm:pt-28 pb-20">
      
      {/* 2.1 Hero Section */}
      <section className="relative overflow-hidden pt-6 pb-16 sm:py-20 lg:py-24 border-b border-[#E5D7C3]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="max-w-4xl mx-auto text-center space-y-5">
            {/* Directory Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C83B46]/10 border border-[#C83B46]/20 text-[#C83B46] text-xs sm:text-sm font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#C83B46]" />
              <span>Amaleeni Pink Pages • The Opportunity Directory</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#1B3629] leading-[1.08] tracking-tight">
              One Platform. One Network.{' '}
              <span className="text-[#C83B46] block sm:inline">A World of Opportunities.</span>
            </h1>

            {/* Subhead */}
            <p className="text-base sm:text-xl lg:text-2xl text-[#3D5C4A] font-serif max-w-3xl mx-auto leading-relaxed">
              Pink Pages is Amaleeni Foundation's business and opportunity directory for women entrepreneurs – built to put you in front of the people who can grow your business, in India and beyond.
            </p>

            {/* CTA Button & Quick Info */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/pink-pages/register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#C83B46] hover:bg-[#A82B36] text-white px-8 py-4 rounded-full text-base sm:text-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 border-2 border-white/20"
              >
                <span>Register on Pink Pages</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              
              <Link
                to="/about"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FAF5EB] hover:bg-[#F2E8D7] text-[#1B3629] px-6 py-4 rounded-full text-base font-semibold border border-[#D9C7AF] transition-colors"
              >
                <span>About Amaleeni</span>
              </Link>
            </div>

            {/* Key Directory Highlights Banner */}
            <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto text-left">
              <div className="bg-[#FAF5EB]/90 backdrop-blur-sm p-4 rounded-2xl border border-[#E5D7C3]">
                <p className="text-2xl sm:text-3xl font-extrabold text-[#1B3629] font-serif">18+</p>
                <p className="text-xs font-semibold text-[#5A7B68] uppercase tracking-wider mt-0.5">Industry Sectors</p>
              </div>
              <div className="bg-[#FAF5EB]/90 backdrop-blur-sm p-4 rounded-2xl border border-[#E5D7C3]">
                <p className="text-2xl sm:text-3xl font-extrabold text-[#C83B46] font-serif">Global</p>
                <p className="text-xs font-semibold text-[#5A7B68] uppercase tracking-wider mt-0.5">India &amp; International</p>
              </div>
              <div className="bg-[#FAF5EB]/90 backdrop-blur-sm p-4 rounded-2xl border border-[#E5D7C3]">
                <p className="text-2xl sm:text-3xl font-extrabold text-[#1B3629] font-serif">Curated</p>
                <p className="text-xs font-semibold text-[#5A7B68] uppercase tracking-wider mt-0.5">Investor &amp; Buyer Match</p>
              </div>
              <div className="bg-[#FAF5EB]/90 backdrop-blur-sm p-4 rounded-2xl border border-[#E5D7C3]">
                <p className="text-2xl sm:text-3xl font-extrabold text-[#D49B4B] font-serif">AW 2027</p>
                <p className="text-xs font-semibold text-[#5A7B68] uppercase tracking-wider mt-0.5">Early Bird Included</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2.2 What is Pink Pages */}
      <section className="py-16 sm:py-20 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C83B46]">
              A Living Opportunity Ecosystem
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#1B3629]">
              What is Pink Pages
            </h2>
            <p className="text-base sm:text-lg text-[#3E5C4B] font-serif leading-relaxed">
              Pink Pages is a living business and leadership directory – not simply a list of names. It's a structured profile of you and your business, organised by sector so the right opportunities can find the right people: investors, buyers, corporates, mentors and partners, all in one connected ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((pillar, idx) => {
              const IconComponent = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#FAF5EB] rounded-3xl p-7 border border-[#E5D7C3] shadow-sm hover:shadow-md hover:border-[#D49B4B] transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#1B3629] text-[#FAF5EB] flex items-center justify-center group-hover:bg-[#C83B46] transition-colors">
                        <IconComponent className="w-6 h-6 text-[#D49B4B] group-hover:text-white transition-colors" />
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A6750] bg-[#F2E8D7] px-3 py-1 rounded-full border border-[#E2D4C0]">
                        {pillar.tag}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl font-bold text-[#1B3629] mb-2 group-hover:text-[#C83B46] transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-[#4E6B5A] font-serif leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#EAE0D0] flex items-center gap-2 text-xs font-semibold text-[#1B3629]">
                    <span>Verified directory feature</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C83B46]" />
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 2.3 Who is Pink Pages for */}
      <section className="py-16 sm:py-20 bg-[#F2E8D7]/60 border-y border-[#E2D4C0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C83B46]">
              Every Stage &amp; Every Ambition
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#1B3629]">
              Who is Pink Pages for
            </h2>
            <p className="text-base sm:text-xl text-[#3E5C4B] font-serif">
              Women at every stage of the professional and entrepreneurial journey.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {targetProfiles.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#FAF5EB] rounded-3xl p-7 border border-[#E5D7C3] shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-11 h-11 rounded-xl bg-[#C83B46]/10 border border-[#C83B46]/20 flex items-center justify-center text-[#C83B46] mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold text-[#D49B4B] uppercase tracking-wider block mb-1">
                      {item.badge}
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-[#1B3629] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#4E6B5A] font-serif leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-[#EAE0D0] flex items-center justify-between text-xs text-[#7A6750]">
                    <span>Eligible for Pink Pages directory</span>
                    <span className="text-[#C83B46] font-semibold">Join →</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 2.4 Every sector, one directory */}
      <section className="py-16 sm:py-20 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1B3629]/10 text-[#1B3629] text-xs font-bold uppercase tracking-wider">
              <span>Comprehensive Industry Coverage</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#1B3629]">
              Every sector, one directory
            </h2>
            <p className="text-base sm:text-xl text-[#3E5C4B] font-serif">
              From agriculture to AI – every kind of business belongs here.
            </p>
          </div>

          {/* 18 Sectors Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sectors.map((sec, idx) => {
              const SecIcon = sec.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#FAF5EB] hover:bg-[#F2E8D7] rounded-2xl p-4 sm:p-5 border border-[#E5D7C3] flex items-center gap-3.5 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#1B3629]/10 text-[#1B3629] flex items-center justify-center shrink-0 group-hover:bg-[#C83B46] group-hover:text-white transition-colors">
                    <SecIcon className="w-5 h-5" />
                  </div>
                  <div className="grow min-w-0">
                    <h3 className="font-serif text-base sm:text-lg font-bold text-[#1B3629] truncate group-hover:text-[#C83B46] transition-colors">
                      {sec.name}
                    </h3>
                    <p className="text-[11px] text-[#7A6750] font-sans">Open for business profiling &amp; trade leads</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#D49B4B] shrink-0 group-hover:translate-x-1 transition-transform" />
                </div>
              );
            })}
          </div>

          <div className="text-center pt-4">
            <p className="text-xs text-[#7A6750] font-serif italic">
              Don't see your exact niche? Pink Pages supports multi-sector classification and emerging cross-industry disciplines.
            </p>
          </div>

        </div>
      </section>

      {/* 2.5 How it works */}
      <section className="py-16 sm:py-20 bg-[#1B3629] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D49B4B]">
              Streamlined Pathway
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white">
              How it works
            </h2>
            <p className="text-base sm:text-lg text-[#A8C2B3] font-serif">
              Four steps from registration to meaningful business connections.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorksSteps.map((step, idx) => (
              <div
                key={idx}
                className="bg-[#13281E] border border-[#2B523E] rounded-3xl p-6 relative flex flex-col justify-between hover:border-[#D49B4B] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-serif text-3xl font-bold text-[#D49B4B]">
                      {step.step}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#A8C2B3] bg-[#1B3629] px-2.5 py-1 rounded-full border border-[#2F5943]">
                      Step {idx + 1}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#A8C2B3] font-serif leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#1F3D2E] text-xs text-[#D49B4B] font-semibold">
                  {step.action}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <Link
              to="/pink-pages/register"
              className="inline-flex items-center gap-2 bg-[#C83B46] hover:bg-[#A82B36] text-white px-8 py-3.5 rounded-full text-base font-bold transition-all shadow-lg hover:shadow-xl"
            >
              <span>Begin Step 1: Register Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* 2.6 What you get */}
      <section className="py-16 sm:py-20 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C83B46]">
              Tangible Value &amp; Growth Engine
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#1B3629]">
              What you get
            </h2>
            <p className="text-base sm:text-xl text-[#3E5C4B] font-serif">
              A comprehensive toolkit for market visibility, connections, and direct dealflow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deliverables.map((item, idx) => {
              const DelivIcon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#FAF5EB] rounded-3xl p-6 border border-[#E5D7C3] shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#1B3629] text-[#D49B4B] flex items-center justify-center shrink-0 mt-1">
                    <DelivIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#1B3629] mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#4E6B5A] font-serif leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Special 8th Card highlighting Early Bird 2027 entry */}
            <div className="bg-gradient-to-br from-[#1B3629] to-[#13281E] text-white rounded-3xl p-6 border border-[#D49B4B]/40 shadow-sm flex items-start gap-4 md:col-span-2 lg:col-span-2">
              <div className="w-12 h-12 rounded-2xl bg-[#C83B46] text-white flex items-center justify-center shrink-0 mt-1">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#D49B4B]">
                  Bonus Summit Inclusion
                </span>
                <h3 className="font-serif text-xl font-bold text-white mb-1">
                  Amaleeni Womenpreneurs 2027 Early Bird Pass
                </h3>
                <p className="text-sm text-[#A8C2B3] font-serif leading-relaxed">
                  Your annual Pink Pages registration (₹5,000) doubles as your Early Bird access ticket to the flagship Amaleeni Womenpreneurs 2027 national summit, putting you face to face with capital, policy, buyers, and mentors.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2.7 Closing call to action */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-gradient-to-br from-[#FAF5EB] to-[#F2E8D7] border-2 border-[#D49B4B] rounded-3xl p-8 sm:p-14 text-center space-y-6 shadow-xl relative overflow-hidden">
          
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C83B46]">
              Claim Your Space in the Directory
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#1B3629]">
              Ready to take your enterprise to the nation and the world?
            </h2>
            <p className="text-sm sm:text-base text-[#4E6B5A] font-serif leading-relaxed">
              Join hundreds of women founders, professionals, investors, and industrial leaders listed in Amaleeni's official directory.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/pink-pages/register"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#C83B46] hover:bg-[#A82B36] text-white px-9 py-4 rounded-full text-base sm:text-lg font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              <span>Register on Pink Pages</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              to="/pink-pages/register#login"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-transparent hover:bg-[#1B3629]/5 text-[#1B3629] px-7 py-4 rounded-full text-base font-semibold border border-[#1B3629]/30 transition-colors"
            >
              <span>Already registered? Log in</span>
            </Link>

            {onOpenContact && (
              <button
                type="button"
                onClick={onOpenContact}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#1B3629] hover:bg-[#12251C] text-white px-6 py-4 rounded-full text-base font-semibold transition-colors cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-[#D49B4B]" />
                <span>Secretariat Inquiry</span>
              </button>
            )}
          </div>

          <p className="text-xs text-[#7A6750] font-serif pt-2">
            Annual registration: ₹5,000 • Verified listing + Amaleeni Womenpreneurs 2027 Early Bird Entry
          </p>

        </div>
      </section>

    </div>
  );
}

function ChevronRight({ className }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6"/>
    </svg>
  );
}
