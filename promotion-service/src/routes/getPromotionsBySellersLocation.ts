import express from "express";
import getPromotionsBySellersLocationValidator from "../expressValidators/getPromotionsBySellersLocation";
import getPromotionsBySellersLocationController from "../controllers/getPromotionsBySellersLocation";

const router = express.Router();

router.get(
  "/get-sellers/:latitude/:longitude/:promotionId",
  getPromotionsBySellersLocationValidator,
  getPromotionsBySellersLocationController
);

export { router as getPromotionsBySellersLocationRouter };
