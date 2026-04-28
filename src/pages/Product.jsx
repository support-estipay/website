import React from 'react';
import CTA from '../components/CTA';

const Product = () => {
    return (
        <div className="page-container">
            {/* SECTION 1 — HERO */}
            <section className="sec-hero sec-hero-visible">
                <div className="sec-hero-blobs">
                    <div className="sec-hero-blob sec-hero-blob--tl" />
                    <div className="sec-hero-blob sec-hero-blob--br" />
                </div>
                <div className="container sec-hero-container">
                    <span className="sec-hero-badge">EstiPay VoiceAI · Product Overview</span>
                    <h1 className="sec-hero-title" style={{ fontSize: '3rem', lineHeight: '1.2' }}>
                        Agentic Voice AI for <span className="sec-hero-accent">Automated Insurance Claim Workflows</span>
                    </h1>
                    <p className="sec-hero-subtitle" style={{ maxWidth: '800px', margin: '0 auto 30px' }}>
                        EstiPay automates the entire claim status retrieval process — outbound calls, IVR navigation, human agent interaction, and structured data output. Built for claims teams that can’t afford to wait.
                    </p>
                    <div className="sol-cta-wrap" style={{ marginTop: '20px' }}>
                        <a href="https://interbizconsulting.eb-sites.com/4534599536082944" target="_blank" rel="noopener noreferrer" className="btn btn-primary sol-cta-btn" style={{ backgroundColor: '#ff7a00', borderColor: '#ff7a00', padding: '15px 30px', fontSize: '1.1rem' }}>Join Our Pilot Program <i className="fa-solid fa-arrow-right" /></a>
                    </div>
                    <div className="risk-reversal" style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px' }}>
                        <span><i className="check-icon" style={{color: '#10b981'}}>✔</i> 24/7 Automated Outbound Calling</span>
                        <span><i className="check-icon" style={{color: '#10b981'}}>✔</i> Intelligent IVR Navigation</span>
                        <span><i className="check-icon" style={{color: '#10b981'}}>✔</i> Structured Claim Status Extraction</span>
                        <span><i className="check-icon" style={{color: '#10b981'}}>✔</i> Human Agent Interaction When Needed</span>
                    </div>
                </div>
            </section>

            {/* SECTION 2 — THE PROBLEM */}
            <section className="content-section bg-light" style={{ background: '#0a0a0a', padding: '80px 0' }}>
                <div className="container">
                    <div className="section-header" style={{ marginBottom: '50px' }}>
                        <span className="sec-hero-badge" style={{ marginBottom: '15px', display: 'inline-block' }}>The Challenge in Claims Operations</span>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '15px' }}>Manual Claims Communication Is Breaking Your Operations</h2>
                        <p style={{ color: '#aaa', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto' }}>Every minute your team spends on hold is a minute your claims aren’t moving. And it adds up faster than you think.</p>
                    </div>
                    <div className="grid-cards grid-cards-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                        {[
                            { title: 'Time-Consuming Status Checks', desc: 'Agents spend 15 to 20 minutes per claim navigating systems, waiting on hold, and verifying information manually. Multiply that across your entire claims portfolio — and you have hundreds of hours of preventable work every month.' },
                            { title: 'Complex IVR Systems Built to Slow You Down', desc: 'Carriers route callers through 5 to 7 menu levels before reaching the right department. Every wrong turn adds time. Every transfer adds frustration. Every disconnection means starting over.' },
                            { title: 'Repetitive Verification With No Memory', desc: 'The same policyholder information gets requested multiple times in a single call. Manual processes have no context. EstiPay does.' },
                            { title: 'Unsustainable Manual Workload', desc: 'The vast majority of claim status checks currently require direct human involvement. As claim volume grows, this bottleneck gets worse — not better.' }
                        ].map((p, i) => (
                            <div key={i} className="cut-card">
                                <div className="cut-card-inner" style={{ padding: '30px', height: '100%' }}>
                                    <h3 style={{ color: '#ff7a00', marginBottom: '15px', fontSize: '1.2rem' }}>{p.title}</h3>
                                    <p style={{ color: '#ccc', lineHeight: '1.6' }}>{p.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 3 — WHERE OLD AUTOMATION FAILS */}
            <section className="content-section" style={{ padding: '80px 0' }}>
                <div className="container">
                    <div className="section-header" style={{ marginBottom: '50px' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '15px' }}>Why Rule-Based Systems Don’t Solve This</h2>
                        <p style={{ color: '#aaa', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto' }}>Static automation breaks the moment something unexpected happens. That’s not a solution — it’s a fragile script pretending to be one.</p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                        {[
                            { title: 'Rule-Based Systems Break in Dynamic Environments', desc: 'Rigid rules cannot adapt to changing IVR structures, new carrier processes, or unexpected call routing. One change at the carrier level breaks the entire workflow.' },
                            { title: 'No Adaptability Across Insurers', desc: 'Every insurance company has a different phone system and a different process. Static automation can’t keep up. EstiPay’s AI adapts in real time.' },
                            { title: 'Cannot Handle Real Conversations', desc: 'Traditional automation fails the moment a human agent answers. EstiPay was built for exactly that moment — and handles it naturally.' }
                        ].map((f, i) => (
                            <div key={i} style={{ background: 'rgba(255, 50, 50, 0.05)', border: '1px solid rgba(255, 50, 50, 0.1)', padding: '30px', borderRadius: '12px' }}>
                                <h3 style={{ color: '#ff4d4d', marginBottom: '15px', fontSize: '1.2rem' }}>✕ {f.title}</h3>
                                <p style={{ color: '#ccc', lineHeight: '1.6' }}>{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 4 — THE SOLUTION */}
            <section className="content-section bg-light" style={{ background: '#0a0a0a', padding: '80px 0' }}>
                <div className="container">
                    <div className="section-header" style={{ marginBottom: '50px' }}>
                        <span className="sec-hero-badge" style={{ marginBottom: '15px', display: 'inline-block' }}>Introducing EstiPay VoiceAI</span>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '15px' }}>Automation That Adapts. Not Just Executes.</h2>
                        <p style={{ color: '#aaa', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto' }}>EstiPay doesn’t follow a rigid script. It sets a goal — retrieve claim status — and finds the path to get there, no matter what happens on the call.</p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
                        {[
                            { title: 'Goal-Oriented AI Agent', desc: 'Focused on achieving specific outcomes, not following fixed workflows. EstiPay adapts its strategy based on what’s actually happening in the call.' },
                            { title: 'Real-Time Decision Making', desc: 'Analyzes every moment of the conversation and makes intelligent navigation decisions — selecting paths, asking clarifying questions, escalating when needed.' },
                            { title: 'Context-Aware Interactions', desc: 'Understands and remembers conversation history within each call — so it never asks the same question twice.' },
                            { title: 'Graceful Recovery', desc: 'Handles call interruptions, disconnections, and unexpected responses — and recovers without losing context or starting over.' }
                        ].map((c, i) => (
                            <div key={i} style={{ background: 'rgba(41, 193, 165, 0.05)', border: '1px solid rgba(41, 193, 165, 0.2)', padding: '30px', borderRadius: '12px', borderTop: '4px solid #29c1a5' }}>
                                <h3 style={{ color: '#29c1a5', marginBottom: '15px', fontSize: '1.2rem' }}>{c.title}</h3>
                                <p style={{ color: '#ccc', lineHeight: '1.6' }}>{c.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 5 — CORE CAPABILITIES */}
            <section className="content-section" style={{ padding: '80px 0' }}>
                <div className="container">
                    <div className="section-header" style={{ marginBottom: '50px' }}>
                        <span className="sec-hero-badge" style={{ marginBottom: '15px', display: 'inline-block' }}>Core Capabilities</span>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '15px' }}>Four Capabilities That Power Every Automated Claim Call</h2>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                        {[
                            { label: 'Autonomous Voice Calling', title: 'AI That Dials. Connects. Follows Up.', body: 'Initiates outbound calls automatically with intelligent dialing, connection management, and retry logic when calls fail or go unanswered.', tags: ['Auto-dial', 'Smart routing', 'Retry logic'] },
                            { label: 'Intelligent IVR Navigation', title: 'Finds the Right Path Every Time', body: 'Parses complex phone menus with AI-powered decision making — selecting the optimal path, avoiding dead ends, and recovering from errors mid-call.', tags: ['Menu parsing', 'Path optimization', 'Error recovery'] },
                            { label: 'Human-Like Agent Interaction', title: 'Talks to People. Like a Person.', body: 'Engages in natural conversation with human agents when required — verifying information, handling clarifying questions, and moving the call toward a resolution.', tags: ['NLP', 'Context-aware', 'Adaptive'] },
                            { label: 'Structured Data Extraction', title: 'Returns Clean, Actionable Status Data', body: 'Extracts claim status information from every interaction and delivers it in structured, organized form — directly to your dashboard.', tags: ['Data parsing', 'Validation', 'Export-ready'] }
                        ].map((cap, i) => (
                            <div key={i} style={{ display: 'flex', gap: '30px', alignItems: 'center', background: '#111', padding: '40px', borderRadius: '16px', border: '1px solid #222' }}>
                                <div style={{ flex: '1' }}>
                                    <span style={{ color: '#ff7a00', fontWeight: 'bold', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{cap.label}</span>
                                    <h3 style={{ fontSize: '1.8rem', margin: '10px 0 20px', color: '#fff' }}>{cap.title}</h3>
                                    <p style={{ fontSize: '1.1rem', color: '#ccc', lineHeight: '1.6', marginBottom: '20px' }}>{cap.body}</p>
                                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                        {cap.tags.map(tag => (
                                            <span key={tag} style={{ background: 'rgba(255,255,255,0.1)', padding: '5px 12px', borderRadius: '20px', fontSize: '0.85rem' }}>{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 6 — HOW IT WORKS */}
            <section className="content-section bg-light" style={{ background: '#0a0a0a', padding: '80px 0' }}>
                <div className="container">
                    <div className="section-header" style={{ marginBottom: '50px' }}>
                        <span className="sec-hero-badge" style={{ marginBottom: '15px', display: 'inline-block' }}>End-to-End Workflow</span>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '15px' }}>Five Steps. Fully Automated.</h2>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '800px', margin: '0 auto' }}>
                        {[
                            { num: '01', title: 'Enter Claim Details', desc: 'Input claim number and policy information. Takes under 2 minutes.' },
                            { num: '02', title: 'AI Initiates the Call', desc: 'EstiPay automatically dials the insurance provider. No human action required.' },
                            { num: '03', title: 'Navigates the IVR System', desc: 'AI selects optimal menu paths and reaches the right department — intelligently.' },
                            { num: '04', title: 'Interacts With Human Agent', desc: 'When a live agent answers, EstiPay handles the conversation naturally and professionally.' },
                            { num: '05', title: 'Extracts and Delivers Structured Data', desc: 'Claim status is returned to your dashboard — organized, clean, and ready to action.' }
                        ].map((step, i) => (
                            <div key={i} style={{ display: 'flex', gap: '25px', background: '#111', padding: '30px', borderRadius: '12px' }}>
                                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#444' }}>{step.num}</div>
                                <div>
                                    <h3 style={{ fontSize: '1.3rem', color: '#10b981', marginBottom: '10px' }}>{step.title}</h3>
                                    <p style={{ color: '#ccc', margin: 0, lineHeight: '1.5' }}>{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 7 — SYSTEM ARCHITECTURE */}
            <section className="content-section" style={{ padding: '80px 0' }}>
                <div className="container">
                    <div className="section-header" style={{ marginBottom: '50px' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '15px' }}>Built on Four Intelligent Layers</h2>
                        <p style={{ color: '#aaa', fontSize: '1.1rem' }}>(For technical buyers)</p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '20px', maxWidth: '800px', margin: '0 auto' }}>
                        {[
                            { title: 'Layer 1 — Telephony Layer', desc: 'Outbound calls, IVR navigation, voice recording, connection management.' },
                            { title: 'Layer 2 — AI Agent Layer', desc: 'Natural language processing, real-time decision making, conversation management.' },
                            { title: 'Layer 3 — Knowledge Layer', desc: 'Claim data, status information, conversation context, carrier-specific logic.' },
                            { title: 'Layer 4 — Output Layer', desc: 'Structured data delivery, status reports, dashboard updates, notifications.' }
                        ].map((layer, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '25px', border: '1px solid #333', borderRadius: '8px', background: 'linear-gradient(90deg, #111, transparent)' }}>
                                <div style={{ background: '#29c1a5', width: '8px', height: '100%', borderRadius: '4px' }}></div>
                                <div>
                                    <h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '8px' }}>{layer.title}</h4>
                                    <p style={{ color: '#aaa', margin: 0 }}>{layer.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 8 — CLOSING CTA */}
            <section style={{ padding: '80px 0', textAlign: 'center', background: '#111' }}>
                <div className="container">
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '15px' }}>Ready to See It Work?</h2>
                    <p style={{ fontSize: '1.2rem', color: '#ccc', marginBottom: '30px', maxWidth: '600px', margin: '0 auto 30px' }}>Watch EstiPay navigate a live carrier call, handle the IVR, and return structured claim status — in a 15-minute demo built around your workflow.</p>
                    <a href="https://interbizconsulting.eb-sites.com/4534599536082944" target="_blank" rel="noopener noreferrer" className="btn btn-primary sol-cta-btn" style={{ backgroundColor: '#ff7a00', borderColor: '#ff7a00', padding: '15px 30px', fontSize: '1.1rem', display: 'inline-block' }}>Join Our Pilot Program <i className="fa-solid fa-arrow-right" /></a>
                    <p style={{ marginTop: '15px', fontSize: '0.9rem', color: '#888' }}>Currently in development. Beta partners onboarding now. Demo available on request.</p>
                </div>
            </section>

            <CTA />
        </div>
    );
};

export default Product;
