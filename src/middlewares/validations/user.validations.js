import { body, param } from "express-validator";
import UserModel from "../../models/user.model.js";
import StudentModel from "../../models/student.model.js";
import { Op } from "sequelize";

export const createUserValidation = [
  
  body("name")
    .trim()
    .notEmpty()
      .withMessage("Campo name es obligatorio")
    .isString()
      .withMessage("Campo name debe ser una cadena de caracteres")
    .isLength({ min: 2, max: 50 })
      .withMessage("Campo name debe ser entre 2 y 50 caracteres"),

  body("email")
    .trim()
    .notEmpty()
      .withMessage("Campo email es obligatorio")
    .isEmail()
      .withMessage("Campo email debe usar el formato apropiado user@email.com")
    .custom(async (value) => {
      const foundUser = await UserModel.findOne({
        where: { email: value },
      });
      if (foundUser) {
        throw new Error("Este email ya esta registrado");
      }
    }),
      
  body("password")
    .trim()
    .notEmpty()
      .withMessage("Campo password es obligatorio")
    .isLength({ min: 2, max: 50 })
      .withMessage("Campo password debe ser entre 2 y 50 caracteres"),
      
  body("student_id")
    .trim()
    .notEmpty()
      .withMessage("Campo student_id es obligatorio")
    .isInt({min: 1})
      .withMessage("student_id debe ser un número entero positivo")
    .custom(async (value) => {
      const foundStudent = await StudentModel.findByPk(value);
      if (!foundStudent) {
        throw new Error("El estudiante no existe");
      }
    }),
];

export const updateUserValidation = [
  param("id")
    .isInt()
      .withMessage("El ID de búsqueda debe ser un entero positivo")
    .custom(async (value) => {
      const foundUser = await UserModel.findByPk(value);
      if (!foundUser) {
        throw new Error("El usuario no existe");
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

  body("email")
    .trim()
    .notEmpty()
      .withMessage("Campo email es obligatorio")
    .isEmail()
      .withMessage("Campo email debe usar el formato apropiado user@email.com")
    .custom(async (value,  { req }) => {
      const foundUser = await UserModel.findOne({
        where: { email: value, id: { [Op.ne]: req.params.id } },
      });
      if (foundUser) {
        throw new Error("Este email ya esta registrado");
      }
    }),
      
  body("password")
  .trim()
    .notEmpty()
      .withMessage("Campo password es obligatorio")
    .isLength({ min: 2, max: 50 })
      .withMessage("Campo password debe ser entre 2 y 50 caracteres"),
]

export const getUserByIDValidation = [
  param("id")
    .exists()
    .isInt({ min: 1 })
    .withMessage("El ID de búsqueda debe ser un número entero positivo")
    .custom(async (value) => {
      const foundUser = await UserModel.findByPk(value);
      if (!foundUser) {
        throw new Error("El usuario no existe");
      }
    }),
];

export const deleteUserValidation = [
  param("id")
    .exists()
    .isInt({ min: 1 })
    .withMessage("El ID de búsqueda debe ser un numero entero positivo")
    .custom(async (value) => {
      const foundUser = await UserModel.findByPk(value);
      if (!foundUser) {
        throw new Error("El usuario no existe");
      }
    }),
];