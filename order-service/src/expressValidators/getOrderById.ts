import { param } from "express-validator";
const getOrderByIdExpressValidator = [
  param("id")
    .isEmpty()
    .isString()
    .isMongoId()
    .withMessage("id must be a string"),
];
export default getOrderByIdExpressValidator;
