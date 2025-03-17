import { body, param } from "express-validator";
const updateWaiterExpressValidator = [
  body("name").optional().notEmpty().withMessage("Waiter name cannot be empty"),
  param("id")
    .optional()
    .isMongoId()
    .notEmpty()
    .withMessage("Waiter name cannot be empty"),
];
export default updateWaiterExpressValidator;
