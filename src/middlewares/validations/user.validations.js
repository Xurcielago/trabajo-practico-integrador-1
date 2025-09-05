import { body, param } from "express-validator";
import UserModel from "../../models/user.model.js";

export const createUserValidation = [
  
  body("username")
    .trim()
    .notEmpty()
      .withMessage("Campo username es obligatorio")
    .isString()
      .withMessage("Campo username debe ser una cadena de caracteres")
    .isLength({ min: 3, max: 20 })
      .withMessage("Campo username debe ser entre 3 y 20 caracteres")
    .custom(async (value) => {
      const foundUser = await UserModel.findOne({
        where: { username: value },
      });
      if (foundUser) {
        throw new Error("Este nombre de usuario ya esta registrado");
      }
    }),

  body("email")
    .trim()
    .notEmpty()
      .withMessage("Campo email es obligatorio")
    .isEmail()
      .withMessage("Campo email debe usar el formato apropiado nombre@email.com")
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
      .withMessage("El campo password es obligatorio")
    .isLength({ min: 8 })
      .withMessage("Campo password debe tener al menos 8 caracteres")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
      .withMessage("Campo password debe contener al menos una mayúscula, una minúscula y un número"),
  
  body("role")
    .trim()
    .notEmpty()
      .withMessage("El campo role es obligatorio")
    .isIn(["admin", "user"])
      .withMessage("El campo role solo puede ser 'admin' o 'user'"),
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
  
  body("username")
    .trim()
    .notEmpty()
      .withMessage("Campo username es obligatorio")
    .isString()
      .withMessage("Campo username debe ser una cadena de caracteres")
    .isLength({ min: 3, max: 20 })
      .withMessage("Campo username debe ser entre 2 y 20 caracteres")
    .custom(async (value) => {
      const foundUser = await UserModel.findOne({
        where: { username: value },
      });
      if (foundUser) {
        throw new Error("Este nombre de usuario ya esta registrado");
      }
    }),

  body("email")
    .trim()
    .notEmpty()
      .withMessage("Campo email es obligatorio")
    .isEmail()
      .withMessage("Campo email debe usar el formato apropiado nombre@email.com")
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
      .withMessage("El campo password es obligatorio")
    .isLength({ min: 8 })
      .withMessage("Campo password debe tener al menos 8 caracteres")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
      .withMessage("Campo password debe contener al menos una mayúscula, una minúscula y un número"),
  
  body("role")
    .trim()
    .notEmpty()
      .withMessage("El campo role es obligatorio")
    .isIn(["admin", "user"])
      .withMessage("El campo role solo puede ser 'admin' o 'user'"),
]

export const getUserByIDValidation = [
  param("id")
    .exists()
    .isInt({ min: 1 })
    .withMessage("El ID de búsqueda debe ser un número entero positivo")
    .custom(async (value) => {
      const foundUser = await UserModel.findByPk(value);
      if (!foundUser) {
        throw new Error("El usuario que busca no existe");
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
        throw new Error("El usuario que se desea eliminar no existe");
      }
    }),
];