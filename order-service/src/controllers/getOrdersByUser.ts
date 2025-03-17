import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Order } from "../models/order";
import { BadRequestError, NotAuthorizedError } from "@heaven-nsoft/common";

const getOrdersByUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(new NotAuthorizedError());
  }

  try {
    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY!) as {
      id: string;
    };

    if (!decodedToken || !decodedToken.id) {
      return next(new NotAuthorizedError());
    }

    const { filterQuery } = req.query;
    const validStatuses = ["Pending", "Processing", "Completed", "Cancelled"];

    const query: { user: string; isReady?: string } = { user: decodedToken.id };

    if (
      filterQuery &&
      typeof filterQuery === "string" &&
      validStatuses.includes(filterQuery)
    ) {
      query.isReady = filterQuery;
    }

    const orders = await Order.find(query).populate([
      { path: "seller", select: "name imageUrl" },
      { path: "shippingAddress" },
    ]);

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    next(new BadRequestError("Failed to fetch orders"));
  }
};

export default getOrdersByUserController;
