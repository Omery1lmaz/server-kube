import { json } from "body-parser";
import express, { NextFunction } from "express";
import { errorHandler, NotFoundError } from "@heaven-nsoft/common";
import { getSellerInfoByIdRouter } from "./routes/getSellerInfoById";
import { getSearchRouter } from "./routes/getSearch";
import { getClosestSellersRouter } from "./routes/getClosestSellers";
import { getSellerInfoRouter } from "./routes/getSellerInfo";
import { getSearchByKitchenRouter } from "./routes/getSearchByKitchen";

const app = express();
app.set("trust proxy", true);
app.use(json());

app.use(getClosestSellersRouter);
app.use(getSellerInfoByIdRouter);
app.use(getSearchRouter);
app.use(getSellerInfoRouter);
app.use(getSearchByKitchenRouter);
app.all("*", async (req, res, next: NextFunction) => {
  next(new NotFoundError());
});

app.use(errorHandler);

export { app };
