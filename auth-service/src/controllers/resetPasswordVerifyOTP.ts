import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { User } from "../Models/user";
import { BadRequestError } from "@heaven-nsoft/common";

export const resetPasswordVerifyOTPController = async (
  req: Request,
  res: Response
) => {
  try {
    const { token, otp, email } = req.params;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Kullanıcı bulunamadı veya hesap onaylanmamış",
      });
    }

    const secret = `${process.env.RESET_PASSWORD_SECRET_KEY}-${user.password}`;

    jwt.verify(token, secret, async (err) => {
      if (err) {
        return res.status(400).json({
          message: "Şifre değiştirme linki geçerli değil",
        });
      }

      if (
        !user.resetPasswordOtpExpires ||
        user.resetPasswordOtpExpires < new Date()
      ) {
        return res.status(400).json({
          isVerify: true,
          message: "OTP süresi dolmuş",
        });
      }

      if (
        !user.resetPasswordOtp ||
        parseInt(user.resetPasswordOtp, 10) !== parseInt(otp, 10)
      ) {
        return res.status(400).json({
          message: "Girdiğiniz OTP uyuşmuyor",
        });
      }

      return res.status(200).json({
        message: "Şifre değiştirme linki geçerli",
        status: "success",
        statusCode: 200,
      });
    });
  } catch (error) {
    console.error("Hata:", error);
    return res.status(500).json({
      message: "Sunucu hatası, lütfen tekrar deneyin",
    });
  }
};

export default resetPasswordVerifyOTPController;
