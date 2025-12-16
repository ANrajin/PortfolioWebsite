'use client';

import { useState } from 'react';
import { Plus, Pencil, Trash2, X, Save, ExternalLink } from 'lucide-react';
import type { Project } from '@portfolio/shared';

interface ProjectsClientProps {
    initialData: Project[];
}

export default function ProjectsClient({ initialData }: ProjectsClientProps) {
    const [projects, setProjects] = useState(initialData);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<Partial<Project>>({});

    const handleEdit = (project: Project) => {
        setEditingId(project.id);
        setFormData(project);
    };

    const handleAdd = () => {
        const newProject: Project = {
            id: Date.now().toString(),
            title: '',
            description: '',
            technologies: [],
            imageUrl: '',
        };
        setProjects([newProject, ...projects]);
        setEditingId(newProject.id);
        setFormData(newProject);
    };

    const handleSave = () => {
        if (!editingId) return;

        setProjects(projects.map(p =>
            p.id === editingId ? { ...p, ...formData } as Project : p
        ));
        setEditingId(null);
        setFormData({});
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this project?')) {
            setProjects(projects.filter(p => p.id !== id));
        }
    };

    const handleCancel = () => {
        if (formData.title === '') {
            setProjects(projects.filter(p => p.id !== editingId));
        }
        setEditingId(null);
        setFormData({});
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-slate-100">Projects</h2>
                    <p className="text-slate-400 mt-1">Showcase your work.</p>
                </div>
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-slate-900 font-medium rounded-lg hover:bg-teal-400 transition-colors"
                >
                    <Plus size={18} />
                    Add Project
                </button>
            </div>

            <div className="space-y-4">
                {projects.map((project) => (
                    <div key={project.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                        {editingId === project.id ? (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-1">Title</label>
                                    <input
                                        type="text"
                                        value={formData.title || ''}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-1">Description</label>
                                    <textarea
                                        value={formData.description || ''}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        rows={3}
                                        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-1">Link (optional)</label>
                                    <input
                                        type="url"
                                        value={formData.link || ''}
                                        onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                        placeholder="https://github.com/..."
                                        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-1">Technologies (comma-separated)</label>
                                    <input
                                        type="text"
                                        value={formData.technologies?.join(', ') || ''}
                                        onChange={(e) => setFormData({ ...formData, technologies: e.target.value.split(',').map(t => t.trim()).filter(Boolean) })}
                                        placeholder="React, Node.js, PostgreSQL"
                                        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    />
                                </div>

                                <div className="flex justify-end gap-2">
                                    <button
                                        onClick={handleCancel}
                                        className="flex items-center gap-2 px-4 py-2 text-slate-400 hover:text-slate-200 transition-colors"
                                    >
                                        <X size={18} />
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-slate-900 font-medium rounded-lg hover:bg-teal-400 transition-colors"
                                    >
                                        <Save size={18} />
                                        Save
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-lg font-semibold text-slate-100">{project.title}</h3>
                                        {project.link && (
                                            <a
                                                href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-slate-400 hover:text-teal-400"
                                            >
                                                <ExternalLink size={16} />
                                            </a>
                                        )}
                                    </div>
                                    <p className="text-slate-400 mt-1">{project.description}</p>
                                    {project.technologies.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-3">
                                            {project.technologies.map((tech, i) => (
                                                <span key={i} className="px-2 py-1 text-xs bg-teal-500/10 text-teal-400 rounded border border-teal-500/20">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="flex gap-2 ml-4">
                                    <button
                                        onClick={() => handleEdit(project)}
                                        className="p-2 text-slate-400 hover:text-teal-400 hover:bg-slate-800 rounded-lg transition-colors"
                                    >
                                        <Pencil size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(project.id)}
                                        className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
