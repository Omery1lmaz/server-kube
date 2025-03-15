import express from "express";
import { uploadMiddleware } from "../middlewares/multer";
import updateProductImageController from "../controllers/updateProductImage";

const router = express.Router();

router.post(
  "/update/image/:id",
  uploadMiddleware,
  updateProductImageController
);

export { router as updateProductImageRouter };
