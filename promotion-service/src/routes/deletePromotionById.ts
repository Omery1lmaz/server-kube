import express from "express";
import deletePromotionByIdExpressValidator from "../expressValidators/deletePromotionById";
import deletePromotionByIdController from "../controllers/deletePromotionById";

const router = express.Router();

router.delete(
  "/:id",
  deletePromotionByIdExpressValidator,
  deletePromotionByIdController
);

export { router as deletePromotionByIdRouter };
