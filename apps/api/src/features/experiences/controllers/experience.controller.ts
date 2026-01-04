import type { Request, Response } from "express";
import { experienceService } from "../services/experience.service.js";
import type { ApiResponse } from "@/shared/types/api.types.js";
import type { ExperienceDto } from "../types/experience.types.js";
import type { CreateExperienceInput, UpdateExperienceInput } from "../validators/experience.validator.js";

export class ExperienceController {
    async getAll(req: Request, res: Response<ApiResponse<ExperienceDto[]>>): Promise<void> {
        const experiences = await experienceService.getAllExperiences();
        res.json({ success: true, data: experiences });
    }

    async getById(req: Request, res: Response<ApiResponse<ExperienceDto>>): Promise<void> {
        const id = req.params.id as string;
        const experience = await experienceService.getExperienceById(id);
        res.json({ success: true, data: experience });
    }

    async create(req: Request, res: Response<ApiResponse<ExperienceDto>>): Promise<void> {
        const input = req.body as CreateExperienceInput;
        const experience = await experienceService.createExperience(input);
        res.status(201).json({ success: true, data: experience });
    }

    async update(req: Request, res: Response<ApiResponse<ExperienceDto>>): Promise<void> {
        const id = req.params.id as string;
        const input = req.body as UpdateExperienceInput;
        const experience = await experienceService.updateExperience(id, input);
        res.json({ success: true, data: experience });
    }

    async delete(req: Request, res: Response<ApiResponse<null>>): Promise<void> {
        const id = req.params.id as string;
        await experienceService.deleteExperience(id);
        res.status(204).send();
    }
}

export const experienceController = new ExperienceController();
