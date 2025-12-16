'use client';

import { User, MapPin, Briefcase } from 'lucide-react';
import type { PersonalInfo } from '@portfolio/shared';

interface AboutSectionProps {
    info: PersonalInfo;
}

const AboutSection: React.FC<AboutSectionProps> = ({ info }) => {
    return (
        <section id="about" className="section bg-slate-900/50">
            <div className="max-w-6xl mx-auto">
                <h2 className="section-title">About Me</h2>

                <div className="grid md:grid-cols-3 gap-8 mt-12">
                    {/* Profile Image */}
                    <div className="md:col-span-1 flex justify-center md:justify-start">
                        <div className="relative">
                            <div className="w-64 h-64 rounded-2xl overflow-hidden border-4 border-teal-500/30 shadow-2xl shadow-teal-500/20">
                                <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                                    {info.imageUrl ? (
                                        <img
                                            src={info.imageUrl}
                                            alt={info.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <User size={80} className="text-slate-500" />
                                    )}
                                </div>
                            </div>
                            {/* Decorative elements */}
                            <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-teal-500/30 rounded-2xl -z-10" />
                            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-teal-500/10 rounded-2xl -z-10" />
                        </div>
                    </div>

                    {/* Info */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-2xl font-semibold text-slate-100">{info.name}</h3>
                            <div className="flex flex-wrap gap-4 text-slate-400">
                                <span className="flex items-center gap-2">
                                    <Briefcase size={18} className="text-teal-400" />
                                    {info.title}
                                </span>
                                <span className="flex items-center gap-2">
                                    <MapPin size={18} className="text-teal-400" />
                                    Remote / Worldwide
                                </span>
                            </div>
                        </div>

                        {/* Career Objective */}
                        <div className="space-y-4">
                            <h4 className="text-lg font-medium text-teal-400">Career Objective</h4>
                            <p className="text-slate-300 leading-relaxed text-lg">
                                {info.careerObjective}
                            </p>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                            {[
                                { label: 'Years Experience', value: '5+' },
                                { label: 'Projects Completed', value: '30+' },
                                { label: 'Technologies', value: '15+' },
                                { label: 'Happy Clients', value: '20+' },
                            ].map((stat, index) => (
                                <div
                                    key={index}
                                    className="text-center p-4 bg-slate-800/50 rounded-lg border border-slate-700"
                                >
                                    <div className="text-2xl font-bold text-teal-400">{stat.value}</div>
                                    <div className="text-sm text-slate-400 mt-1">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
