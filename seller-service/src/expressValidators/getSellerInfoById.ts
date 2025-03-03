import { body } from "express-validator";
const getSellerInfoByIdExpressValidator = [
  body("id").isString().notEmpty().withMessage("id gereklidir"),
];
export default getSellerInfoByIdExpressValidator;
