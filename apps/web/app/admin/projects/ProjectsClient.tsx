'use client';

import { useState } from 'react';
import { Plus, Pencil, Trash2, X, Save, ExternalLink, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import type { Project } from '@portfolio/shared';
import { createProject, updateProject, deleteProject } from '@/lib/api';

interface ProjectsClientProps {
    initialData: Project[];
}

export default function ProjectsClient({ initialData }: ProjectsClientProps) {
    const [projects, setProjects] = useState(initialData);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<Partial<Project>>({});
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const handleEdit = (project: Project) => {
        setEditingId(project.id);
        setFormData(project);
        setMessage(null);
    };

    const handleAdd = () => {
        const newProject: Project = {
            id: 'new-' + Date.now().toString(),
            title: '',
            description: '',
            technologies: [],
            imageUrl: '',
        };
        setProjects([newProject, ...projects]);
        setEditingId(newProject.id);
        setFormData(newProject);
        setMessage(null);
    };

    const handleSave = async () => {
        if (!editingId) return;

        setSaving(true);
        setMessage(null);

        try {
            const isNew = editingId.startsWith('new-');
            let savedProject: Project;

            if (isNew) {
                const { id, ...data } = formData as Project;
                savedProject = await createProject(data);
            } else {
                savedProject = await updateProject(editingId, formData);
            }

            setProjects(projects.map(p =>
                p.id === editingId ? savedProject : p
            ));
            setEditingId(null);
            setFormData({});
            setMessage({ type: 'success', text: isNew ? 'Project created!' : 'Project updated!' });
        } catch (error) {
            console.error('Error saving:', error);
            setMessage({ type: 'error', text: 'Failed to save. Please try again.' });
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this project?')) return;

        setSaving(true);
        setMessage(null);

        try {
            if (!id.startsWith('new-')) {
                await deleteProject(id);
            }
            setProjects(projects.filter(p => p.id !== id));
            setMessage({ type: 'success', text: 'Project deleted!' });
        } catch (error) {
            console.error('Error deleting:', error);
            setMessage({ type: 'error', text: 'Failed to delete. Please try again.' });
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        if (editingId?.startsWith('new-')) {
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
                    disabled={saving}
                    className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-slate-900 font-medium rounded-lg hover:bg-teal-400 transition-colors disabled:opacity-50"
                >
                    <Plus size={18} />
                    Add Project
                </button>
            </div>

            {/* Status Message */}
            {message && (
                <div className={`flex items-center gap-2 p-4 rounded-lg mb-4 ${message.type === 'success'
                        ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                        : 'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}>
                    {message.type === 'success' ? <CheckCircle size={18} /> : <XCircle size={18} />}
                    {message.text}
                </div>
            )}

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
                                        disabled={saving}
                                        className="flex items-center gap-2 px-4 py-2 text-slate-400 hover:text-slate-200 transition-colors disabled:opacity-50"
                                    >
                                        <X size={18} />
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        disabled={saving}
                                        className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-slate-900 font-medium rounded-lg hover:bg-teal-400 transition-colors disabled:opacity-50"
                                    >
                                        {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                                        {saving ? 'Saving...' : 'Save'}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-lg font-semibold text-slate-100">{project.title || 'Untitled'}</h3>
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
                                    {project.technologies && project.technologies.length > 0 && (
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
                                        disabled={saving}
                                        className="p-2 text-slate-400 hover:text-teal-400 hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-50"
                                    >
                                        <Pencil size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(project.id)}
                                        disabled={saving}
                                        className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-50"
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
