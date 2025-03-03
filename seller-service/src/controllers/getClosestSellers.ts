import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { Seller } from "../models/seller";
import { BadRequestError } from "@heaven-nsoft/common";

export const getClosestSellersController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { longitude, latitude } = req.params;
    const { limit, distance } = req.query;

    const nearbySellers = await Seller.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [
              parseFloat(longitude) || 0,
              parseFloat(latitude) || 0,
            ],
          },
          maxDistance: parseFloat(distance as string) || 5000, // Mesafe varsayılan olarak 5000m
          distanceField: "distance",
          spherical: true,
        },
      },
      { $sort: { distance: 1 } }, // En yakın satıcıları sıralama
      { $limit: parseInt(limit as string, 10) || 10 }, // Varsayılan olarak 10 sonuç
      {
        $lookup: {
          from: "kitchens",
          localField: "kitchenCategory",
          foreignField: "_id",
          as: "kitchenCategory",
        },
      },
    ]);

    if (!nearbySellers.length) {
      return next(new BadRequestError("No sellers found nearby"));
    }

    res.status(200).json({
      isSuccess: true,
      message: "Success",
      data: nearbySellers,
      statusCode: "200",
      isError: false,
    });
  } catch (error) {
    next(new BadRequestError("An error occurred while fetching sellers"));
  }
};

export default getClosestSellersController;
