import { Router } from "express";
import { 
    createArticleTag, 
    listAllArticleTag,
    listArticleTagById,
    deleteArticleTag,
    updateArticleTag
} from "../controllers/articleTag.controllers.js";

import { validator } from "../middlewares/validator.js";
import { 
    createTagArticleValidation,
    getTagArticleByIDValidation,
    deleteTagArticleValidation, 
    updateTagArticleValidation 
} from "../middlewares/validations/articleTag.validations.js";

const articleTagRoutes = Router();
articleTagRoutes.post("/articleTag", createTagArticleValidation, validator, createArticleTag)
articleTagRoutes.get("/articleTag", listAllArticleTag)
articleTagRoutes.get("/articleTag/:id", getTagArticleByIDValidation, validator, listArticleTagById)
articleTagRoutes.delete("/articleTag/:id", deleteTagArticleValidation, validator, deleteArticleTag)
articleTagRoutes.put("/articleTag/:id", updateTagArticleValidation, validator, updateArticleTag)

export default articleTagRoutes