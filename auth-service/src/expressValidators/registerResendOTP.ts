import { param } from "express-validator";
const registerResendExpressValidator = [
  param("token").withMessage("token gereklidir"),
];
export default registerResendExpressValidator;
