import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";

import { articleRoutes } from "./features/articles/index.js";
import { certificationRoutes } from "./features/certifications/index.js";
import { contactRoutes } from "./features/contact/index.js";
import { educationRoutes } from "./features/education/index.js";
import { experienceRoutes } from "./features/experiences/index.js";
import { personalInfoRoutes } from "./features/personal-info/index.js";
import { portfolioRoutes } from "./features/portfolio/index.js";
import { projectRoutes } from "./features/projects/index.js";
import { skillRoutes } from "./features/skills/index.js";
import { uploadRoutes } from "./features/upload/index.js";
import { startMessageProcessor } from "./features/message-queue/index.js";
import { errorHandler } from "./shared/middleware/error-handler.middleware.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
    origin: ["http://localhost:3005", "http://localhost:3000"],
    credentials: true,
}));
app.use(express.json());

app.use("/api/portfolio", portfolioRoutes);
app.use("/api/personal-info", personalInfoRoutes);
app.use("/api/experiences", experienceRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/certifications", certificationRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/upload", uploadRoutes);

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`🚀 API server running at http://localhost:${PORT}`);
    startMessageProcessor();
});
