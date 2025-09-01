import { Router } from "express";
import { 
    createStudentAttendance, 
    listAllStudentAttendance,
    listStudentAttendanceById,
    deleteStudentAttendance,
    updateStudentAttendance
} from "../controllers/studentAttendance.controllers.js";

import { validator } from "../middlewares/validator.js";

const studentAttendanceRoutes = Router();
studentAttendanceRoutes.post("/studentAttendances", createStudentAttendance)
studentAttendanceRoutes.get("/studentAttendances", listAllStudentAttendance)
studentAttendanceRoutes.get("/studentAttendances/:id", listStudentAttendanceById)
studentAttendanceRoutes.delete("/studentAttendance/:id", deleteStudentAttendance)
studentAttendanceRoutes.put("/studentAttendance/:id", updateStudentAttendance)

export default studentAttendanceRoutes