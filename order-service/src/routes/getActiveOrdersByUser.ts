import express from "express";
import getActiveOrdersByUserController from "../controllers/getActiveOrdersByUser";

const router = express.Router();

router.get("/active-orders", getActiveOrdersByUserController);

export { router as getActiveOrdersByUserRouter };
