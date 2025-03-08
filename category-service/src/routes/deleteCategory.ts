import express from "express";
import getCategoriesBySellerIdExpressValidator from "../expressValidators/getId";
import deleteCategoryController from "../controllers/deleteCategory";

const router = express.Router();

router.delete(
  "/categories/:id",
  getCategoriesBySellerIdExpressValidator,
  deleteCategoryController
);

export { router as deleteCategoryRouter };
