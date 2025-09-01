import { Router } from "express";
import { 
    createStudent, 
    listAllStudent,
    listStudentById,
    deleteStudent,
    updateStudent
} from "../controllers/student.controllers.js";

import { validator } from "../middlewares/validator.js";
import { 
    createStudentValidation,
    updateStudentValidation,
    deleteStudentValidation,
    getStudentByIDValidation
} from "../middlewares/validations/student.validations.js";

const studentRoutes = Router();
studentRoutes.post("/students", createStudentValidation, validator, createStudent)
studentRoutes.get("/students", listAllStudent)
studentRoutes.get("/students/:id", getStudentByIDValidation, validator, listStudentById)
studentRoutes.delete("/students/:id", deleteStudentValidation, validator, deleteStudent)
studentRoutes.put("/students/:id", updateStudentValidation, validator, updateStudent)

export default studentRoutes