import { param } from "express-validator";
const getIdIdExpressValidator = [
  param("id").notEmpty().withMessage("id gereklidir"),
];
export default getIdIdExpressValidator;
