import React, { useEffect, useState } from 'react';

/*
 * ── Ring config ────────────────────────────────────────────
 * Each ring renders one concentric circle in the spiral.
 * - r:            radius in the 1200x1200 viewBox (center at 600,600)
 * - rotate:       static rotation of the dash starting point, in degrees.
 *                 Different rotations make the rings look "swirled" rather
 *                 than perfectly concentric.
 * - strokeWidth:  pixel width of the ring
 * - color:        stroke color — EstiPay brand palette only
 *                   GREEN  #009b6c  (logo C-mark)
 *                   BLUE   #125e92  (logo wordmark)
 *                   ORANGE #f48027  (logo swoosh accent)
 * The full-circumference draw-in is computed at render time so the ring
 * traces from a single starting point all the way around.
 */
const RINGS = [
    { r: 70,  rotate:   0, strokeWidth: 1.8, color: 'rgba(0, 155, 108, 0.65)' },  // green
    { r: 145, rotate:  22, strokeWidth: 1.8, color: 'rgba(18, 94, 146, 0.55)' },  // blue
    { r: 230, rotate: -18, strokeWidth: 1.5, color: 'rgba(0, 155, 108, 0.48)' },  // green
    { r: 320, rotate:  35, strokeWidth: 1.5, color: 'rgba(18, 94, 146, 0.40)' },  // blue
    { r: 415, rotate: -28, strokeWidth: 1.5, color: 'rgba(244, 128, 39, 0.42)' }, // orange — single accent ring (mirrors the logo swoosh)
    { r: 510, rotate:  48, strokeWidth: 1.5, color: 'rgba(0, 155, 108, 0.30)' },  // green
    { r: 605, rotate: -38, strokeWidth: 1.5, color: 'rgba(18, 94, 146, 0.24)' },  // blue
    { r: 705, rotate:  58, strokeWidth: 1.5, color: 'rgba(0, 155, 108, 0.18)' },  // green
];

const PageLoader = () => {
    /* phase: 'show' → 'fade' → 'done' (unmounted) */
    const [phase, setPhase] = useState('show');

    useEffect(() => {
        const fadeTimer   = setTimeout(() => setPhase('fade'), 2200);
        const removeTimer = setTimeout(() => setPhase('done'), 3100);
        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(removeTimer);
        };
    }, []);

    if (phase === 'done') return null;

    return (
        <div
            className={`page-loader${phase === 'fade' ? ' page-loader--fade' : ''}`}
            aria-hidden="true"
        >
            <svg
                className="loader-svg"
                viewBox="0 0 1200 1200"
                preserveAspectRatio="xMidYMid meet"
            >
                <defs>
                    <filter id="loader-blur" x="-10%" y="-10%" width="120%" height="120%">
                        <feGaussianBlur stdDeviation="3.5" />
                    </filter>
                </defs>

                <g filter="url(#loader-blur)">
                    {RINGS.map((ring, i) => {
                        const circumference = 2 * Math.PI * ring.r;
                        return (
                            <g
                                key={ring.r}
                                style={{
                                    transformOrigin: '600px 600px',
                                    transformBox: 'view-box',
                                    transform: `rotate(${ring.rotate}deg)`,
                                }}
                            >
                                <circle
                                    className="loader-ring"
                                    cx="600"
                                    cy="600"
                                    r={ring.r}
                                    stroke={ring.color}
                                    strokeWidth={ring.strokeWidth}
                                    fill="none"
                                    strokeDasharray={circumference}
                                    strokeLinecap="round"
                                    style={{
                                        '--ring-circ': circumference,
                                        animationDelay: `${0.15 + i * 0.1}s`,
                                    }}
                                />
                            </g>
                        );
                    })}
                </g>
            </svg>

            <div className="loader-content">
                <img
                    src="/assets/logoF.png"
                    alt="EstiPay"
                    className="loader-logo"
                />
            </div>
        </div>
    );
};

export default PageLoader;
