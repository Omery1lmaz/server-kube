import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { Seller } from "../models/seller";
import { BadRequestError } from "@heaven-nsoft/common";

export const getSellerInfoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(new BadRequestError("Please login first"));
  }
  const token = authHeader.split(" ")[1];
  try {
    const decodedToken = jwt.verify(
      token,
      process.env.SECRET_KEY as string
    ) as { id: string };

    const seller = await Seller.findById(decodedToken.id);
    if (!seller) {
      return next(new BadRequestError("User details not found"));
    }

    res.status(200).json({
      name: seller.storeName,
      isTakeAway: seller.isTakeAway,
      imageUrl: seller.imageUrl,
      address: seller.address || null,
      number: seller.number || null,
      location: seller.location,
    });
  } catch (error) {
    return next(
      new BadRequestError("Invalid or expired token, please login again")
    );
  }
};

export default getSellerInfoController;
