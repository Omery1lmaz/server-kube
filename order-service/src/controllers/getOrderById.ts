import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Order } from "../models/order";
import { BadRequestError } from "@heaven-nsoft/common";
const getOrderByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const order = Order.findById(id)
      .populate({
        path: "seller",
        select: "name",
      })
      .populate({
        path: "Tip",
        select: "tip.cost",
      });

    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

export default getOrderByIdController;
