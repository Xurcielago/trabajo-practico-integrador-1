import { Router } from "express";
import { 
    createTag, 
    listAllTag,
    listTagById,
    deleteTag,
    updateTag
} from "../controllers/tag.controllers.js";

import { validator } from "../middlewares/validator.js";
import { 
    createTagValidation,
    getTagByIDValidation,
    deleteTagValidation,
    updateTagValidation
} from "../middlewares/validations/tag.validations.js";

const tagRoutes = Router();
tagRoutes.post("/tags", createTagValidation, validator, createTag)
tagRoutes.get("/tags", listAllTag)
tagRoutes.get("/tags/:id", getTagByIDValidation, validator, listTagById)
tagRoutes.delete("/tags/:id", deleteTagValidation, validator, deleteTag)
tagRoutes.put("/tags/:id", updateTagValidation, validator, updateTag)

export default tagRoutes