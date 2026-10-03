import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Save, 
  CreditCard, 
  Phone, 
  Mail, 
  MapPin, 
  Globe, 
  Share2, 
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { useToast } from '../../context/ToastContext';

export default function AdminSettingsPage() {
  const { showToast } = useToast();
  const { siteSettings, updateSettings } = useAdminAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    razorpay_key_id: '',
    razorpay_key_secret: '',
    razorpay_webhook_secret: '',
    whatsapp_number: '',
    phone_number: '',
    contact_email: '',
    secretariat_email: '',
    registered_address: '',
    google_map_url: '',
    facebook_url: '',
    instagram_url: '',
    linkedin_url: '',
    youtube_url: '',
    twitter_url: '',
    admin_notification_email: '',
  });

  useEffect(() => {
    if (siteSettings) {
      setFormData({
        razorpay_key_id: siteSettings.razorpay_key_id || 'rzp_test_YourKeyIdHere',
        razorpay_key_secret: siteSettings.razorpay_key_secret || '',
        razorpay_webhook_secret: siteSettings.razorpay_webhook_secret || 'amalEEni27$',
        whatsapp_number: siteSettings.whatsapp_number || '+91 98100 55241',
        phone_number: siteSettings.phone_number || '+91 98100 55241',
        contact_email: siteSettings.contact_email || 'hello@amaleeni.com',
        secretariat_email: siteSettings.secretariat_email || 'delegates@amaleeni.com',
        registered_address: siteSettings.registered_address || 'Krishna Co-op Society, Boat Club Road, Pune, Maharashtra 411003',
        google_map_url: siteSettings.google_map_url || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.996173003254!2d73.8741!3d18.5284',
        facebook_url: siteSettings.facebook_url || 'https://facebook.com/amaleenifoundation',
        instagram_url: siteSettings.instagram_url || 'https://instagram.com/amaleenifoundation',
        linkedin_url: siteSettings.linkedin_url || 'https://linkedin.com/company/amaleeni-foundation',
        youtube_url: siteSettings.youtube_url || 'https://youtube.com/@amaleenifoundation',
        twitter_url: siteSettings.twitter_url || 'https://twitter.com/amaleeni',
        admin_notification_email: siteSettings.admin_notification_email || 'delegates@amaleeni.com, hello@amaleeni.com',
      });
    }
  }, [siteSettings]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await updateSettings(formData);
      showToast('Site settings & Razorpay keys updated successfully!');
    } catch (err) {
      showToast(err.message || 'Failed to update settings', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F3EA]">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:pl-64 flex flex-col min-h-screen">
        <AdminHeader onMenuClick={() => setSidebarOpen(true)} title="Site Settings &amp; Configuration" />

        <main className="p-4 sm:p-8 space-y-8 grow">
          
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Razorpay API Keys Box */}
            <div className="bg-[#FAF5EB] rounded-3xl p-6 sm:p-8 border border-[#E5D7C3] shadow-sm space-y-6">
              <div className="flex items-center gap-3 border-b border-[#E0D2BC] pb-4">
                <div className="w-10 h-10 rounded-2xl bg-[#C83B46] text-white flex items-center justify-center">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#1B3629]">Razorpay Payment Gateway API Keys</h3>
                  <p className="text-xs text-[#7A6750]">Configure live/test payment credentials for ₹5,000 Pink Pages membership payments</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1B3629] uppercase mb-1">Razorpay Key ID</label>
                  <input
                    type="text"
                    required
                    value={formData.razorpay_key_id}
                    onChange={(e) => setFormData({ ...formData, razorpay_key_id: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F2E8D7] border border-[#E0D2BC] text-sm text-[#1B3629] font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1B3629] uppercase mb-1">Razorpay Key Secret</label>
                  <input
                    type="password"
                    value={formData.razorpay_key_secret}
                    onChange={(e) => setFormData({ ...formData, razorpay_key_secret: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F2E8D7] border border-[#E0D2BC] text-sm text-[#1B3629] font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1B3629] uppercase mb-1">Razorpay Webhook Secret</label>
                <input
                  type="text"
                  value={formData.razorpay_webhook_secret}
                  onChange={(e) => setFormData({ ...formData, razorpay_webhook_secret: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F2E8D7] border border-[#E0D2BC] text-sm text-[#1B3629] font-mono"
                />
              </div>
            </div>

            {/* Contact Details & Notification Box */}
            <div className="bg-[#FAF5EB] rounded-3xl p-6 sm:p-8 border border-[#E5D7C3] shadow-sm space-y-6">
              <div className="flex items-center gap-3 border-b border-[#E0D2BC] pb-4">
                <div className="w-10 h-10 rounded-2xl bg-[#1B3629] text-white flex items-center justify-center">
                  <Phone className="w-5 h-5 text-[#D49B4B]" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#1B3629]">Contact Details &amp; Lead Notification Emails</h3>
                  <p className="text-xs text-[#7A6750]">Site-wide WhatsApp number, phone numbers, and notification recipients</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1B3629] uppercase mb-1">WhatsApp Floating Button Number</label>
                  <input
                    type="text"
                    value={formData.whatsapp_number}
                    onChange={(e) => setFormData({ ...formData, whatsapp_number: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F2E8D7] border border-[#E0D2BC] text-sm text-[#1B3629] font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1B3629] uppercase mb-1">Primary Phone Number</label>
                  <input
                    type="text"
                    value={formData.phone_number}
                    onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F2E8D7] border border-[#E0D2BC] text-sm text-[#1B3629]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1B3629] uppercase mb-1">Primary Support Email</label>
                  <input
                    type="email"
                    value={formData.contact_email}
                    onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F2E8D7] border border-[#E0D2BC] text-sm text-[#1B3629]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1B3629] uppercase mb-1">Secretariat Registration Desk Email</label>
                  <input
                    type="email"
                    value={formData.secretariat_email}
                    onChange={(e) => setFormData({ ...formData, secretariat_email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F2E8D7] border border-[#E0D2BC] text-sm text-[#1B3629]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1B3629] uppercase mb-1">Lead Alert Notification Emails (Comma-Separated)</label>
                <input
                  type="text"
                  value={formData.admin_notification_email}
                  onChange={(e) => setFormData({ ...formData, admin_notification_email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F2E8D7] border border-[#E0D2BC] text-sm text-[#1B3629] font-mono"
                  placeholder="delegates@amaleeni.com, hello@amaleeni.com"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1B3629] uppercase mb-1">Registered Office Address</label>
                <input
                  type="text"
                  value={formData.registered_address}
                  onChange={(e) => setFormData({ ...formData, registered_address: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F2E8D7] border border-[#E0D2BC] text-sm text-[#1B3629]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1B3629] uppercase mb-1">Google Maps Embed URL</label>
                <input
                  type="url"
                  value={formData.google_map_url}
                  onChange={(e) => setFormData({ ...formData, google_map_url: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F2E8D7] border border-[#E0D2BC] text-sm text-[#1B3629]"
                />
              </div>
            </div>

            {/* Social Media Links Box */}
            <div className="bg-[#FAF5EB] rounded-3xl p-6 sm:p-8 border border-[#E5D7C3] shadow-sm space-y-6">
              <div className="flex items-center gap-3 border-b border-[#E0D2BC] pb-4">
                <div className="w-10 h-10 rounded-2xl bg-[#D49B4B] text-white flex items-center justify-center">
                  <Share2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#1B3629]">Social Media Channels</h3>
                  <p className="text-xs text-[#7A6750]">Configure foundation social media links</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1B3629] uppercase mb-1">Facebook URL</label>
                  <input
                    type="url"
                    value={formData.facebook_url}
                    onChange={(e) => setFormData({ ...formData, facebook_url: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F2E8D7] border border-[#E0D2BC] text-sm text-[#1B3629]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1B3629] uppercase mb-1">Instagram URL</label>
                  <input
                    type="url"
                    value={formData.instagram_url}
                    onChange={(e) => setFormData({ ...formData, instagram_url: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F2E8D7] border border-[#E0D2BC] text-sm text-[#1B3629]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1B3629] uppercase mb-1">LinkedIn URL</label>
                  <input
                    type="url"
                    value={formData.linkedin_url}
                    onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F2E8D7] border border-[#E0D2BC] text-sm text-[#1B3629]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1B3629] uppercase mb-1">YouTube Channel URL</label>
                  <input
                    type="url"
                    value={formData.youtube_url}
                    onChange={(e) => setFormData({ ...formData, youtube_url: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F2E8D7] border border-[#E0D2BC] text-sm text-[#1B3629]"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#C83B46] hover:bg-[#A82B36] text-white px-8 py-3.5 rounded-full text-base font-bold transition-all flex items-center gap-2 shadow-lg cursor-pointer"
              >
                <Save className="w-5 h-5" />
                <span>{isSubmitting ? 'Saving Settings...' : 'Save Site Settings &amp; Keys'}</span>
              </button>
            </div>

          </form>

        </main>
      </div>
    </div>
  );
}
