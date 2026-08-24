import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Award, CheckCircle2, ShieldCheck, Heart, Users, GraduationCap, Compass, Coins, Quote } from 'lucide-react';

export default function AboutPage() {
  const pillars = [
    { title: 'Skill', subtitle: 'Strength needs direction.', desc: 'Imparting industry-certified technical, aesthetic, and vocational skills that translate into immediate income.', icon: Compass },
    { title: 'Opportunity', subtitle: 'Potential needs a platform.', desc: 'Connecting women to markets, pitch floors, capital providers, and enterprise ecosystems.', icon: Sparkles },
    { title: 'Education', subtitle: 'Knowledge creates choices.', desc: 'Fostering financial literacy, legal awareness, business compliance, and digital tools.', icon: GraduationCap },
    { title: 'Financial independence', subtitle: 'Independence creates freedom.', desc: 'Ensuring every woman earns her own income and controls her economic destiny.', icon: Coins },
    { title: 'Confidence', subtitle: 'A woman must recognise her own worth.', desc: 'Cultivating self-worth, leadership presence, and public speaking courage.', icon: ShieldCheck },
    { title: 'Community', subtitle: 'Strength grows when women stand together.', desc: 'Building supportive peer networks, collective SHGs, and lifelong mentorship circles.', icon: Users },
  ];

  return (
    <div className="paper-texture min-h-screen pt-28 sm:pt-32 pb-20">
      
      {/* 5.1 Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1B3629]/10 text-[#1B3629] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[#C83B46]" />
            <span>The Foundation Story</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-extrabold text-[#1B3629]">
            The Amaleeni Foundation
          </h1>

          <p className="text-xl sm:text-2xl text-[#C83B46] font-serif font-semibold">
            A journey to recognise the strength women already carry.
          </p>

          <p className="text-sm font-bold text-[#8A755A] uppercase tracking-widest pt-1">
            Ten years of turning capability into livelihood.
          </p>
        </div>
      </section>

      {/* 5.2 About the Foundation */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-[#FAF5EB] rounded-3xl p-8 sm:p-12 border border-[#E5D7C3] shadow-lg space-y-8">
          
          <div className="space-y-4">
            <p className="font-serif text-lg sm:text-xl text-[#1B3629] leading-relaxed">
              <span className="font-bold text-[#C83B46]">Amaleeni</span> means the one who is untarnished, unwavering, unbreakable. A woman is born many times over across a single life. Every relationship gives her a new identity. Every responsibility reveals another dimension of her. Every challenge creates another version of her.
            </p>

            <div className="bg-[#F2E8D7] p-6 rounded-2xl border border-[#E0D2BC] text-center">
              <p className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-[#1B3629] leading-snug">
                Daughter. Sister. Woman. Professional. Entrepreneur. Wife. Mother. Warrior. Leader.
              </p>
            </div>

            <p className="font-serif text-lg text-[#3D5C4A] leading-relaxed">
              In a civilisation that has always understood the feminine as strength itself – Lakshmi, Saraswati, Durga, Kali – the Amaleeni Foundation sets out to bring out the strength from within. What's missing is the opportunity to use it: a skill to channel it, a mentor to guide it, a market to prove it, a platform to show it.
            </p>
          </div>

          {/* Pull Quote 1 */}
          <div className="bg-[#1B3629] text-white p-8 rounded-2xl border border-[#2B4E3B] text-center space-y-3 relative">
            <Quote className="w-10 h-10 text-[#D49B4B]/30 absolute top-4 left-4" />
            <p className="font-serif text-2xl font-bold text-[#FAF5EB] italic leading-relaxed">
              "There is as much edge and strength in a woman's bangle as there is in a man's sword."
            </p>
            <p className="text-xs uppercase tracking-widest text-[#D49B4B] font-bold">
              — Dr. Akshaya Jain
            </p>
          </div>

          <p className="font-serif text-lg text-[#3D5C4A] leading-relaxed">
            For ten years, the Amaleeni Foundation has worked to create those openings – helping women learn a skill, earn from it, and build an identity of their own. Because when a woman becomes self-sufficient, it reaches her family, her children, her community, and the generations after her.
          </p>

        </div>
      </section>

      {/* 5.3 Dr. Akshaya Jain */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-[#F4ECDC] rounded-3xl p-8 sm:p-12 border border-[#E8DCC8] grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          <div className="md:col-span-4 text-center">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
              alt="Dr. Akshaya Jain"
              className="w-48 h-48 rounded-full object-cover mx-auto border-4 border-[#D49B4B] shadow-xl mb-4"
            />
            <h3 className="font-serif text-2xl font-bold text-[#1B3629]">Dr. Akshaya Jain</h3>
            <p className="text-xs font-semibold text-[#C83B46] uppercase tracking-wider mt-1">
              Founder &amp; Convenor, Amaleeni Foundation
            </p>
          </div>

          <div className="md:col-span-8 space-y-4 font-serif text-base text-[#3A5645] leading-relaxed">
            <p>
              Dr. Akshaya Jain established the Amaleeni Foundation. Her own journey shaped our belief. She has known struggle, and has seen how hard it can be for a woman to build a career, learn a new skill, restart after a break, or establish an identity that's truly hers. Her conclusion has guided everything since: women don't need sympathy, they need opportunity. They don't need to be told they are capable – they need access to the tools that let them prove it.
            </p>

            <p>
              An aesthetic physician based in Pune with over twelve years in practice, Dr. Akshaya is the founder of Skintillatingg, and of the Chromocosmo Institute of Aesthetics, Trichology &amp; Nutrition – a Skill India–registered institute under the Ministry of Skill Development &amp; Entrepreneurship, training a new generation of professionals with real clinical exposure, many of them women.
            </p>

            <p>
              The Amaleeni Foundation is the social dimension of that same work: the conviction that a skill, properly taught and properly certified, is the shortest route out of economic dependence.
            </p>

            <div className="bg-[#FAF5EB] p-6 rounded-2xl border border-[#E2D4BF] italic text-[#1B3629]">
              "For me, Amaleeni isn't just a foundation. It's the story of every woman who is born again and again within a single life – and comes back stronger each time."
            </div>
          </div>

        </div>
      </section>

      {/* 5.4 The Six Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#C83B46]">
            Core Philosophy
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#1B3629] mt-1">
            The Six Pillars of Amaleeni
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div key={idx} className="bg-[#FAF5EB] rounded-3xl p-8 border border-[#E5D7C3] shadow-md hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 rounded-2xl bg-[#1B3629] text-[#D49B4B] flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#1B3629]">{p.title}</h3>
                <p className="text-xs font-bold text-[#C83B46] uppercase tracking-wider mt-1 mb-3">{p.subtitle}</p>
                <p className="text-sm text-[#4E6B5A] font-serif leading-relaxed">{p.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5.5 Recognition & Impact */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-[#1B3629] text-white rounded-3xl p-8 sm:p-12 border border-[#2B4E3B] shadow-2xl space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#D49B4B]">
              Credentials &amp; Record
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Recognition &amp; Impact
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#234533] p-6 rounded-2xl border border-[#2F5A43] space-y-2">
              <span className="px-3 py-1 rounded-full bg-[#C83B46] text-white text-[10px] font-bold uppercase">NITI Aayog</span>
              <h4 className="font-serif text-lg font-bold text-white">Recognised &amp; CSR-Certified</h4>
              <p className="text-xs text-[#A8C2B3]">Fully compliant for corporate CSR partnerships under Schedule VII.</p>
            </div>

            <div className="bg-[#234533] p-6 rounded-2xl border border-[#2F5A43] space-y-2">
              <span className="px-3 py-1 rounded-full bg-[#D49B4B] text-white text-[10px] font-bold uppercase">Skill India</span>
              <h4 className="font-serif text-lg font-bold text-white">CIATN Institute Registered</h4>
              <p className="text-xs text-[#A8C2B3]">Ministry of Skill Development &amp; Entrepreneurship clinical training institute.</p>
            </div>

            <div className="bg-[#234533] p-6 rounded-2xl border border-[#2F5A43] space-y-2">
              <span className="px-3 py-1 rounded-full bg-[#1B3629] text-white border border-[#3A644D] text-[10px] font-bold uppercase">State Honour</span>
              <h4 className="font-serif text-lg font-bold text-white">Advantage Vidarbha 2026</h4>
              <p className="text-xs text-[#A8C2B3]">Honoured by Union Minister Nitin Gadkari as Leader in Aesthetic Medicine &amp; Skill Development.</p>
            </div>
          </div>

          {/* Impact Numbers */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center pt-6 border-t border-[#2F5A43]">
            <div>
              <p className="font-serif text-3xl font-extrabold text-[#FAF5EB]">10,000+</p>
              <p className="text-xs text-[#A8C2B3] uppercase tracking-wider mt-1">Women Trained</p>
            </div>
            <div>
              <p className="font-serif text-3xl font-extrabold text-[#D49B4B]">500+</p>
              <p className="text-xs text-[#A8C2B3] uppercase tracking-wider mt-1">SHGs Supported</p>
            </div>
            <div>
              <p className="font-serif text-3xl font-extrabold text-[#C83B46]">1,200+</p>
              <p className="text-xs text-[#A8C2B3] uppercase tracking-wider mt-1">Enterprises Launched</p>
            </div>
            <div>
              <p className="font-serif text-3xl font-extrabold text-[#FAF5EB]">25,000+</p>
              <p className="text-xs text-[#A8C2B3] uppercase tracking-wider mt-1">Children Reached</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5.6 Call to Action */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="bg-[#FAF5EB] rounded-3xl p-8 sm:p-12 border border-[#E5D7C3] shadow-lg space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1B3629]">
            A model worth scaling.
          </h2>
          <p className="text-base sm:text-lg text-[#4E6B5A] font-serif max-w-2xl mx-auto leading-relaxed">
            For companies investing in women-led entrepreneurship, skill development or livelihood generation, Amaleeni Foundation offers a working template rather than a proposal.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/partner"
              className="w-full sm:w-auto bg-[#C83B46] hover:bg-[#A82B36] text-white px-8 py-3.5 rounded-full text-base font-bold transition-all shadow-md"
            >
              Partner With Us
            </Link>
            <a
              href="https://forms.gle/aKo9HBzgCB14dvAB9"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-[#1B3629] hover:bg-[#12251C] text-white px-8 py-3.5 rounded-full text-base font-bold transition-all shadow-md text-center"
            >
              Register Now
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
