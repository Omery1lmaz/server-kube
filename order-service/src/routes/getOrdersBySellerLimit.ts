import express from "express";
import addTiptoOrderExpressValidator from "../expressValidators/addTiptoOrder";
import addTiptoOrderController from "../controllers/addTiptoOrder";
import getOrdersBySellerLimitController from "../controllers/getOrdersBySellerLimit";
import getOrdersBySellerLimitExpressValidator from "../expressValidators/getOrdersBySellerLimit";

const router = express.Router();

router.put(
  "/order/seller/limit/:limit/:skip",
  getOrdersBySellerLimitExpressValidator,
  getOrdersBySellerLimitController
);

export { router as getOrdersBySellerLimitRouter };
