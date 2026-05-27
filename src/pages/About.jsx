import React, { useEffect, useRef, useState } from 'react';

const IconCustomerFirst = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="8" r="4" fill="var(--md-primary)" opacity="0.2" stroke="var(--md-primary)" strokeWidth="1.6"/>
        <path d="M5 20C5 16.6863 8.13401 14 12 14C15.866 14 19 16.6863 19 20" stroke="var(--md-primary)" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M18 10C19.6569 10 21 11.3431 21 13C21 14.6569 19.6569 16 18 16" stroke="var(--md-primary)" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M6 10C4.34315 10 3 11.3431 3 13C3 14.6569 4.34315 16 6 16" stroke="var(--md-primary)" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
);


const IconInnovation = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3L14.472 8.52796L20 11L14.472 13.472L12 19L9.52796 13.472L4 11L9.52796 8.52796L12 3Z" fill="var(--md-primary)" opacity="0.2" stroke="var(--md-primary)" strokeWidth="1.6" strokeLinejoin="round"/>
        <path d="M20 4L21 6L23 7L21 8L20 10L19 8L17 7L19 6L20 4Z" stroke="var(--md-primary)" strokeWidth="1.6" strokeLinejoin="round"/>
        <path d="M5 18L5.5 19L6.5 19.5L5.5 20L5 21L4.5 20L3.5 19.5L4.5 19L5 18Z" stroke="var(--md-primary)" strokeWidth="1.6" strokeLinejoin="round"/>
    </svg>
);

const IconIntegrity = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 5C7.58172 5 3 12 3 12C3 12 7.58172 19 12 19C16.4183 19 21 12 21 12C21 12 16.4183 5 12 5Z" fill="var(--md-primary)" opacity="0.2" stroke="var(--md-primary)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="12" r="3" stroke="var(--md-primary)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const IconExcellence = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3L4 7.5V16.5L12 21L20 16.5V7.5L12 3Z" fill="var(--md-primary)" opacity="0.2" stroke="var(--md-primary)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 3V21M4 7.5L12 12M20 7.5L12 12" stroke="var(--md-primary)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const values = [
    {
        icon: <IconCustomerFirst />,
        label: 'Foundation',
        title: 'The Operator Comes First',
        features: [
            `Every decision starts with the people doing the work — contractors, adjusters, and claims ops teams. If it doesn't make their day faster and simpler, we don't ship it.`
        ],
    },
    {
        icon: <IconInnovation />,
        label: 'Core Driver',
        title: 'Automation That Actually Works',
        features: [
            'We build AI that adapts to the real world — not rigid scripts that break the moment something unexpected happens. Real automation means handling the unexpected, not avoiding it.'
        ],
    },
    {
        icon: <IconIntegrity />,
        label: 'Commitment',
        title: 'Radical Transparency',
        features: [
            `We are honest about where the product is. We don't oversell. We don't use fake metrics. We show you exactly what EstiPay does — and we let the demo speak for itself.`
        ],
    },
    {
        icon: <IconExcellence />,
        label: 'Standard',
        title: 'Built to Last',
        features: [
            'We build for reliability, security, and scale from day one. Not features that look good in a deck. Systems that hold up when the volume is real and the stakes are high.'
        ],
    },
];

const platformLayers = [
    {
        logoSrc: '/assets/platform/azure-ai-foundry.png?v=13',
        logoAlt: 'Microsoft Azure AI Foundry',
        logoHiRes: true,
        label: 'Intelligence',
        tech: 'Microsoft Azure AI Foundry',
        description:
            'Powers real-time reasoning for IVR navigation, live agent dialogue, and structured claim extraction — not fixed scripts.',
        featured: true,
    },
    {
        logoSrc: '/assets/platform/twilio.png?v=7',
        logoAlt: 'Twilio',
        label: 'Voice & Telephony',
        tech: 'Twilio',
        description:
            'Carrier-grade outbound calling, audio streaming, and call control for 24/7 voice agents.',
        featured: false,
    },
    {
        logoSrc: '/assets/platform/fastapi.png?v=7',
        logoAlt: 'FastAPI',
        label: 'Application',
        tech: 'FastAPI',
        description:
            'Secure APIs and orchestration that connect voice, AI, and your dashboard in real time — deployed on Microsoft Azure.',
        featured: false,
    },
    {
        logoSrc: '/assets/platform/azure.png?v=7',
        logoAlt: 'Microsoft Azure',
        label: 'Cloud Platform',
        tech: 'Azure App Service · Database · Blob Storage',
        description:
            'Hosting, encrypted databases, and document storage for claim records, call logs, and recordings — all on Microsoft Azure.',
        featured: false,
    },
];

