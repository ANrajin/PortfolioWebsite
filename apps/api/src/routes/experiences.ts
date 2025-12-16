import { Router } from "express";
import { prisma } from "../lib/prisma.js";

export const experiencesRouter = Router();

// Helper to parse technologies
function parseTechnologies(techs: unknown): string[] {
    if (Array.isArray(techs)) return techs;
    if (typeof techs === 'string') {
        try { return JSON.parse(techs); } catch { return []; }
    }
    return [];
}

// GET all experiences
experiencesRouter.get("/", async (req, res) => {
    try {
        const experiences = await prisma.experience.findMany({
            orderBy: [{ current: "desc" }, { startDate: "desc" }],
        });
        res.json(experiences.map(exp => ({
            id: exp.id,
            company: exp.company,
            position: exp.position,
            startDate: exp.startDate.toISOString().split("T")[0],
            endDate: exp.endDate?.toISOString().split("T")[0] || null,
            current: exp.current,
            description: exp.description,
            technologies: parseTechnologies(exp.technologies),
        })));
    } catch (error) {
        console.error("Error fetching experiences:", error);
        res.status(500).json({ error: "Failed to fetch experiences" });
    }
});

// POST create experience
experiencesRouter.post("/", async (req, res) => {
    try {
        const { company, position, startDate, endDate, current, description, technologies } = req.body;

        const experience = await prisma.experience.create({
            data: {
                company,
                position,
                startDate: new Date(startDate),
                endDate: endDate ? new Date(endDate) : null,
                current: current || false,
                description,
                technologies: technologies || [],
            },
        });

        res.status(201).json({
            id: experience.id,
            company: experience.company,
            position: experience.position,
            startDate: experience.startDate.toISOString().split("T")[0],
            endDate: experience.endDate?.toISOString().split("T")[0] || null,
            current: experience.current,
            description: experience.description,
            technologies: parseTechnologies(experience.technologies),
        });
    } catch (error) {
        console.error("Error creating experience:", error);
        res.status(500).json({ error: "Failed to create experience" });
    }
});

// PUT update experience
experiencesRouter.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { company, position, startDate, endDate, current, description, technologies } = req.body;

        const experience = await prisma.experience.update({
            where: { id },
            data: {
                company,
                position,
                startDate: new Date(startDate),
                endDate: endDate ? new Date(endDate) : null,
                current: current || false,
                description,
                technologies: technologies || [],
            },
        });

        res.json({
            id: experience.id,
            company: experience.company,
            position: experience.position,
            startDate: experience.startDate.toISOString().split("T")[0],
            endDate: experience.endDate?.toISOString().split("T")[0] || null,
            current: experience.current,
            description: experience.description,
            technologies: parseTechnologies(experience.technologies),
        });
    } catch (error) {
        console.error("Error updating experience:", error);
        res.status(500).json({ error: "Failed to update experience" });
    }
});

// DELETE experience
experiencesRouter.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.experience.delete({ where: { id } });
        res.status(204).send();
    } catch (error) {
        console.error("Error deleting experience:", error);
        res.status(500).json({ error: "Failed to delete experience" });
    }
});
