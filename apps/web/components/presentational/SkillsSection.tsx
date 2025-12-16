'use client';

import { useState } from 'react';
import type { Skill } from '@portfolio/shared';
import { SKILL_CATEGORIES } from '@portfolio/shared';

interface SkillsSectionProps {
    skills: Skill[];
}

type CategoryKey = keyof typeof SKILL_CATEGORIES;

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
    frontend: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30' },
    backend: { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/30' },
    database: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30' },
    devops: { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/30' },
    tools: { bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/30' },
    languages: { bg: 'bg-teal-500/10', text: 'text-teal-400', border: 'border-teal-500/30' },
};

const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
    // Group skills by category
    const groupedSkills = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) {
            acc[skill.category] = [];
        }
        acc[skill.category].push(skill);
        return acc;
    }, {} as Record<string, Skill[]>);

    const categories = Object.keys(groupedSkills) as CategoryKey[];
    const [activeCategory, setActiveCategory] = useState<CategoryKey>(categories[0]);

    return (
        <section id="skills" className="section bg-slate-900/50">
            <div className="max-w-4xl mx-auto">
                <h2 className="section-title">Technical Skills</h2>

                {/* Category Tabs */}
                <div className="mt-12 flex flex-wrap justify-center gap-2 mb-8">
                    {categories.map((category) => {
                        const colors = categoryColors[category] || categoryColors.languages;
                        const isActive = activeCategory === category;
                        const count = groupedSkills[category]?.length || 0;

                        return (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 border ${isActive
                                    ? `${colors.bg} ${colors.text} ${colors.border} shadow-lg`
                                    : 'bg-slate-800/50 text-slate-400 border-slate-700 hover:border-slate-600 hover:text-slate-300'
                                    }`}
                            >
                                {SKILL_CATEGORIES[category]} ({count})
                            </button>
                        );
                    })}
                </div>

                {/* Skills Pills */}
                <div className="card">
                    <div className="flex flex-wrap justify-center gap-3">
                        {groupedSkills[activeCategory]?.map((skill) => {
                            const colors = categoryColors[activeCategory] || categoryColors.languages;

                            return (
                                <span
                                    key={skill.id}
                                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-300 hover:scale-105 ${colors.bg} ${colors.text} ${colors.border}`}
                                >
                                    {skill.name}
                                </span>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SkillsSection;
