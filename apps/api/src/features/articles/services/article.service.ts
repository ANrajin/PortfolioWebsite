import { articleRepository } from "../repositories/article.repository.js";
import { AppError } from "@/shared/errors/app-error.js";
import type { ArticleDto, ArticleEntity } from "../types/article.types.js";
import type { CreateArticleInput, UpdateArticleInput } from "../validators/article.validator.js";

function mapToDto(entity: ArticleEntity): ArticleDto {
    return {
        id: entity.id,
        title: entity.title,
        platform: entity.platform,
        url: entity.url,
        publishedDate: entity.publishedDate.toISOString().split("T")[0],
        ...(entity.thumbnail && { thumbnail: entity.thumbnail }),
    };
}

export class ArticleService {
    async getAllArticles(): Promise<ArticleDto[]> {
        const articles = await articleRepository.findAll();
        return articles.map(mapToDto);
    }

    async getArticleById(id: string): Promise<ArticleDto> {
        const article = await articleRepository.findById(id);

        if (!article) {
            throw AppError.notFound("Article");
        }

        return mapToDto(article);
    }

    async createArticle(input: CreateArticleInput): Promise<ArticleDto> {
        const article = await articleRepository.create({
            title: input.title,
            platform: input.platform,
            url: input.url,
            publishedDate: new Date(input.publishedDate),
            thumbnail: input.thumbnail || undefined,
        });

        return mapToDto(article);
    }

    async updateArticle(id: string, input: UpdateArticleInput): Promise<ArticleDto> {
        const existing = await articleRepository.findById(id);

        if (!existing) {
            throw AppError.notFound("Article");
        }

        const article = await articleRepository.update(id, {
            title: input.title,
            platform: input.platform,
            url: input.url,
            publishedDate: new Date(input.publishedDate),
            thumbnail: input.thumbnail || undefined,
        });

        return mapToDto(article);
    }

    async deleteArticle(id: string): Promise<void> {
        const existing = await articleRepository.findById(id);

        if (!existing) {
            throw AppError.notFound("Article");
        }

        await articleRepository.delete(id);
    }
}

export const articleService = new ArticleService();
