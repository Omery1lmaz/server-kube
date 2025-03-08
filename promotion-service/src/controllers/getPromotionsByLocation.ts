import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "@heaven-nsoft/common";
import { Promotion } from "../models/promotion";
import mongoose from "mongoose";
import { Seller } from "../models/seller";

export const getPromotionsByLocationController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { latitude, longitude } = req.params;
    const sellers = await Seller.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          $maxDistance: 10000,
        },
      },
    }).select("_id");
    const sellerIds = sellers.map((seller) => seller._id);
    const promotions = await Promotion.find({
      seller: { $in: sellerIds },
    }).populate("seller", "storeName");
    res.status(200).json(promotions);
  } catch (error) {
    next(new BadRequestError("Internal Server Error"));
  }
};

export default getPromotionsByLocationController;
