import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProgrammePage from './pages/ProgrammePage';
import TeamPage from './pages/TeamPage';
import RegisterPage from './pages/RegisterPage';
import AboutPage from './pages/AboutPage';
import PartnerPage from './pages/PartnerPage';
import LegalPage from './pages/LegalPage';
import PinkPages from './pages/PinkPages';
import PinkPagesRegister from './pages/PinkPagesRegister';
import EnterpriseDetailPage from './pages/EnterpriseDetailPage';
import LoginPage from './pages/LoginPage';
import MemberDashboard from './pages/MemberDashboard';
import ContactPage from './pages/ContactPage';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import ContactModal from './components/ContactModal';
import WhatsAppButton from './components/WhatsAppButton';

import AdvisoryBoardPage from './pages/AdvisoryBoardPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import GrievanceRedressalPage from './pages/GrievanceRedressalPage';
import RefundCancellationPage from './pages/RefundCancellationPage';
import ImpactStoriesPage from './pages/ImpactStoriesPage';
import CSRPartnershipsPage from './pages/CSRPartnershipsPage';

import { AdminAuthProvider } from './context/AdminAuthContext';
import AdminRoute from './components/AdminRoute';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminMembersPage from './pages/admin/AdminMembersPage';
import AdminTeamPage from './pages/admin/AdminTeamPage';
import AdminInquiriesPage from './pages/admin/AdminInquiriesPage';
import AdminSubscribersPage from './pages/admin/AdminSubscribersPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleOpenContact = () => setIsContactOpen(true);
  const handleCloseContact = () => setIsContactOpen(false);

  return (
    <Router>
      <ToastProvider>
        <AdminAuthProvider>
          <AuthProvider>
            <div className="min-h-screen bg-[#F8F3EA] text-[#1B3629] relative overflow-x-hidden selection:bg-[#C83B46] selection:text-white flex flex-col justify-between">
              
              {/* Header with smooth scroll navigation */}
              <Header onOpenContact={handleOpenContact} />

              <main className="grow">
                <Routes>
                  {/* ADMIN PANEL ROUTES */}
                  <Route path="/admin/login" element={<AdminLoginPage />} />
                  <Route path="/admin" element={<AdminRoute permission="dashboard"><AdminDashboard /></AdminRoute>} />
                  <Route path="/admin/members" element={<AdminRoute permission="members"><AdminMembersPage /></AdminRoute>} />
                  <Route path="/admin/team" element={<AdminRoute permission="team"><AdminTeamPage /></AdminRoute>} />
                  <Route path="/admin/inquiries" element={<AdminRoute permission="inquiries"><AdminInquiriesPage /></AdminRoute>} />
                  <Route path="/admin/subscribers" element={<AdminRoute permission="subscribers"><AdminSubscribersPage /></AdminRoute>} />
                  <Route path="/admin/settings" element={<AdminRoute permission="settings"><AdminSettingsPage /></AdminRoute>} />

                  {/* PUBLIC ROUTES */}
                  <Route path="/" element={<HomePage onOpenContact={handleOpenContact} />} />
                  <Route path="/pink-pages" element={<PinkPages onOpenContact={handleOpenContact} />} />
                  <Route path="/pink-pages/register" element={<PinkPagesRegister onOpenContact={handleOpenContact} />} />
                  <Route path="/pink-pages/enterprise/:id" element={<EnterpriseDetailPage />} />
                  
                  {/* Authentication & Member Portal */}
                  <Route path="/login" element={<LoginPage />} />
                  <Route
                    path="/pink-pages/dashboard"
                    element={
                      <ProtectedRoute>
                        <MemberDashboard onOpenContact={handleOpenContact} />
                      </ProtectedRoute>
                    }
                  />
                  
                  {/* Multi-page routes */}
                  <Route path="/programme" element={<ProgrammePage />} />
                  <Route path="/team" element={<TeamPage />} />
                  <Route path="/advisory-board" element={<AdvisoryBoardPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/partner" element={<PartnerPage />} />
                  <Route path="/csr-partnerships" element={<CSRPartnershipsPage />} />
                  <Route path="/impact-stories" element={<ImpactStoriesPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  
                  {/* Governance & Policy routes */}
                  <Route path="/privacy" element={<PrivacyPage />} />
                  <Route path="/terms" element={<TermsPage />} />
                  <Route path="/grievance-redressal" element={<GrievanceRedressalPage />} />
                  <Route path="/refund-cancellation" element={<RefundCancellationPage />} />
                </Routes>
              </main>

              {/* Footer */}
              <Footer onOpenContact={handleOpenContact} />

              {/* Interactive Consultation & Business Inquiry Modal */}
              <ContactModal isOpen={isContactOpen} onClose={handleCloseContact} />

              {/* Global WhatsApp Click-to-Chat Button */}
              <WhatsAppButton />
            </div>
          </AuthProvider>
        </AdminAuthProvider>
      </ToastProvider>
    </Router>
  );
}
