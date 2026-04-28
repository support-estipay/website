import React from 'react';

const Pricing = () => {
    return (
        <div className="page-container">
            <section className="page-hero">
                <div className="container">
                    <h1>Simple, <span className="highlight">Transparent Pricing</span></h1>
                    <p className="subtitle">Choose the plan that fits your needs</p>
                </div>
            </section>

            <section className="content-section">
                <div className="container">
                    <div className="pricing-cards">
                        <div className="pricing-card">
                            <div className="pricing-header">
                                <h3>Starter</h3>
                                <div className="pricing-label">For Small Teams</div>
                            </div>
                            <div className="pricing-price">
                                <span className="currency">$</span>
                                <span className="amount">499</span>
                                <span className="period">/month</span>
                            </div>
                            <ul className="pricing-features">
                                <li>Up to 500 claims/month</li>
                                <li>Basic automation</li>
                                <li>Email support</li>
                                <li>Standard integrations</li>
                                <li>Mobile access</li>
                                <li>Basic reporting</li>
                            </ul>
                            <a href="#" className="btn btn-outline">Get Started</a>
                        </div>

                        <div className="pricing-card pricing-card-featured">
                            <div className="pricing-badge">Most Popular</div>
                            <div className="pricing-header">
                                <h3>Professional</h3>
                                <div className="pricing-label">For Growing Teams</div>
                            </div>
                            <div className="pricing-price">
                                <span className="currency">$</span>
                                <span className="amount">1,499</span>
                                <span className="period">/month</span>
                            </div>
                            <ul className="pricing-features">
                                <li>Up to 2,500 claims/month</li>
                                <li>Advanced AI automation</li>
                                <li>Priority support</li>
                                <li>Custom integrations</li>
                                <li>Mobile + Desktop apps</li>
                                <li>Advanced analytics</li>
                                <li>Team collaboration tools</li>
                                <li>API access</li>
                            </ul>
                            <a href="#" className="btn btn-orange">Get Started</a>
                        </div>

                        <div className="pricing-card">
                            <div className="pricing-header">
                                <h3>Enterprise</h3>
                                <div className="pricing-label">For Large Organizations</div>
                            </div>
                            <div className="pricing-price">
                                <span className="amount-text">Custom</span>
                            </div>
                            <ul className="pricing-features">
                                <li>Unlimited claims</li>
                                <li>Full AI automation suite</li>
                                <li>Dedicated support</li>
                                <li>Custom development</li>
                                <li>White-label options</li>
                                <li>Advanced security</li>
                                <li>SLA guarantees</li>
                                <li>Training & onboarding</li>
                            </ul>
                            <a href="#" className="btn btn-outline">Contact Sales</a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="content-section bg-light">
                <div className="container">
                    <div className="section-header">
                        <h2>Frequently Asked Questions</h2>
                    </div>
                    <div className="faq-simple">
                        <div className="faq-item-simple">
                            <h4>Can I change plans later?</h4>
                            <p>Yes! You can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.</p>
                        </div>
                        <div className="faq-item-simple">
                            <h4>What happens if I exceed my claim limit?</h4>
                            <p>We'll notify you when you're approaching your limit. You can either upgrade your plan or pay a small overage fee for additional claims.</p>
                        </div>
                        <div className="faq-item-simple">
                            <h4>Is there a free trial?</h4>
                            <p>Yes! All plans come with a 14-day free trial. No credit card required to get started.</p>
                        </div>
                        <div className="faq-item-simple">
                            <h4>What payment methods do you accept?</h4>
                            <p>We accept all major credit cards, ACH transfers, and wire transfers for enterprise customers.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Pricing;
