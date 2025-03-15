import { param, body } from "express-validator";
const editPromotionByIdExpressValidator = [
  param("id").isMongoId().withMessage("Invalid promotion ID"),
  body("promotion.name")
    .isString()
    .notEmpty()
    .withMessage("Name is required and must be a string"),
  body("promotion.price").isNumeric().withMessage("Price must be a number"),
  body("promotion.lowestPrice")
    .isNumeric()
    .withMessage("Lowest price must be a number"),
  body("promotion.highestPrice")
    .isNumeric()
    .withMessage("Highest price must be a number"),
  body("promotion.maximumUsageRights")
    .isInt({ min: 1 })
    .withMessage("Maximum usage rights must be at least 1"),
  body("promotion.active")
    .isBoolean()
    .withMessage("Active must be a boolean value"),
];
export default editPromotionByIdExpressValidator;
