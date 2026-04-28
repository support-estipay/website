import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isNavActive, setIsNavActive] = useState(false);

    const toggleNav = () => {
        setIsNavActive(!isNavActive);
    };

    const closeNav = () => {
        setIsNavActive(false);
    };

    return (
        <nav className="navbar">
            <Link to="/" className="logo" onClick={closeNav}>
                <img src="/assets/logoF.png" alt="EstiPay Logo" className="logo-img" />
            </Link>
            <ul className={`nav-links ${isNavActive ? 'nav-active' : ''}`}>
                <li><Link to="/product" onClick={closeNav}>Product</Link></li>
                <li><Link to="/solutions" onClick={closeNav}>Solutions</Link></li>
<li><Link to="/security" onClick={closeNav}>Security</Link></li>
                <li><Link to="/about" onClick={closeNav}>About</Link></li>
                <li><Link to="/contact" onClick={closeNav}>Contact</Link></li>
                <li className="mobile-only">
                    <a href="https://interbizconsulting.eb-sites.com/4534599536082944" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Join Our Pilot Program</a>
                </li>
            </ul>
            <div className="nav-right">
                <a href="https://interbizconsulting.eb-sites.com/4534599536082944" target="_blank" rel="noopener noreferrer" className="btn btn-primary desktop-only">Join Our Pilot Program</a>
                <div
                    className={`hamburger ${isNavActive ? 'toggle' : ''}`}
                    onClick={toggleNav}
                >
                    <div className="line1"></div>
                    <div className="line2"></div>
                    <div className="line3"></div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
