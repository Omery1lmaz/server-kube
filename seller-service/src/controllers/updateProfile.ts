import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { Seller } from "../models/seller";
import { BadRequestError } from "@heaven-nsoft/common";
import { createToken } from "../helpers/createToken";
import transporter from "../utils/mailTransporter";
import { DecodedToken } from "../types/decodedToken";

const updateProfileController = async (
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

    const decodedToken = jwt.verify(token, process.env.SECRET_KEY as string);
    if (!decodedToken) {
      next(new BadRequestError("Invalid or expired token, please login again"));
      return;
    }

    const { profile } = req.body;
    const updatedUser = await Seller.findByIdAndUpdate(
      (decodedToken as DecodedToken).id,
      { $set: profile },
      { new: true }
    );

    if (!updatedUser) {
      next(new BadRequestError("User not found or update failed"));
      return;
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    next(new BadRequestError("Error while updating profile"));
    return;
  }
};

export default updateProfileController;
