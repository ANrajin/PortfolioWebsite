import {
    MatrixRain,
    Navbar,
    HeroSection,
    AboutSection,
    ExperienceSection,
    SkillsSection,
    ProjectsSection,
    EducationSection,
    CertificationsSection,
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

    const { personalInfo, experiences, skills, projects, education, articles, certifications } = data;

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
                {experiences && experiences.length > 0 && <ExperienceSection experiences={experiences} />}
                {skills && skills.length > 0 && <SkillsSection skills={skills} />}
                {projects && projects.length > 0 && <ProjectsSection projects={projects} />}
                {education && education.length > 0 && <EducationSection education={education} />}
                {certifications && certifications.length > 0 && <CertificationsSection certifications={certifications} />}
                {articles && articles.length > 0 && <ArticlesSection articles={articles} />}
                <ContactSection email={personalInfo.email} phone={personalInfo.phone} socialLinks={personalInfo.socialLinks} />
                <Footer />
            </div>
        </main>
    );
}
