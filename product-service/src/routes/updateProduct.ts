import express from "express";
import updateProductExpressValidation from "../expressValidators/updateProduct";
import updateProductController from "../controllers/updateProduct";

const router = express.Router();

router.put("/:id", updateProductExpressValidation, updateProductController);

export { router as updateProductRouter };
