import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * VideoSection — plays a local recording from /public (audio or video).
 *
 * Drop files into public/demos/ (.mp3 or .mp4) and set paths in each page's RECORDINGS object.
 * The path extension must match the file (e.g. insurance-agent-full.mp4).
 *
 *   Main:  <VideoSection src={RECORDINGS.fullDemo} title="..." isMain />
 *   Short: <VideoSection src={RECORDINGS.short1}   title="..." label="Feature name" />
 */

const AUDIO_EXT = /\.(mp3|wav|ogg|m4a|aac)(\?.*)?$/i;
const VIDEO_EXT = /\.(mp4|webm|mov)(\?.*)?$/i;

const isAudioSrc = (src) => AUDIO_EXT.test(src);
const isVideoSrc = (src) => VIDEO_EXT.test(src);

const MediaPlayer = ({ src, title, onMissing }) => {
    if (isAudioSrc(src)) {
        return (
            <div className="prod-media-player prod-media-wrap--audio">
                <span className="material-symbols-outlined prod-media-audio-icon" aria-hidden="true">mic</span>
                {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                <audio
                    className="prod-media-audio"
                    src={src}
                    controls
                    preload="metadata"
                    title={title}
                    onError={onMissing}
                >
                    Your browser does not support audio playback.
                </audio>
            </div>
        );
    }

    return (
        /* eslint-disable-next-line jsx-a11y/media-has-caption */
        <video
            className="prod-media-video"
            src={src}
            controls
            playsInline
            preload="metadata"
            title={title}
            onError={onMissing}
        >
            Your browser does not support video playback.
        </video>
    );
};

MediaPlayer.propTypes = {
    src: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    onMissing: PropTypes.func.isRequired,
};

const VideoPlaceholder = ({ isMain }) => (
    <div className="prod-video-placeholder">
        <span className={`material-symbols-outlined prod-video-placeholder-icon${isMain ? '' : ' ms-2x'}`} aria-hidden="true">play_circle</span>
        <p className="prod-video-placeholder-title">Recording coming soon</p>
        <p className="prod-video-placeholder-sub">
            {isMain
                ? 'A full walkthrough demo will be available here. Check back soon or contact us for a live demo.'
                : 'A short feature clip will be available here.'}
        </p>
        <span className="prod-video-placeholder-badge">In Production</span>
    </div>
);

VideoPlaceholder.propTypes = {
    isMain: PropTypes.bool,
};

const VideoSection = ({ src, title, isMain, label }) => {
    const [missing, setMissing] = useState(false);
    const audioWrap = src && isAudioSrc(src)
        ? (isMain ? ' prod-video-main-wrap--audio' : ' prod-video-short-wrap--audio')
        : '';
    const wrapClass = `${isMain ? 'prod-video-main-wrap' : 'prod-video-short-wrap'}${audioWrap}`;
    const hasMedia = src && !missing && (isAudioSrc(src) || isVideoSrc(src));

    const content = hasMedia
        ? <MediaPlayer src={src} title={title} onMissing={() => setMissing(true)} />
        : <VideoPlaceholder isMain={isMain} />;

    if (!isMain) {
        return (
            <div className="prod-video-short-item">
                <div className={wrapClass}>{content}</div>
                {label && <p className="prod-video-short-label">{label}</p>}
            </div>
        );
    }

    return <div className={wrapClass}>{content}</div>;
};

VideoSection.propTypes = {
    src: PropTypes.string,
    title: PropTypes.string.isRequired,
    isMain: PropTypes.bool,
    label: PropTypes.string,
};

VideoSection.defaultProps = {
    src: null,
    isMain: false,
    label: null,
};

export default VideoSection;
