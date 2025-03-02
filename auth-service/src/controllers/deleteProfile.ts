import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { User } from "../Models/user";
import { BadRequestError } from "@heaven-nsoft/common";

export const deleteProfileController = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: "Lütfen giriş yapın" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY!) as {
      id: string;
    };

    const updatedUser = await User.findByIdAndUpdate(
      decodedToken.id,
      { isDeleted: true },
      { new: true }
    );

    if (!updatedUser) {
      res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }

    res.status(200).json({ message: "Profiliniz başarıyla silindi" });
  } catch (error) {
    console.error("Hata:", error);
    res.status(400).json({ message: "Kimlik doğrulama başarısız" });
  }
};

export default deleteProfileController;
