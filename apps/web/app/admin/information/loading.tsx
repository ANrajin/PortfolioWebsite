import { Skeleton, SkeletonProfile } from '@/components/admin/LoadingSkeleton';

export default function InformationLoading() {
    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            {/* Header */}
            <div className="mb-6">
                <Skeleton className="h-8 w-48 rounded mb-2" />
                <Skeleton className="h-5 w-64 rounded" />
            </div>

            {/* Form skeleton */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                {/* Profile section */}
                <div className="mb-8">
                    <SkeletonProfile />
                </div>

                {/* Form fields */}
                <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <Skeleton className="h-4 w-16 rounded mb-2" />
                            <Skeleton className="h-10 w-full rounded-lg" />
                        </div>
                        <div>
                            <Skeleton className="h-4 w-12 rounded mb-2" />
                            <Skeleton className="h-10 w-full rounded-lg" />
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <Skeleton className="h-4 w-14 rounded mb-2" />
                            <Skeleton className="h-10 w-full rounded-lg" />
                        </div>
                        <div>
                            <Skeleton className="h-4 w-16 rounded mb-2" />
                            <Skeleton className="h-10 w-full rounded-lg" />
                        </div>
                    </div>
                    <div>
                        <Skeleton className="h-4 w-32 rounded mb-2" />
                        <Skeleton className="h-24 w-full rounded-lg" />
                    </div>
                </div>

                {/* Save button */}
                <div className="flex justify-end mt-6">
                    <Skeleton className="h-10 w-32 rounded-lg" />
                </div>
            </div>
        </div>
    );
}
