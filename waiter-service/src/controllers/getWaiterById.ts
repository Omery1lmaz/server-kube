import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import { Waiter } from "../models/waiter";
import { BadRequestError, NotAuthorizedError } from "@heaven-nsoft/common";

const getWaiterByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const waiter = await Waiter.findById(id);
    res
      .status(201)
      .json({ message: "Waiter fetched successfully", data: waiter });
  } catch (error) {
    console.error("Error adding waiter:", error);
    next(new BadRequestError("Failed to add waiter"));
  }
};

export default getWaiterByIdController;
