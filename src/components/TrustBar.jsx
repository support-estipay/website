import React from 'react';

const TrustBar = () => {
    const items = [
        { icon: 'phonelink_ring', text: 'IVR Navigation Automated' },
        { icon: 'task_alt',       text: 'Claim Status Retrieved Without Human Intervention' },
        { icon: 'schedule',       text: 'Zero Hold Time for Your Team' },
        { icon: 'support_agent',  text: '24/7 Outbound Calling Capability' },
        { icon: 'play_circle',    text: 'Live Demo Available Now' },
    ];

    return (
        <section className="trust-bar" aria-label="Key capabilities">
            <div className="trust-bar-fade trust-bar-fade--left" aria-hidden="true" />
            <div className="trust-bar-fade trust-bar-fade--right" aria-hidden="true" />
            <div className="marquee-content">
                {[...items, ...items].map((item, idx) => (
                    <span key={idx} className="marquee-item">
                        <span className="material-symbols-outlined marquee-icon" aria-hidden="true">{item.icon}</span>
                        {item.text}
                    </span>
                ))}
            </div>
        </section>
    );
};

export default TrustBar;
