import express from "express";
import getWaitersBySellerIdController from "../controllers/getWaitersBySellerId";
import getWaitersBySellerIdExpressValidator from "../expressValidators/getWaitersBySellerId";

const router = express.Router();

router.get(
  "/seller/:id",
  getWaitersBySellerIdExpressValidator,
  getWaitersBySellerIdController
);

export { router as getWaitersBySellerIdRouter };
