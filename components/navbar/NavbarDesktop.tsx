import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface NavLink {
    path: string;
    label: string;
    icon: LucideIcon;
}

interface NavbarDesktopProps {
    navLinks: NavLink[];
    isActive: (path: string) => boolean;
    handleNavClick: () => void;
}

const NavbarDesktop: React.FC<NavbarDesktopProps> = ({ navLinks, isActive, handleNavClick }) => {
    return (
        <div className="hidden md:flex items-center space-x-1 space-x-reverse">
            {navLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.path);
                return (
                    <Link
                        key={link.path}
                        to={link.path}
                        onClick={handleNavClick}
                        className={`relative px-4 py-2 flex items-center gap-2 transition-all duration-300 group ${active
                            ? 'text-industrial-yellow bg-white/5 font-bold'
                            : 'text-gray-300 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        <Icon size={18} className={active ? 'text-industrial-yellow' : 'text-gray-400 group-hover:text-white'} />
                        <span>{link.label}</span>
                        {active && (
                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-industrial-yellow mx-4" />
                        )}
                    </Link>
                );
            })}

            {/* CTA Button */}
            <div className="flex items-center gap-4 mr-4">
                <div className="hidden lg:flex items-center gap-2 bg-white/5 px-3 py-1.5 border border-white/10 animate-fade-up">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-sm font-semibold tracking-wide text-emerald-400">
                        التسجيلات مفتوحة لدورة جانفي 2026
                    </span>
                </div>

                <Link
                    to="/contact"
                    onClick={handleNavClick}
                    className="bg-white/10 text-white px-5 py-2 font-bold hover:bg-white/20 transition-colors border border-white/10"
                >
                    اتصل بنا
                </Link>
            </div>
        </div>
    );
};

export default NavbarDesktop;
