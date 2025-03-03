import express from "express";
import { validateRequest } from "@heaven-nsoft/common";
import signupExpressValidator from "../expressValidators/signup";
import signupController from "../controllers/signup";

const router = express.Router();

router.post(
  "/signup",
  signupExpressValidator,
  validateRequest,
  signupController
);

export { router as signupRouter };
