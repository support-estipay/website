import React, { useRef, useState, useEffect } from 'react';
import Navbar from './Navbar';
import DemoModal from './DemoModal';

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

    // Scroll-driven zoom effect for the image
    useEffect(() => {
        const handleScroll = () => {
            if (!imgColRef.current) return;
            const rect = imgColRef.current.getBoundingClientRect();
            const windowH = window.innerHeight;

            // progress: 0 when element enters bottom of screen, 1 when element is fully visible
            const progress = Math.min(
                Math.max((windowH - rect.top) / (windowH * 0.65), 0),
                1
            );

            const scale = 0.88 + 0.12 * progress;       // 0.88 → 1.0
            const translateY = 40 * (1 - progress);      // 40px → 0px
            const opacity = Math.min(progress * 1.5, 1); // fade in slightly faster

            setImgStyle({
                opacity,
                transform: `scale(${scale}) translateY(${translateY}px)`,
                transition: 'transform 0.08s linear, opacity 0.08s linear',
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // run once on mount
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
            const colors = ['#29c1a5', '#F58220', '#10b981'];
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

            <Navbar />

            <div className="container hero-split-container">
                <div className="hero-text-col">
                    <div className="pre-headline hero-animate" style={{ animationDelay: '0.1s' }}>
                        <span className="badge">AI VOICE AGENT FOR INSURANCE CLAIMS</span>
                    </div>

                    <h1 className="hero-animate" style={{ animationDelay: '0.25s' }}>
                        <span style={{ color: 'black' }}>AI That Calls Carriers.</span><br />
                        <span style={{ color: 'var(--primary-green)' }}>
                            So Your Team Doesn’t Have To.
                        </span>
                    </h1>

                    <p className="persona-subtitle hero-animate" style={{ animationDelay: '0.4s' }}>
                        Built for Restoration Contractors · Public Adjusters · Claims Teams
                    </p>

                    <p className="subtitle hero-animate" style={{ animationDelay: '0.55s' }}>
                        EstiPay’s agentic voice AI makes outbound calls to insurance companies, navigates every IVR menu, speaks to human agents, and returns structured claim status — automatically. No hold music. No wasted hours. No manual follow-ups.
                    </p>

                    <div className="cta-group hero-cta-group hero-animate" style={{ animationDelay: '0.7s', justifyContent: 'center', alignItems: 'center' }}>
                        <a href="https://interbizconsulting.eb-sites.com/4534599536082944" target="_blank" rel="noopener noreferrer" className="btn btn-orange" style={{ backgroundColor: '#ff7a00', border: '2px solid #ff7a00', color: '#fff', cursor: 'pointer', padding: '12px 32px', borderRadius: '50px', fontSize: '1.1rem', fontWeight: 'bold', transition: 'all 0.3s ease', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', textDecoration: 'none' }}>Join Our Pilot Program <i className="fa-solid fa-arrow-right" /></a>
                        <a href="#how-it-works" className="btn btn-demo" style={{ background: 'transparent', border: '2px solid #10b981', color: '#10b981', cursor: 'pointer', padding: '12px 32px', borderRadius: '50px', fontSize: '1.1rem', fontWeight: 'bold', transition: 'all 0.3s ease', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', textDecoration: 'none' }}>See How It Works <i className="fa-solid fa-arrow-down" /></a>
                    </div>
                </div>

                {/* Scroll-driven zoom image */}
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

            <DemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
        </header>
    );
};

export default Hero;
