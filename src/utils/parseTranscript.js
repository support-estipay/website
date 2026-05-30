/** Default speaker labels for the Allstate insurance-agent demo transcript. */
export const INSURANCE_AGENT_SPEAKERS = {
    speaker_0: { label: 'Allstate IVR', role: 'ivr' },
    speaker_1: { label: 'Carrier Rep', role: 'rep' },
    speaker_2: { label: 'EstiPay Agent', role: 'agent' },
};

/**
 * @typedef {object} TranscriptSliceOptions
 * @property {number} [start] Include cues after this time (seconds).
 * @property {number} [end] Include cues before this time (seconds).
 * @property {boolean} [offsetTimestamps] Shift cue times to zero for standalone clips.
 */

/**
 * Convert ElevenLabs-style transcript JSON into seekable cue lines.
 * @param {{ segments?: Array<{ text: string, words: Array }> }} data
 * @param {Record<string, { label: string, role: string }>} speakerMap
 * @param {TranscriptSliceOptions} [options]
 */
export function parseTranscriptJson(
    data,
    speakerMap = INSURANCE_AGENT_SPEAKERS,
    options = {},
) {
    if (!data?.segments?.length) return [];

    const {
        start = 0,
        end = Infinity,
        offsetTimestamps = false,
    } = options;

    const cues = data.segments
        .map((seg) => {
            const words = seg.words.filter(
                (w) => w.type === 'word' || w.type === 'audio_event',
            );
            if (!words.length) return null;

            const speakerId = words[0].speaker_id;
            const meta = speakerMap[speakerId] ?? { label: speakerId, role: 'unknown' };

            return {
                start: words[0].start,
                end: words[words.length - 1].end,
                speakerId,
                speakerLabel: meta.label,
                speakerRole: meta.role,
                text: seg.text.trim(),
            };
        })
        .filter(Boolean)
        .filter((cue) => cue.end > start && cue.start < end)
        .map((cue) => {
            if (!offsetTimestamps && start === 0 && end === Infinity) {
                return cue;
            }

            const clippedStart = Math.max(cue.start, start);
            const clippedEnd = Math.min(cue.end, end);
            const shift = offsetTimestamps ? start : 0;

            return {
                ...cue,
                start: clippedStart - shift,
                end: clippedEnd - shift,
            };
        });

    return cues;
}

/**
 * Index of the chapter active at `time` (seconds).
 * @param {Array<{ start: number, end: number }>} chapters
 */
export function findActiveChapterIndex(chapters, time) {
    if (!chapters?.length || !Number.isFinite(time)) return -1;

    for (let i = chapters.length - 1; i >= 0; i--) {
        const chapter = chapters[i];
        const isLast = i === chapters.length - 1;
        if (time >= chapter.start && (isLast ? time <= chapter.end : time < chapter.end)) {
            return i;
        }
    }
    return -1;
}

/** Whether a cue's start time falls within a chapter range. */
export function cueInChapter(cue, chapter) {
    if (!cue || !chapter) return false;
    return cue.start >= chapter.start && cue.start < chapter.end;
}

/** First cue index whose start is inside [start, end). */
export function findFirstCueIndexInRange(cues, start, end) {
    if (!cues?.length) return -1;
    return cues.findIndex((cue) => cue.start >= start && cue.start < end);
}

/** Index of the cue line active at `time` (seconds). */
export function findActiveCueIndex(cues, time) {
    if (!cues.length) return -1;
    for (let i = cues.length - 1; i >= 0; i--) {
        if (time >= cues[i].start) return i;
    }
    return 0;
}

/** Format seconds as M:SS */
export function formatTime(seconds) {
    if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
    const total = Math.floor(seconds);
    const m = Math.floor(total / 60);
    const s = total % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
}
