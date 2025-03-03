import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { Seller } from "../models/seller";
import { BadRequestError } from "@heaven-nsoft/common";
import mongoose from "mongoose";

export const getSearchByKitchenController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { longitude, latitude, kitchen } = req.params;
    const { limit } = req.query;

    const distance = 5000;
    const nearbyRestaurants = await Seller.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [
              parseFloat(longitude) || 0,
              parseFloat(latitude) || 0,
            ],
          },
          maxDistance: distance,
          distanceField: "distance",
        },
      },
      {
        $match: {
          kitchenCategory: {
            $in: [new mongoose.Types.ObjectId(kitchen)],
          },
        },
      },
      {
        $limit: parseInt(limit as string, 10) || 10,
      },
    ]);

    if (!nearbyRestaurants.length) {
      return next(new BadRequestError("No sellers found for this kitchen"));
    }

    res.status(200).json({
      isSuccess: true,
      message: "Success",
      data: nearbyRestaurants,
      statusCode: "200",
      isError: false,
    });
  } catch (error) {
    next(
      new BadRequestError("An error occurred while fetching sellers by kitchen")
    );
  }
};

export default getSearchByKitchenController;
