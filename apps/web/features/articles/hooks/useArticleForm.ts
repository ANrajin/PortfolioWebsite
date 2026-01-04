'use client';

import { useMemo } from 'react';
import type { Article } from '@portfolio/shared';
import { createArticle, updateArticle, deleteArticle } from '@/lib/api';
import { useCrudOperations } from '@/hooks';

export function useArticleForm(initialData: Article[]) {
    const operations = useMemo(() => ({
        createFn: createArticle,
        updateFn: updateArticle,
        deleteFn: deleteArticle,
    }), []);

    const crud = useCrudOperations<Article>(initialData, operations);

    const handleAdd = () => {
        const newArticle: Article = {
            id: 'new-' + Date.now().toString(),
            title: '',
            platform: '',
            url: '',
            publishedDate: new Date().toISOString().split('T')[0],
            thumbnail: '',
        };
        crud.startAdd(newArticle);
    };

    const handleSave = async () => {
        await crud.save();
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this article?')) return;
        await crud.remove(id);
    };

    return {
        articles: crud.items,
        editingId: crud.editingId,
        formData: crud.formData,
        saving: crud.saving,
        message: crud.message,
        handleAdd,
        handleEdit: crud.startEdit,
        handleSave,
        handleDelete,
        handleCancel: crud.cancelEdit,
        updateField: crud.updateFormField,
    };
}
