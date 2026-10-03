import React, { useState, useEffect } from 'react';
import { X, Save, Building2, User, Mail, Phone, Globe2, MapPin, Sparkles } from 'lucide-react';
import { updateMemberEntryApi } from '../../services/api';
import { useToast } from '../../context/ToastContext';

export default function MemberEditModal({ isOpen, onClose, member, onSaved }) {
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    user_id: '',
    full_name: '',
    email: '',
    phone: '',
    org_name: '',
    designation: '',
    sector: 'Manufacturing & Engineering',
    category: 'Entrepreneurs & Founders',
    city: '',
    state_country: 'India',
    website_url: '',
    seeking: '',
    business_description: '',
    payment_status: 'PENDING',
  });

  useEffect(() => {
    if (member) {
      setFormData({
        user_id: member.user_id || member.id || '',
        full_name: member.full_name || '',
        email: member.email || '',
        phone: member.phone || '',
        org_name: member.org_name || '',
        designation: member.designation || 'Founder / Leader',
        sector: member.sector || 'Manufacturing & Engineering',
        category: member.category || 'Entrepreneurs & Founders',
        city: member.city || '',
        state_country: member.state_country || 'India',
        website_url: member.website_url || '',
        seeking: member.seeking || 'Capital & Investment, Market Access',
        business_description: member.business_description || '',
        payment_status: member.payment_status || 'PENDING',
      });
    }
  }, [member]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await updateMemberEntryApi(formData);
      showToast('Pink Pages entry updated successfully!');
      if (onSaved) onSaved();
      onClose();
    } catch (err) {
      showToast(err.message || 'Failed to update entry', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0E1E16]/75 backdrop-blur-xs animate-fadeIn">
      <div className="bg-[#FAF5EB] rounded-3xl max-w-2xl w-full border border-[#E5D7C3] shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-[#1B3629] text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-[#D49B4B]" />
            <div>
              <h3 className="font-serif text-xl font-bold">Edit Pink Pages Entry</h3>
              <p className="text-xs text-[#A8C2B3]">Ref ID: {member?.ref_id || 'N/A'}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#1B3629] uppercase mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F2E8D7] border border-[#E0D2BC] text-sm text-[#1B3629]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1B3629] uppercase mb-1">Email Address *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F2E8D7] border border-[#E0D2BC] text-sm text-[#1B3629]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#1B3629] uppercase mb-1">Phone / WhatsApp *</label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F2E8D7] border border-[#E0D2BC] text-sm text-[#1B3629]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1B3629] uppercase mb-1">Organization / Business *</label>
              <input
                type="text"
                required
                value={formData.org_name}
                onChange={(e) => setFormData({ ...formData, org_name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F2E8D7] border border-[#E0D2BC] text-sm text-[#1B3629]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#1B3629] uppercase mb-1">Designation</label>
              <input
                type="text"
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F2E8D7] border border-[#E0D2BC] text-sm text-[#1B3629]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1B3629] uppercase mb-1">Industry Sector</label>
              <select
                value={formData.sector}
                onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F2E8D7] border border-[#E0D2BC] text-sm text-[#1B3629]"
              >
                <option value="Manufacturing &amp; Engineering">Manufacturing &amp; Engineering</option>
                <option value="Technology &amp; Digital">Technology &amp; Digital</option>
                <option value="Agriculture &amp; Agri-Business">Agriculture &amp; Agri-Business</option>
                <option value="Healthcare &amp; Life Sciences">Healthcare &amp; Life Sciences</option>
                <option value="Beauty, Aesthetics &amp; Wellness">Beauty, Aesthetics &amp; Wellness</option>
                <option value="Education &amp; Skill Development">Education &amp; Skill Development</option>
                <option value="Finance &amp; Investment">Finance &amp; Investment</option>
                <option value="Fashion, Textiles &amp; Lifestyle">Fashion, Textiles &amp; Lifestyle</option>
                <option value="Legal, Consulting &amp; Professional Services">Legal &amp; Consulting</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#1B3629] uppercase mb-1">City / District</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F2E8D7] border border-[#E0D2BC] text-sm text-[#1B3629]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1B3629] uppercase mb-1">Payment Status (Membership)</label>
              <select
                value={formData.payment_status}
                onChange={(e) => setFormData({ ...formData, payment_status: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F2E8D7] border border-[#E0D2BC] text-sm text-[#1B3629] font-bold text-[#C83B46]"
              >
                <option value="PAID">PAID (₹5,000 Verified)</option>
                <option value="PENDING">PENDING (Unverified)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1B3629] uppercase mb-1">Website URL</label>
            <input
              type="url"
              placeholder="https://example.com"
              value={formData.website_url}
              onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F2E8D7] border border-[#E0D2BC] text-sm text-[#1B3629]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1B3629] uppercase mb-1">Business Description / Bio</label>
            <textarea
              rows={3}
              value={formData.business_description}
              onChange={(e) => setFormData({ ...formData, business_description: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F2E8D7] border border-[#E0D2BC] text-sm text-[#1B3629]"
            />
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-full text-xs font-bold bg-[#F2E8D7] text-[#1B3629]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-full text-xs font-bold bg-[#C83B46] text-white flex items-center gap-2 shadow-md cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{isSubmitting ? 'Saving...' : 'Save Entry Changes'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
