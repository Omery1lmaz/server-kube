import express from "express";
import createProductController from "../controllers/createProduct";
import getProductsBySellerForClientExpressValidator from "../expressValidators/getProductsBySellerForClient";

const router = express.Router();

router.get(
  "/products/:id",
  getProductsBySellerForClientExpressValidator,
  createProductController
);

export { router as createProductRouter };
