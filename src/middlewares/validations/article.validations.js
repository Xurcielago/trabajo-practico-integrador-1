import { body, param } from "express-validator";
import ArticleModel from "../../models/article.model.js";
import UserModel from "../../models/user.model.js";
 
export const createArticleValidation = [
  
  body("title")
      .trim()
      .notEmpty()
        .withMessage("Campo title es obligatorio")
      .isLength({ min: 3, max: 200 })
        .withMessage("Campo title debe tener entre 3 y 200 caracteres"),

  body("content")
    .trim()
    .notEmpty()
      .withMessage("Campo content es obligatorio")
    .isLength({ min: 50 })
      .withMessage("Campo content debe tener al menos 50 caracteres"),

  body("excerpt")
    .optional()
    .isLength({ max: 500 })
      .withMessage("Campo excerpt no puede superar los 500 caracteres"),

  body("status")
    .notEmpty()
      .withMessage("Campo status es obligatorio")
    .isIn(["published", "archived"])
      .withMessage("Campo status solo puede ser 'published' o 'archived'"),

  body("user_id")
    .notEmpty()
      .withMessage("Campo user_id es obligatorio")
    .isInt()
      .withMessage("Campo user_id debe ser un número entero")
    .custom(async (value) => {
      const foundArticle = await UserModel.findByPk(value);
      if (!foundArticle) {
        throw new Error("El usuario no existe");
      }
  }),
];

export const updateArticleValidation = [
  param("id")
    .isInt()
      .withMessage("El ID de búsqueda debe ser un entero positivo")
    .custom(async (value) => {
      const foundArticle = await ArticleModel.findByPk(value);
      if (!foundArticle) {
        throw new Error("La tag que desea modificar no existe");
      };
    }),
  
  body("title")
    .trim()
    .notEmpty()
      .withMessage("Campo title es obligatorio")
    .isLength({ min: 3, max: 200 })
      .withMessage("Campo title debe tener entre 3 y 200 caracteres"),

  body("content")
    .trim()
    .notEmpty()
      .withMessage("Campo content es obligatorio")
    .isLength({ min: 50 })
      .withMessage("Campo content debe tener al menos 50 caracteres"),

  body("excerpt")
    .optional()
    .isLength({ max: 500 })
      .withMessage("Campo excerpt no puede superar los 500 caracteres"),

  body("status")
    .notEmpty()
      .withMessage("Campo status es obligatorio")
    .isIn(["published", "archived"])
      .withMessage("Campo status solo puede ser 'published' o 'archived'"),

  body("user_id")
    .notEmpty()
      .withMessage("Campo user_id es obligatorio")
    .isInt()
      .withMessage("Campo user_id debe ser un número entero")
    .custom(async (value) => {
      const foundStudent = await UserModel.findByPk(value);
      if (!foundStudent) {
        throw new Error("El article no existe");
      }
  }),
];

export const getArticleByIDValidation = [
  param("id")
    .exists()
    .isInt({ min: 1 })
    .withMessage("El ID de búsqueda debe ser un número entero positivo")
    .custom(async (value) => {
      const foundArticle = await ArticleModel.findByPk(value);
      if (!foundArticle) {
        throw new Error("El article buscado no existe");
      };
    }),
];

export const deleteArticleValidation = [
  param("id")
    .exists()
    .isInt({ min: 1 })
    .withMessage("El ID de búsqueda debe ser un numero entero positivo")
    .custom(async (value) => {
      const foundArticle = await ArticleModel.findByPk(value);
      if (!foundArticle) {
        throw new Error("El article que desea eliminar no existe");
      };
    }),
];