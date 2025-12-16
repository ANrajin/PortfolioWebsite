'use client';

import { ExternalLink } from 'lucide-react';
import type { Project } from '@portfolio/shared';

interface ProjectsSectionProps {
    projects: Project[];
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
    return (
        <section id="projects" className="section">
            <div className="max-w-4xl mx-auto">
                <h2 className="section-title">Featured Projects</h2>

                <div className="mt-12 grid gap-4">
                    {projects.map((project) => (
                        <div key={project.id} className="card group">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                                {/* Project Info */}
                                <div className="flex-1 space-y-3">
                                    <div className="flex items-start gap-3">
                                        <h3 className="text-lg font-semibold text-slate-100 group-hover:text-teal-400 transition-colors">
                                            {project.title}
                                        </h3>
                                        {project.link && (
                                            <a
                                                href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-slate-400 hover:text-teal-400 transition-colors flex-shrink-0 mt-1"
                                                aria-label={`View ${project.title} project`}
                                            >
                                                <ExternalLink size={16} />
                                            </a>
                                        )}
                                    </div>

                                    <p className="text-slate-400 text-sm leading-relaxed">
                                        {project.description}
                                    </p>

                                    {/* Technologies */}
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.map((tech, index) => (
                                            <span
                                                key={index}
                                                className="px-2 py-1 text-xs font-medium bg-teal-500/10 text-teal-400 rounded border border-teal-500/20"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectsSection;
