'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    User,
    Briefcase,
    Code2,
    FolderGit2,
    GraduationCap,
    Award,
    FileText,
    LayoutDashboard
} from 'lucide-react';

const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/information', label: 'Information', icon: User },
    { href: '/admin/experiences', label: 'Experiences', icon: Briefcase },
    { href: '/admin/skills', label: 'Skills', icon: Code2 },
    { href: '/admin/projects', label: 'Projects', icon: FolderGit2 },
    { href: '/admin/education', label: 'Education', icon: GraduationCap },
    { href: '/admin/certifications', label: 'Certifications', icon: Award },
    { href: '/admin/articles', label: 'Articles', icon: FileText },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-slate-900 border-r border-slate-800 min-h-screen p-4">
            {/* Logo */}
            <div className="mb-8">
                <Link href="/admin" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
                        <Code2 size={18} className="text-slate-900" />
                    </div>
                    <span className="text-lg font-bold text-slate-100">Portfolio</span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="space-y-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href ||
                        (item.href !== '/admin' && pathname.startsWith(item.href));
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive
                                ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20'
                                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                                }`}
                        >
                            <Icon size={18} />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            {/* View Site Link */}
            <div className="mt-8 pt-4 border-t border-slate-800">
                <a
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 text-sm text-slate-400 hover:text-teal-400 transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    View Site
                </a>
            </div>
        </aside>
    );
}
