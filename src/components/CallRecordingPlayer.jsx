import React, {
    useCallback,
    useEffect,
    useId,
    useRef,
    useState,
} from 'react';
import PropTypes from 'prop-types';
import { useDemoAudio } from '../context/DemoAudioContext';
import CallRecordingWaveSurfer from './CallRecordingWaveSurfer';
import {
    cueInChapter,
    findActiveChapterIndex,
    findActiveCueIndex,
    findFirstCueIndexInRange,
    formatTime,
    INSURANCE_AGENT_SPEAKERS,
    parseTranscriptJson,
} from '../utils/parseTranscript';

const MOBILE_MQ = '(max-width: 640px)';

function defaultTranscriptOpen(variant) {
    if (variant === 'compact') return false;
    if (typeof window === 'undefined') return true;
    return !window.matchMedia(MOBILE_MQ).matches;
}

const chapterPropType = PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
    description: PropTypes.string,
    icon: PropTypes.string,
});

const CallRecordingPlayer = ({
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
    const audioRef = useRef(null);
    const wavesurferRef = useRef(null);
    const transcriptRef = useRef(null);
    const lineRefs = useRef([]);
    const playerId = useId();
    const baseId = useId();
    const demoAudio = useDemoAudio();

    const isCompact = variant === 'compact';

    const [cues, setCues] = useState([]);
    const [transcriptError, setTranscriptError] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [transcriptOpen, setTranscriptOpen] = useState(() => defaultTranscriptOpen(variant));
    const [waveformReady, setWaveformReady] = useState(false);

    const speakerMap = speakers ?? INSURANCE_AGENT_SPEAKERS;
    const activeIndex = findActiveCueIndex(cues, currentTime);
    const activeChapterIndex = !isCompact && chapters?.length
        ? findActiveChapterIndex(chapters, currentTime)
        : -1;
    const activeChapter = activeChapterIndex >= 0 ? chapters[activeChapterIndex] : null;
    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
    const chaptersListId = `${baseId}-chapters`;

    const pauseSelf = useCallback(() => {
        if (isCompact) {
            audioRef.current?.pause();
        } else {
            wavesurferRef.current?.pause();
        }
    }, [isCompact]);

    useEffect(() => {
        if (!demoAudio) return undefined;
        return demoAudio.register(playerId, pauseSelf);
    }, [demoAudio, pauseSelf, playerId]);

    useEffect(() => {
        if (!transcript) return undefined;

        let cancelled = false;
        const options = {
            start: transcriptStart ?? 0,
            end: transcriptEnd ?? Infinity,
            offsetTimestamps: transcriptStart != null || transcriptEnd != null,
        };

        fetch(transcript)
            .then((res) => {
                if (!res.ok) throw new Error('Transcript not found');
                return res.json();
            })
            .then((data) => {
                if (cancelled) return;
                setCues(parseTranscriptJson(data, speakerMap, options));
            })
            .catch(() => {
                if (!cancelled) setTranscriptError(true);
            });

        return () => {
            cancelled = true;
        };
    }, [transcript, speakerMap, transcriptStart, transcriptEnd]);

    useEffect(() => {
        if (isCompact) return undefined;

        const mq = window.matchMedia(MOBILE_MQ);
        const syncOpen = () => setTranscriptOpen(!mq.matches);
        syncOpen();
        mq.addEventListener('change', syncOpen);
        return () => mq.removeEventListener('change', syncOpen);
    }, [isCompact]);

    useEffect(() => {
        if (activeIndex < 0 || !transcriptOpen || !isPlaying) return;
        const el = lineRefs.current[activeIndex];
        const container = transcriptRef.current;
        if (!el || !container) return;

        const lineTop = el.offsetTop;
        const lineBottom = lineTop + el.offsetHeight;
        const viewTop = container.scrollTop;
        const viewBottom = viewTop + container.clientHeight;

        if (lineTop < viewTop || lineBottom > viewBottom) {
            el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
    }, [activeIndex, transcriptOpen, isPlaying]);

    const playFrom = useCallback(() => {
        if (isCompact) {
            const audio = audioRef.current;
            if (!audio) return;
            demoAudio?.notifyPlay(playerId);
            audio.play().catch(() => {});
            return;
        }

        const ws = wavesurferRef.current;
        if (!ws || ws.isPlaying()) return;
        demoAudio?.notifyPlay(playerId);
        ws.play().catch(() => {});
    }, [demoAudio, isCompact, playerId]);

    const seekTo = useCallback((time) => {
        if (isCompact) {
            const audio = audioRef.current;
            if (!audio) return;
            audio.currentTime = time;
            setCurrentTime(time);
            return;
        }

        const ws = wavesurferRef.current;
        if (!ws) return;
        ws.setTime(time);
        setCurrentTime(time);
    }, [isCompact]);

    const togglePlay = useCallback(() => {
        if (isCompact) {
            const audio = audioRef.current;
            if (!audio) return;

            if (audio.paused) {
                demoAudio?.notifyPlay(playerId);
                audio.play().catch(() => {});
            } else {
                audio.pause();
            }
            return;
        }

        const ws = wavesurferRef.current;
        if (!ws) return;

        if (!ws.isPlaying()) {
            demoAudio?.notifyPlay(playerId);
        }
        ws.playPause();
    }, [demoAudio, isCompact, playerId]);

    const handleProgressChange = useCallback((e) => {
        seekTo(Number(e.target.value));
    }, [seekTo]);

    const handleWaveSurferReady = useCallback((ws) => {
        wavesurferRef.current = ws;
        setWaveformReady(true);
        setDuration(ws.getDuration());
        setCurrentTime(ws.getCurrentTime());
    }, []);

    const handleWaveSurferTimeUpdate = useCallback((time) => {
        setCurrentTime(time);
    }, []);

    const handleWaveSurferPlay = useCallback(() => {
        setIsPlaying(true);
    }, []);

    const handleWaveSurferPause = useCallback(() => {
        setIsPlaying(false);
    }, []);

    const handleWaveSurferFinish = useCallback(() => {
        setIsPlaying(false);
    }, []);

    const handleWaveSurferError = useCallback(() => {
        setWaveformReady(false);
        onMissing();
    }, [onMissing]);

    const scrollToCueIndex = useCallback((index) => {
        const el = lineRefs.current[index];
        const container = transcriptRef.current;
        if (!el || !container) return;

        const lineTop = el.offsetTop;
        const lineBottom = lineTop + el.offsetHeight;
        const viewTop = container.scrollTop;
        const viewBottom = viewTop + container.clientHeight;

        if (lineTop < viewTop || lineBottom > viewBottom) {
            el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
    }, []);

    const handleChapterClick = useCallback((chapter) => {
        seekTo(chapter.start);
        setTranscriptOpen(true);

        const firstCueIndex = findFirstCueIndexInRange(cues, chapter.start, chapter.end);
        if (firstCueIndex >= 0) {
            requestAnimationFrame(() => scrollToCueIndex(firstCueIndex));
        }

        playFrom();
    }, [cues, playFrom, scrollToCueIndex, seekTo]);

    const transcriptToggleLabel = transcriptOpen ? 'Hide transcript' : 'View transcript';

    const renderChapters = () => {
        if (isCompact || !chapters?.length) return null;

        return (
            <div className="call-recording__chapters">
                <p className="call-recording__chapters-label" id={chaptersListId}>
                    Key moments in this call
                </p>
                <div
                    className="call-recording__chapters-list"
                    role="group"
                    aria-labelledby={chaptersListId}
                >
                    {chapters.map((chapter, index) => {
                        const isActive = index === activeChapterIndex;
                        const rangeLabel = `${formatTime(chapter.start)} – ${formatTime(chapter.end)}`;

                        return (
                            <button
                                key={chapter.id}
                                type="button"
                                className={`call-recording__chapter-chip${isActive ? ' call-recording__chapter-chip--active' : ''}`}
                                aria-current={isActive ? 'true' : undefined}
                                aria-label={`${chapter.label}, ${rangeLabel}${chapter.description ? `. ${chapter.description}` : ''}`}
                                onClick={() => handleChapterClick(chapter)}
                            >
                                {chapter.icon && (
                                    <span className="material-symbols-outlined call-recording__chapter-icon" aria-hidden="true">
                                        {chapter.icon}
                                    </span>
                                )}
                                <span className="call-recording__chapter-text">
                                    <span className="call-recording__chapter-name">{chapter.label}</span>
                                    <span className="call-recording__chapter-range" aria-hidden="true">
                                        {rangeLabel}
                                    </span>
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    };

    const renderCompactControls = () => (
        <div className="call-recording__controls">
            <button
                type="button"
                className="call-recording__play-btn"
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause' : 'Play'}
            >
                <span className="material-symbols-outlined" aria-hidden="true">
                    {isPlaying ? 'pause' : 'play_arrow'}
                </span>
            </button>

            <div className="call-recording__progress-wrap">
                <input
                    type="range"
                    className="call-recording__progress"
                    min={0}
                    max={duration || 0}
                    step={0.1}
                    value={currentTime}
                    onChange={handleProgressChange}
                    aria-label="Seek"
                    aria-valuemin={0}
                    aria-valuemax={duration}
                    aria-valuenow={currentTime}
                    aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`}
                    style={{ '--progress': `${progress}%` }}
                />
                <span className="call-recording__time" aria-hidden="true">
                    {formatTime(currentTime)} / {formatTime(duration)}
                </span>
            </div>
        </div>
    );

    const renderFullTransport = () => (
        <div className="call-recording__transport">
            <button
                type="button"
                className="call-recording__play-btn call-recording__play-btn--inline"
                onClick={togglePlay}
                disabled={!waveformReady}
                aria-label={isPlaying ? 'Pause' : 'Play'}
            >
                <span className="material-symbols-outlined" aria-hidden="true">
                    {isPlaying ? 'pause' : 'play_arrow'}
                </span>
            </button>

            <div className="call-recording__waveform-slot">
                <CallRecordingWaveSurfer
                    src={src}
                    onReady={handleWaveSurferReady}
                    onTimeUpdate={handleWaveSurferTimeUpdate}
                    onPlay={handleWaveSurferPlay}
                    onPause={handleWaveSurferPause}
                    onFinish={handleWaveSurferFinish}
                    onError={handleWaveSurferError}
                />
            </div>

            <span
                className="call-recording__time-live"
                aria-live="polite"
                aria-atomic="true"
                aria-label={
                    duration > 0
                        ? `${formatTime(currentTime)} elapsed of ${formatTime(duration)}`
                        : formatTime(currentTime)
                }
            >
                {formatTime(currentTime)}
            </span>
        </div>
    );

    const renderTranscript = () => (
        <div className="call-recording__transcript-section">
            <button
                type="button"
                className="call-recording__transcript-toggle"
                aria-expanded={transcriptOpen}
                aria-controls={`${baseId}-transcript`}
                onClick={() => setTranscriptOpen((open) => !open)}
            >
                <span>{transcriptToggleLabel}</span>
                <span className="material-symbols-outlined" aria-hidden="true">
                    {transcriptOpen ? 'expand_less' : 'expand_more'}
                </span>
            </button>

            {transcriptOpen && (
                <div
                    id={`${baseId}-transcript`}
                    className="call-recording__transcript"
                    ref={transcriptRef}
                    role="region"
                    aria-label="Synchronized call transcript"
                >
                    {transcriptError && (
                        <p className="call-recording__transcript-error">
                            Transcript could not be loaded.
                        </p>
                    )}
                    {!transcriptError && cues.length === 0 && (
                        <p className="call-recording__transcript-loading">Loading transcript…</p>
                    )}
                    {cues.map((cue, index) => {
                        const isActive = index === activeIndex;
                        const inActiveChapter = activeChapter && cueInChapter(cue, activeChapter);
                        const dimOutsideChapter = activeChapter && !inActiveChapter;
                        const lineId = `${baseId}-line-${index}`;

                        let lineClass = 'call-recording__line';
                        if (isActive) lineClass += ' call-recording__line--active';
                        if (inActiveChapter) lineClass += ' call-recording__line--in-chapter';
                        if (dimOutsideChapter) lineClass += ' call-recording__line--outside-chapter';

                        return (
                            <button
                                key={lineId}
                                id={lineId}
                                type="button"
                                ref={(el) => { lineRefs.current[index] = el; }}
                                className={lineClass}
                                onClick={() => seekTo(cue.start)}
                                aria-current={isActive ? 'true' : undefined}
                                aria-label={`${cue.speakerLabel} at ${formatTime(cue.start)}: ${cue.text}`}
                            >
                                <span className="call-recording__timestamp" aria-hidden="true">
                                    {isActive && (
                                        <span className="call-recording__now-playing" aria-hidden="true" />
                                    )}
                                    {formatTime(cue.start)}
                                </span>
                                <span
                                    className={`call-recording__speaker call-recording__speaker--${cue.speakerRole}`}
                                    aria-hidden="true"
                                >
                                    {cue.speakerLabel}
                                </span>
                                <span className="call-recording__text">{cue.text}</span>
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );

    return (
        <div className={`call-recording${isCompact ? ' call-recording--compact' : ' call-recording--wavesurfer'}`}>
            {isCompact && (
                <audio
                    ref={audioRef}
                    src={src}
                    preload="metadata"
                    onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
                    onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onEnded={() => setIsPlaying(false)}
                    onError={onMissing}
                />
            )}

            {!isCompact && (
                <div className="call-recording__header">
                    <div className="call-recording__header-text">
                        <p className="call-recording__eyebrow">Real carrier call</p>
                        <h3 className="call-recording__title">{title}</h3>
                        {subtitle && <p className="call-recording__subtitle">{subtitle}</p>}
                    </div>
                    {duration > 0 && (
                        <span className="call-recording__duration-badge" aria-label={`Duration ${formatTime(duration)}`}>
                            <span className="material-symbols-outlined" aria-hidden="true">headphones</span>
                            {formatTime(duration)}
                        </span>
                    )}
                </div>
            )}

            <div className="call-recording__player" aria-label={`Audio player: ${title}`}>
                {isCompact && (
                    <div className="call-recording__compact-head">
                        <h4 className="call-recording__compact-title">{title}</h4>
                        {duration > 0 && (
                            <span className="call-recording__compact-duration">{formatTime(duration)}</span>
                        )}
                    </div>
                )}

                {isCompact ? renderCompactControls() : renderFullTransport()}
            </div>

            {renderChapters()}
            {renderTranscript()}
        </div>
    );
};

CallRecordingPlayer.propTypes = {
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
    chapters: PropTypes.arrayOf(chapterPropType),
    variant: PropTypes.oneOf(['full', 'compact']),
    onMissing: PropTypes.func,
};

CallRecordingPlayer.defaultProps = {
    transcript: null,
    transcriptStart: null,
    transcriptEnd: null,
    speakers: null,
    subtitle: null,
    chapters: null,
    variant: 'full',
    onMissing: () => {},
};

export default CallRecordingPlayer;
