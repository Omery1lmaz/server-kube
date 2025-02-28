import express from "express";
import { validateRequest } from "@heaven-nsoft/common";
import signinController from "../controllers/signin";
import googleSigninExpressValidator from "../expressValidators/googleSignin";
import googleSigninController from "../controllers/googleSignin";
import updatePhoneNumberExpressValidator from "../expressValidators/updatePhoneNumber";
import updatePhoneNumberController from "../controllers/updatePhoneNumber";

const router = express.Router();

router.post(
  "/update-phone-number",
  updatePhoneNumberExpressValidator,
  validateRequest,
  updatePhoneNumberController
);

export { router as updatePhoneNumberRouter };
