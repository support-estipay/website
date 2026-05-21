import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import VideoSection from '../components/VideoSection';

/*
 * ── Demo recordings (public/demos/) ───────────────────────────
 * Use these filenames; extension must match the file (.mp3 or .mp4).
 */
const RECORDINGS = {
    fullDemo: '/demos/insurance-agent-full.mp4',
    short1: '/demos/insurance-agent-short-1.mp4',
    short2: '/demos/insurance-agent-short-2.mp4',
};

/* ── JSON-LD Schema ─────────────────────────────────────────── */
const SCHEMA = [
    {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'EstiPay Insurance Agent',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Cloud',
        description:
            'EstiPay Insurance Agent is an AI voice agent that automatically negotiates with insurance carriers — handling claim status updates, documentation requests, and approvals 24/7 without human intervention.',
        url: 'https://estipay.com/products/insurance-agent',
        offers: { '@type': 'Offer', url: 'https://estipay.com/contact' },
        provider: { '@type': 'Organization', name: 'EstiPay', url: 'https://estipay.com' },
        featureList: [
            'Automated outbound carrier calling',
            'Intelligent IVR navigation',
            'Claim status retrieval',
            'Documentation request handling',
            'Approval coordination',
            'Human-agent handoff capability',
        ],
    },
    RECORDINGS.fullDemo && {
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        name: 'EstiPay Insurance Agent — Full Platform Demo',
        description: 'See how EstiPay Insurance Agent navigates carrier IVR systems, retrieves claim status, and coordinates approvals — completely autonomously.',
        uploadDate: '2026-05-20',
        contentUrl: `https://estipay.com${RECORDINGS.fullDemo}`,
    },
].filter(Boolean);

/* ── Data ───────────────────────────────────────────────────── */
const PROBLEMS = [
    {
        icon: 'hourglass_top',
        title: 'Hours Spent on Hold Every Week',
        desc: 'Your team spends 15–20 minutes per claim navigating carrier systems, waiting on hold, and re-verifying the same policyholder information. Multiply that across your claim portfolio and you have hundreds of preventable staff-hours lost every month.',
    },
    {
        icon: 'route',
        title: 'Complex IVR Systems Built to Slow You Down',
        desc: 'Carriers route callers through 5–7 menu levels before reaching the right department. Every wrong turn adds time. Every disconnection means starting over from scratch with no record of where you were.',
    },
    {
        icon: 'call',
        title: '"Phone Tag" That Delays Every Claim',
        desc: 'Carriers don\'t pick up. Callbacks never arrive. Status updates get stuck in voicemail queues. Every delay in getting claim information extends your Days Sales Outstanding and holds back cash flow.',
    },
    {
        icon: 'assignment_late',
        title: 'Inconsistent Documentation of Verbal Agreements',
        desc: 'When your team manually handles carrier calls, critical verbal agreements — status updates, approval conditions, documented timelines — are captured inconsistently or not at all, creating compliance and dispute risk downstream.',
    },
];

const CAPABILITIES = [
    {
        icon: 'call',
        title: 'Autonomous Outbound Calling',
        desc: 'Initiates carrier calls automatically with intelligent dialing, connection management, and retry logic when calls fail or go unanswered — no human required.',
        tags: ['Auto-dial', 'Smart retry', 'Connection mgmt'],
    },
    {
        icon: 'account_tree',
        title: 'Intelligent IVR Navigation',
        desc: 'Parses complex phone menus with AI-powered decision-making — selecting optimal paths, avoiding dead ends, and recovering mid-call without losing context.',
        tags: ['Menu parsing', 'Path optimization', 'Error recovery'],
    },
    {
        icon: 'forum',
        title: 'Natural Human-Agent Interaction',
        desc: 'When a live agent answers, EstiPay engages in fluent, professional conversation — verifying information, handling clarifying questions, and advancing toward resolution.',
        tags: ['Natural language', 'Context-aware', 'Professional tone'],
    },
    {
        icon: 'storage',
        title: 'Structured Data Extraction',
        desc: 'Extracts claim status information, approval conditions, and documentation requirements from every call — delivering clean, structured data directly to your dashboard.',
        tags: ['Data parsing', 'Validation', 'CRM-ready output'],
    },
];

