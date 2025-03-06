import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "@heaven-nsoft/common";
import { Ingredient } from "../models/ingredient";
import { natsWrapper } from "../nats-wrapper";
import { IngredientCreatedPublisher } from "../events/publishers/ingredient-created-publisher";

export const createIngredientController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("createIngredientController");
    const { ingredient } = req.body;
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      next(new BadRequestError("Please log in first"));
      return;
    }

    const token = authHeader.split(" ")[1];

    const decodedToken = jwt.verify(token, process.env.SECRET_KEY!) as {
      id: string;
    };
    if (!decodedToken?.id) {
      next(new BadRequestError("Invalid or expired token"));
      return;
    }
    const newIngredient = new Ingredient({
      ...ingredient,
      seller: decodedToken.id,
    });
    await newIngredient.save();
    new IngredientCreatedPublisher(natsWrapper.client).publish({
      id: JSON.stringify(newIngredient._id),
      status: newIngredient.status,
      version: 1,
      name: newIngredient.name,
      price: newIngredient.price,
      seller: JSON.stringify(newIngredient.seller),
    });
    res.status(201).json({ message: "Ingredient created successfully" });
  } catch (error) {
    console.error("Error creating ingredient:", error);
    next(new BadRequestError("Internal server error"));
    return;
  }
};

export default createIngredientController;
