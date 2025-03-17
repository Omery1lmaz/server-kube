import { json } from "body-parser";
import express, { NextFunction } from "express";
import { errorHandler, NotFoundError } from "@heaven-nsoft/common";

const app = express();
app.set("trust proxy", true);
app.use(json());
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
