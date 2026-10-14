import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import ContactModal from './components/ContactModal';
import WhatsAppButton from './components/WhatsAppButton';
import { AdminAuthProvider } from './context/AdminAuthContext';
import AdminRoute from './components/AdminRoute';

// Lazy loaded public pages
const HomePage = lazy(() => import('./pages/HomePage'));
const ProgrammePage = lazy(() => import('./pages/ProgrammePage'));
const TeamPage = lazy(() => import('./pages/TeamPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const PartnerPage = lazy(() => import('./pages/PartnerPage'));
const LegalPage = lazy(() => import('./pages/LegalPage'));
const PinkPages = lazy(() => import('./pages/PinkPages'));
const PinkPagesRegister = lazy(() => import('./pages/PinkPagesRegister'));
const EnterpriseDetailPage = lazy(() => import('./pages/EnterpriseDetailPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const MemberDashboard = lazy(() => import('./pages/MemberDashboard'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const AdvisoryBoardPage = lazy(() => import('./pages/AdvisoryBoardPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const GrievanceRedressalPage = lazy(() => import('./pages/GrievanceRedressalPage'));
const RefundCancellationPage = lazy(() => import('./pages/RefundCancellationPage'));
const ImpactStoriesPage = lazy(() => import('./pages/ImpactStoriesPage'));
const CSRPartnershipsPage = lazy(() => import('./pages/CSRPartnershipsPage'));

// Lazy loaded admin panel pages
const AdminLoginPage = lazy(() => import('./pages/admin/AdminLoginPage'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminMembersPage = lazy(() => import('./pages/admin/AdminMembersPage'));
const AdminTeamPage = lazy(() => import('./pages/admin/AdminTeamPage'));
const AdminInquiriesPage = lazy(() => import('./pages/admin/AdminInquiriesPage'));
const AdminSubscribersPage = lazy(() => import('./pages/admin/AdminSubscribersPage'));
const AdminSettingsPage = lazy(() => import('./pages/admin/AdminSettingsPage'));

function PageLoader() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center py-20" aria-label="Loading content">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-3 border-[#C83B46] border-t-transparent rounded-full animate-spin"></div>
        <span className="text-xs font-serif text-[#234633] tracking-wider uppercase font-semibold">Loading...</span>
      </div>
    </div>
  );
}

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
                <Suspense fallback={<PageLoader />}>
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
                </Suspense>
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
