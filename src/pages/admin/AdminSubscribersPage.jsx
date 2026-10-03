import React, { useState, useEffect } from 'react';
import { Mail, Download, Search, Calendar, Globe2 } from 'lucide-react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import { useToast } from '../../context/ToastContext';

export default function AdminSubscribersPage() {
  const { showToast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [subscribers, setSubscribers] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Fetch subscribers list
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const res = await fetch('/api/admin-export.php?type=newsletter_json');
      if (res.ok) {
        const data = await res.json();
        if (data.subscribers) setSubscribers(data.subscribers);
      }
    } catch (e) {
      console.warn('Subscribers list note');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F3EA]">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:pl-64 flex flex-col min-h-screen">
        <AdminHeader onMenuClick={() => setSidebarOpen(true)} title="Newsletter Subscribers" />

        <main className="p-4 sm:p-8 space-y-6 grow">
          
          <div className="bg-[#FAF5EB] rounded-3xl p-6 border border-[#E5D7C3] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#1B3629]">
                Secretariat Updates Subscribers ({subscribers.length})
              </h2>
              <p className="text-xs text-[#7A6750]">
                Users subscribed via website footer newsletter box
              </p>
            </div>

            <a
              href="/api/admin-export.php?type=newsletter"
              download
              className="inline-flex items-center gap-2 bg-[#C83B46] hover:bg-[#A82B36] text-white px-5 py-2.5 rounded-full text-xs font-bold transition-colors shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>Export Subscribers CSV</span>
            </a>
          </div>

          <div className="bg-[#FAF5EB] rounded-3xl border border-[#E5D7C3] shadow-sm overflow-hidden p-6 text-center text-xs text-[#3D5C4A]">
            <p>Subscribers list ready for export. Click <strong>"Export Subscribers CSV"</strong> to download the complete subscriber database formatted for email marketing software.</p>
          </div>

        </main>
      </div>
    </div>
  );
}
