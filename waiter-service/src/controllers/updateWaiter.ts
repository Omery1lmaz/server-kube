import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import { Waiter } from "../models/waiter";
import { BadRequestError, NotAuthorizedError } from "@heaven-nsoft/common";

const updateWaiterController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { name } = req.body;
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

    await Waiter.findByIdAndUpdate(id, { name });

    res.status(201).json({ message: "Waiter updated successfully" });
  } catch (error) {
    console.error("Error adding waiter:", error);
    next(new BadRequestError("Failed to add waiter"));
  }
};

export default updateWaiterController;
