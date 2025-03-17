import express from "express";
import getWaitersBySellerController from "../controllers/getWaitersBySeller";

const router = express.Router();

router.get("/", getWaitersBySellerController);

export { router as getWaitersBySellerRouter };
