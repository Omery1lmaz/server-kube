import { json } from "body-parser";
import express, { NextFunction } from "express";
import { signinRouter } from "./routes/signin";
import { errorHandler, NotFoundError } from "@heaven-nsoft/common";
import { signupRouter } from "./routes/signup";
import { verifyRegisterRouter } from "./routes/verifyRegister";
import { googleSigninRouter } from "./routes/googleSignin";
import { updatePhoneNumberRouter } from "./routes/updatePhoneNumber";
import { registerResendOTPRouter } from "./routes/registerResendOTP";
import { forgetPasswordResendOTPRouter } from "./routes/forgetPasswordResendOTP";
import { resetPasswordVerifyOTPRouter } from "./routes/resetPasswordVerifyOTP";
import { profileRouter } from "./routes/profile";
import { deleteProfileRouter } from "./routes/deleteProfile";
import { checkRegisterEmailRouter } from "./routes/checkRegisterEmail";
import { resetPasswordRouter } from "./routes/resetPassword";
import { resetPasswordSendEmailRouter } from "./routes/resetPasswordSendEmail";
import { updatePasswordRouter } from "./routes/updatePassword";
import { detailRouter } from "./routes/details";
import { updateUserNameRouter } from "./routes/updateUserName";

const app = express();
// app.set("trust proxy", true);
app.use(json());

app.use(signinRouter);
app.use(signupRouter);
app.use(detailRouter);
app.use(verifyRegisterRouter);
app.use(googleSigninRouter);
app.use(updatePhoneNumberRouter);
app.use(registerResendOTPRouter);
app.use(forgetPasswordResendOTPRouter);
app.use(resetPasswordVerifyOTPRouter);
app.use(profileRouter);
app.use(checkRegisterEmailRouter);
app.use(deleteProfileRouter);
app.use(resetPasswordRouter);
app.use(resetPasswordSendEmailRouter);
app.use(updatePasswordRouter);
app.use(updateUserNameRouter);

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
