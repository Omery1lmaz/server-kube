import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "@heaven-nsoft/common";
import { ModifierGroup } from "../models/modifierGroup";
import { natsWrapper } from "../nats-wrapper";
import { ModifierGroupCreatedPublisher } from "../events/publishers/modifier-group-created-publisher";
import mongoose from "mongoose";

export const createModifierGroupController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { modifierGroup } = req.body;
    // const authHeader = req.headers.authorization;

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

    const newModifierGroup = new ModifierGroup({
      ...modifierGroup,
      seller: new mongoose.mongo.ObjectId(),
    });

    await newModifierGroup.save();

    new ModifierGroupCreatedPublisher(natsWrapper.client).publish({
      id: newModifierGroup._id,
      version: newModifierGroup.version,
      name: newModifierGroup.name,
      min: newModifierGroup.min,
      max: newModifierGroup.max,
      multiSelectableModifierProduct:
        newModifierGroup.multiSelectableModifierProduct,
      modifierProducts: newModifierGroup.modifierProducts.map((product) => ({
        productId: product.productId.toString(),
        status: product.status,
        extraPrice: product.extraPrice,
      })),
      status: newModifierGroup.status,
      seller: newModifierGroup.seller.toString(),
    });

    res.status(201).json({ message: "Modifier group created successfully" });
  } catch (error) {
    console.error("Error creating modifier group:", error);
    next(new BadRequestError("Internal server error"));
    return;
  }
};

export default createModifierGroupController;
