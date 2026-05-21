import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

/* ── JSON-LD Schema ─────────────────────────────────────────── */
const SCHEMA = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'EstiPay AI Voice Platform',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Cloud',
    description:
        'EstiPay is a vertical-specialized AI Voice Platform purpose-built for restoration companies. Automate carrier negotiations, field scheduling, and payment collection with intelligent voice agents that learn from every call.',
    url: 'https://estipay.com/products',
    offers: {
        '@type': 'Offer',
        url: 'https://estipay.com/contact',
        priceSpecification: { '@type': 'PriceSpecification', priceCurrency: 'USD' },
    },
    provider: { '@type': 'Organization', name: 'EstiPay', url: 'https://estipay.com' },
    featureList: [
        'Automated insurance carrier negotiation',
        'Intelligent IVR navigation',
        'Field appointment scheduling',
        'Automated payment collection',
        'Compliance call recording',
        'Post-call analytics and insights',
    ],
};

/* ── Data ───────────────────────────────────────────────────── */
const PRODUCTS = [
    {
        slug: '/products/insurance-agent',
        icon: 'phone_in_talk',
        label: 'B2B Intelligence',
        title: 'Insurance Agent',
        desc: 'Negotiates and coordinates with insurance carriers — handling claim status, documentation requests, and approvals without human intervention.',
        features: ['Carrier IVR navigation', 'Claim status retrieval', 'Documentation follow-up', 'Approval coordination'],
    },
    {
        slug: '/products/appointment-scheduler',
        icon: 'event_available',
        label: 'Operational Flow',
        title: 'Appointment Scheduler',
        desc: 'Manages logistics with policyholders, syncs field-tech calendars in real time, and drives no-show rates down with proactive voice reminders.',
        features: ['Real-time calendar sync', 'Policyholder outreach', 'Confirmation calls', 'Proactive reminders'],
    },
    {
        slug: '/products/payment-collector',
        icon: 'payments',
        label: 'Financial Recovery',
        title: 'Payment Collector',
        desc: 'Finalizes the revenue cycle via automated, empathetic voice interaction — securing payments as soon as restoration work is verified.',
        features: ['Automated payment follow-up', 'Empathetic voice tone', 'Post-verification collection', 'DSO reduction'],
    },
];

const INTELLIGENCE = [
    {
        icon: 'security',
        label: 'Control & Compliance',
        title: 'Compliance & Audit Agent',
        desc: 'Records, transcribes, and tags every call with disclosures and consent markers — generating audit-ready logs that reduce regulatory friction.',
        list: ['Automated disclosure tagging', 'Consent marker detection', 'Searchable audit trail', 'Carrier-specific compliance'],
    },
    {
        icon: 'trending_up',
        label: 'Data & Insights',
        title: 'Post-Call Analytics & Insights',
        desc: 'Analyzes every call transcript to refine agent behavior, detect risk patterns, and surface product-feedback signals.',
        list: ['Recurring objection detection', 'Script refinement signals', 'Compliance deviation flagging', 'Closed-loop improvement'],
    },
];

const LIFECYCLE = [
    { num: '01', icon: 'travel_explore', title: 'Discover & Capture', desc: 'Centralize carrier "rules of engagement" — tone, escalation paths, key data points. Post-call analytics refine these rules over time.' },
    { num: '02', icon: 'architecture',   title: 'Explore & Plan',     desc: 'Use historical call data to prioritize new dialing logic for complex IVRs and redesign escalation flows across carriers.' },
    { num: '03', icon: 'rocket_launch',  title: 'Deliver & Launch',   desc: 'Deploy agents that sound natural, maintain professional persistence, and integrate with restoration CRM and scheduling tools.' },
    { num: '04', icon: 'insights',       title: 'Analyze & Optimize', desc: 'Track connect rates, collection yield, and no-show reduction. Insights feed back into prompt tuning and compliance tightening.' },
];

