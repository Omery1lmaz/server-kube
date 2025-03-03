import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { Seller } from "../models/seller";
import { BadRequestError } from "@heaven-nsoft/common";
import { createToken } from "../helpers/createToken";
import transporter from "../utils/mailTransporter";

const signupController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      name,
      email,
      password,
      storeName,
      mersisNumber,
      bankAccountNumber,
      bankAccountOwnerName,
      taxOffice,
      companyTitle,
      taxNumber,
      companyType,
      number,
    } = req.body;

    const existingUser = await Seller.findOne({ email });
    if (existingUser) {
      next(new BadRequestError("User already exists"));
      return;
    }

    const newUser = new Seller({
      name,
      email,
      password,
      storeName,
      mersisNumber,
      bankAccountNumber,
      bankAccountOwnerName,
      taxOffice,
      companyTitle,
      taxNumber,
      companyType,
      number,
    });

    await newUser.save();

    const token = createToken(JSON.stringify(newUser._id));
    const verificationUrl = `http://localhost:3000/users/${newUser._id}/verify/${token}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Email Onaylamak",
      text: `Hesabınızı onaylamak için aşağıdaki bağlantıya tıklayın:\n\n${verificationUrl}`,
    });

    res.status(201).json({ message: "Emailinizi onaylayınız" });
  } catch (error) {
    next(new BadRequestError("Hesap oluşturulamadı"));
    return;
  }
};

export default signupController;
