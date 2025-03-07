import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { BadRequestError, NotAuthorizedError } from "@heaven-nsoft/common";
import { natsWrapper } from "../nats-wrapper";
import mongoose from "mongoose";
import { ProductCreatedPublisher } from "../events/publishers/product-created-publisher";
import { Product } from "../models/product";

export const createProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { product } = req.body;
    // const authHeader = req.headers.authorization;

    // if (!authHeader) {
    //   next(new NotAuthorizedError());
    //   return;
    // }

    // const token = authHeader.split(" ")[1];
    // const decodedToken = jwt.verify(token, process.env.SECRET_KEY!) as {
    //   id: string;
    // };

    const newProduct = new Product({
      ...product,
      categoryId: new mongoose.Types.ObjectId(),
      seller: new mongoose.Types.ObjectId(),
    });

    await newProduct.save();
    await new ProductCreatedPublisher(natsWrapper.client).publish({
      id: newProduct._id,
      status: newProduct.status,
      version: newProduct.version - 1,
      name: newProduct.name,
      description: newProduct.description,
      seller: newProduct.seller,
      sellingPrice: newProduct.sellingPrice,
      ownSellable: newProduct.ownSellable,
      ingredients: newProduct.ingredients,
      extraIngredients: newProduct.extraIngredients,
      modifierGroups: newProduct.modifierGroups,
      categoryId: newProduct.categoryId,
      categoryAttributes: newProduct.categoryAttributes || undefined,
      imageUrl: newProduct.imageUrl,
    });
    res.status(201).json({ message: "Product successfully created." });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new NotAuthorizedError());
    }

    console.error(error);
    next(
      new BadRequestError("Product could not be created. Please try again.")
    );
  }
};

export default createProductController;

// id: mongoose.Schema.Types.ObjectId;
// version: number;
// name: string;
// imageUrl: string;
// description: string;
// status: boolean;
// seller: mongoose.Schema.Types.ObjectId;
// sellingPrice: number;
// ownSellable: boolean;
// ingredients: mongoose.Schema.Types.ObjectId[];
// extraIngredients: mongoose.Schema.Types.ObjectId[];
// modifierGroups: mongoose.Schema.Types.ObjectId[];
// categoryId?: mongoose.Schema.Types.ObjectId;
// categoryAttributes?: any[];
