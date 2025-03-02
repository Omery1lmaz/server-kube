import express from "express";
import { validateRequest } from "@heaven-nsoft/common";
import detailsController from "../controllers/details";

const router = express.Router();

router.post("/details", validateRequest, detailsController);

export { router as detailRouter };
