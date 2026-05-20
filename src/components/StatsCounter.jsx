import React, { useRef, useState, useEffect } from 'react';

const STATS = [
    {
        value:  3.2,
        suffix: 'h',
        decimal: true,
        label:  'saved per claim',
        icon:   'schedule',
        desc:   'Average time reclaimed per claim cycle — no hold music, no manual follow-ups.',
    },
    {
        value:  40,
        suffix: '%',
        label:  'faster resolution',
        icon:   'trending_up',
        desc:   'Claim resolution cycles reduced through automated carrier follow-up.',
    },
    {
        value:  98,
        suffix: '%',
        label:  'IVR automation rate',
        icon:   'phonelink_ring',
        desc:   'Successful automated IVR navigation without human intervention.',
    },
    {
        value:  24,
        suffix: '/7',
        label:  'always-on calling',
        icon:   'support_agent',
        desc:   'Outbound AI agents working around the clock, every day of the year.',
    },
];

function Counter({ value, suffix, decimal, entered }) {
    const [display, setDisplay] = useState(0);
    const frameRef = useRef(null);

    useEffect(() => {
        if (!entered) return;
        const duration = 1800;
        const start = performance.now();

        const step = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = eased * value;
            setDisplay(decimal ? Number.parseFloat(current.toFixed(1)) : Math.round(current));
            if (progress < 1) frameRef.current = requestAnimationFrame(step);
        };

        frameRef.current = requestAnimationFrame(step);
        return () => cancelAnimationFrame(frameRef.current);
    }, [entered, value, decimal]);

    return (
        <span className="stat-value">
            {decimal ? display.toFixed(1) : display}{suffix}
        </span>
    );
}

export default function StatsCounter() {
    const sectionRef = useRef(null);
    const [entered, setEntered] = useState(false);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setEntered(true);
                    observer.unobserve(el);
                }
            },
            { threshold: 0.25 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <section className="stats-section" ref={sectionRef} aria-label="Key metrics">
            {/* Ambient orbs — give this transparent section depth */}
            <div className="section-orb section-orb--green"  style={{ width: 480, height: 480, top: -160, left: -120 }} aria-hidden="true" />
            <div className="section-orb section-orb--orange" style={{ width: 380, height: 380, bottom: -120, right: -100 }} aria-hidden="true" />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div className="stats-grid">
                    {STATS.map((stat, i) => (
                        <div
                            key={stat.label}
                            className="stat-card"
                            data-reveal
                            data-delay={String(i * 100)}
                        >
                            <div className="stat-icon-wrap">
                                <span className="material-symbols-outlined" aria-hidden="true">{stat.icon}</span>
                            </div>
                            <Counter
                                value={stat.value}
                                suffix={stat.suffix}
                                decimal={stat.decimal}
                                entered={entered}
                            />
                            <p className="stat-label">{stat.label}</p>
                            <p className="stat-desc">{stat.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
