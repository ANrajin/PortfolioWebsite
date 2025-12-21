// Shared constants

export const SOCIAL_PLATFORMS = {
    linkedin: {
        name: 'LinkedIn',
        icon: 'linkedin',
        baseUrl: 'https://linkedin.com/in/',
    },
    github: {
        name: 'GitHub',
        icon: 'github',
        baseUrl: 'https://github.com/',
    },
    codeforces: {
        name: 'Codeforces',
        icon: 'code',
        baseUrl: 'https://codeforces.com/profile/',
    },
    leetcode: {
        name: 'LeetCode',
        icon: 'terminal',
        baseUrl: 'https://leetcode.com/',
    },
} as const;

export const SKILL_CATEGORIES = {
    frontend: 'Frontend',
    backend: 'Backend',
    database: 'Database',
    devops: 'DevOps',
    tools: 'Tools',
    languages: 'Languages',
} as const;

export const NAVIGATION_ITEMS = [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'articles', label: 'Articles' },
    { id: 'contact', label: 'Contact' },
] as const;
