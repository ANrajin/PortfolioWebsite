import { Router } from "express";
import { portfolioController } from "../controllers/portfolio.controller.js";
import { asyncHandler } from "@/shared/utils/async-handler.js";

export const portfolioRoutes = Router();

portfolioRoutes.get("/", asyncHandler(portfolioController.getFullPortfolio.bind(portfolioController)));
