import { param } from "express-validator";
const getPromotionsBySellersLocationValidator = [
  param("latitude")
    .notEmpty()
    .isFloat()
    .withMessage("Geçerli bir latitude giriniz"),
  param("longitude")
    .notEmpty()
    .isFloat()
    .withMessage("Geçerli bir longitude giriniz"),
  param("promotionId")
    .notEmpty()
    .isString()
    .withMessage("Geçerli bir promotionId giriniz"),
];
export default getPromotionsBySellersLocationValidator;
