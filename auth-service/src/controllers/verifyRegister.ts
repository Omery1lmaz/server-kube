import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { User } from "../Models/user";
import { BadRequestError } from "@heaven-nsoft/common";
import { createToken } from "../helpers/createToken";
import { DecodedToken } from "../types/decodedToken";

export const verifyRegisterController = async (req: Request, res: Response) => {
  const { token, otp } = req.params;
  console.log("token otp", token, otp);
  try {
    const decodedToken = jwt.verify(
      token,
      process.env.SECRET_KEY as string
    ) as DecodedToken;

    const user = await User.findById(decodedToken.id);
    if (!user) {
      return res.status(400).json({
        isVerify: true,
        message: "Kullanıcı yok",
      });
    }

    if (user.isActive) {
      return res.status(201).json({
        isVerify: true,
        message: "Kullanıcı Emaili onaylandı",
      });
    }

    if (user.otpExpires && new Date(user.otpExpires) < new Date()) {
      return res.status(400).json({
        isVerify: true,
        message: "Otp süresi dolmuş",
      });
    }

    if (parseInt(user.otp || "") !== parseInt(otp)) {
      return res.status(400).json({
        message: "Girdiğiniz OTP uyuşmuyor",
      });
    }

    // Kullanıcı aktif hale getiriliyor
    await User.findOneAndUpdate(
      { email: user.email },
      { isActive: true, otp: null, otpExpires: null }
    );

    const newToken = createToken(user._id as string);
    res.cookie("token", newToken);

    return res.status(201).json({
      isVerify: true,
      message: "Hesabınız Onaylandı",
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        token: newToken,
      },
    });
  } catch (err) {
    return res.status(400).json({
      isVerify: true,
      message: "Token geçersiz veya kullanıcı yok",
    });
  }
};

export default verifyRegisterController;
