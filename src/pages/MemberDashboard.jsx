import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { createRazorpayOrderApi, RAZORPAY_KEY_ID } from '../services/api';
import {
  Sparkles,
  ShieldCheck,
  CreditCard,
  Lock,
  CheckCircle2,
  AlertCircle,
  Award,
  Users,
  LogOut,
  MapPin,
  MessageSquare,
  Search,
  ChevronRight,
  ArrowLeft,
  Mail,
  Phone,
  Globe,
  Layers,
  Edit3,
  Save,
  ExternalLink,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function MemberDashboard({ onOpenContact }) {
  const { user, isPaidMember, updatePaymentSuccess, updateUserProfile, logout } = useAuth();
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState('');

  // Profile Edit State ("baki fields dashboard andar show hon profile ch")
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileSuccessMsg, setProfileSuccessMsg] = useState(false);
  const [editFormData, setEditFormData] = useState({
    designation: user?.designation || 'Founder / Leader',
    category: user?.category || 'Entrepreneurs & Founders',
    sector: user?.sector || 'Technology & Digital',
    city: user?.city || '',
    email: user?.email && !user?.email.includes('@amaleeni.member') ? user.email : '',
    website_url: user?.website_url || '',
    seeking: user?.seeking || 'Market & Buyer Access, Capital & Investment',
    business_description: user?.business_description || '',
  });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (updateUserProfile) {
      updateUserProfile(editFormData);
    }
    setProfileSuccessMsg(true);
    confetti({ particleCount: 60, spread: 50, origin: { y: 0.8 } });
    setTimeout(() => {
      setIsEditingProfile(false);
      setProfileSuccessMsg(false);
    }, 1200);
  };

  // Navigation levels for State-wise directory explorer:
  // Level 1: selectedState = null, selectedSector = null (Show State Cards)
  // Level 2: selectedState = 'Uttar Pradesh', selectedSector = null (Show Sector Cards for that State)
  // Level 3: selectedState = 'Uttar Pradesh', selectedSector = 'Manufacturing & Engineering' (Show Companies with Search)
  const [selectedState, setSelectedState] = useState(null);
  const [selectedSector, setSelectedSector] = useState(null);
  const [companySearch, setCompanySearch] = useState('');

  // Dynamically load Razorpay checkout script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleRazorpayPayment = async () => {
    setIsProcessingPayment(true);
    setPaymentError('');

    try {
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        throw new Error('Razorpay SDK failed to load. Please check your internet connection.');
      }

      const orderResponse = await createRazorpayOrderApi(user.id);
      
      const options = {
        key: orderResponse.keyId || RAZORPAY_KEY_ID,
        amount: orderResponse.amount || 500000,
        currency: orderResponse.currency || 'INR',
        name: 'Amaleeni Foundation',
        description: 'Pink Pages Annual Membership + AW2027 Pass',
        image: '/assets/logo.png',
        order_id: orderResponse.isMock ? undefined : orderResponse.orderId,
        handler: async function (response) {
          try {
            await updatePaymentSuccess({
              razorpayOrderId: response.razorpay_order_id || orderResponse.orderId,
              razorpayPaymentId: response.razorpay_payment_id || 'pay_mock_' + Date.now(),
              razorpaySignature: response.razorpay_signature || 'sig_mock',
              isMock: Boolean(orderResponse.isMock),
            });
            confetti({
              particleCount: 160,
              spread: 100,
              origin: { y: 0.5 },
            });
          } catch (syncErr) {
            console.error('Sync error:', syncErr);
            setPaymentError('Payment verified locally, but sync notice occurred.');
          }
        },
        prefill: {
          name: user.full_name,
          email: user.email,
          contact: user.phone,
        },
        notes: {
          ref_id: user.ref_id,
          org_name: user.org_name,
        },
        theme: {
          color: '#C83B46',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        setPaymentError(response.error.description || 'Payment was unsuccessful. Please retry.');
      });
      rzp.open();

    } catch (err) {
      console.warn('Razorpay open triggered fallback:', err.message);
      const confirmSimulate = window.confirm(
        'Would you like to simulate a successful ₹5,000 payment to test dashboard feature unlocking?'
      );
      if (confirmSimulate) {
        await updatePaymentSuccess({
          razorpayOrderId: 'order_test_' + Date.now(),
          razorpayPaymentId: 'pay_test_' + Date.now(),
          razorpaySignature: 'sig_test',
          isMock: true,
        });
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.5 },
        });
      }
    } finally {
      setIsProcessingPayment(false);
    }
  };

  // ========================================================
  // COMPREHENSIVE DIRECTORY DATA (State -> Sector -> Companies)
  // ========================================================
  const statesData = [
    {
      id: 'uttar-pradesh',
      name: 'Uttar Pradesh',
      hubs: 'Lucknow, Noida, Kanpur, Varanasi, Agra',
      totalEnterprises: 34,
      sectors: [
        'Manufacturing & Engineering',
        'Agriculture & Agri-Business',
        'Fashion, Textiles & Lifestyle',
        'Healthcare & Life Sciences',
        'Technology & Digital',
        'Food, Hospitality & Tourism',
      ],
    },
    {
      id: 'punjab',
      name: 'Punjab',
      hubs: 'Ludhiana, Amritsar, Mohali, Jalandhar, Patiala',
      totalEnterprises: 28,
      sectors: [
        'Agriculture & Agri-Business',
        'Manufacturing & Engineering',
        'Technology & Digital',
        'Fashion, Textiles & Lifestyle',
        'Logistics & Supply Chain',
      ],
    },
    {
      id: 'delhi-ncr',
      name: 'Delhi NCR',
      hubs: 'New Delhi, Gurugram, Faridabad, Ghaziabad',
      totalEnterprises: 42,
      sectors: [
        'Technology & Digital',
        'Finance & Investment',
        'Legal, Consulting & Professional Services',
        'Media, Arts & Creative Industries',
        'Healthcare & Life Sciences',
      ],
    },
    {
      id: 'maharashtra',
      name: 'Maharashtra',
      hubs: 'Mumbai, Pune, Nagpur, Nashik, Aurangabad',
      totalEnterprises: 39,
      sectors: [
        'Finance & Investment',
        'Manufacturing & Engineering',
        'Beauty, Aesthetics & Wellness',
        'Technology & Digital',
        'Food, Hospitality & Tourism',
      ],
    },
    {
      id: 'gujarat',
      name: 'Gujarat',
      hubs: 'Ahmedabad, Surat, Vadodara, Rajkot',
      totalEnterprises: 31,
      sectors: [
        'Manufacturing & Engineering',
        'Energy & Sustainability',
        'Fashion, Textiles & Lifestyle',
        'Logistics & Supply Chain',
      ],
    },
    {
      id: 'karnataka',
      name: 'Karnataka',
      hubs: 'Bengaluru, Mysuru, Hubballi, Mangaluru',
      totalEnterprises: 36,
      sectors: [
        'Technology & Digital',
        'Science, Research & Innovation',
        'Healthcare & Life Sciences',
        'Beauty, Aesthetics & Wellness',
      ],
    },
    {
      id: 'rajasthan',
      name: 'Rajasthan',
      hubs: 'Jaipur, Jodhpur, Udaipur, Kota',
      totalEnterprises: 24,
      sectors: [
        'Fashion, Textiles & Lifestyle',
        'Food, Hospitality & Tourism',
        'Media, Arts & Creative Industries',
        'Energy & Sustainability',
      ],
    },
    {
      id: 'tamil-nadu',
      name: 'Tamil Nadu',
      hubs: 'Chennai, Coimbatore, Madurai, Tiruchirappalli',
      totalEnterprises: 29,
      sectors: [
        'Manufacturing & Engineering',
        'Technology & Digital',
        'Fashion, Textiles & Lifestyle',
        'Healthcare & Life Sciences',
      ],
    },
  ];

  // Base Companies List
  const allCompanies = [
    // --- UTTAR PRADESH ---
    {
      id: 1,
      name: 'Awadh Precision Engineering Works',
      founder: 'Sunita Agrawal (Founder & MD)',
      category: 'MSME & Industry Leader',
      state: 'Uttar Pradesh',
      sector: 'Manufacturing & Engineering',
      email: 'sunita@awadhprecision.com',
      phone: '+91 98390 12345',
      address: 'Plot 42, Industrial Area, Amausi, Lucknow, Uttar Pradesh - 226008',
      website: 'https://awadhprecision.com',
      seeking: 'Tier-1 automotive OEM buyers, CNC machining contracts & export linkages.',
    },
    {
      id: 2,
      name: 'Noida Advanced Moldings Pvt Ltd',
      founder: 'Radhika Sen (Co-Founder)',
      category: 'MSME & Industry Leader',
      state: 'Uttar Pradesh',
      sector: 'Manufacturing & Engineering',
      email: 'radhika@noidamoldings.in',
      phone: '+91 98112 34567',
      address: 'Sector 62, Electronic City, Noida, Uttar Pradesh - 201309',
      website: 'https://noidamoldings.in',
      seeking: 'Corporate vendor onboarding, injection molding supply chain contracts.',
    },
    {
      id: 3,
      name: 'Ganga Organics & Herbals',
      founder: 'Meera Tripathi (Proprietor)',
      category: 'Entrepreneurs & Founders',
      state: 'Uttar Pradesh',
      sector: 'Agriculture & Agri-Business',
      email: 'meera@gangaorganics.org',
      phone: '+91 94501 88921',
      address: 'Naini Agriculture Cluster, Prayagraj, Uttar Pradesh - 211008',
      website: 'https://gangaorganics.org',
      seeking: 'Retail distributor network across North India, agro-export certifications.',
    },
    {
      id: 4,
      name: 'Awadh Honey & Agro Processing',
      founder: 'Shabana Parveen (Founder)',
      category: 'Startups & Innovators',
      state: 'Uttar Pradesh',
      sector: 'Agriculture & Agri-Business',
      email: 'shabana@awadhhoney.com',
      phone: '+91 91290 44551',
      address: 'Kisan Mandi Link Road, Barabanki, Uttar Pradesh - 225001',
      website: 'https://awadhhoney.com',
      seeking: 'B2B institutional bulk honey packaging contracts and FMCG tie-ups.',
    },
    {
      id: 5,
      name: 'Chikankari Heritage Crafts',
      founder: 'Begum Ruksana & Ananya Rastogi',
      category: 'Creators & Leaders',
      state: 'Uttar Pradesh',
      sector: 'Fashion, Textiles & Lifestyle',
      email: 'ruksana@chikankariheritage.in',
      phone: '+91 98399 77123',
      address: 'Chowk Heritage Lane, Old Lucknow, Uttar Pradesh - 226003',
      website: 'https://chikankariheritage.in',
      seeking: 'Global fashion label tie-ups, boutique retail buyers in UK and Middle East.',
    },
    {
      id: 6,
      name: 'Bhadohi Handloom Rugs & Carpets',
      founder: 'Pooja Jaiswal (Managing Partner)',
      category: 'MSME & Industry Leader',
      state: 'Uttar Pradesh',
      sector: 'Fashion, Textiles & Lifestyle',
      email: 'pooja@bhadohirugs.co.in',
      phone: '+91 94152 66789',
      address: 'Carpet City Industrial Complex, Bhadohi, Uttar Pradesh - 221401',
      website: 'https://bhadohirugs.co.in',
      seeking: 'Hotel and interior design corporate buyers, US and EU export channels.',
    },
    {
      id: 7,
      name: 'Sanjeevani Wellness Labs',
      founder: 'Dr. Madhavi Shukla (Chief Scientific Officer)',
      category: 'Professionals',
      state: 'Uttar Pradesh',
      sector: 'Healthcare & Life Sciences',
      email: 'madhavi@sanjeevanilabs.com',
      phone: '+91 99350 44321',
      address: 'Medical Enclave, Swaroop Nagar, Kanpur, Uttar Pradesh - 208002',
      website: 'https://sanjeevanilabs.com',
      seeking: 'Diagnostic chain partnerships, angel investment for automated pathology gear.',
    },
    {
      id: 8,
      name: 'CloudMinds IT Solutions',
      founder: 'Shruti Saxena (CEO)',
      category: 'Startups & Innovators',
      state: 'Uttar Pradesh',
      sector: 'Technology & Digital',
      email: 'shruti@cloudminds.io',
      phone: '+91 98990 11223',
      address: 'Tower B, Logix Cyber Park, Sector 62, Noida, Uttar Pradesh - 201301',
      website: 'https://cloudminds.io',
      seeking: 'Enterprise SaaS clients, Series A funding for AI document workflow engine.',
    },
    {
      id: 9,
      name: 'Braj Bhumi Agro Foods',
      founder: 'Kusum Lata Sharma (Director)',
      category: 'Entrepreneurs & Founders',
      state: 'Uttar Pradesh',
      sector: 'Food, Hospitality & Tourism',
      email: 'kusum@brajfoods.com',
      phone: '+91 97600 33445',
      address: 'Industrial Area, Mathura Road, Mathura, Uttar Pradesh - 281001',
      website: 'https://brajfoods.com',
      seeking: 'QSR restaurant chain supplier tie-ups and railway catering vendor empanelment.',
    },

    // --- PUNJAB ---
    {
      id: 10,
      name: 'GreenFields Organic Farms',
      founder: 'Harpreet Kaur Gill (Managing Director)',
      category: 'MSME & Industry Leader',
      state: 'Punjab',
      sector: 'Agriculture & Agri-Business',
      email: 'harpreet@greenfieldsorganic.com',
      phone: '+91 98140 12345',
      address: 'GT Road Agro Cluster, Ludhiana, Punjab - 141001',
      website: 'https://greenfieldsorganic.com',
      seeking: 'Direct retail contracts with superstores and food processing conglomerates.',
    },
    {
      id: 11,
      name: 'Malwa Auto Components',
      founder: 'Jasleen Cheema (Technical Director)',
      category: 'MSME & Industry Leader',
      state: 'Punjab',
      sector: 'Manufacturing & Engineering',
      email: 'jasleen@malwaauto.in',
      phone: '+91 98722 88990',
      address: 'Focal Point, Phase V, Jalandhar, Punjab - 144004',
      website: 'https://malwaauto.in',
      seeking: 'Tier-2 tractor and heavy machinery component orders.',
    },
    {
      id: 12,
      name: 'Mohali Quantum Tech Labs',
      founder: 'Simranjeet Kaur (Founder)',
      category: 'Startups & Innovators',
      state: 'Punjab',
      sector: 'Technology & Digital',
      email: 'simran@quantumtechlabs.io',
      phone: '+91 98881 77665',
      address: 'QuarkCity SEZ, Phase 8B, Industrial Area, Mohali, Punjab - 160071',
      website: 'https://quantumtechlabs.io',
      seeking: 'Fintech client contracts and angel investment.',
    },

    // --- DELHI NCR ---
    {
      id: 13,
      name: 'FemInnovate HealthTech Solutions',
      founder: 'Dr. Ananya Roy & Neha Kapoor',
      category: 'Startups & Innovators',
      state: 'Delhi NCR',
      sector: 'Technology & Digital',
      email: 'ananya@feminnovate.tech',
      phone: '+91 98101 22334',
      address: 'Okhla Industrial Area, Phase III, New Delhi - 110020',
      website: 'https://feminnovate.tech',
      seeking: 'Hospital group tie-ups and institutional health venture funds.',
    },
    {
      id: 14,
      name: 'Athena Corporate Legal Advisors',
      founder: 'Adv. Manisha Bhardwaj (Managing Partner)',
      category: 'Professionals',
      state: 'Delhi NCR',
      sector: 'Legal, Consulting & Professional Services',
      email: 'manisha@athenalegal.in',
      phone: '+91 98110 99887',
      address: 'Barakhamba Road, Connaught Place, New Delhi - 110001',
      website: 'https://athenalegal.in',
      seeking: 'Cross-border M&A advisory mandates and startup compliance retainers.',
    },

    // --- MAHARASHTRA ---
    {
      id: 15,
      name: 'Sahyadri Precision Forgings',
      founder: 'Vaishali Patil (Director)',
      category: 'MSME & Industry Leader',
      state: 'Maharashtra',
      sector: 'Manufacturing & Engineering',
      email: 'vaishali@sahyadriforgings.com',
      phone: '+91 98220 55667',
      address: 'Bhosari Industrial Estate, Pune, Maharashtra - 411026',
      website: 'https://sahyadriforgings.com',
      seeking: 'Aerospace and defense machining supply contracts.',
    },
    {
      id: 16,
      name: 'Nirvana Botanical Skincare',
      founder: 'Tara Deshpande (Founder)',
      category: 'Entrepreneurs & Founders',
      state: 'Maharashtra',
      sector: 'Beauty, Aesthetics & Wellness',
      email: 'tara@nirvanabotanicals.com',
      phone: '+91 98200 44332',
      address: 'Bandra West, Mumbai, Maharashtra - 400050',
      website: 'https://nirvanabotanicals.com',
      seeking: 'Luxury salon chains and modern trade department store shelf space.',
    },

    // --- GUJARAT ---
    {
      id: 17,
      name: 'SolarShakti Renewables Ltd',
      founder: 'Bhavna Patel (Managing Director)',
      category: 'MSME & Industry Leader',
      state: 'Gujarat',
      sector: 'Energy & Sustainability',
      email: 'bhavna@solarshakti.in',
      phone: '+91 98250 11223',
      address: 'Sanand Industrial Park, Ahmedabad, Gujarat - 382110',
      website: 'https://solarshakti.in',
      seeking: 'Rooftop solar commercial project contracts and green financing.',
    },

    // --- KARNATAKA ---
    {
      id: 18,
      name: 'BioVeda Genomics Labs',
      founder: 'Dr. Lakshmi Narayanan (Principal Scientist)',
      category: 'Professionals',
      state: 'Karnataka',
      sector: 'Healthcare & Life Sciences',
      email: 'lakshmi@biovedagenomics.com',
      phone: '+91 98450 66778',
      address: 'Electronic City Phase 1, Bengaluru, Karnataka - 560100',
      website: 'https://biovedagenomics.com',
      seeking: 'Clinical trial research partnerships and venture debt.',
    },
  ];

  // If the logged in user has an enterprise, dynamically include them in the directory
  const currentEnterprise = user.org_name
    ? {
        id: 'current-user',
        name: user.org_name,
        founder: `${user.full_name} (Founder / Leader)`,
        category: user.category || 'Entrepreneurs & Founders',
        state: user.state_country || 'Uttar Pradesh',
        sector: user.sector || 'Technology & Digital',
        email: user.email,
        phone: user.phone,
        address: `${user.city || 'Lucknow'}, ${user.state_country || 'Uttar Pradesh'}`,
        website: user.website_url || 'https://amaleeni.org',
        seeking: user.seeking || 'Capital & Investment, Market Access',
        isCurrentUser: true,
      }
    : null;

  const combinedCompanies = currentEnterprise
    ? [currentEnterprise, ...allCompanies]
    : allCompanies;

  // Selected State object
  const currentStateObj = statesData.find((s) => s.name === selectedState);

  // Filtered companies based on State + Sector + Search Term
  const displayedCompanies = combinedCompanies.filter((comp) => {
    const matchState = !selectedState || comp.state.toLowerCase() === selectedState.toLowerCase();
    const matchSector = !selectedSector || comp.sector.toLowerCase() === selectedSector.toLowerCase();
    const matchSearch =
      !companySearch ||
      comp.name.toLowerCase().includes(companySearch.toLowerCase()) ||
      comp.founder.toLowerCase().includes(companySearch.toLowerCase()) ||
      comp.address.toLowerCase().includes(companySearch.toLowerCase()) ||
      comp.email.toLowerCase().includes(companySearch.toLowerCase()) ||
      comp.phone.includes(companySearch);

    return matchState && matchSector && matchSearch;
  });

  return (
    <div className="paper-texture min-h-screen pt-28 sm:pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Header / Welcome Banner */}
        <div className="bg-[#FAF5EB] rounded-3xl p-6 sm:p-8 border border-[#E5D7C3] shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#C83B46]">
                Member Portal
              </span>
              <span className="text-xs text-[#7A6750]">•</span>
              <span className="text-xs font-mono font-bold text-[#1B3629] bg-[#F2E8D7] px-2.5 py-0.5 rounded-full border border-[#E0D2BC]">
                Ref: {user.ref_id || 'PP-MEMBER'}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#1B3629]">
              Welcome, {user.full_name}
            </h1>

            <p className="text-sm text-[#4E6B5A] font-serif">
              {user.org_name} • {user.sector} • {user.city || 'India'}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 self-start md:self-center">
            {onOpenContact && (
              <button
                onClick={onOpenContact}
                className="inline-flex items-center gap-1.5 bg-[#F2E8D7] hover:bg-[#E5D7C3] text-[#1B3629] px-4 py-2.5 rounded-full text-xs font-bold border border-[#D9C7AF] transition-colors cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#C83B46]" />
                <span>Support Desk</span>
              </button>
            )}

            <button
              onClick={logout}
              className="inline-flex items-center gap-1.5 bg-[#1B3629] hover:bg-[#12251C] text-white px-5 py-2.5 rounded-full text-xs font-bold transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* PAYMENT PENDING BANNER & RAZORPAY CTA */}
        {!isPaidMember ? (
          <div className="bg-gradient-to-br from-[#FAF5EB] to-[#F7EFE1] rounded-3xl p-6 sm:p-10 border-2 border-[#C83B46] shadow-xl space-y-6 animate-fadeIn">
            
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#E5D7C3]">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C83B46]/10 text-[#C83B46] text-xs font-bold uppercase tracking-wider">
                  <AlertCircle className="w-4 h-4 text-[#C83B46]" />
                  <span>Activation Required • ₹5,000 Annual Fee</span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1B3629]">
                  Activate your Pink Pages Membership
                </h2>

                <p className="text-sm text-[#4E6B5A] font-serif leading-relaxed">
                  Your registration profile is saved. Complete your ₹5,000 annual membership fee via Razorpay to unlock your state-wise directory listing, sector matchmaking, and company contacts.
                </p>
              </div>

              {/* Razorpay Pay Button */}
              <div className="text-center lg:text-right shrink-0">
                <button
                  onClick={handleRazorpayPayment}
                  disabled={isProcessingPayment}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#C83B46] hover:bg-[#A82B36] text-white px-8 py-4 rounded-full text-base font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer border-2 border-white/20"
                >
                  <CreditCard className="w-5 h-5" />
                  <span>{isProcessingPayment ? 'Opening Razorpay...' : 'Pay ₹5,000 with Razorpay'}</span>
                </button>
                <p className="text-[11px] text-[#7A6750] mt-2 font-medium">
                  Instant activation via UPI, Cards, NetBanking, or EMI
                </p>
              </div>
            </div>

            {paymentError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                <span>{paymentError}</span>
              </div>
            )}

            {/* What unlocks upon payment */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#FAF5EB] p-4 rounded-2xl border border-[#E5D7C3] flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#C83B46]/10 text-[#C83B46] flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1B3629]">State-wise Directory</p>
                  <p className="text-[11px] text-[#4E6B5A]">Access all states, sectors and verified business profiles.</p>
                </div>
              </div>

              <div className="bg-[#FAF5EB] p-4 rounded-2xl border border-[#E5D7C3] flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#D49B4B]/20 text-[#D49B4B] flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1B3629]">AW 2027 Summit Pass</p>
                  <p className="text-[11px] text-[#4E6B5A]">Complimentary Early Bird summit access included.</p>
                </div>
              </div>

              <div className="bg-[#FAF5EB] p-4 rounded-2xl border border-[#E5D7C3] flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#1B3629]/10 text-[#1B3629] flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1B3629]">Full Contact Details</p>
                  <p className="text-[11px] text-[#4E6B5A]">Emails, phone numbers, addresses &amp; direct messaging.</p>
                </div>
              </div>
            </div>

          </div>
        ) : (
          /* PAYMENT CONFIRMED / ACTIVE MEMBER BADGE (Clean banner, no print button) */
          <div className="bg-gradient-to-br from-[#1B3629] to-[#13281E] text-white rounded-3xl p-6 sm:p-7 border border-[#D49B4B]/40 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 animate-fadeIn">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#2E7D32] text-white flex items-center justify-center shadow-lg shrink-0">
                <ShieldCheck className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#2E7D32]/40 border border-[#2E7D32] text-xs font-bold uppercase tracking-wider text-[#A5D6A7]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#81C784]" />
                  <span>Annual Fee Paid (₹5,000) • Verified Member</span>
                </div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  Pink Pages Directory &amp; Sector Network Active
                </h2>
                <p className="text-xs text-[#A8C2B3]">
                  Paid Reference: {user.ref_id} • All State &amp; Sector Directories Unlocked
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 bg-[#FAF5EB]/10 border border-[#FAF5EB]/20 text-[#FAF5EB] px-4 py-2 rounded-2xl text-xs font-semibold">
              <span>Status: Active &amp; Searchable</span>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* STATE-WISE DIRECTORY EXPLORER & COMPANY PROFILES        */}
        {/* ======================================================== */}
        <div className="bg-[#FAF5EB] rounded-3xl p-6 sm:p-10 border border-[#E5D7C3] shadow-lg space-y-6">
          
          {/* Breadcrumb Navigation & Back Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5D7C3] pb-5">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-serif">
              <button
                onClick={() => {
                  setSelectedState(null);
                  setSelectedSector(null);
                  setCompanySearch('');
                }}
                className={`font-bold transition-colors cursor-pointer ${
                  !selectedState ? 'text-[#C83B46] text-base font-bold' : 'text-[#7A6750] hover:text-[#1B3629]'
                }`}
              >
                All States
              </button>

              {selectedState && (
                <>
                  <ChevronRight className="w-3.5 h-3.5 text-[#A89884]" />
                  <button
                    onClick={() => {
                      setSelectedSector(null);
                      setCompanySearch('');
                    }}
                    className={`font-bold transition-colors cursor-pointer ${
                      !selectedSector ? 'text-[#C83B46] text-base' : 'text-[#7A6750] hover:text-[#1B3629]'
                    }`}
                  >
                    {selectedState}
                  </button>
                </>
              )}

              {selectedSector && (
                <>
                  <ChevronRight className="w-3.5 h-3.5 text-[#A89884]" />
                  <span className="text-[#C83B46] font-bold text-base">
                    {selectedSector}
                  </span>
                </>
              )}
            </div>

            {/* Back button */}
            {selectedSector ? (
              <button
                onClick={() => {
                  setSelectedSector(null);
                  setCompanySearch('');
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1B3629] bg-[#F2E8D7] hover:bg-[#E5D7C3] px-3.5 py-1.5 rounded-full border border-[#D9C7AF] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Sectors</span>
              </button>
            ) : selectedState ? (
              <button
                onClick={() => {
                  setSelectedState(null);
                  setSelectedSector(null);
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1B3629] bg-[#F2E8D7] hover:bg-[#E5D7C3] px-3.5 py-1.5 rounded-full border border-[#D9C7AF] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to States</span>
              </button>
            ) : null}
          </div>

          {/* ======================================================== */}
          {/* LEVEL 1: STATE CARDS                                      */}
          {/* ======================================================== */}
          {!selectedState && (
            <div className="space-y-6 animate-fadeIn">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C83B46]">
                  Directory Level 1
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#1B3629]">
                  Select a State to View Sectors
                </h3>
                <p className="text-xs sm:text-sm text-[#5A7B68] font-serif">
                  Click any state card to explore registered women-led enterprises, manufacturing units, and professional practices.
                </p>
              </div>

              {!isPaidMember ? (
                <div className="p-8 rounded-2xl bg-[#F5EFE4] border-2 border-dashed border-[#D49B4B] text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#FAF5EB] text-[#C83B46] mx-auto flex items-center justify-center shadow-sm">
                    <Lock className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-[#1B3629]">
                    State-wise Directory Locked
                  </h4>
                  <p className="text-xs text-[#4E6B5A] font-serif max-w-md mx-auto">
                    Complete your annual membership payment (₹5,000) to open state directory cards and explore company profiles.
                  </p>
                  <button
                    onClick={handleRazorpayPayment}
                    className="inline-flex items-center gap-1.5 bg-[#C83B46] hover:bg-[#A82B36] text-white px-6 py-2.5 rounded-full text-xs font-bold shadow-md cursor-pointer"
                  >
                    <span>Pay ₹5,000 with Razorpay</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {statesData.map((st) => (
                    <div
                      key={st.id}
                      onClick={() => setSelectedState(st.name)}
                      className="bg-[#F2E8D7] hover:bg-[#EBE0CD] p-5 rounded-2xl border border-[#E0D2BC] hover:border-[#C83B46] shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="w-10 h-10 rounded-xl bg-[#1B3629] text-[#D49B4B] flex items-center justify-center font-serif text-lg font-bold group-hover:bg-[#C83B46] group-hover:text-white transition-colors">
                            <MapPin className="w-5 h-5" />
                          </div>
                          <span className="text-[11px] font-bold bg-[#FAF5EB] text-[#1B3629] px-2.5 py-0.5 rounded-full border border-[#E0D2BC]">
                            {st.totalEnterprises}+ Profiles
                          </span>
                        </div>

                        <h4 className="font-serif text-xl font-bold text-[#1B3629] group-hover:text-[#C83B46] transition-colors">
                          {st.name}
                        </h4>

                        <p className="text-xs text-[#5A7B68] font-sans">
                          {st.hubs}
                        </p>
                      </div>

                      <div className="mt-5 pt-3 border-t border-[#E0D2BC] flex items-center justify-between text-xs font-semibold text-[#1B3629]">
                        <span>{st.sectors.length} Key Sectors</span>
                        <span className="text-[#C83B46] group-hover:translate-x-1 transition-transform inline-flex items-center">
                          View →
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ======================================================== */}
          {/* LEVEL 2: SECTORS FOR SELECTED STATE                       */}
          {/* ======================================================== */}
          {selectedState && !selectedSector && (
            <div className="space-y-6 animate-fadeIn">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C83B46]">
                  Directory Level 2 • {selectedState}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#1B3629]">
                  Select a Sector in {selectedState}
                </h3>
                <p className="text-xs sm:text-sm text-[#5A7B68] font-serif">
                  Click any sector card to view registered companies, founders, emails, addresses, and phone numbers.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {(currentStateObj?.sectors || [
                  'Manufacturing & Engineering',
                  'Agriculture & Agri-Business',
                  'Technology & Digital',
                  'Healthcare & Life Sciences',
                  'Fashion, Textiles & Lifestyle',
                  'Food, Hospitality & Tourism',
                ]).map((sec, idx) => {
                  const compCount = combinedCompanies.filter(
                    (c) => c.state.toLowerCase() === selectedState.toLowerCase() && c.sector.toLowerCase() === sec.toLowerCase()
                  ).length;

                  return (
                    <div
                      key={idx}
                      onClick={() => setSelectedSector(sec)}
                      className="bg-[#F2E8D7] hover:bg-[#EBE0CD] p-5 rounded-2xl border border-[#E0D2BC] hover:border-[#C83B46] shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="w-10 h-10 rounded-xl bg-[#1B3629]/10 text-[#1B3629] group-hover:bg-[#C83B46] group-hover:text-white flex items-center justify-center transition-colors">
                            <Layers className="w-5 h-5" />
                          </div>
                          <span className="text-[11px] font-bold bg-[#FAF5EB] text-[#C83B46] px-2.5 py-0.5 rounded-full border border-[#E0D2BC]">
                            {compCount > 0 ? `${compCount} Listed` : 'Open'}
                          </span>
                        </div>

                        <h4 className="font-serif text-lg font-bold text-[#1B3629] group-hover:text-[#C83B46] transition-colors">
                          {sec}
                        </h4>

                        <p className="text-xs text-[#5A7B68] font-serif">
                          Verified women enterprises, manufacturers and practitioners in {selectedState}.
                        </p>
                      </div>

                      <div className="mt-5 pt-3 border-t border-[#E0D2BC] flex items-center justify-between text-xs font-semibold text-[#1B3629]">
                        <span>Browse Profiles</span>
                        <ChevronRight className="w-4 h-4 text-[#C83B46] group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* LEVEL 3: COMPANY PROFILES WITH SEARCH                     */}
          {/* ======================================================== */}
          {selectedState && selectedSector && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Header & Search Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#C83B46]">
                    Directory Level 3 • {selectedState} • {selectedSector}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#1B3629]">
                    Company Profiles ({displayedCompanies.length})
                  </h3>
                </div>

                {/* Live Search Input */}
                <div className="relative w-full sm:w-80">
                  <input
                    type="text"
                    placeholder="Search by Company, Email, Phone..."
                    value={companySearch}
                    onChange={(e) => setCompanySearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#F2E8D7] border border-[#E0D2BC] text-xs text-[#1B3629] focus:outline-none focus:ring-2 focus:ring-[#C83B46]"
                  />
                  <Search className="w-4 h-4 text-[#7A6750] absolute left-3 top-3" />
                  {companySearch && (
                    <button
                      onClick={() => setCompanySearch('')}
                      className="text-xs text-[#7A6750] hover:text-[#1B3629] absolute right-3 top-2.5 font-bold"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Companies List / Grid */}
              {displayedCompanies.length === 0 ? (
                <div className="p-12 text-center bg-[#F2E8D7]/60 rounded-2xl border border-dashed border-[#D9C7AF] space-y-3">
                  <p className="text-sm font-serif text-[#7A6750]">
                    No company profiles match your current search query.
                  </p>
                  <button
                    onClick={() => setCompanySearch('')}
                    className="text-xs text-[#C83B46] font-bold underline cursor-pointer"
                  >
                    Clear search filter
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {displayedCompanies.map((comp) => (
                    <div
                      key={comp.id}
                      className="bg-[#FAF5EB] rounded-2xl p-5 sm:p-6 border border-[#E5D7C3] hover:border-[#D49B4B] shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-3">
                        
                        {/* Company Name & Category Badge */}
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-serif text-xl font-bold text-[#1B3629]">
                                {comp.name}
                              </h4>
                              {comp.isCurrentUser && (
                                <span className="text-[10px] font-bold bg-[#C83B46] text-white px-2 py-0.5 rounded-full">
                                  Your Enterprise
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-[#7A6750] font-medium mt-0.5">
                              {comp.founder}
                            </p>
                          </div>

                          <span className="text-[10px] font-bold uppercase tracking-wider bg-[#1B3629] text-[#FAF5EB] px-2.5 py-1 rounded-full shrink-0">
                            {comp.category}
                          </span>
                        </div>

                        {/* Contact Details Breakdown (Email, Phone, Address) */}
                        <div className="space-y-2 pt-2 border-t border-[#EAE0D0] text-xs text-[#3E5C4B]">
                          
                          {/* Address */}
                          <div className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 text-[#C83B46] shrink-0 mt-0.5" />
                            <span className="leading-snug">{comp.address}</span>
                          </div>

                          {/* Email */}
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-[#D49B4B] shrink-0" />
                            <a
                              href={`mailto:${comp.email}`}
                              className="text-[#1B3629] hover:text-[#C83B46] hover:underline font-medium"
                            >
                              {comp.email}
                            </a>
                          </div>

                          {/* Phone / WhatsApp */}
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-[#2E7D32] shrink-0" />
                            <a
                              href={`tel:${comp.phone}`}
                              className="text-[#1B3629] hover:text-[#C83B46] hover:underline font-mono font-bold"
                            >
                              {comp.phone}
                            </a>
                            <a
                              href={`https://wa.me/${comp.phone.replace(/[^0-9]/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[10px] text-[#2E7D32] font-bold bg-[#E8F5E9] px-2 py-0.5 rounded-md hover:underline"
                            >
                              WhatsApp
                            </a>
                          </div>

                          {/* Website */}
                          {comp.website && (
                            <div className="flex items-center gap-2">
                              <Globe className="w-4 h-4 text-[#7A6750] shrink-0" />
                              <a
                                href={comp.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#7A6750] hover:text-[#1B3629] underline truncate max-w-xs"
                              >
                                {comp.website}
                              </a>
                            </div>
                          )}

                        </div>

                        {/* What they are seeking / products summary */}
                        <div className="bg-[#F2E8D7] p-3 rounded-xl border border-[#E0D2BC] text-[11px] text-[#4E6B5A] leading-relaxed">
                          <span className="font-bold text-[#1B3629] block mb-0.5">Seeking / Capabilities:</span>
                          <span>{comp.seeking}</span>
                        </div>

                      </div>

                      {/* Action Buttons */}
                      <div className="pt-2 flex items-center justify-between gap-2 border-t border-[#EAE0D0]">
                        <a
                          href={`mailto:${comp.email}?subject=Pink Pages Collaboration Inquiry - From ${user.full_name}`}
                          className="w-full inline-flex items-center justify-center gap-1.5 bg-[#C83B46] hover:bg-[#A82B36] text-white py-2 rounded-xl text-xs font-bold transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Send Collaboration Inquiry</span>
                        </a>
                      </div>

                    </div>
                  ))}
                </div>
              )}

            </div>
          )}

        </div>

        {/* Profile Overview & Directory Settings Card ("baki fields dashboard andar show hon profile ch") */}
        <div className="bg-[#FAF5EB] rounded-3xl p-6 sm:p-8 border border-[#E5D7C3] shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5D7C3] pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#C83B46]">
                  Directory Membership
                </span>
                <span className="text-xs text-[#7A6750]">•</span>
                <span className="text-xs font-mono font-bold text-[#1B3629]">
                  {user.ref_id || 'PP-MEMBER'}
                </span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#1B3629]">
                Your Pink Pages Enterprise Profile
              </h3>
              <p className="text-xs text-[#5A7B68] font-serif">
                Manage your directory visibility, industry sector, business overview, and collaboration preferences.
              </p>
            </div>

            <button
              onClick={() => setIsEditingProfile(!isEditingProfile)}
              className="inline-flex items-center gap-1.5 self-start sm:self-center bg-[#F2E8D7] hover:bg-[#E5D7C3] text-[#1B3629] px-4 py-2 rounded-full text-xs font-bold border border-[#D9C7AF] transition-colors cursor-pointer"
            >
              {isEditingProfile ? (
                <>
                  <X className="w-3.5 h-3.5 text-[#C83B46]" />
                  <span>Close Editor</span>
                </>
              ) : (
                <>
                  <Edit3 className="w-3.5 h-3.5 text-[#C83B46]" />
                  <span>Edit Profile Details</span>
                </>
              )}
            </button>
          </div>

          {/* EDIT PROFILE FORM */}
          {isEditingProfile ? (
            <form onSubmit={handleSaveProfile} className="space-y-4 bg-[#F2E8D7]/60 p-5 rounded-2xl border border-[#E0D2BC]">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-[#1B3629] uppercase tracking-wider">
                  Update Directory Fields
                </h4>
                {profileSuccessMsg && (
                  <span className="text-xs text-green-700 font-bold bg-green-100 px-3 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Profile Updated Successfully!
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-[#1B3629] mb-1">Designation / Role</label>
                  <input
                    type="text"
                    value={editFormData.designation}
                    onChange={(e) => setEditFormData({ ...editFormData, designation: e.target.value })}
                    placeholder="e.g. Founder & CEO"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E0D2BC] text-sm text-[#1B3629] focus:outline-none focus:ring-2 focus:ring-[#C83B46]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#1B3629] mb-1">Primary Industry Sector</label>
                  <select
                    value={editFormData.sector}
                    onChange={(e) => setEditFormData({ ...editFormData, sector: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E0D2BC] text-xs sm:text-sm text-[#1B3629]"
                  >
                    {[
                      'Manufacturing & Engineering',
                      'Agriculture & Agri-Business',
                      'Technology & Digital',
                      'Healthcare & Life Sciences',
                      'Beauty, Aesthetics & Wellness',
                      'Education & Skill Development',
                      'Finance & Investment',
                      'Fashion, Textiles & Lifestyle',
                      'Food, Hospitality & Tourism',
                      'Infrastructure & Real Estate',
                      'Energy & Sustainability',
                      'Logistics & Supply Chain',
                      'Legal, Consulting & Professional Services',
                      'Media, Arts & Creative Industries',
                      'Sports & Fitness',
                      'Social Impact & Development',
                    ].map((sec) => (
                      <option key={sec} value={sec}>
                        {sec}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#1B3629] mb-1">Category</label>
                  <select
                    value={editFormData.category}
                    onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E0D2BC] text-xs sm:text-sm text-[#1B3629]"
                  >
                    <option value="Entrepreneurs & Founders">Entrepreneurs &amp; Founders</option>
                    <option value="MSME & Industry Leaders">MSME &amp; Industry Leaders</option>
                    <option value="Professionals">Professionals</option>
                    <option value="Investors">Investors</option>
                    <option value="Startups & Innovators">Startups &amp; Innovators</option>
                    <option value="Creators & Leaders">Creators &amp; Leaders</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#1B3629] mb-1">Official Email Address</label>
                  <input
                    type="email"
                    value={editFormData.email}
                    onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                    placeholder="contact@yourcompany.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E0D2BC] text-sm text-[#1B3629] focus:outline-none focus:ring-2 focus:ring-[#C83B46]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#1B3629] mb-1">Website / LinkedIn URL</label>
                  <input
                    type="url"
                    value={editFormData.website_url}
                    onChange={(e) => setEditFormData({ ...editFormData, website_url: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E0D2BC] text-sm text-[#1B3629] focus:outline-none focus:ring-2 focus:ring-[#C83B46]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#1B3629] mb-1">City / Region</label>
                  <input
                    type="text"
                    value={editFormData.city}
                    onChange={(e) => setEditFormData({ ...editFormData, city: e.target.value })}
                    placeholder="e.g. Lucknow, UP"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E0D2BC] text-sm text-[#1B3629] focus:outline-none focus:ring-2 focus:ring-[#C83B46]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#1B3629] mb-1 text-xs">
                  What opportunities are you seeking on Pink Pages?
                </label>
                <input
                  type="text"
                  value={editFormData.seeking}
                  onChange={(e) => setEditFormData({ ...editFormData, seeking: e.target.value })}
                  placeholder="e.g. Capital & Investment, Buyer Access, Corporate Supply Chains"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E0D2BC] text-sm text-[#1B3629] focus:outline-none focus:ring-2 focus:ring-[#C83B46]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#1B3629] mb-1 text-xs">
                  Business / Practice Overview (Products, services, and collaboration areas)
                </label>
                <textarea
                  rows={2}
                  value={editFormData.business_description}
                  onChange={(e) => setEditFormData({ ...editFormData, business_description: e.target.value })}
                  placeholder="Write a brief overview of what your enterprise delivers..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E0D2BC] text-sm text-[#1B3629] focus:outline-none focus:ring-2 focus:ring-[#C83B46]"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 bg-[#C83B46] hover:bg-[#A82B36] text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-md cursor-pointer transition-colors"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Profile Details</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(false)}
                  className="text-xs text-[#7A6750] hover:text-[#1B3629] underline cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            /* VIEW PROFILE DETAILS */
            <div className="space-y-6">
              {/* Row 1: Core Registered Info */}
              <div>
                <span className="text-[10px] font-bold text-[#7A6750] uppercase tracking-wider block mb-2">
                  1. Core Registration Credentials
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs text-[#3E5C4B]">
                  <div className="bg-[#F2E8D7] p-3.5 rounded-xl border border-[#E0D2BC]">
                    <span className="font-bold text-[#1B3629] block uppercase text-[10px] text-[#7A6750]">Full Name</span>
                    <span className="text-sm font-serif font-bold text-[#1B3629]">{user.full_name}</span>
                  </div>

                  <div className="bg-[#F2E8D7] p-3.5 rounded-xl border border-[#E0D2BC]">
                    <span className="font-bold text-[#1B3629] block uppercase text-[10px] text-[#7A6750]">Organisation</span>
                    <span className="text-sm font-serif font-bold text-[#1B3629]">{user.org_name || 'Not provided'}</span>
                  </div>

                  <div className="bg-[#F2E8D7] p-3.5 rounded-xl border border-[#E0D2BC]">
                    <span className="font-bold text-[#1B3629] block uppercase text-[10px] text-[#7A6750]">Designation</span>
                    <span className="text-sm font-serif font-bold text-[#1B3629]">{user.designation || 'Founder / Leader'}</span>
                  </div>

                  <div className="bg-[#F2E8D7] p-3.5 rounded-xl border border-[#E0D2BC]">
                    <span className="font-bold text-[#1B3629] block uppercase text-[10px] text-[#7A6750]">WhatsApp No.</span>
                    <span className="text-sm font-mono font-bold text-[#1B3629]">{user.phone}</span>
                  </div>
                </div>
              </div>

              {/* Row 2: Directory Specific Fields ("Baki Fields") */}
              <div>
                <span className="text-[10px] font-bold text-[#7A6750] uppercase tracking-wider block mb-2">
                  2. Sector, Directory &amp; Business Profiles (Customizable in Dashboard)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs text-[#3E5C4B]">
                  <div className="bg-[#F2E8D7] p-3.5 rounded-xl border border-[#E0D2BC]">
                    <span className="font-bold text-[#1B3629] block uppercase text-[10px] text-[#7A6750]">Industry Sector</span>
                    <span className="text-sm font-serif font-bold text-[#1B3629]">{user.sector || 'Technology & Digital'}</span>
                  </div>

                  <div className="bg-[#F2E8D7] p-3.5 rounded-xl border border-[#E0D2BC]">
                    <span className="font-bold text-[#1B3629] block uppercase text-[10px] text-[#7A6750]">Profile Category</span>
                    <span className="text-sm font-serif font-bold text-[#1B3629]">{user.category || 'Entrepreneurs & Founders'}</span>
                  </div>

                  <div className="bg-[#F2E8D7] p-3.5 rounded-xl border border-[#E0D2BC]">
                    <span className="font-bold text-[#1B3629] block uppercase text-[10px] text-[#7A6750]">City / PIN Code</span>
                    <span className="text-sm font-serif font-bold text-[#1B3629]">{user.city || 'Lucknow'}</span>
                  </div>

                  <div className="bg-[#F2E8D7] p-3.5 rounded-xl border border-[#E0D2BC]">
                    <span className="font-bold text-[#1B3629] block uppercase text-[10px] text-[#7A6750]">Official Website</span>
                    {user.website_url ? (
                      <a
                        href={user.website_url.startsWith('http') ? user.website_url : `https://${user.website_url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono font-bold text-[#C83B46] hover:underline flex items-center gap-1 mt-0.5"
                      >
                        <span>Visit Site</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-xs text-[#7A6750] italic">Not added yet</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Row 3: Opportunities Seeking & Bio */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="bg-[#F2E8D7] p-4 rounded-xl border border-[#E0D2BC] space-y-1">
                  <span className="font-bold text-[#1B3629] block uppercase text-[10px] text-[#7A6750]">
                    Opportunities Seeking
                  </span>
                  <p className="text-xs text-[#1B3629] font-medium leading-relaxed">
                    {user.seeking || 'Capital & Investment, Market & Buyer Access, Corporate Supply Chains'}
                  </p>
                </div>

                <div className="bg-[#F2E8D7] p-4 rounded-xl border border-[#E0D2BC] space-y-1">
                  <span className="font-bold text-[#1B3629] block uppercase text-[10px] text-[#7A6750]">
                    Business &amp; Practice Overview
                  </span>
                  <p className="text-xs text-[#1B3629] font-serif leading-relaxed">
                    {user.business_description || 'Click "Edit Profile Details" above to add your enterprise summary, products, and services.'}
                  </p>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
