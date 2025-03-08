import { param } from "express-validator";
const getPromotionsByLocationValidator = [
  param("latitude")
    .notEmpty()
    .isFloat()
    .withMessage("Geçerli bir latitude giriniz"),
  param("longitude")
    .notEmpty()
    .isFloat()
    .withMessage("Geçerli bir longitude giriniz"),
];
export default getPromotionsByLocationValidator;
