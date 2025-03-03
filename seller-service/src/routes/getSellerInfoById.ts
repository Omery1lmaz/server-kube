import express from "express";
import { validateRequest } from "@heaven-nsoft/common";
import getSellerInfoByIdExpressValidator from "../expressValidators/getSellerInfoById";
import getSellerInfoByIdController from "../controllers/getSellerInfoById";

const router = express.Router();

router.post(
  "/check-register-email",
  getSellerInfoByIdExpressValidator,
  validateRequest,
  getSellerInfoByIdController
);

export { router as getSellerInfoByIdRouter };
