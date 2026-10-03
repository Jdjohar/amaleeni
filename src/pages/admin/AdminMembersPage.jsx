import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Edit3, 
  CheckCircle2, 
  XCircle, 
  Trash2, 
  Download,
  Building2,
  Phone,
  Mail,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import MemberEditModal from '../../components/admin/MemberEditModal';
import { fetchAdminMembersApi, togglePaymentStatusApi, deleteMemberApi } from '../../services/api';
import { useToast } from '../../context/ToastContext';

export default function AdminMembersPage() {
  const { showToast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sectorFilter, setSectorFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Edit Modal State
  const [editingMember, setEditingMember] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    loadMembers();
  }, [search, statusFilter, sectorFilter]);

  const loadMembers = async () => {
    setIsLoading(true);
    try {
      const res = await fetchAdminMembersApi(search, statusFilter, sectorFilter);
      if (res && res.members) {
        setMembers(res.members);
      }
    } catch (err) {
      showToast('Failed to load Pink Pages members', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTogglePayment = async (userId, currentStatus) => {
    const newStatus = currentStatus === 'PAID' ? 'PENDING' : 'PAID';
    try {
      await togglePaymentStatusApi(userId, newStatus);
      showToast(`Membership status updated to ${newStatus}`);
      loadMembers();
    } catch (err) {
      showToast(err.message || 'Failed to update payment status', 'error');
    }
  };

  const handleDeleteMember = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this Pink Pages directory entry?')) return;
    try {
      await deleteMemberApi(userId);
      showToast('Member entry deleted successfully');
      loadMembers();
    } catch (err) {
      showToast('Failed to delete member', 'error');
    }
  };

  const openEditModal = (member) => {
    setEditingMember(member);
    setIsEditModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F8F3EA]">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:pl-64 flex flex-col min-h-screen">
        <AdminHeader onMenuClick={() => setSidebarOpen(true)} title="Pink Pages Directory Members" />

        <main className="p-4 sm:p-8 space-y-6 grow">
          
          {/* Top Actions & Filters */}
          <div className="bg-[#FAF5EB] rounded-3xl p-6 border border-[#E5D7C3] shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#1B3629]">
                  Registered Directory Entries ({members.length})
                </h2>
                <p className="text-xs text-[#7A6750]">
                  Admin &amp; User editable Pink Pages profiles
                </p>
              </div>

              <a
                href="/api/admin-export.php?type=members"
                download
                className="inline-flex items-center gap-2 bg-[#C83B46] hover:bg-[#A82B36] text-white px-5 py-2.5 rounded-full text-xs font-bold transition-colors shadow-md"
              >
                <Download className="w-4 h-4" />
                <span>Export Member Roster CSV</span>
              </a>
            </div>

            {/* Filter Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="relative">
                <Search className="w-4 h-4 text-[#8A755A] absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="Search name, org, email, ref ID..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F2E8D7] border border-[#E0D2BC] text-xs text-[#1B3629] focus:outline-none focus:ring-2 focus:ring-[#C83B46]"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl bg-[#F2E8D7] border border-[#E0D2BC] text-xs text-[#1B3629] font-bold"
              >
                <option value="">All Payment Statuses</option>
                <option value="PAID">PAID (₹5,000 Verified)</option>
                <option value="PENDING">PENDING (Unverified)</option>
              </select>

              <select
                value={sectorFilter}
                onChange={(e) => setSectorFilter(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl bg-[#F2E8D7] border border-[#E0D2BC] text-xs text-[#1B3629]"
              >
                <option value="">All Industry Sectors</option>
                <option value="Manufacturing &amp; Engineering">Manufacturing &amp; Engineering</option>
                <option value="Technology &amp; Digital">Technology &amp; Digital</option>
                <option value="Agriculture &amp; Agri-Business">Agriculture &amp; Agri-Business</option>
                <option value="Healthcare &amp; Life Sciences">Healthcare &amp; Life Sciences</option>
                <option value="Beauty, Aesthetics &amp; Wellness">Beauty, Aesthetics &amp; Wellness</option>
              </select>
            </div>
          </div>

          {/* Members Table */}
          <div className="bg-[#FAF5EB] rounded-3xl border border-[#E5D7C3] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F2E8D7] border-b border-[#E0D2BC] text-[11px] font-bold uppercase tracking-wider text-[#1B3629]">
                    <th className="py-3.5 px-4 sm:px-6">Ref ID &amp; Name</th>
                    <th className="py-3.5 px-4 sm:px-6">Organization / Sector</th>
                    <th className="py-3.5 px-4 sm:px-6">Contact Details</th>
                    <th className="py-3.5 px-4 sm:px-6">Membership</th>
                    <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAE0D0] text-xs text-[#1B3629]">
                  {members.map((m, idx) => (
                    <tr key={idx} className="hover:bg-[#F7EFE1] transition-colors">
                      <td className="py-4 px-4 sm:px-6">
                        <span className="font-mono text-[10px] font-bold text-[#C83B46] bg-[#C83B46]/10 px-2 py-0.5 rounded">
                          {m.ref_id || 'PP-PENDING'}
                        </span>
                        <p className="font-serif font-bold text-sm text-[#1B3629] mt-1">{m.full_name || 'Anonymous User'}</p>
                        <p className="text-[11px] text-[#7A6750]">{m.designation || 'Founder'}</p>
                      </td>

                      <td className="py-4 px-4 sm:px-6">
                        <p className="font-bold text-[#1B3629]">{m.org_name || 'N/A'}</p>
                        <p className="text-[11px] text-[#4E6B5A]">{m.sector || 'General Business'}</p>
                        <p className="text-[10px] text-[#8A755A]">{m.city || m.state_country || 'India'}</p>
                      </td>

                      <td className="py-4 px-4 sm:px-6 space-y-0.5">
                        <p className="flex items-center gap-1 text-[11px]">
                          <Mail className="w-3 h-3 text-[#C83B46]" />
                          <span>{m.email}</span>
                        </p>
                        <p className="flex items-center gap-1 text-[11px] font-mono">
                          <Phone className="w-3 h-3 text-[#1B3629]" />
                          <span>{m.phone || 'N/A'}</span>
                        </p>
                      </td>

                      <td className="py-4 px-4 sm:px-6">
                        <button
                          onClick={() => handleTogglePayment(m.user_id || m.id, m.payment_status)}
                          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 transition-transform active:scale-95 cursor-pointer ${
                            m.payment_status === 'PAID'
                              ? 'bg-green-100 text-green-800 border border-green-300'
                              : 'bg-amber-100 text-amber-800 border border-amber-300'
                          }`}
                          title="Click to toggle payment status"
                        >
                          {m.payment_status === 'PAID' ? (
                            <>
                              <CheckCircle2 className="w-3 h-3 text-green-600" />
                              <span>PAID (₹5,000)</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3 h-3 text-amber-600" />
                              <span>PENDING</span>
                            </>
                          )}
                        </button>
                      </td>

                      <td className="py-4 px-4 sm:px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditModal(m)}
                            className="p-2 rounded-xl bg-[#1B3629] text-white hover:bg-[#12251C] transition-colors cursor-pointer"
                            title="Edit Entry"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteMember(m.user_id || m.id)}
                            className="p-2 rounded-xl bg-red-100 text-red-700 hover:bg-red-200 transition-colors cursor-pointer"
                            title="Delete Entry"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {members.length === 0 && !isLoading && (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-gray-500 italic">
                        No Pink Pages directory members match your search criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>

      {/* Edit Modal Component */}
      <MemberEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        member={editingMember}
        onSaved={loadMembers}
      />
    </div>
  );
}
