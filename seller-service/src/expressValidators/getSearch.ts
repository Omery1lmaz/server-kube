import { param, query } from "express-validator";

const getSearchExpressValidator = [
  param("longitude")
    .isFloat()
    .withMessage("Longitude must be a valid number")
    .notEmpty()
    .withMessage("Longitude is required"),
  param("latitude")
    .isFloat()
    .withMessage("Latitude must be a valid number")
    .notEmpty()
    .withMessage("Latitude is required"),
  param("search").optional().isString().withMessage("Search must be a string"),
  query("limit")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Limit must be a positive integer"),
];

export default getSearchExpressValidator;
