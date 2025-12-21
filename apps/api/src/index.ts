import express from "express";
import cors from "cors";
import path from "path";
import { portfolioRouter } from "./routes/portfolio.js";
import { personalInfoRouter } from "./routes/personal-info.js";
import { experiencesRouter } from "./routes/experiences.js";
import { skillsRouter } from "./routes/skills.js";
import { projectsRouter } from "./routes/projects.js";
import { educationRouter } from "./routes/education.js";
import { articlesRouter } from "./routes/articles.js";
import { certificationsRouter } from "./routes/certifications.js";
import { uploadRouter } from "./routes/upload.js";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
    origin: ["http://localhost:3005", "http://localhost:3000"],
    credentials: true,
}));
app.use(express.json());

// Routes
app.use("/api/portfolio", portfolioRouter);
app.use("/api/personal-info", personalInfoRouter);
app.use("/api/experiences", experiencesRouter);
app.use("/api/skills", skillsRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/education", educationRouter);
app.use("/api/articles", articlesRouter);
app.use("/api/certifications", certificationsRouter);
app.use("/api/upload", uploadRouter);

// Serve uploaded files
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Health check
app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
    console.log(`🚀 API server running at http://localhost:${PORT}`);
});
