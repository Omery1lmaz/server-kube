import { body } from "express-validator";
const createKitchenExpressValidator = [
  body("kitchen.name").notEmpty().withMessage("Kitchen name is required"),
  body("kitchen.imageURL").optional().isURL().withMessage("Invalid image URL"),
];
export default createKitchenExpressValidator;
