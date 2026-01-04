'use client';

import { useMemo, useState } from 'react';
import type { Experience } from '@portfolio/shared';
import { createExperience, updateExperience, deleteExperience } from '@/lib/api';
import { useCrudOperations } from '@/hooks';

export function useExperienceForm(initialData: Experience[]) {
    const [techInput, setTechInput] = useState('');

    const operations = useMemo(() => ({
        createFn: createExperience,
        updateFn: updateExperience,
        deleteFn: deleteExperience,
    }), []);

    const crud = useCrudOperations<Experience>(initialData, operations);

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
        crud.startAdd(newExp);
        setTechInput('');
    };

    const handleEdit = (exp: Experience) => {
        crud.startEdit(exp);
        setTechInput(exp.technologies?.join(', ') || '');
    };

    const handleSave = async () => {
        const technologies = techInput.split(',').map(t => t.trim()).filter(Boolean);
        await crud.save({ ...crud.formData, technologies });
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this experience?')) return;
        await crud.remove(id);
    };

    const handleCancel = () => {
        crud.cancelEdit();
        setTechInput('');
    };

    return {
        experiences: crud.items,
        editingId: crud.editingId,
        formData: crud.formData,
        saving: crud.saving,
        message: crud.message,
        techInput,
        setTechInput,
        handleAdd,
        handleEdit,
        handleSave,
        handleDelete,
        handleCancel,
        updateField: crud.updateFormField,
    };
}
