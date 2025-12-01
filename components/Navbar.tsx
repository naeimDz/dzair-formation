import React, { useState, useEffect } from 'react';
import { Home, Calendar, Wrench, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
//import logo from '../assets/logo-tight.svg';
import logo from '../assets/images/fiinale-finale2.png';
import NavbarDesktop from './navbar/NavbarDesktop';
import NavbarMobile from './navbar/NavbarMobile';

const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { path: '/', label: 'الرئيسية', icon: Home },
        { path: '/schedule', label: 'برنامج الدورات', icon: Calendar },
        { path: '/machines', label: 'الآلات', icon: Wrench },
    ];

    const isActive = (path: string) => {
        if (path === '/' && location.pathname !== '/') return false;
        return location.pathname.startsWith(path);
    };

    const handleNavClick = () => {
        setIsMobileMenuOpen(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-industrial-dark/95 backdrop-blur-md border-b border-white/10 py-2 shadow-lg'
                : 'bg-industrial-dark md:bg-transparent py-4'
                }`}
        >
            <div className="container mx-auto px-4 md:px-6">

                {/* --- DESKTOP VIEW (Hidden on Mobile) --- */}
                <div className="hidden md:flex items-center justify-between flex-row-reverse">
                    <Link to="/" onClick={handleNavClick}>
                        <img
                            src={logo}
                            alt="Dzair Formation"
                            className={`transition-all duration-300 ${isScrolled ? 'h-16' : 'h-32'}`}
                        />
                    </Link>
                    <NavbarDesktop
                        navLinks={navLinks}
                        isActive={isActive}
                        handleNavClick={handleNavClick}
                    />
                </div>

                {/* --- MOBILE VIEW (Relative container with absolute centered logo) --- */}
                <div className="md:hidden relative flex items-center justify-between w-full min-h-[48px]">

                    {/* LEFT: Action Button */}
                    <div className="flex justify-start z-10">
                        <Link
                            to="/contact"
                            onClick={handleNavClick}
                            className="bg-industrial-yellow text-industrial-dark 
                            px-4 py-2 font-bold rounded-sm shadow-lg text-sm
                            flex items-center justify-center whitespace-nowrap"
                        >
                            سجل الآن
                        </Link>
                    </div>

                    {/* CENTER: Logo (Absolutely positioned in true center - 20% larger) */}
                    <div className="absolute left-1/2 -translate-x-1/2 pointer-events-none">
                        <Link to="/" onClick={handleNavClick} className="pointer-events-auto block">
                            <img
                                src={logo}
                                alt="Dzair Formation"
                                className={`object-contain transition-all duration-300 ${isScrolled ? 'h-12' : 'h-[58px]'
                                    }`}
                            />
                        </Link>
                    </div>

                    {/* RIGHT: Hamburger Menu */}
                    <div className="flex justify-end z-10">
                        <button
                            className="text-industrial-yellow px-3 py-2 transition-colors outline-none bg-industrial-yellow/10 rounded-sm"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Menu"
                        >
                            {isMobileMenuOpen ? (
                                <X size={32} className="text-industrial-yellow" strokeWidth={2.5} />
                            ) : (
                                <svg
                                    width="60"
                                    height="26"
                                    viewBox="0 0 60 26"
                                    fill="none"
                                    stroke="#E3B627"
                                    strokeWidth="3.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <line x1="2" y1="3" x2="58" y2="3" />
                                    <line x1="2" y1="13" x2="58" y2="13" />
                                    <line x1="2" y1="23" x2="58" y2="23" />
                                </svg>
                            )}
                        </button>
                    </div>

                </div>

                {/* Mobile Drawer Component */}
                <NavbarMobile
                    isMobileMenuOpen={isMobileMenuOpen}
                    setIsMobileMenuOpen={setIsMobileMenuOpen}
                    navLinks={navLinks}
                    isActive={isActive}
                    handleNavClick={handleNavClick}
                />
            </div>
        </nav>
    );
};

export default Navbar;