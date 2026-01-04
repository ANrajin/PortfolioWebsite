import { Router } from "express";
import { skillController } from "../controllers/skill.controller.js";
import { validate } from "../../../shared/middleware/validate.middleware.js";
import { asyncHandler } from "../../../shared/utils/async-handler.js";
import { createSkillSchema, updateSkillSchema, skillIdParamSchema } from "../validators/skill.validator.js";

export const skillRoutes = Router();

skillRoutes.get("/", asyncHandler(skillController.getAll.bind(skillController)));
skillRoutes.get("/:id", validate({ params: skillIdParamSchema }), asyncHandler(skillController.getById.bind(skillController)));
skillRoutes.post("/", validate({ body: createSkillSchema }), asyncHandler(skillController.create.bind(skillController)));
skillRoutes.put("/:id", validate({ params: skillIdParamSchema, body: updateSkillSchema }), asyncHandler(skillController.update.bind(skillController)));
skillRoutes.delete("/:id", validate({ params: skillIdParamSchema }), asyncHandler(skillController.delete.bind(skillController)));
