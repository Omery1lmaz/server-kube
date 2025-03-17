import express from "express";
import getOrdersRecordsController from "../controllers/getOrdersRecords";

const router = express.Router();

router.post("/order/seller/finance", getOrdersRecordsController);

export { router as getOrdersRecordsRouter };
