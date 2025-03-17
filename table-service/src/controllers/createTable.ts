import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "@heaven-nsoft/common";
import { Table } from "../models/table";

const createTableController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      next(new BadRequestError("Please login first"));
      return;
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      next(new BadRequestError("Invalid or expired token, please login again"));
      return;
    }

    const decodedToken = jwt.verify(token, process.env.SECRET_KEY!) as {
      id: string;
    };
    if (!decodedToken) {
      next(new BadRequestError("Invalid or expired token, please login again"));
      return;
    }
    const { name, active, reserved } = req.body;

    const newTable = new Table({
      seller: decodedToken.id,
      name,
      active,
      reserved,
    });

    await newTable.save();
    res
      .status(201)
      .json({ message: "Table created successfully", data: newTable });
  } catch (error) {
    next(new BadRequestError("Error while updating working status"));
  }
};

export default createTableController;
