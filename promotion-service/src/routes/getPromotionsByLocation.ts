import express from "express";
import createModifierGroup from "../controllers/create";
import getPromotionsByLocationValidator from "../expressValidators/getPromotionsByLocation";
import getPromotionsByLocationController from "../controllers/getPromotionsByLocation";

const router = express.Router();

router.get(
  "/get-promotions/:latitude/:longitude",
  getPromotionsByLocationValidator,
  getPromotionsByLocationController
);

export { router as getPromotionsByLocationRouter };
