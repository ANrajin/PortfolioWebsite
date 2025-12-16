import { Router } from "express";
import { prisma } from "../lib/prisma.js";

export const educationRouter = Router();

// GET all education
educationRouter.get("/", async (req, res) => {
    try {
        const education = await prisma.education.findMany({
            orderBy: [{ current: "desc" }, { startYear: "desc" }],
        });
        res.json(education.map(edu => ({
            id: edu.id,
            institution: edu.institution,
            degree: edu.degree,
            field: edu.field,
            startYear: edu.startYear,
            endYear: edu.endYear,
            current: edu.current,
            description: edu.description || undefined,
        })));
    } catch (error) {
        console.error("Error fetching education:", error);
        res.status(500).json({ error: "Failed to fetch education" });
    }
});

// POST create education
educationRouter.post("/", async (req, res) => {
    try {
        const { institution, degree, field, startYear, endYear, current, description } = req.body;

        const education = await prisma.education.create({
            data: {
                institution,
                degree,
                field,
                startYear,
                endYear: current ? null : endYear,
                current: current || false,
                description,
            },
        });

        res.status(201).json({
            id: education.id,
            institution: education.institution,
            degree: education.degree,
            field: education.field,
            startYear: education.startYear,
            endYear: education.endYear,
            current: education.current,
            description: education.description || undefined,
        });
    } catch (error) {
        console.error("Error creating education:", error);
        res.status(500).json({ error: "Failed to create education" });
    }
});

// PUT update education
educationRouter.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { institution, degree, field, startYear, endYear, current, description } = req.body;

        const education = await prisma.education.update({
            where: { id },
            data: {
                institution,
                degree,
                field,
                startYear,
                endYear: current ? null : endYear,
                current,
                description,
            },
        });

        res.json({
            id: education.id,
            institution: education.institution,
            degree: education.degree,
            field: education.field,
            startYear: education.startYear,
            endYear: education.endYear,
            current: education.current,
            description: education.description || undefined,
        });
    } catch (error) {
        console.error("Error updating education:", error);
        res.status(500).json({ error: "Failed to update education" });
    }
});

// DELETE education
educationRouter.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.education.delete({ where: { id } });
        res.status(204).send();
    } catch (error) {
        console.error("Error deleting education:", error);
        res.status(500).json({ error: "Failed to delete education" });
    }
});
