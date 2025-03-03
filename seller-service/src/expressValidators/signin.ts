import { param, query } from "express-validator";
const signinExpressValidator = [
  body("email")
    .isEmail()
    .withMessage("Geçerli bir e-posta adresi giriniz")
    .normalizeEmail(),
  body("password").isString().notEmpty().withMessage("Şifre gereklidir"),
];
export default signinExpressValidator;

import { body } from "express-validator";
