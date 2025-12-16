'use client';

import { useState } from 'react';
import { Plus, Trash2, Save } from 'lucide-react';
import type { Skill } from '@portfolio/shared';
import { SKILL_CATEGORIES } from '@portfolio/shared';

interface SkillsClientProps {
    initialData: Skill[];
}

type CategoryKey = keyof typeof SKILL_CATEGORIES;

const categoryColors: Record<string, string> = {
    frontend: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    backend: 'bg-green-500/10 text-green-400 border-green-500/30',
    database: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    devops: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
    tools: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    languages: 'bg-teal-500/10 text-teal-400 border-teal-500/30',
};

export default function SkillsClient({ initialData }: SkillsClientProps) {
    const [skills, setSkills] = useState(initialData);
    const [newSkillName, setNewSkillName] = useState('');
    const [newSkillCategory, setNewSkillCategory] = useState<CategoryKey>('frontend');

    // Group by category
    const groupedSkills = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) {
            acc[skill.category] = [];
        }
        acc[skill.category].push(skill);
        return acc;
    }, {} as Record<string, Skill[]>);

    const handleAddSkill = () => {
        if (!newSkillName.trim()) return;

        const newSkill: Skill = {
            id: Date.now().toString(),
            name: newSkillName.trim(),
            category: newSkillCategory,
            proficiency: 80,
        };

        setSkills([...skills, newSkill]);
        setNewSkillName('');
    };

    const handleDeleteSkill = (id: string) => {
        setSkills(skills.filter(s => s.id !== id));
    };

    const handleSave = async () => {
        // TODO: Save to API in Phase 3
        alert('Changes saved! (Note: API integration coming in Phase 3)');
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-slate-100">Skills</h2>
                    <p className="text-slate-400 mt-1">Manage your technical skills.</p>
                </div>
                <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-slate-900 font-medium rounded-lg hover:bg-teal-400 transition-colors"
                >
                    <Save size={18} />
                    Save Changes
                </button>
            </div>

            {/* Add New Skill */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 mb-6">
                <h3 className="text-sm font-medium text-slate-400 mb-3">Add New Skill</h3>
                <div className="flex gap-3">
                    <input
                        type="text"
                        value={newSkillName}
                        onChange={(e) => setNewSkillName(e.target.value)}
                        placeholder="Skill name (e.g., React)"
                        className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
                    />
                    <select
                        value={newSkillCategory}
                        onChange={(e) => setNewSkillCategory(e.target.value as CategoryKey)}
                        className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                        {Object.entries(SKILL_CATEGORIES).map(([key, label]) => (
                            <option key={key} value={key}>{label}</option>
                        ))}
                    </select>
                    <button
                        onClick={handleAddSkill}
                        className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-slate-900 font-medium rounded-lg hover:bg-teal-400 transition-colors"
                    >
                        <Plus size={18} />
                        Add
                    </button>
                </div>
            </div>

            {/* Skills by Category */}
            <div className="space-y-6">
                {Object.entries(SKILL_CATEGORIES).map(([category, label]) => {
                    const categorySkills = groupedSkills[category] || [];
                    if (categorySkills.length === 0) return null;

                    return (
                        <div key={category} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                            <h3 className="text-lg font-semibold text-slate-100 mb-4">{label}</h3>
                            <div className="flex flex-wrap gap-2">
                                {categorySkills.map((skill) => (
                                    <div
                                        key={skill.id}
                                        className={`group flex items-center gap-2 px-3 py-1.5 rounded-full border ${categoryColors[category] || categoryColors.languages}`}
                                    >
                                        <span className="text-sm font-medium">{skill.name}</span>
                                        <button
                                            onClick={() => handleDeleteSkill(skill.id)}
                                            className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-red-500/20 rounded-full transition-all"
                                        >
                                            <Trash2 size={14} className="text-red-400" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
