import { prisma } from "@/lib/prisma.js";
import type { ArticleEntity } from "../types/article.types.js";

export interface CreateArticleData {
    title: string;
    platform: string;
    url: string;
    publishedDate: Date;
    thumbnail?: string;
}

export interface UpdateArticleData {
    title: string;
    platform: string;
    url: string;
    publishedDate: Date;
    thumbnail?: string;
}

export class ArticleRepository {
    async findAll(): Promise<ArticleEntity[]> {
        return prisma.article.findMany({
            orderBy: { publishedDate: "desc" },
        });
    }

    async findById(id: string): Promise<ArticleEntity | null> {
        return prisma.article.findUnique({
            where: { id },
        });
    }

    async create(data: CreateArticleData): Promise<ArticleEntity> {
        return prisma.article.create({
            data: {
                title: data.title,
                platform: data.platform,
                url: data.url,
                publishedDate: data.publishedDate,
                thumbnail: data.thumbnail || null,
            },
        });
    }

    async update(id: string, data: UpdateArticleData): Promise<ArticleEntity> {
        return prisma.article.update({
            where: { id },
            data: {
                title: data.title,
                platform: data.platform,
                url: data.url,
                publishedDate: data.publishedDate,
                thumbnail: data.thumbnail || null,
            },
        });
    }

    async delete(id: string): Promise<void> {
        await prisma.article.delete({
            where: { id },
        });
    }
}

export const articleRepository = new ArticleRepository();
