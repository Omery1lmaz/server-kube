import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { Seller } from "../models/seller";
import { BadRequestError } from "@heaven-nsoft/common";

export const getSearchController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { longitude, latitude, search } = req.params;
    const limit = Number(req.query.limit) || 10;

    const distance = 5000;

    const nearbyRestaurants = await Seller.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [Number(longitude) || 0, Number(latitude) || 0],
          },
          maxDistance: distance,
          distanceField: "distance",
          query: search ? { storeName: { $regex: search, $options: "i" } } : {},
        },
      },
      { $limit: limit },
    ]);

    if (!nearbyRestaurants.length) {
      return next(new BadRequestError("Seller Not Found"));
    }

    res.status(200).json({
      isSuccess: true,
      message: "Success",
      data: nearbyRestaurants,
      statusCode: "200",
      isError: false,
    });
  } catch (error) {
    next(new BadRequestError("An error occurred while fetching sellers"));
  }
};

export default getSearchController;
