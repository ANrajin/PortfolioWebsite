'use client';

import { useState } from 'react';
import { Plus, Pencil, Trash2, X, Save, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import type { Experience } from '@portfolio/shared';
import { createExperience, updateExperience, deleteExperience } from '@/lib/api';

interface ExperiencesClientProps {
    initialData: Experience[];
}

export default function ExperiencesClient({ initialData }: ExperiencesClientProps) {
    const [experiences, setExperiences] = useState(initialData);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<Partial<Experience>>({});
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const handleEdit = (exp: Experience) => {
        setEditingId(exp.id);
        setFormData(exp);
        setMessage(null);
    };

    const handleAdd = () => {
        const newExp: Experience = {
            id: 'new-' + Date.now().toString(),
            company: '',
            position: '',
            startDate: new Date().toISOString().split('T')[0],
            endDate: null,
            current: true,
            description: '',
            technologies: [],
        };
        setExperiences([newExp, ...experiences]);
        setEditingId(newExp.id);
        setFormData(newExp);
        setMessage(null);
    };

    const handleSave = async () => {
        if (!editingId) return;

        setSaving(true);
        setMessage(null);

        try {
            const isNew = editingId.startsWith('new-');
            let savedExp: Experience;

            if (isNew) {
                // Create new experience
                const { id, ...data } = formData as Experience;
                savedExp = await createExperience(data);
            } else {
                // Update existing
                savedExp = await updateExperience(editingId, formData);
            }

            setExperiences(experiences.map(exp =>
                exp.id === editingId ? savedExp : exp
            ));
            setEditingId(null);
            setFormData({});
            setMessage({ type: 'success', text: isNew ? 'Experience created!' : 'Experience updated!' });
        } catch (error) {
            console.error('Error saving:', error);
            setMessage({ type: 'error', text: 'Failed to save. Please try again.' });
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this experience?')) return;

        setSaving(true);
        setMessage(null);

        try {
            if (!id.startsWith('new-')) {
                await deleteExperience(id);
            }
            setExperiences(experiences.filter(exp => exp.id !== id));
            setMessage({ type: 'success', text: 'Experience deleted!' });
        } catch (error) {
            console.error('Error deleting:', error);
            setMessage({ type: 'error', text: 'Failed to delete. Please try again.' });
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        if (editingId?.startsWith('new-')) {
            setExperiences(experiences.filter(exp => exp.id !== editingId));
        }
        setEditingId(null);
        setFormData({});
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-slate-100">Experiences</h2>
                    <p className="text-slate-400 mt-1">Manage your work history.</p>
                </div>
                <button
                    onClick={handleAdd}
                    disabled={saving}
                    className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-slate-900 font-medium rounded-lg hover:bg-teal-400 transition-colors disabled:opacity-50"
                >
                    <Plus size={18} />
                    Add Experience
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
                {experiences.map((exp) => (
                    <div key={exp.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                        {editingId === exp.id ? (
                            /* Edit Form */
                            <div className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-400 mb-1">Company</label>
                                        <input
                                            type="text"
                                            value={formData.company || ''}
                                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-400 mb-1">Position</label>
                                        <input
                                            type="text"
                                            value={formData.position || ''}
                                            onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-400 mb-1">Start Date</label>
                                        <input
                                            type="date"
                                            value={formData.startDate || ''}
                                            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-400 mb-1">End Date</label>
                                        <input
                                            type="date"
                                            value={formData.endDate || ''}
                                            disabled={formData.current}
                                            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-50"
                                        />
                                    </div>
                                    <div className="flex items-end">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={formData.current || false}
                                                onChange={(e) => setFormData({ ...formData, current: e.target.checked, endDate: e.target.checked ? null : formData.endDate })}
                                                className="w-4 h-4 rounded border-slate-600 text-teal-500 focus:ring-teal-500"
                                            />
                                            <span className="text-slate-300">Current Position</span>
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-1">Description</label>
                                    <textarea
                                        value={formData.description || ''}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        rows={4}
                                        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-1">Technologies (comma-separated)</label>
                                    <input
                                        type="text"
                                        value={formData.technologies?.join(', ') || ''}
                                        onChange={(e) => setFormData({ ...formData, technologies: e.target.value.split(',').map(t => t.trim()).filter(Boolean) })}
                                        placeholder="React, Node.js, TypeScript"
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
                            /* Display View */
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-lg font-semibold text-slate-100">{exp.position || 'Untitled'}</h3>
                                        {exp.current && (
                                            <span className="px-2 py-0.5 text-xs bg-teal-500/10 text-teal-400 rounded">Current</span>
                                        )}
                                    </div>
                                    <p className="text-teal-400">{exp.company || 'No company'}</p>
                                    <p className="text-sm text-slate-400 mt-1">
                                        {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                                    </p>
                                    <p className="text-slate-300 mt-2">{exp.description}</p>
                                    {exp.technologies && exp.technologies.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-3">
                                            {exp.technologies.map((tech, i) => (
                                                <span key={i} className="px-2 py-1 text-xs bg-slate-800 text-slate-300 rounded">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="flex gap-2 ml-4">
                                    <button
                                        onClick={() => handleEdit(exp)}
                                        disabled={saving}
                                        className="p-2 text-slate-400 hover:text-teal-400 hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-50"
                                    >
                                        <Pencil size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(exp.id)}
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
