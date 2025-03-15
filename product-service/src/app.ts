import { json } from "body-parser";
import express, { NextFunction } from "express";
import { errorHandler, NotFoundError } from "@heaven-nsoft/common";
import { createProductRouter } from "./routes/createProduct";
import { getProductByIdRouter } from "./routes/getProductById";
import { getProductsBySellerLimitRouter } from "./routes/getProductsBySellerLimit";
import { getProductsBySellerRouter } from "./routes/getProductsBySeller";
import { deleteProductRouter } from "./routes/deleteProduct";
import { updateProductRouter } from "./routes/updateProduct";
import { updateProductImageRouter } from "./routes/updateProductImage";

const app = express();
app.set("trust proxy", true);
app.use(json());

app.use(createProductRouter);
app.use(getProductByIdRouter);
app.use(getProductsBySellerLimitRouter);
app.use(getProductsBySellerRouter);
app.use(deleteProductRouter);
app.use(updateProductRouter);
app.use(updateProductImageRouter);

app.all("*", async (req, res, next: NextFunction) => {
  next(new NotFoundError());
});
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) => {
    errorHandler(err, req, res, next);
  }
);
export { app };
