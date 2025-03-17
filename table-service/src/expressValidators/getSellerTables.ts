import { param } from "express-validator";

const getSellerTablesExpressValidator = [
  param("id")
    .notEmpty()
    .withMessage("Table name is required")
    .isMongoId()
    .withMessage("Table name must be a string"),
];

export default getSellerTablesExpressValidator;
