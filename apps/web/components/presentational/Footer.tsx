'use client';

import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-8 px-4 border-t border-slate-800">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-slate-400 text-sm flex items-center gap-1">
                    Built with <Heart size={14} className="text-red-500" /> using Next.js & Tailwind CSS
                </p>
                <p className="text-slate-500 text-sm">
                    © {currentYear} All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
