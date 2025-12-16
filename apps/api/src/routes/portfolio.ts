import { Router } from "express";
import { prisma } from "../lib/prisma.js";

export const portfolioRouter = Router();

// GET all portfolio data
portfolioRouter.get("/", async (req, res) => {
    try {
        const [personalInfo, experiences, skills, projects, education, articles] = await Promise.all([
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
                socialLinks: personalInfo.socialLinks.map(link => ({
                    id: link.id,
                    platform: link.platform,
                    url: link.url,
                    label: link.label,
                })),
            } : null,
            experiences: experiences.map(exp => {
                let techs = exp.technologies;
                if (typeof techs === 'string') {
                    try { techs = JSON.parse(techs); } catch { techs = []; }
                }
                return {
                    id: exp.id,
                    company: exp.company,
                    position: exp.position,
                    startDate: exp.startDate.toISOString().split("T")[0],
                    endDate: exp.endDate?.toISOString().split("T")[0] || null,
                    current: exp.current,
                    description: exp.description,
                    technologies: Array.isArray(techs) ? techs : [],
                };
            }),
            skills: skills.map(skill => ({
                id: skill.id,
                name: skill.name,
                category: skill.category,
                proficiency: skill.proficiency,
            })),
            projects: projects.map(project => {
                let techs = project.technologies;
                if (typeof techs === 'string') {
                    try { techs = JSON.parse(techs); } catch { techs = []; }
                }
                return {
                    id: project.id,
                    title: project.title,
                    description: project.description,
                    link: project.link || undefined,
                    technologies: Array.isArray(techs) ? techs : [],
                    imageUrl: project.imageUrl || undefined,
                };
            }),
            education: education.map(edu => ({
                id: edu.id,
                institution: edu.institution,
                degree: edu.degree,
                field: edu.field,
                startYear: edu.startYear,
                endYear: edu.endYear,
                current: edu.current,
                description: edu.description || undefined,
            })),
            articles: articles.map(article => ({
                id: article.id,
                title: article.title,
                platform: article.platform,
                url: article.url,
                publishedDate: article.publishedDate.toISOString().split("T")[0],
                thumbnail: article.thumbnail || undefined,
            })),
        };

        res.json(data);
    } catch (error) {
        console.error("Error fetching portfolio:", error);
        res.status(500).json({ error: "Failed to fetch portfolio data" });
    }
});
