import { json } from "body-parser";
import express from "express";
import { signinRouter } from "./routes/signin";
import { errorHandler, NotFoundError } from "@heaven-nsoft/common";
import { signupRouter } from "./routes/signup";
import { verifyRegisterRouter } from "./routes/verifyRegister";
import { googleSigninRouter } from "./routes/googleSignin";
import { updatePhoneNumberRouter } from "./routes/updatePhoneNumber";
import { registerResendOTPRouter } from "./routes/registerResendOTP";
const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(signinRouter);
app.use(signupRouter);
app.use(verifyRegisterRouter);
app.use(googleSigninRouter);
app.use(updatePhoneNumberRouter);
app.use(registerResendOTPRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };
