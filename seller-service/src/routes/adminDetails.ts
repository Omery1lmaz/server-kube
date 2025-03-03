import { detailsController } from "./../../../auth-service/src/controllers/details";
import express from "express";
import { validateRequest } from "@heaven-nsoft/common";

const router = express.Router();

router.post("/details", validateRequest, detailsController);

export { router as adminDetailsStatusRouter };
