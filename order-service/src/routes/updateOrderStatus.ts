import express from "express";
import updateOrderStatusExpressValidator from "../expressValidators/updateOrderStatus";
import updateOrderStatusController from "../controllers/updateOrderStatus";

const router = express.Router();

router.put(
  "/order/:id",
  updateOrderStatusExpressValidator,
  updateOrderStatusController
);

export { router as updateOrderStatusRouter };
