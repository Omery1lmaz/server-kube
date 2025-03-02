import { body } from "express-validator";
const checkRegisterEmailExpressValidator = [
  body("email").isString().isEmail().withMessage("name gereklidir"),
];
export default checkRegisterEmailExpressValidator;
