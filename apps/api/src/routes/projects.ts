import { Router } from "express";
import { prisma } from "../lib/prisma.js";

export const projectsRouter = Router();

// Helper to parse technologies
function parseTechnologies(techs: unknown): string[] {
    if (Array.isArray(techs)) return techs;
    if (typeof techs === 'string') {
        try { return JSON.parse(techs); } catch { return []; }
    }
    return [];
}

// GET all projects
projectsRouter.get("/", async (req, res) => {
    try {
        const projects = await prisma.project.findMany({
            orderBy: { sortOrder: "asc" },
        });
        res.json(projects.map(project => ({
            id: project.id,
            title: project.title,
            description: project.description,
            link: project.link || undefined,
            technologies: parseTechnologies(project.technologies),
            imageUrl: project.imageUrl || undefined,
        })));
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ error: "Failed to fetch projects" });
    }
});

// POST create project
projectsRouter.post("/", async (req, res) => {
    try {
        const { title, description, link, technologies, imageUrl } = req.body;

        const project = await prisma.project.create({
            data: {
                title,
                description,
                link,
                technologies: technologies || [],
                imageUrl,
            },
        });

        res.status(201).json({
            id: project.id,
            title: project.title,
            description: project.description,
            link: project.link || undefined,
            technologies: parseTechnologies(project.technologies),
            imageUrl: project.imageUrl || undefined,
        });
    } catch (error) {
        console.error("Error creating project:", error);
        res.status(500).json({ error: "Failed to create project" });
    }
});

// PUT update project
projectsRouter.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, link, technologies, imageUrl } = req.body;

        const project = await prisma.project.update({
            where: { id },
            data: { title, description, link, technologies, imageUrl },
        });

        res.json({
            id: project.id,
            title: project.title,
            description: project.description,
            link: project.link || undefined,
            technologies: parseTechnologies(project.technologies),
            imageUrl: project.imageUrl || undefined,
        });
    } catch (error) {
        console.error("Error updating project:", error);
        res.status(500).json({ error: "Failed to update project" });
    }
});

// DELETE project
projectsRouter.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.project.delete({ where: { id } });
        res.status(204).send();
    } catch (error) {
        console.error("Error deleting project:", error);
        res.status(500).json({ error: "Failed to delete project" });
    }
});
