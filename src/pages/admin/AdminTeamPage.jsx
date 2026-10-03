import React, { useState, useEffect } from 'react';
import { 
  UserCheck, 
  Plus, 
  Edit3, 
  Trash2, 
  Sparkles, 
  User, 
  ArrowUpDown,
  CheckCircle2
} from 'lucide-react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import TeamMemberModal from '../../components/admin/TeamMemberModal';
import { fetchAdminTeamApi, deleteTeamMemberApi } from '../../services/api';
import { useToast } from '../../context/ToastContext';

export default function AdminTeamPage() {
  const { showToast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal State
  const [selectedMember, setSelectedMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadTeamRoster();
  }, []);

  const loadTeamRoster = async () => {
    setIsLoading(true);
    try {
      const res = await fetchAdminTeamApi();
      if (res && res.team) {
        setTeamMembers(res.team);
      }
    } catch (err) {
      showToast('Failed to load team roster', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenAddModal = () => {
    setSelectedMember(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const handleDeleteMember = async (id) => {
    if (!window.confirm('Are you sure you want to remove this team member from the roster?')) return;
    try {
      await deleteTeamMemberApi(id);
      showToast('Team member removed.');
      loadTeamRoster();
    } catch (err) {
      showToast('Failed to delete member', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F3EA]">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:pl-64 flex flex-col min-h-screen">
        <AdminHeader onMenuClick={() => setSidebarOpen(true)} title="Team Page Roster Manager (/team)" />

        <main className="p-4 sm:p-8 space-y-6 grow">
          
          {/* Header Action Banner */}
          <div className="bg-[#FAF5EB] rounded-3xl p-6 border border-[#E5D7C3] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B3629]/10 text-[#1B3629] text-[10px] font-bold uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5 text-[#C83B46]" />
                <span>Dynamic Roster Control</span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-[#1B3629]">
                Team Members ({teamMembers.length})
              </h2>
              <p className="text-xs text-[#7A6750]">
                Add, edit, or reorder members displayed on the live <span className="font-mono text-[#C83B46] font-bold">/team</span> page.
              </p>
            </div>

            <button
              onClick={handleOpenAddModal}
              className="inline-flex items-center gap-2 bg-[#C83B46] hover:bg-[#A82B36] text-white px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Team Member</span>
            </button>
          </div>

          {/* Roster Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((m, idx) => (
              <div
                key={idx}
                className="bg-[#FAF5EB] rounded-3xl p-6 border border-[#E5D7C3] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                      m.category === 'Leadership' ? 'bg-[#1B3629] text-[#D49B4B]' : 'bg-[#C83B46]/10 text-[#C83B46]'
                    }`}>
                      {m.category || 'Secretariat'}
                    </span>

                    <span className="text-[10px] font-bold text-[#7A6750]">
                      Sort: #{m.sort_order || idx + 1}
                    </span>
                  </div>

                  {/* Photo Thumbnail */}
                  <div className="relative mb-4 overflow-hidden rounded-2xl border border-[#D49B4B]/30 shadow-xs bg-[#F2E8D7] aspect-[4/3] w-full flex items-center justify-center">
                    {m.image ? (
                      <img
                        src={m.image}
                        alt={m.name}
                        className="w-full h-full object-cover object-top"
                      />
                    ) : (
                      <User className="w-10 h-10 text-[#1B3629] opacity-30" />
                    )}
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#1B3629]">{m.name}</h3>
                  <p className="text-xs font-bold text-[#C83B46] mt-0.5">{m.role}</p>
                  <p className="text-xs text-[#4E6B5A] font-serif leading-relaxed mt-2.5 line-clamp-3">
                    {m.bio || 'No bio provided.'}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#EAE0D0] flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#5A7B68] uppercase">{m.status}</span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEditModal(m)}
                      className="p-2 rounded-xl bg-[#1B3629] text-white hover:bg-[#12251C] transition-colors cursor-pointer"
                      title="Edit Member"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteMember(m.id)}
                      className="p-2 rounded-xl bg-red-100 text-red-700 hover:bg-red-200 transition-colors cursor-pointer"
                      title="Remove Member"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {teamMembers.length === 0 && !isLoading && (
              <div className="col-span-full py-16 text-center text-gray-500 italic bg-[#FAF5EB] rounded-3xl border border-[#E5D7C3]">
                No team members found in database. Click "Add New Team Member" to build your roster.
              </div>
            )}
          </div>

        </main>
      </div>

      {/* Modal Component */}
      <TeamMemberModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        member={selectedMember}
        onSaved={loadTeamRoster}
      />
    </div>
  );
}
