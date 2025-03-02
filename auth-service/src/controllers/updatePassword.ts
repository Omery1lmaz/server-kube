import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { User } from "../Models/user";
import bcrypt from "bcrypt";
import { DecodedToken } from "../types/decodedToken";

export const updatePasswordController = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Lütfen giriş yapınız." });
    }

    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY as string);
    const { oldPassword, newPassword, newPasswordConfirm } = req.body;

    if (!newPassword || !newPasswordConfirm || !oldPassword) {
      return res
        .status(400)
        .json({ message: "Lütfen tüm alanları doldurunuz." });
    }

    if (newPassword !== newPasswordConfirm) {
      return res.status(400).json({ message: "Yeni şifreler eşleşmiyor." });
    }

    const user = await User.findOne({
      _id: (decodedToken as DecodedToken).id,
      provider: "email",
    });

    if (!user || !user.isActive) {
      return res.status(403).json({ message: "Hesabınızı aktif etmelisiniz." });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password || "");
    if (!isMatch) {
      return res.status(400).json({ message: "Eski şifreniz yanlış." });
    }

    if (oldPassword === newPassword) {
      return res
        .status(400)
        .json({ message: "Eski şifreniz yeni şifreniz ile aynı olamaz." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: "Şifreniz başarıyla güncellendi." });
  } catch (error) {
    console.error("Şifre güncelleme hatası:", error);
    return res
      .status(500)
      .json({ message: "Bir hata oluştu, lütfen tekrar deneyiniz." });
  }
};

export default updatePasswordController;
