import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [botTrap, setBotTrap] = useState(''); // Honeypot
  const [formLoadedAt] = useState(() => Math.floor(Date.now() / 1000));
  
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const redirectPath = location.state?.from?.pathname || '/pink-pages/dashboard';

  useEffect(() => {
    window.scrollTo(0, 0);
    // If already logged in, send to dashboard
    if (isAuthenticated) {
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, navigate, redirectPath]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    // 1. Bot check: Honeypot field
    if (botTrap) {
      setErrorMsg('Automated bot submission detected. Access forbidden.');
      return;
    }

    // 2. Bot check: Time inspection
    const timeSpent = Math.floor(Date.now() / 1000) - formLoadedAt;
    if (timeSpent < 1) {
      setErrorMsg('Please take a moment before submitting the form.');
      return;
    }

    // 3. Client Validation
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setErrorMsg('Please enter your email address.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setErrorMsg('Please enter a valid email address (e.g. name@domain.com).');
      return;
    }

    if (!password) {
      setErrorMsg('Please enter your password.');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    setIsSubmitting(true);
    try {
      await login(trimmedEmail, password, botTrap);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      navigate(redirectPath, { replace: true });
    } catch (err) {
      setErrorMsg(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoFill = () => {
    setEmail('member@amaleeni.org');
    setPassword('Amaleeni@2027');
    setErrorMsg('');
  };

  return (
    <div className="paper-texture min-h-screen pt-28 sm:pt-32 pb-20 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-4 sm:px-6">
        
        {/* Card Container */}
        <div className="bg-[#FAF5EB] rounded-3xl p-7 sm:p-10 border border-[#E5D7C3] shadow-2xl space-y-6 relative overflow-hidden">
          
          {/* Top Badge */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1B3629]/10 text-[#1B3629] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#C83B46]" />
              <span>Pink Pages Member Portal</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#1B3629]">
              Log into your account
            </h1>

            <p className="text-xs sm:text-sm text-[#4E6B5A] font-serif">
              Access your verified opportunity profile, investor speed-meetings, and summit pass.
            </p>
          </div>

          {/* Error Alert */}
          {errorMsg && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl text-xs flex items-start gap-2.5 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Honeypot Bot Trap (Invisible to humans, caught by bots) */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="website_bot_trap">Do not fill this field</label>
              <input
                type="text"
                id="website_bot_trap"
                name="website_bot_trap"
                tabIndex="-1"
                autoComplete="off"
                value={botTrap}
                onChange={(e) => setBotTrap(e.target.value)}
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-[#1B3629] uppercase mb-1.5">
                Registered Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F2E8D7] border border-[#E0D2BC] text-sm text-[#1B3629] focus:outline-none focus:ring-2 focus:ring-[#C83B46]"
                />
                <Mail className="w-4 h-4 text-[#7A6750] absolute left-3.5 top-3.5" />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold text-[#1B3629] uppercase">
                  Password
                </label>
                <Link
                  to="/pink-pages/register#login"
                  className="text-[11px] text-[#C83B46] hover:underline font-semibold"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-11 py-3 rounded-xl bg-[#F2E8D7] border border-[#E0D2BC] text-sm text-[#1B3629] focus:outline-none focus:ring-2 focus:ring-[#C83B46]"
                />
                <Lock className="w-4 h-4 text-[#7A6750] absolute left-3.5 top-3.5" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-[#7A6750] hover:text-[#1B3629] p-1"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Security Guarantee */}
            <div className="flex items-center gap-2 text-[11px] text-[#5A7B68] pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C83B46]" />
              <span>SQL injection shielded &amp; 256-bit encrypted session</span>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#C83B46] hover:bg-[#A82B36] text-white py-3.5 rounded-full text-sm font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Signing In...</span>
                ) : (
                  <>
                    <span>Log In to Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

          </form>

          {/* Quick Demo Credentials Box */}
          <div className="bg-[#F2E8D7]/80 p-3.5 rounded-2xl border border-[#E0D2BC] text-center space-y-1.5">
            <p className="text-[11px] font-bold text-[#1B3629] uppercase tracking-wider">
              Testing credentials?
            </p>
            <p className="text-xs text-[#5A7B68]">
              You can log in with your freshly registered credentials or use our demo:
            </p>
            <button
              type="button"
              onClick={handleDemoFill}
              className="text-xs font-bold text-[#C83B46] hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Auto-fill Demo Account (member@amaleeni.org)</span>
            </button>
          </div>

          {/* Register Callout */}
          <div className="text-center pt-2 border-t border-[#EAE0D0] text-xs text-[#7A6750]">
            Don't have a Pink Pages profile yet?{' '}
            <Link
              to="/pink-pages/register"
              className="text-[#C83B46] font-bold underline hover:text-[#A82B36]"
            >
              Register here (₹5,000)
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
