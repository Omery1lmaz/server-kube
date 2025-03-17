import { json } from "body-parser";
import express, { NextFunction } from "express";
import { errorHandler, NotFoundError } from "@heaven-nsoft/common";
import { createOrderRouter } from "./routes/create";
import { getOrdersBySellerRouter } from "./routes/getOrdersBySeller";
import { addTiptoOrderRouter } from "./routes/addTiptoOrder";
import { getActiveOrdersByUserRouter } from "./routes/getActiveOrdersByUser";
import { getOrdersByUserRouter } from "./routes/getOrdersByUser";
import { getOrderByIdRouter } from "./routes/getOrderById";
import { getOrdersBySellerLimitRouter } from "./routes/getOrdersBySellerLimit";
import { getOrdersRecordsRouter } from "./routes/getOrdersRecords";
import { updateOrderStatustoCancelRouter } from "./routes/updateOrderStatustoCancel";

const app = express();
app.set("trust proxy", true);
app.use(json());

app.use(createOrderRouter);
app.use(getOrdersBySellerRouter);
app.use(addTiptoOrderRouter);
app.use(getActiveOrdersByUserRouter);
app.use(getOrdersByUserRouter);
app.use(getOrderByIdRouter);
app.use(getOrdersBySellerLimitRouter);
app.use(getOrdersRecordsRouter);
app.use(updateOrderStatustoCancelRouter);

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
