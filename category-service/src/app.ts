import { json } from "body-parser";
import express, { NextFunction } from "express";
import { errorHandler, NotFoundError } from "@heaven-nsoft/common";
import { createCategoryRouter } from "./routes/createCategory";

const app = express();
app.set("trust proxy", true);
app.use(json());

app.use(createCategoryRouter);
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
