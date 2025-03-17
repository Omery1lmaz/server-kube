import express from "express";
import updateWaiterExpressValidator from "../expressValidators/updateWaiter";
import updateWaiterController from "../controllers/updateWaiter";

const router = express.Router();

router.post("/:id", updateWaiterExpressValidator, updateWaiterController);

export { router as updateWaiterRouter };
