import express from "express";
import getProductByIdController from "../controllers/getProductById";
import getProductByIdByIdExpressValidator from "../expressValidators/getProductById";

const router = express.Router();

router.get(
  "/:id",
  getProductByIdByIdExpressValidator,
  getProductByIdController
);

export { router as getProductByIdRouter };
