import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "@heaven-nsoft/common";
import { Promotion } from "../models/promotion";
import mongoose from "mongoose";
import { Seller } from "../models/seller";

export const getPromotionsBySellerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({ message: "Lütfen giriş yapın" });
      return;
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      res.status(400).json({ message: "Token bulunamadı" });
      return;
    }

    const decodedToken = jwt.verify(token, process.env.SECRET_KEY!) as {
      id: string;
    };

    const promotions = await Promotion.findOne({
      seller: { $in: decodedToken.id },
    }).populate(
      "seller",
      "storeName imageUrl kitchenCategory isTakeAway location number address isWorking"
    );
    res.status(200).json(promotions);
  } catch (error) {
    next(new BadRequestError("Internal Server Error"));
  }
};

export default getPromotionsBySellerController;
