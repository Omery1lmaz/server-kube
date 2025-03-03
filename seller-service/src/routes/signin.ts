import express from "express";
import { validateRequest } from "@heaven-nsoft/common";
import signinExpressValidator from "../expressValidators/signin";
import { signinController } from "../controllers/signin";

const router = express.Router();

router.post(
  "/signin",
  signinExpressValidator,
  validateRequest,
  signinController
);

export { router as signinRouter };
