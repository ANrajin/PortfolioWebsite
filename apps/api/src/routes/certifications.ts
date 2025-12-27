import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import type { Certification } from "@prisma/client";

export const certificationsRouter = Router();

// Helper to parse skills
function parseSkills(skills: unknown): string[] {
    if (Array.isArray(skills)) return skills;
    if (typeof skills === 'string') {
        try { return JSON.parse(skills); } catch { return []; }
    }
    return [];
}

// GET all certifications
certificationsRouter.get("/", async (req, res) => {
    try {
        const certifications = await prisma.certification.findMany({
            orderBy: { issueDate: "desc" },
        });
        res.json(certifications.map((cert: Certification) => ({
            id: cert.id,
            name: cert.name,
            organization: cert.organization,
            issueDate: cert.issueDate.toISOString().split("T")[0],
            expirationDate: cert.expirationDate?.toISOString().split("T")[0] || null,
            credentialId: cert.credentialId || undefined,
            credentialUrl: cert.credentialUrl || undefined,
            skills: parseSkills(cert.skills),
            mediaUrl: cert.mediaUrl || undefined,
            mediaType: cert.mediaType || undefined,
        })));
    } catch (error) {
        console.error("Error fetching certifications:", error);
        res.status(500).json({ error: "Failed to fetch certifications" });
    }
});

// POST create certification
certificationsRouter.post("/", async (req, res) => {
    try {
        const { name, organization, issueDate, expirationDate, credentialId, credentialUrl, skills, mediaUrl, mediaType } = req.body;

        const certification = await prisma.certification.create({
            data: {
                name,
                organization,
                issueDate: new Date(issueDate),
                expirationDate: expirationDate ? new Date(expirationDate) : null,
                credentialId,
                credentialUrl,
                skills: skills || [],
                mediaUrl,
                mediaType,
            },
        });

        res.status(201).json({
            id: certification.id,
            name: certification.name,
            organization: certification.organization,
            issueDate: certification.issueDate.toISOString().split("T")[0],
            expirationDate: certification.expirationDate?.toISOString().split("T")[0] || null,
            credentialId: certification.credentialId || undefined,
            credentialUrl: certification.credentialUrl || undefined,
            skills: parseSkills(certification.skills),
            mediaUrl: certification.mediaUrl || undefined,
            mediaType: certification.mediaType || undefined,
        });
    } catch (error) {
        console.error("Error creating certification:", error);
        res.status(500).json({ error: "Failed to create certification" });
    }
});

// PUT update certification
certificationsRouter.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, organization, issueDate, expirationDate, credentialId, credentialUrl, skills, mediaUrl, mediaType } = req.body;

        const certification = await prisma.certification.update({
            where: { id },
            data: {
                name,
                organization,
                issueDate: new Date(issueDate),
                expirationDate: expirationDate ? new Date(expirationDate) : null,
                credentialId,
                credentialUrl,
                skills: skills || [],
                mediaUrl,
                mediaType,
            },
        });

        res.json({
            id: certification.id,
            name: certification.name,
            organization: certification.organization,
            issueDate: certification.issueDate.toISOString().split("T")[0],
            expirationDate: certification.expirationDate?.toISOString().split("T")[0] || null,
            credentialId: certification.credentialId || undefined,
            credentialUrl: certification.credentialUrl || undefined,
            skills: parseSkills(certification.skills),
            mediaUrl: certification.mediaUrl || undefined,
            mediaType: certification.mediaType || undefined,
        });
    } catch (error) {
        console.error("Error updating certification:", error);
        res.status(500).json({ error: "Failed to update certification" });
    }
});

// DELETE certification
certificationsRouter.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.certification.delete({ where: { id } });
        res.status(204).send();
    } catch (error) {
        console.error("Error deleting certification:", error);
        res.status(500).json({ error: "Failed to delete certification" });
    }
});
