import { Skeleton, SkeletonListItem } from '@/components/admin/LoadingSkeleton';

export default function SkillsLoading() {
    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <Skeleton className="h-8 w-24 rounded mb-2" />
                    <Skeleton className="h-5 w-48 rounded" />
                </div>
                <Skeleton className="h-10 w-32 rounded-lg" />
            </div>

            {/* Skills Grid */}
            <div className="grid md:grid-cols-2 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                    <SkeletonListItem key={i} />
                ))}
            </div>
        </div>
    );
}
