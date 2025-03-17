import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Seller } from "../models/seller";
import { Order } from "../models/order";
import { Tip } from "../models/tip";
import { BadRequestError, NotAuthorizedError } from "@heaven-nsoft/common";
const getActiveOrdersByUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { tip, seller } = req.body;
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
    // Yeni bahşiş oluştur
    const newTip = await Tip.create({ tip, seller });

    // Siparişe ekle
    const activeOrders = await Order.find({
      status: { $in: ["Pending", "Processing"] },
      user: decodedToken.id,
    }).lean();

    res.status(200).json({
      data: activeOrders,
      success: true,
      message: "Active orders fetched successfully",
      error: false,
    });
  } catch (error) {
    next(error);
  }
};

export default getActiveOrdersByUserController;
