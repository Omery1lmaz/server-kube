import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "@heaven-nsoft/common";
import { Promotion } from "../models/promotion";
import mongoose from "mongoose";
import { Seller } from "../models/seller";

export const getPromotionsBySellersLocationController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { promotionId, latitude, longitude } = req.params;
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
    const promotions = await Promotion.findOne({
      _id: promotionId,
      seller: { $in: sellerIds },
    }).populate(
      "seller",
      "storeName imageUrl kitchenCategory isTakeAway location number address isWorking"
    );
    res.status(200).json(promotions);
  } catch (error) {
    next(new BadRequestError("Internal Server Error"));
  }
};

export default getPromotionsBySellersLocationController;
