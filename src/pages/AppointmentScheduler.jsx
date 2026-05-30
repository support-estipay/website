import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ProductDemosSection, { buildDemoSchemaEntries } from '../components/ProductDemosSection';

/*
 * ── Demo recordings (public/demos/) ───────────────────────────
 * Add entries to fullWalkthroughs or snippets when new files are ready.
 * Optional tabLabel on walkthroughs when you add more than one full demo.
 */
const PRODUCT_DEMOS = {
    fullWalkthroughs: [
        {
            src: '/demos/appointment-scheduler-full.mp3',
            title: 'EstiPay Appointment Scheduler — Full Platform Demo',
            description:
                'See how EstiPay calls a customer after a loss event, gathers damage details and site access information, and books a confirmed site visit for a company executive — entirely without staff involvement.',
        },
    ],
    snippets: [
        {
            src: '/demos/appointment-scheduler-short-1.mp3',
            title: 'Appointment Scheduler — Damage Intake Call',
            label: 'Damage intake and site access collection',
        },
        {
            src: '/demos/appointment-scheduler-short-2.mp3',
            title: 'Appointment Scheduler — Visit Booking Flow',
            label: 'Scheduling the executive site visit',
        },
    ],
};

/* ── JSON-LD Schema ─────────────────────────────────────────── */
const SCHEMA = [
    {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'EstiPay Appointment Scheduler',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Cloud',
        description:
            'EstiPay Appointment Scheduler is an AI voice agent that calls customers after a loss event, collects damage details and site access information, and books a confirmed date and time for a company executive to visit and assess the damage — without a single manual call from your team.',
        url: 'https://estipay.com/products/appointment-scheduler',
        offers: { '@type': 'Offer', url: 'https://estipay.com/contact' },
        provider: { '@type': 'Organization', name: 'EstiPay', url: 'https://estipay.com' },
        featureList: [
            'Automated customer outreach after loss event',
            'Conversational damage intake (type, date, extent)',
            'Site access detail collection (address, gate codes, entry info)',
            'Executive calendar coordination and visit scheduling',
            'Appointment confirmation and reminder calls',
            'High-volume scalability during storm or disaster events',
        ],
    },
    ...buildDemoSchemaEntries(PRODUCT_DEMOS.fullWalkthroughs),
].filter(Boolean);

/* ── Data ───────────────────────────────────────────────────── */
const PROBLEMS = [
    {
        icon: 'phone_missed',
        title: 'Manual Intake Calls Take Too Long and Miss Critical Details',
        desc: 'Every intake call requires a staff member to ask the right questions, record the answers accurately, and pass them on correctly. When call volumes spike after a storm, details get missed — wrong addresses, no gate codes, incomplete damage descriptions — and your executive shows up unprepared.',
    },
    {
        icon: 'thunderstorm',
        title: 'Storm Events Flood Your Lines Overnight',
        desc: 'A single hail storm can generate hundreds of inbound inquiries in 24 hours. Your office team can\'t scale to meet that overnight. Leads go cold, callbacks pile up, and competitors who respond faster win the job.',
    },
    {
        icon: 'home_work',
        title: 'Site Access Problems That Derail the Visit',
        desc: 'Gated communities, locked entrances, and dogs in the backyard are standard realities of residential restoration. When gate codes and access instructions aren\'t collected upfront, your executive wastes time on-site or has to reschedule entirely.',
    },
    {
        icon: 'event_repeat',
        title: 'Back-and-Forth Scheduling That Delays the First Visit',
        desc: 'Coordinating a specific date and time between a customer and an executive involves multiple calls, voicemails, and callbacks. Every day of delay increases the chance the customer calls a competitor — or the damage gets worse.',
    },
];

const CAPABILITIES = [
    {
        icon: 'assignment',
        title: 'Conversational Damage Intake',
        desc: 'EstiPay asks the customer about the type of loss (water, fire, wind, hail, etc.), when it occurred, the extent of visible damage, and any immediate concerns — capturing all intake data in structured form without a staff member on the line.',
        tags: ['Loss type', 'Damage description', 'Structured data capture'],
    },
    {
        icon: 'location_on',
        title: 'Address and Site Access Collection',
        desc: 'Collects the full property address, access details such as gate codes, entry instructions, and any other site-specific information your executive needs before arriving — so the visit starts without surprises.',
        tags: ['Address capture', 'Gate codes', 'Access instructions'],
    },
    {
        icon: 'calendar_month',
        title: 'Executive Visit Scheduling',
        desc: 'Checks your executives\' real-time availability and presents the customer with clear date and time options for the site assessment visit — capturing their confirmed preference without back-and-forth.',
        tags: ['Calendar sync', 'Time-window selection', 'Confirmation capture'],
    },
    {
        icon: 'notifications',
        title: 'Appointment Reminders',
        desc: 'Sends confirmation and reminder calls before the scheduled visit to ensure the customer is present and any access arrangements (gate codes, unlocking doors) are ready when your executive arrives.',
        tags: ['Reminder calls', 'Confirmation follow-up', 'No-show reduction'],
    },
];

