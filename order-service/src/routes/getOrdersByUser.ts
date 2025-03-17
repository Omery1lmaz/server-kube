import express from "express";
import getOrdersByUserController from "../controllers/getOrdersByUser";

const router = express.Router();

router.get("/orders", getOrdersByUserController);

export { router as getOrdersByUserRouter };
