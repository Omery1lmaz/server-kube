import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "@heaven-nsoft/common";
import { Table } from "../models/table";

const getSellerTablesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const tables = await Table.find({ seller: id });
    res
      .status(201)
      .json({ message: "Seller tables fetched successfully", data: tables });
  } catch (error) {
    next(new BadRequestError("Error while updating working status"));
  }
};

export default getSellerTablesController;
