import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const roles = [
    {
        id: 'contractors',
        label: 'Contractors',
        subtitle: 'Restoration, Roofing & Storm',
        title: 'Stop Losing Hours to Phone Tag',
        description: 'Your AI handles every carrier follow-up — outbound calls, IVR navigation, agent conversations — while you stay on site closing jobs. Get paid faster without touching the phone.',
        pain: 'Spending more time on claims than actual work.',
        mockup: (
            <div className="bfr-mockup bfr-mockup-contractor">
                <div className="bfr-mockup-header">
                    <span className="bfr-dot red" /><span className="bfr-dot yellow" /><span className="bfr-dot green" />
                    <span className="bfr-mockup-title">Job Pipeline</span>
                </div>
                <div className="bfr-pipeline-stats">
                    <div className="bfr-mini-stat">
                        <span className="bfr-mini-val">12</span>
                        <span className="bfr-mini-lbl">Active Jobs</span>
                    </div>
                    <div className="bfr-mini-stat highlight">
                        <span className="bfr-mini-val">$94K</span>
                        <span className="bfr-mini-lbl">Pending Payout</span>
                    </div>
                    <div className="bfr-mini-stat">
                        <span className="bfr-mini-val">3.2d</span>
                        <span className="bfr-mini-lbl">Avg. Response</span>
                    </div>
                </div>
                <div className="bfr-job-list">
                    {[
                        { name: 'Storm Damage — Oak Ave', pct: 90, color: 'var(--md-primary)', tag: 'Followed Up' },
                        { name: 'Roof Replacement — Pine St', pct: 55, color: 'var(--md-secondary)', tag: 'In Review' },
                        { name: 'Hail Claim — Maple Rd', pct: 100, color: 'var(--md-primary)', tag: 'Paid ✓' },
                    ].map((job, i) => (
                        <div key={i} className="bfr-job-row">
                            <div className="bfr-job-name">{job.name}</div>
                            <div className="bfr-job-track">
                                <div className="bfr-job-bar-wrap">
                                    <div className="bfr-job-bar" style={{ width: `${job.pct}%`, background: job.color }} />
                                </div>
                                <span className="bfr-job-tag" style={{ color: job.color }}>{job.tag}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ),
    },
    {
        id: 'adjusters',
        label: 'Public Adjusters',
        subtitle: 'Independent Claims Professionals',
        title: 'Manage More Claims. Without More Admin.',
        description: 'Every claim tracked. Every follow-up automated. Every status update logged without manual effort. You focus on negotiation and strategy — EstiPay handles the communication.',
        pain: 'Juggling dozens of claims with manual tracking.',
        mockup: (
            <div className="bfr-mockup bfr-mockup-adjuster">
                <div className="bfr-mockup-header">
                    <span className="bfr-dot red" /><span className="bfr-dot yellow" /><span className="bfr-dot green" />
                    <span className="bfr-mockup-title">Claims Portfolio</span>
                </div>
                <div className="bfr-portfolio-body">
                    <div className="bfr-portfolio-kpis">
                        <div className="bfr-kpi">
                            <span className="bfr-kpi-num">34</span>
                            <span className="bfr-kpi-lbl">Open Claims</span>
                        </div>
                        <div className="bfr-kpi green">
                            <span className="bfr-kpi-num">+18%</span>
                            <span className="bfr-kpi-lbl">Approval Rate</span>
                        </div>
                    </div>
                    <div className="bfr-claim-rows">
                        {[
                            { id: 'PA-0091', carrier: 'Nationwide', status: 'AI Follow-Up Sent', dot: 'var(--md-primary)' },
                            { id: 'PA-0087', carrier: 'Liberty Mutual', status: 'Docs Ready', dot: 'var(--md-primary)' },
                            { id: 'PA-0083', carrier: 'Travelers', status: 'Awaiting Review', dot: 'var(--md-secondary)' },
                        ].map(c => (
                            <div key={c.id} className="bfr-claim-mini-row">
                                <span className="bfr-claim-dot" style={{ background: c.dot }} />
                                <span className="bfr-claim-mini-id">{c.id}</span>
                                <span className="bfr-claim-mini-carrier">{c.carrier}</span>
                                <span className="bfr-claim-mini-status" style={{ color: c.dot }}>{c.status}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        ),
    },
    {
        id: 'carriers',
        label: 'Insurance & Claims Ops',
        subtitle: 'Carriers & TPAs',
        title: 'Your Team Resolves More. Policyholders Wait Less.',
        description: 'Eliminate communication backlogs and missed follow-ups. EstiPay keeps every claim moving with automated outbound calls and real-time status retrieval — no more chasing your own pipeline.',
        pain: 'Slow communication and backlogged claims.',
        mockup: (
            <div className="bfr-mockup bfr-mockup-carrier">
                <div className="bfr-mockup-header">
                    <span className="bfr-dot red" /><span className="bfr-dot yellow" /><span className="bfr-dot green" />
                    <span className="bfr-mockup-title">Resolution Center</span>
                </div>
                <div className="bfr-resolution-body">
                    <div className="bfr-res-stats">
                        <div className="bfr-res-stat">
                            <span className="bfr-res-val">4.1d</span>
                            <span className="bfr-res-lbl">Avg. Resolution</span>
                            <span className="bfr-res-delta positive">↓ 38% faster</span>
                        </div>
                        <div className="bfr-res-stat">
                            <span className="bfr-res-val">96%</span>
                            <span className="bfr-res-lbl">CSAT Score</span>
                            <span className="bfr-res-delta positive">↑ vs 81% before</span>
                        </div>
                    </div>
                    <div className="bfr-backlog-bar-section">
                        <div className="bfr-backlog-label">
                            <span>Backlog Cleared</span>
                            <span className="bfr-backlog-pct">78%</span>
                        </div>
                        <div className="bfr-backlog-track">
                            <div className="bfr-backlog-fill" style={{ width: '78%' }} />
                        </div>
                    </div>
                    <div className="bfr-activity-row">
                        <span className="bfr-activity-dot" />
                        <span className="bfr-activity-text">14 claims auto-resolved today</span>
                    </div>
                </div>
            </div>
        ),
    },
];

const BuiltForYourRole = () => {
    const sectionRef = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.08 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section id="built-for-role" ref={sectionRef} className={`bfr-section${visible ? ' bfr-visible' : ''}`}>
            <div className="container">
                <div className="bfr-header">
                    <span className="bfr-badge">Built for Every Claims Professional</span>
                    <h2 className="bfr-title">
                        <span className="bfr-green">The Right Tool</span> for Every Claims Professional
                    </h2>
                    <p className="bfr-subtitle">
                        Whether you’re a contractor, adjuster, or claims ops team — <br /> EstiPay adapts to your workflow and eliminates the admin that slows you down.
                    </p>
                </div>

                <div className="bfr-cards">
                    {roles.map((role, i) => (
                        <div
                            key={role.id}
                            className="bfr-card"
                            style={{ transitionDelay: `${0.08 + i * 0.12}s` }}
                        >
                            <div className="bfr-mockup-wrap">{role.mockup}</div>
                            <div className="bfr-card-body">
                                <div className="bfr-card-meta">
                                    <span className="bfr-feature-label">{role.label}</span>
                                    <span className="bfr-role-subtitle">{role.subtitle}</span>
                                </div>
                                <h3 className="bfr-card-title">{role.title}</h3>
                                <p className="bfr-card-desc">{role.description}</p>
                                <div className="bfr-pain-chip">
                                    <span className="bfr-pain-icon">⚡</span>
                                    <span>{role.pain}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bfr-cta-row">
                    <Link to="/solutions" className="bfr-cta-btn">
                        Explore All Solutions
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>

            {/* Wave transition into EverythingYouNeed */}
            <div className="bfr-wave-bottom" aria-hidden="true">
                <svg viewBox="0 0 1440 70" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%', height: '70px' }}>
                    <path d="M0,20 C360,70 1080,0 1440,45 L1440,70 L0,70Z" fill="#f4f7f9" />
                </svg>
            </div>
        </section>
    );
};

export default BuiltForYourRole;

