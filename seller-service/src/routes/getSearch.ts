import express from "express";
import { validateRequest } from "@heaven-nsoft/common";
import getSearchExpressValidator from "../expressValidators/getSearch";
import getSearchController from "../controllers/getSearch";

const router = express.Router();

router.post(
  "/getSearch/:longitude/:latitude/:search",
  getSearchExpressValidator,
  validateRequest,
  getSearchController
);

export { router as getSearchRouter };
