// Portfolio Data Types

export interface SocialLink {
    id: string;
    platform: 'linkedin' | 'github' | 'codeforces' | 'leetcode';
    url: string;
    label: string;
}

export interface PersonalInfo {
    id: string;
    name: string;
    title: string;
    email: string;
    phone: string;
    imageUrl: string;
    careerObjective: string;
    socialLinks: SocialLink[];
}

export interface Experience {
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string | null;
    current: boolean;
    description: string;
    technologies: string[];
}

export interface Skill {
    id: string;
    name: string;
    category: 'frontend' | 'backend' | 'database' | 'devops' | 'tools' | 'languages';
    proficiency: number; // 1-100
}

export interface Project {
    id: string;
    title: string;
    description: string;
    link?: string;
    technologies: string[];
    imageUrl?: string;
}

export interface Education {
    id: string;
    institution: string;
    degree: string;
    field: string;
    startYear: number;
    endYear: number | null;
    current: boolean;
    description?: string;
}

export interface Article {
    id: string;
    title: string;
    platform: string;
    url: string;
    publishedDate: string;
    thumbnail?: string;
}

export interface PortfolioData {
    personalInfo: PersonalInfo;
    experiences: Experience[];
    skills: Skill[];
    projects: Project[];
    education: Education[];
    articles: Article[];
}
