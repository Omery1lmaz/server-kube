import { Request, Response } from "express";
import { User } from "../Models/user";
import { BadRequestError } from "@heaven-nsoft/common";
import { createToken } from "../helpers/createToken";

export const signinController = async (req: Request, res: Response) => {
  console.log("test deneme");
  const { email, password } = req.body;

  // Kullanıcıyı email ile bul
  const user = await User.findOne({ email });
  console.log(user, "uyser test");
  if (!user) {
    throw new BadRequestError("Kullanıcı bulunamadı");
  }

  if (user.provider !== "email") {
    throw new BadRequestError("Bu kullanıcı farklı bir sağlayıcıya bağlı");
  }

  if (user.isDeleted) {
    throw new BadRequestError("Bu hesap silinmiştir");
  }

  // Kullanıcı aktif mi?
  if (!user.isActive) {
    throw new BadRequestError("Lütfen emailinizi onaylayınız");
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    throw new BadRequestError("Hesap bilgileri uyuşmuyor");
  }

  const token = createToken(JSON.stringify(user._id));

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({
    _id: user._id,
    email: user.email,
    name: user.name,
  });
};

export default signinController;
