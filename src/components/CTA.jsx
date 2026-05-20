import React from 'react';

const CTA = () => {
    return (
        <section id="ready-cta">
            {/* Decorative blobs */}
            <div className="cta-blob cta-blob--tl" aria-hidden="true" />
            <div className="cta-blob cta-blob--br" aria-hidden="true" />

            <div className="container cta-content">
                {/* Trust badge */}
                <div className="cta-badge" data-reveal="fade">
                    <span className="cta-badge-dot" />
                    Trusted by 500+ contractors &amp; adjusters
                </div>

                <h2 data-reveal>
                    <span className="cta-part-1">Stop Paying</span> Your Team to<br />
                    <span className="cta-highlight">Sit on Hold.</span>
                </h2>

                <ul className="cta-trust-row" data-reveal data-delay="150">
                    <li><span className="material-symbols-outlined ms-icon" aria-hidden="true">check_circle</span> No credit card required</li>
                    <li><span className="material-symbols-outlined ms-icon" aria-hidden="true">check_circle</span> Demo available on request</li>
                </ul>

                <p className="cta-subtitle" data-reveal data-delay="200">
                    Every hour spent chasing claim status is an hour not spent closing jobs. See EstiPay handle it — live, in 15 minutes.
                </p>

                <div className="cta-actions" data-reveal data-delay="300">
                    <a href="https://interbizconsulting.eb-sites.com/4534599536082944" target="_blank" rel="noopener noreferrer" className="btn-cta btn-cta--primary">
                        Join Our Pilot Program
                        <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: '1rem' }}>arrow_forward</span>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default CTA;
