import React, { useEffect, useRef, useState } from 'react';

const features = [
    {
        id: 'ai-voice',
        label: 'AI Voice Agent',
        title: 'AI That Makes the Call. Every Time.',
        description: 'EstiPay initiates outbound calls to insurance providers automatically — with intelligent dialing, retry logic, and smart routing built in.',
        mockup: (
            <div className="eyn-mockup eyn-mockup-call">
                <div className="eyn-mockup-header">
                    <span className="eyn-dot red" /><span className="eyn-dot yellow" /><span className="eyn-dot green" />
                    <span className="eyn-mockup-title">AI Voice Assistant</span>
                </div>
                <div className="eyn-call-body">
                    <div className="eyn-call-avatar">
                        <span>SF</span>
                    </div>
                    <div className="eyn-call-info">
                        <span className="eyn-call-carrier">State Farm — Claims Dept.</span>
                        <span className="eyn-call-status">
                            <span className="eyn-pulse-dot" />
                            On Call · 2:47
                        </span>
                    </div>
                    <div className="eyn-waveform">
                        {[35, 60, 45, 80, 55, 70, 40, 65, 50, 75].map((h, i) => (
                            <div key={i} className="eyn-wave-bar" style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }} />
                        ))}
                    </div>
                </div>
            </div>
        ),
    },
    {
        id: 'smart-docs',
        label: 'IVR Navigation',
        title: 'Navigates Every Menu. Reaches the Right Person.',
        description: 'Our AI parses complex IVR systems and selects the optimal navigation path — no wrong departments, no repeated holds, no manual intervention required.',
        mockup: (
            <div className="eyn-mockup eyn-mockup-docs">
                <div className="eyn-mockup-header">
                    <span className="eyn-dot red" /><span className="eyn-dot yellow" /><span className="eyn-dot green" />
                    <span className="eyn-mockup-title">Document Center</span>
                </div>
                <div className="eyn-doc-list">
                    {[
                        { name: 'Supplement Report v3.pdf', size: '214 KB', ready: true },
                        { name: 'Xactimate Estimate.pdf', size: '380 KB', ready: true },
                        { name: 'Photo Evidence Pack.zip', size: '11.2 MB', ready: false },
                    ].map(d => (
                        <div key={d.name} className="eyn-doc-row">
                            <span className={`eyn-doc-icon material-symbols-outlined ${d.ready ? 'eyn-doc-icon--ready' : 'eyn-doc-icon--processing'}`} aria-hidden="true">
                                {d.ready ? 'check_circle' : 'cached'}
                            </span>
                            <div className="eyn-doc-info">
                                <span className="eyn-doc-name">{d.name}</span>
                                <span className="eyn-doc-size">{d.size}</span>
                            </div>
                            <span className={`eyn-doc-badge ${d.ready ? 'ready' : 'processing'}`}>
                                {d.ready ? 'Ready' : 'Processing'}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        ),
    },
    {
        id: 'real-time-tracking',
        label: 'Real-Time Tracking',
        title: 'Always Know Where Every Claim Stands',
        description: 'See every claim’s current status updated in real time — so nothing slips through the cracks and your team always knows what needs action next.',
        mockup: (
            <div className="eyn-mockup eyn-mockup-tracking">
                <div className="eyn-mockup-header">
                    <span className="eyn-dot red" /><span className="eyn-dot yellow" /><span className="eyn-dot green" />
                    <span className="eyn-mockup-title">Active Claims</span>
                </div>
                <div className="eyn-claim-list">
                    {[
                        { id: 'CLM-1041', carrier: 'State Farm', status: 'Followed Up', pct: 85, color: 'var(--md-primary)' },
                        { id: 'CLM-1038', carrier: 'Allstate', status: 'Pending', pct: 45, color: 'var(--md-secondary)' },
                        { id: 'CLM-1029', carrier: 'Progressive', status: 'Approved', pct: 100, color: 'var(--md-primary)' },
                    ].map(c => (
                        <div key={c.id} className="eyn-claim-row">
                            <div className="eyn-claim-meta">
                                <span className="eyn-claim-id">{c.id}</span>
                                <span className="eyn-claim-carrier">{c.carrier}</span>
                            </div>
                            <div className="eyn-claim-bar-wrap">
                                <div className="eyn-claim-bar" style={{ width: `${c.pct}%`, background: c.color }} />
                            </div>
                            <span className="eyn-claim-status" style={{ color: c.color }}>{c.status}</span>
                        </div>
                    ))}
                </div>
            </div>
        ),
    },
    {
        id: 'proactive-alerts',
        label: 'Smart Documentation',
        title: 'Documents Ready Before You Ask',
        description: 'Auto-generate status summaries, supplement reports, and carrier-ready files from every interaction — no manual data entry, no copy-pasting.',
        mockup: (
            <div className="eyn-mockup eyn-mockup-alerts">
                <div className="eyn-mockup-header">
                    <span className="eyn-dot red" /><span className="eyn-dot yellow" /><span className="eyn-dot green" />
                    <span className="eyn-mockup-title">Alerts Feed</span>
                </div>
                <div className="eyn-alert-list">
                    {[
                        { icon: 'notifications_active', msg: 'CLM-1041 needs response in 24h', type: 'urgent', time: 'Just now' },
                        { icon: 'check_circle',         msg: 'CLM-1029 approved — $14,200',     type: 'success', time: '12m ago' },
                        { icon: 'warning',              msg: 'Missing docs on CLM-1035',         type: 'warn',    time: '1h ago' },
                    ].map((a) => (
                        <div key={a.msg} className={`eyn-alert-row eyn-alert-${a.type}`}>
                            <span className="eyn-alert-icon material-symbols-outlined" aria-hidden="true">{a.icon}</span>
                            <span className="eyn-alert-msg">{a.msg}</span>
                            <span className="eyn-alert-time">{a.time}</span>
                        </div>
                    ))}
                </div>
            </div>
        ),
    },
    {
        id: 'analytics',
        label: 'Proactive Alerts',
        title: 'Never Miss a Critical Update Again',
        description: 'Get notified the instant a claim needs attention — before delays compound into lost revenue or missed deadlines.',
        mockup: (
            <div className="eyn-mockup eyn-mockup-analytics">
                <div className="eyn-mockup-header">
                    <span className="eyn-dot red" /><span className="eyn-dot yellow" /><span className="eyn-dot green" />
                    <span className="eyn-mockup-title">Revenue Overview</span>
                </div>
                <div className="eyn-analytics-stats">
                    <div className="eyn-stat-card">
                        <span className="eyn-stat-value">$284K</span>
                        <span className="eyn-stat-label">Total Collected</span>
                        <span className="eyn-stat-delta positive">+18% vs last month</span>
                    </div>
                    <div className="eyn-stat-card">
                        <span className="eyn-stat-value">47</span>
                        <span className="eyn-stat-label">Open Claims</span>
                        <span className="eyn-stat-delta negative">−3 this week</span>
                    </div>
                </div>
                <div className="eyn-bar-chart">
                    {[40, 65, 50, 80, 70, 90, 75].map((h, i) => (
                        <div key={i} className="eyn-bar-col">
                            <div className="eyn-bar-fill" style={{ height: `${h}%` }} />
                        </div>
                    ))}
                </div>
            </div>
        ),
    },
    {
        id: 'integrations',
        label: 'Seamless Integrations',
        title: 'Plugs Into What You Already Use',
        description: 'Connects with Xactimate, Salesforce, QuickBooks, DocuSign, Outlook, and Zapier. Zero workflow disruption. No new systems to learn.',
        mockup: (
            <div className="eyn-mockup eyn-mockup-integrations">
                <div className="eyn-mockup-header">
                    <span className="eyn-dot red" /><span className="eyn-dot yellow" /><span className="eyn-dot green" />
                    <span className="eyn-mockup-title">Integrations</span>
                </div>
                <div className="eyn-integrations-body">
                    <div className="eyn-integration-hub">
                        <span className="eyn-hub-label">EstiPay</span>
                    </div>
                    <div className="eyn-integration-spokes">
                        {[
                            { name: 'Xactimate', color: '#2563eb' },
                            { name: 'Salesforce', color: '#00a1e0' },
                            { name: 'QuickBooks', color: '#2ca01c' },
                            { name: 'DocuSign', color: '#f5a623' },
                            { name: 'Outlook', color: '#0078d4' },
                            { name: 'Zapier', color: '#ff4a00' },
                        ].map((app, i) => (
                            <div key={i} className="eyn-spoke-app" style={{ '--spoke-color': app.color }}>
                                <span>{app.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        ),
    },
];

const EverythingYouNeed = () => {
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
        <section id="everything-you-need" ref={sectionRef} className={`eyn-section${visible ? ' eyn-visible' : ''}`}>
            <div className="container">
                <div className="eyn-header">
                    <span className="eyn-badge">Platform Features</span>
                    <h2 className="eyn-title">
                        Everything You Need to <span className="eyn-green">Stop Chasing Carriers</span>
                    </h2>
                    <p className="eyn-subtitle">
                        Purpose-built tools to automate every step of your claims communication — from first outbound call to final status update.
                    </p>
                </div>

                <div className="eyn-cards">
                    {features.map((feat, i) => (
                        <div
                            key={feat.id}
                            className="eyn-card"
                            style={{ transitionDelay: `${0.08 + i * 0.1}s` }}
                        >
                            <div className="eyn-mockup-wrap">{feat.mockup}</div>
                            <div className="eyn-card-body">
                                <span className="eyn-feature-label">{feat.label}</span>
                                <h3 className="eyn-card-title">{feat.title}</h3>
                                <p className="eyn-card-desc">{feat.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EverythingYouNeed;

