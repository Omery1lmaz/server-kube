import express from "express";
import getPromotionByIdController from "./../controllers/getPromotionById";
import getPromotionByIdExpressValidator from "../expressValidators/getPromotionById";

const router = express.Router();

router.get(
  "/:id",
  getPromotionByIdExpressValidator,
  getPromotionByIdController
);

export { router as getPromotionByIdRouter };
