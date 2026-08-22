import React from 'react';
import { useLocation } from 'react-router-dom';
import { ShieldCheck, FileText } from 'lucide-react';

export default function LegalPage() {
  const location = useLocation();
  const isPrivacy = location.pathname === '/privacy';

  return (
    <div className="paper-texture min-h-screen pt-28 sm:pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF5EB] rounded-3xl p-8 sm:p-12 border border-[#E5D7C3] shadow-lg space-y-6">
          <div className="flex items-center gap-3 border-b border-[#E5D7C3] pb-6">
            <div className="w-10 h-10 rounded-xl bg-[#1B3629] text-[#D49B4B] flex items-center justify-center">
              {isPrivacy ? <ShieldCheck className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
            </div>
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1B3629]">
                {isPrivacy ? 'Privacy Policy' : 'Terms & Conditions'}
              </h1>
              <p className="text-xs text-[#8A755A] font-serif">Amaleeni Womenpreneurs 2027 Official Policy</p>
            </div>
          </div>

          <div className="font-serif text-sm sm:text-base text-[#3A5645] leading-relaxed space-y-4">
            <p>
              {isPrivacy
                ? 'Amaleeni Foundation is committed to protecting the privacy and confidentiality of all registered delegates, speakers, investors, and corporate partners. Information collected during delegate registration (including business stage, sector, and meeting preferences) is strictly used for curated meeting matching and event communication.'
                : 'By registering as a delegate, speaker, or partner for Amaleeni Womenpreneurs 2027 (12–13 March 2027, Bhubaneswar, Odisha), you agree to abide by the official summit code of conduct and event guidelines.'}
            </p>

            <h3 className="font-serif text-xl font-bold text-[#1B3629] pt-2">Data Protection &amp; Confidentiality</h3>
            <p>
              Delegate answers regarding business financials and investment requirements are held securely in the Secretariat CRM and are never sold or published publicly.
            </p>

            <h3 className="font-serif text-xl font-bold text-[#1B3629] pt-2">Contact &amp; Inquiries</h3>
            <p>
              For privacy requests or terms clarification, please contact the Amaleeni Foundation Secretariat at secretariat@amaleeni.org.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
