import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import '../styles/claims-process-new.css';

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
                <div className="step-icon-main">
                    <span className="material-symbols-outlined">{step.icon}</span>
                </div>
                <h3>{step.number} {step.title}</h3>
                <p>{step.text}</p>
            </div>
            {step.image && (
                <motion.div 
                    className="step-image-container"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                >
                    <img src={step.image} alt={step.title} />
                </motion.div>
            )}
        </motion.div>
    );
};

const HowItWorks = () => {
    const [activeStep, setActiveStep] = useState(0);

    const steps = [
        {
            number: '01.',
            title: 'Enter Claim Details',
            icon: 'description',
            text: 'Input the claim number and policy information. EstiPay takes it from there.',
            image: '/assets/dashboard-light.png'
        },
        {
            number: '02.',
            title: 'AI Initiates the Outbound Call',
            icon: 'smart_toy',
            text: 'Your AI agent automatically dials the insurance provider. No human needed to start the process.',
            image: '/assets/robot-wave.png'
        },
        {
            number: '03.',
            title: 'Navigates Every IVR Menu',
            icon: 'account_tree',
            text: 'EstiPay intelligently selects the right menu paths — no wrong departments, no repeated transfers, no wasted time.',
            image: '/assets/ai_calling_interface.png'
        },
        {
            number: '04.',
            title: 'Speaks to the Human Agent When Needed',
            icon: 'headset_mic',
            text: 'When a live agent is required, EstiPay handles the conversation naturally — verifying details, asking the right questions, and moving the call forward.',
            image: '/assets/audio_wave_new1.png'
        },
        {
            number: '05.',
            title: 'Returns Structured Claim Status',
            icon: 'trending_up',
            text: 'Claim status, next steps, and supporting documentation are returned to your dashboard automatically — clean, organized, and ready to act on.',
            image: '/assets/dashboard-light.png'
        }
    ];

    return (
        <section id="how-it-works" className="claims-process-section dark-theme">
            <div className="container">
                <div className="claims-grid">
                    <div className="claims-left">
                        <motion.div 
                            className="key-tools-badge"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            How It Works
                        </motion.div>
                        
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            Five Steps. Fully Automated. <span className="text-green">Zero Hold Time.</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            style={{ marginTop: '20px', color: 'var(--md-on-surface-variant)', fontSize: '1.1rem' }}
                        >
                            From claim input to structured status output — EstiPay handles the entire process without your team picking up the phone.
                        </motion.p>

                        <div className="claims-nav">
                            {steps.map((step, index) => (
                                <div 
                                    key={index} 
                                    className={`nav-item ${activeStep === index ? 'active' : ''}`}
                                    onClick={() => {
                                        const element = document.getElementById(`hiw-step-${index}`);
                                        if (element) {
                                            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                        }
                                    }}
                                >
                    <div className="nav-icon">
                        <span className="material-symbols-outlined">{step.icon}</span>
                    </div>
                                    {step.title}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="claims-right">
                        {steps.map((step, index) => (
                            <div id={`hiw-step-${index}`} key={index}>
                                <StepCard 
                                    step={step} 
                                    index={index} 
                                    setActiveStep={setActiveStep} 
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
