import type { Request, Response } from "express";
import { certificationService } from "../services/certification.service.js";
import type { ApiResponse } from "../../../shared/types/api.types.js";
import type { CertificationDto } from "../types/certification.types.js";
import type { CreateCertificationInput, UpdateCertificationInput } from "../validators/certification.validator.js";

export class CertificationController {
    async getAll(req: Request, res: Response<ApiResponse<CertificationDto[]>>): Promise<void> {
        const certifications = await certificationService.getAllCertifications();
        res.json({ success: true, data: certifications });
    }

    async getById(req: Request, res: Response<ApiResponse<CertificationDto>>): Promise<void> {
        const id = req.params.id as string;
        const certification = await certificationService.getCertificationById(id);
        res.json({ success: true, data: certification });
    }

    async create(req: Request, res: Response<ApiResponse<CertificationDto>>): Promise<void> {
        const input = req.body as CreateCertificationInput;
        const certification = await certificationService.createCertification(input);
        res.status(201).json({ success: true, data: certification });
    }

    async update(req: Request, res: Response<ApiResponse<CertificationDto>>): Promise<void> {
        const id = req.params.id as string;
        const input = req.body as UpdateCertificationInput;
        const certification = await certificationService.updateCertification(id, input);
        res.json({ success: true, data: certification });
    }

    async delete(req: Request, res: Response<ApiResponse<null>>): Promise<void> {
        const id = req.params.id as string;
        await certificationService.deleteCertification(id);
        res.status(204).send();
    }
}

export const certificationController = new CertificationController();
