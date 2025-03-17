import { json } from "body-parser";
import express, { NextFunction } from "express";
import { errorHandler, NotFoundError } from "@heaven-nsoft/common";
import { createWaiterRouter } from "./routes/create";
import { getWaitersBySellerIdRouter } from "./routes/getWaitersBySellerId";
import { getWaitersBySellerRouter } from "./routes/getWaitersBySeller";
import { getWaiterByIdRouter } from "./routes/getWaiterById";
import { updateWaiterRouter } from "./routes/updateWaiter";

const app = express();
app.set("trust proxy", true);
app.use(json());

app.use(createWaiterRouter);
app.use(getWaitersBySellerIdRouter);
app.use(getWaitersBySellerRouter);
app.use(getWaiterByIdRouter);
app.use(updateWaiterRouter);
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
