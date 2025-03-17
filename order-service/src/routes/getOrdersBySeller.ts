import express from "express";
import getOrdersBySellerController from "../controllers/getOrdersBySeller";

const router = express.Router();

router.get("/orders", getOrdersBySellerController);

export { router as getOrdersBySellerRouter };
