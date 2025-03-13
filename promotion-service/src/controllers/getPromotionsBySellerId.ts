import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "@heaven-nsoft/common";
import { Promotion } from "../models/promotion";
import mongoose from "mongoose";
import { Seller } from "../models/seller";

export const getPromotionsBySellerIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const promotions = await Promotion.findOne({
      seller: { $in: id },
    }).populate(
      "seller",
      "storeName imageUrl kitchenCategory isTakeAway location number address isWorking"
    );
    res.status(200).json(promotions);
  } catch (error) {
    next(new BadRequestError("Internal Server Error"));
  }
};

export default getPromotionsBySellerIdController;
