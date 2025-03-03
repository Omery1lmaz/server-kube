import { body } from "express-validator";
const getSellerInfoExpressValidator = [
  body("id").isString().notEmpty().withMessage("id gereklidir"),
];
export default getSellerInfoExpressValidator;
