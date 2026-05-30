import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/tokens.css';
import './styles/main.css';
import './styles/md3.css';
import './styles/hero.css';
import './styles/mobile-nav.css';
import './styles/sections.css';
import './styles/whyestipay.css';
import './styles/everything-you-need.css';
import './styles/built-for-role.css';
import './styles/footer.css';
import './styles/pages.css';
import './styles/products.css';

import PageShell from './components/PageShell';
import ScrollToTop from './components/ScrollToTop';

import Products from './pages/Products';
import InsuranceAgent from './pages/InsuranceAgent';
import AppointmentScheduler from './pages/AppointmentScheduler';
import PaymentCollector from './pages/PaymentCollector';
import Solutions from './pages/Solutions';
import Pricing from './pages/Pricing';
import Security from './pages/Security';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="App">
        <Routes>
          <Route path="/" element={<PageShell><Products /></PageShell>} />
          <Route path="/products/insurance-agent" element={<PageShell><InsuranceAgent /></PageShell>} />
          <Route path="/products/appointment-scheduler" element={<PageShell><AppointmentScheduler /></PageShell>} />
          <Route path="/products/payment-collector" element={<PageShell><PaymentCollector /></PageShell>} />
          <Route path="/solutions" element={<PageShell><Solutions /></PageShell>} />
          <Route path="/pricing" element={<PageShell><Pricing /></PageShell>} />
          <Route path="/security" element={<PageShell><Security /></PageShell>} />
          <Route path="/about" element={<PageShell><About /></PageShell>} />
          <Route path="/contact" element={<PageShell><Contact /></PageShell>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
