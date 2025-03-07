import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { Seller } from "../models/seller";
import { BadRequestError } from "@heaven-nsoft/common";
import { createToken } from "../helpers/createToken";
import transporter from "../utils/mailTransporter";
import { SellerCreatedEventPublisher } from "../events/publishers/seller-created-publisher";
import { natsWrapper } from "../nats-wrapper";

const signupController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { seller }: { seller: any } = req.body;

    const existingUser = await Seller.findOne({ email: seller.email });
    if (existingUser) {
      next(new BadRequestError("User already exists"));
      return;
    }

    const newUser = new Seller(seller);

    await newUser.save();

    const token = createToken(JSON.stringify(newUser._id));
    const verificationUrl = `http://localhost:3000/users/${newUser._id}/verify/${token}`;

    await new SellerCreatedEventPublisher(natsWrapper.client).publish({
      commissionPercentage: newUser.commissionPercentage,
      createdAt: new Date(Date.now()).toString(),
      email: newUser.email,
      id: newUser._id,
      isAdmin: newUser.isAdmin,
      isWorking: newUser.isWorking,
      isSeller: newUser.isSeller,
      imageUrl: newUser.imageUrl,
      isActive: newUser.isActive,
      name: newUser.name,
      number: newUser.number,
      storeName: newUser.storeName,
      waiter: newUser.waiter,
      kitchenCategory: newUser.kitchenCategory,
      isDeleted: newUser.isDeleted,
      isTakeAway: newUser.isTakeAway,
      location: newUser.location,
      updatedAt: new Date(Date.now()).toString(),
      version: newUser.version - 1,
      address: newUser.address,
      taxNumber: newUser.taxNumber,
      companyTitle: newUser.companyTitle,
      companyType: newUser.companyType,
      bankAccountNumber: newUser.bankAccountNumber,
      bankAccountOwnerName: newUser.bankAccountOwnerName,
    });
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: newUser.email,
      subject: "Email Onaylamak",
      text: `Hesabınızı onaylamak için aşağıdaki bağlantıya tıklayın:\n\n${verificationUrl}`,
    });

    res.status(201).json({ message: "Emailinizi onaylayınız" });
  } catch (error) {
    console.log(error);
    next(new BadRequestError("Hesap oluşturulamadı"));
    return;
  }
};

export default signupController;
