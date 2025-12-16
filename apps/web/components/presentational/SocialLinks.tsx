'use client';

import { Github, Linkedin, Code, Terminal } from 'lucide-react';
import type { SocialLink } from '@portfolio/shared';

interface SocialLinksProps {
    links?: SocialLink[];
    size?: 'sm' | 'md' | 'lg';
}

const defaultLinks: SocialLink[] = [
    { id: '1', platform: 'linkedin', url: 'https://linkedin.com/in/johndoe', label: 'LinkedIn' },
    { id: '2', platform: 'github', url: 'https://github.com/johndoe', label: 'GitHub' },
    { id: '3', platform: 'codeforces', url: 'https://codeforces.com/profile/johndoe', label: 'Codeforces' },
    { id: '4', platform: 'leetcode', url: 'https://leetcode.com/johndoe', label: 'LeetCode' },
];

const iconMap = {
    linkedin: Linkedin,
    github: Github,
    codeforces: Code,
    leetcode: Terminal,
};

const sizeMap = {
    sm: 18,
    md: 24,
    lg: 28,
};

const SocialLinks: React.FC<SocialLinksProps> = ({ links = defaultLinks, size = 'md' }) => {
    return (
        <div className="flex items-center justify-center gap-4">
            {links.map((link) => {
                const Icon = iconMap[link.platform];
                const iconSize = sizeMap[size];

                return (
                    <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-400 hover:text-teal-400 hover:border-teal-500/50 hover:bg-slate-800 transition-all duration-300"
                        aria-label={link.label}
                    >
                        <Icon size={iconSize} />
                    </a>
                );
            })}
        </div>
    );
};

export default SocialLinks;
