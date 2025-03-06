import express from "express";
import { validateRequest } from "@heaven-nsoft/common";
import createIngredientExpressValidator from "../expressValidators/createIngredient";
import createIngredientController from "../controllers/createIngredient";

const router = express.Router();

router.get("/test", createIngredientController);

export { router as createIngredientRouter };
