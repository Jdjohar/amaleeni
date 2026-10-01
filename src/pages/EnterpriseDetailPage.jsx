import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Building2, MapPin, Globe, CheckCircle2, Share2, Copy, MessageCircle, ArrowLeft, ShieldCheck, Sparkles } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function EnterpriseDetailPage() {
  const { id } = useParams();
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);

  // Mock / Default enterprise dataset (can also fetch from /api/profile/:id)
  const enterpriseData = {
    id: id || 'PP-892415',
    refId: id ? (id.startsWith('PP-') ? id : `PP-${id.toUpperCase()}`) : 'PP-892415',
    orgName: id ? `Enterprise ${id.replace(/[^a-zA-Z0-9]/g, ' ').toUpperCase()}` : 'Skintillatingg & CIATN Institute',
    designation: 'Founder & Director',
    founderName: 'Dr. Akshaya Jain',
    category: 'Entrepreneurs & Founders',
    sector: 'Healthcare, Wellness & Cosmetology',
    city: 'Pune',
    stateCountry: 'Maharashtra, India',
    pincode: '411003',
    websiteUrl: 'https://skintillatingg.com',
    verified: true,
    seeking: 'Corporate Buyer Procurement, Investor Speed-Meetings, Franchise Partners',
    businessDescription:
      'Skintillatingg is a pioneer medical aesthetic and wellness venture providing advanced dermatological care and Skill India-certified clinical cosmetology training. We empower women with hands-on skill development and self-reliance in the beauty and healthcare sector.',
  };

  useEffect(() => {
    document.title = `${enterpriseData.orgName} | Verified Member | Amaleeni Pink Pages`;
    window.scrollTo(0, 0);
  }, [enterpriseData.orgName]);

  const currentUrl = window.location.href;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    showToast('Enterprise profile link copied to clipboard!');
    setTimeout(() => setCopied(false), 3000);
  };

  const whatsappShareText = encodeURIComponent(
    `Check out ${enterpriseData.orgName} on Amaleeni Pink Pages Directory: ${currentUrl}`
  );
  const whatsappShareUrl = `https://wa.me/?text=${whatsappShareText}`;

  return (
    <div className="paper-texture min-h-screen pt-28 sm:pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <div className="mb-6">
          <Link
            to="/pink-pages"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1B3629] hover:text-[#C83B46] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Pink Pages Directory</span>
          </Link>
        </div>

        {/* Profile Card */}
        <div className="bg-[#FAF5EB] rounded-3xl p-6 sm:p-10 border border-[#E5D7C3] shadow-xl space-y-8">
          
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E5D7C3] gap-4">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#1B3629] text-[#D49B4B] flex items-center justify-center shrink-0 shadow-md">
                <Building2 className="w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-[#C83B46] uppercase tracking-wider">
                    {enterpriseData.category}
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#2E7D32]/10 text-[#2E7D32] border border-[#2E7D32]/30 inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Verified Member
                  </span>
                </div>
                
                <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#1B3629] mt-1">
                  {enterpriseData.orgName}
                </h1>
                
                <p className="text-xs font-semibold text-[#8A755A] mt-1">
                  Reference ID: <span className="text-[#1B3629] font-bold">{enterpriseData.refId}</span>
                </p>
              </div>
            </div>

            {/* Quick Share Buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#F4ECDC] hover:bg-[#E2D4C0] text-[#1B3629] text-xs font-bold transition-all border border-[#E0D2BC]"
                title="Copy Profile Link"
                aria-label="Copy Profile Link"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copied ? 'Copied!' : 'Copy Link'}</span>
              </button>

              <a
                href={whatsappShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold transition-all shadow-sm"
                title="Share on WhatsApp"
                aria-label="Share profile on WhatsApp"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Profile</span>
              </a>
            </div>
          </div>

          {/* Key Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#F4ECDC] p-4 rounded-2xl border border-[#E0D2BC]">
              <span className="text-xs uppercase font-bold text-[#8A755A] block mb-1">Primary Sector</span>
              <p className="font-serif font-bold text-[#1B3629] text-sm">{enterpriseData.sector}</p>
            </div>

            <div className="bg-[#F4ECDC] p-4 rounded-2xl border border-[#E0D2BC]">
              <span className="text-xs uppercase font-bold text-[#8A755A] block mb-1">Location</span>
              <p className="font-serif font-bold text-[#1B3629] text-sm flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#C83B46]" />
                {enterpriseData.city}, {enterpriseData.stateCountry}
              </p>
            </div>

            <div className="bg-[#F4ECDC] p-4 rounded-2xl border border-[#E0D2BC]">
              <span className="text-xs uppercase font-bold text-[#8A755A] block mb-1">Website / Portal</span>
              {enterpriseData.websiteUrl ? (
                <a
                  href={enterpriseData.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-serif font-bold text-[#C83B46] hover:underline text-sm flex items-center gap-1 truncate"
                >
                  <Globe className="w-3.5 h-3.5" />
                  {enterpriseData.websiteUrl.replace(/^https?:\/\//, '')}
                </a>
              ) : (
                <p className="font-serif font-bold text-[#1B3629] text-sm">Verified Directory Listing</p>
              )}
            </div>
          </div>

          {/* Business Overview */}
          <div className="space-y-3 font-serif">
            <h3 className="text-xl font-bold text-[#1B3629]">Business Overview</h3>
            <p className="text-sm sm:text-base text-[#3A5645] leading-relaxed bg-white p-6 rounded-2xl border border-[#E5D7C3]">
              {enterpriseData.businessDescription}
            </p>
          </div>

          {/* Opportunities Seeking */}
          <div className="space-y-3 font-serif">
            <h3 className="text-xl font-bold text-[#1B3629]">Opportunities Seeking</h3>
            <div className="flex flex-wrap gap-2">
              {enterpriseData.seeking.split(',').map((item, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded-xl bg-[#1B3629] text-[#FAF5EB] text-xs font-semibold shadow-sm"
                >
                  {item.trim()}
                </span>
              ))}
            </div>
          </div>

          {/* Delegate Pass & Contact Action */}
          <div className="bg-[#1B3629] text-white p-6 sm:p-8 rounded-3xl border border-[#2D5440] shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C83B46]/20 text-[#FAF5EB] text-xs font-bold uppercase mb-1">
                <Sparkles className="w-3.5 h-3.5 text-[#D49B4B]" />
                <span>Verified Delegate</span>
              </div>
              <h4 className="font-serif text-2xl font-bold text-white">Connect with {enterpriseData.orgName}</h4>
              <p className="text-xs text-[#A8C2B3] font-serif">
                Registered member of Amaleeni Womenpreneurs 2027 Secretariat Network.
              </p>
            </div>

            <a
              href={`https://wa.me/919810055241?text=${encodeURIComponent(`Hello Amaleeni Foundation, I want to connect with ${enterpriseData.orgName} (${enterpriseData.refId}).`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#C83B46] hover:bg-[#A82B36] text-white px-6 py-3 rounded-full text-sm font-bold transition-all shadow-md inline-flex items-center gap-2 shrink-0"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Connect via Secretariat</span>
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
