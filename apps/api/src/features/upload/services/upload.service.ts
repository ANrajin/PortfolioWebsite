import path from "path";
import fs from "fs";
import { AppError } from "../../../shared/errors/app-error.js";
import type { UploadResultDto } from "../types/upload.types.js";

const UPLOAD_DIR = path.join(process.cwd(), "uploads/certificates");

export class UploadService {
    constructor() {
        if (!fs.existsSync(UPLOAD_DIR)) {
            fs.mkdirSync(UPLOAD_DIR, { recursive: true });
        }
    }

    processUpload(file: Express.Multer.File): UploadResultDto {
        const mediaType = file.mimetype === "application/pdf" ? "pdf" : "image";
        const mediaUrl = `/uploads/certificates/${file.filename}`;
        return { mediaUrl, mediaType, filename: file.filename };
    }

    deleteFile(filename: string): void {
        const filePath = path.join(UPLOAD_DIR, filename);
        if (!fs.existsSync(filePath)) {
            throw AppError.notFound("File");
        }
        fs.unlinkSync(filePath);
    }
}

export const uploadService = new UploadService();
