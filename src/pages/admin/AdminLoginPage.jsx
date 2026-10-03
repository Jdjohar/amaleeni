import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, ArrowRight, Sparkles } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { useToast } from '../../context/ToastContext';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const { loginAdmin } = useAdminAuth();
  const { showToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await loginAdmin(email.trim(), password);
      showToast('Admin login successful!');
      navigate('/admin');
    } catch (err) {
      showToast(err.message || 'Invalid admin credentials', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="paper-texture min-h-screen pt-32 pb-20 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-[#1B3629] text-white rounded-3xl p-8 sm:p-10 border border-[#2F5A43] shadow-2xl relative overflow-hidden">
        
        {/* Header Branding */}
        <div className="text-center space-y-3 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[#C83B46] text-white mx-auto flex items-center justify-center font-serif font-extrabold text-2xl shadow-lg border border-white/20">
            A
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#D49B4B] flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Amaleeni Foundation Console</span>
            </span>
            <h1 className="font-serif text-3xl font-bold text-[#FAF5EB] mt-1">
              Admin &amp; Team Portal
            </h1>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#A8C2B3] uppercase tracking-wider mb-1.5">
              Admin / Team Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#8A755A] absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                placeholder="president@amaleeni.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#244735] border border-[#345E47] text-white text-sm placeholder-gray-400 focus:outline-none focus:border-[#C83B46]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#A8C2B3] uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#8A755A] absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#244735] border border-[#345E47] text-white text-sm placeholder-gray-400 focus:outline-none focus:border-[#C83B46]"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#C83B46] hover:bg-[#A82B36] text-white py-3.5 rounded-full text-base font-bold transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <span>{isSubmitting ? 'Authenticating...' : 'Sign In to Admin Panel'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        <div className="mt-8 pt-4 border-t border-[#2F5A43] text-center">
          <p className="text-[11px] text-[#A8C2B3]">
            Default Admin Login: <span className="font-mono text-[#D49B4B]">president@amaleeni.com</span>
          </p>
        </div>

      </div>
    </div>
  );
}
