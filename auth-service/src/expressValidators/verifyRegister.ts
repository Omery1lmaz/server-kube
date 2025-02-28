import { param } from "express-validator";
const verifyRegisterExpressValidator = [
  param("token").notEmpty().withMessage("Token gereklidir"),
  param("otp").isNumeric().withMessage("OTP sadece rakamlardan oluşmalıdır"),
];

export default verifyRegisterExpressValidator;
