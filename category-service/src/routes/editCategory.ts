import express from "express";
import getCategoriesBySellerIdExpressValidator from "../expressValidators/getId";
import editCategoryController from "../controllers/editCategory";

const router = express.Router();

router.put(
  "/categories/:id",
  getCategoriesBySellerIdExpressValidator,
  editCategoryController
);

export { router as editCategoryRouter };
