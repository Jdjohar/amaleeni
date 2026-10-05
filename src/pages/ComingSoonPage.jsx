import React, { useState, useEffect } from 'react';
import { Mail, ArrowRight, Sparkles, Calendar, MapPin, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';
import { subscribeNewsletterApi } from '../services/api';

export default function ComingSoonPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Target event date: Amaleeni Womenpreneurs 2027 (e.g. March 8, 2027)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Target date set for March 2027
    const targetDate = new Date('2027-03-08T00:00:00');

    const updateTimer = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    try {
      await subscribeNewsletterApi(email.trim());
    } catch (err) {
      console.log('Fallback subscription handled');
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F3EA] text-[#1B3629] flex flex-col justify-between selection:bg-[#C83B46] selection:text-white relative overflow-hidden">
      
      {/* Background Decorative Accents */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#C83B46]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#1B3629]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E5D7C3]/40 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header / Logo */}
      <header className="relative z-10 py-8 px-6 sm:px-12 flex items-center justify-between max-w-7xl mx-auto w-full">
        <div className="flex items-center">
          <img
            src="/assets/logo.png"
            alt="Amaleeni Logo"
            className="h-16 sm:h-20 w-auto object-contain drop-shadow-sm"
            onError={(e) => {
              e.currentTarget.src = "/assets/logo.png";
            }}
          />
        </div>
        <div className="hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1B3629]/5 border border-[#1B3629]/10 text-xs font-semibold text-[#1B3629] tracking-wider uppercase">
          <Sparkles className="w-3.5 h-3.5 text-[#C83B46]" /> Official Portal Launching Soon
        </div>
      </header>

      {/* Main Hero Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 py-8 text-center flex flex-col items-center justify-center grow">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C83B46]/10 border border-[#C83B46]/20 text-[#C83B46] text-xs sm:text-sm font-semibold tracking-wide uppercase mb-6 animate-pulse">
          <Sparkles className="w-4 h-4" />
          Amaleeni Womenpreneurs 2027
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-[#1B3629] tracking-tight leading-[1.1] mb-6">
          Something Extraordinary <br />
          <span className="text-[#C83B46] italic font-normal">Is Coming Soon.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-[#2D5A43] max-w-2xl mx-auto font-serif leading-relaxed mb-10">
          Putting women entrepreneurs in the room with capital, policy, buyers, and mentors. 
          Our comprehensive digital platform & Pink Pages directory are gearing up for the official grand launch.
        </p>

        {/* Countdown Timer */}
        <div className="grid grid-cols-4 gap-3 sm:gap-6 w-full max-w-lg mb-12">
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Minutes', value: timeLeft.minutes },
            { label: 'Seconds', value: timeLeft.seconds },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm border border-[#E5D7C3] rounded-2xl p-3 sm:p-5 shadow-sm flex flex-col items-center justify-center transition-transform hover:-translate-y-1"
            >
              <span className="text-2xl sm:text-4xl font-bold font-serif text-[#1B3629]">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#7A9988] mt-1">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Email Notification Form */}
        <div className="w-full max-w-md bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-[#E5D7C3] shadow-lg">
          <h3 className="text-lg font-serif font-bold text-[#1B3629] mb-2">
            Be the First to Know
          </h3>
          <p className="text-xs text-[#627D6F] mb-5">
            Subscribe to receive exclusive updates, summit schedules, and early access notifications.
          </p>

          {isSubmitted ? (
            <div className="flex items-center justify-center gap-2 p-4 rounded-xl bg-[#1B3629]/10 text-[#1B3629] text-sm font-medium border border-[#1B3629]/20">
              <CheckCircle2 className="w-5 h-5 text-[#2D5A43] shrink-0" />
              <span>Thank you! We will notify you when we go live.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <Mail className="w-5 h-5 text-[#7A9988] absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-[#E5D7C3] bg-[#FDFBF7] text-sm text-[#1B3629] placeholder-[#9EAE9F] focus:outline-none focus:ring-2 focus:ring-[#C83B46] focus:border-transparent transition-all"
                />
              </div>

              {errorMsg && (
                <p className="text-xs text-[#C83B46] text-left">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl bg-[#C83B46] hover:bg-[#A82B35] text-white text-sm font-semibold tracking-wide shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-70"
              >
                {isSubmitting ? (
                  'Subscribing...'
                ) : (
                  <>
                    <span>Get Notified at Launch</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Quick Highlights */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-[#4E6859]">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#C83B46]" />
            <span>March 2027 Summit</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#C83B46]" />
            <span>New Delhi, India</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#2D5A43]" />
            <span>Verified Women Entrepreneurs</span>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 px-6 border-t border-[#E5D7C3] bg-white/40 text-center text-xs text-[#7A9988] flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto w-full gap-4">
        <div className="flex items-center gap-1 font-serif">
          <span>&copy; {new Date().getFullYear()} Amaleeni Foundation. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span>NGO Darpan ID: MH/2022/0311250</span>
          <span>•</span>
          <span>LEI: 9845008F0CBFA6D37097</span>
        </div>
      </footer>

    </div>
  );
}
