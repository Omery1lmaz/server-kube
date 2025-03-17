import { param, body } from "express-validator";
const getOrdersBySellerLimitExpressValidator = [
  param("limit")
    .isInt({ min: 1 })
    .withMessage("Limit must be a positive integer"),
  param("skip")
    .isInt({ min: 0 })
    .withMessage("Skip must be a non-negative integer"),
  body("query").optional().isObject().withMessage("Query must be an object"),
];
export default getOrdersBySellerLimitExpressValidator;
