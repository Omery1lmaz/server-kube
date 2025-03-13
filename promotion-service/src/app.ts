import { json } from "body-parser";
import express, { NextFunction } from "express";
import { errorHandler, NotFoundError } from "@heaven-nsoft/common";
import { createPromotionRouter } from "./routes/create";
import { getPromotionsByLocationRouter } from "./routes/getPromotionsByLocation";
import { getPromotionsBySellersLocationRouter } from "./routes/getPromotionsBySellersLocation";
import { getPromotionsBySellerRouter } from "./routes/getPromotionsBySeller";
import { getPromotionByIdRouter } from "./routes/getPromotionById";

const app = express();
app.set("trust proxy", true);
app.use(json());

app.use(createPromotionRouter);
app.use(getPromotionsByLocationRouter);
app.use(getPromotionsBySellersLocationRouter);
app.use(getPromotionsBySellerRouter);
app.use(getPromotionByIdRouter);

// Catch all routes and return a 404 error if none match
app.all("*", async (req, res, next: NextFunction) => {
  console.log("promotion service working");
  next(new NotFoundError());
});

// Error handling middleware
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
