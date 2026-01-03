import { Skeleton, SkeletonListItem } from '@/components/admin/LoadingSkeleton';

export default function EducationLoading() {
    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <Skeleton className="h-8 w-32 rounded mb-2" />
                    <Skeleton className="h-5 w-56 rounded" />
                </div>
                <Skeleton className="h-10 w-36 rounded-lg" />
            </div>

            {/* Education List */}
            <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                    <SkeletonListItem key={i} />
                ))}
            </div>
        </div>
    );
}
