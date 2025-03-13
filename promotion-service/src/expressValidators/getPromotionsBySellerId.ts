import { param } from "express-validator";
const getPromotionsBySellerIdValidator = [
  param("id").notEmpty().isMongoId().withMessage("Geçerli bir id giriniz"),
];
export default getPromotionsBySellerIdValidator;
