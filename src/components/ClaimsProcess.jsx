import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import '../styles/claims-process-new.css';

// Import images
import followupImg from '../assets/claims-process/endless-followups.png';
import approvalsImg from '../assets/claims-process/delayed-approvals.png';
import communicationImg from '../assets/claims-process/communication-gaps.png';
import manualImg from '../assets/claims-process/manual-documentation.png';

const StepCard = ({ step, index, setActiveStep }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { 
        amount: 0.1, 
        margin: "-20% 0px -50% 0px" // Trigger when the section's top crosses into the upper half of screen
    });

    useEffect(() => {
        if (isInView) {
            setActiveStep(index);
        }
    }, [isInView, index, setActiveStep]);

    return (
        <motion.div 
            ref={ref}
            className="step-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <div className="step-info">
                <h3>{step.title}</h3>
                <p>{step.text}</p>
            </div>
            <motion.div 
                className="step-image-container"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
            >
                <img src={step.image} alt={step.title} />
            </motion.div>
        </motion.div>
    );
};

const ClaimsProcess = () => {
    const [activeStep, setActiveStep] = useState(0);

    const steps = [
        {
            title: 'Endless Phone Tag',
            text: 'Your staff calls the carrier. Gets put on hold. Navigates 5 to 7 IVR menu levels. Finally reaches someone — only to get transferred again. Then repeats it for the next claim. And the next. And the next.',
            image: followupImg,
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    <path d="M14 2s1 0 1 1s-1 1-1 1s-1 0-1-1s1-1 1-1z" opacity="0"/>
                    <path d="M18 4a4 4 0 0 1 4 4" />
                    <path d="M15 1a7 7 0 0 1 7 7" />
                </svg>
            )
        },
        {
            title: 'Zero Visibility Into Claim Status',
            text: 'Approved? Pending? Lost in someone’s queue? You have no way to know without making another call. Manual tracking doesn’t give you answers — it gives you more tasks.',
            image: approvalsImg,
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
                    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
                    <path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
                    <line x1="2" y1="2" x2="22" y2="22"/>
                </svg>
            )
        },
        {
            title: 'Delayed Approvals Destroy Cash Flow',
            text: 'Every day a claim sits without a status update is a day your invoice doesn’t move. Delays compound. Cash flow suffers. And your team has no leverage to fix it faster.',
            image: communicationImg,
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                    <path d="M16 16h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2z" opacity="0"/>
                    <path d="M22 12h-4" />
                    <path d="M6 12H2" />
                    <path d="M12 2v4" />
                    <path d="M12 22v-4" />
                </svg>
            )
        },
        {
            title: 'Your Best People Are Doing Your Lowest-Value Work',
            text: 'Skilled adjusters and operations managers shouldn’t be navigating phone menus for hours. That time belongs on strategy and closing — not carrier hold queues.',
            image: manualImg,
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
            )
        }
    ];

    return (
        <section id="claims-process" className="claims-process-section">
            <div className="container">
                <div className="claims-grid">
                    <div className="claims-left">
                        <motion.div 
                            className="key-tools-badge"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            The Real Cost of Manual Claims
                        </motion.div>
                        
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            Your Team Is Spending Hours Every Week Doing Something <span className="text-green">AI Can Do in Minutes.</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            style={{ marginTop: '20px', color: '#a0a0a0', fontSize: '1.1rem' }}
                        >
                            This isn’t a staffing problem. It’s a workflow problem that compounds every single day.
                        </motion.p>

                        <div className="claims-nav">
                            {steps.map((step, index) => (
                                <div 
                                    key={index} 
                                    className={`nav-item ${activeStep === index ? 'active' : ''}`}
                                    onClick={() => {
                                        const element = document.getElementById(`step-${index}`);
                                        if (element) {
                                            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                        }
                                    }}
                                >
                                    <span className="nav-icon">{step.icon}</span>
                                    <span className="nav-text">{step.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="claims-right">
                        {steps.map((step, index) => (
                            <div id={`step-${index}`} key={index}>
                                <StepCard 
                                    step={step} 
                                    index={index} 
                                    setActiveStep={setActiveStep} 
                                />
                            </div>
                        ))}
                        <div className="step-card" style={{ marginTop: '60px' }}>
                            <div className="step-info">
                                <h3>The EstiPay Solution</h3>
                                <p>
                                    The insurance claims process was built for a world without AI. EstiPay changes that.
                                </p>
                            </div>
                            <motion.div 
                                className="step-image-container"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                            >
                                <img src="/assets/dashboard-light.png" alt="EstiPay Dashboard UI" />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ClaimsProcess;
