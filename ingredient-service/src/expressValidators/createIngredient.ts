import { param } from "express-validator";
const createIngredientExpressValidator = [
  param("ingredient").notEmpty().isObject().withMessage("Token gereklidir"),
];

export default createIngredientExpressValidator;
