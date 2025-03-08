import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "@heaven-nsoft/common";
import { Category } from "../models/category";

export const deleteCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
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

    const categories = await Category.findOneAndDelete({ user: id });
    res.status(201).json({ categories });
  } catch (error) {
    next(new BadRequestError("Internal server error"));
    return;
  }
};

export default deleteCategoryController;
