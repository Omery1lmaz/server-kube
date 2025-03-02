import { body } from "express-validator";
const updateUserNameExpressValidator = [
  body("name").isString().isLength({ min: 3 }).withMessage("name gereklidir"),
];
export default updateUserNameExpressValidator;
