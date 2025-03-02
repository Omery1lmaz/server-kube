import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { User } from "../Models/user";
import { BadRequestError } from "@heaven-nsoft/common";

export const updateUserNameController = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Lütfen giriş yapın" });
  }

  const token = authHeader.split(" ")[1];
  const { name } = req.body;

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY!) as {
      id: string;
    };

    const updatedUser = await User.findByIdAndUpdate(
      decodedToken.id,
      { name },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Hata:", error);
    return res.status(400).json({ message: "Kimlik doğrulama başarısız" });
  }
};

export default updateUserNameController;
