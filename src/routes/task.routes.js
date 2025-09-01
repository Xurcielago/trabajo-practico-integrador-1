import { Router } from "express";
import {
    createTask, 
    listAllTask,  
    listTaskById, 
    deleteTask, 
    updateTask
} from "../controllers/task.controllers.js"

import { validator } from "../middlewares/validator.js";

const taskRoutes = Router();
taskRoutes.post("/tasks", createTask)
taskRoutes.get("/tasks", listAllTask)
taskRoutes.get("/tasks/:id", listTaskById)
taskRoutes.put("/tasks/:id", updateTask)
taskRoutes.delete("/tasks/:id", deleteTask)

export default taskRoutes