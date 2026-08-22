import React from 'react';
import { ArrowRight, ShieldCheck, Handshake, Users, TrendingUp, Sparkles } from 'lucide-react';

export default function Hero({ onOpenContact }) {
  return (
    <section id="home" className="relative pt-24 sm:pt-28 lg:pt-32 pb-0 overflow-hidden paper-texture">
      
      {/* Background Monuments Paper Cut Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-multiply flex justify-end items-center">
        <img
          src="/assets/paper-monuments.jpg"
          alt="Uttar Pradesh Architectural Heritage Paper Craft"
          className="w-full h-full object-cover object-right-top"
        />
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[580px]">
          
          {/* Left Column: Hero Text */}
          <div className="lg:col-span-5 pt-4 pb-8 z-20">
            <div className="space-y-1">
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-extrabold text-[#1B3629] leading-[1.02] tracking-tight">
                Empowered
              </h1>
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-extrabold text-[#1B3629] leading-[1.02] tracking-tight mb-3">
                Women.
              </h1>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#C83B46] leading-[1.05] tracking-tight">
                Strongr
              </h2>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#C83B46] leading-[1.05] tracking-wider uppercase">
                UTTAR
              </h2>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#C83B46] leading-[1.05] tracking-wider uppercase">
                PRADESH
              </h2>
            </div>

            <div className="mt-6 space-y-1 text-[#2D4D3B] text-lg sm:text-xl font-serif leading-relaxed">
              <p className="font-medium">A safe place for women.</p>
              <p className="font-medium">Infinite opportunities for you business.</p>
            </div>

            {/* CTA Button */}
            <div className="mt-8">
              <button
                onClick={onOpenContact}
                className="group relative inline-flex items-center gap-3 bg-[#C83B46] hover:bg-[#B02F3A] text-white px-7 py-3.5 rounded-full text-base font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Discover Opportunities</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column: Hero Cutout of Empowered Women */}
          <div className="lg:col-span-7 relative flex justify-center lg:justify-end items-end h-full mt-4 lg:mt-0">
            <div className="relative w-full max-w-2xl lg:max-w-none z-10 drop-shadow-2xl">
              <img
                src="/assets/hero-women.jpg"
                alt="Empowered Indian Professional Women"
                className="w-full h-auto object-contain max-h-[520px] mx-auto filter drop-shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Layered Foliage Leaves - Bottom Left & Right Corners */}
      <div className="absolute bottom-16 left-0 z-20 pointer-events-none hidden sm:block w-48 lg:w-72 animate-float-slow opacity-90">
        <img
          src="/assets/paper-leaves.jpg"
          alt="Paper craft leaves accent"
          className="w-full h-auto object-contain transform -rotate-12 filter drop-shadow-md rounded-2xl"
        />
      </div>

      <div className="absolute bottom-20 right-0 z-20 pointer-events-none hidden sm:block w-44 lg:w-64 animate-float-reverse opacity-90">
        <img
          src="/assets/paper-leaves.jpg"
          alt="Paper craft leaves accent"
          className="w-full h-auto object-contain transform rotate-45 scale-x-[-1] filter drop-shadow-md rounded-2xl"
        />
      </div>

      {/* Bottom Floating/Docked Wave Feature Banner (Dark Forest Green) */}
      <div className="relative z-30 w-full mt-8">
        {/* Curved Wave Top Shape */}
        <div className="w-full overflow-hidden leading-none">
          <svg
            className="relative block w-full h-10 sm:h-14 text-[#1B3629]"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0 C150,90 350,-40 500,50 C650,140 900,10 1200,60 L1200,120 L0,120 Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>

        {/* Feature Banner Container */}
        <div className="bg-[#1B3629] text-white py-6 px-4 sm:px-8 border-t border-[#2A4D3B]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[#2D5440]">
              
              {/* Feature 1 */}
              <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:px-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-[#264A38] border border-[#37644D] flex items-center justify-center text-[#E5D7C3] group-hover:scale-110 group-hover:text-[#C83B46] transition-all duration-300">
                  <ShieldCheck className="w-6 h-6 stroke-[1.8]" />
                </div>
                <div>
                  <h4 className="font-semibold text-base leading-snug text-[#FAF5EB] group-hover:text-white">
                    Safe &amp; Welcoming
                  </h4>
                  <p className="text-xs text-[#A8C2B3]">Environment</p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:px-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-[#264A38] border border-[#37644D] flex items-center justify-center text-[#E5D7C3] group-hover:scale-110 group-hover:text-[#C83B46] transition-all duration-300">
                  <Handshake className="w-6 h-6 stroke-[1.8]" />
                </div>
                <div>
                  <h4 className="font-semibold text-base leading-snug text-[#FAF5EB] group-hover:text-white">
                    Endless Business
                  </h4>
                  <p className="text-xs text-[#A8C2B3]">Opportunities</p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:px-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-[#264A38] border border-[#37644D] flex items-center justify-center text-[#E5D7C3] group-hover:scale-110 group-hover:text-[#C83B46] transition-all duration-300">
                  <Users className="w-6 h-6 stroke-[1.8]" />
                </div>
                <div>
                  <h4 className="font-semibold text-base leading-snug text-[#FAF5EB] group-hover:text-white">
                    Women Support
                  </h4>
                  <p className="text-xs text-[#A8C2B3]">Network</p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:px-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-[#264A38] border border-[#37644D] flex items-center justify-center text-[#E5D7C3] group-hover:scale-110 group-hover:text-[#C83B46] transition-all duration-300">
                  <TrendingUp className="w-6 h-6 stroke-[1.8]" />
                </div>
                <div>
                  <h4 className="font-semibold text-base leading-snug text-[#FAF5EB] group-hover:text-white">
                    Strong Ecosystem
                  </h4>
                  <p className="text-xs text-[#A8C2B3]">for Growth</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
