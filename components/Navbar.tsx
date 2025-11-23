import React, { useState, useEffect } from 'react';
import { Menu, X, Home, Calendar, Wrench } from 'lucide-react';
import logo from '../assets/images/logo-text.png';

interface NavbarProps {
    onNavigate: (view: string) => void;
    currentView: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentView }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { id: 'home', label: 'الرئيسية', icon: Home },
        { id: 'schedule', label: 'برنامج الدورات', icon: Calendar },
        { id: 'machines', label: 'الآلات', icon: Wrench },
    ];

    const handleNavClick = (view: string) => {
        onNavigate(view);
        setIsMobileMenuOpen(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? 'bg-industrial-dark/90 backdrop-blur-md border-b border-white/10 py-2 shadow-lg'
                    : 'bg-industrial-dark md:bg-transparent py-4'
                    }`}
            >
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex items-center justify-between flex-row-reverse">
                        {/* Logo */}
                        <div
                            className="cursor-pointer flex items-center"
                            onClick={() => handleNavClick('home')}
                        >
                            <img
                                src={logo}
                                alt="Dzair Formation"
                                className={`transition-all duration-300 ${isScrolled ? 'h-12 md:h-16' : 'h-16 md:h-32'}`}
                            />
                        </div >

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-1 space-x-reverse">
                            {
                                navLinks.map((link) => {
                                    const Icon = link.icon;
                                    const isActive = currentView === link.id;
                                    return (
                                        <button
                                            key={link.id}
                                            onClick={() => handleNavClick(link.id)}
                                            className={`relative px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 group ${isActive
                                                ? 'text-industrial-yellow bg-white/5 font-bold'
                                                : 'text-gray-300 hover:text-white hover:bg-white/5'
                                                }`}
                                        >
                                            <Icon size={18} className={isActive ? 'text-industrial-yellow' : 'text-gray-400 group-hover:text-white'} />
                                            <span>{link.label}</span>
                                            {isActive && (
                                                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-industrial-yellow rounded-full mx-4" />
                                            )}
                                        </button>
                                    );
                                })
                            }

                            {/* CTA Button */}
                            <div className="flex items-center gap-4 mr-4">
                                <div className="hidden lg:flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 animate-fade-up">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                    </span>
                                    <span className="text-sm font-semibold tracking-wide text-emerald-400">
                                        التسجيلات مفتوحة لدورة جانفي 2026
                                    </span>
                                </div>

                                <button
                                    onClick={() => {
                                        const contactSection = document.getElementById('contact');
                                        if (contactSection) {
                                            contactSection.scrollIntoView({ behavior: 'smooth' });
                                        } else {
                                            handleNavClick('home');
                                            setTimeout(() => {
                                                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                                            }, 100);
                                        }
                                    }}
                                    className="bg-industrial-yellow text-industrial-dark px-5 py-2 rounded-lg font-bold hover:bg-yellow-400 transition-colors shadow-[0_0_15px_rgba(250,204,21,0.3)] hover:shadow-[0_0_25px_rgba(250,204,21,0.5)]"
                                >
                                    سجل الآن
                                </button>
                            </div>
                        </div >

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button >
                    </div >
                </div >
            </nav >

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Menu Drawer */}
            <div
                className={`fixed top-0 right-0 z-50 h-full w-64 bg-industrial-dark border-l border-white/10 shadow-2xl transform transition-transform duration-300 ease-out md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="p-6 flex flex-col h-full">
                    <div className="flex justify-between items-center mb-8">
                        <span className="text-xl font-bold text-white">القائمة</span>
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-gray-400 hover:text-white"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    <div className="flex flex-col space-y-2">
                        {navLinks.map((link) => {
                            const Icon = link.icon;
                            const isActive = currentView === link.id;
                            return (
                                <button
                                    key={link.id}
                                    onClick={() => handleNavClick(link.id)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                        ? 'bg-industrial-yellow/10 text-industrial-yellow border-r-4 border-industrial-yellow'
                                        : 'text-gray-300 hover:bg-white/5 hover:text-white'
                                        }`}
                                >
                                    <Icon size={20} />
                                    <span className="font-medium">{link.label}</span>
                                </button>
                            );
                        })}

                        <div className="my-4 border-t border-white/10" />

                        <button
                            onClick={() => {
                                setIsMobileMenuOpen(false);
                                const contactSection = document.getElementById('contact');
                                if (contactSection) {
                                    contactSection.scrollIntoView({ behavior: 'smooth' });
                                } else {
                                    handleNavClick('home');
                                    setTimeout(() => {
                                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                                    }, 100);
                                }
                            }}
                            className="bg-industrial-yellow text-industrial-dark px-4 py-3 rounded-lg font-bold text-center hover:bg-yellow-400 transition-colors"
                        >
                            سجل الآن
                        </button>
                    </div>

                    <div className="mt-auto text-center text-gray-500 text-sm">
                        <p>© 2025 Dzair Formation</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
