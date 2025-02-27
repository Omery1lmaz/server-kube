import jwt from "jsonwebtoken";

const maxAge = 3 * 24 * 60 * 60;

export const createToken = (id: string) => {
  return jwt.sign({ id }, process.env.SECRET_KEY as string, {
    expiresIn: maxAge,
  });
};

export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6 haneli OTP
};

export const createResetPasswordToken = (jwtInformation: any) => {
  return jwt.sign(
    jwtInformation,
    process.env.RESET_PASSWORD_SECRET_KEY as string,
    {
      expiresIn: "15m",
    }
  );
};
