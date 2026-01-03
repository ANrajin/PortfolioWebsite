import { Skeleton, SkeletonCard } from '@/components/admin/LoadingSkeleton';

export default function ProjectsLoading() {
    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <Skeleton className="h-8 w-28 rounded mb-2" />
                    <Skeleton className="h-5 w-52 rounded" />
                </div>
                <Skeleton className="h-10 w-36 rounded-lg" />
            </div>

            {/* Projects Grid */}
            <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                    <SkeletonCard key={i} />
                ))}
            </div>
        </div>
    );
}
