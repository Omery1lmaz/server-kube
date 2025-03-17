import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Order } from "../models/order";
import { validationResult } from "express-validator";
import { BadRequestError, NotAuthorizedError } from "@heaven-nsoft/common";

const updateOrderStatusController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { status } = req.body;
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(new NotAuthorizedError());
  }

  try {
    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY!) as {
      id: string;
    };

    if (!decodedToken?.id) {
      return next(new NotAuthorizedError());
    }

    const updatedOrder = await Order.findOneAndUpdate(
      { _id: id, seller: decodedToken.id },
      { isReady: status },
      { new: true }
    );

    if (!updatedOrder) {
      return next(new BadRequestError("Order update failed"));
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error updating order:", error);
    next(new BadRequestError("Order did not successfully update"));
  }
};

export default updateOrderStatusController;
