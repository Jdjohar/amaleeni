import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Mail, ArrowRight } from 'lucide-react';

export default function PrivacyPage() {
  useEffect(() => {
    document.title = "Privacy Policy | Amaleeni Foundation";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="paper-texture min-h-screen pt-28 sm:pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 11.1 Hero */}
        <div className="bg-[#FAF5EB] rounded-3xl p-8 sm:p-12 border border-[#E5D7C3] shadow-lg space-y-8">
          <div className="flex items-center gap-4 border-b border-[#E5D7C3] pb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#1B3629] text-[#D49B4B] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#1B3629]">
                Privacy Policy
              </h1>
              <p className="text-sm text-[#3D5C4A] font-serif mt-1">
                How Amaleeni Foundation collects, uses and protects your information.
              </p>
              <p className="text-xs text-[#8A755A] font-semibold uppercase tracking-wider mt-2">
                Last updated: 16 September 2026
              </p>
            </div>
          </div>

          {/* Legal Content */}
          <div className="font-serif text-sm sm:text-base text-[#3A5645] leading-relaxed space-y-6">
            
            {/* 11.2 Information we collect */}
            <div>
              <h2 className="font-serif text-xl font-bold text-[#1B3629] mb-2">11.2 Information We Collect</h2>
              <p>
                When you register for Pink Pages or contact us, we collect: full name, organisation/enterprise, designation, email address, WhatsApp/phone number, city/PIN, and a password for your member account. Additional profile details (sector, website, opportunities sought, business overview) are collected inside your Member Dashboard after registration. Payment is processed by Razorpay – we receive confirmation of payment but not your card, UPI or bank account details.
              </p>
            </div>

            {/* 11.3 How we use your information */}
            <div>
              <h2 className="font-serif text-xl font-bold text-[#1B3629] mb-2">11.3 How We Use Your Information</h2>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li>To create and maintain your Pink Pages directory profile.</li>
                <li>To process your registration and Early Bird summit access.</li>
                <li>To contact you about your registration, the summit, or directory matches.</li>
                <li>To route enquiries to the right team (delegates, partnership, speakers, media, general).</li>
              </ul>
            </div>

            {/* 11.4 Sharing with third parties */}
            <div>
              <h2 className="font-serif text-xl font-bold text-[#1B3629] mb-2">11.4 Sharing with Third Parties</h2>
              <p>
                We share information with Razorpay (payment processing), our website hosting and email providers, and – where relevant to your stated “opportunities seeking” – with investors, corporates or buyers you choose to be matched with. We do not sell your personal data.
              </p>
            </div>

            {/* 11.5 Cookies & tracking */}
            <div>
              <h2 className="font-serif text-xl font-bold text-[#1B3629] mb-2">11.5 Cookies &amp; Tracking</h2>
              <p>
                amaleeni.com uses cookies for basic site functionality and analytics, such as Google Analytics.
              </p>
            </div>

            {/* 11.6 Data security */}
            <div>
              <h2 className="font-serif text-xl font-bold text-[#1B3629] mb-2">11.6 Data Security</h2>
              <p>
                We take reasonable technical and organisational measures to protect your data. No method of transmission or storage is completely secure, and we cannot guarantee absolute security.
              </p>
            </div>

            {/* 11.7 Your rights */}
            <div>
              <h2 className="font-serif text-xl font-bold text-[#1B3629] mb-2">11.7 Your Rights</h2>
              <p>
                You can request access to, correction of, or deletion of your personal data by writing to <a href="mailto:hello@amaleeni.com" className="text-[#C83B46] font-bold underline">hello@amaleeni.com</a>. We will respond within a reasonable time.
              </p>
            </div>

            {/* 11.8 Data retention */}
            <div>
              <h2 className="font-serif text-xl font-bold text-[#1B3629] mb-2">11.8 Data Retention</h2>
              <p>
                We retain your data for as long as your membership is active and for a reasonable period afterward for legal, accounting and record-keeping purposes.
              </p>
            </div>

            {/* 11.9 Children's privacy */}
            <div>
              <h2 className="font-serif text-xl font-bold text-[#1B3629] mb-2">11.9 Children's Privacy</h2>
              <p>
                Pink Pages and Amaleeni Womenpreneurs 2027 are intended for adults registering a business or professional practice; we do not knowingly collect data from minors.
              </p>
            </div>

            {/* 11.10 Changes to this policy */}
            <div>
              <h2 className="font-serif text-xl font-bold text-[#1B3629] mb-2">11.10 Changes to This Policy</h2>
              <p>
                We may update this policy from time to time; the “last updated” date above will change accordingly.
              </p>
            </div>

            {/* 11.11 Contact us / Grievance Officer */}
            <div className="pt-4 border-t border-[#E5D7C3] flex items-center justify-between flex-wrap gap-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#1B3629]">11.11 Contact Us / Grievance Officer</h3>
                <p className="text-sm text-[#4E6B5A]">
                  For privacy questions or complaints, write to hello@amaleeni.com, or see our <Link to="/grievance-redressal" className="text-[#C83B46] font-bold underline">Grievance Redressal page</Link> for our named Grievance Officer.
                </p>
              </div>
              <Link
                to="/grievance-redressal"
                className="inline-flex items-center gap-2 bg-[#1B3629] hover:bg-[#12251C] text-white px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-sm"
              >
                <span>Grievance Redressal</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
