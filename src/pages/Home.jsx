import React from 'react';

import Hero            from '../components/Hero';
import TrustBar        from '../components/TrustBar';
import StatsCounter    from '../components/StatsCounter';
import ClaimsProcess   from '../components/ClaimsProcess';
import ProductShowcase from '../components/ProductShowcase';
import BuiltForYourRole from '../components/BuiltForYourRole';
import HowItWorks      from '../components/HowItWorks';
import EverythingYouNeed from '../components/EverythingYouNeed';
import WhyEstiPay      from '../components/WhyEstiPay';
import Testimonials    from '../components/Testimonials';
import FAQ             from '../components/FAQ';
import CTA             from '../components/CTA';
import Footer          from '../components/Footer';
import { useScrollReveal } from '../hooks/useScrollReveal';

const Home = () => {
    // Activate scroll-reveal for all [data-reveal] elements on this page
    useScrollReveal();

    return (
        <>
            <Hero />
            <TrustBar />
            <main>
                <StatsCounter />
                <ClaimsProcess />
                <ProductShowcase />
                <BuiltForYourRole />
                <HowItWorks />
                <EverythingYouNeed />
                <WhyEstiPay />
                <Testimonials />
                <FAQ />
                <CTA />
            </main>
            <Footer />
        </>
    );
};

export default Home;
