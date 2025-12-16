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
import { dummyData } from '@/data/dummy';

export default function Home() {
    const { personalInfo, experiences, skills, projects, education, articles } = dummyData;

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
