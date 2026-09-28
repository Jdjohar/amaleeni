import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RefreshCw, Mail, Clock, ArrowRight, ShieldAlert } from 'lucide-react';

export default function RefundCancellationPage() {
  useEffect(() => {
    document.title = "Refund & Cancellation Policy | Amaleeni Foundation";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="paper-texture min-h-screen pt-28 sm:pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 13.1 Hero */}
        <div className="bg-[#FAF5EB] rounded-3xl p-8 sm:p-12 border border-[#E5D7C3] shadow-lg space-y-8">
          <div className="flex items-center gap-4 border-b border-[#E5D7C3] pb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#1B3629] text-[#D49B4B] flex items-center justify-center shrink-0">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#1B3629]">
                Refund &amp; Cancellation Policy
              </h1>
              <p className="text-sm sm:text-base text-[#3D5C4A] font-serif mt-1">
                How refunds and cancellations work for your Pink Pages registration.
              </p>
            </div>
          </div>

          {/* Legal Sections */}
          <div className="font-serif text-sm sm:text-base text-[#3A5645] leading-relaxed space-y-6">
            
            {/* 13.2 Registration fee */}
            <div className="bg-[#F4ECDC] p-6 rounded-2xl border border-[#E0D2BC]">
              <h2 className="font-serif text-xl font-bold text-[#1B3629] mb-2 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-[#C83B46]" />
                <span>13.2 Registration Fee Policy</span>
              </h2>
              <p>
                The <strong>₹5,000 Pink Pages annual registration fee</strong> is non-refundable once payment is completed and your directory profile is created.
              </p>
            </div>

            {/* 13.3 Cancellation process */}
            <div>
              <h2 className="font-serif text-xl font-bold text-[#1B3629] mb-2">13.3 Cancellation Process</h2>
              <p>
                To request a cancellation or refund inquiry, write to <a href="mailto:hello@amaleeni.com" className="text-[#C83B46] font-bold underline">hello@amaleeni.com</a> with your registered email and payment reference (visible in your Razorpay confirmation).
              </p>
            </div>

            {/* 13.4 Processing time */}
            <div>
              <h2 className="font-serif text-xl font-bold text-[#1B3629] mb-2 flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#1B3629]" />
                <span>13.4 Processing Time</span>
              </h2>
              <p>
                Approved refunds are processed within <strong>7–10 business days</strong> back to your original payment method via Razorpay.
              </p>
            </div>

            {/* 13.5 Contact for refund queries */}
            <div className="pt-6 border-t border-[#E5D7C3] flex items-center justify-between flex-wrap gap-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#1B3629]">13.5 Contact for Refund Queries</h3>
                <p className="text-sm text-[#4E6B5A]">
                  Email us at <a href="mailto:hello@amaleeni.com" className="text-[#C83B46] font-bold underline">hello@amaleeni.com</a> – see also our <Link to="/grievance-redressal" className="text-[#C83B46] font-bold underline">Grievance Redressal page</Link> if a refund request isn't resolved.
                </p>
              </div>

              <Link
                to="/grievance-redressal"
                className="inline-flex items-center gap-2 bg-[#1B3629] hover:bg-[#12251C] text-white px-6 py-3 rounded-full text-xs font-bold transition-all shadow-md"
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
