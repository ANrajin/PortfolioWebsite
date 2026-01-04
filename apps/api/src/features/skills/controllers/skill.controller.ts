import type { Request, Response } from "express";
import { skillService } from "../services/skill.service.js";
import type { ApiResponse } from "../../../shared/types/api.types.js";
import type { SkillDto } from "../types/skill.types.js";
import type { CreateSkillInput, UpdateSkillInput } from "../validators/skill.validator.js";

export class SkillController {
    async getAll(req: Request, res: Response<ApiResponse<SkillDto[]>>): Promise<void> {
        const skills = await skillService.getAllSkills();
        res.json({ success: true, data: skills });
    }

    async getById(req: Request, res: Response<ApiResponse<SkillDto>>): Promise<void> {
        const id = req.params.id as string;
        const skill = await skillService.getSkillById(id);
        res.json({ success: true, data: skill });
    }

    async create(req: Request, res: Response<ApiResponse<SkillDto>>): Promise<void> {
        const input = req.body as CreateSkillInput;
        const skill = await skillService.createSkill(input);
        res.status(201).json({ success: true, data: skill });
    }

    async update(req: Request, res: Response<ApiResponse<SkillDto>>): Promise<void> {
        const id = req.params.id as string;
        const input = req.body as UpdateSkillInput;
        const skill = await skillService.updateSkill(id, input);
        res.json({ success: true, data: skill });
    }

    async delete(req: Request, res: Response<ApiResponse<null>>): Promise<void> {
        const id = req.params.id as string;
        await skillService.deleteSkill(id);
        res.status(204).send();
    }
}

export const skillController = new SkillController();
