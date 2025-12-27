import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import type { SocialLink, Experience, Skill, Project, Education, Article, Certification } from "@prisma/client";

export const portfolioRouter = Router();

// Helper to parse JSON fields
function parseJsonArray(value: unknown): string[] {
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') {
        try { return JSON.parse(value); } catch { return []; }
    }
    return [];
}

// GET all portfolio data
portfolioRouter.get("/", async (req, res) => {
    try {
        const [personalInfo, experiences, skills, projects, education, articles, certifications] = await Promise.all([
            prisma.personalInfo.findFirst({
                include: { socialLinks: true },
            }),
            prisma.experience.findMany({
                orderBy: [{ current: "desc" }, { startDate: "desc" }],
            }),
            prisma.skill.findMany({
                orderBy: { sortOrder: "asc" },
            }),
            prisma.project.findMany({
                orderBy: { sortOrder: "asc" },
            }),
            prisma.education.findMany({
                orderBy: [{ current: "desc" }, { startYear: "desc" }],
            }),
            prisma.article.findMany({
                orderBy: { publishedDate: "desc" },
            }),
            prisma.certification.findMany({
                orderBy: { issueDate: "desc" },
            }),
        ]);

        // Transform to match frontend types
        const data = {
            personalInfo: personalInfo ? {
                id: personalInfo.id,
                name: personalInfo.name,
                title: personalInfo.title,
                email: personalInfo.email,
                phone: personalInfo.phone,
                imageUrl: personalInfo.imageUrl || "",
                careerObjective: personalInfo.careerObjective,
                socialLinks: personalInfo.socialLinks.map((link: SocialLink) => ({
                    id: link.id,
                    platform: link.platform,
                    url: link.url,
                    label: link.label,
                })),
            } : null,
            experiences: experiences.map((exp: Experience) => ({
                id: exp.id,
                company: exp.company,
                position: exp.position,
                startDate: exp.startDate.toISOString().split("T")[0],
                endDate: exp.endDate?.toISOString().split("T")[0] || null,
                current: exp.current,
                description: exp.description,
                technologies: parseJsonArray(exp.technologies),
            })),
            skills: skills.map((skill: Skill) => ({
                id: skill.id,
                name: skill.name,
                category: skill.category,
                proficiency: skill.proficiency,
            })),
            projects: projects.map((project: Project) => ({
                id: project.id,
                title: project.title,
                description: project.description,
                link: project.link || undefined,
                technologies: parseJsonArray(project.technologies),
                imageUrl: project.imageUrl || undefined,
            })),
            education: education.map((edu: Education) => ({
                id: edu.id,
                institution: edu.institution,
                degree: edu.degree,
                field: edu.field,
                startYear: edu.startYear,
                endYear: edu.endYear,
                current: edu.current,
                description: edu.description || undefined,
            })),
            articles: articles.map((article: Article) => ({
                id: article.id,
                title: article.title,
                platform: article.platform,
                url: article.url,
                publishedDate: article.publishedDate.toISOString().split("T")[0],
                thumbnail: article.thumbnail || undefined,
            })),
            certifications: certifications.map((cert: Certification) => ({
                id: cert.id,
                name: cert.name,
                organization: cert.organization,
                issueDate: cert.issueDate.toISOString().split("T")[0],
                expirationDate: cert.expirationDate?.toISOString().split("T")[0] || null,
                credentialId: cert.credentialId || undefined,
                credentialUrl: cert.credentialUrl || undefined,
                skills: parseJsonArray(cert.skills),
                mediaUrl: cert.mediaUrl || undefined,
                mediaType: cert.mediaType || undefined,
            })),
        };

        res.json(data);
    } catch (error) {
        console.error("Error fetching portfolio:", error);
        res.status(500).json({ error: "Failed to fetch portfolio data" });
    }
});

