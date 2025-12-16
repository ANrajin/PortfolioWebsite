'use client';

import { GraduationCap, Calendar } from 'lucide-react';
import type { Education } from '@portfolio/shared';

interface EducationSectionProps {
    education: Education[];
}

const EducationSection: React.FC<EducationSectionProps> = ({ education }) => {
    return (
        <section id="education" className="section bg-slate-900/50">
            <div className="max-w-4xl mx-auto">
                <h2 className="section-title">Education</h2>

                <div className="mt-12 grid gap-6">
                    {education.map((edu) => (
                        <div key={edu.id} className="card flex gap-6">
                            {/* Icon */}
                            <div className="flex-shrink-0 w-16 h-16 bg-teal-500/10 rounded-xl flex items-center justify-center">
                                <GraduationCap size={32} className="text-teal-400" />
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                                    <h3 className="text-xl font-semibold text-slate-100">
                                        {edu.degree} in {edu.field}
                                    </h3>
                                    <span className="flex items-center gap-1 text-sm text-slate-400">
                                        <Calendar size={14} />
                                        {edu.startYear} - {edu.current ? 'Present' : edu.endYear}
                                    </span>
                                </div>

                                <p className="text-teal-400 font-medium mb-2">{edu.institution}</p>

                                {edu.description && (
                                    <p className="text-slate-400 text-sm leading-relaxed">
                                        {edu.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EducationSection;
