import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "@heaven-nsoft/common";
import { Promotion } from "../models/promotion";
export const EditPromotionByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, promotion } = req.body;
    await Promotion.findByIdAndUpdate(id, {
      ...promotion,
    });
    console.log(promotion, "promotion");
    res.status(200).json(promotion);
  } catch (error) {
    next(new BadRequestError("Internal Server Error"));
  }
};

export default EditPromotionByIdController;
