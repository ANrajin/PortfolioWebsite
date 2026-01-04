'use client';

import { useState, useCallback } from 'react';
import type { Skill } from '@portfolio/shared';
import { createSkill, deleteSkill } from '@/lib/api';
import { useFormMessage } from '@/hooks';

type CategoryKey = 'frontend' | 'backend' | 'database' | 'devops' | 'tools' | 'languages';

export function useSkillForm(initialData: Skill[]) {
    const [skills, setSkills] = useState<Skill[]>(initialData);
    const [newSkillName, setNewSkillName] = useState('');
    const [newSkillCategory, setNewSkillCategory] = useState<CategoryKey>('frontend');
    const [saving, setSaving] = useState(false);
    const { message, showSuccess, showError, clearMessage } = useFormMessage();

    const groupedSkills = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) {
            acc[skill.category] = [];
        }
        acc[skill.category].push(skill);
        return acc;
    }, {} as Record<string, Skill[]>);

    const handleAdd = useCallback(async () => {
        if (!newSkillName.trim()) return;

        setSaving(true);
        clearMessage();

        try {
            const newSkill = await createSkill({
                name: newSkillName.trim(),
                category: newSkillCategory,
                proficiency: 80,
            });

            setSkills(prev => [...prev, newSkill]);
            setNewSkillName('');
            showSuccess('Skill added!');
        } catch (error) {
            console.error('Error adding skill:', error);
            showError('Failed to add skill.');
        } finally {
            setSaving(false);
        }
    }, [newSkillName, newSkillCategory, showSuccess, showError, clearMessage]);

    const handleDelete = useCallback(async (id: string) => {
        setSaving(true);
        clearMessage();

        try {
            await deleteSkill(id);
            setSkills(prev => prev.filter(s => s.id !== id));
            showSuccess('Skill deleted!');
        } catch (error) {
            console.error('Error deleting skill:', error);
            showError('Failed to delete skill.');
        } finally {
            setSaving(false);
        }
    }, [showSuccess, showError, clearMessage]);

    return {
        skills,
        groupedSkills,
        newSkillName,
        setNewSkillName,
        newSkillCategory,
        setNewSkillCategory,
        saving,
        message,
        handleAdd,
        handleDelete,
    };
}
