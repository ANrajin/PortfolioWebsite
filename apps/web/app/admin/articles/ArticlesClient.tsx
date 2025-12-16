'use client';

import { useState } from 'react';
import { Plus, Pencil, Trash2, X, Save, ExternalLink } from 'lucide-react';
import type { Article } from '@portfolio/shared';

interface ArticlesClientProps {
    initialData: Article[];
}

export default function ArticlesClient({ initialData }: ArticlesClientProps) {
    const [articles, setArticles] = useState(initialData);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<Partial<Article>>({});

    const handleEdit = (article: Article) => {
        setEditingId(article.id);
        setFormData(article);
    };

    const handleAdd = () => {
        const newArticle: Article = {
            id: Date.now().toString(),
            title: '',
            platform: '',
            url: '',
            publishedDate: new Date().toISOString().split('T')[0],
            thumbnail: '',
        };
        setArticles([newArticle, ...articles]);
        setEditingId(newArticle.id);
        setFormData(newArticle);
    };

    const handleSave = () => {
        if (!editingId) return;

        setArticles(articles.map(a =>
            a.id === editingId ? { ...a, ...formData } as Article : a
        ));
        setEditingId(null);
        setFormData({});
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this article?')) {
            setArticles(articles.filter(a => a.id !== id));
        }
    };

    const handleCancel = () => {
        if (formData.title === '') {
            setArticles(articles.filter(a => a.id !== editingId));
        }
        setEditingId(null);
        setFormData({});
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-slate-100">Articles</h2>
                    <p className="text-slate-400 mt-1">Manage your published articles.</p>
                </div>
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-slate-900 font-medium rounded-lg hover:bg-teal-400 transition-colors"
                >
                    <Plus size={18} />
                    Add Article
                </button>
            </div>

            <div className="space-y-4">
                {articles.map((article) => (
                    <div key={article.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                        {editingId === article.id ? (
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

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-400 mb-1">Platform</label>
                                        <input
                                            type="text"
                                            value={formData.platform || ''}
                                            onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                                            placeholder="Medium, Dev.to, Hashnode..."
                                            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-400 mb-1">Published Date</label>
                                        <input
                                            type="date"
                                            value={formData.publishedDate || ''}
                                            onChange={(e) => setFormData({ ...formData, publishedDate: e.target.value })}
                                            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-1">URL</label>
                                    <input
                                        type="url"
                                        value={formData.url || ''}
                                        onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                        placeholder="https://..."
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
                                        <h3 className="text-lg font-semibold text-slate-100">{article.title}</h3>
                                        <a
                                            href={article.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-slate-400 hover:text-teal-400"
                                        >
                                            <ExternalLink size={16} />
                                        </a>
                                    </div>
                                    <p className="text-teal-400">{article.platform}</p>
                                    <p className="text-sm text-slate-400 mt-1">{formatDate(article.publishedDate)}</p>
                                </div>
                                <div className="flex gap-2 ml-4">
                                    <button
                                        onClick={() => handleEdit(article)}
                                        className="p-2 text-slate-400 hover:text-teal-400 hover:bg-slate-800 rounded-lg transition-colors"
                                    >
                                        <Pencil size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(article.id)}
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
