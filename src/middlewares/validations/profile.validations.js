import { body, param } from "express-validator";
import ProfileModel from "../../models/profile.model.js";
 
export const createProfileValidation = [
  
  body("first_name")
    .trim()
    .notEmpty()
        .withMessage("El campo first_name es obligatorio")
    .isLength({ min: 2, max: 50 })
        .withMessage("El campo first_name debe tener entre 2 y 50 caracteres")
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
        .withMessage("El campo first_name solo puede contener letras"),

  body("last_name")
    .trim()
    .notEmpty()
        .withMessage("El campo last_name es obligatorio")
    .isLength({ min: 2, max: 50 })
        .withMessage("El campo last_name debe tener entre 2 y 50 caracteres")
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
        .withMessage("El campo last_name solo puede contener letras"),

  body("biography")
    .optional()
    .isLength({ max: 500 })
        .withMessage("El campo biography no puede superar los 500 caracteres"),

  body("avatar_url")
    .optional()
    .isURL()
        .withMessage("El campo avatar_url debe ser una URL válida"),
];

export const updateProfileValidation = [
  param("id")
    .isInt()
      .withMessage("El ID de búsqueda debe ser un entero positivo")
    .custom(async (value) => {
      const foundProfile = await ProfileModel.findByPk(value);
      if (!foundProfile) {
        throw new Error("El perfil que desea modificar no existe");
      };
    }),
  
  body("first_name")
    .trim()
    .notEmpty()
        .withMessage("El campo first_name es obligatorio")
    .isLength({ min: 2, max: 50 })
        .withMessage("El campo first_name debe tener entre 2 y 50 caracteres")
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
        .withMessage("El campo first_name solo puede contener letras"),

  body("last_name")
    .trim()
    .notEmpty()
        .withMessage("El campo last_name es obligatorio")
    .isLength({ min: 2, max: 50 })
        .withMessage("El campo last_name debe tener entre 2 y 50 caracteres")
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
        .withMessage("El campo last_name solo puede contener letras"),

  body("biography")
    .optional()
    .isLength({ max: 500 })
        .withMessage("El campo biography no puede superar los 500 caracteres"),

  body("avatar_url")
    .optional()
    .isURL()
        .withMessage("El campo avatar_url debe ser una URL válida"),
];

export const getProfileByIDValidation = [
  param("id")
    .exists()
    .isInt({ min: 1 })
    .withMessage("El ID de búsqueda debe ser un número entero positivo")
    .custom(async (value) => {
      const foundProfile = await ProfileModel.findByPk(value);
      if (!foundProfile) {
        throw new Error("El perfil buscado no existe");
      };
    }),
];

export const deleteProfileValidation = [
  param("id")
    .exists()
    .isInt({ min: 1 })
    .withMessage("El ID de búsqueda debe ser un numero entero positivo")
    .custom(async (value) => {
      const foundProfile = await ProfileModel.findByPk(value);
      if (!foundProfile) {
        throw new Error("El perfil que desea eliminar no existe");
      };
    }),
];