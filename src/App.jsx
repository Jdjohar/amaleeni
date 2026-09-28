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
import LoginPage from './pages/LoginPage';
import MemberDashboard from './pages/MemberDashboard';
import ContactPage from './pages/ContactPage';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import ContactModal from './components/ContactModal';

import AdvisoryBoardPage from './pages/AdvisoryBoardPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import GrievanceRedressalPage from './pages/GrievanceRedressalPage';
import RefundCancellationPage from './pages/RefundCancellationPage';
import ImpactStoriesPage from './pages/ImpactStoriesPage';
import CSRPartnershipsPage from './pages/CSRPartnershipsPage';

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleOpenContact = () => setIsContactOpen(true);
  const handleCloseContact = () => setIsContactOpen(false);

  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-[#F8F3EA] text-[#1B3629] relative overflow-x-hidden selection:bg-[#C83B46] selection:text-white flex flex-col justify-between">
          
          {/* Header with smooth scroll navigation for client presentation */}
          <Header onOpenContact={handleOpenContact} />

          <main className="grow">
            <Routes>
              <Route path="/" element={<HomePage onOpenContact={handleOpenContact} />} />
              {/* Pink Pages directory & registration routes */}
              <Route path="/pink-pages" element={<PinkPages onOpenContact={handleOpenContact} />} />
              <Route path="/pink-pages/register" element={<PinkPagesRegister onOpenContact={handleOpenContact} />} />
              
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
        </div>
      </AuthProvider>
    </Router>
  );
}
