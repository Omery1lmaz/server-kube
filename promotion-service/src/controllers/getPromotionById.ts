import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "@heaven-nsoft/common";
import { Promotion } from "../models/promotion";
export const getPromotionByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.body;
    const promotion = await Promotion.findById(id).populate({
      path: "Seller",
      select: "seller storeName",
    });
    console.log(promotion, "promotion");
    res.status(200).json(promotion);
  } catch (error) {
    next(new BadRequestError("Internal Server Error"));
  }
};

export default getPromotionByIdController;
