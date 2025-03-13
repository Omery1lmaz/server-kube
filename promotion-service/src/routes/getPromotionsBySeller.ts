import express from "express";
import getPromotionsBySellerController from "../controllers/getPromotionsBySeller";

const router = express.Router();

router.get("/seller", getPromotionsBySellerController);

export { router as getPromotionsBySellerRouter };
