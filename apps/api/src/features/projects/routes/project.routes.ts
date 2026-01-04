import { Router } from "express";
import { projectController } from "../controllers/project.controller.js";
import { validate } from "../../../shared/middleware/validate.middleware.js";
import { asyncHandler } from "../../../shared/utils/async-handler.js";
import { createProjectSchema, updateProjectSchema, projectIdParamSchema } from "../validators/project.validator.js";

export const projectRoutes = Router();

projectRoutes.get("/", asyncHandler(projectController.getAll.bind(projectController)));
projectRoutes.get("/:id", validate({ params: projectIdParamSchema }), asyncHandler(projectController.getById.bind(projectController)));
projectRoutes.post("/", validate({ body: createProjectSchema }), asyncHandler(projectController.create.bind(projectController)));
projectRoutes.put("/:id", validate({ params: projectIdParamSchema, body: updateProjectSchema }), asyncHandler(projectController.update.bind(projectController)));
projectRoutes.delete("/:id", validate({ params: projectIdParamSchema }), asyncHandler(projectController.delete.bind(projectController)));
