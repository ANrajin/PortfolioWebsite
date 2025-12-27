'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Download } from 'lucide-react';
import { NAVIGATION_ITEMS } from '@portfolio/shared';

const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            // Determine active section
            const sections = NAVIGATION_ITEMS.map(item => item.id);
            for (const section of sections.reverse()) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 150) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (id: string) => {
        setIsMobileMenuOpen(false);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? 'glass shadow-lg py-3'
                    : 'bg-transparent py-6'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <a
                            href="#"
                            className="text-2xl font-bold gradient-text"
                            onClick={(e) => {
                                e.preventDefault();
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                        >
                            &lt;RAJIN /&gt;
                        </a>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-8">
                            {NAVIGATION_ITEMS.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => handleNavClick(item.id)}
                                    className={`text-sm font-medium transition-colors duration-300 ${activeSection === item.id
                                        ? 'text-teal-400'
                                        : 'text-slate-300 hover:text-teal-400'
                                        }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                            {/* Download Resume Button */}
                            <a
                                href="/api/resume"
                                download
                                className="flex items-center gap-2 px-4 py-2 bg-teal-500 hover:bg-teal-400 text-slate-900 font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/25"
                            >
                                <Download size={16} />
                                Resume
                            </a>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden text-slate-300 hover:text-teal-400 transition-colors z-50"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Navigation Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-40 md:hidden">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-slate-950/95 backdrop-blur-lg"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />

                    {/* Menu Content */}
                    <div className="relative z-50 flex flex-col items-center justify-center h-full gap-8 animate-fade-in">
                        {NAVIGATION_ITEMS.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleNavClick(item.id)}
                                className={`text-xl font-medium transition-colors duration-300 ${activeSection === item.id
                                    ? 'text-teal-400'
                                    : 'text-slate-300 hover:text-teal-400'
                                    }`}
                            >
                                {item.label}
                            </button>
                        ))}
                        {/* Download Resume Button - Mobile */}
                        <a
                            href="/api/resume"
                            download
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center gap-2 px-6 py-3 bg-teal-500 hover:bg-teal-400 text-slate-900 font-semibold rounded-lg transition-all duration-300 mt-4"
                        >
                            <Download size={20} />
                            Download Resume
                        </a>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
