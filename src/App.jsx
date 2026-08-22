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
import ContactModal from './components/ContactModal';

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleOpenContact = () => setIsContactOpen(true);
  const handleCloseContact = () => setIsContactOpen(false);

  return (
    <Router>
      <div className="min-h-screen bg-[#F8F3EA] text-[#1B3629] relative overflow-x-hidden selection:bg-[#C83B46] selection:text-white flex flex-col justify-between">
        
        {/* Header with smooth scroll navigation for client presentation */}
        <Header onOpenContact={handleOpenContact} />

        <main className="grow">
          <Routes>
            <Route path="/" element={<HomePage onOpenContact={handleOpenContact} />} />
            {/* Preserved multi-page routes ready to activate whenever needed */}
            <Route path="/programme" element={<ProgrammePage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/partner" element={<PartnerPage />} />
            <Route path="/privacy" element={<LegalPage />} />
            <Route path="/terms" element={<LegalPage />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer onOpenContact={handleOpenContact} />

        {/* Interactive Consultation & Business Inquiry Modal */}
        <ContactModal isOpen={isContactOpen} onClose={handleCloseContact} />
      </div>
    </Router>
  );
}
