import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/main.css';
import './styles/hero.css';
import './styles/sections.css';
import './styles/whyestipay.css';
import './styles/everything-you-need.css';
import './styles/built-for-role.css';
import './styles/footer.css';
import './styles/pages.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

import Home from './pages/Home';
import Product from './pages/Product';
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
          <Route path="/" element={<Home />} />
          {/* <Route path="/product" element={<><Navbar /><Product /><Footer /></>} /> */}
          <Route path="/product" element={<Home />} />
          <Route path="/solutions" element={<><Navbar /><Solutions /><Footer /></>} />
          <Route path="/pricing" element={<><Navbar /><Pricing /><Footer /></>} />
          <Route path="/security" element={<><Navbar /><Security /><Footer /></>} />
          <Route path="/about" element={<><Navbar /><About /><Footer /></>} />
          <Route path="/contact" element={<><Navbar /><Contact /><Footer /></>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
