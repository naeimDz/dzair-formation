import React from 'react';
import { Link } from 'react-router-dom';
import { X, LucideIcon } from 'lucide-react';

interface NavLink {
    path: string;
    label: string;
    icon: LucideIcon;
}

interface NavbarMobileProps {
    isMobileMenuOpen: boolean;
    setIsMobileMenuOpen: (isOpen: boolean) => void;
    navLinks: NavLink[];
    isActive: (path: string) => boolean;
    handleNavClick: () => void;
}

const NavbarMobile: React.FC<NavbarMobileProps> = ({
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    navLinks,
    isActive,
    handleNavClick,
}) => {
    return (
        <>
            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${isMobileMenuOpen
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
                    }`}
                onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Menu Drawer */}
            <div
                className={`fixed top-0 right-0 z-50 h-full w-72 bg-industrial-dark border-l border-white/10 shadow-2xl transform transition-transform duration-300 ease-out md:hidden ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
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
                            const active = isActive(link.path);
                            return (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={handleNavClick}
                                    className={`flex items-center gap-3 px-4 py-3 transition-colors ${active
                                        ? "bg-industrial-yellow/10 text-industrial-yellow border-r-4 border-industrial-yellow"
                                        : "text-gray-300 hover:bg-white/5 hover:text-white"
                                        }`}
                                >
                                    <Icon size={20} />
                                    <span className="font-medium">{link.label}</span>
                                </Link>
                            );
                        })}
                        <div className="my-4 border-t border-white/10" />
                        <Link
                            to="/contact"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="bg-industrial-yellow text-industrial-dark px-4 py-3 font-bold text-center hover:bg-yellow-400 transition-colors rounded-sm"
                        >
                            سجل الآن
                        </Link>
                    </div>

                    <div className="mt-auto text-center text-gray-500 text-sm">
                        <p>© 2025 Dzair Formation</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NavbarMobile;