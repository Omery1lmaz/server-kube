import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "@heaven-nsoft/common";
import { Kitchen } from "../models/kitchen";

export const createKitchenController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { kitchen } = req.body;
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return next(new BadRequestError("Please log in first"));
    }

    const token = authHeader.split(" ")[1];

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.SECRET_KEY!) as {
        id: string;
      };
    } catch (err) {
      return next(new BadRequestError("Invalid or expired token"));
    }

    if (!decodedToken?.id) {
      return next(new BadRequestError("Invalid token"));
    }

    const newKitchen = Kitchen.build({
      name: kitchen.name,
      imageURL: kitchen.imageURL,
    });

    await newKitchen.save();

    res
      .status(201)
      .json({ message: "Kitchen created successfully", kitchen: newKitchen });
  } catch (error) {
    console.error("Error creating kitchen:", error);
    next(new BadRequestError("Internal server error"));
  }
};

export default createKitchenController;
