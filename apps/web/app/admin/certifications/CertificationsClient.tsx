'use client';

import { useState, useRef } from 'react';
import { Plus, Pencil, Trash2, X, Save, ExternalLink, CheckCircle, XCircle, Loader2, Upload, FileText, Image as ImageIcon } from 'lucide-react';
import type { Certification } from '@portfolio/shared';
import { createCertification, updateCertification, deleteCertification, uploadCertificateMedia } from '@/lib/api';

interface CertificationsClientProps {
    initialData: Certification[];
}

// Client component for managing certifications
export default function CertificationsClient({ initialData }: CertificationsClientProps) {
    const [certifications, setCertifications] = useState(initialData);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<Partial<Certification>>({});
    const [skillsInput, setSkillsInput] = useState('');
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleEdit = (cert: Certification) => {
        setEditingId(cert.id);
        setFormData(cert);
        setSkillsInput(cert.skills?.join(', ') || '');
        setMessage(null);
    };

    const handleAdd = () => {
        const newCert: Certification = {
            id: 'new-' + Date.now().toString(),
            name: '',
            organization: '',
            issueDate: new Date().toISOString().split('T')[0],
            expirationDate: null,
            credentialId: '',
            credentialUrl: '',
            skills: [],
            mediaUrl: '',
            mediaType: undefined,
        };
        setCertifications([newCert, ...certifications]);
        setEditingId(newCert.id);
        setFormData(newCert);
        setSkillsInput('');
        setMessage(null);
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const result = await uploadCertificateMedia(file);
            setFormData({
                ...formData,
                mediaUrl: result.mediaUrl,
                mediaType: result.mediaType as 'pdf' | 'image',
            });
        } catch (error) {
            console.error('Upload error:', error);
            setMessage({ type: 'error', text: 'Failed to upload file' });
        } finally {
            setUploading(false);
        }
    };

    const handleSave = async () => {
        if (!editingId) return;

        setSaving(true);
        setMessage(null);

        try {
            const isNew = editingId.startsWith('new-');
            const skills = skillsInput.split(',').map(s => s.trim()).filter(Boolean);
            let savedCert: Certification;

            if (isNew) {
                const { id, ...data } = formData as Certification;
                savedCert = await createCertification({ ...data, skills });
            } else {
                savedCert = await updateCertification(editingId, { ...formData, skills });
            }

            setCertifications(certifications.map(c =>
                c.id === editingId ? savedCert : c
            ));
            setEditingId(null);
            setFormData({});
            setSkillsInput('');
            setMessage({ type: 'success', text: isNew ? 'Certification created!' : 'Certification updated!' });
        } catch (error) {
            console.error('Error saving:', error);
            setMessage({ type: 'error', text: 'Failed to save. Please try again.' });
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this certification?')) return;

        setSaving(true);
        setMessage(null);

        try {
            if (!id.startsWith('new-')) {
                await deleteCertification(id);
            }
            setCertifications(certifications.filter(c => c.id !== id));
            setMessage({ type: 'success', text: 'Certification deleted!' });
        } catch (error) {
            console.error('Error deleting:', error);
            setMessage({ type: 'error', text: 'Failed to delete. Please try again.' });
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        if (editingId?.startsWith('new-')) {
            setCertifications(certifications.filter(c => c.id !== editingId));
        }
        setEditingId(null);
        setFormData({});
        setSkillsInput('');
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-slate-100">Certifications</h2>
                    <p className="text-slate-400 mt-1">Manage your licenses and certifications.</p>
                </div>
                <button
                    onClick={handleAdd}
                    disabled={saving}
                    className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-slate-900 font-medium rounded-lg hover:bg-teal-400 transition-colors disabled:opacity-50"
                >
                    <Plus size={18} />
                    Add Certification
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
                {certifications.map((cert) => (
                    <div key={cert.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                        {editingId === cert.id ? (
                            <div className="space-y-4">
                                {/* Name and Organization */}
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-400 mb-1">Name *</label>
                                        <input
                                            type="text"
                                            value={formData.name || ''}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                            placeholder="AWS Solutions Architect"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-400 mb-1">Issuing Organization *</label>
                                        <input
                                            type="text"
                                            value={formData.organization || ''}
                                            onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                                            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                            placeholder="Amazon Web Services"
                                        />
                                    </div>
                                </div>

                                {/* Dates */}
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-400 mb-1">Issue Date</label>
                                        <input
                                            type="date"
                                            value={formData.issueDate || ''}
                                            onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                                            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-400 mb-1">Expiration Date (optional)</label>
                                        <input
                                            type="date"
                                            value={formData.expirationDate || ''}
                                            onChange={(e) => setFormData({ ...formData, expirationDate: e.target.value || null })}
                                            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                        />
                                    </div>
                                </div>

                                {/* Credential ID and URL */}
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-400 mb-1">Credential ID</label>
                                        <input
                                            type="text"
                                            value={formData.credentialId || ''}
                                            onChange={(e) => setFormData({ ...formData, credentialId: e.target.value })}
                                            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                            placeholder="ABC123XYZ"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-400 mb-1">Credential URL</label>
                                        <input
                                            type="url"
                                            value={formData.credentialUrl || ''}
                                            onChange={(e) => setFormData({ ...formData, credentialUrl: e.target.value })}
                                            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                            placeholder="https://verify.example.com/..."
                                        />
                                    </div>
                                </div>

                                {/* Skills */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-1">Skills (comma-separated)</label>
                                    <input
                                        type="text"
                                        value={skillsInput}
                                        onChange={(e) => setSkillsInput(e.target.value)}
                                        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                        placeholder="AWS, Cloud Architecture, Security"
                                    />
                                </div>

                                {/* File Upload */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-1">Certificate Media (PDF or Image)</label>
                                    <div className="flex items-center gap-4">
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleFileUpload}
                                            accept=".pdf,.png,.jpg,.jpeg"
                                            className="hidden"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            disabled={uploading}
                                            className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 hover:bg-slate-700 transition-colors disabled:opacity-50"
                                        >
                                            {uploading ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
                                            {uploading ? 'Uploading...' : 'Upload File'}
                                        </button>
                                        {formData.mediaUrl && (
                                            <div className="flex items-center gap-2 text-teal-400">
                                                {formData.mediaType === 'pdf' ? <FileText size={18} /> : <ImageIcon size={18} />}
                                                <span className="text-sm">File uploaded</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Actions */}
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
                                        disabled={saving || !formData.name || !formData.organization}
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
                                        <h3 className="text-lg font-semibold text-slate-100">{cert.name || 'Untitled'}</h3>
                                        {cert.credentialUrl && (
                                            <a
                                                href={cert.credentialUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-slate-400 hover:text-teal-400"
                                            >
                                                <ExternalLink size={16} />
                                            </a>
                                        )}
                                    </div>
                                    <p className="text-teal-400">{cert.organization}</p>
                                    <p className="text-sm text-slate-400 mt-1">
                                        Issued {cert.issueDate}
                                        {cert.expirationDate && ` · Expires ${cert.expirationDate}`}
                                    </p>
                                    {cert.credentialId && (
                                        <p className="text-sm text-slate-500 mt-1 font-mono">ID: {cert.credentialId}</p>
                                    )}
                                    {cert.skills && cert.skills.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-3">
                                            {cert.skills.map((skill, i) => (
                                                <span key={i} className="px-2 py-1 text-xs bg-teal-500/10 text-teal-400 rounded border border-teal-500/20">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="flex gap-2 ml-4">
                                    <button
                                        onClick={() => handleEdit(cert)}
                                        disabled={saving}
                                        className="p-2 text-slate-400 hover:text-teal-400 hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-50"
                                    >
                                        <Pencil size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(cert.id)}
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

                {certifications.length === 0 && (
                    <div className="text-center py-12 text-slate-400">
                        <p>No certifications yet. Add your first one!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
