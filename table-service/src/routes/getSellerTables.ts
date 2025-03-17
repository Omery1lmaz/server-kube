import express from "express";
import createTableController from "../controllers/createTable";
import getSellerTablesExpressValidator from "../expressValidators/getSellerTables";
import getSellerTablesController from "../controllers/getSellerTables";

const router = express.Router();

router.get(
  "/seller/:id",
  getSellerTablesExpressValidator,
  getSellerTablesController
);

export { router as getSellerTablesRouter };
