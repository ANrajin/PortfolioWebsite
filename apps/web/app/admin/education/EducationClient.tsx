'use client';

import { Plus, Pencil, Trash2, X, Save, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import type { Education } from '@portfolio/shared';
import { useEducationForm } from '@/features/education';

interface EducationClientProps {
    initialData: Education[];
}

export default function EducationClient({ initialData }: EducationClientProps) {
    const {
        education,
        editingId,
        formData,
        saving,
        message,
        handleAdd,
        handleEdit,
        handleSave,
        handleDelete,
        handleCancel,
        updateField,
        setFormData,
    } = useEducationForm(initialData);

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-slate-100">Education</h2>
                    <p className="text-slate-400 mt-1">Manage your academic background.</p>
                </div>
                <button
                    onClick={handleAdd}
                    disabled={saving}
                    className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-slate-900 font-medium rounded-lg hover:bg-teal-400 transition-colors disabled:opacity-50"
                >
                    <Plus size={18} />
                    Add Education
                </button>
            </div>

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
                {education.map((edu) => (
                    <div key={edu.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                        {editingId === edu.id ? (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-1">Institution</label>
                                    <input
                                        type="text"
                                        value={formData.institution || ''}
                                        onChange={(e) => updateField('institution', e.target.value)}
                                        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-400 mb-1">Degree</label>
                                        <input
                                            type="text"
                                            value={formData.degree || ''}
                                            onChange={(e) => updateField('degree', e.target.value)}
                                            placeholder="Bachelor of Science"
                                            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-400 mb-1">Field of Study</label>
                                        <input
                                            type="text"
                                            value={formData.field || ''}
                                            onChange={(e) => updateField('field', e.target.value)}
                                            placeholder="Computer Science"
                                            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-400 mb-1">Start Year</label>
                                        <input
                                            type="number"
                                            value={formData.startYear || ''}
                                            onChange={(e) => updateField('startYear', parseInt(e.target.value))}
                                            min={1950}
                                            max={2100}
                                            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-400 mb-1">End Year</label>
                                        <input
                                            type="number"
                                            value={formData.endYear || ''}
                                            disabled={formData.current}
                                            onChange={(e) => updateField('endYear', parseInt(e.target.value))}
                                            min={1950}
                                            max={2100}
                                            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-50"
                                        />
                                    </div>
                                    <div className="flex items-end">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={formData.current || false}
                                                onChange={(e) => setFormData({ ...formData, current: e.target.checked, endYear: e.target.checked ? null : formData.endYear })}
                                                className="w-4 h-4 rounded border-slate-600 text-teal-500 focus:ring-teal-500"
                                            />
                                            <span className="text-slate-300">Currently Enrolled</span>
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-1">Description (optional)</label>
                                    <textarea
                                        value={formData.description || ''}
                                        onChange={(e) => updateField('description', e.target.value)}
                                        rows={3}
                                        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
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
                                        onClick={() => handleSave()}
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
                                        <h3 className="text-lg font-semibold text-slate-100">
                                            {edu.degree ? `${edu.degree} in ${edu.field}` : 'Untitled'}
                                        </h3>
                                        {edu.current && (
                                            <span className="px-2 py-0.5 text-xs bg-teal-500/10 text-teal-400 rounded">Current</span>
                                        )}
                                    </div>
                                    <p className="text-teal-400">{edu.institution || 'No institution'}</p>
                                    <p className="text-sm text-slate-400 mt-1">
                                        {edu.startYear} — {edu.current ? 'Present' : edu.endYear}
                                    </p>
                                    {edu.description && (
                                        <p className="text-slate-300 mt-2">{edu.description}</p>
                                    )}
                                </div>
                                <div className="flex gap-2 ml-4">
                                    <button
                                        onClick={() => handleEdit(edu)}
                                        disabled={saving}
                                        className="p-2 text-slate-400 hover:text-teal-400 hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-50"
                                    >
                                        <Pencil size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(edu.id)}
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
