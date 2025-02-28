import { body } from "express-validator";
const updatePhoneNumberExpressValidator = [
  body("number").withMessage("number"),
];
export default updatePhoneNumberExpressValidator;
