import { Router } from "express";
import { prisma } from "../lib/prisma.js";

export const personalInfoRouter = Router();

// GET personal info
personalInfoRouter.get("/", async (req, res) => {
    try {
        const info = await prisma.personalInfo.findFirst({
            include: { socialLinks: true },
        });
        res.json(info);
    } catch (error) {
        console.error("Error fetching personal info:", error);
        res.status(500).json({ error: "Failed to fetch personal info" });
    }
});

// PUT update personal info
personalInfoRouter.put("/", async (req, res) => {
    try {
        const { id, name, title, email, phone, imageUrl, careerObjective, socialLinks } = req.body;

        // Upsert personal info
        const info = await prisma.personalInfo.upsert({
            where: { id: id || "default" },
            update: {
                name,
                title,
                email,
                phone,
                imageUrl,
                careerObjective,
            },
            create: {
                name,
                title,
                email,
                phone,
                imageUrl,
                careerObjective,
            },
        });

        // Update social links
        if (socialLinks && Array.isArray(socialLinks)) {
            // Delete existing links
            await prisma.socialLink.deleteMany({
                where: { personalInfoId: info.id },
            });

            // Create new links
            await prisma.socialLink.createMany({
                data: socialLinks.map((link: { platform: string; url: string; label: string }) => ({
                    platform: link.platform,
                    url: link.url,
                    label: link.label,
                    personalInfoId: info.id,
                })),
            });
        }

        // Return updated info with links
        const updated = await prisma.personalInfo.findUnique({
            where: { id: info.id },
            include: { socialLinks: true },
        });

        res.json(updated);
    } catch (error) {
        console.error("Error updating personal info:", error);
        res.status(500).json({ error: "Failed to update personal info" });
    }
});
