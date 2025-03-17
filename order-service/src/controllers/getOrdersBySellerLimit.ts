import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Seller } from "../models/seller";
import handleCheckOrderProducts from "../utils/order/checkOrderProduct";
import handleCheckOrderDiscount from "../utils/order/checkOrderDiscount";
import { Order } from "../models/order";
import { BadRequestError, NotAuthorizedError } from "@heaven-nsoft/common";
const getOrdersBySellerLimitController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { limit, skip } = req.params;
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    next(new NotAuthorizedError());
    return;
  }

  try {
    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY!) as {
      id: string;
      isSeller: boolean;
    };

    if (!decodedToken?.id || !decodedToken?.isSeller) {
      next(new NotAuthorizedError());
      return;
    }

    const query = {
      ...(req.body.query || {}),
      seller: decodedToken.id,
    };

    const orders = await Order.find(query)
      .sort({ date: -1 })
      .skip(Number(skip))
      .limit(Number(limit))
      .populate({ path: "seller", select: "name" });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    next(new BadRequestError("Failed to fetch orders"));
  }
};
export default getOrdersBySellerLimitController;
