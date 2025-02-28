import { Request, Response } from "express";
import axios from "axios";
import { User } from "../Models/user";
import { BadRequestError } from "@heaven-nsoft/common";
import { createToken } from "../helpers/createToken";
import verifyIdToken from "../helpers/verifyIdToken";
import jwt from "jsonwebtoken";
export const resetPasswordController = async (req: Request, res: Response) => {
  const { token, otp, email, password } = req.params;

  try {
    const user = await User.findOne({ email, resetPasswordToken: token });

    if (!user) {
      throw new BadRequestError(
        "Kullanıcı bulunamadı veya hesabı onaylanmamış."
      );
    }

    const secret = process.env.RESET_PASSWORD_SECRET_KEY + "-" + user.password;

    jwt.verify(token, secret);

    if (
      user.resetPasswordOtpExpires &&
      user.resetPasswordOtpExpires < new Date(Date.now())
    ) {
      throw new BadRequestError("OTP süresi dolmuş.");
    }

    if (parseInt(user.resetPasswordOtp || "") !== parseInt(otp)) {
      throw new BadRequestError("Girdiğiniz OTP uyuşmuyor.");
    }
    user.password = password;
    user.resetPasswordOtpExpires = undefined;
    user.resetPasswordOtp = undefined;
    user.resetPasswordToken = undefined;
    await user.save();

    return res.status(200).json({
      message: "Şifre başarıyla değiştirildi.",
      success: true,
    });
  } catch (error) {
    throw new BadRequestError("Şifre değiştirme linki geçerli değil.");
  }
};

export default resetPasswordController;
