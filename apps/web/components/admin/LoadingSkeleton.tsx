'use client';

import { cn } from '@/lib/utils';

// Base Skeleton component with shimmer effect
interface SkeletonProps {
    className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
    return (
        <div
            className={cn(
                'relative overflow-hidden rounded-lg bg-slate-800',
                'before:absolute before:inset-0 before:-translate-x-full',
                'before:animate-shimmer before:bg-gradient-to-r',
                'before:from-transparent before:via-slate-700/50 before:to-transparent',
                className
            )}
        />
    );
}

// Skeleton for stat cards (used on dashboard)
export function SkeletonStatCard() {
    return (
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900">
            <Skeleton className="h-6 w-6 rounded mb-2" />
            <Skeleton className="h-8 w-16 rounded mb-1" />
            <Skeleton className="h-4 w-20 rounded" />
        </div>
    );
}

// Skeleton for content cards (experiences, projects, etc.)
export function SkeletonCard() {
    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <Skeleton className="h-6 w-40 rounded" />
                        <Skeleton className="h-5 w-16 rounded-full" />
                    </div>
                    <Skeleton className="h-5 w-32 rounded mb-1" />
                    <Skeleton className="h-4 w-48 rounded mb-3" />
                    <Skeleton className="h-16 w-full rounded mb-3" />
                    <div className="flex gap-2">
                        <Skeleton className="h-6 w-16 rounded" />
                        <Skeleton className="h-6 w-20 rounded" />
                        <Skeleton className="h-6 w-14 rounded" />
                    </div>
                </div>
                <div className="flex gap-2 ml-4">
                    <Skeleton className="h-9 w-9 rounded-lg" />
                    <Skeleton className="h-9 w-9 rounded-lg" />
                </div>
            </div>
        </div>
    );
}

// Skeleton for list items (skills, education, etc.)
export function SkeletonListItem() {
    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <Skeleton className="h-5 w-32 rounded mb-1" />
                    <Skeleton className="h-4 w-24 rounded" />
                </div>
                <div className="flex gap-2">
                    <Skeleton className="h-8 w-8 rounded-lg" />
                    <Skeleton className="h-8 w-8 rounded-lg" />
                </div>
            </div>
        </div>
    );
}

// Skeleton for dashboard quick action cards
export function SkeletonQuickAction() {
    return (
        <div className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-lg">
            <Skeleton className="h-5 w-5 rounded" />
            <div className="flex-1">
                <Skeleton className="h-5 w-28 rounded mb-1" />
                <Skeleton className="h-4 w-36 rounded" />
            </div>
        </div>
    );
}

// Skeleton for profile preview
export function SkeletonProfile() {
    return (
        <div className="flex items-start gap-4">
            <Skeleton className="w-16 h-16 rounded-full" />
            <div>
                <Skeleton className="h-6 w-40 rounded mb-2" />
                <Skeleton className="h-5 w-32 rounded mb-2" />
                <Skeleton className="h-4 w-48 rounded" />
            </div>
        </div>
    );
}

// Full page loading spinner (alternative for very fast loads)
export function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
    const sizeClasses = {
        sm: 'h-5 w-5',
        md: 'h-8 w-8',
        lg: 'h-12 w-12'
    };

    return (
        <div className="flex items-center justify-center p-8">
            <div className={cn(
                'animate-spin rounded-full border-2 border-slate-700 border-t-teal-500',
                sizeClasses[size]
            )} />
        </div>
    );
}
