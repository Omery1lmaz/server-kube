import express from "express";
import addTiptoOrderExpressValidator from "../expressValidators/addTiptoOrder";
import addTiptoOrderController from "../controllers/addTiptoOrder";

const router = express.Router();

router.post(
  "/order/tip/:id",
  addTiptoOrderExpressValidator,
  addTiptoOrderController
);

export { router as addTiptoOrderRouter };
