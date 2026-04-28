import React, { useRef, useEffect } from 'react';

const TransparentVideo = ({ src, alt, className }) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (!video || !canvas) return;

        // willReadFrequently optimizes performance for repetitive getImageData calls
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        let animationFrameId;

        const processFrame = () => {
            if (video.paused || video.ended) {
                return;
            }

            if (video.readyState >= 2) { 
                if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                }

                if (canvas.width > 0 && canvas.height > 0) {
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                    
                    const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    const data = frame.data;
                    
                    const tolerance = 45; // Cutoff for compression artifacts in absolute black background
                    const fade = 25;      // Smooth transition to prevent hard jagged edges
                    
                    for (let i = 0; i < data.length; i += 4) {
                        const r = data[i];
                        const g = data[i + 1];
                        const b = data[i + 2];
                        
                        // Calculate brightness value based on max RGB component
                        const maxVal = Math.max(r, g, b);
                        
                        if (maxVal <= tolerance) {
                            // Completely turn the dark background transparent
                            data[i + 3] = 0;
                        } else if (maxVal <= tolerance + fade) {
                            // Smoothly blend the edges of the dark region
                            // alpha goes from 0 to 255 in the fade range
                            const alpha = ((maxVal - tolerance) / fade) * 255;
                            data[i + 3] = alpha;
                        }
                    }
                    
                    ctx.putImageData(frame, 0, 0);
                }
            }
            
            animationFrameId = requestAnimationFrame(processFrame);
        };

        const handlePlay = () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
            processFrame();
        };

        video.addEventListener('play', handlePlay);

        if (!video.paused && !video.ended) {
            handlePlay();
        }

        return () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            video.removeEventListener('play', handlePlay);
        };
    }, []);

    return (
        <div className={className} style={{ position: 'relative', overflow: 'hidden' }}>
            {/* The actual video is hidden but plays in the background */}
            <video
                ref={videoRef}
                src={src}
                autoPlay
                loop
                muted
                playsInline
                style={{ position: 'absolute', width: '0px', height: '0px', opacity: 0 }}
            />
            {/* The canvas displays the transparent video */}
            <canvas
                ref={canvasRef}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                aria-label={alt}
            />
        </div>
    );
};

export default TransparentVideo;
