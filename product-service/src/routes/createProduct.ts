import express from "express";
import createProductController from "../controllers/createProduct";

const router = express.Router();

router.post("/create", createProductController);

export { router as createProductRouter };
