import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Order } from "../models/order";
import { validationResult } from "express-validator";
import { BadRequestError, NotAuthorizedError } from "@heaven-nsoft/common";

const updateOrderStatustoCancelController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { reason } = req.body;
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    next(new NotAuthorizedError());
    return;
  }

  try {
    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY!) as {
      id: string;
    };

    if (!decodedToken?.id) {
      next(new NotAuthorizedError());
      return;
    }

    const order = await Order.findById(id);
    if (!order) {
      next(new BadRequestError("Order not found"));
      return;
    }

    const now = new Date();
    const orderDate = new Date(order.createdAt);
    const twentyFourHoursLater = new Date(
      orderDate.getTime() + 24 * 60 * 60 * 1000
    );

    if (now > twentyFourHoursLater) {
      res.status(403).json({
        message:
          "It has been more than 24 hours, so you can't cancel the order.",
        success: false,
        error: true,
      });
      return;
    }

    if (order.user.toString() !== decodedToken.id) {
      res.status(403).json({
        message: "You are not authorized to cancel this order.",
        success: false,
        error: true,
      });
      return;
    }

    order.status = "Cancelled";
    order.cancelReason = reason;
    await order.save();

    res.status(200).json({
      message: "Order successfully canceled",
      order,
      success: true,
      error: false,
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    next(new BadRequestError("Order did not successfully update"));
  }
};

export default updateOrderStatustoCancelController;
