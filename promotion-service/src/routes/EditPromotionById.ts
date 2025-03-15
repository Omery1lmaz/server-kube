import express from "express";
import EditPromotionByIdController from "../controllers/EditPromotionById";
import editPromotionByIdExpressValidator from "../expressValidators/EditPromotionById";

const router = express.Router();

router.post(
  "/:id",
  editPromotionByIdExpressValidator,
  EditPromotionByIdController
);

export { router as EditPromotionByIdRouter };
