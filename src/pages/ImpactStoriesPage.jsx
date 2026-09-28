import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Quote, MapPin, ArrowRight, HeartHandshake } from 'lucide-react';

export default function ImpactStoriesPage() {
  useEffect(() => {
    document.title = "Impact Stories | Women Entrepreneurs Backed by Amaleeni Foundation";
    window.scrollTo(0, 0);
  }, []);

  const stories = [
    {
      name: 'Sunita Devi',
      sector: 'Handicrafts',
      state: 'Uttar Pradesh',
      before: 'Ran a small home-based handicrafts business with no way to reach buyers beyond her village.',
      after: 'Completed a skill workshop, listed on Pink Pages, and connected with two corporate buyers through the directory.',
      quote: '“I used to wait for a middleman to visit. Now buyers find me.”',
      img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Priyanka Deshmukh',
      sector: 'Beauty & Wellness',
      state: 'Maharashtra',
      before: 'Trained informally with no certification or access to credit.',
      after: "Enrolled in the Chromocosmo Institute's Skill India–registered programme and used the certification to secure a small-business loan.",
      quote: '“The certificate is what finally got the bank to say yes.”',
      img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Lakshmi Naidu',
      sector: 'Agri-Business',
      state: 'Andhra Pradesh',
      before: 'Sold produce locally through informal channels only.',
      after: 'Joined an SHG federation network via Pink Pages and began supplying a regional retailer.',
      quote: '“Pink Pages put my farm in front of a buyer I\'d never have met otherwise.”',
      img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    },
  ];

  return (
    <div className="paper-texture min-h-screen pt-28 sm:pt-32 pb-20">
      
      {/* 14.1 Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1B3629]/10 text-[#1B3629] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[#C83B46]" />
            <span>Grassroots Impact</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-extrabold text-[#1B3629]">
            Impact Stories
          </h1>

          <p className="text-lg sm:text-xl text-[#3D5C4A] font-serif">
            The women behind the numbers on our About page.
          </p>
        </div>
      </section>

      {/* 14.2 Case Stories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story, idx) => (
            <div key={idx} className="bg-[#FAF5EB] rounded-3xl p-8 border border-[#E5D7C3] shadow-md flex flex-col justify-between hover:shadow-xl transition-all">
              <div>
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#E5D7C3]">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#1B3629]">{story.name}</h3>
                    <p className="text-xs font-bold text-[#C83B46] mt-0.5">{story.sector}</p>
                  </div>
                  <span className="flex items-center gap-1 text-xs text-[#8A755A] font-semibold bg-[#F4ECDC] px-2.5 py-1 rounded-full border border-[#E0D2BC]">
                    <MapPin className="w-3 h-3 text-[#1B3629]" />
                    {story.state}
                  </span>
                </div>

                <div className="space-y-3 font-serif text-sm">
                  <div className="bg-[#F4ECDC] p-3.5 rounded-xl border border-[#E0D2BC]">
                    <span className="text-[11px] uppercase font-bold text-[#8A755A] block mb-0.5">Before Amaleeni</span>
                    <p className="text-[#4E6B5A] text-xs leading-relaxed">{story.before}</p>
                  </div>

                  <div className="bg-[#1B3629]/5 p-3.5 rounded-xl border border-[#1B3629]/10">
                    <span className="text-[11px] uppercase font-bold text-[#1B3629] block mb-0.5">After Amaleeni</span>
                    <p className="text-[#1B3629] text-xs font-semibold leading-relaxed">{story.after}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-6 border-t border-[#E5D7C3]">
                <div className="flex gap-2">
                  <Quote className="w-5 h-5 text-[#D49B4B] shrink-0 mt-1" />
                  <p className="text-sm font-serif font-bold text-[#1B3629] italic leading-snug">
                    {story.quote}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 14.3 Closing & Record */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1B3629] text-white rounded-3xl p-8 sm:p-12 border border-[#2D5440] shadow-2xl text-center space-y-6">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#D49B4B]">
            Collective Footprint
          </span>

          <p className="font-serif text-lg sm:text-xl font-bold text-[#FAF5EB] max-w-2xl mx-auto leading-relaxed">
            10,000+ women trained · 500+ SHGs supported · 1,200+ enterprises launched · 25,000+ children reached.
          </p>

          <p className="text-xs text-[#A8C2B3] font-serif">
            These stories sit alongside the numbers on our About page.
          </p>

          <div className="pt-2">
            <Link
              to="/about#recognition-impact"
              className="text-sm text-[#D49B4B] hover:text-white font-bold underline underline-offset-4 transition-colors"
            >
              See the full impact record →
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/pink-pages/register"
              className="w-full sm:w-auto bg-[#C83B46] hover:bg-[#A82B36] text-white px-7 py-3 rounded-full text-sm font-bold transition-all shadow-lg text-center"
            >
              Register on Pink Pages
            </Link>
            <Link
              to="/partner"
              className="w-full sm:w-auto bg-[#244735] hover:bg-[#2F5A43] text-white px-7 py-3 rounded-full text-sm font-bold transition-all border border-[#345E47] text-center"
            >
              Partner With Us
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
