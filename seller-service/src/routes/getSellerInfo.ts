import express from "express";
import { validateRequest } from "@heaven-nsoft/common";
import getSellerInfoExpressValidator from "../expressValidators/getSellerInfo";
import getSellerInfoController from "../controllers/getSellerInfo";

const router = express.Router();

router.post(
  "/info",
  getSellerInfoExpressValidator,
  validateRequest,
  getSellerInfoController
);

export { router as getSellerInfoRouter };
