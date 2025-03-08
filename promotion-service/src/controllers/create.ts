import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "@heaven-nsoft/common";
import { Promotion } from "../models/promotion";
import mongoose from "mongoose";

export const createModifierGroupController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { promotion } = req.body;
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      next(new BadRequestError("Please log in first"));
      return;
    }
    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY!) as {
      id: string;
    };
    if (!decodedToken?.id) {
      next(new BadRequestError("Invalid or expired token"));
      return;
    }
    const newPromotion = new Promotion({
      ...promotion,
      seller: new mongoose.mongo.ObjectId(),
    });
    await newPromotion.save();
    res.status(201).json({ message: "Promotion group created successfully" });
  } catch (error) {
    console.error("Error creating Promotion:", error);
    next(new BadRequestError("Internal server error"));
    return;
  }
};

export default createModifierGroupController;
