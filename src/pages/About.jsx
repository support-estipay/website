import React, { useEffect, useRef, useState } from 'react';
import CTA from '../components/CTA';
import claimsImage from '../assets/claims_communication.png';

const IconCustomerFirst = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="8" r="4" fill="#29c1a5" opacity="0.2" stroke="#29c1a5" strokeWidth="1.6"/>
        <path d="M5 20C5 16.6863 8.13401 14 12 14C15.866 14 19 16.6863 19 20" stroke="#29c1a5" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M18 10C19.6569 10 21 11.3431 21 13C21 14.6569 19.6569 16 18 16" stroke="#29c1a5" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M6 10C4.34315 10 3 11.3431 3 13C3 14.6569 4.34315 16 6 16" stroke="#29c1a5" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
);


const IconInnovation = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3L14.472 8.52796L20 11L14.472 13.472L12 19L9.52796 13.472L4 11L9.52796 8.52796L12 3Z" fill="#29c1a5" opacity="0.2" stroke="#29c1a5" strokeWidth="1.6" strokeLinejoin="round"/>
        <path d="M20 4L21 6L23 7L21 8L20 10L19 8L17 7L19 6L20 4Z" stroke="#29c1a5" strokeWidth="1.6" strokeLinejoin="round"/>
        <path d="M5 18L5.5 19L6.5 19.5L5.5 20L5 21L4.5 20L3.5 19.5L4.5 19L5 18Z" stroke="#29c1a5" strokeWidth="1.6" strokeLinejoin="round"/>
    </svg>
);

