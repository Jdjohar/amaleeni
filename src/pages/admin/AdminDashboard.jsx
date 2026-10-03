import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  CheckCircle2, 
  IndianRupee, 
  Inbox, 
  Mail, 
  UserCheck, 
  ArrowRight, 
  Sparkles,
  TrendingUp,
  Download
} from 'lucide-react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import { fetchAdminMembersApi, fetchAdminInquiriesApi, fetchAdminTeamApi } from '../../services/api';

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [members, setMembers] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [teamCount, setTeamCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const [mRes, iRes, tRes] = await Promise.all([
        fetchAdminMembersApi(),
        fetchAdminInquiriesApi(),
        fetchAdminTeamApi(),
      ]);
      if (mRes && mRes.members) setMembers(mRes.members);
      if (iRes && iRes.inquiries) setInquiries(iRes.inquiries);
      if (tRes && tRes.team) setTeamCount(tRes.team.length);
    } catch (e) {
      console.warn('Dashboard fetch note:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const paidMembersCount = members.filter((m) => m.payment_status === 'PAID').length;
  const totalRevenue = paidMembersCount * 5000;
  const newInquiriesCount = inquiries.filter((i) => i.status === 'NEW' || !i.status).length;

  return (
    <div className="min-h-screen bg-[#F8F3EA]">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:pl-64 flex flex-col min-h-screen">
        <AdminHeader onMenuClick={() => setSidebarOpen(true)} title="Executive Dashboard" />

        <main className="p-4 sm:p-8 space-y-8 grow">
          
          {/* Top Welcome Banner */}
          <div className="bg-[#1B3629] text-white rounded-3xl p-6 sm:p-8 border border-[#2F5A43] shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C83B46] text-white text-[10px] font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Live Management Console</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF5EB]">
                Welcome to Amaleeni Admin Panel
              </h2>
              <p className="text-xs sm:text-sm text-[#A8C2B3] mt-1 font-serif">
                Manage Pink Pages members, edit directory entries, track leads, and update site settings.
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <a
                href="/api/admin-export.php?type=members"
                download
                className="inline-flex items-center gap-2 bg-[#FAF5EB] hover:bg-[#F2E8D7] text-[#1B3629] px-4 py-2.5 rounded-xl text-xs font-bold transition-colors shadow-xs"
              >
                <Download className="w-4 h-4 text-[#C83B46]" />
                <span>Export Members CSV</span>
              </a>
            </div>
          </div>

          {/* Metric KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-[#FAF5EB] rounded-2xl p-5 border border-[#E5D7C3] shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#7A6750]">Total Members</p>
                <p className="font-serif text-3xl font-extrabold text-[#1B3629] mt-1">{members.length}</p>
                <p className="text-[11px] text-[#3D5C4A] mt-1 font-semibold">Pink Pages Directory</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#1B3629]/10 text-[#1B3629] flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-[#FAF5EB] rounded-2xl p-5 border border-[#E5D7C3] shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#7A6750]">Verified Paid Members</p>
                <p className="font-serif text-3xl font-extrabold text-[#C83B46] mt-1">{paidMembersCount}</p>
                <p className="text-[11px] text-[#C83B46] mt-1 font-semibold">₹5,000 Active Badges</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#C83B46]/10 text-[#C83B46] flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-[#FAF5EB] rounded-2xl p-5 border border-[#E5D7C3] shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#7A6750]">Collected Revenue</p>
                <p className="font-serif text-2xl font-extrabold text-[#1B3629] mt-1">₹{totalRevenue.toLocaleString('en-IN')}</p>
                <p className="text-[11px] text-[#3D5C4A] mt-1 font-semibold">Membership Fees</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#D49B4B]/15 text-[#D49B4B] flex items-center justify-center">
                <IndianRupee className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-[#FAF5EB] rounded-2xl p-5 border border-[#E5D7C3] shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#7A6750]">Form Inquiries &amp; Leads</p>
                <p className="font-serif text-3xl font-extrabold text-[#1B3629] mt-1">{inquiries.length}</p>
                <p className="text-[11px] text-[#C83B46] mt-1 font-semibold">{newInquiriesCount} New Leads</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#1B3629]/10 text-[#1B3629] flex items-center justify-center">
                <Inbox className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Recent Members & Recent Form Inquiries Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Recent Members Box */}
            <div className="bg-[#FAF5EB] rounded-3xl p-6 border border-[#E5D7C3] shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#1B3629]">Recent Pink Pages Registrations</h3>
                  <p className="text-xs text-[#7A6750]">Latest directory member additions</p>
                </div>
                <Link to="/admin/members" className="text-xs font-bold text-[#C83B46] hover:underline flex items-center gap-1">
                  <span>View All →</span>
                </Link>
              </div>

              <div className="divide-y divide-[#EAE0D0]">
                {members.slice(0, 5).map((m, idx) => (
                  <div key={idx} className="py-3 flex items-center justify-between gap-3 text-xs">
                    <div className="min-w-0">
                      <p className="font-bold text-[#1B3629] truncate">{m.full_name || 'Member'}</p>
                      <p className="text-[#7A6750] truncate">{m.org_name || m.email}</p>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      m.payment_status === 'PAID' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {m.payment_status || 'PENDING'}
                    </span>
                  </div>
                ))}
                {members.length === 0 && (
                  <p className="py-4 text-xs text-gray-500 italic">No members registered yet.</p>
                )}
              </div>
            </div>

            {/* Recent Inquiries Box */}
            <div className="bg-[#FAF5EB] rounded-3xl p-6 border border-[#E5D7C3] shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#1B3629]">Recent Form Submissions</h3>
                  <p className="text-xs text-[#7A6750]">Website lead &amp; consultation inquiries</p>
                </div>
                <Link to="/admin/inquiries" className="text-xs font-bold text-[#C83B46] hover:underline flex items-center gap-1">
                  <span>View All →</span>
                </Link>
              </div>

              <div className="divide-y divide-[#EAE0D0]">
                {inquiries.slice(0, 5).map((inq, idx) => (
                  <div key={idx} className="py-3 flex items-center justify-between gap-3 text-xs">
                    <div className="min-w-0">
                      <p className="font-bold text-[#1B3629] truncate">{inq.full_name || inq.email}</p>
                      <p className="text-[#7A6750] truncate">{inq.form_type || 'Inquiry'}</p>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#1B3629]/10 text-[#1B3629]">
                      {inq.status || 'NEW'}
                    </span>
                  </div>
                ))}
                {inquiries.length === 0 && (
                  <p className="py-4 text-xs text-gray-500 italic">No form submissions received yet.</p>
                )}
              </div>
            </div>

          </div>

        </main>
      </div>
    </div>
  );
}
