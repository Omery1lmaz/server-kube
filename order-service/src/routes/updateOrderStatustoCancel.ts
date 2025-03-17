import express from "express";
import updateOrderStatustoCancelController from "../controllers/updateOrderStatustoCancel";
import updateOrderStatustoCancelExpressValidator from "../expressValidators/updateOrderStatustoCancel";

const router = express.Router();

router.put(
  "/order/:id",
  updateOrderStatustoCancelExpressValidator,
  updateOrderStatustoCancelController
);

export { router as updateOrderStatustoCancelRouter };
