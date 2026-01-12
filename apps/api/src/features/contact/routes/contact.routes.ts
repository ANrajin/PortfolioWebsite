import { Router } from "express";
import { contactController } from "../controllers/contact.controller.js";
import { validate } from "@/shared/middleware/validate.middleware.js";
import { asyncHandler } from "@/shared/utils/async-handler.js";
import { contactFormSchema } from "../validators/contact.validator.js";

export const contactRoutes = Router();

contactRoutes.post(
    "/",
    validate({ body: contactFormSchema }),
    asyncHandler(contactController.submit.bind(contactController))
);
