import express from "express";
import createModifierGroup from "../controllers/create";

const router = express.Router();

router.post("/create", createModifierGroup);

export { router as createModifierGroupRouter };
