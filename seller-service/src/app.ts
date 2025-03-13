import { json } from "body-parser";
import express, { NextFunction } from "express";
import { errorHandler, NotFoundError } from "@heaven-nsoft/common";
import { getSellerInfoByIdRouter } from "./routes/getSellerInfoById";
import { getSearchRouter } from "./routes/getSearch";
import { getClosestSellersRouter } from "./routes/getClosestSellers";
import { getSellerInfoRouter } from "./routes/getSellerInfo";
import { getSearchByKitchenRouter } from "./routes/getSearchByKitchen";
import { signupRouter } from "./routes/signup";
import { signinRouter } from "./routes/signin";
import { adminDetailsStatusRouter } from "./routes/adminDetails";
import { updateProfileRouter } from "./routes/updateProfile";
import { updateWorkingStatusRouter } from "./routes/updateWorkingStatus";

const app = express();
app.set("trust proxy", true);
app.use(json());

app.use(signupRouter);
app.use(getClosestSellersRouter);
app.use(getSellerInfoByIdRouter);
app.use(getSearchRouter);
app.use(getSellerInfoRouter);
app.use(getSearchByKitchenRouter);
app.use(signupRouter);
app.use(adminDetailsStatusRouter);
app.use(updateProfileRouter);
app.use(updateWorkingStatusRouter);
app.all("*", async (req, res, next: NextFunction) => {
  console.log("test", req.url);
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
