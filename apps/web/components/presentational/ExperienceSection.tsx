'use client';

import { Calendar, MapPin } from 'lucide-react';
import type { Experience } from '@portfolio/shared';

interface ExperienceSectionProps {
    experiences: Experience[];
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experiences }) => {
    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            year: 'numeric',
        });
    };

    return (
        <section id="experience" className="section">
            <div className="max-w-4xl mx-auto">
                <h2 className="section-title">Professional Experience</h2>

                <div className="mt-12 space-y-0">
                    {experiences.map((exp, index) => (
                        <div key={exp.id} className="timeline-item">
                            <div className="timeline-dot" />

                            <div className="card ml-4">
                                {/* Header */}
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                                    <div>
                                        <h3 className="text-xl font-semibold text-slate-100">
                                            {exp.position}
                                        </h3>
                                        <p className="text-teal-400 font-medium">{exp.company}</p>
                                    </div>
                                    <div className="flex flex-col sm:items-end gap-1 text-sm text-slate-400">
                                        <span className="flex items-center gap-1">
                                            <Calendar size={14} />
                                            {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate!)}
                                        </span>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-slate-300 mb-4 leading-relaxed">
                                    {exp.description}
                                </p>

                                {/* Technologies */}
                                <div className="flex flex-wrap gap-2">
                                    {exp.technologies.map((tech, techIndex) => (
                                        <span
                                            key={techIndex}
                                            className="px-3 py-1 text-xs font-medium bg-teal-500/10 text-teal-400 rounded-full border border-teal-500/20"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ExperienceSection;
