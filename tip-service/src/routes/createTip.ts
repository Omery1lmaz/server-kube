import express from "express";
import createTipExpressValidator from "../expressValidators/createTip";
import { createTipController } from "../controllers/createTip";

const router = express.Router();

router.post("/:id", createTipExpressValidator, createTipController);

export { router as createTipRouter };
