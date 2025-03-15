import express from "express";
import getProductsBySellerExpressValidator from "../expressValidators/getProductsBySeller";
import getProductsBySellerController from "../controllers/getProductsBySeller";

const router = express.Router();

router.post(
  "/seller/:id",
  getProductsBySellerExpressValidator,
  getProductsBySellerController
);

export { router as getProductsBySellerRouter };
