import React from 'react';

import ClaimsProcess from '../components/ClaimsProcess';
import HowItWorks from '../components/HowItWorks';
import EverythingYouNeed from '../components/EverythingYouNeed';
import BuiltForYourRole from '../components/BuiltForYourRole';
import FAQ from '../components/FAQ';
import CTA from '../components/CTA';
import Hero from '../components/Hero';
import TrustBar from '../components/TrustBar';
import WhyEstiPay from '../components/WhyEstiPay';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <>
            <Hero />
            <TrustBar />
            <main>
                <ClaimsProcess />
                <BuiltForYourRole />
                <HowItWorks />
                <EverythingYouNeed />
                <WhyEstiPay />
                <FAQ />
                <CTA />
            </main>
            <Footer />
        </>
    );
};

export default Home;
