import { body } from "express-validator";
const getPromotionByIdExpressValidator = [
  body("id").notEmpty().isMongoId().withMessage("Geçerli bir id giriniz"),
];
export default getPromotionByIdExpressValidator;
