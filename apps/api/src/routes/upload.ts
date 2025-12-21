import { Router, Request, Response } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

export const uploadRouter = Router();

// Ensure upload directory exists
const uploadDir = path.join(process.cwd(), "uploads/certificates");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, `cert-${uniqueSuffix}${ext}`);
    },
});

// File filter for allowed types
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedTypes = ["application/pdf", "image/png", "image/jpeg", "image/jpg"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type. Only PDF, PNG, and JPEG are allowed."));
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// POST upload certificate media
uploadRouter.post("/certificate", upload.single("file"), (req: Request, res: Response) => {
    try {
        if (!req.file) {
            res.status(400).json({ error: "No file uploaded" });
            return;
        }

        const mediaType = req.file.mimetype === "application/pdf" ? "pdf" : "image";
        const mediaUrl = `/uploads/certificates/${req.file.filename}`;

        res.json({
            mediaUrl,
            mediaType,
            filename: req.file.filename,
        });
    } catch (error) {
        console.error("Error uploading file:", error);
        res.status(500).json({ error: "Failed to upload file" });
    }
});

// DELETE certificate media
uploadRouter.delete("/certificate/:filename", (req: Request, res: Response) => {
    try {
        const { filename } = req.params;
        const filePath = path.join(uploadDir, filename);

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            res.status(204).send();
        } else {
            res.status(404).json({ error: "File not found" });
        }
    } catch (error) {
        console.error("Error deleting file:", error);
        res.status(500).json({ error: "Failed to delete file" });
    }
});
