import { json } from "body-parser";
import express from "express";
import { signinRouter } from "./routes/signin";
import { errorHandler, NotFoundError } from "@heaven-nsoft/common";
const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(signinRouter);
app.all("*", async (req, res) => {
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };
