import React from 'react';

const TrustBar = () => {
    const items = [
        "IVR Navigation Automated",
        "Claim Status Retrieved Without Human Intervention",
        "Zero Hold Time for Your Team",
        "24/7 Outbound Calling Capability",
        "Live Demo Available Now"
    ];

    return (
        <section className="trust-bar" style={{ backgroundColor: '#125e92', padding: '16px 0', overflow: 'hidden', whiteSpace: 'nowrap' }}>
            <style>
                {`
                @keyframes scroll-trustbar {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .marquee-content {
                    display: inline-flex;
                    align-items: center;
                    gap: 60px;
                    padding-left: 60px;
                    animation: scroll-trustbar 35s linear infinite;
                    color: #fff;
                    font-size: 0.95rem;
                    font-weight: 500;
                    width: max-content;
                }
                .marquee-content:hover {
                    animation-play-state: paused;
                }
                .marquee-item {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                }
                `}
            </style>
            {/* The wrapper must be wider than the viewport to allow seamless scrolling of inline-flex */}
            <div className="marquee-content">
                {items.map((text, idx) => (
                    <span key={idx} className="marquee-item">
                        <span style={{ color: '#ff7a00', fontSize: '1.1rem' }}>⚡</span> 
                        {text}
                    </span>
                ))}
                {items.map((text, idx) => (
                    <span key={'dup-'+idx} className="marquee-item">
                        <span style={{ color: '#ff7a00', fontSize: '1.1rem' }}>⚡</span> 
                        {text}
                    </span>
                ))}
            </div>
        </section>
    );
};

export default TrustBar;
