import React, { useEffect, useRef, useState } from 'react';
import WhyEstiPay from '../components/WhyEstiPay';
import CTA from '../components/CTA';

const IconContractor = () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 20L20 7L34 20" stroke="#125e92" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 17V33H30V17" fill="#125e92" opacity="0.10" stroke="#125e92" strokeWidth="1.8" strokeLinejoin="round"/>
        <rect x="16" y="24" width="8" height="9" rx="1" fill="#125e92" opacity="0.2" stroke="#125e92" strokeWidth="1.6"/>
    </svg>
);

const IconAdjuster = () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="18" width="28" height="16" rx="2.5" fill="#125e92" opacity="0.10" stroke="#125e92" strokeWidth="1.8"/>
        <path d="M14 18V14C14 11.8 15.8 10 18 10H22C24.2 10 26 11.8 26 14V18" stroke="#125e92" strokeWidth="1.8" strokeLinecap="round"/>
        <line x1="6" y1="26" x2="34" y2="26" stroke="#125e92" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="20" cy="26" r="2.5" fill="#125e92" opacity="0.3" stroke="#125e92" strokeWidth="1.6"/>
    </svg>
);

const IconOps = () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="5" fill="#125e92" opacity="0.15" stroke="#125e92" strokeWidth="1.8"/>
        <path d="M20 6V10M20 30V34M6 20H10M30 20H34M9.4 9.4L12.2 12.2M27.8 27.8L30.6 30.6M30.6 9.4L27.8 12.2M12.2 27.8L9.4 30.6" stroke="#125e92" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
);

const solution_segments = [
    {
        icon: <IconContractor />,
        label: 'For Contractors · Restoration, Roofing & Storm',
        title: 'Focus on the Job. Not the Carrier.',
        body: 'You do the work. You file the claim. Then you spend the next three weeks calling the carrier, leaving voicemails, and waiting for approvals that should have come days ago. That’s not your job. It’s EstiPay’s.',
        features: [
            'Automatically calls carriers on your behalf — no hold time for your team',
            'Navigates IVR systems and reaches the right department every time',
            'Logs every interaction so you always know exactly where each claim stands',
            'Sends follow-up calls until a status is retrieved — no dropped balls',
            'Returns structured claim status directly to your dashboard'
        ],
        result: 'Your crew stays on site. Your claims keep moving. Your cash flow improves.',
        cta: 'See EstiPay for Contractors'
    },
    {
        icon: <IconAdjuster />,
        label: 'For Public Adjusters · Independent Claims Professionals',
        title: 'Handle More Claims. Without Adding More Hours.',
        body: 'You’re managing a full book of claims — each one at a different stage, with a different carrier, requiring a different follow-up. Keeping track of all of it manually isn’t just inefficient. It’s unsustainable. EstiPay gives you the infrastructure to scale without burning out.',
        features: [
            'Tracks every claim across your entire portfolio in one dashboard',
            'Automates outbound follow-up calls to carriers for every open claim',
            'Handles IVR navigation so your team never sits on hold',
            'Logs every call, every status update, every document automatically',
            'Alerts you the moment something needs your personal attention'
        ],
        result: 'You spend your time negotiating and closing — not chasing status updates.',
        cta: 'See EstiPay for Public Adjusters'
    },
    {
        icon: <IconOps />,
        label: 'For Insurance & Claims Ops · Carriers & TPAs',
        title: 'Clear the Backlog. Speed Up Every Resolution.',
        body: 'Communication delays are the number one reason claims take longer than they should. Your team knows what needs to happen. The bottleneck is the back-and-forth. EstiPay automates that entire layer — so your team spends time resolving claims, not tracking them down.',
        features: [
            'Automated outbound calls eliminate communication backlogs',
            'Real-time claim status visibility across your entire portfolio',
            'Proactive alerts when claims need immediate action',
            'Full interaction logs for compliance and audit purposes',
            'Integrates with your existing claims management systems'
        ],
        result: 'Faster resolutions. Happier policyholders. A team focused on outcomes.',
        cta: 'See EstiPay for Claims Ops Teams'
    }
];

