import { param } from "express-validator";
const getWaitersBySellerIdExpressValidator = [
  param("id").notEmpty().isMongoId().withMessage("Waiter name is required"),
];
export default getWaitersBySellerIdExpressValidator;
