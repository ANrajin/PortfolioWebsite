import { Router } from "express";
import { personalInfoController } from "../controllers/personal-info.controller.js";
import { validate } from "../../../shared/middleware/validate.middleware.js";
import { asyncHandler } from "../../../shared/utils/async-handler.js";
import { updatePersonalInfoSchema } from "../validators/personal-info.validator.js";

export const personalInfoRoutes = Router();

personalInfoRoutes.get("/", asyncHandler(personalInfoController.get.bind(personalInfoController)));
personalInfoRoutes.put("/", validate({ body: updatePersonalInfoSchema }), asyncHandler(personalInfoController.update.bind(personalInfoController)));
