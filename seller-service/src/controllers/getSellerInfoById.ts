import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { Seller } from "../models/seller";
import { BadRequestError } from "@heaven-nsoft/common";

export const getSellerInfoByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    console.log(`Fetching seller with ID: ${id}`);

    const seller = await Seller.findById(id).populate("kitchenCategory");

    if (!seller) {
      console.log("Seller Not Found");
      next(new BadRequestError("Seller Not Found"));
      res.status(404).json({ message: "" });
      return;
    }
    res.status(200).json({
      name: seller.storeName,
      isTakeAway: seller.isTakeAway,
      imageUrl: seller.imageUrl,
      address: seller.address || null,
      number: seller.number || null,
      location: seller.location,
      kitchens: seller.kitchenCategory || null,
    });
  } catch (error) {
    console.error("Error fetching seller:", error);
    next(new BadRequestError("Error while fetching seller data"));
  }
};

export default getSellerInfoByIdController;
