import express from "express";
import createProductController from "../controllers/createProduct";
import { uploadMiddleware } from "../middlewares/multer";

const router = express.Router();

router.post("/create", uploadMiddleware, createProductController);

export { router as createProductRouter };
