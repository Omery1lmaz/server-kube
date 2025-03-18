import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { BadRequestError } from "@heaven-nsoft/common";
import { Tip } from "../models/tip";
import mongoose from "mongoose";

export const createTipController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return next(new BadRequestError("Please log in first"));
    }

    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY!) as {
      id: string;
    };

    if (!decodedToken?.id) {
      next(new BadRequestError("Invalid or expired token"));
    }

    const { tip, order } = req.body;
    const newTip = Tip.build({
      seller: new mongoose.Schema.Types.ObjectId(decodedToken.id),
      tip,
      order,
    });

    await newTip.save();

    // **4. Başarılı Yanıt**
    res.status(201).json({
      message: "Tip created successfully",
      tip: newTip,
    });
  } catch (error) {
    console.error("Error creating tip:", error);
    next(new BadRequestError("Internal server error"));
  }
};
