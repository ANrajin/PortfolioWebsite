import { Router } from "express";
import { educationController } from "../controllers/education.controller.js";
import { validate } from "@/shared/middleware/validate.middleware.js";
import { asyncHandler } from "@/shared/utils/async-handler.js";
import { createEducationSchema, updateEducationSchema, educationIdParamSchema } from "../validators/education.validator.js";

export const educationRoutes = Router();

educationRoutes.get("/", asyncHandler(educationController.getAll.bind(educationController)));
educationRoutes.get("/:id", validate({ params: educationIdParamSchema }), asyncHandler(educationController.getById.bind(educationController)));
educationRoutes.post("/", validate({ body: createEducationSchema }), asyncHandler(educationController.create.bind(educationController)));
educationRoutes.put("/:id", validate({ params: educationIdParamSchema, body: updateEducationSchema }), asyncHandler(educationController.update.bind(educationController)));
educationRoutes.delete("/:id", validate({ params: educationIdParamSchema }), asyncHandler(educationController.delete.bind(educationController)));
