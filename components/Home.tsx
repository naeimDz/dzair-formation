import React from 'react';
import Stats from './Stats';
import AboutCards from './AboutCards';
import Sectors from './Sectors';
import AudienceSplit from './AudienceSplit';
import FAQ from './FAQ';
import Contact from './Contact';
import AIChat from './AIChat';
import { Journey } from './Journey';
import StickyContact from './StickyContact';
import HeroParallax from './HeroParallax';

const Home: React.FC = () => {
    return (
        <>
            <HeroParallax />
            <Stats />
            <Sectors />
            <Journey />
            <AudienceSplit />
            <AboutCards />
            <FAQ />
            <Contact />
            <AIChat />
            <StickyContact />
        </>
    );
};

export default Home;
