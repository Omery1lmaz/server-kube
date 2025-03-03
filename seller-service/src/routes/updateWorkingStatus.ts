import express from "express";
import { validateRequest } from "@heaven-nsoft/common";
import signupExpressValidator from "../expressValidators/signup";
import updateWorkingStatusController from "../controllers/updateWorkingStatus";
import updateWorkingStatusExpressValidator from "../expressValidators/updateWorkingStatus";

const router = express.Router();

router.post(
  "/is-working",
  updateWorkingStatusExpressValidator,
  validateRequest,
  updateWorkingStatusController
);

export { router as updateWorkingStatusRouter };
