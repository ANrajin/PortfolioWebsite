import type { Request, Response } from "express";
import { personalInfoService } from "../services/personal-info.service.js";
import type { ApiResponse } from "../../../shared/types/api.types.js";
import type { PersonalInfoDto } from "../types/personal-info.types.js";
import type { UpdatePersonalInfoInput } from "../validators/personal-info.validator.js";

export class PersonalInfoController {
    async get(req: Request, res: Response<ApiResponse<PersonalInfoDto | null>>): Promise<void> {
        const info = await personalInfoService.getPersonalInfo();
        res.json({ success: true, data: info });
    }

    async update(req: Request, res: Response<ApiResponse<PersonalInfoDto>>): Promise<void> {
        const input = req.body as UpdatePersonalInfoInput;
        const info = await personalInfoService.updatePersonalInfo(input);
        res.json({ success: true, data: info });
    }
}

export const personalInfoController = new PersonalInfoController();
