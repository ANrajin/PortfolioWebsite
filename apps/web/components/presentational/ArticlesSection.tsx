'use client';

import { ExternalLink, Calendar, BookOpen } from 'lucide-react';
import type { Article } from '@portfolio/shared';

interface ArticlesSectionProps {
    articles: Article[];
}

const platformColors: Record<string, string> = {
    'Medium': 'bg-green-500/10 text-green-400 border-green-500/20',
    'Dev.to': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    'Hashnode': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    'default': 'bg-teal-500/10 text-teal-400 border-teal-500/20',
};

const ArticlesSection: React.FC<ArticlesSectionProps> = ({ articles }) => {
    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    return (
        <section id="articles" className="section">
            <div className="max-w-6xl mx-auto">
                <h2 className="section-title">Articles & Blog Posts</h2>

                <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.map((article) => {
                        const colorClass = platformColors[article.platform] || platformColors['default'];

                        return (
                            <a
                                key={article.id}
                                href={article.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="card group block"
                            >
                                {/* Thumbnail or Icon */}
                                <div className="h-40 bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg mb-4 overflow-hidden flex items-center justify-center">
                                    {article.thumbnail ? (
                                        <img
                                            src={article.thumbnail}
                                            alt={article.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <BookOpen size={40} className="text-teal-500/30" />
                                    )}
                                </div>

                                {/* Article Info */}
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between gap-2">
                                        <span className={`px-2 py-1 text-xs font-medium rounded border ${colorClass}`}>
                                            {article.platform}
                                        </span>
                                        <span className="flex items-center gap-1 text-xs text-slate-500">
                                            <Calendar size={12} />
                                            {formatDate(article.publishedDate)}
                                        </span>
                                    </div>

                                    <h3 className="text-lg font-semibold text-slate-100 group-hover:text-teal-400 transition-colors line-clamp-2">
                                        {article.title}
                                    </h3>

                                    <div className="flex items-center gap-1 text-sm text-teal-400 group-hover:text-teal-300 transition-colors">
                                        Read Article
                                        <ExternalLink size={14} />
                                    </div>
                                </div>
                            </a>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ArticlesSection;
