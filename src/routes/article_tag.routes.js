import { Router } from "express";
import { 
    createArticleTag, 
    listAllArticleTag,
    listArticleTagById,
    deleteArticleTag,
    updateArticleTag
} from "../controllers/article_tag.controllers.js";

import { validator } from "../middlewares/validator.js";
import { 
    createArticleTagValidation,
    getArticleTagByIDValidation,
    deleteArticleTagValidation, 
    updateArticleTagValidation 
} from "../middlewares/validations/article_tag.validations.js";

const articleTagRoutes = Router();
articleTagRoutes.post("/articleTag", createArticleTagValidation, validator, createArticleTag)
articleTagRoutes.get("/articleTag", listAllArticleTag)
articleTagRoutes.get("/articleTag/:id", getArticleTagByIDValidation, validator, listArticleTagById)
articleTagRoutes.delete("/articleTag/:id", deleteArticleTagValidation, validator, deleteArticleTag)
articleTagRoutes.put("/articleTag/:id", updateArticleTagValidation, validator, updateArticleTag)

export default articleTagRoutes