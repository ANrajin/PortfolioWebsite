import type { Request, Response } from "express";
import { portfolioService } from "../services/portfolio.service.js";
import type { ApiResponse } from "../../../shared/types/api.types.js";
import type { PortfolioDto } from "../types/portfolio.types.js";

export class PortfolioController {
    async getFullPortfolio(req: Request, res: Response<ApiResponse<PortfolioDto>>): Promise<void> {
        const portfolio = await portfolioService.getFullPortfolio();
        res.json({ success: true, data: portfolio });
    }
}

export const portfolioController = new PortfolioController();
