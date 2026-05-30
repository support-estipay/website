import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
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

const MAIN_LINKS = [
    { to: '/solutions', label: 'Solutions' },
    { to: '/security',  label: 'Security'  },
    { to: '/about',     label: 'About'     },
    { to: '/contact',   label: 'Contact'   },
];

const PILOT_URL = 'https://interbizconsulting.eb-sites.com/4534599536082944';

const Navbar = () => {
    const [isNavActive, setIsNavActive]       = useState(false);
    const [isProductsOpen, setIsProductsOpen] = useState(false); // desktop dropdown
    const [isScrolled, setIsScrolled]         = useState(false);
    const [mobileView, setMobileView]         = useState('main'); // 'main' | 'products'
    const dropdownRef = useRef(null);
    const location    = useLocation();

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const closeNav = () => {
        setIsNavActive(false);
        setIsProductsOpen(false);
        setMobileView('main');
    };

    const toggleNav = () => {
        setIsNavActive(prev => {
            const next = !prev;
            if (!next) setMobileView('main'); // reset drilldown when closing
            return next;
        });
    };

    const toggleProducts = (e) => {
        e.preventDefault();
        setIsProductsOpen((prev) => !prev);
    };

    const openProductsMenu = () => setIsProductsOpen(true);

    const closeProductsMenu = () => setIsProductsOpen(false);

    /* Close desktop dropdown on outside click */
    useEffect(() => {
        const handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsProductsOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    /* Close mobile menu on route change */
    useEffect(() => {
        closeNav();
    }, [location.pathname]);

    /* Close mobile menu on Escape */
    useEffect(() => {
        if (!isNavActive) return undefined;
        const onKey = (e) => { if (e.key === 'Escape') closeNav(); };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [isNavActive]);

    const isProductsActive = location.pathname === '/' || location.pathname.startsWith('/products/');

    /* ──────────────────────────────────────────────────────────
       Mobile menu markup — rendered via React Portal to <body>
       so it escapes the navbar's containing block (the navbar
       has `backdrop-filter`, which per CSS spec promotes it to
       a containing block for `position: fixed` descendants).
       Without this portal the drawer would be trapped inside
       the 72px-tall navbar and appear invisible.
       ────────────────────────────────────────────────────────── */
    const mobileMenuPortal = createPortal(
        <div
            id="mobile-menu"
            className={`mobile-menu${isNavActive ? ' mobile-menu--open' : ''}${mobileView === 'products' ? ' mobile-menu--products' : ''}`}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
        >
            {/* Main panel: 5 cards */}
            <div className="mobile-panel mobile-panel--main">
                <button
                    type="button"
                    className="mobile-card"
                    onClick={() => setMobileView('products')}
                    aria-haspopup="true"
                >
                    <span className="mobile-card-label">Products</span>
                    <span className="material-symbols-outlined mobile-card-chevron" aria-hidden="true">chevron_right</span>
                </button>

                {MAIN_LINKS.map(link => (
                    <Link
                        key={link.to}
                        to={link.to}
                        className="mobile-card"
                        onClick={closeNav}
                    >
                        <span className="mobile-card-label">{link.label}</span>
                        <span className="material-symbols-outlined mobile-card-chevron" aria-hidden="true">arrow_forward</span>
                    </Link>
                ))}
            </div>

            {/* Products sub-panel: drill-down */}
            <div className="mobile-panel mobile-panel--products">
                <button
                    type="button"
                    className="mobile-back"
                    onClick={() => setMobileView('main')}
                >
                    <span className="material-symbols-outlined" aria-hidden="true">chevron_left</span>
                    Back
                </button>
                <h3 className="mobile-subheading">Products</h3>

                {PRODUCTS_NAV.map(p => (
                    <Link
                        key={p.to}
                        to={p.to}
                        className="mobile-card mobile-card--product"
                        onClick={closeNav}
                    >
                        <span className="mobile-card-icon" aria-hidden="true">
                            <span className="material-symbols-outlined">{p.icon}</span>
                        </span>
                        <span className="mobile-card-body">
                            <span className="mobile-card-name">{p.name}</span>
                            <span className="mobile-card-desc">{p.desc}</span>
                        </span>
                        <span className="material-symbols-outlined mobile-card-chevron" aria-hidden="true">arrow_forward</span>
                    </Link>
                ))}

                <Link to="/" className="mobile-card mobile-card--all" onClick={closeNav}>
                    View Full Platform
                    <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
                </Link>
            </div>

            {/* Sticky Pilot Program CTA at bottom of drawer */}
            <div className="mobile-cta-bar" aria-hidden={!isNavActive}>
                <a
                    href={PILOT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mobile-cta"
                    onClick={closeNav}
                >
                    Join Our Pilot Program
                    <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
                </a>
            </div>
        </div>,
        document.body,
    );

    return (
        <>
        <nav className={`navbar${isScrolled ? ' scrolled' : ''}`}>
            <Link to="/" className="logo" onClick={closeNav}>
                <img src="/assets/logoF.png" alt="EstiPay Logo" className="logo-img" />
            </Link>

            {/* ── Desktop nav (hidden on mobile via CSS) ─────── */}
            <ul className="nav-links">
                {/* Products dropdown (desktop hover-open) */}
                <li
                    className={`nav-item-dropdown ${isProductsOpen ? 'is-open' : ''}`}
                    ref={dropdownRef}
                    onMouseEnter={openProductsMenu}
                    onMouseLeave={closeProductsMenu}
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

                        <Link to="/" className="nav-dropdown-all" role="menuitem" onClick={closeNav}>
                            View Full Platform
                            <span className="material-symbols-outlined" style={{ fontSize: '1rem' }} aria-hidden="true">arrow_forward</span>
                        </Link>
                    </div>
                </li>

                <li><Link to="/solutions" onClick={closeNav}>Solutions</Link></li>
                <li><Link to="/security"  onClick={closeNav}>Security</Link></li>
                <li><Link to="/about"     onClick={closeNav}>About</Link></li>
                <li><Link to="/contact"   onClick={closeNav}>Contact</Link></li>
            </ul>

            <div className="nav-right">
                <a
                    href={PILOT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-filled-secondary desktop-only"
                >
                    Join Our Pilot Program
                </a>

                {/* Bordered hamburger / close button (mobile only via CSS) */}
                <button
                    className={`hamburger${isNavActive ? ' hamburger--open' : ''}`}
                    onClick={toggleNav}
                    aria-label={isNavActive ? 'Close menu' : 'Open menu'}
                    aria-expanded={isNavActive}
                    aria-controls="mobile-menu"
                    type="button"
                >
                    <span className="hamburger-icon hamburger-icon--bars">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                            <line x1="4"  y1="7"  x2="20" y2="7"  />
                            <line x1="4"  y1="12" x2="20" y2="12" />
                            <line x1="4"  y1="17" x2="20" y2="17" />
                        </svg>
                    </span>
                    <span className="hamburger-icon hamburger-icon--close">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                            <line x1="6" y1="6"  x2="18" y2="18" />
                            <line x1="6" y1="18" x2="18" y2="6"  />
                        </svg>
                    </span>
                </button>
            </div>

        </nav>
        {mobileMenuPortal}
        </>
    );
};

export default Navbar;
