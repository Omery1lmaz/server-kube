import express from "express";
import createModifierGroup from "../controllers/createCategory";
import getCategoriesBySellerIdExpressValidator from "../expressValidators/getId";
import getCategoriesBySellerIdController from "../controllers/getCategoriesBySellerId";

const router = express.Router();

router.get(
  "/get-categories/:id",
  getCategoriesBySellerIdExpressValidator,
  getCategoriesBySellerIdController
);

export { router as getCategoriesBySellerIdRouter };
