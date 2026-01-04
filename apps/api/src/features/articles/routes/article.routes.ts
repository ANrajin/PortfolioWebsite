import { Router } from "express";
import { articleController } from "../controllers/article.controller.js";
import { validate } from "../../../shared/middleware/validate.middleware.js";
import { asyncHandler } from "../../../shared/utils/async-handler.js";
import {
    createArticleSchema,
    updateArticleSchema,
    articleIdParamSchema,
} from "../validators/article.validator.js";

export const articleRoutes = Router();

articleRoutes.get(
    "/",
    asyncHandler(articleController.getAll.bind(articleController))
);

articleRoutes.get(
    "/:id",
    validate({ params: articleIdParamSchema }),
    asyncHandler(articleController.getById.bind(articleController))
);

articleRoutes.post(
    "/",
    validate({ body: createArticleSchema }),
    asyncHandler(articleController.create.bind(articleController))
);

articleRoutes.put(
    "/:id",
    validate({ params: articleIdParamSchema, body: updateArticleSchema }),
    asyncHandler(articleController.update.bind(articleController))
);

articleRoutes.delete(
    "/:id",
    validate({ params: articleIdParamSchema }),
    asyncHandler(articleController.delete.bind(articleController))
);
