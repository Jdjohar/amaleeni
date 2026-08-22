import React from 'react';
import { Quote, Star, ArrowRight, Award, CheckCircle } from 'lucide-react';

export default function SuccessStories({ onOpenContact }) {
  const stories = [
    {
      name: 'Sunita Sharma',
      role: 'Founder & CEO, Avadh Organics & Spices',
      district: 'Lucknow, Uttar Pradesh',
      growth: '₹8.5 Cr Turnover',
      workers: '120+ Women Employed',
      quote:
        'Starting an organic spice processing plant seemed daunting until the UP Single Window Clearance cleared our licensing in 12 days. The 100% stamp duty waiver saved us initial capital!',
      sector: 'Food Processing',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Ananya Verma',
      role: 'Co-Founder, TexCraft Weaving Solutions',
      district: 'Varanasi, Uttar Pradesh',
      growth: 'Exports to 14 Countries',
      workers: '250+ Handloom Artisans',
      quote:
        'Under the ODOP Scheme, we received free e-commerce listing and international trade fair subsidies. Our Banarasi silk products are now selling across Europe and the US.',
      sector: 'Textiles & Handloom',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Priya Srivastava',
      role: 'Founder, EcoPack Paper Products',
      district: 'Noida, Uttar Pradesh',
      growth: '3 Factory Units',
      workers: '85+ Skilled Technicians',
      quote:
        'The safety environment for women working 24/7 shifts in Greater Noida industrial hubs is remarkable. With Pink Patrols and safe transport, our night shift runs smoothly.',
      sector: 'Sustainable Packaging',
      avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80',
    },
  ];

  return (
    <section id="success-stories" className="py-20 bg-[#F4ECDC] relative border-t border-[#E8DCC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1B3629]/10 text-[#1B3629] text-sm font-semibold mb-4">
            <Award className="w-4 h-4 text-[#C83B46]" />
            <span>Voices of Triumph</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#1B3629]">
            Stories of Empowered Leaders in UP
          </h2>
          <p className="mt-4 text-lg text-[#4A6454] font-serif">
            Discover how women founders transformed vision into multi-crore enterprises in Uttar Pradesh.
          </p>
        </div>

        {/* Stories Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story) => (
            <div
              key={story.name}
              className="bg-[#FAF5EB] rounded-3xl p-8 border border-[#E5D7C3] flex flex-col justify-between shadow-lg hover:shadow-2xl transition-all duration-300 relative group"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-[#D49B4B]/20 group-hover:text-[#C83B46]/30 transition-colors" />

              <div>
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={story.avatar}
                    alt={story.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-[#D49B4B] shadow-md"
                  />
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#1B3629]">{story.name}</h3>
                    <p className="text-xs text-[#C83B46] font-semibold">{story.role}</p>
                    <p className="text-xs text-[#6B5A46] mt-0.5">📍 {story.district}</p>
                  </div>
                </div>

                <div className="flex gap-1 text-[#D49B4B] mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-base text-[#3A5646] font-serif leading-relaxed italic mb-6">
                  "{story.quote}"
                </p>
              </div>

              <div className="pt-6 border-t border-[#E5D7C3] grid grid-cols-2 gap-2 text-center bg-[#F2E8D7] rounded-2xl p-4">
                <div>
                  <p className="text-xs text-[#7A6953] font-medium">Enterprise Growth</p>
                  <p className="font-serif font-bold text-base text-[#C83B46] mt-0.5">{story.growth}</p>
                </div>
                <div>
                  <p className="text-xs text-[#7A6953] font-medium">Employment Impact</p>
                  <p className="font-serif font-bold text-base text-[#1B3629] mt-0.5">{story.workers}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="mt-16 bg-[#1B3629] text-white rounded-3xl p-8 sm:p-12 border border-[#2D523E] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl text-center md:text-left">
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#FAF5EB]">
              Ready to Write Your Own Success Story in Uttar Pradesh?
            </h3>
            <p className="mt-3 text-[#A8C4B3] text-base font-serif">
              Get direct guidance from Amaleeni Foundation mentors, policy advisors, and investment officers.
            </p>
          </div>

          <button
            onClick={onOpenContact}
            className="shrink-0 bg-[#C83B46] hover:bg-[#A82B36] text-white px-8 py-4 rounded-full text-base font-semibold transition-all duration-300 shadow-xl hover:scale-105 flex items-center gap-3"
          >
            <span>Start Your Business Journey</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
