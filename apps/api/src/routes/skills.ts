import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import type { Skill } from "@prisma/client";

export const skillsRouter = Router();

// GET all skills
skillsRouter.get("/", async (req, res) => {
    try {
        const skills = await prisma.skill.findMany({
            orderBy: { sortOrder: "asc" },
        });
        res.json(skills.map((skill: Skill) => ({
            id: skill.id,
            name: skill.name,
            category: skill.category,
            proficiency: skill.proficiency,
        })));
    } catch (error) {
        console.error("Error fetching skills:", error);
        res.status(500).json({ error: "Failed to fetch skills" });
    }
});

// POST create skill
skillsRouter.post("/", async (req, res) => {
    try {
        const { name, category, proficiency } = req.body;

        const skill = await prisma.skill.create({
            data: {
                name,
                category,
                proficiency: proficiency || 80,
            },
        });

        res.status(201).json({
            id: skill.id,
            name: skill.name,
            category: skill.category,
            proficiency: skill.proficiency,
        });
    } catch (error) {
        console.error("Error creating skill:", error);
        res.status(500).json({ error: "Failed to create skill" });
    }
});

// PUT update skill
skillsRouter.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, category, proficiency } = req.body;

        const skill = await prisma.skill.update({
            where: { id },
            data: { name, category, proficiency },
        });

        res.json({
            id: skill.id,
            name: skill.name,
            category: skill.category,
            proficiency: skill.proficiency,
        });
    } catch (error) {
        console.error("Error updating skill:", error);
        res.status(500).json({ error: "Failed to update skill" });
    }
});

// DELETE skill
skillsRouter.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.skill.delete({ where: { id } });
        res.status(204).send();
    } catch (error) {
        console.error("Error deleting skill:", error);
        res.status(500).json({ error: "Failed to delete skill" });
    }
});
