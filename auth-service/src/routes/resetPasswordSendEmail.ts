import express from "express";
import { validateRequest } from "@heaven-nsoft/common";
import updatePasswordExpressValidator from "../expressValidators/updatePassword";
import updatePasswordController from "../controllers/updatePassword";

const router = express.Router();

router.post(
  "/update-password",
  updatePasswordExpressValidator,
  validateRequest,
  updatePasswordController
);

export { router as resetPasswordSendEmailRouter };
