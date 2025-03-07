import express from "express";
import createModifierGroup from "../controllers/createCategory";

const router = express.Router();

router.post("/create", createModifierGroup);

export { router as createCategoryRouter };
