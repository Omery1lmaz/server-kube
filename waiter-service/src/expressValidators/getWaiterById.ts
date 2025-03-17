import { param } from "express-validator";
const getWaiterByIdExpressValidator = [
  param("id").notEmpty().isMongoId().withMessage("id name is required"),
];
export default getWaiterByIdExpressValidator;
