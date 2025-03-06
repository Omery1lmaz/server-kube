import { json } from "body-parser";
import express, { NextFunction } from "express";
import { errorHandler, NotFoundError } from "@heaven-nsoft/common";

const app = express();
app.set("trust proxy", true);
app.use(json());

app.all("*", async (req, res, next: NextFunction) => {
  next(new NotFoundError());
});
app.use(errorHandler);

export { app };
