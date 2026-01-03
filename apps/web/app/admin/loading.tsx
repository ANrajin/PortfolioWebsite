import {
    Skeleton,
    SkeletonStatCard,
    SkeletonQuickAction,
    SkeletonProfile
} from '@/components/admin/LoadingSkeleton';

export default function AdminDashboardLoading() {
    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            {/* Header skeleton */}
            <div className="mb-8">
                <Skeleton className="h-8 w-48 rounded mb-2" />
                <Skeleton className="h-5 w-72 rounded" />
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
                {Array.from({ length: 5 }).map((_, i) => (
                    <SkeletonStatCard key={i} />
                ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-6">
                <Skeleton className="h-6 w-32 rounded mb-4" />
                <div className="grid sm:grid-cols-2 gap-3">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <SkeletonQuickAction key={i} />
                    ))}
                </div>
            </div>

            {/* Profile Preview */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <Skeleton className="h-6 w-40 rounded mb-4" />
                <SkeletonProfile />
            </div>
        </div>
    );
}
