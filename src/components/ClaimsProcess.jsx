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
            icon: 'phone_callback',
        },
        {
            title: 'Zero Visibility Into Claim Status',
            text: 'Approved? Pending? Lost in someone’s queue? You have no way to know without making another call. Manual tracking doesn’t give you answers — it gives you more tasks.',
            image: approvalsImg,
            icon: 'visibility_off',
        },
        {
            title: 'Delayed Approvals Destroy Cash Flow',
            text: 'Every day a claim sits without a status update is a day your invoice doesn’t move. Delays compound. Cash flow suffers. And your team has no leverage to fix it faster.',
            image: communicationImg,
            icon: 'schedule',
        },
        {
            title: 'Your Best People Are Doing Your Lowest-Value Work',
            text: 'Skilled adjusters and operations managers shouldn’t be navigating phone menus for hours. That time belongs on strategy and closing — not carrier hold queues.',
            image: manualImg,
            icon: 'groups',
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
                                    <span className="nav-icon material-symbols-outlined" aria-hidden="true">{step.icon}</span>
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
