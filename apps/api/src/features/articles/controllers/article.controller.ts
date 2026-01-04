import type { Request, Response } from "express";
import { articleService } from "../services/article.service.js";
import type { ApiResponse } from "../../../shared/types/api.types.js";
import type { ArticleDto } from "../types/article.types.js";
import type { CreateArticleInput, UpdateArticleInput } from "../validators/article.validator.js";

export class ArticleController {
    async getAll(req: Request, res: Response<ApiResponse<ArticleDto[]>>): Promise<void> {
        const articles = await articleService.getAllArticles();
        res.json({ success: true, data: articles });
    }

    async getById(req: Request, res: Response<ApiResponse<ArticleDto>>): Promise<void> {
        const id = req.params.id as string;
        const article = await articleService.getArticleById(id);
        res.json({ success: true, data: article });
    }

    async create(req: Request, res: Response<ApiResponse<ArticleDto>>): Promise<void> {
        const input = req.body as CreateArticleInput;
        const article = await articleService.createArticle(input);
        res.status(201).json({ success: true, data: article });
    }

    async update(req: Request, res: Response<ApiResponse<ArticleDto>>): Promise<void> {
        const id = req.params.id as string;
        const input = req.body as UpdateArticleInput;
        const article = await articleService.updateArticle(id, input);
        res.json({ success: true, data: article });
    }

    async delete(req: Request, res: Response<ApiResponse<null>>): Promise<void> {
        const id = req.params.id as string;
        await articleService.deleteArticle(id);
        res.status(204).send();
    }
}

export const articleController = new ArticleController();
