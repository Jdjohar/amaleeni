import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, ShieldCheck, Mail, Building2, ChevronRight } from 'lucide-react';

export default function TermsPage() {
  useEffect(() => {
    document.title = "Terms of Service | Amaleeni Foundation";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="paper-texture min-h-screen pt-28 sm:pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 10.1 Hero */}
        <div className="bg-[#FAF5EB] rounded-3xl p-8 sm:p-12 border border-[#E5D7C3] shadow-lg space-y-8">
          <div className="flex items-center gap-4 border-b border-[#E5D7C3] pb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#1B3629] text-[#D49B4B] flex items-center justify-center shrink-0">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#1B3629]">
                Terms of Service
              </h1>
              <p className="text-sm text-[#3D5C4A] font-serif mt-1">
                The terms that govern your use of amaleeni.com and your Pink Pages membership.
              </p>
              <p className="text-xs text-[#8A755A] font-semibold uppercase tracking-wider mt-2">
                Last updated: 16 September 2026
              </p>
            </div>
          </div>

          {/* Legal Content */}
          <div className="font-serif text-sm sm:text-base text-[#3A5645] leading-relaxed space-y-6">
            
            {/* 10.2 Acceptance of terms */}
            <div>
              <h2 className="font-serif text-xl font-bold text-[#1B3629] mb-2">10.2 Acceptance of Terms</h2>
              <p>
                By accessing amaleeni.com or registering for Pink Pages or Amaleeni Womenpreneurs 2027, you agree to these Terms of Service. If you do not agree, please do not use this website or its services.
              </p>
            </div>

            {/* 10.3 About Amaleeni Foundation */}
            <div>
              <h2 className="font-serif text-xl font-bold text-[#1B3629] mb-2">10.3 About Amaleeni Foundation</h2>
              <p>
                Amaleeni Foundation, a registered Trust (NGO Darpan ID: MH/2022/0311250; LEI: 9845008F0CBFA6D37097), with its registered office at Krishna Co-op Society, Boat Club Road, Pune, Maharashtra 411003, India (“we,” “us,” “the Foundation”).
              </p>
            </div>

            {/* 10.4 Pink Pages membership */}
            <div>
              <h2 className="font-serif text-xl font-bold text-[#1B3629] mb-2">10.4 Pink Pages Membership</h2>
              <p>
                Pink Pages is an annual directory membership. Registration creates a verified business profile and includes Early Bird access to Amaleeni Womenpreneurs 2027. Membership is personal to the registrant's business and may not be transferred or resold.
              </p>
            </div>

            {/* 10.5 Payments */}
            <div>
              <h2 className="font-serif text-xl font-bold text-[#1B3629] mb-2">10.5 Payments</h2>
              <p>
                Payments are processed via Razorpay in Indian Rupees (INR). We do not store your card, UPI or banking details – Razorpay handles all payment data under its own security standards. All fees are inclusive of applicable taxes as shown at checkout.
              </p>
            </div>

            {/* 10.6 User responsibilities */}
            <div>
              <h2 className="font-serif text-xl font-bold text-[#1B3629] mb-2">10.6 User Responsibilities</h2>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li>Provide accurate, current information at registration and keep your profile up to date.</li>
                <li>Maintain one profile per business or professional practice.</li>
                <li>Do not use the directory to harass, mislead or misrepresent yourself to other members, investors or partners.</li>
                <li>Do not scrape, resell or redistribute directory data.</li>
              </ul>
            </div>

            {/* 10.7 Intellectual property */}
            <div>
              <h2 className="font-serif text-xl font-bold text-[#1B3629] mb-2">10.7 Intellectual Property</h2>
              <p>
                All content on amaleeni.com – text, graphics, the Pink Pages name and mark – belongs to Amaleeni Foundation or its licensors, except content you submit about your own business, which remains yours; you grant us a licence to display it on the directory.
              </p>
            </div>

            {/* 10.8 Directory listing standards */}
            <div>
              <h2 className="font-serif text-xl font-bold text-[#1B3629] mb-2">10.8 Directory Listing Standards</h2>
              <p>
                We reserve the right to review, edit or remove any profile that violates these terms or contains false, offensive or misleading information, without refund.
              </p>
            </div>

            {/* 10.9 Limitation of liability */}
            <div>
              <h2 className="font-serif text-xl font-bold text-[#1B3629] mb-2">10.9 Limitation of Liability</h2>
              <p>
                Amaleeni Foundation facilitates introductions and does not guarantee any investment, deal, partnership or business outcome arising from Pink Pages membership or event attendance. Use of the directory and attendance at events is at your own risk, to the extent permitted by law.
              </p>
            </div>

            {/* 10.10 Governing law */}
            <div>
              <h2 className="font-serif text-xl font-bold text-[#1B3629] mb-2">10.10 Governing Law</h2>
              <p>
                These terms are governed by the laws of India, and disputes are subject to the exclusive jurisdiction of the courts at Pune, Maharashtra, India.
              </p>
            </div>

            {/* 10.11 Changes to these terms */}
            <div>
              <h2 className="font-serif text-xl font-bold text-[#1B3629] mb-2">10.11 Changes to These Terms</h2>
              <p>
                We may update these terms from time to time; the “last updated” date above will change accordingly. Continued use of the site after changes means you accept the revised terms.
              </p>
            </div>

            {/* 10.12 Contact us */}
            <div className="pt-4 border-t border-[#E5D7C3] flex items-center justify-between flex-wrap gap-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#1B3629]">10.12 Contact Us</h3>
                <p className="text-sm text-[#4E6B5A]">Questions about these terms?</p>
              </div>
              <a
                href="mailto:hello@amaleeni.com"
                className="inline-flex items-center gap-2 bg-[#1B3629] hover:bg-[#12251C] text-white px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-sm"
              >
                <Mail className="w-4 h-4" />
                <span>hello@amaleeni.com</span>
              </a>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
