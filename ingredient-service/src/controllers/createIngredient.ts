import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "@heaven-nsoft/common";
import { Ingredient } from "../models/ingredient";
import { natsWrapper } from "../nats-wrapper";
import { IngredientCreatedPublisher } from "../events/publishers/ingredient-created-publisher";
import mongoose from "mongoose";

export const createIngredientController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { ingredient } = req.body;
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
    const newIngredient = new Ingredient({
      ...ingredient,
      seller: newId2,
    });
    await newIngredient.save();
    const ingredients = await Ingredient.find();
    console.log("Ingredient test result", JSON.stringify(ingredients));
    await new IngredientCreatedPublisher(natsWrapper.client).publish({
      id: newIngredient._id,
      status: newIngredient.status,
      version: newIngredient.version - 1,
      name: newIngredient.name,
      price: newIngredient.price,
      seller: newIngredient.seller,
    });
    res.status(201).json({ message: "Ingredient created successfully" });
  } catch (error) {
    console.error("Error creating ingredient:", error);
    next(new BadRequestError("Internal server error"));
    return;
  }
};

export default createIngredientController;
