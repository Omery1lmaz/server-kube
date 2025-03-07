import { json } from "body-parser";
import express, { NextFunction } from "express";
import { errorHandler, NotFoundError } from "@heaven-nsoft/common";
import { createExtraIngredientRouter } from "./routes/createExtraIngredient";

// **Configuration
const app = express();
app.set("trust proxy", true);
app.use(json());

app.all("*", async (req, res, next) => {
  console.log(req.url, req.baseUrl, req.originalUrl);
  next();
});
// ** Routes
app.use(createExtraIngredientRouter);

// **Catch-all error handler**
app.all("*", async (req, res, next: NextFunction) => {
  next(new NotFoundError());
});
app.use(errorHandler);

export { app };
