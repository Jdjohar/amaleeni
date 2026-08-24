import React, { useState } from 'react';
import { ArrowUpRight, Sparkles, Filter, Briefcase, Factory, Shirt, Laptop, Sprout, Coins } from 'lucide-react';

export default function Opportunities({ onOpenContact }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    { name: 'All', icon: Briefcase },
    { name: 'Manufacturing', icon: Factory },
    { name: 'Textiles & Garments', icon: Shirt },
    { name: 'IT & Digital', icon: Laptop },
    { name: 'Agri & Food Processing', icon: Sprout },
    { name: 'Crafts & Artisans (ODOP)', icon: Coins },
  ];

  const opportunitiesList = [
    {
      id: 1,
      category: 'Manufacturing',
      title: 'Women MSME Industrial Parks',
      location: 'Noida, Kanpur & Lucknow',
      subsidy: '100% Stamp Duty + 25% Capital Grant',
      eligibility: 'Women-owned units with 51%+ shareholding',
      description:
        'Ready plug-and-play factory sheds equipped with 24/7 power, industrial water lines, waste treatment facilities, and onsite daycare centers.',
      tag: 'High Growth',
    },
    {
      id: 2,
      category: 'Textiles & Garments',
      title: 'National Textile Policy 2026',
      location: 'Gorakhpur, Varanasi & Meerut',
      subsidy: '50% Machinery Subsidy + ₹2/unit Power Off-set',
      eligibility: 'New apparel & weaving units',
      description:
        'Capitalize on India’s rich weaving heritage. Get direct wage subsidies for female workers and export logistics support.',
      tag: 'Top Incentive',
    },
    {
      id: 3,
      category: 'IT & Digital',
      title: 'Women Tech Founder Seed Grants',
      location: 'Noida Tech Zone & Lucknow IT City',
      subsidy: '₹20 Lakh Seed Grant + Free Co-Working',
      eligibility: 'Early-stage tech startups led by women founders',
      description:
        'Access government incubators, cloud credits, AWS/Google credits, legal mentorship, and direct pitch sessions with angel investors.',
      tag: 'Innovation',
    },
    {
      id: 4,
      category: 'Agri & Food Processing',
      title: 'Rural Micro-Food Enterprise Scheme',
      location: 'Districts across India',
      subsidy: '35% Credit-Linked Capital Subsidy',
      eligibility: 'Self Help Groups & Women Food Artisans',
      description:
        'Upgrade processing equipment for organic spices, dairy products, pickles, and herbal teas with subsidized bank loans.',
      tag: 'Rural Impact',
    },
    {
      id: 5,
      category: 'Crafts & Artisans (ODOP)',
      title: 'One District One Product (ODOP) Hubs',
      location: 'Bhadohi, Firozabad, Chandausi & Moradabad',
      subsidy: '100% E-Commerce Onboarding + Toolkits',
      eligibility: 'Traditional women artisans & handicraft units',
      description:
        'Scale your heritage craft onto global markets (Amazon, Flipkart, ONDC) with zero listing fees and government export subsidies.',
      tag: 'Heritage',
    },
    {
      id: 6,
      category: 'Manufacturing',
      title: 'Clean Energy & EV Assembly Units',
      location: 'Greater Noida & Ghaziabad Corridor',
      subsidy: '₹1 Crore Cap Incentive + 10-Yr Tax Holiday',
      eligibility: 'EV battery assembly & solar light units',
      description:
        'Pioneer green mobility solutions in India with capital subsidies on machinery and priority land allocation in green industrial zones.',
      tag: 'Future Green',
    },
  ];

  const filteredOpportunities =
    selectedCategory === 'All'
      ? opportunitiesList
      : opportunitiesList.filter((item) => item.category === selectedCategory);

  return (
    <section id="opportunities" className="py-20 bg-[#FAF5EB] relative border-t border-[#E8DCC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C83B46]/10 text-[#C83B46] text-sm font-semibold mb-3">
              <Sparkles className="w-4 h-4" />
              <span>Investment &amp; Growth Hub</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#1B3629]">
              Business Opportunities &amp; Schemes
            </h2>
            <p className="mt-3 text-lg text-[#3D5C4A] font-serif max-w-2xl">
              Explore subsidized industrial schemes, seed capital grants, and dedicated women-founder parks across India.
            </p>
          </div>

          <button
            onClick={onOpenContact}
            className="self-start md:self-auto bg-[#1B3629] hover:bg-[#12251C] text-white px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 shadow-md flex items-center gap-2"
          >
            <span>Custom Scheme Consultation</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-none mb-10">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-[#C83B46] text-white border-[#C83B46] shadow-md'
                    : 'bg-[#F2E8D7] text-[#1B3629] border-[#E2D4BF] hover:bg-[#EAE0CD]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Opportunity Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredOpportunities.map((op) => (
            <div
              key={op.id}
              className="paper-card rounded-3xl p-7 border border-[#E5D7C3] flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-[#1B3629]/10 text-[#1B3629] text-xs font-bold uppercase tracking-wider">
                    {op.category}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#C83B46]/10 text-[#C83B46] text-xs font-bold">
                    {op.tag}
                  </span>
                </div>

                <h3 className="font-serif text-2xl font-bold text-[#1B3629] group-hover:text-[#C83B46] transition-colors">
                  {op.title}
                </h3>

                <p className="text-xs font-medium text-[#7D6B55] mt-1 mb-4 flex items-center gap-1">
                  <span>📍 Location:</span>
                  <span className="text-[#1B3629] font-semibold">{op.location}</span>
                </p>

                <p className="text-sm text-[#4E6B5A] leading-relaxed mb-6 font-serif">
                  {op.description}
                </p>

                <div className="bg-[#FAF5EB] rounded-2xl p-4 border border-[#E2D4BF] space-y-2 mb-6">
                  <div className="text-xs">
                    <span className="font-bold text-[#C83B46]">Subsidy & Benefit: </span>
                    <span className="text-[#1B3629] font-semibold">{op.subsidy}</span>
                  </div>
                  <div className="text-xs">
                    <span className="font-bold text-[#1B3629]">Eligibility: </span>
                    <span className="text-[#3E5C4B]">{op.eligibility}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={onOpenContact}
                className="w-full bg-[#1B3629] hover:bg-[#C83B46] text-white py-3 rounded-full text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Apply for Opportunity</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
