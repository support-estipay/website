import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import VideoSection from '../components/VideoSection';

/*
 * ── Demo recordings (public/demos/) ───────────────────────────
 * Use these filenames; set extension to .mp3 or .mp4 to match each file.
 */
const RECORDINGS = {
    fullDemo: '/demos/payment-collector-full.mp3',
    short1: '/demos/payment-collector-short-1.mp3',
    short2: '/demos/payment-collector-short-2.mp3',
};

/* ── JSON-LD Schema ─────────────────────────────────────────── */
const SCHEMA = [
    {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'EstiPay Payment Collector',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Cloud',
        description:
            'EstiPay Payment Collector finalizes the restoration revenue cycle via automated, empathetic AI voice interaction — securing payments as soon as work is verified to reduce DSO and accelerate cash flow for restoration companies.',
        url: 'https://estipay.com/products/payment-collector',
        offers: { '@type': 'Offer', url: 'https://estipay.com/contact' },
        provider: { '@type': 'Organization', name: 'EstiPay', url: 'https://estipay.com' },
        featureList: [
            'Automated post-verification payment follow-up',
            'Empathetic AI voice tone',
            'Promise-to-pay tracking',
            'DSO reduction',
            'Collection yield optimization',
            'Payment security compliance',
        ],
    },
    RECORDINGS.fullDemo && {
        '@context': 'https://schema.org',
        '@type': 'AudioObject',
        name: 'EstiPay Payment Collector — Full Platform Demo',
        description: 'See how EstiPay Payment Collector follows up with policyholders post-verification, handles objections with empathy, and secures payment commitments automatically.',
        uploadDate: '2026-05-20',
        contentUrl: `https://estipay.com${RECORDINGS.fullDemo}`,
    },
].filter(Boolean);

/* ── Data ───────────────────────────────────────────────────── */
const PROBLEMS = [
    {
        icon: 'money_off',
        title: 'Slow Collections Inflate Your DSO',
        desc: 'Every day between completing restoration work and receiving payment is a day your cash is tied up. Manual collections processes — delayed invoices, slow follow-ups, and missed callbacks — push DSO to unsustainable levels and constrain your growth.',
    },
    {
        icon: 'sentiment_stressed',
        title: 'Awkward Payment Conversations Nobody Wants to Make',
        desc: 'Asking for money is uncomfortable — especially with policyholders who\'ve just been through a loss event. Your team avoids the conversation, delays the follow-up, or loses the firmness needed to actually collect. This is human nature. EstiPay doesn\'t have this problem.',
    },
    {
        icon: 'trending_down',
        title: 'Low Promise-to-Pay Ratios From Inconsistent Follow-Up',
        desc: 'When payment follow-up is done manually and inconsistently, many policyholders simply never hear from you again after invoicing. No reminder. No escalation. No collection. Revenue silently slips away.',
    },
    {
        icon: 'gavel',
        title: 'Compliance Risk in Collection Conversations',
        desc: 'Payment collection calls carry regulatory risk — consent requirements, disclosure obligations, and anti-fraud rules that vary by region. Manual collection processes leave this compliance footprint unmanaged and undocumented.',
    },
];

const CAPABILITIES = [
    {
        icon: 'smart_toy',
        title: 'Automated Post-Verification Outreach',
        desc: 'As soon as restoration work is verified, EstiPay initiates payment follow-up calls automatically — no manual trigger required. Timing is configurable to your business workflow.',
        tags: ['Auto-trigger', 'Verification-linked', 'Configurable timing'],
    },
    {
        icon: 'favorite',
        title: 'Empathetic Yet Firm Voice Tone',
        desc: 'EstiPay\'s Payment Collector is trained to acknowledge the policyholder\'s experience while professionally and persistently advancing toward a payment commitment — balancing empathy with results.',
        tags: ['Empathetic tone', 'Professional firmness', 'Objection handling'],
    },
    {
        icon: 'handshake',
        title: 'Promise-to-Pay Capture',
        desc: 'When a policyholder commits to a payment date, EstiPay logs the promise, schedules a confirmation follow-up, and escalates automatically if the commitment isn\'t honored.',
        tags: ['Commitment tracking', 'Follow-up scheduling', 'Escalation logic'],
    },
    {
        icon: 'security',
        title: 'Compliant Collection Interactions',
        desc: 'Every collection call is recorded, transcribed, and tagged with required consent markers and disclosures — ensuring your payment interactions are audit-ready and regulatory-safe.',
        tags: ['Consent recording', 'Disclosure tagging', 'Audit trail'],
    },
];

const STEPS = [
    { title: 'Work Completion Verified', desc: 'Once restoration work is confirmed complete in your system, EstiPay automatically moves the claim to the collection queue — no manual trigger needed.' },
    { title: 'First Payment Follow-Up Call', desc: 'EstiPay places a professional, empathetic outbound call to the policyholder — acknowledging the restoration work and requesting payment per the invoice terms.' },
    { title: 'Handles Objections and Questions', desc: 'If the policyholder raises questions about the amount, timeline, or insurance coverage, EstiPay responds with context-aware, pre-approved responses and escalates edge cases to your team.' },
    { title: 'Captures Payment Commitment', desc: 'If the policyholder agrees to pay, EstiPay captures the promise-to-pay date, logs it to your system, and schedules a follow-up confirmation call.' },
    { title: 'Follow-Up Until Resolved', desc: 'EstiPay continues follow-up until payment is received or the account is escalated — ensuring no receivable goes silently uncollected.' },
];


