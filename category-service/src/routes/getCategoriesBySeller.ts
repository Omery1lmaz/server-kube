import express from "express";
import createModifierGroup from "../controllers/createCategory";
import getCategoriesBySellerController from "../controllers/getCategoriesBySeller";

const router = express.Router();

router.get("/categories-by-seller", getCategoriesBySellerController);

export { router as getCategoriesBySellerRouter };
