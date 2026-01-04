'use client';

import { useState, useCallback } from 'react';
import { useFormMessage } from './useFormMessage';

interface HasId {
    id: string;
}

interface CrudOperations<T extends HasId> {
    createFn: (data: Omit<T, 'id'>) => Promise<T>;
    updateFn: (id: string, data: Partial<T>) => Promise<T>;
    deleteFn: (id: string) => Promise<void>;
}

export function useCrudOperations<T extends HasId>(
    initialData: T[],
    operations: CrudOperations<T>
) {
    const [items, setItems] = useState<T[]>(initialData);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<Partial<T>>({});
    const [saving, setSaving] = useState(false);
    const { message, showSuccess, showError, clearMessage } = useFormMessage();

    const startAdd = useCallback((newItem: T) => {
        setItems(prev => [newItem, ...prev]);
        setEditingId(newItem.id);
        setFormData(newItem);
        clearMessage();
    }, [clearMessage]);

    const startEdit = useCallback((item: T) => {
        setEditingId(item.id);
        setFormData(item);
        clearMessage();
    }, [clearMessage]);

    const cancelEdit = useCallback(() => {
        if (editingId?.startsWith('new-')) {
            setItems(prev => prev.filter(item => item.id !== editingId));
        }
        setEditingId(null);
        setFormData({});
    }, [editingId]);

    const save = useCallback(async (dataToSave?: Partial<T>) => {
        if (!editingId) return;

        setSaving(true);
        clearMessage();

        try {
            const isNew = editingId.startsWith('new-');
            const saveData = dataToSave || formData;
            let savedItem: T;

            if (isNew) {
                const { id, ...data } = saveData as T;
                savedItem = await operations.createFn(data as Omit<T, 'id'>);
            } else {
                savedItem = await operations.updateFn(editingId, saveData);
            }

            setItems(prev => prev.map(item => item.id === editingId ? savedItem : item));
            setEditingId(null);
            setFormData({});
            showSuccess(isNew ? 'Created successfully!' : 'Updated successfully!');
            return savedItem;
        } catch (error) {
            console.error('Error saving:', error);
            showError('Failed to save. Please try again.');
            throw error;
        } finally {
            setSaving(false);
        }
    }, [editingId, formData, operations, showSuccess, showError, clearMessage]);

    const remove = useCallback(async (id: string) => {
        setSaving(true);
        clearMessage();

        try {
            if (!id.startsWith('new-')) {
                await operations.deleteFn(id);
            }
            setItems(prev => prev.filter(item => item.id !== id));
            showSuccess('Deleted successfully!');
        } catch (error) {
            console.error('Error deleting:', error);
            showError('Failed to delete. Please try again.');
            throw error;
        } finally {
            setSaving(false);
        }
    }, [operations, showSuccess, showError, clearMessage]);

    const updateFormField = useCallback(<K extends keyof T>(field: K, value: T[K]) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    }, []);

    return {
        items,
        editingId,
        formData,
        saving,
        message,
        startAdd,
        startEdit,
        cancelEdit,
        save,
        remove,
        updateFormField,
        setFormData,
    };
}
