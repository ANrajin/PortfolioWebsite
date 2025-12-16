import { Router } from "express";
import { prisma } from "../lib/prisma.js";

export const articlesRouter = Router();

// GET all articles
articlesRouter.get("/", async (req, res) => {
    try {
        const articles = await prisma.article.findMany({
            orderBy: { publishedDate: "desc" },
        });
        res.json(articles.map(article => ({
            id: article.id,
            title: article.title,
            platform: article.platform,
            url: article.url,
            publishedDate: article.publishedDate.toISOString().split("T")[0],
            thumbnail: article.thumbnail || undefined,
        })));
    } catch (error) {
        console.error("Error fetching articles:", error);
        res.status(500).json({ error: "Failed to fetch articles" });
    }
});

// POST create article
articlesRouter.post("/", async (req, res) => {
    try {
        const { title, platform, url, publishedDate, thumbnail } = req.body;

        const article = await prisma.article.create({
            data: {
                title,
                platform,
                url,
                publishedDate: new Date(publishedDate),
                thumbnail,
            },
        });

        res.status(201).json({
            id: article.id,
            title: article.title,
            platform: article.platform,
            url: article.url,
            publishedDate: article.publishedDate.toISOString().split("T")[0],
            thumbnail: article.thumbnail || undefined,
        });
    } catch (error) {
        console.error("Error creating article:", error);
        res.status(500).json({ error: "Failed to create article" });
    }
});

// PUT update article
articlesRouter.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, platform, url, publishedDate, thumbnail } = req.body;

        const article = await prisma.article.update({
            where: { id },
            data: {
                title,
                platform,
                url,
                publishedDate: new Date(publishedDate),
                thumbnail,
            },
        });

        res.json({
            id: article.id,
            title: article.title,
            platform: article.platform,
            url: article.url,
            publishedDate: article.publishedDate.toISOString().split("T")[0],
            thumbnail: article.thumbnail || undefined,
        });
    } catch (error) {
        console.error("Error updating article:", error);
        res.status(500).json({ error: "Failed to update article" });
    }
});

// DELETE article
articlesRouter.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.article.delete({ where: { id } });
        res.status(204).send();
    } catch (error) {
        console.error("Error deleting article:", error);
        res.status(500).json({ error: "Failed to delete article" });
    }
});
