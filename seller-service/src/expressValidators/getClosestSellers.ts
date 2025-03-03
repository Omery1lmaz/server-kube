import { param, query } from "express-validator";
const getClosestSellersExpressValidator = [
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

  query("distance")
    .optional()
    .isFloat({ min: 100 })
    .withMessage("Distance must be at least 100 meters"),

  query("limit")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Limit must be a positive integer"),
];
export default getClosestSellersExpressValidator;
