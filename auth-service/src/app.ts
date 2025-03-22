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
app.set("trust proxy", true);
app.use(json());

{
  /* Done Publisher */
}
app.use(signupRouter); //   OK  Create a new user account for nats publisher and listener
app.use(verifyRegisterRouter); // In Progress  Not needed for nats subscription (user:activated)
app.use(googleSigninRouter); //   OK  Create a new user account for nats publisher and listener
app.use(updatePhoneNumberRouter); // In Progress  Create a new user updated phone number for nats publisher and listener (user:phone-number-updated)
app.use(profileRouter); // In Progress  Create a new user updated profile number for nats publisher and listener (user:profile-updated)
app.use(updateUserNameRouter); // In Progress  Create a new user updated profile number for nats publisher and listener (user:profile-updated)

{
  /* Not Needed */
}
app.use(signinRouter); // Not needed for nats subscription
app.use(detailRouter); // Not needed for nats subscription
app.use(registerResendOTPRouter); // Not needed for nats subscription
app.use(forgetPasswordResendOTPRouter); // Not needed for nats subscription
app.use(resetPasswordVerifyOTPRouter); // Not needed for nats subscription
app.use(checkRegisterEmailRouter); // Not needed for nats subscription
app.use(deleteProfileRouter); // In Progress  Create a new user updated profile number for nats publisher and listener (user:account-deleted-event)
app.use(resetPasswordRouter); // Not needed for nats subscription
app.use(resetPasswordSendEmailRouter); // Not needed for nats subscription
app.use(updatePasswordRouter); // Not needed for nats subscription

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
