'use client';

import { useState } from 'react';
import { Award, ChevronDown, ChevronUp, ExternalLink, FileText, Image as ImageIcon, Calendar, Building2 } from 'lucide-react';
import Image from 'next/image';
import type { Certification } from '@portfolio/shared';

// API URL for media files
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface CertificationsSectionProps {
    certifications: Certification[];
}

const CertificationsSection: React.FC<CertificationsSectionProps> = ({ certifications }) => {
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    // Get the full URL for media files
    const getMediaUrl = (url: string) => {
        if (url.startsWith('http')) return url;
        return `${API_URL}${url}`;
    };

    if (certifications.length === 0) {
        return null;
    }

    return (
        <section id="certifications" className="section">
            <div className="max-w-4xl mx-auto">
                <h2 className="section-title">Licenses & Certifications</h2>

                <div className="mt-12 space-y-4">
                    {certifications.map((cert) => {
                        const isExpanded = expandedId === cert.id;

                        return (
                            <div
                                key={cert.id}
                                className="card overflow-hidden transition-all duration-300"
                            >
                                {/* Header - Always visible */}
                                <button
                                    onClick={() => toggleExpand(cert.id)}
                                    className="w-full flex items-center justify-between text-left p-6"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-teal-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Award size={24} className="text-teal-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-slate-100">
                                                {cert.name}
                                            </h3>
                                            <p className="text-teal-400 flex items-center gap-1 mt-1">
                                                <Building2 size={14} />
                                                {cert.organization}
                                            </p>
                                            <p className="text-sm text-slate-400 flex items-center gap-1 mt-1">
                                                <Calendar size={14} />
                                                Issued {formatDate(cert.issueDate)}
                                                {cert.expirationDate && ` · Expires ${formatDate(cert.expirationDate)}`}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-slate-400 ml-4">
                                        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                    </div>
                                </button>

                                {/* Expanded Content */}
                                {isExpanded && (
                                    <div className="px-6 pb-6 pt-0 border-t border-slate-700/50 animate-fade-in">
                                        <div className="pt-4 space-y-4">
                                            {/* Credential ID */}
                                            {cert.credentialId && (
                                                <div>
                                                    <p className="text-sm text-slate-400">Credential ID</p>
                                                    <p className="text-slate-200 font-mono text-sm">{cert.credentialId}</p>
                                                </div>
                                            )}

                                            {/* Credential URL */}
                                            {cert.credentialUrl && (
                                                <div>
                                                    <a
                                                        href={cert.credentialUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 transition-colors"
                                                    >
                                                        <ExternalLink size={16} />
                                                        Verify Credential
                                                    </a>
                                                </div>
                                            )}

                                            {/* Skills */}
                                            {cert.skills && cert.skills.length > 0 && (
                                                <div>
                                                    <p className="text-sm text-slate-400 mb-2">Skills</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {cert.skills.map((skill, i) => (
                                                            <span
                                                                key={i}
                                                                className="px-3 py-1 text-sm bg-slate-800 text-slate-300 rounded-full border border-slate-700"
                                                            >
                                                                {skill}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Media Preview */}
                                            {cert.mediaUrl && (
                                                <div>
                                                    <p className="text-sm text-slate-400 mb-2">Certificate</p>
                                                    {cert.mediaType === 'image' ? (
                                                        <a
                                                            href={getMediaUrl(cert.mediaUrl)}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-block"
                                                        >
                                                            <Image
                                                                src={getMediaUrl(cert.mediaUrl)}
                                                                alt={`${cert.name} certificate`}
                                                                width={320}
                                                                height={240}
                                                                className="rounded-lg border border-slate-700 hover:border-teal-500/50 transition-colors"
                                                            />
                                                        </a>
                                                    ) : (
                                                        <a
                                                            href={getMediaUrl(cert.mediaUrl)}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 text-slate-200 rounded-lg border border-slate-700 hover:border-teal-500/50 transition-colors"
                                                        >
                                                            <FileText size={18} className="text-teal-400" />
                                                            View Certificate (PDF)
                                                        </a>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default CertificationsSection;
