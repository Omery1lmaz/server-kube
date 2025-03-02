import { NextFunction, Request, Response } from "express";
import axios from "axios";
import { User } from "../Models/user";
import { BadRequestError } from "@heaven-nsoft/common";
import { createToken } from "../helpers/createToken";
import verifyIdToken from "../helpers/verifyIdToken";

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

export const googleSigninController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idToken, serverAuthCode, user } = req.body;

    const payload = await verifyIdToken(idToken);

    let existingUser = await User.findOne({ googleId: payload!.sub });

    if (!existingUser) {
      const emailExist = await User.findOne({ email: user.email });
      if (!emailExist) {
        const response = await axios.post(
          "https://oauth2.googleapis.com/token",
          {
            code: serverAuthCode,
            client_id: googleClientId,
            client_secret: googleClientSecret,
            redirect_uri: "",
            grant_type: "authorization_code",
          }
        );

        const { refresh_token } = response.data;

        existingUser = new User({
          googleId: payload!.sub,
          provider: "google",
          name: user.name,
          email: user.email,
          imageUrl: user.photo,
          refreshToken: refresh_token,
          isAdmin: false,
          isActive: true,
        });
        await existingUser.save();

        const token = createToken(JSON.stringify(existingUser._id));
        res.status(200).json({
          user: existingUser,
          googleToken: idToken,
          token: token,
        });
      } else {
        next(new BadRequestError("Geçersiz kimlik doğrulama yöntemi"));
      }
    } else {
      const token = createToken(JSON.stringify(existingUser._id));
      res.status(200).json({
        user: existingUser,
        googleToken: idToken,
        token: token,
      });
    }
  } catch (error) {
    res.status(400).json({ error: "Geçersiz veya süresi dolmuş token" });
  }
};

export default googleSigninController;
