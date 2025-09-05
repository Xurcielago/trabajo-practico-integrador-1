import { Router } from "express";
import {
    createProfile, 
    listAllProfile,  
    listProfileById, 
    deleteProfile, 
    updateProfile
} from "../controllers/profile.controllers.js"

import { validator } from "../middlewares/validator.js";
import { 
    createTagProfileValidation,
    getTagProfileByIDValidation,
    deleteTagProfileValidation, 
    updateTagProfileValidation 
} from "../middlewares/validations/profile.validations.js";

const profileRoutes = Router();
profileRoutes.post("/profiles", createTagProfileValidation, validator, createProfile)
profileRoutes.get("/profiles", listAllProfile)
profileRoutes.get("/profiles/:id", getTagProfileByIDValidation, validator, listProfileById)
profileRoutes.put("/profiles/:id", deleteTagProfileValidation, validator, deleteProfile)
profileRoutes.delete("/profiles/:id", updateTagProfileValidation, validator, updateProfile)

export default profileRoutes