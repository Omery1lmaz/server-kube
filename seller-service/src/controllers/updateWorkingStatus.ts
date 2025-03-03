import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { Seller } from "../models/seller";
import { BadRequestError } from "@heaven-nsoft/common";
import { DecodedToken } from "../types/decodedToken";

const updateWorkingStatusController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return next(new BadRequestError("Please login first"));
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return next(
        new BadRequestError("Invalid or expired token, please login again")
      );
    }

    const decodedToken = jwt.verify(token, process.env.SECRET_KEY as string);
    if (!decodedToken) {
      return next(new BadRequestError("Unauthorized access"));
    }

    const user = await Seller.findById((decodedToken as DecodedToken).id);
    if (!user) {
      return next(new BadRequestError("User not found"));
    }

    res.cookie("token", token, {
      secure: false,
      path: "/",
      domain: "https://bitiklasiparis.com",
      httpOnly: false,
      maxAge: 900000000,
    });

    res.json({
      _id: user._id,
      email: user.email,
      name: user.name,
      isAdmin: user.isSeller,
      isWorking: user.isWorking,
      commissionPercentage: user.commissionPercentage,
    });
  } catch (error) {
    return next(new BadRequestError("Error while fetching user details"));
  }
};

export default updateWorkingStatusController;
