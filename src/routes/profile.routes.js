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
    createProfileValidation,
    getProfileByIDValidation,
    deleteProfileValidation, 
    updateProfileValidation 
} from "../middlewares/validations/profile.validations.js";

const profileRoutes = Router();
profileRoutes.post("/profiles", createProfileValidation, validator, createProfile)
profileRoutes.get("/profiles", listAllProfile)
profileRoutes.get("/profiles/:id", getProfileByIDValidation, validator, listProfileById)
profileRoutes.put("/profiles/:id", deleteProfileValidation, validator, deleteProfile)
profileRoutes.delete("/profiles/:id", updateProfileValidation, validator, updateProfile)

export default profileRoutes