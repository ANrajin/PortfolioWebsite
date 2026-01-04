'use client';

import { useMemo } from 'react';
import type { Education } from '@portfolio/shared';
import { createEducation, updateEducation, deleteEducation } from '@/lib/api';
import { useCrudOperations } from '@/hooks';

export function useEducationForm(initialData: Education[]) {
    const operations = useMemo(() => ({
        createFn: createEducation,
        updateFn: updateEducation,
        deleteFn: deleteEducation,
    }), []);

    const crud = useCrudOperations<Education>(initialData, operations);

    const handleAdd = () => {
        const newEdu: Education = {
            id: 'new-' + Date.now().toString(),
            institution: '',
            degree: '',
            field: '',
            startYear: new Date().getFullYear(),
            endYear: null,
            current: true,
            description: '',
        };
        crud.startAdd(newEdu);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this education entry?')) return;
        await crud.remove(id);
    };

    return {
        education: crud.items,
        editingId: crud.editingId,
        formData: crud.formData,
        saving: crud.saving,
        message: crud.message,
        handleAdd,
        handleEdit: crud.startEdit,
        handleSave: crud.save,
        handleDelete,
        handleCancel: crud.cancelEdit,
        updateField: crud.updateFormField,
        setFormData: crud.setFormData,
    };
}
