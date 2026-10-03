import React, { useState, useEffect } from 'react';
import { 
  Inbox, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  CheckCircle2, 
  Clock, 
  X, 
  Mail, 
  Phone, 
  Building2, 
  Calendar,
  Sparkles
} from 'lucide-react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import { fetchAdminInquiriesApi, updateInquiryStatusApi } from '../../services/api';
import { useToast } from '../../context/ToastContext';

export default function AdminInquiriesPage() {
  const { showToast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [inquiries, setInquiries] = useState([]);
  const [search, setSearch] = useState('');
  const [formTypeFilter, setFormTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Detail Modal State
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [adminNotes, setAdminNotes] = useState('');

  useEffect(() => {
    loadInquiries();
  }, [search, formTypeFilter, statusFilter]);

  const loadInquiries = async () => {
    setIsLoading(true);
    try {
      const res = await fetchAdminInquiriesApi(search, formTypeFilter, statusFilter);
      if (res && res.inquiries) {
        setInquiries(res.inquiries);
      }
    } catch (err) {
      showToast('Failed to load form inquiries', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenDetailModal = (inquiry) => {
    setSelectedInquiry(inquiry);
    setAdminNotes(inquiry.admin_notes || '');
    setIsDetailModalOpen(true);
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await updateInquiryStatusApi(id, newStatus, adminNotes);
      showToast(`Inquiry status updated to ${newStatus}`);
      if (selectedInquiry) {
        setSelectedInquiry({ ...selectedInquiry, status: newStatus, admin_notes: adminNotes });
      }
      loadInquiries();
    } catch (err) {
      showToast(err.message || 'Failed to update inquiry status', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F3EA]">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:pl-64 flex flex-col min-h-screen">
        <AdminHeader onMenuClick={() => setSidebarOpen(true)} title="Website Form Submissions &amp; Leads" />

        <main className="p-4 sm:p-8 space-y-6 grow">
          
          {/* Top Actions & Filters */}
          <div className="bg-[#FAF5EB] rounded-3xl p-6 border border-[#E5D7C3] shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#1B3629]">
                  Form Submissions &amp; Leads ({inquiries.length})
                </h2>
                <p className="text-xs text-[#7A6750]">
                  Consolidated inquiries from Pink Pages, Secretariat, Consultation &amp; Partner forms
                </p>
              </div>

              <a
                href="/api/admin-export.php?type=inquiries"
                download
                className="inline-flex items-center gap-2 bg-[#C83B46] hover:bg-[#A82B36] text-white px-5 py-2.5 rounded-full text-xs font-bold transition-colors shadow-md"
              >
                <Download className="w-4 h-4" />
                <span>Export Leads CSV</span>
              </a>
            </div>

            {/* Filter Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="relative">
                <Search className="w-4 h-4 text-[#8A755A] absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="Search lead name, email, org, message..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F2E8D7] border border-[#E0D2BC] text-xs text-[#1B3629] focus:outline-none focus:ring-2 focus:ring-[#C83B46]"
                />
              </div>

              <select
                value={formTypeFilter}
                onChange={(e) => setFormTypeFilter(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl bg-[#F2E8D7] border border-[#E0D2BC] text-xs text-[#1B3629]"
              >
                <option value="">All Form Types</option>
                <option value="Single Window Consultation Application">Single Window Consultation</option>
                <option value="Secretariat Direct Contact Enquiry">Secretariat Direct Contact</option>
                <option value="CSR &amp; Partnership Inquiry">CSR &amp; Partnership</option>
                <option value="Pink Pages Directory Registration">Pink Pages Registration</option>
                <option value="Summit Delegate Registration Inquiry">Delegate Registration Inquiry</option>
                <option value="Lineup Nomination / Secretariat Lead Application">Lineup Nomination</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl bg-[#F2E8D7] border border-[#E0D2BC] text-xs text-[#1B3629] font-bold"
              >
                <option value="">All Lead Statuses</option>
                <option value="NEW">NEW (Unprocessed)</option>
                <option value="CONTACTED">CONTACTED</option>
                <option value="RESOLVED">RESOLVED</option>
              </select>
            </div>
          </div>

          {/* Inquiries Table */}
          <div className="bg-[#FAF5EB] rounded-3xl border border-[#E5D7C3] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F2E8D7] border-b border-[#E0D2BC] text-[11px] font-bold uppercase tracking-wider text-[#1B3629]">
                    <th className="py-3.5 px-4 sm:px-6">Form Type &amp; Date</th>
                    <th className="py-3.5 px-4 sm:px-6">Lead Name &amp; Contact</th>
                    <th className="py-3.5 px-4 sm:px-6">Organization / Sector</th>
                    <th className="py-3.5 px-4 sm:px-6">Status</th>
                    <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAE0D0] text-xs text-[#1B3629]">
                  {inquiries.map((inq, idx) => (
                    <tr key={idx} className="hover:bg-[#F7EFE1] transition-colors">
                      <td className="py-4 px-4 sm:px-6">
                        <span className="font-bold text-[#C83B46] block text-xs">
                          {inq.form_type || 'General Inquiry'}
                        </span>
                        <p className="text-[10px] text-[#7A6750] mt-0.5">{inq.created_at || 'Just now'}</p>
                      </td>

                      <td className="py-4 px-4 sm:px-6">
                        <p className="font-serif font-bold text-sm text-[#1B3629]">{inq.full_name || 'Anonymous'}</p>
                        <p className="text-[11px] text-[#4E6B5A]">{inq.email}</p>
                        <p className="text-[10px] font-mono text-[#8A755A]">{inq.phone || 'N/A'}</p>
                      </td>

                      <td className="py-4 px-4 sm:px-6">
                        <p className="font-bold text-[#1B3629]">{inq.organization || 'N/A'}</p>
                        <p className="text-[11px] text-[#4E6B5A]">{inq.sector || 'N/A'}</p>
                      </td>

                      <td className="py-4 px-4 sm:px-6">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          inq.status === 'RESOLVED' ? 'bg-green-100 text-green-800' :
                          inq.status === 'CONTACTED' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {inq.status || 'NEW'}
                        </span>
                      </td>

                      <td className="py-4 px-4 sm:px-6 text-right">
                        <button
                          onClick={() => handleOpenDetailModal(inq)}
                          className="px-3.5 py-1.5 rounded-xl bg-[#1B3629] text-white hover:bg-[#12251C] text-xs font-bold transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5 text-[#D49B4B]" />
                          <span>Inspect Payload</span>
                        </button>
                      </td>
                    </tr>
                  ))}

                  {inquiries.length === 0 && !isLoading && (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-gray-500 italic">
                        No form submissions found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>

      {/* Inquiry Detail Inspector Modal */}
      {isDetailModalOpen && selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0E1E16]/75 backdrop-blur-xs animate-fadeIn">
          <div className="bg-[#FAF5EB] rounded-3xl max-w-2xl w-full border border-[#E5D7C3] shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col">
            
            <div className="bg-[#1B3629] text-white p-6 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#D49B4B]">
                  {selectedInquiry.form_type}
                </span>
                <h3 className="font-serif text-xl font-bold">{selectedInquiry.full_name}</h3>
              </div>

              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 bg-[#F2E8D7] p-4 rounded-2xl border border-[#E0D2BC]">
                <div>
                  <p className="text-[10px] font-bold text-[#7A6750] uppercase">Email</p>
                  <p className="font-bold text-[#1B3629] text-sm">{selectedInquiry.email}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#7A6750] uppercase">Phone / Mobile</p>
                  <p className="font-bold text-[#1B3629] text-sm font-mono">{selectedInquiry.phone || 'N/A'}</p>
                </div>
              </div>

              <div>
                <p className="text-[10px] font-bold text-[#7A6750] uppercase mb-1">Message / Details</p>
                <div className="bg-[#FAF5EB] p-4 rounded-2xl border border-[#E5D7C3] font-serif text-sm text-[#1B3629] whitespace-pre-wrap leading-relaxed">
                  {selectedInquiry.message || 'No message text.'}
                </div>
              </div>

              {/* Status Updater */}
              <div className="pt-2 border-t border-[#EAE0D0] space-y-3">
                <p className="text-[10px] font-bold text-[#1B3629] uppercase">Update Lead Status</p>
                <div className="flex gap-2">
                  {['NEW', 'CONTACTED', 'RESOLVED'].map((st) => (
                    <button
                      key={st}
                      onClick={() => handleUpdateStatus(selectedInquiry.id, st)}
                      className={`px-4 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                        selectedInquiry.status === st
                          ? 'bg-[#1B3629] text-white shadow-md'
                          : 'bg-[#F2E8D7] text-[#1B3629] hover:bg-[#E5D7C3]'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
