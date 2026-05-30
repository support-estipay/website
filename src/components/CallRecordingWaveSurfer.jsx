import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useWavesurfer } from '@wavesurfer/react';

export const WAVE_HEIGHT = 92;

const CallRecordingWaveSurfer = ({
    src,
    onReady,
    onTimeUpdate,
    onPlay,
    onPause,
    onFinish,
    onError,
}) => {
    const containerRef = useRef(null);

    const { wavesurfer } = useWavesurfer({
        container: containerRef,
        url: src,
        height: WAVE_HEIGHT,
        waveColor: 'rgba(0, 70, 110, 0.22)',
        progressColor: 'rgba(0, 155, 108, 0.72)',
        cursorColor: '#007a56',
        cursorWidth: 2,
        barWidth: 3,
        barGap: 2,
        barRadius: 3,
        normalize: true,
        interact: true,
        hideScrollbar: true,
    });

    useEffect(() => {
        if (!wavesurfer) return undefined;

        const subscriptions = [
            wavesurfer.on('ready', () => {
                onReady(wavesurfer);
            }),
            wavesurfer.on('timeupdate', (time) => {
                onTimeUpdate(time);
            }),
            wavesurfer.on('play', () => {
                onPlay();
            }),
            wavesurfer.on('pause', () => {
                onPause();
            }),
            wavesurfer.on('finish', () => {
                onFinish();
            }),
            wavesurfer.on('error', () => {
                onError();
            }),
        ];

        return () => {
            subscriptions.forEach((unsub) => unsub());
        };
    }, [wavesurfer, onReady, onTimeUpdate, onPlay, onPause, onFinish, onError]);

    return (
        <div
            className="call-recording__wavesurfer"
            ref={containerRef}
            aria-hidden="true"
        />
    );
};

CallRecordingWaveSurfer.propTypes = {
    src: PropTypes.string.isRequired,
    onReady: PropTypes.func.isRequired,
    onTimeUpdate: PropTypes.func.isRequired,
    onPlay: PropTypes.func.isRequired,
    onPause: PropTypes.func.isRequired,
    onFinish: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
};

export default CallRecordingWaveSurfer;
