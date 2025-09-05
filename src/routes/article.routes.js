import { Router } from "express";
import {
    createArticle, 
    listAllArticle,
    listArticleById,
    deleteArticle,
    updateArticle
} from "../controllers/article.controllers.js";

import { validator } from "../middlewares/validator.js";
import { 
    createArticleValidation,
    getArticleByIDValidation,
    deleteArticleValidation, 
    updateArticleValidation 
} from "../middlewares/validations/article.validations.js";

const articleRoutes = Router();
articleRoutes.post("/articles", createArticleValidation, validator, createArticle)
articleRoutes.get("/articles", listAllArticle)
articleRoutes.get("/articles/:id", getArticleByIDValidation, validator, listArticleById)
articleRoutes.delete("/articles/:id", deleteArticleValidation, validator, deleteArticle)
articleRoutes.put("/articles/:id", updateArticleValidation, validator, updateArticle)

export default articleRoutes