const STEPS = [
    { title: 'Customer Lead Identified', desc: 'A customer inquires after a loss event — whether through an inbound call, a lead list from a storm event, or a referral. EstiPay picks up the outreach from here.' },
    { title: 'EstiPay Calls the Customer', desc: 'EstiPay places a professional outbound call to the customer, introduces the purpose of the call, and begins the intake conversation in a natural, conversational tone.' },
    { title: 'Damage Details Collected', desc: 'EstiPay asks about the type of loss, when it occurred, the rooms or areas affected, and any urgent concerns the customer wants your executive to know before the visit.' },
    { title: 'Address and Access Info Captured', desc: 'EstiPay collects the full property address, gate codes, entry instructions, and any other site-specific details needed for a smooth on-site visit.' },
    { title: 'Visit Date and Time Confirmed', desc: 'EstiPay presents available time windows for a company executive to visit, captures the customer\'s preferred date and time, and confirms the appointment — logging everything to your dashboard instantly.' },
];


const RELATED = [
    {
        slug: '/products/insurance-agent',
        icon: 'phone_in_talk',
        label: 'B2B Intelligence',
        title: 'Insurance Agent',
        desc: 'Once the site is assessed and a claim is filed, automate all carrier coordination — status checks, documentation requests, and approvals — without your team picking up the phone.',
    },
    {
        slug: '/products/payment-collector',
        icon: 'payments',
        label: 'Financial Recovery',
        title: 'Payment Collector',
        desc: 'After restoration work is completed and verified, automatically follow up on payment to close the revenue cycle.',
    },
    {
        slug: '/',
        icon: 'layers',
        label: 'Full Platform',
        title: 'View the Full Platform',
        desc: 'See how all three agents work together — from the first customer call to the last payment collected.',
        isPlatform: true,
    },
];

/* ── Component ─────────────────────────────────────────────── */
const AppointmentScheduler = () => {
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
        document.title = 'Appointment Scheduler — From First Call to Confirmed Site Visit | EstiPay';
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
        <div className="page-container page-flow">

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
                        <span>Appointment Scheduler</span>
                    </nav>
                    <div className="prod-hero-badge-wrap">
                        <span className="prod-hero-badge-dot" aria-hidden="true" />
                        Customer Intake · Growth Stage
                    </div>
                    <h1 className="sec-hero-title">
                        Appointment Scheduler —<br />
                        <span className="sec-hero-accent">From First Call to Confirmed Site Visit.</span>
                    </h1>
                    <p className="sec-hero-subtitle sec-hero-subtitle--wide">
                        EstiPay's Appointment Scheduler calls customers after a loss event, gathers damage details and site access information, and books a confirmed date and time for one of your executives to visit — without a single manual call from your team.
                    </p>
                    <div className="stack-row sec-hero-actions">
                        <Link to="/contact" className="btn btn-filled-secondary btn-hero">
                            Contact Sales <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
                        </Link>
                        <Link to="/" className="btn btn-outline btn-hero">
                            <span className="material-symbols-outlined" aria-hidden="true">arrow_back</span>
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
                        <h2 className="sec-section-title">Manual Intake Is Where Leads and Details Get Lost</h2>
                        <p className="sec-section-subtitle">
                            The window between a customer calling after a loss and your executive arriving on-site is where most restoration companies leak revenue — through slow responses, missed details, and avoidable back-and-forth.
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
                        <h2 className="sec-section-title">Four Capabilities That Turn a Lead Into a Booked Visit</h2>
                        <p className="sec-section-subtitle">
                            EstiPay handles every step of the intake and scheduling process — gathering the right information, locking in the right time, and making sure your executive arrives prepared.
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
                        <h2 className="sec-section-title">From First Contact to Confirmed Visit — Automatically.</h2>
                        <p className="sec-section-subtitle">
                            EstiPay takes over from the moment a customer lead is identified — gathering everything your executive needs and locking in the visit, without your team touching the phone.
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
                        <h2 className="sec-section-title">Watch the Appointment Scheduler Work</h2>
                        <p className="sec-section-subtitle">
                            See how EstiPay calls a customer after a loss event, collects damage and access details, and books a confirmed site visit for one of your executives — from start to finish, without a staff member on the line.
                        </p>
                    </div>

                    <ProductDemosSection
                        fullWalkthroughs={PRODUCT_DEMOS.fullWalkthroughs}
                        snippets={PRODUCT_DEMOS.snippets}
                    />
                </div>
            </section>

            {/* ── RELATED PRODUCTS ──────────────────────────── */}
            <section className="prod-section prod-section--white" ref={relatedRef}>
                <div className="container">
                    <div className="prod-section-header">
                        <span className="sec-badge">Complete the Platform</span>
                        <h2 className="sec-section-title">The Site Visit Is Just the Beginning. Automate What Comes Next.</h2>
                        <p className="sec-section-subtitle">
                            After your executive completes the assessment, EstiPay keeps working — handling carrier coordination and payment collection so your team stays focused on the restoration itself.
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
                    <h2 className="prod-cta-title">Every Lead Deserves<br />a Fast, Prepared Response.</h2>
                    <p className="prod-cta-subtitle">
                        EstiPay calls your customers, gathers the details that matter, and books the visit — so your executive arrives informed and on time, every time. Contact us to discuss deployment for your restoration operation.
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

export default AppointmentScheduler;

