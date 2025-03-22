import { NextFunction, Request, Response } from "express";
import { User } from "../Models/user";
import { BadRequestError, NotAuthorizedError } from "@heaven-nsoft/common";
import { createToken } from "../helpers/createToken";
import jwt from "jsonwebtoken";
import { DecodedToken } from "../types/decodedToken";
import { UserPhoneNumberUpdatedPublisher } from "../events/publishers/user-phone-number-activated-publisher";
import { natsWrapper } from "../nats-wrapper";
export const updatePhoneNumberController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { number } = req.body;

  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(
      token,
      process.env.SECRET_KEY as string
    ) as DecodedToken;
    const existUser = await User.findById(decodedToken.id);
    if (!existUser) {
      next(new NotAuthorizedError());
      return;
    }
    existUser.number = number;
    await existUser.save();
    await new UserPhoneNumberUpdatedPublisher(natsWrapper.client).publish({
      id: existUser._id,
      version: existUser.version - 1,
      number: existUser.number as string,
    });
    res.status(200).json({
      message: "Telefon numarası başarıyla güncellendi",
      isOk: true,
      statusCode: 200,
      data: {},
    });
  }
};

export default updatePhoneNumberController;
