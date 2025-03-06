import { json } from "body-parser";
import express, { NextFunction } from "express";
import { errorHandler, NotFoundError } from "@heaven-nsoft/common";
import { createIngredientRouter } from "./routes/createIngredient";

const app = express();
// Config
app.set("trust proxy", true);
app.use(json());

// Routes

app.use(createIngredientRouter);
app.all("*", async (req, res, next: NextFunction) => {
  next(new NotFoundError());
});

// Error Handler
app.use(errorHandler);

export { app };
