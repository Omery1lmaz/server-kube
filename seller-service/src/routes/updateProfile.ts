import express from "express";
import { validateRequest } from "@heaven-nsoft/common";
import { signinController } from "../controllers/signin";
import updateProfileExpressValidator from "../expressValidators/updateProfile";
import updateProfileController from "../controllers/updateProfile";

const router = express.Router();

router.post(
  "/profile",
  updateProfileExpressValidator,
  validateRequest,
  updateProfileController
);

export { router as updateProfileRouter };
