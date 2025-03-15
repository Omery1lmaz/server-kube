import express from "express";
import createProductController from "../controllers/createProduct";
import getProductsBySellerLimitController from "../controllers/getProductsBySellerLimit";
import getProductsBySellerLimitExpressValidator from "../expressValidators/getProductsBySellerLimit";

const router = express.Router();

router.post(
  "/seller/limit/:limit/:skip",
  getProductsBySellerLimitExpressValidator,
  getProductsBySellerLimitController
);

export { router as getProductsBySellerLimitRouter };
