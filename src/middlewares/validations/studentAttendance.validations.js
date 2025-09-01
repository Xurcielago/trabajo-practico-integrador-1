import { body, param } from "express-validator";
import StudentAttendanceModel from "../../models/studentAttendance.model.js"; 
 
export const createStudentValidation = [
  
  body("student_id")
    .notEmpty()
      .withMessage("Campo student_id es obligatorio"),

  body("attendance_id")
    .notEmpty()
      .withMessage("Campo attendance_id Es obligatorio"),
      
  body("attendance_date")
    .notEmpty()
      .withMessage("Campo gender es obligatorio")
    .custom(async (value) => {
      if (!((value == "M") || (value == "F"))) {
        throw new Error("Campo gender debe ser M o F");
      }
    }),
];
