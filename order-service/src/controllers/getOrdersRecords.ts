import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Order } from "../models/order";
import { BadRequestError, NotAuthorizedError } from "@heaven-nsoft/common";
const getOrdersRecordsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      next(new NotAuthorizedError());
      return;
    }
    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };
    const orders = await Order.find({ seller: decodedToken.id }).sort({
      date: -1,
    });
    res.status(200).json(orders);
  } catch (error) {
    next(new BadRequestError("Failed to get orders"));
  }
};

export default getOrdersRecordsController;