const About = () => {
    const heroRef = useRef(null);
    const missionRef = useRef(null);
    const valuesRef = useRef(null);
    const platformRef = useRef(null);
    const statusRef = useRef(null);

    const [heroVisible, setHeroVisible] = useState(false);
    const [missionVisible, setMissionVisible] = useState(false);
    const [valuesVisible, setValuesVisible] = useState(false);
    const [platformVisible, setPlatformVisible] = useState(false);
    const [statusVisible, setStatusVisible] = useState(false);

    useEffect(() => {
        const makeObserver = (setter) =>
            new IntersectionObserver(
                ([entry]) => { if (entry.isIntersecting) setter(true); },
                { threshold: 0.08 }
            );

        const pairs = [
            { ref: heroRef,      setter: setHeroVisible },
            { ref: missionRef,   setter: setMissionVisible },
            { ref: valuesRef,    setter: setValuesVisible },
            { ref: platformRef,  setter: setPlatformVisible },
            { ref: statusRef,    setter: setStatusVisible },
        ];

        const observers = pairs.map(({ ref, setter }) => {
            const obs = makeObserver(setter);
            if (ref.current) obs.observe(ref.current);
            return obs;
        });

        return () => observers.forEach(o => o.disconnect());
    }, []);

    return (
        <div className="page-container page-flow">

            {/* -- Hero ------------------------------------------- */}
            <section
                ref={heroRef}
                className={`sec-hero${heroVisible ? ' sec-hero-visible' : ''}`}
            >
                <div className="sec-hero-blobs">
                    <div className="sec-hero-blob sec-hero-blob--tl" />
                    <div className="sec-hero-blob sec-hero-blob--br" />
                </div>
                <div className="container sec-hero-container">
                    <span className="sec-hero-badge">About EstiPay</span>
                    <h1 className="sec-hero-title">
                        Built to Fix the Broken Communication at the<br />
                        <span className="sec-hero-accent">Heart of Every Delayed Claim</span>
                    </h1>
                    <p className="sec-hero-subtitle" style={{ maxWidth: '800px', margin: '0 auto 30px' }}>
                        EstiPay was founded on a simple belief — the insurance claims process is broken, and AI can fix it. We are the team building that fix.
                    </p>
                </div>
            </section>

            {/* -- Mission ---------------------------------------- */}
            <section
                ref={missionRef}
                className={`abt-mission-section${missionVisible ? ' abt-mission-visible' : ''}`}
            >
                <div className="container">
                    <div className="abt-mission-layout">
                        <div className="abt-mission-text">
                            <span className="sec-badge">Our Mission</span>
                            <h2 className="sec-section-title">
                                Making Claims Communication<br />
                                <span className="sec-green">Instant, Accurate, and Automatic</span>
                            </h2>
                            <p className="abt-mission-body">
                                Insurance claims should pay out in days, not months. But the contractors, adjusters, and restoration crews who do the work spend more time chasing carriers than closing jobs. They navigate endless IVR menus, leave voicemails that disappear, and wait on hold for information that should be instant.
                            </p>
                            <p className="abt-mission-body">
                                We built EstiPay to eliminate that bottleneck entirely. An AI voice agent that makes the calls, navigates the menus, speaks to human agents, and returns structured claim status — so the professionals who do the work get paid without the fight.
                            </p>
                            <p className="abt-mission-body" style={{ marginBottom: '30px' }}>
                                We are currently in active development and onboarding our first beta partners. If you work in insurance claims and want to be part of shaping this product — we want to hear from you.
                            </p>
                            <a href="https://interbizconsulting.eb-sites.com/4534599536082944" target="_blank" rel="noopener noreferrer" className="btn btn-filled-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                                Join the Beta <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: '1rem', verticalAlign: 'middle' }}>arrow_forward</span>
                            </a>
                        </div>
                        <div className="abt-mission-visual" style={{ position: 'relative' }}>
                            <div style={{ position: 'absolute', inset: '-20px', background: 'radial-gradient(circle at center, rgba(41, 193, 165, 0.15) 0%, transparent 70%)', filter: 'blur(40px)', zIndex: 0 }}></div>
                            <img src="/assets/dashboard-light.png" alt="Claims Dashboard UI" style={{ width: '100%', borderRadius: 'var(--shape-media)', boxShadow: '0 20px 40px var(--md-tertiary-a14)', border: '1px solid var(--md-tertiary-a20)', position: 'relative', zIndex: 1, objectFit: 'cover' }} />
                        </div>
                    </div>
                </div>
            </section>

            {/* -- Values ----------------------------------------- */}
            <section
                ref={valuesRef}
                className={`content-section sol-cards-section section-flow${valuesVisible ? ' abt-section-visible' : ''}`}
            >
                <div className="container">
                    <div className="abt-values-header">
                        <span className="sec-badge sec-badge--dark">Our Values</span>
                        <h2 className="sec-section-title sec-section-title--light" style={{ color: 'var(--md-on-surface)' }}>The Principles Behind Every Product Decision</h2>
                        <p className="sec-section-subtitle sec-section-subtitle--light" style={{ color: 'var(--md-on-surface-variant)' }}>
                            These aren't wall decorations. They are the standards we hold every build decision, every conversation, and every partnership to.
                        </p>
                    </div>
                    <div className={`sol-cards sol-cards--4col${valuesVisible ? ' sol-visible' : ''}`} style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
                        {values.map((item, i) => (
                            <div
                                key={item.title}
                                className="sol-card"
                                style={{ transitionDelay: `${0.08 + i * 0.1}s`, padding: '30px 20px', background: 'var(--md-surface-container-lowest)', borderColor: 'var(--md-outline-variant)' }}
                            >
                                <div className="sol-icon-wrap" style={{ marginBottom: '20px', background: 'transparent', border: 'none', padding: 0, justifyContent: 'flex-start' }}>
                                    <div className="sol-icon-bubble" style={{ background: 'var(--md-tertiary-container)', borderColor: 'var(--md-tertiary-a14)' }}>{item.icon}</div>
                                </div>
                                <div className="sol-card-body" style={{ padding: 0 }}>
                                    <span className="sol-label" style={{ color: 'var(--md-primary)', fontWeight: 'bold' }}>{item.label}</span>
                                    <h3 className="sol-card-title" style={{ fontSize: '1.2rem', margin: '10px 0', color: 'var(--md-on-surface)' }}>{item.title}</h3>
                                    {item.features.map(f => (
                                        <p key={f} style={{ color: 'var(--md-on-surface-variant)', fontSize: '0.95rem', lineHeight: '1.6' }}>{f}</p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* -- Platform & Technology -------------------- */}
            <section
                ref={platformRef}
                className={`content-section sol-cards-section section-flow abt-platform-section${platformVisible ? ' abt-section-visible' : ''}`}
            >
                <div className="container">
                    <div className="abt-platform-header">
                        <span className="sec-badge sec-badge--dark">Platform & Technology</span>
                        <h2 className="sec-section-title sec-section-title--light" style={{ color: 'var(--md-on-surface)' }}>
                            Enterprise Infrastructure Behind Every Call
                        </h2>
                        <p className="sec-section-subtitle sec-section-subtitle--light" style={{ color: 'var(--md-on-surface-variant)' }}>
                            EstiPay runs on Microsoft Azure end to end — from Azure AI Foundry to App Service, database, and secure file storage.
                        </p>
                    </div>
                    <div className={`sol-cards sol-cards--4col${platformVisible ? ' sol-visible' : ''}`} style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
                        {platformLayers.map((item, i) => (
                            <div
                                key={item.label}
                                className={`sol-card${item.featured ? ' abt-platform-card--featured' : ''}`}
                                style={{ transitionDelay: `${0.08 + i * 0.1}s`, padding: '30px 20px', background: 'var(--md-surface-container-lowest)', borderColor: 'var(--md-outline-variant)' }}
                            >
                                <div className="sol-icon-wrap" style={{ marginBottom: '20px', background: 'transparent', border: 'none', padding: 0, justifyContent: 'flex-start' }}>
                                    <div className="sol-icon-bubble abt-platform-icon-bubble">
                                        <img
                                            src={item.logoSrc}
                                            alt={item.logoAlt}
                                            className={`abt-platform-logo${item.logoHiRes ? ' abt-platform-logo--hires' : ''}`}
                                            loading="lazy"
                                            decoding="async"
                                        />
                                    </div>
                                </div>
                                <div className="sol-card-body" style={{ padding: 0 }}>
                                    <span className="sol-label" style={{ color: 'var(--md-primary)', fontWeight: 'bold' }}>{item.label}</span>
                                    <p className="abt-platform-tech">{item.tech}</p>
                                    <p style={{ color: 'var(--md-on-surface-variant)', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="abt-platform-footnote">
                        We choose proven enterprise platforms so reliability and security are built in, not bolted on later.
                    </p>
                </div>
            </section>

            {/* -- Product Status --------------------------- */}
            <section
                ref={statusRef}
                className={`abt-stats-section${statusVisible ? ' abt-stats-visible' : ''}`}
            >
                <div className="container">
                    <div className="abt-stats-header">
                        <span className="sec-badge sec-badge--dark">Product Status</span>
                        <h2 className="sec-section-title sec-section-title--light" style={{ color: 'var(--md-on-surface)' }}>Here Is Exactly Where We Stand</h2>
                        <p className="sec-section-subtitle sec-section-subtitle--light" style={{ color: 'var(--md-on-surface-variant)' }}>
                            We believe in showing you the real picture — not a polished version of it.
                        </p>
                    </div>
                    <div style={{ maxWidth: '600px', margin: '0 auto', background: 'var(--md-surface-container-low)', padding: '40px', borderRadius: 'var(--shape-card)', border: '1px solid var(--md-outline-variant)' }}>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '20px', color: 'var(--md-on-surface)', fontSize: '1.1rem' }}>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '15px' }}><span style={{ color: 'var(--md-primary)', width: '1.25em', display: 'inline-flex', justifyContent: 'center' }} aria-hidden><span className="material-symbols-outlined" style={{ fontSize: '1.25em' }}>layers</span></span> Core architecture — Complete</li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '15px' }}><span style={{ color: 'var(--md-primary)', width: '1.25em', display: 'inline-flex', justifyContent: 'center' }} aria-hidden><span className="material-symbols-outlined" style={{ fontSize: '1.25em' }}>account_tree</span></span> IVR navigation engine — Built and tested</li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '15px' }}><span style={{ color: 'var(--md-primary)', width: '1.25em', display: 'inline-flex', justifyContent: 'center' }} aria-hidden><span className="material-symbols-outlined" style={{ fontSize: '1.25em' }}>mic</span></span> AI voice agent — Active in demo environment</li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '15px' }}><span style={{ color: 'var(--md-primary)', width: '1.25em', display: 'inline-flex', justifyContent: 'center' }} aria-hidden><span className="material-symbols-outlined" style={{ fontSize: '1.25em' }}>headset_mic</span></span> Human agent interaction layer — Complete</li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '15px' }}><span style={{ color: 'var(--md-primary)', width: '1.25em', display: 'inline-flex', justifyContent: 'center' }} aria-hidden><span className="material-symbols-outlined" style={{ fontSize: '1.25em' }}>trending_up</span></span> Dashboard and data extraction — In final build</li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '15px', borderTop: '1px solid #e5e7eb', paddingTop: '20px' }}><span style={{ color: 'var(--md-secondary)', width: '1.25em', display: 'inline-flex', justifyContent: 'center' }} aria-hidden><span className="material-symbols-outlined" style={{ fontSize: '1.25em' }}>person_add</span></span> Beta partner onboarding — Open now</li>
                        </ul>
                        <div style={{ marginTop: '40px', textAlign: 'center' }}>
                            <a href="https://interbizconsulting.eb-sites.com/4534599536082944" target="_blank" rel="noopener noreferrer" className="btn btn-filled-secondary">Become a Beta Partner <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: '1rem', verticalAlign: 'middle' }}>arrow_forward</span></a>
                        </div>
                    </div>
                </div>
            </section>



        </div>
    );
};

export default About;


