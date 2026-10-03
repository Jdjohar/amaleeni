import React, { useState, useEffect } from 'react';
import { X, Save, User, UserCheck, Sparkles, Image as ImageIcon } from 'lucide-react';
import { saveTeamMemberApi } from '../../services/api';
import { useToast } from '../../context/ToastContext';

export default function TeamMemberModal({ isOpen, onClose, member, onSaved }) {
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    id: 0,
    name: '',
    role: '',
    category: 'Secretariat',
    bio: '',
    status: 'Confirmed',
    image: '',
    sort_order: 0,
  });

  useEffect(() => {
    if (member) {
      setFormData({
        id: member.id || 0,
        name: member.name || '',
        role: member.role || '',
        category: member.category || 'Secretariat',
        bio: member.bio || '',
        status: member.status || 'Confirmed',
        image: member.image || '',
        sort_order: member.sort_order || 0,
      });
    } else {
      setFormData({
        id: 0,
        name: '',
        role: '',
        category: 'Secretariat',
        bio: '',
        status: 'Confirmed',
        image: '',
        sort_order: 0,
      });
    }
  }, [member, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await saveTeamMemberApi(formData);
      showToast(formData.id ? 'Team member updated!' : 'Team member added!');
      if (onSaved) onSaved();
      onClose();
    } catch (err) {
      showToast(err.message || 'Failed to save team member', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0E1E16]/75 backdrop-blur-xs animate-fadeIn">
      <div className="bg-[#FAF5EB] rounded-3xl max-w-xl w-full border border-[#E5D7C3] shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-[#1B3629] text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <UserCheck className="w-5 h-5 text-[#D49B4B]" />
            <h3 className="font-serif text-xl font-bold">
              {formData.id ? 'Edit Team Member' : 'Add New Team Member'}
            </h3>
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
          <div>
            <label className="block text-xs font-bold text-[#1B3629] uppercase mb-1">Full Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Dr. Priya Sharma"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F2E8D7] border border-[#E0D2BC] text-sm text-[#1B3629]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#1B3629] uppercase mb-1">Role / Designation *</label>
              <input
                type="text"
                required
                placeholder="e.g. Core Management &amp; Operations"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F2E8D7] border border-[#E0D2BC] text-sm text-[#1B3629]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1B3629] uppercase mb-1">Category / Group</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F2E8D7] border border-[#E0D2BC] text-sm text-[#1B3629] font-bold text-[#1B3629]"
              >
                <option value="Leadership">Leadership &amp; Trustees</option>
                <option value="Secretariat">Secretariat &amp; Leads</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#1B3629] uppercase mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F2E8D7] border border-[#E0D2BC] text-sm text-[#1B3629]"
              >
                <option value="Confirmed">Confirmed</option>
                <option value="Open Appointment">Open Appointment</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1B3629] uppercase mb-1">Display Sort Order</label>
              <input
                type="number"
                value={formData.sort_order}
                onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F2E8D7] border border-[#E0D2BC] text-sm text-[#1B3629]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1B3629] uppercase mb-1">Photo Image URL / Asset Path</label>
            <input
              type="text"
              placeholder="/assets/member_photo.jpg or https://..."
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F2E8D7] border border-[#E0D2BC] text-sm text-[#1B3629]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1B3629] uppercase mb-1">Short Bio</label>
            <textarea
              rows={3}
              placeholder="Brief introduction or responsibilities..."
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
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
              <span>{isSubmitting ? 'Saving...' : 'Save Team Member'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
