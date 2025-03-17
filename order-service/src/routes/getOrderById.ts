import express from "express";
import getOrderByIdExpressValidator from "../expressValidators/getOrderById";
import getOrderByIdController from "../controllers/getOrderById";

const router = express.Router();

router.get("/order/:id", getOrderByIdExpressValidator, getOrderByIdController);

export { router as getOrderByIdRouter };