const RELATED = [
    {
        slug: '/products/insurance-agent',
        icon: 'phone_in_talk',
        label: 'B2B Intelligence',
        title: 'Insurance Agent',
        desc: 'Automate the upstream carrier coordination that makes the job possible — so collection conversations are clean and undisputed.',
    },
    {
        slug: '/products/appointment-scheduler',
        icon: 'event_available',
        label: 'Operational Flow',
        title: 'Appointment Scheduler',
        desc: 'Ensure field visits actually happen on schedule — reducing the delays that make policyholders dispute invoices.',
    },
    {
        slug: '/',
        icon: 'layers',
        label: 'Full Platform',
        title: 'View the Full Platform',
        desc: 'See how all three agents work together to automate your entire claims-to-cash pipeline end to end.',
        isPlatform: true,
    },
];

/* ── Component ─────────────────────────────────────────────── */
const PaymentCollector = () => {
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
        document.title = 'Payment Collector — Close the Revenue Cycle With Voice AI | EstiPay';
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
                        <span>Payment Collector</span>
                    </nav>
                    <div className="prod-hero-badge-wrap">
                        <span className="prod-hero-badge-dot" aria-hidden="true" />
                        Financial Recovery · High-Growth Stage
                    </div>
                    <h1 className="sec-hero-title">
                        Payment Collector —<br />
                        <span className="sec-hero-accent">Close the Revenue Cycle With Voice AI</span>
                    </h1>
                    <p className="sec-hero-subtitle">
                        EstiPay's Payment Collector finalizes the restoration revenue cycle via automated, empathetic voice interaction — securing payments as soon as work is verified, reducing DSO, and accelerating your cash flow without a single awkward conversation for your team.
                    </p>
                    <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '28px' }}>
                        <Link to="/contact" className="btn btn-tonal" style={{ padding: '15px 32px', fontSize: '1rem' }}>
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
                        <h2 className="sec-section-title">The Revenue Is There. Getting Paid Is the Problem.</h2>
                        <p className="sec-section-subtitle">
                            Restoration companies do the hardest work — then lose weeks or months waiting for money that should already be in the bank. Manual collections are inconsistent, uncomfortable, and leave real revenue on the table.
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
                        <h2 className="sec-section-title">Four Capabilities That Turn Invoices Into Revenue</h2>
                        <p className="sec-section-subtitle">
                            EstiPay's Payment Collector handles every step of the post-verification collection process — from first follow-up to promise-to-pay capture — with empathy, persistence, and full compliance.
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
                        <h2 className="sec-section-title">From Work Verification to Payment Collected — Automatically.</h2>
                        <p className="sec-section-subtitle">
                            EstiPay triggers the collection process the moment work is verified and follows up persistently until the receivable is closed — with zero manual involvement.
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
                        <h2 className="sec-section-title">Watch the Payment Collector Work</h2>
                        <p className="sec-section-subtitle">
                            See how EstiPay follows up on a completed restoration invoice — handling objections with empathy, capturing a payment commitment, and logging everything to your dashboard.
                        </p>
                    </div>

                    <div style={{ marginBottom: '12px' }}>
                        <p className="prod-video-label">Full Demo Walkthrough</p>
                    </div>
                    <VideoSection
                        src={RECORDINGS.fullDemo}
                        title="EstiPay Payment Collector — Full Platform Demo"
                        isMain
                    />

                    <div style={{ marginTop: '40px' }}>
                        <p className="prod-video-shorts-title">Quick Looks</p>
                        <div className="prod-video-shorts">
                            <VideoSection
                                src={RECORDINGS.short1}
                                title="Payment Collector — Empathetic Follow-Up Call"
                                label="Empathetic first follow-up call"
                            />
                            <VideoSection
                                src={RECORDINGS.short2}
                                title="Payment Collector — Promise-to-Pay Capture"
                                label="Handling objections and securing commitment"
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
                        <h2 className="sec-section-title">Collection Is the Finish Line. Automate the Full Race.</h2>
                        <p className="sec-section-subtitle">
                            Pair the Payment Collector with the Insurance Agent and Appointment Scheduler to automate every step — from carrier approval to collected revenue.
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
            <section className="prod-cta-section" ref={ctaRef}>
                <div className="container prod-cta-inner">
                    <span className="sec-badge" style={{ marginBottom: '20px', display: 'inline-block' }}>Get Started</span>
                    <h2 className="prod-cta-title">Your Revenue Is Already Earned.<br />Let EstiPay Collect It.</h2>
                    <p className="prod-cta-subtitle">
                        EstiPay's Payment Collector follows up on every invoice, every time — with the right tone and the right persistence. Contact us to discuss deployment for your restoration operation.
                    </p>
                    <div className="prod-cta-actions">
                        <Link to="/contact" className="btn btn-tonal" style={{ padding: '15px 36px', fontSize: '1rem' }}>
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

export default PaymentCollector;

