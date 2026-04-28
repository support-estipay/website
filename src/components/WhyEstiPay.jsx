import React, { useEffect, useRef, useState } from 'react';

const features = [
    {
        id: 'claims-tracker',
        icon: '📋',
        label: 'AI Claim Follow-Ups',
        title: 'AI That Chases. So You Don’t Have To.',
        description: 'Your AI agent calls carriers, navigates IVR systems, and retrieves claim status — so your team never wastes time on hold or waiting for callbacks that never come.',
        mockup: (
            <div className="we-mockup we-mockup-claims">
                <div className="we-mockup-header">
                    <span className="we-dot red" /><span className="we-dot yellow" /><span className="we-dot green" />
                    <span className="we-mockup-title">Active Claims</span>
                </div>
                <div className="we-claim-list">
                    {[
                        { id: 'CLM-1041', carrier: 'State Farm', status: 'Followed Up', pct: 85, color: '#29c1a5' },
                        { id: 'CLM-1038', carrier: 'Allstate', status: 'Pending', pct: 45, color: '#F58220' },
                        { id: 'CLM-1029', carrier: 'Progressive', status: 'Approved', pct: 100, color: '#10b981' },
                    ].map(c => (
                        <div key={c.id} className="we-claim-row">
                            <div className="we-claim-meta">
                                <span className="we-claim-id">{c.id}</span>
                                <span className="we-claim-carrier">{c.carrier}</span>
                            </div>
                            <div className="we-claim-bar-wrap">
                                <div className="we-claim-bar" style={{ width: `${c.pct}%`, background: c.color }} />
                            </div>
                            <span className="we-claim-status" style={{ color: c.color }}>{c.status}</span>
                        </div>
                    ))}
                </div>
            </div>
        ),
    },
    {
        id: 'real-time-docs',
        icon: '⚡',
        label: 'Smart Documentation',
        title: 'Instant Document Assembly',
        description: 'Generate supplement reports, estimate packets, and carrier-ready documents in seconds — no manual entry, no delays, no errors.',
        mockup: (
            <div className="we-mockup we-mockup-docs">
                <div className="we-mockup-header">
                    <span className="we-dot red" /><span className="we-dot yellow" /><span className="we-dot green" />
                    <span className="we-mockup-title">Document Center</span>
                </div>
                <div className="we-doc-list">
                    {[
                        { name: 'Supplement Report v3.pdf', size: '214 KB', ready: true },
                        { name: 'Xactimate Estimate.pdf', size: '380 KB', ready: true },
                        { name: 'Photo Evidence Pack.zip', size: '11.2 MB', ready: false },
                    ].map(d => (
                        <div key={d.name} className="we-doc-row">
                            <span className="we-doc-icon">{d.ready ? '✅' : '🔄'}</span>
                            <div className="we-doc-info">
                                <span className="we-doc-name">{d.name}</span>
                                <span className="we-doc-size">{d.size}</span>
                            </div>
                            <span className={`we-doc-badge ${d.ready ? 'ready' : 'processing'}`}>
                                {d.ready ? 'Ready' : 'Processing'}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        ),
    },
    {
        id: 'payout-analytics',
        icon: '📊',
        label: 'Revenue Visibility',
        title: 'See Every Claim. Every Dollar. In Real Time.',
        description: 'Track every open claim, approved supplement, and collected payment in one live dashboard — built for your bottom line, not your accountant’s.',
        mockup: (
            <div className="we-mockup we-mockup-analytics">
                <div className="we-mockup-header">
                    <span className="we-dot red" /><span className="we-dot yellow" /><span className="we-dot green" />
                    <span className="we-mockup-title">Revenue Overview</span>
                </div>
                <div className="we-analytics-stats">
                    <div className="we-stat-card">
                        <span className="we-stat-value">$284K</span>
                        <span className="we-stat-label">Total Collected</span>
                        <span className="we-stat-delta positive">+18% vs last month</span>
                    </div>
                    <div className="we-stat-card">
                        <span className="we-stat-value">47</span>
                        <span className="we-stat-label">Open Claims</span>
                        <span className="we-stat-delta negative">−3 this week</span>
                    </div>
                </div>
                <div className="we-bar-chart">
                    {[40, 65, 50, 80, 70, 90, 75].map((h, i) => (
                        <div key={i} className="we-bar-col">
                            <div className="we-bar-fill" style={{ height: `${h}%` }} />
                        </div>
                    ))}
                </div>
            </div>
        ),
    },
];

const WhyEstiPay = () => {
    const sectionRef = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Observer for simple entrance animations
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);

        // Scroll handler for parallax effect
        const handleScroll = () => {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            const windowH = window.innerHeight;

            // Basic parallax: calc scroll percentage within the section
            // Relative position from bottom of viewport: 0 when just entered, scroll length when left
            const elementHeight = rect.height;
            const topPosition = rect.top; // pixel from top of viewport

            // If the section is in view
            if (topPosition < windowH && topPosition > -elementHeight) {
                // Calculate distance from center of viewport
                const centerOffset = (topPosition + elementHeight / 2) - (windowH / 2);
                
                // Parallax force: 0.05 (5% offset)
                const parallaxY = centerOffset * 0.05;
                sectionRef.current.style.setProperty('--parallax-y', `${parallaxY}px`);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Init on mount

        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <section id="why-estipay" ref={sectionRef} className={`we-section${visible ? ' we-visible' : ''}`}>
            <div className="container">
                {/* Header */}
                <div className="we-header">
                    <span className="we-badge">Why EstiPay</span>
                    <h2 className="we-title">
                        EstiPay Eliminates the Manual Work That <span className="we-green">Kills Your Cash Flow</span>
                    </h2>
                    <p className="we-subtitle">
                        From first notice to final payment — automated, tracked, and always moving forward.
                    </p>
                </div>

                {/* Feature Cards */}
                <div className="we-cards">
                    {features.map((feat, i) => (
                        <div
                            key={feat.id}
                            className="we-card"
                            style={{ transitionDelay: `${0.1 + i * 0.12}s` }}
                        >
                            {/* Mini UI mockup */}
                            <div className="we-mockup-wrap">{feat.mockup}</div>

                            {/* Text */}
                            <div className="we-card-body">
                                <span className="we-feature-label">{feat.label}</span>
                                <h3 className="we-card-title">{feat.title}</h3>
                                <p className="we-card-desc">{feat.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyEstiPay;
