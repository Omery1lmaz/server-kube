import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "@heaven-nsoft/common";
import { ExtraIngredient } from "../models/extraIngredient";
import { natsWrapper } from "../nats-wrapper";
import mongoose from "mongoose";
import { ExtraIngredientCreatedPublisher } from "../events/publishers/extra-ingredient-created-publisher";

export const createExtraIngredientController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { extraIngredient } = req.body;
    const authHeader = req.headers.authorization;
    var newId2 = new mongoose.mongo.ObjectId();
    // if (!authHeader) {
    //   next(new BadRequestError("Please log in first"));
    //   return;
    // }

    // const token = authHeader.split(" ")[1];

    // const decodedToken = jwt.verify(token, process.env.SECRET_KEY!) as {
    //   id: string;
    // };
    // if (!decodedToken?.id) {
    //   next(new BadRequestError("Invalid or expired token"));
    //   return;
    // }
    const newExtraIngredient = new ExtraIngredient({
      ...extraIngredient,
      seller: newId2,
    });
    await newExtraIngredient.save();
    new ExtraIngredientCreatedPublisher(natsWrapper.client).publish({
      id: newExtraIngredient._id,
      status: newExtraIngredient.status,
      version: newExtraIngredient.version - 1,
      name: newExtraIngredient.name,
      price: newExtraIngredient.price,
      seller: newExtraIngredient.seller,
    });
    const ingredients = await ExtraIngredient.find();
    console.log("Ingredient test result", JSON.stringify(ingredients));
    res.status(201).json({ message: "Ingredient created successfully" });
  } catch (error) {
    console.error("Error creating ingredient:", error);
    next(new BadRequestError("Internal server error"));
    return;
  }
};

export default createExtraIngredientController;
