import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "@heaven-nsoft/common";
import { Promotion } from "../models/promotion";
export const deletePromotionByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.body;
    const isDeleted = await Promotion.findByIdAndDelete(id);
    console.log(isDeleted, "isDeleted");
    res.status(200).json(isDeleted);
  } catch (error) {
    next(new BadRequestError("Internal Server Error"));
  }
};

export default deletePromotionByIdController;