const STEPS = [
    { title: 'Enter Claim Details', desc: 'Input the claim number, policy information, and carrier contact. Takes under two minutes.' },
    { title: 'Agent Initiates the Call', desc: 'EstiPay automatically dials the carrier\'s number. No human action required from this point forward.' },
    { title: 'Navigates the IVR System', desc: 'AI selects the optimal menu path through the carrier\'s IVR — reaching the correct department intelligently, not by brute force.' },
    { title: 'Interacts With Human Agents', desc: 'When a live agent answers, EstiPay handles the full conversation: verification, status inquiry, documentation requests, and approval follow-up.' },
    { title: 'Delivers Structured Status Data', desc: 'Claim status is returned to your dashboard — organized, clean, and ready to action. Every call is recorded and tagged for your audit trail.' },
];


const RELATED = [
    {
        slug: '/products/appointment-scheduler',
        icon: 'event_available',
        label: 'Operational Flow',
        title: 'Appointment Scheduler',
        desc: 'Once a claim is approved, schedule field-tech visits with policyholders — automatically.',
    },
    {
        slug: '/products/payment-collector',
        icon: 'payments',
        label: 'Financial Recovery',
        title: 'Payment Collector',
        desc: 'After restoration work is verified, collect payment via automated, empathetic voice follow-up.',
    },
    {
        slug: '/',
        icon: 'layers',
        label: 'Full Platform',
        title: 'View the Full Platform',
        desc: 'See how all three agents work together to automate your entire revenue cycle end to end.',
        isPlatform: true,
    },
];

