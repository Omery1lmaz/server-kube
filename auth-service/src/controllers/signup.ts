import { Request, Response } from "express";
import { User } from "../Models/user";

import { createToken } from "../helpers/createToken";
import nodemailer from "nodemailer";
import { generateOTP } from "../helpers/generateOTP";

export const signupController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email, isActive: false });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
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

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      secure: true,
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Email Onayı",
      text: `Here is your OTP token: ${otpToken}`,
    });

    const token = createToken(newUser._id as string);

    return res.status(201).json({
      message: "Emailinizi onaylayınız",
      token,
    });
  } catch (error) {
    console.error("Kayıt sırasında hata oluştu:", error);
    return res
      .status(500)
      .json({ message: "Sunucu hatası, lütfen tekrar deneyin" });
  }
};

export default signupController;
