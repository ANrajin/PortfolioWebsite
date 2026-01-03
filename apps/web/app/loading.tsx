import {
    Skeleton,
    HeroSectionSkeleton,
    AboutSectionSkeleton,
    SectionHeaderSkeleton,
    ExperienceCardSkeleton,
    SkillsSectionSkeleton,
    ProjectCardSkeleton,
} from '@/components/presentational/LoadingSkeleton';

export default function HomeLoading() {
    return (
        <main className="relative min-h-screen bg-slate-900">
            {/* Placeholder for matrix rain (subtle gradient instead) */}
            <div className="fixed inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 opacity-90" />

            {/* Navbar skeleton */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
                <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                    <Skeleton className="h-8 w-32 rounded" />
                    <div className="hidden md:flex gap-6">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <Skeleton key={i} className="h-4 w-16 rounded" />
                        ))}
                    </div>
                    <Skeleton className="h-8 w-8 rounded md:hidden" />
                </div>
            </nav>

            {/* Hero Section */}
            <HeroSectionSkeleton />

            {/* Content Sections */}
            <div className="relative z-10">
                {/* About */}
                <AboutSectionSkeleton />

                {/* Experience */}
                <section className="section">
                    <div className="max-w-4xl mx-auto px-4">
                        <SectionHeaderSkeleton />
                        <div className="space-y-0">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <ExperienceCardSkeleton key={i} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Skills */}
                <SkillsSectionSkeleton />

                {/* Projects */}
                <section className="section">
                    <div className="max-w-6xl mx-auto px-4">
                        <SectionHeaderSkeleton />
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <ProjectCardSkeleton key={i} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Education */}
                <section className="section bg-slate-900/50">
                    <div className="max-w-4xl mx-auto px-4">
                        <SectionHeaderSkeleton />
                        <div className="space-y-4">
                            {Array.from({ length: 2 }).map((_, i) => (
                                <div key={i} className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6">
                                    <div className="flex justify-between items-start">
                                        <div className="space-y-2">
                                            <Skeleton className="h-6 w-48 rounded" />
                                            <Skeleton className="h-5 w-36 rounded" />
                                        </div>
                                        <Skeleton className="h-5 w-24 rounded" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact */}
                <section className="section">
                    <div className="max-w-4xl mx-auto px-4">
                        <SectionHeaderSkeleton />
                        <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-8">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <Skeleton className="h-6 w-40 rounded" />
                                    <Skeleton className="h-4 w-full rounded" />
                                    <Skeleton className="h-4 w-3/4 rounded" />
                                    <div className="flex gap-4 pt-4">
                                        {Array.from({ length: 3 }).map((_, i) => (
                                            <Skeleton key={i} className="h-10 w-10 rounded-full" />
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <Skeleton className="h-12 w-full rounded-lg" />
                                    <Skeleton className="h-12 w-full rounded-lg" />
                                    <Skeleton className="h-24 w-full rounded-lg" />
                                    <Skeleton className="h-12 w-32 rounded-lg" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="py-8 border-t border-slate-800">
                    <div className="max-w-6xl mx-auto px-4 text-center">
                        <Skeleton className="h-4 w-48 mx-auto rounded" />
                    </div>
                </footer>
            </div>
        </main>
    );
}
