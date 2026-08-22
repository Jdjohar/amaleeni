import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, MapPin, Clock, ArrowRight, Plane, Train, Hotel, ShieldCheck, Sparkles, Building2, Coins, Compass } from 'lucide-react';

export default function ProgrammePage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#venue') {
      const el = document.getElementById('venue');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  const day1Schedule = [
    { time: '08:30 AM – 09:30 AM', title: 'Delegate Registration & Networking Breakfast', category: 'Welcome', desc: 'Badge collection, delegate kit pickup, and morning coffee introductions.' },
    { time: '09:30 AM – 10:45 AM', title: 'Opening Keynote: From Vision to Venture', category: 'Plenary', desc: 'Welcome address by Dr. Akshaya Jain, followed by inaugural state policy announcements.' },
    { time: '11:00 AM – 01:00 PM', title: 'CAPITAL TRACK: Pitch Floor & Bank Speed-Meetings', category: 'Capital', desc: 'Curated 1-on-1 meetings between founders, angel networks, Mudra desks, and VC partners.' },
    { time: '02:00 PM – 03:45 PM', title: 'POLICY TRACK: Direct Access to Officials & Scheme Walkthroughs', category: 'Policy', desc: 'Single-window clearance assistance, compliance walkthroughs, and government procurement.' },
    { time: '04:00 PM – 05:45 PM', title: 'MARKET TRACK: Corporate Buyer Meetings & Export Readiness', category: 'Market', desc: 'Supply-chain vendor onboarding with major corporate buyers and e-commerce platforms.' },
    { time: '06:30 PM ONWARDS', title: 'Networking Dinner & Cultural Evening', category: 'Social', desc: 'Evening reception showcasing Odisha handlooms, cultural performances, and informal peer circles.' },
  ];

  const day2Schedule = [
    { time: '09:00 AM – 11:00 AM', title: 'MENTORSHIP TRACK: Sector Masterclasses', category: 'Mentorship', desc: 'Parallel deep-dive tracks in Manufacturing, Agri-Tech, Handloom & ODOP, and Digital Software.' },
    { time: '11:15 AM – 01:00 PM', title: '1-to-1 Mentor Sessions & Peer Circles', category: 'Mentorship', desc: 'Dedicated advisory sessions with seasoned entrepreneurs, legal consultants, and financial strategists.' },
    { time: '02:00 PM – 03:45 PM', title: 'Grant, Subsidy & CGTMSE Credit Clinics', category: 'Capital & Policy', desc: 'On-the-floor registration for credit guarantee schemes, subsidy applications, and seed funding.' },
    { time: '04:00 PM – 05:30 PM', title: 'Closing Plenary & 2027 Action Plan Announcement', category: 'Closing', desc: 'Closing remarks, delegate resolution sign-off, and follow-through roadmap.' },
  ];

  return (
    <div className="paper-texture min-h-screen pt-28 sm:pt-32 pb-20">
      
      {/* 2.1 Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1B3629]/10 text-[#1B3629] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[#C83B46]" />
            <span>Official Event Schedule</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-extrabold text-[#1B3629]">
            Amaleeni Womenpreneurs 2027
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-4 text-base font-serif text-[#3D5C4A]">
            <span className="flex items-center gap-1.5 text-[#C83B46] font-semibold">
              <Calendar className="w-5 h-5" /> 12–13 March 2027
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-5 h-5 text-[#1B3629]" /> [Venue Name], Bhubaneswar, Odisha
            </span>
          </div>
        </div>
      </section>

      {/* 2.2 Full Agenda */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 space-y-16">
        
        {/* Day 1 */}
        <div className="bg-[#FAF5EB] rounded-3xl p-6 sm:p-10 border border-[#E5D7C3] shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[#E5D7C3] gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#C83B46]">
                Summit Day One
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#1B3629]">
                Friday, 12 March 2027
              </h2>
            </div>
            <span className="px-4 py-2 rounded-full bg-[#1B3629] text-white text-xs font-semibold">
              Capital, Policy &amp; Market Tracks
            </span>
          </div>

          <div className="space-y-6">
            {day1Schedule.map((item, idx) => (
              <div key={idx} className="flex flex-col md:flex-row gap-4 p-5 rounded-2xl bg-[#F2E8D7] border border-[#E0D2BC] hover:border-[#C83B46] transition-colors">
                <div className="md:w-64 shrink-0 flex items-center gap-2 text-[#C83B46] font-bold text-sm">
                  <Clock className="w-4 h-4 shrink-0" />
                  <span>{item.time}</span>
                </div>
                <div className="grow">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-md bg-[#1B3629]/10 text-[#1B3629] text-[10px] font-bold uppercase">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#1B3629]">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#4E6B5A] font-serif mt-1">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Day 2 */}
        <div className="bg-[#FAF5EB] rounded-3xl p-6 sm:p-10 border border-[#E5D7C3] shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[#E5D7C3] gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#C83B46]">
                Summit Day Two
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#1B3629]">
                Saturday, 13 March 2027
              </h2>
            </div>
            <span className="px-4 py-2 rounded-full bg-[#D49B4B] text-white text-xs font-semibold">
              Mentorship &amp; Scheme Action Clinics
            </span>
          </div>

          <div className="space-y-6">
            {day2Schedule.map((item, idx) => (
              <div key={idx} className="flex flex-col md:flex-row gap-4 p-5 rounded-2xl bg-[#F2E8D7] border border-[#E0D2BC] hover:border-[#C83B46] transition-colors">
                <div className="md:w-64 shrink-0 flex items-center gap-2 text-[#C83B46] font-bold text-sm">
                  <Clock className="w-4 h-4 shrink-0" />
                  <span>{item.time}</span>
                </div>
                <div className="grow">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-md bg-[#1B3629]/10 text-[#1B3629] text-[10px] font-bold uppercase">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#1B3629]">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#4E6B5A] font-serif mt-1">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2.3 CTA */}
        <div className="text-center">
          <Link
            to="/register"
            className="inline-flex items-center gap-3 bg-[#C83B46] hover:bg-[#A82B36] text-white px-8 py-4 rounded-full text-base font-bold transition-all shadow-lg hover:shadow-xl"
          >
            <span>Register as Delegate</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

      </section>

      {/* 2.4 Venue Section (#venue) */}
      <section id="venue" className="bg-[#1B3629] text-white py-20 border-t border-[#2D5440]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#D49B4B]">
              Venue &amp; Travel Information
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white mt-2">
              [VENUE NAME], Bhubaneswar
            </h2>
            <p className="text-base text-[#A8C2B3] font-serif mt-3">
              [Full address], Bhubaneswar, Odisha. Designed for world-class conventions, pitch floors, and delegate hospitality.
            </p>
          </div>

          {/* Connectivity Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-[#234533] p-6 rounded-2xl border border-[#2F5A43] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#C83B46] text-white flex items-center justify-center">
                <Plane className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-xl font-bold text-white">Air Connectivity</h4>
              <p className="text-sm text-[#A8C2B3]">
                [X] km from Biju Patnaik International Airport (BBI), connecting direct daily flights to Delhi, Mumbai, Bengaluru, Kolkata, and Chennai.
              </p>
            </div>

            <div className="bg-[#234533] p-6 rounded-2xl border border-[#2F5A43] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#D49B4B] text-white flex items-center justify-center">
                <Train className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-xl font-bold text-white">Rail Connectivity</h4>
              <p className="text-sm text-[#A8C2B3]">
                [X] km from Bhubaneswar Railway Station (BBS), major junction on the East Coast Railway route.
              </p>
            </div>

            <div className="bg-[#234533] p-6 rounded-2xl border border-[#2F5A43] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#1B3629] text-white border border-[#3A644D] flex items-center justify-center">
                <Hotel className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-xl font-bold text-white">Partner Hotels &amp; Hospitality</h4>
              <p className="text-sm text-[#A8C2B3]">
                Exclusive delegate rates pre-booked across 5-star and 4-star partner hotels in Bhubaneswar.
              </p>
            </div>
          </div>

          {/* Embedded Map Representation */}
          <div className="bg-[#234533] rounded-3xl p-8 border border-[#2F5A43] text-center space-y-4">
            <MapPin className="w-12 h-12 text-[#C83B46] mx-auto" />
            <h3 className="font-serif text-2xl font-bold text-white">
              Bhubaneswar Convention &amp; Exhibition Hub
            </h3>
            <p className="text-sm text-[#A8C2B3] max-w-lg mx-auto font-serif">
              Full interactive navigation map and shuttle schedules will be emailed to registered delegates prior to 12 March 2027.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}
