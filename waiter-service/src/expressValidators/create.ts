import { body } from "express-validator";
const createWaiterExpressValidator = [
  body("waiter.name").notEmpty().withMessage("Waiter name is required"),
];
export default createWaiterExpressValidator;
