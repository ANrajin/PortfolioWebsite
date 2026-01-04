import type { Request, Response } from "express";
import { educationService } from "../services/education.service.js";
import type { ApiResponse } from "@/shared/types/api.types.js";
import type { EducationDto } from "../types/education.types.js";
import type { CreateEducationInput, UpdateEducationInput } from "../validators/education.validator.js";

export class EducationController {
    async getAll(req: Request, res: Response<ApiResponse<EducationDto[]>>): Promise<void> {
        const educations = await educationService.getAllEducation();
        res.json({ success: true, data: educations });
    }

    async getById(req: Request, res: Response<ApiResponse<EducationDto>>): Promise<void> {
        const id = req.params.id as string;
        const education = await educationService.getEducationById(id);
        res.json({ success: true, data: education });
    }

    async create(req: Request, res: Response<ApiResponse<EducationDto>>): Promise<void> {
        const input = req.body as CreateEducationInput;
        const education = await educationService.createEducation(input);
        res.status(201).json({ success: true, data: education });
    }

    async update(req: Request, res: Response<ApiResponse<EducationDto>>): Promise<void> {
        const id = req.params.id as string;
        const input = req.body as UpdateEducationInput;
        const education = await educationService.updateEducation(id, input);
        res.json({ success: true, data: education });
    }

    async delete(req: Request, res: Response<ApiResponse<null>>): Promise<void> {
        const id = req.params.id as string;
        await educationService.deleteEducation(id);
        res.status(204).send();
    }
}

export const educationController = new EducationController();
