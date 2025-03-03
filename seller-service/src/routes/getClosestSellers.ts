import express from "express";
import { validateRequest } from "@heaven-nsoft/common";
import getClosestSellersExpressValidator from "../expressValidators/getClosestSellers";
import getClosestSellersController from "../controllers/getClosestSellers";

const router = express.Router();

router.post(
  "/get-closest-restaurants/:longitude/:latitude",
  getClosestSellersExpressValidator,
  validateRequest,
  getClosestSellersController
);

export { router as getClosestSellersRouter };
