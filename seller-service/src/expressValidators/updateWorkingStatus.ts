import { body } from "express-validator";
const updateWorkingStatusExpressValidator = [
  body("isWorking")
    .isBoolean()
    .withMessage("Invalid input: 'isWorking' must be a boolean"),
];
export default updateWorkingStatusExpressValidator;
