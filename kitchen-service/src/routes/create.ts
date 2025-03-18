import express from "express";
import createKitchenExpressValidator from "../expressValidators/create";
import createKitchenController from "../controllers/create";

const router = express.Router();

router.post("/", createKitchenExpressValidator, createKitchenController);

export { router as createKitchenRouter };
