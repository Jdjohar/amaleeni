import React, { useEffect } from 'react';
import { Mail, Phone, MessageSquare, Clock, ShieldCheck, MapPin } from 'lucide-react';

export default function GrievanceRedressalPage() {
  useEffect(() => {
    document.title = "Grievance Redressal | Amaleeni Foundation";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="paper-texture min-h-screen pt-28 sm:pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 12.1 Hero */}
        <div className="bg-[#FAF5EB] rounded-3xl p-8 sm:p-12 border border-[#E5D7C3] shadow-lg space-y-8">
          <div className="flex items-center gap-4 border-b border-[#E5D7C3] pb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#1B3629] text-[#D49B4B] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#1B3629]">
                Grievance Redressal
              </h1>
              <p className="text-sm sm:text-base text-[#3D5C4A] font-serif mt-1">
                A direct, named channel for any complaint or concern about Pink Pages, the summit, or this website.
              </p>
            </div>
          </div>

          {/* 12.2 How to file a grievance */}
          <div className="space-y-4 font-serif">
            <h2 className="text-xl font-bold text-[#1B3629]">12.2 How to File a Grievance</h2>
            <p className="text-sm sm:text-base text-[#3A5645] leading-relaxed">
              Write to us with your full name, the email you registered with, and a description of your concern. We treat every grievance seriously and will acknowledge it promptly.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="bg-[#F4ECDC] p-5 rounded-2xl border border-[#E0D2BC]">
                <span className="text-xs font-bold text-[#C83B46] uppercase tracking-wider block mb-1">Step 1</span>
                <h4 className="font-serif font-bold text-[#1B3629]">Write to Officer</h4>
                <p className="text-xs text-[#5A7364] mt-1">Contact our Grievance Officer below by email or WhatsApp.</p>
              </div>

              <div className="bg-[#F4ECDC] p-5 rounded-2xl border border-[#E0D2BC]">
                <span className="text-xs font-bold text-[#C83B46] uppercase tracking-wider block mb-1">Step 2</span>
                <h4 className="font-serif font-bold text-[#1B3629]">Acknowledgment</h4>
                <p className="text-xs text-[#5A7364] mt-1">We acknowledge receipt within 48 hours.</p>
              </div>

              <div className="bg-[#F4ECDC] p-5 rounded-2xl border border-[#E0D2BC]">
                <span className="text-xs font-bold text-[#C83B46] uppercase tracking-wider block mb-1">Step 3</span>
                <h4 className="font-serif font-bold text-[#1B3629]">Resolution</h4>
                <p className="text-xs text-[#5A7364] mt-1">We investigate and respond with a resolution within 15 days.</p>
              </div>
            </div>
          </div>

          {/* 12.3 Grievance Officer Card */}
          <div className="bg-[#1B3629] text-white p-8 rounded-3xl border border-[#2D5440] shadow-xl space-y-4">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#D49B4B]">
              12.3 Designated Grievance Officer
            </span>

            <div className="space-y-1">
              <h3 className="font-serif text-2xl font-bold text-[#FAF5EB]">Dr. Akshaya Jain</h3>
              <p className="text-sm text-[#A8C2B3] font-serif">Founder &amp; Convenor, Amaleeni Foundation</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#2D5440]">
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-[#244735] hover:bg-[#2F5A43] p-4 rounded-2xl border border-[#345E47] transition-all"
              >
                <MessageSquare className="w-5 h-5 text-[#D49B4B]" />
                <div>
                  <span className="text-xs text-[#A8C2B3] block">WhatsApp Channel</span>
                  <span className="text-sm font-bold text-white">+91 98765 43210</span>
                </div>
              </a>

              <a
                href="mailto:hello@amaleeni.com"
                className="flex items-center gap-3 bg-[#244735] hover:bg-[#2F5A43] p-4 rounded-2xl border border-[#345E47] transition-all"
              >
                <Mail className="w-5 h-5 text-[#C83B46]" />
                <div>
                  <span className="text-xs text-[#A8C2B3] block">Official Email</span>
                  <span className="text-sm font-bold text-white">hello@amaleeni.com</span>
                </div>
              </a>
            </div>
          </div>

          {/* 12.4 Response timeline & 12.5 Escalation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-serif pt-2">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[#1B3629] font-bold">
                <Clock className="w-4 h-4 text-[#C83B46]" />
                <h3>12.4 Response Timeline</h3>
              </div>
              <p className="text-sm text-[#3A5645] leading-relaxed">
                We aim to acknowledge every grievance within <strong>48 hours</strong> and resolve it within <strong>15 working days</strong>.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[#1B3629] font-bold">
                <MapPin className="w-4 h-4 text-[#D49B4B]" />
                <h3>12.5 Formal Escalation</h3>
              </div>
              <p className="text-sm text-[#3A5645] leading-relaxed">
                If your grievance remains unresolved after 15 working days, you may escalate in writing to our registered office:
              </p>
              <p className="text-xs text-[#7A6750] italic bg-[#F4ECDC] p-3 rounded-xl border border-[#E0D2BC]">
                Amaleeni Foundation, Krishna Co-op Society, Boat Club Road, Pune, Maharashtra 411003, India.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
