import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/tokens.css';
import './styles/main.css';
import './styles/hero.css';
import './styles/mobile-nav.css';
import './styles/sections.css';
import './styles/whyestipay.css';
import './styles/everything-you-need.css';
import './styles/built-for-role.css';
import './styles/footer.css';
import './styles/pages.css';
import './styles/products.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import PageLoader from './components/PageLoader';

import Home from './pages/Home';
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
      {/* Initial page-load reveal — only mounts once per site load */}
      <PageLoader />
      <ScrollToTop />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Product routes */}
          <Route path="/products"                       element={<><Navbar /><Products /><Footer /></>} />
          <Route path="/products/insurance-agent"       element={<><Navbar /><InsuranceAgent /><Footer /></>} />
          <Route path="/products/appointment-scheduler" element={<><Navbar /><AppointmentScheduler /><Footer /></>} />
          <Route path="/products/payment-collector"     element={<><Navbar /><PaymentCollector /><Footer /></>} />

          {/* Legacy /product redirect handled by redirecting to /products */}
          <Route path="/product" element={<><Navbar /><Products /><Footer /></>} />

          <Route path="/solutions" element={<><Navbar /><Solutions /><Footer /></>} />
          <Route path="/pricing"   element={<><Navbar /><Pricing /><Footer /></>} />
          <Route path="/security"  element={<><Navbar /><Security /><Footer /></>} />
          <Route path="/about"     element={<><Navbar /><About /><Footer /></>} />
          <Route path="/contact"   element={<><Navbar /><Contact /><Footer /></>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
