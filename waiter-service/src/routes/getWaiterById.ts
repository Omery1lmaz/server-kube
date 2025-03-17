import express from "express";
import getWaiterByIdExpressValidator from "../expressValidators/getWaiterById";
import getWaiterByIdController from "../controllers/getWaiterById";

const router = express.Router();

router.post("/:id", getWaiterByIdExpressValidator, getWaiterByIdController);

export { router as getWaiterByIdRouter };
