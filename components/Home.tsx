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

interface HomeProps {
    onNavigate: (page: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
    return (
        <>
            <HeroParallax />
            <Stats />
            <Sectors onNavigate={onNavigate} />
            <Contact onNavigate={onNavigate} />
            <Journey />
            <AudienceSplit />
            <AboutCards />
            <FAQ />
            <AIChat />
            <StickyContact />
        </>
    );
};

export default Home;
