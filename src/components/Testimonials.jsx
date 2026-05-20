import React, { useState } from 'react';

const TESTIMONIALS = [
    {
        quote:   "EstiPay saved our team over 15 hours a week in carrier follow-up calls. What used to take our adjusters half a day now happens automatically before morning coffee.",
        name:    "Marcus D.",
        role:    "VP of Claims Operations",
        company: "Coastal Restoration Group",
        initial: "M",
        accent:  '#009b6c',
    },
    {
        quote:   "The IVR navigation alone was worth it. We used to dread calling Travelers and Allstate — now the AI handles it and sends us a clean status report within the hour.",
        name:    "Sandra W.",
        role:    "Licensed Public Adjuster",
        company: "Westbrook Claims Consulting",
        initial: "S",
        accent:  '#125e92',
    },
    {
        quote:   "We integrated EstiPay into our workflow in a single afternoon. Claim statuses that used to take 2 days now come back in under an hour. Genuinely transformative.",
        name:    "James T.",
        role:    "Operations Manager",
        company: "PremierBuild Contractors",
        initial: "J",
        accent:  '#009b6c',
    },
    {
        quote:   "Payment follow-ups used to eat my entire Monday morning. Now the AI handles every reminder and I just review what came in. Our DSO dropped from 47 days to 29.",
        name:    "Priya K.",
        role:    "CFO",
        company: "Nexus Restoration Partners",
        initial: "P",
        accent:  '#f48027',
    },
];

export default function Testimonials() {
    const [active, setActive] = useState(0);

    return (
        <section className="testimonials-section" aria-label="Customer testimonials">
            {/* Ambient orbs */}
            <div className="section-orb section-orb--green" style={{ width: 500, height: 500, top: -160, left: -140 }} aria-hidden="true" />
            <div className="section-orb section-orb--blue"  style={{ width: 460, height: 460, bottom: -160, right: -160 }} aria-hidden="true" />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                {/* Section header */}
                <div className="section-header text-center" data-reveal>
                    <span className="section-badge section-badge--orange">TESTIMONIALS</span>
                    <h2>Trusted by Claims Professionals</h2>
                    <p className="section-subheading">
                        See how restoration contractors, public adjusters, and claims teams
                        are reclaiming their time with EstiPay.
                    </p>
                </div>

                {/* Testimonial cards grid */}
                <div className="testi-grid">
                    {TESTIMONIALS.map((t, i) => (
                        <article
                            key={t.name}
                            className={`testi-card${i === active ? ' testi-card--featured' : ''}`}
                            style={{ '--testi-accent': t.accent }}
                            data-reveal
                            data-delay={String(i * 120)}
                            onMouseEnter={() => setActive(i)}
                        >
                            {/* Large decorative quote mark */}
                            <span className="testi-quote-mark" aria-hidden="true">"</span>

                            <blockquote className="testi-text">
                                {t.quote}
                            </blockquote>

                            <footer className="testi-footer">
                                <div
                                    className="testi-avatar"
                                    style={{ background: t.accent }}
                                    aria-hidden="true"
                                >
                                    {t.initial}
                                </div>
                                <div className="testi-meta">
                                    <span className="testi-name">{t.name}</span>
                                    <span className="testi-role">{t.role} · {t.company}</span>
                                </div>
                            </footer>
                        </article>
                    ))}
                </div>

                {/* Star rating trust signal */}
                <div className="testi-trust" data-reveal>
                    <div className="testi-stars" aria-label="5 stars">
                        {['s1','s2','s3','s4','s5'].map((k) => (
                            <span key={k} className="material-symbols-outlined testi-star" aria-hidden="true">star</span>
                        ))}
                    </div>
                    <p className="testi-trust-text">
                        Loved by <strong>restoration teams</strong> across the US. Currently in beta — join limited pilot access.
                    </p>
                </div>
            </div>
        </section>
    );
}
