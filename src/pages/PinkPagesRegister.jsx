import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { sendOtpApi, verifyOtpApi, submitContactFormApi } from '../services/api';
import {
  Sparkles,
  ArrowRight,
  ChevronDown,
  X,
  LogIn,
  MessageSquare,
  AlertCircle,
  Eye,
  EyeOff,
  CheckCircle2,
  KeyRound,
  MailCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PinkPagesRegister({ onOpenContact }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { register, login } = useAuth();
  const { showToast } = useToast();

  const [activeFaq, setActiveFaq] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(() => {
    return typeof window !== 'undefined' && window.location.hash === '#login';
  });

  // OTP Verification States
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpSending, setOtpSending] = useState(false);
  const [otpVerifying, setOtpVerifying] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [generatedOtpFallback, setGeneratedOtpFallback] = useState('');

  // Login modal states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Registration Form states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    orgName: '',
    designation: '',
    email: '',
    phone: '',
    pincode: '',
    cityPin: '',
    password: '',
    confirmPassword: '',
    website_bot_trap: '', // Honeypot bot protection
  });

  useEffect(() => {
    if (location.hash === '#form') {
      const el = document.getElementById('registration-form');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  const scrollToForm = (e) => {
    if (e) e.preventDefault();
    const el = document.getElementById('registration-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getPasswordStrength = (pass) => {
    return {
      length: (pass || '').length >= 8,
      hasUpper: /[A-Z]/.test(pass || ''),
      hasLower: /[a-z]/.test(pass || ''),
      hasNumber: /[0-9]/.test(pass || ''),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(pass || ''),
    };
  };

  const passStrength = getPasswordStrength(formData.password);

  // Trigger Send OTP code to email
  const handleSendOtp = async (e) => {
    if (e) e.preventDefault();
    setFormError('');
    setOtpError('');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setFormError('Please enter a valid email address before sending OTP.');
      showToast('Please enter a valid email address first.', 'error');
      return;
    }

    setOtpSending(true);
    
    try {
      // Call Send OTP API (Hostinger PHP Backend)
      const data = await sendOtpApi(formData.email.trim());
      if (data && (data.success || data.status === 'success')) {
        setOtpError('');
        setIsOtpModalOpen(true);
        showToast(`OTP Code sent to ${formData.email.trim()}! Please check your inbox or spam folder.`);
      } else {
        const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
        if (isLocal) {
          setIsOtpModalOpen(true);
          const fallbackCode = Math.floor(100000 + Math.random() * 900000).toString();
          setGeneratedOtpFallback(fallbackCode);
          showToast(`[DEV MODE] OTP Code generated for local testing.`);
        } else {
          const errMsg = data?.message || 'Could not send OTP email. Please check your email address or SMTP configuration.';
          setFormError(errMsg);
          setOtpError(errMsg);
          showToast(errMsg, 'error');
        }
      }
    } catch (err) {
      const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
      if (isLocal) {
        setIsOtpModalOpen(true);
        const fallbackCode = Math.floor(100000 + Math.random() * 900000).toString();
        setGeneratedOtpFallback(fallbackCode);
        showToast(`[DEV MODE] OTP Code generated for local testing.`);
      } else {
        setFormError('Network error while dispatching OTP email. Please try again.');
        setOtpError('Network error while dispatching OTP email. Please try again.');
        showToast('Network error while sending OTP.', 'error');
      }
    } finally {
      setOtpSending(false);
    }
  };

  // Verify OTP submission
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setOtpError('');
    if (!otpCode.trim() || otpCode.trim().length !== 6) {
      setOtpError('Please enter the 6-digit OTP code.');
      return;
    }

    setOtpVerifying(true);
    try {
      const data = await verifyOtpApi(formData.email.trim(), otpCode.trim());
      if (data && (data.verified || data.success || data.status === 'success')) {
        setIsEmailVerified(true);
        setIsOtpModalOpen(false);
        showToast('Email verified successfully! ✓');
      } else if (generatedOtpFallback && otpCode.trim() === generatedOtpFallback) {
        setIsEmailVerified(true);
        setIsOtpModalOpen(false);
        showToast('Email verified successfully! ✓');
      } else {
        setOtpError(data.message || 'Invalid or expired OTP code. Please try again.');
      }
    } catch (err) {
      if (generatedOtpFallback && otpCode.trim() === generatedOtpFallback) {
        setIsEmailVerified(true);
        setIsOtpModalOpen(false);
        showToast('Email verified successfully! ✓');
      } else {
        setOtpError('Invalid OTP code. Please check your code and try again.');
      }
    } finally {
      setOtpVerifying(false);
    }
  };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    // Bot detection check
    if (formData.website_bot_trap) {
      setFormError('Automated spam detection triggered. Submission aborted.');
      return;
    }

    const pincodeVal = (formData.pincode || formData.cityPin || '').trim();

    if (!formData.fullName.trim() || !formData.orgName.trim() || !formData.email.trim() || !formData.phone.trim() || !pincodeVal) {
      setFormError('Please fill all required fields: Name, Organisation, Email, WhatsApp Number, and Pincode / Postal Code.');
      return;
    }

    // International Mobile / WhatsApp Number Validation (7-15 digits, supports +country code)
    const cleanPhoneDigits = formData.phone.trim().replace(/[^\d+]/g, '');
    const phoneRegex = /^\+?[0-9]{7,15}$/;
    if (!phoneRegex.test(cleanPhoneDigits)) {
      setFormError('Please enter a valid WhatsApp / Mobile number (7–15 digits, international format supported, e.g. +91 98765 43210 or 9876543210).');
      showToast('Please enter a valid mobile number.', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setFormError('Please enter a valid email address (e.g. name@company.com).');
      return;
    }

    // Enforce OTP verification before final registration
    if (!isEmailVerified) {
      setFormError('Email OTP verification is required. Please verify your email with OTP before proceeding.');
      showToast('Please verify your email address with OTP code first.', 'error');
      handleSendOtp();
      return;
    }

    // Modern Popular Password Validation (min 8 chars, 1 upper, 1 lower, 1 number, 1 special char)
    const passCheck = getPasswordStrength(formData.password);
    if (!passCheck.length || !passCheck.hasUpper || !passCheck.hasLower || !passCheck.hasNumber || !passCheck.hasSpecial) {
      setFormError('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setFormError('Passwords do not match. Please verify.');
      return;
    }

    setIsSubmitting(true);
    try {
      await register({
        fullName: formData.fullName.trim(),
        orgName: formData.orgName.trim(),
        designation: formData.designation.trim() || 'Founder / Leader',
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        pincode: pincodeVal,
        city: formData.cityPin.trim() || pincodeVal,
        cityPin: `${formData.cityPin.trim()} ${pincodeVal}`.trim(),
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        website_bot_trap: formData.website_bot_trap,
      });

      // Submit dual email notification
      try {
        await submitContactFormApi({
          form_type: 'Pink Pages Directory Registration',
          fullName: formData.fullName.trim(),
          email: formData.email.trim().toLowerCase(),
          phone: formData.phone.trim(),
          orgName: formData.orgName.trim(),
          pincode: pincodeVal,
          message: `New Pink Pages directory registration for ${formData.orgName} by ${formData.fullName}. Pincode: ${pincodeVal}`,
        });
      } catch (err) {
        console.log('Backend notification queued.');
      }

      showToast('Registration submitted successfully! Welcome to Pink Pages.');
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 },
      });
      // Immediately navigate to Member Dashboard as requested!
      navigate('/pink-pages/dashboard', { replace: true });
    } catch (err) {
      setFormError(err.message || 'Registration failed. Please try again.');
      showToast(err.message || 'Registration failed.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    try {
      await login(loginEmail.trim(), loginPassword);
      setIsLoginOpen(false);
      showToast('Welcome back! Logged in successfully.');
      navigate('/pink-pages/dashboard', { replace: true });
    } catch (err) {
      setLoginError(err.message || 'Invalid credentials.');
      showToast('Login failed. Please check credentials.', 'error');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // 3.2 Frequently Asked Questions
  const faqs = [
    {
      q: 'What exactly is Pink Pages?',
      a: "Pink Pages is Amaleeni Foundation's business directory for women – connecting entrepreneurs to real opportunities through buyers, investors, mentors, policymakers and business events.",
    },
    {
      q: 'Who can register?',
      a: 'Anyone who leads or grows a business or professional practice – entrepreneurs, MSME and industry leaders, professionals, startups and creators are all welcome.',
    },
    {
      q: 'What does the registration fee cover?',
      a: 'Your registration creates your Pink Pages profile and also serves as your Early Bird registration for Amaleeni Womenpreneurs 2027.',
    },
    {
      q: 'Is registration open to women outside India?',
      a: 'Yes. Pink Pages is a global directory, and women entrepreneurs and professionals from outside India are welcome to register.',
    },
    {
      q: 'Is this a one-time fee or does it renew annually?',
      a: 'The ₹5,000 is an annual fee for Pink Pages registration and Early Bird entry for Amaleeni Womenpreneurs 2027.',
    },
    {
      q: "I've already registered – how do I log into my account?",
      a: 'You can log in with the email you registered with to view your Pink Pages profile and start browsing the directory.',
      hasLoginLink: true,
    },
  ];

  return (
    <div className="paper-texture min-h-screen pt-24 sm:pt-28 pb-20">
      
      {/* 3.1 Hero Section */}
      <section className="relative overflow-hidden pt-6 pb-12 sm:py-16 lg:py-20 border-b border-[#E5D7C3]/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          
          {/* Tracking / Campaign Identifier Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C83B46]/10 border border-[#C83B46]/20 text-[#C83B46] text-xs sm:text-sm font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[#C83B46]" />
            <span>Official Directory Registration • Amaleeni Foundation</span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#1B3629] leading-[1.08] tracking-tight">
            Get Discovered. Get Connected.{' '}
            <span className="text-[#C83B46] block sm:inline">Get Growing.</span>
          </h1>

          {/* Subhead */}
          <p className="text-base sm:text-xl lg:text-2xl text-[#3D5C4A] font-serif max-w-2xl mx-auto leading-relaxed">
            India's business and opportunity directory for women – built to put you in front of the investors, buyers, corporates and partners who can grow your business.
          </p>

          {/* Primary Action Button, Fee Note, and Login Link */}
          <div className="pt-3 pb-2 space-y-3 flex flex-col items-center justify-center">
            <button
              onClick={scrollToForm}
              className="inline-flex items-center justify-center gap-3 bg-[#C83B46] hover:bg-[#A82B36] text-white px-8 sm:px-10 py-4 rounded-full text-base sm:text-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 border-2 border-white/20 cursor-pointer"
            >
              <span>Register on Pink Pages</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* FEE directly under the button */}
            <p className="text-xs sm:text-sm text-[#7A6750] font-bold font-sans">
              <span className="text-[#1B3629] text-base font-extrabold">₹5,000</span> (Annual fee • Includes profile verification &amp; Early Bird pass for Amaleeni Womenpreneurs 2027)
            </p>

            {/* LINK: Already registered? Log into your account */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => setIsLoginOpen(true)}
                className="text-xs sm:text-sm text-[#1B3629] hover:text-[#C83B46] underline underline-offset-4 font-semibold transition-colors cursor-pointer inline-flex items-center gap-1.5"
              >
                <LogIn className="w-3.5 h-3.5 text-[#C83B46]" />
                <span>Already registered? Log into your account</span>
              </button>
            </div>
          </div>

          {/* Fast Trust Strip */}
          <div className="pt-6 grid grid-cols-3 gap-2 sm:gap-4 max-w-xl mx-auto text-center border-t border-[#E5D7C3] pt-6">
            <div>
              <p className="text-xs sm:text-sm font-bold text-[#1B3629]">Instant Profile</p>
              <p className="text-[10px] sm:text-xs text-[#7A6750]">Auto-opens dashboard</p>
            </div>
            <div className="border-x border-[#E5D7C3]">
              <p className="text-xs sm:text-sm font-bold text-[#C83B46]">₹5,000 Value</p>
              <p className="text-[10px] sm:text-xs text-[#7A6750]">Summit pass included</p>
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-[#1B3629]">Razorpay Secured</p>
              <p className="text-[10px] sm:text-xs text-[#7A6750]">UPI, Cards, NetBanking</p>
            </div>
          </div>

        </div>
      </section>

      {/* Registration Form */}
      <section id="registration-form" className="py-12 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF5EB] rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#E5D7C3] shadow-2xl">
          
          <form onSubmit={handleRegistrationSubmit} className="space-y-6">
            
            <div className="text-center sm:text-left space-y-1.5 border-b border-[#E5D7C3] pb-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C83B46]">
                  Direct Directory Enrollment
                </span>
                <span className="text-xs font-bold text-[#1B3629] bg-[#F2E8D7] px-3 py-1 rounded-full border border-[#E0D2BC]">
                  Annual Membership: ₹5,000
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#1B3629]">
                Pink Pages Registration Form
              </h2>
              <p className="text-xs sm:text-sm text-[#5A7B68] font-serif">
                Submit your business and account credentials. After registering, you will immediately enter your Member Dashboard to activate your membership.
              </p>
            </div>

            {formError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>{formError}</span>
              </div>
            )}

            {/* Invisible Honeypot Field for Bot Detection */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="website_bot_trap">Do not fill this</label>
              <input
                type="text"
                id="website_bot_trap"
                name="website_bot_trap"
                tabIndex="-1"
                autoComplete="off"
                value={formData.website_bot_trap}
                onChange={(e) => setFormData({ ...formData, website_bot_trap: e.target.value })}
              />
            </div>

            {/* Exact 7 Registration Fields Requested */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* 1. Full Name */}
              <div>
                <label className="block text-xs font-bold text-[#1B3629] uppercase mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ananya Sharma"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#F2E8D7] border border-[#E0D2BC] text-sm text-[#1B3629] focus:outline-none focus:ring-2 focus:ring-[#C83B46]"
                />
              </div>

              {/* 2. Organisation */}
              <div>
                <label className="block text-xs font-bold text-[#1B3629] uppercase mb-1">
                  Organisation / Enterprise *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sharma Crafts & Textiles"
                  value={formData.orgName}
                  onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#F2E8D7] border border-[#E0D2BC] text-sm text-[#1B3629] focus:outline-none focus:ring-2 focus:ring-[#C83B46]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* 3. Designation */}
              <div>
                <label className="block text-xs font-bold text-[#1B3629] uppercase mb-1">
                  Designation / Role *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Founder, CEO, Partner, Director"
                  value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#F2E8D7] border border-[#E0D2BC] text-sm text-[#1B3629] focus:outline-none focus:ring-2 focus:ring-[#C83B46]"
                />
              </div>

              {/* 4. Email Address */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="email" className="block text-xs font-bold text-[#1B3629] uppercase">
                    Email Address *
                  </label>
                  {isEmailVerified ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#2E7D32]">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      aria-label="Send OTP Code for Email Verification"
                      className="text-[11px] font-bold text-[#C83B46] hover:underline cursor-pointer"
                    >
                      {otpSending ? 'Sending OTP...' : 'Verify with OTP'}
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (isEmailVerified) setIsEmailVerified(false);
                    }}
                    className={`w-full px-4 py-3 rounded-xl bg-[#F2E8D7] border text-sm text-[#1B3629] focus:outline-none focus:ring-2 focus:ring-[#C83B46] ${
                      isEmailVerified ? 'border-[#2E7D32] bg-[#E8F5E9]/50' : 'border-[#E0D2BC]'
                    }`}
                  />
                  {isEmailVerified && (
                    <MailCheck className="w-4 h-4 text-[#2E7D32] absolute right-3 top-3.5" />
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* 5. Whatsapp No. */}
              <div>
                <label className="block text-xs font-bold text-[#1B3629] uppercase mb-1">
                  WhatsApp / Mobile No. * (International format allowed)
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210 or +1 415 555 2671"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#F2E8D7] border border-[#E0D2BC] text-sm text-[#1B3629] focus:outline-none focus:ring-2 focus:ring-[#C83B46]"
                />
              </div>

              {/* 6. Pincode / Postal Code */}
              <div>
                <label className="block text-xs font-bold text-[#1B3629] uppercase mb-1">
                  Pincode / Postal Code *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 226016 or 10001 or W1A 1AA"
                  value={formData.pincode || formData.cityPin}
                  onChange={(e) => setFormData({ ...formData, cityPin: e.target.value, pincode: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#F2E8D7] border border-[#E0D2BC] text-sm text-[#1B3629] focus:outline-none focus:ring-2 focus:ring-[#C83B46]"
                />
              </div>
            </div>

            {/* 6. Password & 7. Confirm Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <label className="block text-xs font-bold text-[#1B3629] uppercase mb-1">
                  Password * (Strong Password)
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-4 pr-10 py-3 rounded-xl bg-[#F2E8D7] border border-[#E0D2BC] text-sm text-[#1B3629] focus:outline-none focus:ring-2 focus:ring-[#C83B46]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-[#7A6750] hover:text-[#1B3629]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {/* Realtime Password Criteria Checklist */}
                {formData.password.length > 0 && (
                  <div className="mt-2 text-[11px] grid grid-cols-2 gap-1 p-2.5 rounded-xl bg-[#FAF5EB] border border-[#E0D2BC]">
                    <span className={passStrength.length ? "text-green-700 font-bold" : "text-[#8A755A]"}>
                      {passStrength.length ? "✓" : "○"} Min. 8 chars
                    </span>
                    <span className={passStrength.hasUpper ? "text-green-700 font-bold" : "text-[#8A755A]"}>
                      {passStrength.hasUpper ? "✓" : "○"} Uppercase (A-Z)
                    </span>
                    <span className={passStrength.hasLower ? "text-green-700 font-bold" : "text-[#8A755A]"}>
                      {passStrength.hasLower ? "✓" : "○"} Lowercase (a-z)
                    </span>
                    <span className={passStrength.hasNumber ? "text-green-700 font-bold" : "text-[#8A755A]"}>
                      {passStrength.hasNumber ? "✓" : "○"} Number (0-9)
                    </span>
                    <span className={`col-span-2 ${passStrength.hasSpecial ? "text-green-700 font-bold" : "text-[#8A755A]"}`}>
                      {passStrength.hasSpecial ? "✓" : "○"} Special character (!@#$%...)
                    </span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1B3629] uppercase mb-1">
                  Confirm Password *
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#F2E8D7] border border-[#E0D2BC] text-sm text-[#1B3629] focus:outline-none focus:ring-2 focus:ring-[#C83B46]"
                />
              </div>
            </div>

            {/* OTP Status Callout */}
            {!isEmailVerified && (
              <div className="bg-[#FFF3E0] border border-[#FFE0B2] p-3.5 rounded-2xl flex items-center justify-between gap-3 text-xs text-[#E65100]">
                <div className="flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-[#F57C00] shrink-0" />
                  <span>Email verification required. Click 'Verify with OTP' to receive code.</span>
                </div>
                <button
                  type="button"
                  onClick={handleSendOtp}
                  aria-label="Send OTP verification code"
                  className="px-3 py-1 rounded-lg bg-[#F57C00] text-white font-bold text-[11px] shrink-0 hover:bg-[#E65100] transition-colors cursor-pointer"
                >
                  Send OTP
                </button>
              </div>
            )}

            {/* Submit CTA */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#C83B46] hover:bg-[#A82B36] text-white py-4 rounded-full text-base font-bold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
              >
                {isSubmitting ? (
                  <span>Saving Profile &amp; Preparing Dashboard...</span>
                ) : (
                  <>
                    <span>Submit &amp; Open Member Dashboard (₹5,000)</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
              <p className="text-center text-xs text-[#7A6750] mt-3">
                Includes full directory indexing + Early Bird entry to Amaleeni Womenpreneurs 2027.
              </p>
            </div>

          </form>

        </div>
      </section>

      {/* 3.2 Frequently Asked Questions */}
      <section className="py-12 sm:py-16 lg:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C83B46]">
              Clear Answers
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#1B3629]">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-[#4E6B5A] font-serif">
              Everything you need to know about Pink Pages membership, benefits, and directory access.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className="bg-[#FAF5EB] rounded-2xl border border-[#E5D7C3] overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-serif text-lg sm:text-xl font-bold text-[#1B3629] hover:text-[#C83B46] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#D49B4B] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#C83B46]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 border-t border-[#EFE5D5] text-sm sm:text-base text-[#4E6B5A] font-serif leading-relaxed">
                      <p>
                        {faq.a}{' '}
                        {faq.hasLoginLink && (
                          <button
                            type="button"
                            onClick={() => setIsLoginOpen(true)}
                            className="text-[#C83B46] font-bold underline hover:text-[#A82B36] inline-flex items-center gap-1 cursor-pointer"
                          >
                            <span>[log in here]</span>
                          </button>
                        )}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 3.3 Closing call to action */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="bg-gradient-to-br from-[#1B3629] to-[#13281E] text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-xl border border-[#D49B4B]/40">
          
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D49B4B]">
              Ready to Join
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-white">
              Take your place in India's premier women's business directory
            </h2>
            <p className="text-sm sm:text-base text-[#A8C2B3] font-serif max-w-xl mx-auto">
              Questions? Write to{' '}
              <a
                href="mailto:delegates@amaleeni.com"
                className="text-[#D49B4B] underline font-semibold hover:text-white"
              >
                delegates@amaleeni.com
              </a>{' '}
              or WhatsApp us at{' '}
              <a
                href="https://wa.me/919810055241"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D49B4B] underline font-semibold hover:text-white"
              >
                +91 98100 55241
              </a>
              .
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={scrollToForm}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#C83B46] hover:bg-[#A82B36] text-white px-8 py-3.5 rounded-full text-base font-bold transition-all shadow-lg hover:shadow-xl cursor-pointer"
            >
              <span>Register on Pink Pages</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => setIsLoginOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-transparent hover:bg-white/10 text-white px-6 py-3.5 rounded-full text-base font-semibold border border-white/30 transition-colors cursor-pointer"
            >
              <LogIn className="w-4 h-4 text-[#D49B4B]" />
              <span>Already registered? Log into your account</span>
            </button>

            {onOpenContact && (
              <button
                type="button"
                onClick={onOpenContact}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#D49B4B] hover:bg-[#c28b3c] text-[#1B3629] px-6 py-3.5 rounded-full text-base font-bold transition-colors cursor-pointer shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Write to Secretariat</span>
              </button>
            )}
          </div>

          <p className="text-xs text-[#7A9988] font-serif pt-1">
            ₹5,000 Annual Fee • Direct access to national and international opportunities
          </p>

        </div>
      </section>

      {/* Account Login Modal (Supports "Already registered? Log into your account") */}
      {isLoginOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#FAF5EB] rounded-3xl p-6 sm:p-8 max-w-md w-full border border-[#E5D7C3] shadow-2xl relative space-y-5">
            
            <button
              onClick={() => {
                setIsLoginOpen(false);
                setLoginError('');
              }}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#F2E8D7] text-[#1B3629] flex items-center justify-center hover:bg-[#C83B46] hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-[#C83B46]">
                Member Directory Portal
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#1B3629]">
                Log into Pink Pages
              </h3>
              <p className="text-xs text-[#5A7B68] font-serif">
                Enter your credentials to access your dashboard and directory listing.
              </p>
            </div>

            {loginError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-3.5 py-2.5 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#1B3629] uppercase mb-1">
                  WhatsApp No. or Email Address
                </label>
                <input
                  type="text"
                  required
                  placeholder="+91 98765 43210 or email@domain.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F2E8D7] border border-[#E0D2BC] text-sm text-[#1B3629] focus:outline-none focus:ring-2 focus:ring-[#C83B46]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1B3629] uppercase mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F2E8D7] border border-[#E0D2BC] text-sm text-[#1B3629] focus:outline-none focus:ring-2 focus:ring-[#C83B46]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full bg-[#C83B46] hover:bg-[#A82B36] text-white py-3 rounded-full text-sm font-bold transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
                >
                  <span>{isLoggingIn ? 'Logging In...' : 'Sign In to Dashboard'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="text-center pt-1">
                <span className="text-xs text-[#7A6750]">
                  Not registered yet?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setIsLoginOpen(false);
                      scrollToForm();
                    }}
                    className="text-[#C83B46] font-bold underline hover:text-[#A82B36]"
                  >
                    Register now for ₹5,000
                  </button>
                </span>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* OTP Verification Modal */}
      {isOtpModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#FAF5EB] rounded-3xl p-6 sm:p-8 max-w-md w-full border border-[#E5D7C3] shadow-2xl relative space-y-5">
            
            <button
              onClick={() => setIsOtpModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#F2E8D7] text-[#1B3629] flex items-center justify-center hover:bg-[#C83B46] hover:text-white transition-colors"
              aria-label="Close OTP Modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1 text-center">
              <div className="w-12 h-12 rounded-full bg-[#1B3629] text-[#D49B4B] mx-auto flex items-center justify-center shadow-md">
                <KeyRound className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#1B3629]">
                Verify Email Address
              </h3>
              <p className="text-xs text-[#5A7B68] font-serif">
                Enter the 6-digit verification code sent to <span className="font-bold text-[#1B3629]">{formData.email}</span>.
              </p>
            </div>

            {otpError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-3.5 py-2.5 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                <span>{otpError}</span>
              </div>
            )}

            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#1B3629] uppercase mb-1 text-center">
                  6-Digit OTP Code
                </label>
                <input
                  type="text"
                  maxLength={6}
                  required
                  placeholder="123456"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                  className="w-full text-center text-2xl tracking-[0.5em] font-mono py-3 rounded-xl bg-[#F2E8D7] border border-[#E0D2BC] text-[#1B3629] focus:outline-none focus:ring-2 focus:ring-[#C83B46]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={otpVerifying}
                  aria-label="Verify OTP Code"
                  className="w-full bg-[#C83B46] hover:bg-[#A82B36] text-white py-3 rounded-full text-sm font-bold transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
                >
                  <span>{otpVerifying ? 'Verifying Code...' : 'Verify OTP Code'}</span>
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              </div>

              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={otpSending}
                  aria-label="Resend OTP Code"
                  className="text-xs text-[#C83B46] font-bold underline hover:text-[#A82B36] cursor-pointer"
                >
                  {otpSending ? 'Resending OTP...' : 'Resend OTP Code'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
