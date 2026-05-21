import React, { useEffect, useRef, useState } from 'react';

const IconEmail = () => (
    <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="11" width="28" height="20" rx="3" fill="var(--md-primary)" opacity="0.10" stroke="var(--md-primary)" strokeWidth="1.8"/>
        <path d="M6 15L20 24L34 15" stroke="var(--md-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const IconPhone = () => (
    <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 8H18L21 15L17.5 17.5C19.2 21 21 22.8 24.5 24.5L27 21L34 24V30C34 32.2 32.2 34 30 34C17.8 34 6 22.2 6 10C6 7.8 7.8 6 10 6L12 8Z" fill="var(--md-primary)" opacity="0.12" stroke="var(--md-primary)" strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>
);

const contactMethods = [
    {
        icon: <IconEmail />,
        label: 'Email',
        title: 'Direct Access',
        lines: ['founders@estipay.com'],
    },
    {
        icon: <IconPhone />,
        label: 'Phone',
        title: 'Support Line',
        lines: ['Available for Beta partners only'],
    }
];

const faqs = [
    {
        q: "Who answers the contact form?",
        a: "Our founding team reads and responds to every message personally.",
    },
    {
        q: "What should I include in my message?",
        a: "Tell us a bit about your current claims volume, what software you use, and where your biggest bottleneck is.",
    },
    {
        q: "How long does the demo take?",
        a: "15 minutes. We don't do hour-long sales decks. We show you the product and answer your questions.",
    }
];

const Contact = () => {
    const heroRef    = useRef(null);
    const contentRef = useRef(null);
    const faqRef     = useRef(null);

    const [heroVisible,    setHeroVisible]    = useState(false);
    const [contentVisible, setContentVisible] = useState(false);
    const [faqVisible,     setFaqVisible]     = useState(false);

    const [formData, setFormData] = useState({
        name: '', email: '', company: '', phone: '', message: '',
    });

    useEffect(() => {
        const makeObserver = (setter) =>
            new IntersectionObserver(
                ([entry]) => { if (entry.isIntersecting) setter(true); },
                { threshold: 0.08 }
            );

        const observers = [
            { ref: heroRef,    setter: setHeroVisible },
            { ref: contentRef, setter: setContentVisible },
            { ref: faqRef,     setter: setFaqVisible },
        ].map(({ ref, setter }) => {
            const obs = makeObserver(setter);
            if (ref.current) obs.observe(ref.current);
            return obs;
        });

        return () => observers.forEach(o => o.disconnect());
    }, []);

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Message sent! (This is a demo)');
    };

    return (
        <div className="page-container">

            {/* ── Hero ───────────────────────────────────────── */}
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
                    <span className="sec-hero-badge">Contact Us</span>
                    <h1 className="sec-hero-title">
                        Let’s Talk About<br />
                        <span className="sec-hero-accent">Your Workflow</span>
                    </h1>
                    <p className="sec-hero-subtitle" style={{ maxWidth: '800px', margin: '0 auto 30px' }}>
                        Whether you have a question about the beta, want to see a specific integration, or just want to know if EstiPay works for your specific use case — we’re here.
                    </p>
                </div>
            </section>

            {/* ── Contact Section ────────────────────────────── */}
            <section className="content-section con-section">
                <div className="container">
                    <div
                        ref={contentRef}
                        className={`con-layout${contentVisible ? ' con-visible' : ''}`}
                    >
                        {/* Left — info cards */}
                        <div className="con-info-col">
                            <div className="con-info-header">
                                <span className="sol-label" style={{ color: 'var(--md-secondary)', display: 'inline-block', padding: '6px 18px', borderRadius: '100px', background: 'rgba(255, 122, 0, 0.08)', border: '1px solid rgba(255, 122, 0, 0.2)' }}>Contact Information</span>
                                <h2 className="con-info-title">
                                    Direct to our founders
                                </h2>
                                <p className="con-info-sub">
                                    No automated responses. No sales development reps. You talk directly with the people building the product.
                                </p>
                            </div>

                            <div className="con-info-cards" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
                                {contactMethods.map((item, i) => (
                                    <div
                                        key={item.label}
                                        className="con-info-card"
                                        style={{ transitionDelay: `${0.1 + i * 0.09}s` }}
                                    >
                                        <div className="con-card-icon-wrap">
                                            <div className="con-card-icon-bubble">
                                                {item.icon}
                                            </div>
                                        </div>
                                        <div className="con-card-body">
                                            <span className="sol-label" style={{ color: 'var(--md-secondary)' }}>{item.label}</span>
                                            <h4 className="con-card-title">{item.title}</h4>
                                            {item.lines && item.lines.map(line => (
                                                <p key={line} className="con-card-line" style={{ color: '#666' }}>{line}</p>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right — form */}
                        <div className="con-form-wrap">
                            <div className="con-form-card">
                                <span className="sol-label" style={{ color: 'var(--md-secondary)' }}>Message Us Directly</span>
                                <h3 className="con-form-title">How can we help?</h3>
                                <p style={{ color: '#666', marginBottom: '25px', fontSize: '0.95rem' }}>If you are requesting beta access, please include a brief overview of your current claims volume.</p>
                                <form className="contact-form" onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="name">Full Name *</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            placeholder="Your name"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email">Work Email *</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="you@company.com"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="company">Company Name</label>
                                        <input
                                            type="text"
                                            id="company"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleChange}
                                            placeholder="Your company"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="message">How Can We Help? *</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows="5"
                                            placeholder="Tell us about your workflow..."
                                        />
                                    </div>

                                    <button type="submit" className="btn btn-primary con-submit-btn" style={{ backgroundColor: 'var(--md-secondary)', borderColor: 'var(--md-secondary)', width: '100%', padding: '15px', fontSize: '1.1rem' }}>
                                        Send Message
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── FAQ Section ────────────────────────────────── */}
            <section
                ref={faqRef}
                className={`con-faq-section${faqVisible ? ' con-faq-visible' : ''}`}
                style={{ paddingBottom: '120px' }}
            >
                <div className="sec-hero-blobs" style={{ pointerEvents: 'none' }}>
                    <div className="sec-hero-blob sec-hero-blob--tl" style={{ opacity: 0.5 }} />
                </div>
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div className="con-faq-header">
                        <h2 className="sec-section-title" style={{ color: '#1a1a2e' }}>
                                Before You Hit Send
                            </h2>
                    </div>

                    <div className="con-faq-list" style={{ maxWidth: '800px', margin: '0 auto' }}>
                        {faqs.map((faq, i) => (
                            <div
                                key={i}
                                className="con-faq-item"
                                style={{ transitionDelay: `${0.1 + i * 0.1}s`, textAlign: 'left', background: '#f8fafb', padding: '30px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '20px' }}
                            >
                                <h4 style={{ fontSize: '1.2rem', color: 'var(--md-primary)', marginBottom: '10px' }}>{faq.q}</h4>
                                <p style={{ color: '#555', margin: 0, lineHeight: '1.6' }}>{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Contact;

