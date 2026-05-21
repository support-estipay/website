import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PRODUCTS = [
    {
        id:          'insurance',
        icon:        'phone_in_talk',
        label:       'Insurance Agent',
        headline:    'AI That Calls Carriers So Your Team Doesn\'t Have To',
        description: 'Our AI voice agent makes outbound calls to insurance carriers, navigates every IVR menu, speaks to live adjusters, and returns structured claim status — automatically and around the clock.',
        features: [
            'Auto-navigates all major carrier IVR systems',
            'Speaks directly to live agents when needed',
            'Returns structured claim data in real time',
            'Operates 24/7 with zero hold time',
            'Audit-ready call recordings & logs',
        ],
        accent: '#009b6c',
        link:   '/products/insurance-agent',
    },
    {
        id:          'scheduler',
        icon:        'event_available',
        label:       'Appointment Scheduler',
        headline:    'Zero No-Shows. Intelligent Field Scheduling.',
        description: 'Smart AI booking that confirms, reschedules, and optimizes field visits — reducing no-shows dramatically and keeping your crew schedule full without manual coordination.',
        features: [
            'AI-confirmed bookings with auto reminders',
            'Intelligent rescheduling & conflict resolution',
            'Two-way calendar sync for your crew',
            'Client communication fully automated',
            'Route-optimized field crew dispatch',
        ],
        accent: '#125e92',
        link:   '/products/appointment-scheduler',
    },
    {
        id:          'payment',
        icon:        'payments',
        label:       'Payment Collector',
        headline:    'Collect Faster. Chase Less. Get Paid.',
        description: 'AI-powered payment collection that slashes days sales outstanding — automated follow-ups, secure payment links, real-time reconciliation, and a complete audit trail.',
        features: [
            'Automated payment follow-up sequences',
            'Secure one-click payment link delivery',
            'Real-time reconciliation & reporting',
            'Reduces DSO by up to 40%',
            'Compliance-ready audit trail',
        ],
        accent: '#f48027',
        link:   '/products/payment-collector',
    },
];

export default function ProductShowcase() {
    const [active, setActive] = useState(0);
    const product = PRODUCTS[active];

    return (
        <section className="product-showcase" aria-label="Product overview" data-reveal="fade">
            {/* Ambient orbs */}
            <div className="section-orb section-orb--blue"   style={{ width: 520, height: 520, top: 80, right: -180 }} aria-hidden="true" />
            <div className="section-orb section-orb--green"  style={{ width: 420, height: 420, bottom: 0, left: -140 }} aria-hidden="true" />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                {/* Section header */}
                <div className="section-header text-center" data-reveal>
                    <span className="section-badge section-badge--blue">PLATFORM</span>
                    <h2>Three Products. One Seamless Platform.</h2>
                    <p className="section-subheading">
                        EstiPay automates the most time-consuming parts of the claims and restoration
                        workflow — from carrier follow-up to scheduling to getting paid.
                    </p>
                </div>

                {/* Tab buttons */}
                <div className="pshow-tabs" role="tablist" aria-label="Product tabs">
                    {PRODUCTS.map((p, i) => (
                        <button
                            key={p.id}
                            role="tab"
                            aria-selected={active === i}
                            aria-controls={`pshow-panel-${p.id}`}
                            className={`pshow-tab${active === i ? ' pshow-tab--active' : ''}`}
                            style={{ '--tab-accent': p.accent }}
                            onClick={() => setActive(i)}
                        >
                            <span className="material-symbols-outlined pshow-tab-icon" aria-hidden="true">{p.icon}</span>
                            <span>{p.label}</span>
                        </button>
                    ))}
                </div>

                {/* Tab panel */}
                <div
                    className="pshow-panel"
                    id={`pshow-panel-${product.id}`}
                    role="tabpanel"
                    key={product.id}
                    style={{ '--panel-accent': product.accent }}
                >
                    {/* Left: text content */}
                    <div className="pshow-content">
                        <div className="pshow-accent-dot" aria-hidden="true" />
                        <h3 className="pshow-headline">{product.headline}</h3>
                        <p className="pshow-description">{product.description}</p>
                        <ul className="pshow-features" aria-label="Features">
                            {product.features.map(f => (
                                <li key={f} className="pshow-feature-item">
                                    <span className="pshow-check material-symbols-outlined ms-icon--success" aria-hidden="true">check_circle</span>
                                    {f}
                                </li>
                            ))}
                        </ul>
                        <Link to={product.link} className="btn btn-tonal pshow-cta">
                            Explore {product.label}
                            <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: '1rem' }}>arrow_forward</span>
                        </Link>
                    </div>

                    {/* Right: visual card */}
                    <div className="pshow-visual" aria-hidden="true">
                        <div className="pshow-icon-card">
                            <span
                                className="material-symbols-outlined pshow-big-icon"
                                style={{ color: product.accent }}
                            >
                                {product.icon}
                            </span>
                            <span className="pshow-product-name">{product.label}</span>
                            <div className="pshow-dots">
                                {[0,1,2].map(d => (
                                    <span
                                        key={d}
                                        className="pshow-dot"
                                        style={{
                                            background: d === active ? product.accent : 'var(--md-outline)',
                                            transform: d === active ? 'scale(1.4)' : 'scale(1)',
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
