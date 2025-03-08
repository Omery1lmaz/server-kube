import { json } from "body-parser";
import express, { NextFunction } from "express";
import { errorHandler, NotFoundError } from "@heaven-nsoft/common";
import { createPromotionRouter } from "./routes/create";
import { getPromotionsByLocationRouter } from "./routes/getPromotionsByLocation";

const app = express();
app.set("trust proxy", true);
app.use(json());

app.use(createPromotionRouter);
app.use(getPromotionsByLocationRouter);

// Catch all routes and return a 404 error if none match
app.all("*", async (req, res, next: NextFunction) => {
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
