import { Request, Response } from "express";
import { User } from "../Models/user";

import { createToken } from "../helpers/createToken";
import nodemailer from "nodemailer";
import { generateOTP } from "../helpers/generateOTP";
import transporter from "../utils/mailTransporter";

export const signupController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log("email test", email);
    const existingUser = await User.findOne({ email, isActive: false });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const otpToken = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 dakika geçerli

    const newUser = new User({
      email,
      password,
      otp: otpToken,
      otpExpires,
    });

    await newUser.save();

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Email Onayı",
      text: `Here is your OTP token: ${otpToken}`,
    });

    const token = createToken(JSON.stringify(newUser._id));

    res.status(201).json({
      message: "Emailinizi onaylayınız",
      token,
    });
  } catch (error) {
    console.error("Kayıt sırasında hata oluştu:", error);
    res.status(500).json({ message: "Sunucu hatası, lütfen tekrar deneyin" });
  }
};

export default signupController;
