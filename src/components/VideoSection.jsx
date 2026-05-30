import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CallRecordingPlayer from './CallRecordingPlayer';

/**
 * VideoSection — plays a local recording from /public (audio or video).
 *
 * Drop files into public/demos/ (.mp3 or .mp4) and list them in each page's PRODUCT_DEMOS config.
 * When `transcript` is provided with an audio src, renders CallRecordingPlayer instead of
 * the native audio element (synchronized transcript + seekable cues).
 */

const AUDIO_EXT = /\.(mp3|wav|ogg|m4a|aac)(\?.*)?$/i;
const VIDEO_EXT = /\.(mp4|webm|mov)(\?.*)?$/i;

export const isAudioSrc = (src) => AUDIO_EXT.test(src);
export const isVideoSrc = (src) => VIDEO_EXT.test(src);
export const isCallRecordingDemo = (demo) =>
    Boolean(demo?.src && isAudioSrc(demo.src) && demo.transcript);

const MediaPlayer = ({
    src,
    title,
    transcript,
    transcriptStart,
    transcriptEnd,
    speakers,
    subtitle,
    chapters,
    variant,
    onMissing,
}) => {
    if (isAudioSrc(src) && transcript) {
        return (
            <CallRecordingPlayer
                key={src}
                src={src}
                title={title}
                transcript={transcript}
                transcriptStart={transcriptStart}
                transcriptEnd={transcriptEnd}
                speakers={speakers}
                subtitle={subtitle}
                chapters={chapters}
                variant={variant}
                onMissing={onMissing}
            />
        );
    }

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
    transcript: PropTypes.string,
    transcriptStart: PropTypes.number,
    transcriptEnd: PropTypes.number,
    speakers: PropTypes.objectOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            role: PropTypes.string.isRequired,
        }),
    ),
    subtitle: PropTypes.string,
    chapters: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            start: PropTypes.number.isRequired,
            end: PropTypes.number.isRequired,
            description: PropTypes.string,
            icon: PropTypes.string,
        }),
    ),
    variant: PropTypes.oneOf(['full', 'compact']),
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

const VideoSection = ({
    src,
    title,
    isMain,
    label,
    transcript,
    transcriptStart,
    transcriptEnd,
    speakers,
    subtitle,
    chapters,
}) => {
    const [missing, setMissing] = useState(false);
    const isCallRecording = isCallRecordingDemo({ src, transcript });
    const playerVariant = isMain ? 'full' : 'compact';
    const displayTitle = !isMain && label ? label : title;

    const audioWrap = src && isAudioSrc(src) && !isCallRecording
        ? (isMain ? ' prod-video-main-wrap--audio' : ' prod-video-short-wrap--audio')
        : '';

    let wrapClass = isMain ? 'prod-video-main-wrap' : 'prod-video-short-wrap';
    wrapClass += audioWrap;

    if (isCallRecording && isMain) {
        wrapClass += ' prod-video-main-wrap--call-recording';
    } else if (isCallRecording && !isMain) {
        wrapClass += ' prod-video-short-wrap--call-recording';
    }

    const hasMedia = src && !missing && (isAudioSrc(src) || isVideoSrc(src));
    const showExternalLabel = label && !isCallRecording;

    const content = hasMedia
        ? (
            <MediaPlayer
                src={src}
                title={displayTitle}
                transcript={transcript}
                transcriptStart={transcriptStart}
                transcriptEnd={transcriptEnd}
                speakers={speakers}
                subtitle={subtitle}
                chapters={chapters}
                variant={playerVariant}
                onMissing={() => setMissing(true)}
            />
        )
        : <VideoPlaceholder isMain={isMain} />;

    if (!isMain) {
        return (
            <div className={`prod-video-short-item${isCallRecording ? ' prod-video-short-item--call' : ''}`}>
                <div className={wrapClass}>{content}</div>
                {showExternalLabel && <p className="prod-video-short-label">{label}</p>}
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
    transcript: PropTypes.string,
    transcriptStart: PropTypes.number,
    transcriptEnd: PropTypes.number,
    speakers: PropTypes.objectOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            role: PropTypes.string.isRequired,
        }),
    ),
    subtitle: PropTypes.string,
    chapters: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            start: PropTypes.number.isRequired,
            end: PropTypes.number.isRequired,
            description: PropTypes.string,
            icon: PropTypes.string,
        }),
    ),
};

VideoSection.defaultProps = {
    src: null,
    isMain: false,
    label: null,
    transcript: null,
    transcriptStart: null,
    transcriptEnd: null,
    speakers: null,
    subtitle: null,
    chapters: null,
};

export default VideoSection;
