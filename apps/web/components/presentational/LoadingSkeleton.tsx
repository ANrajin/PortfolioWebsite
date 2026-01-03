'use client';

import { cn } from '@/lib/utils';

// Base Skeleton with shimmer for public site
interface SkeletonProps {
    className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
    return (
        <div
            className={cn(
                'relative overflow-hidden rounded-lg bg-slate-800/50',
                'before:absolute before:inset-0 before:-translate-x-full',
                'before:animate-shimmer before:bg-gradient-to-r',
                'before:from-transparent before:via-slate-700/30 before:to-transparent',
                className
            )}
        />
    );
}

// Hero section skeleton
export function HeroSectionSkeleton() {
    return (
        <section className="min-h-screen flex flex-col items-center justify-center px-4 relative">
            <div className="text-center max-w-3xl mx-auto space-y-6">
                {/* Greeting */}
                <Skeleton className="h-6 w-32 mx-auto rounded-full" />

                {/* Name */}
                <Skeleton className="h-16 w-80 mx-auto rounded-lg" />

                {/* Title */}
                <Skeleton className="h-10 w-64 mx-auto rounded-lg" />

                {/* Tagline */}
                <div className="space-y-2">
                    <Skeleton className="h-5 w-96 mx-auto rounded" />
                    <Skeleton className="h-5 w-72 mx-auto rounded" />
                </div>

                {/* Social links */}
                <div className="flex gap-4 justify-center pt-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <Skeleton key={i} className="h-10 w-10 rounded-full" />
                    ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex gap-4 justify-center pt-4">
                    <Skeleton className="h-12 w-36 rounded-lg" />
                    <Skeleton className="h-12 w-36 rounded-lg" />
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8">
                <Skeleton className="h-12 w-6 rounded-full" />
            </div>
        </section>
    );
}

// Section header skeleton
export function SectionHeaderSkeleton() {
    return (
        <div className="text-center mb-12">
            <Skeleton className="h-10 w-64 mx-auto rounded-lg" />
        </div>
    );
}

// Experience card skeleton
export function ExperienceCardSkeleton() {
    return (
        <div className="relative pl-8 pb-12">
            {/* Timeline dot */}
            <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-slate-700" />

            {/* Card */}
            <div className="ml-4 bg-slate-800/30 border border-slate-700/50 rounded-xl p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-48 rounded" />
                        <Skeleton className="h-5 w-36 rounded" />
                    </div>
                    <Skeleton className="h-5 w-32 rounded" />
                </div>
                <div className="space-y-2 mb-4">
                    <Skeleton className="h-4 w-full rounded" />
                    <Skeleton className="h-4 w-3/4 rounded" />
                </div>
                <div className="flex flex-wrap gap-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <Skeleton key={i} className="h-6 w-20 rounded-full" />
                    ))}
                </div>
            </div>
        </div>
    );
}

// Skills section skeleton
export function SkillsSectionSkeleton() {
    return (
        <section className="section bg-slate-900/50">
            <div className="max-w-6xl mx-auto px-4">
                <SectionHeaderSkeleton />
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6">
                            <Skeleton className="h-6 w-32 rounded mb-4" />
                            <div className="space-y-3">
                                {Array.from({ length: 3 }).map((_, j) => (
                                    <div key={j} className="flex items-center gap-3">
                                        <Skeleton className="h-8 w-8 rounded" />
                                        <Skeleton className="h-4 w-24 rounded" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// Project card skeleton
export function ProjectCardSkeleton() {
    return (
        <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl overflow-hidden">
            <Skeleton className="h-48 w-full rounded-none" />
            <div className="p-6 space-y-3">
                <Skeleton className="h-6 w-3/4 rounded" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full rounded" />
                    <Skeleton className="h-4 w-2/3 rounded" />
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <Skeleton key={i} className="h-5 w-16 rounded-full" />
                    ))}
                </div>
            </div>
        </div>
    );
}

// About section skeleton
export function AboutSectionSkeleton() {
    return (
        <section className="section">
            <div className="max-w-4xl mx-auto px-4">
                <SectionHeaderSkeleton />
                <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-8">
                    <div className="space-y-4">
                        <Skeleton className="h-5 w-full rounded" />
                        <Skeleton className="h-5 w-full rounded" />
                        <Skeleton className="h-5 w-3/4 rounded" />
                    </div>
                </div>
            </div>
        </section>
    );
}
