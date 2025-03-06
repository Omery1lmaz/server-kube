import express from "express";
import createIngredientController from "../controllers/createIngredient";

const router = express.Router();

router.get("/test", createIngredientController);

export { router as createIngredientRouter };
