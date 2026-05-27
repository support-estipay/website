import React, { useId, useState } from 'react';
import PropTypes from 'prop-types';
import VideoSection from './VideoSection';

const AUDIO_EXT = /\.(mp3|wav|ogg|m4a|aac)(\?.*)?$/i;

/** Snippets use horizontal scroll when count exceeds this (all viewports). */
const SNIPPET_SCROLL_THRESHOLD = 5;
/** Snippets use horizontal scroll on mobile when count is at least this. */
const SNIPPET_MOBILE_SCROLL_MIN = 3;

const schemaTypeForSrc = (src) => (AUDIO_EXT.test(src) ? 'AudioObject' : 'VideoObject');

/** JSON-LD entries for full walkthrough demos (SEO). */
export const buildDemoSchemaEntries = (fullWalkthroughs = []) =>
    fullWalkthroughs
        .filter((demo) => demo?.src)
        .map((demo) => ({
            '@context': 'https://schema.org',
            '@type': schemaTypeForSrc(demo.src),
            name: demo.title,
            ...(demo.description && { description: demo.description }),
            uploadDate: demo.uploadDate ?? '2026-05-20',
            contentUrl: `https://estipay.com${demo.src}`,
        }));

const walkthroughTabLabel = (demo) => demo.tabLabel ?? demo.label ?? demo.title;

const snippetLayoutClass = (count) => {
    if (count >= SNIPPET_SCROLL_THRESHOLD) return 'prod-video-shorts--scroll';
    if (count >= SNIPPET_MOBILE_SCROLL_MIN) return 'prod-video-shorts--grid-mobile-scroll';
    return 'prod-video-shorts--grid';
};

const WalkthroughPlayer = ({ demos }) => {
    const baseId = useId();
    const [activeIndex, setActiveIndex] = useState(0);
    const activeDemo = demos[activeIndex] ?? demos[0];

    if (demos.length === 1) {
        const demo = demos[0];
        return (
            <VideoSection
                src={demo.src}
                title={demo.title}
                isMain
            />
        );
    }

    const tabListId = `${baseId}-walkthrough-tabs`;

    return (
        <div className="prod-demo-walkthrough">
            <div
                className="prod-demo-tabs"
                role="tablist"
                aria-label="Full demo walkthroughs"
                id={tabListId}
            >
                {demos.map((demo, index) => {
                    const tabId = `${baseId}-walkthrough-tab-${index}`;
                    const panelId = `${baseId}-walkthrough-panel`;
                    const isActive = index === activeIndex;

                    return (
                        <button
                            key={demo.src ?? demo.title}
                            type="button"
                            role="tab"
                            id={tabId}
                            className={`prod-demo-tab${isActive ? ' prod-demo-tab--active' : ''}`}
                            aria-selected={isActive}
                            aria-controls={panelId}
                            onClick={() => setActiveIndex(index)}
                        >
                            {walkthroughTabLabel(demo)}
                        </button>
                    );
                })}
            </div>
            <div
                id={`${baseId}-walkthrough-panel`}
                role="tabpanel"
                aria-labelledby={`${baseId}-walkthrough-tab-${activeIndex}`}
                className="prod-demo-walkthrough-panel"
            >
                <VideoSection
                    key={activeDemo.src ?? activeDemo.title}
                    src={activeDemo.src}
                    title={activeDemo.title}
                    isMain
                />
            </div>
        </div>
    );
};

WalkthroughPlayer.propTypes = {
    demos: PropTypes.arrayOf(
        PropTypes.shape({
            src: PropTypes.string,
            title: PropTypes.string.isRequired,
            tabLabel: PropTypes.string,
            label: PropTypes.string,
        }),
    ).isRequired,
};

/**
 * Full demo walkthrough(s) + demo snippets.
 * Multiple walkthroughs use tabs; snippets use a 2-col grid or horizontal scroll when the list grows.
 */
const ProductDemosSection = ({ fullWalkthroughs = [], snippets = [] }) => {
    const hasWalkthroughs = fullWalkthroughs.length > 0;
    const hasSnippets = snippets.length > 0;

    if (!hasWalkthroughs && !hasSnippets) {
        return null;
    }

    const walkthroughLabel =
        fullWalkthroughs.length === 1 ? 'Full Demo Walkthrough' : 'Full Demo Walkthroughs';

    return (
        <>
            {hasWalkthroughs && (
                <div className="prod-demo-walkthrough-block">
                    <p className="prod-video-label">{walkthroughLabel}</p>
                    <WalkthroughPlayer demos={fullWalkthroughs} />
                </div>
            )}

            {hasSnippets && (
                <div
                    className={`prod-demo-snippets${hasWalkthroughs ? ' prod-demo-snippets--spaced' : ''}`}
                >
                    <p className="prod-video-shorts-title">Demo snippets</p>
                    <div className={`prod-video-shorts ${snippetLayoutClass(snippets.length)}`}>
                        {snippets.map((demo) => (
                            <VideoSection
                                key={demo.src ?? demo.title}
                                src={demo.src}
                                title={demo.title}
                                label={demo.label}
                            />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

ProductDemosSection.propTypes = {
    fullWalkthroughs: PropTypes.arrayOf(
        PropTypes.shape({
            src: PropTypes.string,
            title: PropTypes.string.isRequired,
            tabLabel: PropTypes.string,
            description: PropTypes.string,
            uploadDate: PropTypes.string,
        }),
    ),
    snippets: PropTypes.arrayOf(
        PropTypes.shape({
            src: PropTypes.string,
            title: PropTypes.string.isRequired,
            label: PropTypes.string,
        }),
    ),
};

ProductDemosSection.defaultProps = {
    fullWalkthroughs: [],
    snippets: [],
};

export default ProductDemosSection;
