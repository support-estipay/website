import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const PRODUCTS_NAV = [
    {
        to: '/products/insurance-agent',
        icon: 'phone_in_talk',
        name: 'Insurance Agent',
        desc: 'Negotiate claims & coordinate carriers',
    },
    {
        to: '/products/appointment-scheduler',
        icon: 'event_available',
        name: 'Appointment Scheduler',
        desc: 'Book field visits & eliminate no-shows',
    },
    {
        to: '/products/payment-collector',
        icon: 'payments',
        name: 'Payment Collector',
        desc: 'Secure payments & reduce DSO',
    },
];

const Navbar = () => {
    const [isNavActive, setIsNavActive] = useState(false);
    const [isProductsOpen, setIsProductsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const dropdownRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const toggleNav = () => setIsNavActive(prev => !prev);

    const closeNav = () => {
        setIsNavActive(false);
        setIsProductsOpen(false);
    };

    const toggleProducts = (e) => {
        /* On desktop, CSS :hover handles the dropdown.
           On mobile (inside the open menu), this toggles the sub-list. */
        e.preventDefault();
        setIsProductsOpen(prev => !prev);
    };

    /* Close dropdown on outside click */
    useEffect(() => {
        const handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsProductsOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    /* Close everything on route change */
    useEffect(() => {
        closeNav();
    }, [location.pathname]);

    const isProductsActive = location.pathname.startsWith('/products');

    return (
        <nav className={`navbar${isScrolled ? ' scrolled' : ''}`}>
            <Link to="/products" className="logo" onClick={closeNav}>
                <img src="/assets/logoF.png" alt="EstiPay Logo" className="logo-img" />
            </Link>

            <ul className={`nav-links ${isNavActive ? 'nav-active' : ''}`}>

                {/* Products dropdown */}
                <li
                    className={`nav-item-dropdown ${isProductsOpen ? 'is-open' : ''}`}
                    ref={dropdownRef}
                >
                    <button
                        className="nav-dropdown-trigger"
                        onClick={toggleProducts}
                        aria-expanded={isProductsOpen}
                        aria-haspopup="true"
                        style={{ color: isProductsActive ? 'var(--primary-green)' : undefined }}
                    >
                        Products
                        <span className="material-symbols-outlined nav-dropdown-chevron" aria-hidden="true" style={{ fontSize: '1rem' }}>expand_more</span>
                    </button>

                    <div className="nav-dropdown-menu" role="menu">
                        {PRODUCTS_NAV.map((p) => (
                            <Link
                                key={p.to}
                                to={p.to}
                                className="nav-dropdown-item"
                                role="menuitem"
                                onClick={closeNav}
                            >
                                <span className="nav-dropdown-item-icon" aria-hidden="true">
                                    <span className="material-symbols-outlined">{p.icon}</span>
                                </span>
                                <span className="nav-dropdown-item-text">
                                    <span className="nav-dropdown-item-name">{p.name}</span>
                                    <span className="nav-dropdown-item-desc">{p.desc}</span>
                                </span>
                            </Link>
                        ))}

                        <hr className="nav-dropdown-divider" />

                        <Link to="/products" className="nav-dropdown-all" role="menuitem" onClick={closeNav}>
                            View Full Platform
                            <span className="material-symbols-outlined" style={{ fontSize: '1rem' }} aria-hidden="true">arrow_forward</span>
                        </Link>
                    </div>
                </li>

                <li><Link to="/solutions" onClick={closeNav}>Solutions</Link></li>
                <li><Link to="/security" onClick={closeNav}>Security</Link></li>
                <li><Link to="/about" onClick={closeNav}>About</Link></li>
                <li><Link to="/contact" onClick={closeNav}>Contact</Link></li>

                <li className="mobile-only">
                    <a
                        href="https://interbizconsulting.eb-sites.com/4534599536082944"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                    >
                        Join Our Pilot Program
                    </a>
                </li>
            </ul>

            <div className="nav-right">
                <a
                    href="https://interbizconsulting.eb-sites.com/4534599536082944"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary desktop-only"
                >
                    Join Our Pilot Program
                </a>
                <button
                    className={`hamburger ${isNavActive ? 'toggle' : ''}`}
                    onClick={toggleNav}
                    aria-label="Toggle navigation"
                    aria-expanded={isNavActive}
                    type="button"
                >
                    <div className="line1" />
                    <div className="line2" />
                    <div className="line3" />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
