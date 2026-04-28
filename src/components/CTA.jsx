import React from 'react';

const CTA = () => {
    return (
        <section id="ready-cta">
            {/* Decorative blobs */}
            <div className="cta-blob cta-blob--tl" aria-hidden="true" />
            <div className="cta-blob cta-blob--br" aria-hidden="true" />

            <div className="container cta-content">
                {/* Trust badge */}
                <div className="cta-badge">
                    <span className="cta-badge-dot" />
                    Trusted by 500+ contractors &amp; adjusters
                </div>

                <h2>
                    <span className="cta-part-1">Stop Paying</span> Your Team to<br />
                    <span className="cta-highlight">Sit on Hold.</span>
                </h2>

                <ul className="cta-trust-row">
                    <li><i className="fa-solid fa-check" /> No credit card required</li>
                    <li><i className="fa-solid fa-check" /> Demo available on request</li>
                </ul>

                <p className="cta-subtitle">
                    Every hour spent chasing claim status is an hour not spent closing jobs. See EstiPay handle it — live, in 15 minutes.
                </p>

                <div className="cta-actions">
                    <a href="https://interbizconsulting.eb-sites.com/4534599536082944" target="_blank" rel="noopener noreferrer" className="btn-cta btn-cta--primary" style={{ backgroundColor: '#ff7a00', borderColor: '#ff7a00' }}>
                        Join Our Pilot Program
                        <i className="fa-solid fa-arrow-right" />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default CTA;
