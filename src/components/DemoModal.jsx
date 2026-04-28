import React, { useState, useRef, useEffect } from 'react';
import '../styles/modal.css';

const DemoModal = ({ isOpen, onClose }) => {
    const [isCalling, setIsCalling] = useState(false);
    const audioRef = useRef(null);

    // Prevent scrolling on background when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleCallToggle = () => {
        const newCallingState = !isCalling;
        setIsCalling(newCallingState);

        if (newCallingState && audioRef.current) {
            audioRef.current.play().catch(e => console.log('Audio playback failed: ', e));
        } else if (!newCallingState && audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    };

    const handleClose = () => {
        if (isCalling) {
            handleCallToggle(); // stop if playing
        }
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={handleClose}>
            <div className="modal-container" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Live Demo: AI Caller Interface</h2>
                    <button className="modal-close-btn" onClick={handleClose} aria-label="Close modal">&times;</button>
                </div>

                <div className="modal-body">
                    {/* Left Side: Robot */}
                    <div className="modal-col">
                        <img 
                            src="/assets/estipay_robot_1775579918719.png" 
                            alt="Estipay AI Robot" 
                            className="robot-avatar" 
                        />
                        <div className="robot-label">EstiPay Assistant</div>
                    </div>

                    {/* Middle: Sound Waves */}
                    <div className={`connection-area ${isCalling ? 'is-calling' : ''}`}>
                        <div className="soundwave">
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <div className="bar"></div>
                        </div>
                    </div>

                    {/* Right Side: Insurance Companies */}
                    <div className="modal-col">
                        <div className="companies-grid">
                            <div className="company-box">
                                <img src="/assets/fake_logo_1_1775579933400.png" alt="Umbrella Shield" className="company-logo-img" />
                            </div>
                            <div className="company-box">
                                <img src="/assets/fake_logo_2_1775579951877.png" alt="Peak Assurance" className="company-logo-img" />
                            </div>
                            {/* Re-using same logos for grid effect, could be replaced later */}
                            <div className="company-box" style={{ filter: 'grayscale(0.5)' }}>
                                <img src="/assets/fake_logo_2_1775579951877.png" alt="Liberty" className="company-logo-img" />
                            </div>
                            <div className="company-box" style={{ filter: 'grayscale(0.5)' }}>
                                <img src="/assets/fake_logo_1_1775579933400.png" alt="Global" className="company-logo-img" />
                            </div>
                        </div>
                        <div className="robot-label" style={{ color: '#94a3b8' }}>US Insurance Carriers</div>
                    </div>
                </div>

                <div className="modal-footer">
                    <button 
                        className={`btn-call ${isCalling ? 'end-call' : ''}`}
                        onClick={handleCallToggle}
                    >
                        {isCalling ? (
                            <>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M6 6h12v12H6z"/>
                                </svg>
                                End Call
                            </>
                        ) : (
                            <>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                                </svg>
                                Start Intercept Call
                            </>
                        )}
                    </button>
                    {/* Placeholder Audio Element */}
                    <audio ref={audioRef} src="" preload="auto"></audio>
                </div>
            </div>
        </div>
    );
};

export default DemoModal;
