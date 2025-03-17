import express from "express";
import createTableExpressValidator from "../expressValidators/createTable";
import createTableController from "../controllers/createTable";

const router = express.Router();

router.post("/:id", createTableExpressValidator, createTableController);

export { router as createTableRouter };
