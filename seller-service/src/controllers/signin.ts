import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { Seller } from "../models/seller";
import { BadRequestError } from "@heaven-nsoft/common";
import { createToken } from "../helpers/createToken";

export const signinController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const user = await Seller.findOne({ email });
    if (!user) {
      return next(new BadRequestError("User not found"));
    }

    if (!user.isActive) {
      return next(new BadRequestError("Please verify your email"));
    }

    if (!user.isSeller) {
      return next(new BadRequestError("Account information does not match"));
    }

    const isPasswordValid = await user.matchPassword(password);
    if (!isPasswordValid) {
      return next(new BadRequestError("Invalid email or password"));
    }

    const token = createToken(JSON.stringify(user._id));
    req.session = {
      ...req.session,
      token: token,
    };

    res.cookie("token", token, {
      secure: false,
      path: "/",
      httpOnly: false,
      maxAge: 900000000,
    });

    res.status(200).json({
      _id: user._id,
      email: user.email,
      name: user.name,
      isAdmin: user.isSeller,
      session: req.session,
    });
  } catch (error) {
    return next(new BadRequestError("An error occurred while logging in"));
  }
};
