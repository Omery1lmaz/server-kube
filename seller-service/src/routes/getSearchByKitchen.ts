import express from "express";
import { validateRequest } from "@heaven-nsoft/common";
import getSearchByKitchenController from "../controllers/getSearchByKitchen";
import getSearchByKitchenExpressValidator from "../expressValidators/getSearchByKitchen";

const router = express.Router();

router.post(
  "/get-search-kitchen/:longitude/:latitude/:kitchen",
  getSearchByKitchenExpressValidator,
  validateRequest,
  getSearchByKitchenController
);

export { router as getSearchByKitchenRouter };
