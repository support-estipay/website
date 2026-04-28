import React, { useState } from 'react';

const faqs = [
    {
        category: "Platform",
        question: "How does the AI voice assistant work?",
        answer: "Esti makes outbound calls to carriers and adjusters on your behalf, navigating phone trees, waiting on hold, and capturing all information. Calls are recorded (with consent) and summarized automatically — so you always have a clear paper trail without lifting a finger."
    },
    {
        category: "Claims",
        question: "What types of claims does EstiPay handle?",
        answer: "EstiPay handles property, auto, and liability claims across a wide range of insurance providers — including residential and commercial policies. Our AI adapts to each carrier's specific workflow and requirements."
    },
    {
        category: "Onboarding",
        question: "How long does it take to get started?",
        answer: "Onboarding typically takes less than 14 days to fully integrate with your existing workflow. Our team handles setup and trains the AI on your specific needs, so you can hit the ground running."
    },
    {
        category: "Security",
        question: "Is my data secure?",
        answer: "Absolutely. We use bank-level AES-256 encryption for all data at rest and in transit. EstiPay is fully compliant with industry data protection standards and HIPAA regulations, with SOC 2 Type II certification in progress."
    },
    {
        category: "Platform",
        question: "Can I integrate with my existing tools?",
        answer: "Yes — EstiPay integrates with most major CRM and claims management platforms including Xactimate, Salesforce, AccuLynx, and more. Our open API also lets your dev team build custom connections."
    },
    {
        category: "Pricing",
        question: "How is EstiPay priced?",
        answer: "We offer flexible plans based on claim volume and team size. Every plan includes a free onboarding consultation and a 30-day ROI guarantee. Join the pilot program to get a custom quote tailored to your business."
    },
];

const categories = ["All", ...Array.from(new Set(faqs.map(f => f.category)))];

const FAQItem = ({ question, answer, isOpen, onClick, index }) => (
    <div
        className={`faq2-item ${isOpen ? 'faq2-item--open' : ''}`}
        onClick={onClick}
    >
        <div className="faq2-question">
            <span className="faq2-index">0{index + 1}</span>
            <span className="faq2-question-text">{question}</span>
            <span className="faq2-toggle">
                {isOpen ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12" /></svg>
                ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                )}
            </span>
        </div>
        <div
            className="faq2-answer"
            style={{
                maxHeight: isOpen ? '300px' : '0px',
                opacity: isOpen ? 1 : 0,
                transition: 'max-height 0.45s cubic-bezier(0.4,0,0.2,1), opacity 0.35s ease',
            }}
        >
            <p>{answer}</p>
        </div>
    </div>
);

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(0);
    const [activeCategory, setActiveCategory] = useState("All");

    const filtered = activeCategory === "All"
        ? faqs
        : faqs.filter(f => f.category === activeCategory);

    return (
        <section id="faq" className="faq2-section">
            {/* Background blobs */}
            <div className="faq2-blob faq2-blob--tl" />
            <div className="faq2-blob faq2-blob--br" />

            <div className="container faq2-container">
                {/* Header */}
                <div className="faq2-header">
                    <span className="faq2-badge">Support</span>
                    <h2 className="faq2-title">
                        Frequently Asked <span className="faq2-title--accent">Questions</span>
                    </h2>
                    <p className="faq2-subtitle">
                        Everything you need to know about EstiPay. Can't find the answer you're looking for?{' '}
                        <a href="/contact" className="faq2-inline-link">Reach out to our team.</a>
                    </p>
                </div>

                {/* Category Filter */}
                <div className="faq2-filters">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={`faq2-filter-btn ${activeCategory === cat ? 'faq2-filter-btn--active' : ''}`}
                            onClick={() => { setActiveCategory(cat); setOpenIndex(-1); }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Accordion */}
                <div className="faq2-list">
                    {filtered.map((faq, i) => (
                        <FAQItem
                            key={faq.question}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openIndex === i}
                            onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                            index={i}
                        />
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="faq2-cta">
                    <div className="faq2-cta-icon">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                    </div>
                    <div>
                        <p className="faq2-cta-heading">Still have questions?</p>
                        <p className="faq2-cta-sub">Our team is happy to walk you through anything.</p>
                    </div>
                    <a href="/contact" className="btn btn-orange faq2-cta-btn">Contact Us</a>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
