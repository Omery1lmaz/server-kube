import { json } from "body-parser";
import express, { NextFunction } from "express";
import { errorHandler, NotFoundError } from "@heaven-nsoft/common";
import { createCategoryRouter } from "./routes/createCategory";
import { getCategoriesBySellerRouter } from "./routes/getCategoriesBySeller";
import { getCategoriesBySellerIdRouter } from "./routes/getCategoriesBySellerId";
import { editCategoryRouter } from "./routes/editCategory";
import { deleteCategoryRouter } from "./routes/deleteCategory";
import { getCategoryByIdRouter } from "./routes/getCategoryById";

const app = express();
app.set("trust proxy", true);
app.use(json());

app.use(createCategoryRouter);
app.use(getCategoriesBySellerRouter);
app.use(getCategoriesBySellerIdRouter);
app.use(editCategoryRouter);
app.use(deleteCategoryRouter);
app.use(getCategoryByIdRouter);
app.all("*", async (req, res, next: NextFunction) => {
  console.log(req.url, "tets");
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
