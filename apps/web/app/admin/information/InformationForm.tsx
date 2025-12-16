'use client';

import { useState } from 'react';
import { Save, Plus, Trash2, CheckCircle, XCircle } from 'lucide-react';
import type { PersonalInfo, SocialLink } from '@portfolio/shared';
import { updatePersonalInfo } from '@/lib/api';

interface InformationFormProps {
    initialData: PersonalInfo;
}

export default function InformationForm({ initialData }: InformationFormProps) {
    const [data, setData] = useState(initialData);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const handleSave = async () => {
        setSaving(true);
        setMessage(null);
        try {
            await updatePersonalInfo(data);
            setMessage({ type: 'success', text: 'Changes saved successfully!' });
        } catch (error) {
            console.error('Error saving:', error);
            setMessage({ type: 'error', text: 'Failed to save changes. Please try again.' });
        } finally {
            setSaving(false);
        }
    };

    const handleAddSocialLink = () => {
        const newLink: SocialLink = {
            id: Date.now().toString(),
            platform: 'linkedin',
            url: '',
            label: 'New Link',
        };
        setData({ ...data, socialLinks: [...data.socialLinks, newLink] });
    };

    const handleRemoveSocialLink = (id: string) => {
        setData({
            ...data,
            socialLinks: data.socialLinks.filter(link => link.id !== id),
        });
    };

    const handleSocialLinkChange = (id: string, field: keyof SocialLink, value: string) => {
        setData({
            ...data,
            socialLinks: data.socialLinks.map(link =>
                link.id === id ? { ...link, [field]: value } : link
            ),
        });
    };

    return (
        <div className="space-y-6">
            {/* Status Message */}
            {message && (
                <div className={`flex items-center gap-2 p-4 rounded-lg ${message.type === 'success'
                        ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                        : 'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}>
                    {message.type === 'success' ? <CheckCircle size={18} /> : <XCircle size={18} />}
                    {message.text}
                </div>
            )}

            {/* Basic Info */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-slate-100 mb-4">Basic Information</h3>

                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Name</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData({ ...data, name: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Title</label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData({ ...data, title: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Email</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData({ ...data, email: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Phone</label>
                        <input
                            type="tel"
                            value={data.phone}
                            onChange={(e) => setData({ ...data, phone: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>
                </div>

                <div className="mt-4">
                    <label className="block text-sm font-medium text-slate-400 mb-1">Image URL</label>
                    <input
                        type="url"
                        value={data.imageUrl}
                        onChange={(e) => setData({ ...data, imageUrl: e.target.value })}
                        placeholder="https://example.com/your-photo.jpg"
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                </div>
            </div>

            {/* Career Objective */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-slate-100 mb-4">Career Objective</h3>
                <textarea
                    value={data.careerObjective}
                    onChange={(e) => setData({ ...data, careerObjective: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                />
            </div>

            {/* Social Links */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-slate-100">Social Links</h3>
                    <button
                        onClick={handleAddSocialLink}
                        className="flex items-center gap-2 px-3 py-1.5 bg-teal-500/10 text-teal-400 rounded-lg hover:bg-teal-500/20 transition-colors"
                    >
                        <Plus size={16} />
                        Add Link
                    </button>
                </div>

                <div className="space-y-3">
                    {data.socialLinks.map((link) => (
                        <div key={link.id} className="flex items-center gap-3">
                            <select
                                value={link.platform}
                                onChange={(e) => handleSocialLinkChange(link.id, 'platform', e.target.value)}
                                className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            >
                                <option value="linkedin">LinkedIn</option>
                                <option value="github">GitHub</option>
                                <option value="twitter">Twitter</option>
                                <option value="codeforces">Codeforces</option>
                                <option value="leetcode">LeetCode</option>
                                <option value="website">Website</option>
                            </select>
                            <input
                                type="text"
                                value={link.label}
                                onChange={(e) => handleSocialLinkChange(link.id, 'label', e.target.value)}
                                placeholder="Label"
                                className="w-32 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                            <input
                                type="url"
                                value={link.url}
                                onChange={(e) => handleSocialLinkChange(link.id, 'url', e.target.value)}
                                placeholder="URL"
                                className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                            <button
                                onClick={() => handleRemoveSocialLink(link.id)}
                                className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 px-6 py-2.5 bg-teal-500 text-slate-900 font-medium rounded-lg hover:bg-teal-400 transition-colors disabled:opacity-50"
                >
                    <Save size={18} />
                    {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>
        </div>
    );
}
