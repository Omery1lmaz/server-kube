import express from "express";
import getId from "../expressValidators/getId";
import getCategoryByIdController from "../controllers/getCategoryById";

const router = express.Router();

router.get("/category/:id", getId, getCategoryByIdController);

export { router as getCategoryByIdRouter };