const Solutions = () => {
    const heroRef = useRef(null);
    const cardsRef = useRef(null);
    const [heroVisible, setHeroVisible] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const makeObserver = (setter) =>
            new IntersectionObserver(
                ([entry]) => { if (entry.isIntersecting) setter(true); },
                { threshold: 0.08 }
            );

        const observers = [
            { ref: heroRef, setter: setHeroVisible },
            { ref: cardsRef, setter: setVisible },
        ].map(({ ref, setter }) => {
            const obs = makeObserver(setter);
            if (ref.current) obs.observe(ref.current);
            return obs;
        });

        return () => observers.forEach(o => o.disconnect());
    }, []);

    return (
        <div className="page-container">
            <section
                ref={heroRef}
                className={`sec-hero surface-page${heroVisible ? ' sec-hero-visible' : ''}`}
            >
                <div className="sec-hero-blobs">
                    <div className="sec-hero-blob sec-hero-blob--tl" />
                    <div className="sec-hero-blob sec-hero-blob--br" />
                </div>
                <div className="container sec-hero-container">
                    <span className="sec-hero-badge">Solutions</span>
                    <h1 className="sec-hero-title" style={{ fontSize: '3rem', lineHeight: '1.2' }}>
                        Built for the People Who Do the Work and <br />
                        <span className="sec-hero-accent">Wait the Longest to Get Paid</span>
                    </h1>
                    <p className="sec-hero-subtitle" style={{ maxWidth: '800px', margin: '0 auto 30px' }}>
                        EstiPay was designed specifically for claims professionals who need faster communication, better visibility, and less time on the phone with carriers. Every solution is purpose-built for your workflow.
                    </p>
                    <div className="sol-cta-wrap" style={{ marginTop: '30px', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                        <a href="https://interbizconsulting.eb-sites.com/4534599536082944" target="_blank" rel="noopener noreferrer" className="btn btn-filled-secondary sol-cta-btn" style={{ padding: '15px 30px', fontSize: '1.1rem', display: 'inline-block' }}>Join Our Pilot Program <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: '1rem', verticalAlign: 'middle', marginLeft: '6px' }}>arrow_forward</span></a>
                    </div>
                </div>
            </section>

            <section className="content-section sol-cards-section">
                <div className="container" style={{ maxWidth: '1000px' }}>
                    <div ref={cardsRef} className={`sol-cards${visible ? ' sol-visible' : ''}`} style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px' }}>
                        {solution_segments.map((item, i) => (
                            <div
                                key={item.label}
                                className="sol-card"
                                style={{ transitionDelay: `${0.08 + i * 0.1}s`, textAlign: 'left', padding: '40px', display: 'flex', flexDirection: 'column', gap: '20px' }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                    <div className="sol-icon-bubble" style={{ position: 'relative', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(18, 94, 146, 0.1)', borderRadius: '50%' }}>{item.icon}</div>
                                    <span className="sol-label" style={{ margin: 0, fontWeight: 'bold', color: 'var(--md-tertiary)' }}>{item.label}</span>
                                </div>
                                <div className="sol-card-body" style={{ padding: 0 }}>
                                    <h3 className="sol-card-title" style={{ fontSize: '2rem', marginBottom: '15px' }}>{item.title}</h3>
                                    <p style={{ fontSize: '1.1rem', color: 'var(--md-on-surface-variant)', lineHeight: '1.6', marginBottom: '25px' }}>{item.body}</p>
                                    
                                    <div style={{ marginBottom: '25px' }}>
                                        <h4 style={{ color: 'var(--md-on-surface)', marginBottom: '15px', fontSize: '1.1rem' }}>How EstiPay Helps:</h4>
                                        <ul className="sol-features" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                            {item.features.map(f => (
                                                <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1rem', color: 'var(--md-on-surface-variant)' }}>
                                                    <span>{f}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div style={{ background: 'rgba(41, 193, 165, 0.05)', padding: '20px', borderRadius: '8px', borderLeft: '4px solid var(--md-primary)', marginBottom: '25px' }}>
                                        <strong style={{ color: 'var(--md-on-surface)' }}>Result:</strong> <span style={{ color: 'var(--md-on-surface-variant)' }}>{item.result}</span>
                                    </div>

                                    <a href="https://interbizconsulting.eb-sites.com/4534599536082944" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--md-secondary)', fontWeight: 'bold', textDecoration: 'none' }}>
                                        {item.cta}
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            <section style={{ padding: '80px 0', textAlign: 'center', background: '#fff' }}>
                <div className="container">
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '15px', color: 'var(--md-on-surface)' }}>Not Sure Which Solution Fits Your Team?</h2>
                    <p style={{ fontSize: '1.2rem', color: 'var(--md-on-surface-variant)', marginBottom: '30px', maxWidth: '600px', margin: '0 auto 30px' }}>Talk to us in 15 minutes and we’ll show you exactly how EstiPay maps to your specific workflow.</p>
                    <a href="https://interbizconsulting.eb-sites.com/4534599536082944" target="_blank" rel="noopener noreferrer" className="btn btn-filled-secondary sol-cta-btn" style={{ padding: '15px 30px', fontSize: '1.1rem', display: 'inline-block' }}>Join Our Pilot Program <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: '1rem', verticalAlign: 'middle', marginLeft: '6px' }}>arrow_forward</span></a>
                    <p style={{ marginTop: '15px', fontSize: '0.9rem', color: 'var(--md-on-surface-variant)' }}>Currently accepting beta partners across all three segments.</p>
                </div>
            </section>
        </div>
    );
};

export default Solutions;


