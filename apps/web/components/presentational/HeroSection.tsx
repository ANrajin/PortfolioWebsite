'use client';

import { useEffect, useState, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';
import SocialLinks from './SocialLinks';

import type { SocialLink } from '@portfolio/shared';

interface HeroSectionProps {
    name: string;
    title: string;
    tagline: string;
    socialLinks?: SocialLink[];
}

const HeroSection: React.FC<HeroSectionProps> = ({ name, title, tagline, socialLinks }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    const phrases = useMemo(() => [
        'Building scalable applications',
        'Crafting elegant solutions',
        'Turning ideas into reality',
        'Writing clean code',
    ], []);

    useEffect(() => {
        const currentPhrase = phrases[currentPhraseIndex];
        const typingSpeed = isDeleting ? 30 : 80;

        const timeout = setTimeout(() => {
            if (!isDeleting) {
                if (displayedText.length < currentPhrase.length) {
                    setDisplayedText(currentPhrase.slice(0, displayedText.length + 1));
                } else {
                    setTimeout(() => setIsDeleting(true), 2000);
                }
            } else {
                if (displayedText.length > 0) {
                    setDisplayedText(displayedText.slice(0, -1));
                } else {
                    setIsDeleting(false);
                    setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
                }
            }
        }, typingSpeed);

        return () => clearTimeout(timeout);
    }, [displayedText, isDeleting, currentPhraseIndex, phrases]);

    const scrollToAbout = () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center px-4">
            {/* Content */}
            <div className="relative z-10 text-center max-w-4xl mx-auto">
                {/* Greeting */}
                <p className="text-teal-400 text-lg md:text-xl mb-4 animate-fade-in">
                    Hello, I&apos;m
                </p>

                {/* Name */}
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-100 mb-4 animate-slide-up">
                    {name}
                </h1>

                {/* Title */}
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-slate-300 mb-6 animate-slide-up">
                    {title}
                </h2>

                {/* Typing Animation */}
                <div className="h-8 mb-8">
                    <p className="text-lg md:text-xl text-teal-300 font-mono">
                        {displayedText}
                        <span className="animate-pulse">|</span>
                    </p>
                </div>

                {/* Tagline */}
                <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-8 animate-fade-in">
                    {tagline}
                </p>

                {/* Social Links */}
                <div className="mb-12 animate-fade-in">
                    <SocialLinks links={socialLinks} />
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
                    <a href="#contact" className="btn-primary">
                        Get In Touch
                    </a>
                    <a href="#projects" className="btn-outline">
                        View My Work
                    </a>
                </div>
            </div>

            {/* Scroll Indicator */}
            <button
                onClick={scrollToAbout}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-400 hover:text-teal-400 transition-colors animate-bounce"
            >
                <ChevronDown size={32} />
            </button>
        </section>
    );
};

export default HeroSection;
