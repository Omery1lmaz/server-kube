import { param, query } from "express-validator";
const getSearchByKitchenExpressValidator = [
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

  param("kitchen")
    .isMongoId()
    .withMessage("Kitchen ID must be a valid MongoDB ObjectId")
    .notEmpty()
    .withMessage("Kitchen ID is required"),

  query("limit")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Limit must be a positive integer"),
];
export default getSearchByKitchenExpressValidator;