/* ── Component ─────────────────────────────────────────────── */
const InsuranceAgent = () => {
    useEffect(() => {
        const scripts = SCHEMA.map(s => {
            const el = document.createElement('script');
            el.type = 'application/ld+json';
            el.textContent = JSON.stringify(s);
            document.head.appendChild(el);
            return el;
        });
        return () => scripts.forEach(el => { if (document.head.contains(el)) document.head.removeChild(el); });
    }, []);

    useEffect(() => {
        document.title = 'Insurance Agent — Automated Carrier Negotiation | EstiPay';
    }, []);

    const heroRef    = useRef(null);
    const probRef    = useRef(null);
    const capRef     = useRef(null);
    const stepsRef   = useRef(null);
    const videoRef   = useRef(null);
    const relatedRef = useRef(null);
    const ctaRef     = useRef(null);

    useEffect(() => {
        const targets = [
            { el: heroRef.current,    cls: 'sec-hero-visible' },
            { el: probRef.current,    cls: 'prod-section-visible' },
            { el: capRef.current,     cls: 'prod-section-visible' },
            { el: stepsRef.current,   cls: 'prod-section-visible' },
            { el: videoRef.current,   cls: 'prod-section-visible' },
            { el: relatedRef.current, cls: 'prod-section-visible' },
            { el: ctaRef.current,     cls: 'prod-cta-visible' },
        ];
        const observers = targets.map(({ el, cls }) => {
            if (!el) return null;
            const obs = new IntersectionObserver(
                ([e]) => { if (e.isIntersecting) { el.classList.add(cls); obs.unobserve(el); } },
                { threshold: 0.1 }
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
                    <nav className="prod-breadcrumb" aria-label="Breadcrumb">
                        <Link to="/">Products</Link>
                        <span className="prod-breadcrumb-sep"><span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: '0.85rem', verticalAlign: 'middle' }}>chevron_right</span></span>
                        <span>Insurance Agent</span>
                    </nav>
                    <div className="prod-hero-badge-wrap">
                        <span className="prod-hero-badge-dot" aria-hidden="true" />
                        B2B Intelligence · Growth Stage
                    </div>
                    <h1 className="sec-hero-title">
                        Insurance Agent —<br />
                        <span className="sec-hero-accent">Negotiate Claims. Handle Carriers.</span>
                    </h1>
                    <p className="sec-hero-subtitle">
                        EstiPay's Insurance Agent automates every outbound carrier call — navigating IVR systems, retrieving claim status, coordinating documentation, and securing approvals, around the clock, without a single staff member on hold.
                    </p>
                    <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '28px' }}>
                        <Link to="/contact" className="btn btn-filled-secondary" style={{ padding: '15px 32px', fontSize: '1rem' }}>
                            Contact Sales <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: '1rem', marginLeft: '6px', verticalAlign: 'middle' }}>arrow_forward</span>
                        </Link>
                        <Link to="/" className="btn btn-outline" style={{ padding: '15px 32px', fontSize: '1rem' }}>
                            <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: '1rem', marginRight: '6px', verticalAlign: 'middle' }}>arrow_back</span>
                            All Products
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── THE PROBLEM ───────────────────────────────── */}
            <section className="prod-section prod-section--white" ref={probRef}>
                <div className="container">
                    <div className="prod-section-header">
                        <span className="sec-badge">The Challenge</span>
                        <h2 className="sec-section-title">Manual Carrier Calls Are Breaking Your Operations</h2>
                        <p className="sec-section-subtitle">
                            Every minute your team spends navigating carrier IVR systems is a minute your claims aren't moving — and the financial cost compounds faster than most operators realize.
                        </p>
                    </div>
                    <div className="prod-problem-cards">
                        {PROBLEMS.map((p, i) => (
                            <article className="prod-problem-card" key={i} style={{ transitionDelay: `${i * 0.08}s` }}>
                                <div className="prod-problem-icon" aria-hidden="true">
                                    <span className="material-symbols-outlined">{p.icon}</span>
                                </div>
                                <h3 className="prod-problem-title">{p.title}</h3>
                                <p className="prod-problem-desc">{p.desc}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CAPABILITIES ──────────────────────────────── */}
            <section className="prod-section prod-section--white prod-section--grid" ref={capRef}>
                <div className="container">
                    <div className="prod-section-header">
                        <span className="sec-badge">Core Capabilities</span>
                        <h2 className="sec-section-title">Four Capabilities That Power Every Automated Carrier Call</h2>
                        <p className="sec-section-subtitle">
                            Unlike rule-based automation that breaks the moment a carrier changes its IVR, EstiPay's Insurance Agent sets a goal — retrieve claim status — and adapts intelligently to reach it.
                        </p>
                    </div>
                    <div className="prod-cap-cards">
                        {CAPABILITIES.map((c, i) => (
                            <article className="prod-cap-card" key={i}>
                                <div className="prod-cap-icon-wrap" aria-hidden="true">
                                    <span className="material-symbols-outlined">{c.icon}</span>
                                </div>
                                <h3 className="prod-cap-title">{c.title}</h3>
                                <p className="prod-cap-desc">{c.desc}</p>
                                <div className="prod-cap-tags">
                                    {c.tags.map((t, j) => <span className="prod-cap-tag" key={j}>{t}</span>)}
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── HOW IT WORKS ──────────────────────────────── */}
            <section className="prod-section prod-section--soft" ref={stepsRef}>
                <div className="container">
                    <div className="prod-section-header">
                        <span className="sec-badge">End-to-End Workflow</span>
                        <h2 className="sec-section-title">Five Steps. Fully Automated.</h2>
                        <p className="sec-section-subtitle">
                            From claim entry to structured status delivery — EstiPay handles every step without a human touching the phone.
                        </p>
                    </div>
                    <div className="prod-steps">
                        {STEPS.map((s, i) => (
                            <div className="prod-step" key={i}>
                                <div className="prod-step-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</div>
                                <div className="prod-step-body">
                                    <h3 className="prod-step-title">{s.title}</h3>
                                    <p className="prod-step-desc">{s.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── VIDEO SECTION ─────────────────────────────── */}
            <section className="prod-section prod-section--white" ref={videoRef}>
                <div className="container">
                    <div className="prod-section-header">
                        <span className="sec-badge">See It in Action</span>
                        <h2 className="sec-section-title">Watch the Insurance Agent Work</h2>
                        <p className="sec-section-subtitle">
                            See how EstiPay navigates a live carrier call, handles the IVR, engages a human agent, and returns structured claim data — entirely on its own.
                        </p>
                    </div>

                    {/* Full Demo */}
                    <div style={{ marginBottom: '12px' }}>
                        <p className="prod-video-label">Full Demo Walkthrough</p>
                    </div>
                    <VideoSection
                        src={RECORDINGS.fullDemo}
                        title="EstiPay Insurance Agent — Full Platform Demo"
                        isMain
                    />

                    {/* Short Clips */}
                    <div style={{ marginTop: '40px' }}>
                        <p className="prod-video-shorts-title">Quick Looks</p>
                        <div className="prod-video-shorts">
                            <VideoSection
                                src={RECORDINGS.short1}
                                title="Insurance Agent — IVR Navigation Demo"
                                label="IVR Navigation in under 60 seconds"
                            />
                            <VideoSection
                                src={RECORDINGS.short2}
                                title="Insurance Agent — Human Agent Interaction"
                                label="Handling a live carrier agent conversation"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ── RELATED PRODUCTS ──────────────────────────── */}
            <section className="prod-section prod-section--white" ref={relatedRef}>
                <div className="container">
                    <div className="prod-section-header">
                        <span className="sec-badge">Complete the Platform</span>
                        <h2 className="sec-section-title">The Insurance Agent Is Just the Start</h2>
                        <p className="sec-section-subtitle">
                            Pair the Insurance Agent with the Appointment Scheduler and Payment Collector to automate your entire claims-to-cash pipeline.
                        </p>
                    </div>
                    <div className="prod-related-cards">
                        {RELATED.map((r, i) => (
                            <Link
                                to={r.slug}
                                className={`prod-related-card ${r.isPlatform ? 'prod-related-card--platform' : ''}`}
                                key={i}
                            >
                                <div className="prod-related-icon"><span className="material-symbols-outlined">{r.icon}</span></div>
                                <span className="prod-related-label">{r.label}</span>
                                <div className="prod-related-title">{r.title}</div>
                                <p className="prod-related-desc">{r.desc}</p>
                                <div className="prod-related-link">
                                    Learn more <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: '0.9rem', verticalAlign: 'middle' }}>arrow_forward</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ───────────────────────────────────────── */}
            <section className="prod-cta-section cta-band" ref={ctaRef}>
                <div className="container prod-cta-inner cta-band__panel">
                    <span className="sec-badge" style={{ marginBottom: '20px', display: 'inline-block' }}>Get Started</span>
                    <h2 className="prod-cta-title">Stop Paying Your Team<br />to Sit on Hold.</h2>
                    <p className="prod-cta-subtitle">
                        EstiPay's Insurance Agent handles every carrier call — 24 hours a day, seven days a week. Contact us to discuss deployment for your restoration operation.
                    </p>
                    <div className="prod-cta-actions">
                        <Link to="/contact" className="btn btn-filled-secondary" style={{ padding: '15px 36px', fontSize: '1rem' }}>
                            Contact Sales <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: '1rem', marginLeft: '6px', verticalAlign: 'middle' }}>arrow_forward</span>
                        </Link>
                        <Link to="/" className="btn btn-outline" style={{ padding: '15px 36px', fontSize: '1rem' }}>
                            View All Products
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default InsuranceAgent;


