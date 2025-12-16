import {
    User,
    Briefcase,
    Code2,
    FolderGit2,
    GraduationCap,
    FileText
} from 'lucide-react';
import Link from 'next/link';
import { dummyData } from '@/data/dummy';

const stats = [
    {
        label: 'Experiences',
        count: dummyData.experiences.length,
        icon: Briefcase,
        href: '/admin/experiences',
        color: 'bg-blue-500/10 text-blue-400 border-blue-500/20'
    },
    {
        label: 'Skills',
        count: dummyData.skills.length,
        icon: Code2,
        href: '/admin/skills',
        color: 'bg-green-500/10 text-green-400 border-green-500/20'
    },
    {
        label: 'Projects',
        count: dummyData.projects.length,
        icon: FolderGit2,
        href: '/admin/projects',
        color: 'bg-purple-500/10 text-purple-400 border-purple-500/20'
    },
    {
        label: 'Education',
        count: dummyData.education.length,
        icon: GraduationCap,
        href: '/admin/education',
        color: 'bg-orange-500/10 text-orange-400 border-orange-500/20'
    },
    {
        label: 'Articles',
        count: dummyData.articles.length,
        icon: FileText,
        href: '/admin/articles',
        color: 'bg-rose-500/10 text-rose-400 border-rose-500/20'
    },
];

export default function AdminDashboard() {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-100">Welcome back!</h2>
                <p className="text-slate-400 mt-1">Manage your portfolio content from here.</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <Link
                            key={stat.label}
                            href={stat.href}
                            className={`p-4 rounded-xl border ${stat.color} hover:scale-105 transition-transform`}
                        >
                            <Icon size={24} className="mb-2" />
                            <p className="text-2xl font-bold">{stat.count}</p>
                            <p className="text-sm opacity-70">{stat.label}</p>
                        </Link>
                    );
                })}
            </div>

            {/* Quick Actions */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-slate-100 mb-4">Quick Actions</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                    <Link
                        href="/admin/information"
                        className="flex items-center gap-3 p-4 bg-slate-800/50 hover:bg-slate-800 rounded-lg transition-colors"
                    >
                        <User size={20} className="text-teal-400" />
                        <div>
                            <p className="font-medium text-slate-200">Edit Profile</p>
                            <p className="text-sm text-slate-400">Update your personal info</p>
                        </div>
                    </Link>
                    <Link
                        href="/admin/projects"
                        className="flex items-center gap-3 p-4 bg-slate-800/50 hover:bg-slate-800 rounded-lg transition-colors"
                    >
                        <FolderGit2 size={20} className="text-teal-400" />
                        <div>
                            <p className="font-medium text-slate-200">Add Project</p>
                            <p className="text-sm text-slate-400">Showcase your latest work</p>
                        </div>
                    </Link>
                    <Link
                        href="/admin/experiences"
                        className="flex items-center gap-3 p-4 bg-slate-800/50 hover:bg-slate-800 rounded-lg transition-colors"
                    >
                        <Briefcase size={20} className="text-teal-400" />
                        <div>
                            <p className="font-medium text-slate-200">Add Experience</p>
                            <p className="text-sm text-slate-400">Update your work history</p>
                        </div>
                    </Link>
                    <Link
                        href="/admin/articles"
                        className="flex items-center gap-3 p-4 bg-slate-800/50 hover:bg-slate-800 rounded-lg transition-colors"
                    >
                        <FileText size={20} className="text-teal-400" />
                        <div>
                            <p className="font-medium text-slate-200">Add Article</p>
                            <p className="text-sm text-slate-400">Share your latest post</p>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Profile Preview */}
            <div className="mt-6 bg-slate-900 border border-slate-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-slate-100 mb-4">Profile Overview</h3>
                <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-2xl font-bold text-slate-900">
                        {dummyData.personalInfo.name.charAt(0)}
                    </div>
                    <div>
                        <h4 className="text-xl font-semibold text-slate-100">{dummyData.personalInfo.name}</h4>
                        <p className="text-teal-400">{dummyData.personalInfo.title}</p>
                        <p className="text-slate-400 text-sm mt-2">{dummyData.personalInfo.email}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