const IconIntegrity = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 5C7.58172 5 3 12 3 12C3 12 7.58172 19 12 19C16.4183 19 21 12 21 12C21 12 16.4183 5 12 5Z" fill="#29c1a5" opacity="0.2" stroke="#29c1a5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="12" r="3" stroke="#29c1a5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const IconExcellence = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3L4 7.5V16.5L12 21L20 16.5V7.5L12 3Z" fill="#29c1a5" opacity="0.2" stroke="#29c1a5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 3V21M4 7.5L12 12M20 7.5L12 12" stroke="#29c1a5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const values = [
    {
        icon: <IconCustomerFirst />,
        label: 'Foundation',
        title: 'The Operator Comes First',
        features: [
            'Every decision starts with the people doing the work — contractors, adjusters, and claims ops teams. If it doesn’t make their day faster and simpler, we don’t ship it.'
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
            'We are honest about where the product is. We don’t oversell. We don’t use fake metrics. We show you exactly what EstiPay does — and we let the demo speak for itself.'
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

const About = () => {
    const heroRef = useRef(null);
    const missionRef = useRef(null);
    const valuesRef = useRef(null);
    const statusRef = useRef(null);

    const [heroVisible, setHeroVisible] = useState(false);
    const [missionVisible, setMissionVisible] = useState(false);
    const [valuesVisible, setValuesVisible] = useState(false);
    const [statusVisible, setStatusVisible] = useState(false);

    useEffect(() => {
        const makeObserver = (setter) =>
            new IntersectionObserver(
                ([entry]) => { if (entry.isIntersecting) setter(true); },
                { threshold: 0.08 }
            );

        const pairs = [
            { ref: heroRef,    setter: setHeroVisible },
            { ref: missionRef, setter: setMissionVisible },
            { ref: valuesRef,  setter: setValuesVisible },
            { ref: statusRef,  setter: setStatusVisible },
        ];

        const observers = pairs.map(({ ref, setter }) => {
            const obs = makeObserver(setter);
            if (ref.current) obs.observe(ref.current);
            return obs;
        });

        return () => observers.forEach(o => o.disconnect());
    }, []);

    return (
        <div className="page-container">

            {/* ── Hero ─────────────────────────────────────────── */}
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

            {/* ── Mission ──────────────────────────────────────── */}
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
                            <a href="https://interbizconsulting.eb-sites.com/4534599536082944" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ backgroundColor: '#ff7a00', borderColor: '#ff7a00', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                                Join the Beta <i className="fa-solid fa-arrow-right"></i>
                            </a>
                        </div>
                        <div className="abt-mission-visual" style={{ position: 'relative' }}>
                            <div style={{ position: 'absolute', inset: '-20px', background: 'radial-gradient(circle at center, rgba(41, 193, 165, 0.15) 0%, transparent 70%)', filter: 'blur(40px)', zIndex: 0 }}></div>
                            <img src={claimsImage} alt="Claims Dashboard UI" style={{ width: '100%', borderRadius: '20px', boxShadow: '0 20px 40px rgba(41,193,165,0.1)', border: '1px solid rgba(41,193,165,0.2)', position: 'relative', zIndex: 1, objectFit: 'cover' }} />
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Values ───────────────────────────────────────── */}
            <section
                ref={valuesRef}
                className={`content-section sol-cards-section${valuesVisible ? ' abt-section-visible' : ''}`}
                style={{ background: '#dcf0e7', borderTop: '1px solid rgba(0,0,0,0.08)', borderBottom: '1px solid rgba(0,0,0,0.08)', padding: '100px 0' }}
            >
                <div className="container">
                    <div className="abt-values-header">
                        <span className="sec-badge sec-badge--dark">Our Values</span>
                        <h2 className="sec-section-title sec-section-title--light" style={{ color: '#1a1a2e' }}>The Principles Behind Every Product Decision</h2>
                        <p className="sec-section-subtitle sec-section-subtitle--light" style={{ color: '#4b5563' }}>
                            These aren’t wall decorations. They are the standards we hold every build decision, every conversation, and every partnership to.
                        </p>
                    </div>
                    <div className={`sol-cards sol-cards--4col${valuesVisible ? ' sol-visible' : ''}`} style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
                        {values.map((item, i) => (
                            <div
                                key={item.title}
                                className="sol-card"
                                style={{ transitionDelay: `${0.08 + i * 0.1}s`, padding: '30px 20px', background: '#ffffff', borderColor: 'rgba(0,0,0,0.1)' }}
                            >
                                <div className="sol-icon-wrap" style={{ marginBottom: '20px', background: 'transparent', border: 'none', padding: 0, justifyContent: 'flex-start' }}>
                                    <div className="sol-icon-bubble" style={{ background: 'rgba(41, 193, 165, 0.08)', borderColor: 'rgba(41, 193, 165, 0.15)' }}>{item.icon}</div>
                                </div>
                                <div className="sol-card-body" style={{ padding: 0 }}>
                                    <span className="sol-label" style={{ color: '#ff7a00', fontWeight: 'bold' }}>{item.label}</span>
                                    <h3 className="sol-card-title" style={{ fontSize: '1.2rem', margin: '10px 0', color: '#1a1a2e' }}>{item.title}</h3>
                                    {item.features.map(f => (
                                        <p key={f} style={{ color: '#374151', fontSize: '0.95rem', lineHeight: '1.6' }}>{f}</p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Product Status ─────────────────────────── */}
            <section
                ref={statusRef}
                className={`abt-stats-section${statusVisible ? ' abt-stats-visible' : ''}`}
            >
                <div className="container">
                    <div className="abt-stats-header">
                        <span className="sec-badge sec-badge--dark">Product Status</span>
                        <h2 className="sec-section-title sec-section-title--light" style={{ color: '#1a1a2e' }}>Here Is Exactly Where We Stand</h2>
                        <p className="sec-section-subtitle sec-section-subtitle--light" style={{ color: '#4b5563' }}>
                            We believe in showing you the real picture — not a polished version of it.
                        </p>
                    </div>
                    <div style={{ maxWidth: '600px', margin: '0 auto', background: '#f9fafb', padding: '40px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '20px', color: '#1a1a2e', fontSize: '1.1rem' }}>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '15px' }}><span style={{ color: '#10b981', width: '1.25em', display: 'inline-flex', justifyContent: 'center' }} aria-hidden><i className="fa-solid fa-layer-group" /></span> Core architecture — Complete</li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '15px' }}><span style={{ color: '#10b981', width: '1.25em', display: 'inline-flex', justifyContent: 'center' }} aria-hidden><i className="fa-solid fa-sitemap" /></span> IVR navigation engine — Built and tested</li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '15px' }}><span style={{ color: '#10b981', width: '1.25em', display: 'inline-flex', justifyContent: 'center' }} aria-hidden><i className="fa-solid fa-microphone-lines" /></span> AI voice agent — Active in demo environment</li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '15px' }}><span style={{ color: '#10b981', width: '1.25em', display: 'inline-flex', justifyContent: 'center' }} aria-hidden><i className="fa-solid fa-headset" /></span> Human agent interaction layer — Complete</li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '15px' }}><span style={{ color: '#10b981', width: '1.25em', display: 'inline-flex', justifyContent: 'center' }} aria-hidden><i className="fa-solid fa-chart-line" /></span> Dashboard and data extraction — In final build</li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '15px', borderTop: '1px solid #e5e7eb', paddingTop: '20px' }}><span style={{ color: '#F58220', width: '1.25em', display: 'inline-flex', justifyContent: 'center' }} aria-hidden><i className="fa-solid fa-user-plus" /></span> Beta partner onboarding — Open now</li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '15px' }}><span style={{ color: '#F58220', width: '1.25em', display: 'inline-flex', justifyContent: 'center' }} aria-hidden><i className="fa-solid fa-calendar-check" /></span> General availability — Coming Q4 2026</li>
                        </ul>
                        <div style={{ marginTop: '40px', textAlign: 'center' }}>
                            <a href="https://interbizconsulting.eb-sites.com/4534599536082944" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ backgroundColor: '#ff7a00', borderColor: '#ff7a00' }}>Become a Beta Partner <i className="fa-solid fa-arrow-right"></i></a>
                        </div>
                    </div>
                </div>
            </section>



        </div>
    );
};

export default About;
