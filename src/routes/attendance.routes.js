import { Router } from "express";
import {
    createAttendance, 
    listAllAttendance,
    listAttendanceById,
    deleteAttendance,
    updateAttendance
} from "../controllers/attendance.controllers.js";

import { validator } from "../middlewares/validator.js";
import { 
    createAttendanceValidation,
    deleteAttendanceValidation, 
    getAttendanceByIDValidation, 
    updateAttendanceValidation 
} from "../middlewares/validations/attendance.validations.js";

const attendanceRoutes = Router();
attendanceRoutes.post("/attendances", createAttendanceValidation, validator, createAttendance)
attendanceRoutes.get("/attendances", listAllAttendance)
attendanceRoutes.get("/attendances/:id", getAttendanceByIDValidation, validator, listAttendanceById)
attendanceRoutes.delete("/attendances/:id", deleteAttendanceValidation, validator, deleteAttendance)
attendanceRoutes.put("/attendances/:id", updateAttendanceValidation, validator, updateAttendance)

export default attendanceRoutes