import { useEffect } from 'react';

/**
 * Observes all elements matching `selector` in the document.
 * Adds `is-revealed` class when they enter the viewport.
 * Pair with [data-reveal] CSS in main.css.
 *
 * Usage: call once in a top-level page component (e.g. Home.jsx).
 */
export function useScrollReveal(selector = '[data-reveal]', options = {}) {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-revealed');
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: '0px 0px -48px 0px',
                ...options,
            }
        );

        const elements = document.querySelectorAll(selector);
        elements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, [selector]);
}
