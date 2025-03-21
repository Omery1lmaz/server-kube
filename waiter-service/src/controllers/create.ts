import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import { Waiter } from "../models/waiter";
import { BadRequestError, NotAuthorizedError } from "@heaven-nsoft/common";

const createWaiterController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

    const { waiter } = req.body;
    const newWaiter = new Waiter({ ...waiter, seller: decodedToken.id });

    await newWaiter.save();
    res.status(201).json({ message: "Waiter added successfully" });
  } catch (error) {
    console.error("Error adding waiter:", error);
    next(new BadRequestError("Failed to add waiter"));
  }
};

export default createWaiterController;
