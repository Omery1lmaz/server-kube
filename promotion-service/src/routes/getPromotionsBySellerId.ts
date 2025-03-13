import express from "express";
import getPromotionsBySellerController from "../controllers/getPromotionsBySeller";
import getPromotionsBySellerIdValidator from "../expressValidators/getPromotionsBySellerId";

const router = express.Router();

router.get(
  "/seller/:id",
  getPromotionsBySellerIdValidator,
  getPromotionsBySellerController
);

export { router as getPromotionsBySellerRouter };
