import { body, param } from "express-validator";
import StudentModel from "../../models/student.model.js";
 
 export const createStudentValidation = [
  
  body("name")
    .trim()
    .notEmpty()
      .withMessage("Campo name es obligatorio")
    .isString()
      .withMessage("Campo name debe ser una cadena de caracteres")
    .isLength({ min: 2, max: 50 })
      .withMessage("Campo name debe ser entre 2 y 50 caracteres"),

  body("surname")
    .trim()
    .notEmpty()
      .withMessage("Campo surname Es obligatorio")
    .isString()
      .withMessage("Campo name debe ser una cadena de caracteres")
    .isLength({ min: 2, max: 50 })
      .withMessage("Campo name debe ser entre 2 y 50 caracteres"),
      
  body("gender")
    .notEmpty()
      .withMessage("Campo gender es obligatorio")
    .custom(async (value) => {
      if (!((value == "M") || (value == "F"))) {
        throw new Error("Campo gender debe ser M o F");
      }
    }),
];

export const updateStudentValidation = [
  param("id")
    .isInt()
      .withMessage("El ID de búsqueda debe ser un entero positivo")
    .custom(async (value) => {
      const foundStudent = await StudentModel.findByPk(value);
      if (!foundStudent) {
        throw new Error("El estudiante no existe");
      }
    }),
  
body("name")
    .trim()
    .notEmpty()
      .withMessage("Campo name es obligatorio")
    .isString()
      .withMessage("Campo name debe ser una cadena de caracteres")
    .isLength({ min: 2, max: 50 })
      .withMessage("Campo name debe ser entre 2 y 50 caracteres"),

  body("surname")
    .trim()
    .notEmpty()
      .withMessage("Campo surname Es obligatorio")
    .isString()
      .withMessage("Campo name debe ser una cadena de caracteres")
    .isLength({ min: 2, max: 50 })
      .withMessage("Campo name debe ser entre 2 y 50 caracteres"),
      
  body("gender")
    .notEmpty()
      .withMessage("Campo gender es obligatorio")
    .custom(async (value) => {
      if (!((value == "M") || (value == "F"))) {
        throw new Error("Campo gender debe ser M o F");
      }
    }),
];

export const getStudentByIDValidation = [
  param("id")
    .exists()
    .isInt({ min: 1 })
    .withMessage("El ID de búsqueda debe ser un número entero positivo")
    .custom(async (value) => {
      const foundStudent = await StudentModel.findByPk(value);
      if (!foundStudent) {
        throw new Error("El estudiante no existe");
      }
    }),
];

export const deleteStudentValidation = [
  param("id")
    .exists()
    .isInt({ min: 1 })
    .withMessage("El ID de búsqueda debe ser un numero entero positivo")
    .custom(async (value) => {
      const foundStudent = await StudentModel.findByPk(value);
      if (!foundStudent) {
        throw new Error("El estudiante no existe");
      }
    }),
];
