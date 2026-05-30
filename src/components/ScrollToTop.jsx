import { useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  useLayoutEffect(() => {
    if (hash) return;
    window.scrollTo(0, 0);
    document.documentElement.removeAttribute('data-navbar-scrolled');
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
