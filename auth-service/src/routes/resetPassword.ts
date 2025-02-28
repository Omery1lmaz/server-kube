import express from "express";
import { validateRequest } from "@heaven-nsoft/common";
import signinController from "../controllers/signin";
import googleSigninExpressValidator from "../expressValidators/googleSignin";
import googleSigninController from "../controllers/googleSignin";

const router = express.Router();

router.post(
  "/reset-password-verify/:otp/:token/:email/:password",
  googleSigninExpressValidator,
  validateRequest,
  googleSigninController
);

export { router as googleSigninRouter };
