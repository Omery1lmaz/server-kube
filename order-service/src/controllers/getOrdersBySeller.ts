import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Seller } from "../models/seller";
import handleCheckOrderProducts from "../utils/order/checkOrderProduct";
import handleCheckOrderDiscount from "../utils/order/checkOrderDiscount";
import { Table } from "../models/table";
import { Order } from "../models/order";
import { Tip } from "../models/tip";
import { BadRequestError, NotAuthorizedError } from "@heaven-nsoft/common";
const getOrdersBySellerController = async (
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
    const orders = await Order.find({ seller: decodedToken.id }).populate({
      path: "seller",
      select: "name",
    });
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

export default getOrdersBySellerController;
