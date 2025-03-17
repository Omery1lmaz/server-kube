import express from "express";
import createWaiterExpressValidator from "../expressValidators/create";
import createWaiterController from "../controllers/create";

const router = express.Router();

router.post("/create", createWaiterExpressValidator, createWaiterController);

export { router as createWaiterRouter };
