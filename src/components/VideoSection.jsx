import React from 'react';
import PropTypes from 'prop-types';

/**
 * VideoSection — renders a Cloudflare Stream embed or a styled placeholder.
 *
 * Usage:
 *   Long demo:  <VideoSection streamId={VIDEOS.fullDemo} title="..." isMain />
 *   Short clip: <VideoSection streamId={VIDEOS.short1}   title="..." label="Feature name" />
 *
 * To fill in a video once uploaded to Cloudflare Stream:
 *   1. Go to dash.cloudflare.com → Stream → Upload your video
 *   2. Copy the Video ID (e.g. "ea95132c15732419596388e6")
 *   3. In the page file, replace `null` with the Video ID string
 *   4. Replace YOUR_STREAM_SUBDOMAIN with your Cloudflare account subdomain
 *      (found in Stream dashboard → "Use the Stream player" URL)
 */

const CLOUDFLARE_SUBDOMAIN = 'YOUR_STREAM_SUBDOMAIN'; // e.g. "customer-abc123"

const VideoEmbed = ({ streamId, title }) => (
    <iframe
        src={`https://${CLOUDFLARE_SUBDOMAIN}.cloudflarestream.com/${streamId}/iframe`}
        loading="lazy"
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
        allowFullScreen
        title={title}
        style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
    />
);

VideoEmbed.propTypes = {
    streamId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
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

const VideoSection = ({ streamId, title, isMain, label }) => {
    const wrapClass = isMain ? 'prod-video-main-wrap' : 'prod-video-short-wrap';

    if (!isMain) {
        return (
            <div className="prod-video-short-item">
                <div className={wrapClass}>
                    {streamId
                        ? <VideoEmbed streamId={streamId} title={title} />
                        : <VideoPlaceholder isMain={false} />}
                </div>
                {label && <p className="prod-video-short-label">{label}</p>}
            </div>
        );
    }

    return (
        <div className={wrapClass}>
            {streamId
                ? <VideoEmbed streamId={streamId} title={title} />
                : <VideoPlaceholder isMain />}
        </div>
    );
};

VideoSection.propTypes = {
    streamId: PropTypes.string,
    title: PropTypes.string.isRequired,
    isMain: PropTypes.bool,
    label: PropTypes.string,
};

VideoSection.defaultProps = {
    streamId: null,
    isMain: false,
    label: null,
};

export default VideoSection;
