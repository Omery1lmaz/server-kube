import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { BadRequestError, NotAuthorizedError } from "@heaven-nsoft/common";
import { natsWrapper } from "../nats-wrapper";
import mongoose from "mongoose";
import { ProductCreatedPublisher } from "../events/publishers/product-created-publisher";
import { Product } from "../models/product";
import fs from "fs";
import {
  bucket,
  getRequestFileAndUpload,
} from "../../utils/google/googleCloudProductImage";

export const createProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { product } = req.body;

    const imageUrl = await getRequestFileAndUpload(req);

    const newProduct = new Product({
      ...product,
      categoryId: new mongoose.Types.ObjectId(),
      seller: new mongoose.Types.ObjectId(),
      imageUrl,
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
      return next(new NotAuthorizedError());
    }

    console.error(error);
    return next(
      new BadRequestError("Product could not be created. Please try again.")
    );
  }
};

export default createProductController;
