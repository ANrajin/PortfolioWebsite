import {
    MatrixRain,
    Navbar,
    HeroSection,
    AboutSection,
    ExperienceSection,
    SkillsSection,
    ProjectsSection,
    EducationSection,
    ArticlesSection,
    ContactSection,
    Footer,
} from '@/components/presentational';
import { getPortfolio } from '@/lib/api';
import { dummyData } from '@/data/dummy';

export const dynamic = 'force-dynamic';
export const revalidate = 60; // Revalidate every minute

export default async function Home() {
    let data;

    try {
        // Try to fetch from API
        data = await getPortfolio();
    } catch (error) {
        // Fallback to dummy data if API is unavailable
        console.warn('API unavailable, using dummy data:', error);
        data = dummyData;
    }

    // Handle case where API returns null personalInfo
    if (!data.personalInfo) {
        data = dummyData;
    }

    const { personalInfo, experiences, skills, projects, education, articles } = data;

    return (
        <main className="relative min-h-screen bg-slate-900">
            {/* Matrix Rain Background */}
            <MatrixRain />

            {/* Navigation */}
            <Navbar />

            {/* Hero Section */}
            <HeroSection
                name={personalInfo.name}
                title={personalInfo.title}
                tagline={personalInfo.careerObjective.split('.')[0] + '.'}
                socialLinks={personalInfo.socialLinks}
            />

            {/* Content Sections */}
            <div className="relative z-10">
                <AboutSection info={personalInfo} />
                <ExperienceSection experiences={experiences} />
                <SkillsSection skills={skills} />
                <ProjectsSection projects={projects} />
                <EducationSection education={education} />
                <ArticlesSection articles={articles} />
                <ContactSection email={personalInfo.email} phone={personalInfo.phone} />
                <Footer />
            </div>
        </main>
    );
}
