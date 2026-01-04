import { Router, Request } from "express";
import multer from "multer";
import path from "path";
import { uploadController } from "../controllers/upload.controller.js";
import { validate } from "../../../shared/middleware/validate.middleware.js";
import { asyncHandler } from "../../../shared/utils/async-handler.js";
import { filenameParamSchema } from "../validators/upload.validator.js";

const uploadDir = path.join(process.cwd(), "uploads/certificates");

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, `cert-${uniqueSuffix}${ext}`);
    },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedTypes = ["application/pdf", "image/png", "image/jpeg", "image/jpg"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type. Only PDF, PNG, and JPEG are allowed."));
    }
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });

export const uploadRoutes = Router();

uploadRoutes.post(
    "/certificate",
    upload.single("file"),
    asyncHandler(async (req, res) => uploadController.upload(req, res))
);

uploadRoutes.delete(
    "/certificate/:filename",
    validate({ params: filenameParamSchema }),
    asyncHandler(async (req, res) => uploadController.delete(req, res))
);
