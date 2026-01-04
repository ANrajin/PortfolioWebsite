'use client';

import { useMemo, useState } from 'react';
import type { Project } from '@portfolio/shared';
import { createProject, updateProject, deleteProject } from '@/lib/api';
import { useCrudOperations } from '@/hooks';

export function useProjectForm(initialData: Project[]) {
    const [techInput, setTechInput] = useState('');

    const operations = useMemo(() => ({
        createFn: createProject,
        updateFn: updateProject,
        deleteFn: deleteProject,
    }), []);

    const crud = useCrudOperations<Project>(initialData, operations);

    const handleAdd = () => {
        const newProject: Project = {
            id: 'new-' + Date.now().toString(),
            title: '',
            description: '',
            technologies: [],
            imageUrl: '',
        };
        crud.startAdd(newProject);
        setTechInput('');
    };

    const handleEdit = (project: Project) => {
        crud.startEdit(project);
        setTechInput(project.technologies?.join(', ') || '');
    };

    const handleSave = async () => {
        const technologies = techInput.split(',').map(t => t.trim()).filter(Boolean);
        await crud.save({ ...crud.formData, technologies });
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this project?')) return;
        await crud.remove(id);
    };

    const handleCancel = () => {
        crud.cancelEdit();
        setTechInput('');
    };

    return {
        projects: crud.items,
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
