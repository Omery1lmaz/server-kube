import { param } from "express-validator";
const deletePromotionByIdExpressValidator = [
  param("id").isMongoId().withMessage("Invalid promotion ID"),
];
export default deletePromotionByIdExpressValidator;
