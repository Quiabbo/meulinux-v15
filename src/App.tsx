import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { Home } from './pages/Home';
import { Sobre } from './pages/Sobre';
import { Contato } from './pages/Contato';
import { Conteudo } from './pages/Conteudo';
import { DistroMatch } from './pages/DistroMatch';
import { DistroDetail } from './pages/DistroDetail';
import { PosInstalacao } from './pages/PosInstalacao';
import { Admin } from './pages/Admin';
import { LanguageProvider } from './contexts/LanguageContext';
import { AnimatedGrid } from './components/AnimatedGrid';
import { ScrollToTopOnNavigation } from './components/ScrollToTopOnNavigation';
import { TermosDeUso } from './pages/TermosDeUso';
import { PoliticaPrivacidade } from './pages/PoliticaPrivacidade';

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTopOnNavigation />
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sobre" element={<Sobre />} />
              <Route path="/conteudo" element={<Conteudo />} />
              <Route path="/conteudo/:slug" element={<Conteudo />} />
              <Route path="/contato" element={<Contato />} />
              <Route path="/distromatch" element={<DistroMatch />} />
              <Route path="/pos-instalacao" element={<PosInstalacao />} />
              <Route path="/termos" element={<TermosDeUso />} />
              <Route path="/privacidade" element={<PoliticaPrivacidade />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/:id" element={<DistroDetail />} />
            </Routes>
          </main>
          <Footer />
          <ScrollToTop />
        </div>
      </Router>
    </LanguageProvider>
  );
}
