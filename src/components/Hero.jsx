import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import DemoModal from './DemoModal';

const PRODUCT_CHIPS = [
    { icon: 'phone_in_talk',   label: 'Insurance Agent',       to: '/products/insurance-agent' },
    { icon: 'event_available', label: 'Appointment Scheduler', to: '/products/appointment-scheduler' },
    { icon: 'payments',        label: 'Payment Collector',     to: '/products/payment-collector' },
];

const Hero = () => {
    const heroRef = useRef(null);
    const imgColRef = useRef(null);
    const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
    const [sparkles, setSparkles] = useState([]);
    const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
    const [imgStyle, setImgStyle] = useState({
        opacity: 0,
        transform: 'scale(0.88) translateY(40px)',
    });

    // Scroll-driven zoom effect for the dashboard image
    useEffect(() => {
        const handleScroll = () => {
            if (!imgColRef.current) return;
            const rect = imgColRef.current.getBoundingClientRect();
            const windowH = window.innerHeight;
            const progress = Math.min(
                Math.max((windowH - rect.top) / (windowH * 0.65), 0),
                1
            );
            const scale = 0.88 + 0.12 * progress;
            const translateY = 40 * (1 - progress);
            const opacity = Math.min(progress * 1.5, 1);
            setImgStyle({
                opacity,
                transform: `scale(${scale}) translateY(${translateY}px)`,
                transition: 'transform 0.08s linear, opacity 0.08s linear',
            });
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Mouse tracking for grid spotlight + sparkles
    const handleMouseMove = (e) => {
        if (!heroRef.current) return;
        const rect = heroRef.current.getBoundingClientRect();
        const curX = e.clientX - rect.left;
        const curY = e.clientY - rect.top;
        setMousePos({ x: curX, y: curY });

        if (Math.random() < 0.25) {
            const id = Date.now() + Math.random();
            const colors = ['var(--md-primary)', 'var(--md-secondary)', 'var(--md-tertiary)'];
            const newSparkle = {
                id,
                x: curX + (Math.random() * 20 - 10),
                y: curY + (Math.random() * 20 - 10),
                size: Math.random() * 10 + 6,
                color: colors[Math.floor(Math.random() * colors.length)],
                rotation: Math.random() * 180,
            };
            setSparkles(prev => [...prev.slice(-15), newSparkle]);
            setTimeout(() => {
                setSparkles(prev => prev.filter(s => s.id !== id));
            }, 800);
        }
    };

    return (
        <header
            id="hero"
            className="hero-split"
            ref={heroRef}
            onMouseMove={handleMouseMove}
            style={{
                '--mouse-x': `${mousePos.x}px`,
                '--mouse-y': `${mousePos.y}px`,
            }}
        >
            {sparkles.map(s => (
                <svg
                    key={s.id}
                    className="cursor-sparkle"
                    style={{
                        left: s.x,
                        top: s.y,
                        width: `${s.size}px`,
                        height: `${s.size}px`,
                        color: s.color,
                        transform: `translate(-50%, -50%) rotate(${s.rotation}deg)`,
                    }}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <path d="M12 0 L14.59 9.41 L24 12 L14.59 14.59 L12 24 L9.41 14.59 L0 12 L9.41 9.41 Z" />
                </svg>
            ))}

            {/* Ambient glow orbs */}
            <div className="hero-glow-primary"   aria-hidden="true" />
            <div className="hero-glow-secondary" aria-hidden="true" />
            <div className="hero-glow-accent"    aria-hidden="true" />

            <Navbar />

            <div className="container hero-split-container">
                <div className="hero-text-col">
                    <div className="pre-headline hero-animate" style={{ animationDelay: '0.35s' }}>
                        <span className="badge">AI VOICE AGENT FOR INSURANCE CLAIMS</span>
                    </div>

                    <h1 className="hero-animate" style={{ animationDelay: '0.5s' }}>
                        <span className="hero-h1-light">AI That Calls Carriers.</span><br />
                        <span className="hero-h1-accent">So Your Team Doesn't Have To.</span>
                    </h1>

                    <p className="persona-subtitle hero-animate" style={{ animationDelay: '0.65s' }}>
                        Built for Restoration Contractors · Public Adjusters · Claims Teams
                    </p>

                    <p className="subtitle hero-animate" style={{ animationDelay: '0.80s' }}>
                        EstiPay's agentic voice AI makes outbound calls to insurance companies, navigates
                        every IVR menu, speaks to human agents, and returns structured claim status —
                        automatically. No hold music. No wasted hours. No manual follow-ups.
                    </p>

                    <div
                        className="cta-group hero-cta-group hero-animate"
                        style={{ animationDelay: '0.95s', justifyContent: 'center', alignItems: 'center' }}
                    >
                        <a
                            href="https://interbizconsulting.eb-sites.com/4534599536082944"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-filled-secondary btn-hero-pill"
                        >
                            Join Our Pilot Program
                            <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: '1.1rem' }}>arrow_forward</span>
                        </a>
                        <a href="#how-it-works" className="btn btn-hero-pill btn-hero-outline">
                            See How It Works
                            <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: '1.1rem' }}>arrow_downward</span>
                        </a>
                    </div>

                    {/* Product category chips — inspired by kore.ai */}
                    <div className="hero-product-chips hero-animate" style={{ animationDelay: '1.1s' }}>
                        {PRODUCT_CHIPS.map(chip => (
                            <Link key={chip.label} to={chip.to} className="hero-chip">
                                <span className="material-symbols-outlined" aria-hidden="true">{chip.icon}</span>
                                {chip.label}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Scroll-driven zoom dashboard image */}
                <div
                    className="hero-image-col"
                    ref={imgColRef}
                    style={{
                        ...imgStyle,
                        willChange: 'transform, opacity',
                        transformOrigin: 'center bottom',
                    }}
                >
                    <img src="/assets/dashboard-light.png" alt="EstiPay Dashboard UI" className="hero-dashboard-img" />
                </div>
            </div>

            {/* Bottom wave transition — flows from hero into the light TrustBar */}
            <div className="hero-wave-bottom" aria-hidden="true">
                <svg viewBox="0 0 1440 70" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%', height: '100%' }}>
                    <path d="M0,35 C240,70 480,0 720,35 C960,70 1200,0 1440,35 L1440,70 L0,70Z" fill="var(--md-surface-variant)" />
                </svg>
            </div>

            <DemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
        </header>
    );
};

export default Hero;
