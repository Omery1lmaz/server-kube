import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "@heaven-nsoft/common";
import { Category } from "../models/category";

export const getCategoriesBySellerIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const categories = await Category.find({ user: id });
    res.status(201).json({ categories });
  } catch (error) {
    next(new BadRequestError("Internal server error"));
    return;
  }
};

export default getCategoriesBySellerIdController;
