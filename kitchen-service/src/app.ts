import { json } from "body-parser";
import express, { NextFunction } from "express";
import { errorHandler, NotFoundError } from "@heaven-nsoft/common";
import { createKitchenRouter } from "./routes/create";

const app = express();
app.set("trust proxy", true);
app.use(json());

app.use(createKitchenRouter);
app.all("*", async (req, res, next: NextFunction) => {
  next(new NotFoundError());
});
app.use(errorHandler);

export { app };
