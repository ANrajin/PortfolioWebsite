import { Router } from "express";
import { experienceController } from "../controllers/experience.controller.js";
import { validate } from "@/shared/middleware/validate.middleware.js";
import { asyncHandler } from "@/shared/utils/async-handler.js";
import { createExperienceSchema, updateExperienceSchema, experienceIdParamSchema } from "../validators/experience.validator.js";

export const experienceRoutes = Router();

experienceRoutes.get("/", asyncHandler(experienceController.getAll.bind(experienceController)));
experienceRoutes.get("/:id", validate({ params: experienceIdParamSchema }), asyncHandler(experienceController.getById.bind(experienceController)));
experienceRoutes.post("/", validate({ body: createExperienceSchema }), asyncHandler(experienceController.create.bind(experienceController)));
experienceRoutes.put("/:id", validate({ params: experienceIdParamSchema, body: updateExperienceSchema }), asyncHandler(experienceController.update.bind(experienceController)));
experienceRoutes.delete("/:id", validate({ params: experienceIdParamSchema }), asyncHandler(experienceController.delete.bind(experienceController)));
