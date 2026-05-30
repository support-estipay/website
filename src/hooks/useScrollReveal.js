import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Observes elements matching `selector` and adds `is-revealed` in view.
 * Re-runs on route change so below-the-fold sections animate once per page.
 */
export function useScrollReveal(selector = '[data-reveal]', options = {}) {
    const { pathname } = useLocation();

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const elements = document.querySelectorAll(selector);
        if (prefersReducedMotion) {
            elements.forEach(el => el.classList.add('is-revealed'));
            return undefined;
        }

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
                threshold: 0.08,
                rootMargin: '0px 0px -32px 0px',
                ...options,
            }
        );

        elements.forEach(el => {
            el.classList.remove('is-revealed');
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, [pathname, selector]);
}
