import { body, param } from "express-validator";
import TagModel from "../../models/tag.model.js";
 
export const createTagValidation = [
  
  body("name")
    .trim()
    .notEmpty()
      .withMessage("Campo name es obligatorio")
    .isString()
      .withMessage("Campo name debe ser una cadena de caracteres")
    .isLength({ min: 2, max: 30 })
      .withMessage("Campo name debe ser entre 2 y 30 caracteres")
    .matches(/^[^\s]+$/)
      .withMessage("Campo name no puede contener espacios")
    .custom(async (value) => {
      const foundTag = await TagModel.findOne({
        where: { name: value },
      });
      if (foundTag) {
        throw new Error("Este nombre de tag ya esta registrado");
      };
    }),
];

export const updateTagValidation = [
  param("id")
    .isInt()
      .withMessage("El ID de búsqueda debe ser un entero positivo")
    .custom(async (value) => {
      const foundTag = await TagModel.findByPk(value);
      if (!foundTag) {
        throw new Error("La tag que desea modificar no existe");
      };
    }),
  
  body("name")
    .trim()
    .notEmpty()
      .withMessage("Campo name es obligatorio")
    .isString()
      .withMessage("Campo name debe ser una cadena de caracteres")
    .isLength({ min: 2, max: 30 })
      .withMessage("Campo name debe ser entre 2 y 30 caracteres")
    .matches(/^[^\s]+$/)
      .withMessage("Campo name no puede contener espacios")
    .custom(async (value) => {
      const foundTag = await TagModel.findOne({
        where: { name: value },
      });
      if (foundTag) {
        throw new Error("Este nombre de tag ya esta registrado");
      };
    }),
];

export const getTagByIDValidation = [
  param("id")
    .exists()
    .isInt({ min: 1 })
    .withMessage("El ID de búsqueda debe ser un número entero positivo")
    .custom(async (value) => {
      const foundTag = await TagModel.findByPk(value);
      if (!foundTag) {
        throw new Error("La tag buscada no existe");
      };
    }),
];

export const deleteTagValidation = [
  param("id")
    .exists()
    .isInt({ min: 1 })
    .withMessage("El ID de búsqueda debe ser un numero entero positivo")
    .custom(async (value) => {
      const foundTag = await TagModel.findByPk(value);
      if (!foundTag) {
        throw new Error("La tag que desea eliminar no existe");
      };
    }),
];