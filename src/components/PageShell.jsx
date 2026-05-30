import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

/**
 * Shared layout: fixed navbar, animated main content, footer.
 * The key on main triggers a soft fade when the route changes.
 */
const PageShell = ({ children }) => {
    const { pathname } = useLocation();

    return (
        <>
            <Navbar />
            <main key={pathname} className="page-transition-root">
                {children}
            </main>
            <Footer />
        </>
    );
};

export default PageShell;
