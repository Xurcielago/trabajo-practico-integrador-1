import { Router } from "express";
import {
    createUser, 
    listAllUser,  
    listUserById, 
    deleteUser, 
    updateUser
} from "../controllers/user.controllers.js"

import { validator } from "../middlewares/validator.js";
import { 
    createUserValidation,
    getUserByIDValidation,
    deleteUserValidation, 
    updateUserValidation
} from "../middlewares/validations/user.validations.js";

const userRoutes = Router();
userRoutes.post("/users", createUserValidation, validator, createUser)
userRoutes.get("/users", listAllUser)
userRoutes.get("/users/:id", getUserByIDValidation, validator, listUserById)
userRoutes.put("/users/:id", updateUserValidation, validator, updateUser)
userRoutes.delete("/users/:id", deleteUserValidation, validator, deleteUser)

export default userRoutes