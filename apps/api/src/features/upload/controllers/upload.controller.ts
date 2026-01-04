import type { Request, Response } from "express";
import { uploadService } from "../services/upload.service.js";
import type { ApiResponse } from "../../../shared/types/api.types.js";
import type { UploadResultDto } from "../types/upload.types.js";
import { AppError } from "../../../shared/errors/app-error.js";

export class UploadController {
    upload(req: Request, res: Response<ApiResponse<UploadResultDto>>): void {
        if (!req.file) {
            throw AppError.validation("No file uploaded");
        }
        const result = uploadService.processUpload(req.file);
        res.json({ success: true, data: result });
    }

    delete(req: Request, res: Response<ApiResponse<null>>): void {
        const filename = req.params.filename as string;
        uploadService.deleteFile(filename);
        res.status(204).send();
    }
}

export const uploadController = new UploadController();
