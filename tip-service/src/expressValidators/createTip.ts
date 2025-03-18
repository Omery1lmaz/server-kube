import { body } from "express-validator";

const createTipExpressValidator = [
  body("tip.cost")
    .isFloat({ min: 0 })
    .withMessage("Tip cost must be a positive number"),
  body("tip.waiter")
    .isArray({ min: 1 })
    .withMessage("At least one waiter must be provided"),
  body("seller").notEmpty().withMessage("Seller ID is required"),
];

export default createTipExpressValidator;
