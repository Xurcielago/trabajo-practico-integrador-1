import { body, param } from "express-validator";
import ArticleTagModel from "../../models/article_tag.model.js"; 

export const createArticleTagValidation = [
  body("article_id")
    .notEmpty()
    .withMessage("Campo article_id es obligatorio")
    .isInt({ min: 1 })
    .withMessage("Campo article_id debe ser un número entero positivo"),

  body("tag_id")
    .notEmpty()
    .withMessage("Campo article_id es obligatorio")
    .isInt({ min: 1 })
    .withMessage("Campo article_id debe ser un número entero positivo"),
];

export const updateArticleTagValidation = [
  param("id")
    .isInt()
      .withMessage("El ID de búsqueda debe ser un entero positivo")
    .custom(async (value) => {
      const foundArticle = await ArticleTagModel.findByPk(value);
      if (!foundArticle) {
        throw new Error("La tabla intermedia ArticleTag que desea modificar no existe");
      };
    }),
  body("article_id")
    .notEmpty()
    .withMessage("Campo article_id es obligatorio")
    .isInt({ min: 1 })
    .withMessage("Campo article_id debe ser un número entero positivo"),

  body("tag_id")
    .notEmpty()
    .withMessage("Campo article_id es obligatorio")
    .isInt({ min: 1 })
    .withMessage("Campo article_id debe ser un número entero positivo"),
];

export const getArticleTagByIDValidation = [
  param("id")
    .exists()
    .isInt({ min: 1 })
    .withMessage("El ID de búsqueda debe ser un número entero positivo")
    .custom(async (value) => {
      const foundArticle = await ArticleTagModel.findByPk(value);
      if (!foundArticle) {
        throw new Error("La tabla intermedia ArticleTag buscada no existe");
      };
    }),
];

export const deleteArticleTagValidation = [
  param("id")
    .exists()
    .isInt({ min: 1 })
    .withMessage("El ID de búsqueda debe ser un numero entero positivo")
    .custom(async (value) => {
      const foundArticle = await ArticleTagModel.findByPk(value);
      if (!foundArticle) {
        throw new Error("El article que desea eliminar no existe");
      };
    }),
];
