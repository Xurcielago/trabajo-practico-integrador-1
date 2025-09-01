import { body, param } from "express-validator";
import AttendanceModel from "../../models/attendance.model.js";
 
 export const createAttendanceValidation = [
  
  body("status")
    .trim()
    .notEmpty()
      .withMessage("Campo status es obligatorio")
    .isString()
      .withMessage("Campo status debe ser una cadena de caracteres")
    .isLength({ min: 2, max: 50 })
      .withMessage("Campo status debe ser entre 2 y 50 caracteres"),
];

export const updateAttendanceValidation = [
  param("id")
    .isInt()
      .withMessage("El ID de búsqueda debe ser un entero positivo")
    .custom(async (value) => {
      const foundAttendance = await AttendanceModel.findByPk(value);
      if (!foundAttendance) {
        throw new Error("El estudiante no existe");
      }
    }),
  
body("status")
    .trim()
    .notEmpty()
      .withMessage("Campo status es obligatorio")
    .isString()
      .withMessage("Campo status debe ser una cadena de caracteres")
    .isLength({ min: 2, max: 50 })
      .withMessage("Campo status debe ser entre 2 y 50 caracteres"),
];

export const getAttendanceByIDValidation = [
  param("id")
    .exists()
    .isInt({ min: 1 })
    .withMessage("El ID de búsqueda debe ser un número entero positivo")
    .custom(async (value) => {
      const foundAttendance = await AttendanceModel.findByPk(value);
      if (!foundAttendance) {
        throw new Error("El tipo de asistencia buscado no existe");
      }
    }),
];

export const deleteAttendanceValidation = [
  param("id")
    .exists()
    .isInt({ min: 1 })
    .withMessage("El ID de búsqueda debe ser un numero entero positivo")
    .custom(async (value) => {
      const foundAttendance = await AttendanceModel.findByPk(value);
      if (!foundAttendance) {
        throw new Error("El tipo de asistencia buscado no existe");
      }
    }),
];