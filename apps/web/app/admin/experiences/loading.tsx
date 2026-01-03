import { Skeleton, SkeletonCard } from '@/components/admin/LoadingSkeleton';

export default function ExperiencesLoading() {
    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <Skeleton className="h-8 w-36 rounded mb-2" />
                    <Skeleton className="h-5 w-56 rounded" />
                </div>
                <Skeleton className="h-10 w-40 rounded-lg" />
            </div>

            {/* Cards */}
            <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                    <SkeletonCard key={i} />
                ))}
            </div>
        </div>
    );
}
