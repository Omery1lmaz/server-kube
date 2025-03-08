import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "@heaven-nsoft/common";
import { Category } from "../models/category";

export const getCategoryByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    res.status(201).json({ category });
  } catch (error) {
    next(new BadRequestError("Internal server error"));
    return;
  }
};

export default getCategoryByIdController;
