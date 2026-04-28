import React, { useEffect, useRef, useState } from 'react';
import CTA from '../components/CTA';

// ── Security Feature Cards (Principles) ────────────────────────────────────────
const principles = [
    {
        id: 'encryption',
        title: 'End-to-End Encryption',
        description: 'All data transmitted through EstiPay — including voice calls, claim information, and status updates — is encrypted in transit and at rest. No exceptions.',
        mockup: (
            <div className="sec-mockup sec-mockup-gdpr">
                <div className="sec-mockup-header">
                    <span className="sec-dot red" /><span className="sec-dot yellow" /><span className="sec-dot green" />
                    <span className="sec-mockup-title">Encryption Status</span>
                </div>
                <div className="sec-gdpr-body">
                    <div className="sec-gdpr-stat">
                        <span className="sec-gdpr-value">AES-256</span>
                        <span className="sec-gdpr-label">At Rest & In Transit</span>
                    </div>
                </div>
            </div>
        ),
    },
    {
        id: 'rbac',
        title: 'Role-Based Access Control',
        description: 'Your team only sees what they need to see. Granular permissions mean sensitive claim data is never exposed beyond the right people.',
        mockup: (
            <div className="sec-mockup sec-mockup-rbac">
                <div className="sec-mockup-header">
                    <span className="sec-dot red" /><span className="sec-dot yellow" /><span className="sec-dot green" />
                    <span className="sec-mockup-title">Permissions</span>
                </div>
                <div className="sec-rbac-body">
                    <div className="sec-rbac-header-row">
                        <span />
                        {['View', 'Edit', 'Admin'].map(h => (
                            <span key={h} className="sec-rbac-col-head">{h}</span>
                        ))}
                    </div>
                    {[
                        { role: 'Manager', perms: [true, true, true] },
                        { role: 'Adjuster', perms: [true, true, false] },
                        { role: 'Viewer', perms: [true, false, false] },
                    ].map((row, i) => (
                        <div key={i} className="sec-rbac-row">
                            <span className="sec-rbac-role">{row.role}</span>
                            {row.perms.map((p, j) => (
                                <span key={j} className={`sec-rbac-perm ${p ? 'on' : 'off'}`}>{p ? '✓' : '—'}</span>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        ),
    },
    {
        id: 'recording',
        title: 'Secure Call Recording and Storage',
        description: 'Every interaction between EstiPay’s AI and insurance carriers is recorded, logged, and stored securely — available for audit, compliance, and review at any time.',
        mockup: (
            <div className="sec-mockup sec-mockup-audit">
                <div className="sec-mockup-header">
                    <span className="sec-dot red" /><span className="sec-dot yellow" /><span className="sec-dot green" />
                    <span className="sec-mockup-title">Call Logs</span>
                </div>
                <div className="sec-audit-body">
                    {[
                        { user: 'AI Agent', action: 'Call to State Farm', time: '2m ago', type: 'recording' },
                        { user: 'AI Agent', action: 'IVR Navigation', time: '14m ago', type: 'recording' },
                        { user: 'AI Agent', action: 'Live agent verified', time: '1h ago', type: 'recording' },
                    ].map((log, i) => (
                        <div key={i} className="sec-audit-row">
                            <span className={`sec-audit-dot green`} />
                            <div className="sec-audit-info">
                                <span className="sec-audit-user">{log.user}</span>
                                <span className="sec-audit-action">{log.action}</span>
                            </div>
                            <span className="sec-audit-time">{log.time}</span>
                        </div>
                    ))}
                </div>
            </div>
        ),
    },
    {
        id: 'privacy',
        title: 'No Data Sold. Ever.',
        description: 'Your claim data, your carrier relationships, your client information — none of it is ever shared, sold, or used outside of your account. Your data belongs to you.',
        mockup: (
            <div className="sec-mockup sec-mockup-hipaa">
                <div className="sec-mockup-header">
                    <span className="sec-dot red" /><span className="sec-dot yellow" /><span className="sec-dot green" />
                    <span className="sec-mockup-title">Data Protection</span>
                </div>
                <div className="sec-hipaa-body">
                    {['Zero Data Sharing', 'Strict Internal Isolation', 'Total Ownership', 'Deleted Upon Request'].map((item, i) => (
                        <div key={i} className="sec-check-row">
                            <span className="sec-check-icon">✓</span>
                            <span className="sec-check-label">{item}</span>
                        </div>
                    ))}
                </div>
            </div>
        ),
    },
    {
        id: 'compliance',
        title: 'Compliance-Ready Architecture',
        description: 'EstiPay is built to align with the data handling requirements expected in the insurance industry. Our architecture is designed with compliance at its core — not bolted on after the fact.',
        mockup: (
            <div className="sec-mockup sec-mockup-iso">
                <div className="sec-mockup-header">
                    <span className="sec-dot red" /><span className="sec-dot yellow" /><span className="sec-dot green" />
                    <span className="sec-mockup-title">Compliance Frameworks</span>
                </div>
                <div className="sec-iso-body">
                    <div className="sec-iso-ring">
                        <span className="sec-iso-grade">A+</span>
                        <span className="sec-iso-sub">Rating</span>
                    </div>
                </div>
            </div>
        ),
    },
    {
        id: 'audits',
        title: 'Regular Security Reviews',
        description: 'We conduct ongoing security reviews and audits throughout development to ensure our platform meets the standards your business demands.',
        mockup: (
            <div className="sec-mockup sec-mockup-pentest">
                <div className="sec-mockup-header">
                    <span className="sec-dot red" /><span className="sec-dot yellow" /><span className="sec-dot green" />
                    <span className="sec-mockup-title">Audit Reports</span>
                </div>
                <div className="sec-pentest-body">
                    <div className="sec-pentest-score">
                        <span className="sec-pentest-grade">Pass</span>
                        <span className="sec-pentest-sublabel">Latest Audit</span>
                    </div>
                    {[
                        { label: 'Q1 Security Audit', status: 'Passed' },
                        { label: 'Penetration Test', status: 'Passed' },
                    ].map((item, i) => (
                        <div key={i} className="sec-pentest-row">
                            <span className="sec-pentest-item">{item.label}</span>
                            <span className="sec-pentest-status">{item.status}</span>
                        </div>
                    ))}
                </div>
            </div>
        ),
    },
];

const Security = () => {
    const heroRef = useRef(null);
    const featRef = useRef(null);
    const corpRef = useRef(null);

    const [heroVisible, setHeroVisible] = useState(false);
    const [featVisible, setFeatVisible] = useState(false);
    const [corpVisible, setCorpVisible] = useState(false);

    useEffect(() => {
        const makeObserver = (setter) =>
            new IntersectionObserver(
                ([entry]) => { if (entry.isIntersecting) setter(true); },
                { threshold: 0.08 }
            );

        const observers = [
            { ref: heroRef, setter: setHeroVisible },
            { ref: featRef, setter: setFeatVisible },
            { ref: corpRef, setter: setCorpVisible },
        ].map(({ ref, setter }) => {
            const obs = makeObserver(setter);
            if (ref.current) obs.observe(ref.current);
            return obs;
        });

        return () => observers.forEach(o => o.disconnect());
    }, []);

    return (
        <div className="page-container">

            {/* ── Section 1: Hero ───────────────────────────────── */}
            <section
                ref={heroRef}
                className={`sec-hero${heroVisible ? ' sec-hero-visible' : ''}`}
                style={{ background: '#ffffff' }}
            >
                <div className="sec-hero-blobs">
                    <div className="sec-hero-blob sec-hero-blob--tl" />
                    <div className="sec-hero-blob sec-hero-blob--br" />
                </div>
                <div className="container sec-hero-container">
                    <span className="sec-hero-badge">Security & Compliance</span>
                    <h1 className="sec-hero-title">
                        Your Claims Data Is Safe.<br />
                        <span className="sec-hero-accent">Full Stop.</span>
                    </h1>
                    <p className="sec-hero-subtitle" style={{ maxWidth: '800px', margin: '0 auto 30px' }}>
                        EstiPay is built with enterprise-grade security from the ground up. Every call, every document, every data point handled by our platform is protected with the same standards demanded by the insurance industry itself.
                    </p>
                    <div className="sol-cta-wrap" style={{ marginTop: '20px' }}>
                        <a href="https://interbizconsulting.eb-sites.com/4534599536082944" target="_blank" rel="noopener noreferrer" className="btn btn-primary sol-cta-btn" style={{ backgroundColor: '#ff7a00', borderColor: '#ff7a00', padding: '15px 30px', fontSize: '1.1rem' }}>Join Our Pilot Program <i className="fa-solid fa-arrow-right" /></a>
                    </div>
                </div>
            </section>

            {/* ── Section 2: Advanced Security Features ────────── */}
            <section
                ref={featRef}
                className={`sec-feat-section${featVisible ? ' sec-feat-visible' : ''}`}
            >
                <div className="container">
                    <div className="sec-feat-header">
                        <span className="sec-badge">How We Protect Your Data</span>
                        <h2 className="sec-section-title">
                            Security Built Into <span className="sec-green">Every Layer</span>
                        </h2>
                    </div>
                    <div className="sec-feat-cards">
                        {principles.map((card, i) => (
                            <div
                                key={card.id}
                                className="sec-feat-card"
                                style={{ transitionDelay: `${0.08 + i * 0.1}s` }}
                            >
                                <div className="sec-mockup-wrap">{card.mockup}</div>
                                <div className="sec-card-body">
                                    <h3 className="sec-card-title">{card.title}</h3>
                                    <p className="sec-card-desc">{card.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Section 3: Enterprise ─────────────────────── */}
            <section
                ref={corpRef}
                className={`sec-infra-section${corpVisible ? ' sec-infra-visible' : ''}`}
                style={{ padding: '80px 0', background: '#ffffff' }}
            >
                <div className="container">
                    <div className="sec-infra-header" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                        <span className="sec-badge sec-badge--dark">Enterprise Security</span>
                            <h2 className="sec-section-title" style={{ marginBottom: '20px' }}>
                                For Teams That <span className="sec-green">Need More</span>
                            </h2>
                            <p className="sec-section-subtitle" style={{ fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '40px' }}>
                            If your organization has specific security requirements, data residency needs, or compliance frameworks that must be met — talk to us. We build for enterprise from day one and are happy to walk through our security architecture in detail.
                        </p>
                        <a href="https://interbizconsulting.eb-sites.com/4534599536082944" target="_blank" rel="noopener noreferrer" className="btn btn-primary sol-cta-btn" style={{ backgroundColor: '#ff7a00', borderColor: '#ff7a00', padding: '15px 30px', fontSize: '1.1rem', display: 'inline-block' }}>Contact Our Team <i className="fa-solid fa-arrow-right" /></a>
                    </div>
                </div>
            </section>



        </div>
    );
};

export default Security;