const HERO_STATS = [
    { icon: 'trending_down', value: 'DSO',     label: 'Days Sales Outstanding' },
    { icon: 'trending_up',   value: 'Connect', label: 'Call-to-Connect Rate' },
    { icon: 'do_not_disturb_on', value: '0 Hold', label: 'Staff Hours on Hold' },
];

/* ── Component ─────────────────────────────────────────────── */
const Products = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(SCHEMA);
        document.head.appendChild(script);
        return () => { if (document.head.contains(script)) script.remove(); };
    }, []);

    useEffect(() => {
        document.title = 'EstiPay — AI Voice Platform for Restoration Companies';
    }, []);

    const heroRef     = useRef(null);
    const cardsRef    = useRef(null);
    const combinedRef = useRef(null);
    const ctaRef      = useRef(null);

    useEffect(() => {
        const targets = [
            { el: heroRef.current,     cls: 'sec-hero-visible' },
            { el: cardsRef.current,    cls: 'prod-overview-visible' },
            { el: combinedRef.current, cls: 'prod-section-visible' },
            { el: ctaRef.current,      cls: 'prod-cta-visible' },
        ];
        const observers = targets.map(({ el, cls }) => {
            if (!el) return null;
            const obs = new IntersectionObserver(
                ([e]) => { if (e.isIntersecting) { el.classList.add(cls); obs.unobserve(el); } },
                { threshold: 0.08 }
            );
            obs.observe(el);
            return obs;
        });
        return () => observers.forEach(o => o?.disconnect());
    }, []);

    return (
        <div className="page-container">

            {/* ── HERO ──────────────────────────────────────── */}
            <section className="sec-hero" ref={heroRef}>
                <div className="sec-hero-blobs" aria-hidden="true">
                    <div className="sec-hero-blob sec-hero-blob--tl" />
                    <div className="sec-hero-blob sec-hero-blob--br" />
                </div>
                <div className="container sec-hero-container">
                    <span className="sec-hero-badge">EstiPay · Product Suite</span>
                    <h1 className="sec-hero-title">
                        The AI Voice Ecosystem Built for<br />
                        <span className="sec-hero-accent">Restoration Revenue Cycles</span>
                    </h1>
                    <p className="sec-hero-subtitle">
                        Three specialized voice agents — Insurance Agent, Appointment Scheduler, and Payment Collector — that automate the entire claims-to-cash pipeline. Use one, use all, or bundle the platform.
                    </p>
                    <div className="stack-row" style={{ marginTop: '28px' }}>
                        <Link to="/contact" className="btn btn-filled-secondary" style={{ padding: '14px 28px', fontSize: '0.95rem' }}>
                            Talk to Sales <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: '1rem' }}>arrow_forward</span>
                        </Link>
                        <Link to="/solutions" className="btn btn-outline" style={{ padding: '14px 28px', fontSize: '0.95rem' }}>
                            See Use Cases
                        </Link>
                    </div>
                    <div className="prod-hero-stats">
                        {HERO_STATS.map((k) => (
                            <div className="prod-hero-stat" key={k.label}>
                                <span className="prod-hero-stat-value">
                                    <span className="material-symbols-outlined ms-sm" aria-hidden="true">{k.icon}</span>
                                    {k.value}
                                </span>
                                <span className="prod-hero-stat-label">{k.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── COMPACT PRODUCT CARDS ─────────────────────── */}
            <section className="surface-page" style={{ padding: '72px 0 80px' }}>
                <div className="container">
                    <div className="prod-section-intro">
                        <span className="prod-section-intro-eyebrow">Core Products</span>
                        <h2 className="prod-section-intro-title">Three Agents. One Revenue Cycle.</h2>
                        <p className="prod-section-intro-sub">
                            Each agent solves a distinct phase of the restoration revenue cycle. Purchase individually or bundle the full platform for end-to-end automation.
                        </p>
                    </div>
                    <div className="prod-overview-compact" ref={cardsRef}>
                        {PRODUCTS.map((p) => (
                            <Link
                                to={p.slug}
                                className="prod-overview-compact-card"
                                key={p.slug}
                                aria-label={`Learn more about ${p.title}`}
                            >
                                <div className="prod-overview-compact-icon" aria-hidden="true">
                                    <span className="material-symbols-outlined">{p.icon}</span>
                                </div>
                                <span className="prod-overview-compact-label">{p.label}</span>
                                <h3 className="prod-overview-compact-title">{p.title}</h3>
                                <p className="prod-overview-compact-desc">{p.desc}</p>
                                <ul className="prod-overview-compact-features">
                                    {p.features.map((f) => <li key={f}>{f}</li>)}
                                </ul>
                                <div className="prod-overview-compact-link">
                                    Explore {p.title}
                                    <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: '0.9rem', verticalAlign: 'middle' }}>arrow_forward</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── COMBINED: INTELLIGENCE + LIFECYCLE ───────── */}
            <section className="prod-combined-section" ref={combinedRef}>
                <div className="container">
                    <div className="prod-combined-header">
                        <span className="prod-section-intro-eyebrow">How the Platform Stays Ahead</span>
                        <h2 className="prod-section-intro-title" style={{ marginTop: '8px' }}>
                            Built to Get Smarter With Every Call
                        </h2>
                        <p className="prod-section-intro-sub" style={{ marginTop: '10px' }}>
                            Two embedded systems continuously improve all three agents — automatically refining scripts, flagging compliance drift, and turning every call into a learning event.
                        </p>
                    </div>

                    <div className="prod-combined-layout">

                        {/* Left: Platform Intelligence */}
                        <div>
                            <div className="prod-combined-col-label">Platform Intelligence</div>
                            {INTELLIGENCE.map((item) => (
                                <div className="prod-intel-row" key={item.title}>
                                    <div className="prod-intel-row-icon" aria-hidden="true">
                                        <span className="material-symbols-outlined">{item.icon}</span>
                                    </div>
                                    <div>
                                        <span className="prod-intel-row-label">{item.label}</span>
                                        <div className="prod-intel-row-title">{item.title}</div>
                                        <p className="prod-intel-row-desc">{item.desc}</p>
                                        <div className="prod-intel-row-tags">
                                            {item.list.map((l) => (
                                                <span className="prod-intel-row-tag" key={l}>{l}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Right: Continuous Improvement Loop */}
                        <div>
                            <div className="prod-combined-col-label">Continuous Improvement Loop</div>
                            <div className="prod-lifecycle-list">
                                {LIFECYCLE.map((step) => (
                                    <div className="prod-lifecycle-list-item" key={step.num}>
                                        <div className="prod-lifecycle-list-num" aria-hidden="true">
                                            {step.num}
                                        </div>
                                        <div>
                                            <div className="prod-lifecycle-list-title">
                                                <span className="material-symbols-outlined ms-sm" aria-hidden="true" style={{ marginRight: '8px', color: 'var(--md-primary)' }}>{step.icon}</span>
                                                {step.title}
                                            </div>
                                            <p className="prod-lifecycle-list-desc">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ── CTA ───────────────────────────────────────── */}
            <section className="prod-cta-section cta-band" ref={ctaRef}>
                <div className="container prod-cta-inner cta-band__panel">
                    <span className="sec-badge" style={{ marginBottom: '18px', display: 'inline-block' }}>
                        Ready to Automate?
                    </span>
                    <h2 className="prod-cta-title">
                        One Platform. Zero Phone Tag.<br />Full Revenue Cycle — Automated.
                    </h2>
                    <p className="prod-cta-subtitle">
                        Start with the agent that solves your biggest bottleneck today. Add more as you scale. Every agent is available standalone or as part of the full EstiPay platform.
                    </p>
                    <div className="prod-cta-actions">
                        <Link to="/contact" className="btn btn-filled-secondary" style={{ padding: '14px 32px', fontSize: '0.95rem' }}>
                            Contact Sales <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: '1rem', marginLeft: '6px', verticalAlign: 'middle' }}>arrow_forward</span>
                        </Link>
                        <Link to="/solutions" className="btn btn-outline" style={{ padding: '14px 32px', fontSize: '0.95rem' }}>
                            Explore Use Cases
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Products;

