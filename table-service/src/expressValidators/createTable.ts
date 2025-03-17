import { body } from "express-validator";

const createTableExpressValidator = [
  body("name")
    .notEmpty()
    .withMessage("Table name is required")
    .isString()
    .withMessage("Table name must be a string"),
  body("active").optional().isBoolean().withMessage("Active must be a boolean"),
  body("reserved")
    .optional()
    .isBoolean()
    .withMessage("Reserved must be a boolean"),
];

export default createTableExpressValidator;
