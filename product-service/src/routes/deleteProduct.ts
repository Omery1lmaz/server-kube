import express from "express";
import getProductsBySellerLimitController from "../controllers/getProductsBySellerLimit";
import deleteProductExpressValidator from "../expressValidators/deleteProduct";

const router = express.Router();

router.delete(
  "/:id",
  deleteProductExpressValidator,
  getProductsBySellerLimitController
);

export { router as deleteProductRouter };
