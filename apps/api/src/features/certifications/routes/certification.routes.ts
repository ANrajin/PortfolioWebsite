import { Router } from "express";
import { certificationController } from "../controllers/certification.controller.js";
import { validate } from "@/shared/middleware/validate.middleware.js";
import { asyncHandler } from "@/shared/utils/async-handler.js";
import {
    createCertificationSchema,
    updateCertificationSchema,
    certificationIdParamSchema,
} from "../validators/certification.validator.js";

export const certificationRoutes = Router();

certificationRoutes.get("/", asyncHandler(certificationController.getAll.bind(certificationController)));

certificationRoutes.get(
    "/:id",
    validate({ params: certificationIdParamSchema }),
    asyncHandler(certificationController.getById.bind(certificationController))
);

certificationRoutes.post(
    "/",
    validate({ body: createCertificationSchema }),
    asyncHandler(certificationController.create.bind(certificationController))
);

certificationRoutes.put(
    "/:id",
    validate({ params: certificationIdParamSchema, body: updateCertificationSchema }),
    asyncHandler(certificationController.update.bind(certificationController))
);

certificationRoutes.delete(
    "/:id",
    validate({ params: certificationIdParamSchema }),
    asyncHandler(certificationController.delete.bind(certificationController))
);
