import express from "express";
import createOrderExpressValidator from "../expressValidators/create";
import createOrderController from "../controllers/create";

const router = express.Router();

router.post("/create", createOrderExpressValidator, createOrderController);

export { router as createOrderRouter };
