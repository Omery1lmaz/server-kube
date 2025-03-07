import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "@heaven-nsoft/common";
import { Category } from "../models/category";
import { natsWrapper } from "../nats-wrapper";
import { CategoryCreatedPublisher } from "../events/publishers/category-created-publisher";
import mongoose from "mongoose";

export const createCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { category } = req.body;
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

    const newCategory = new Category({
      ...category,
      user: new mongoose.mongo.ObjectId(),
    });

    await newCategory.save();
    await new CategoryCreatedPublisher(natsWrapper.client).publish({
      id: newCategory._id,
      name: newCategory.name,
      user: newCategory.user,
      version: newCategory.version - 1,
      description: newCategory.description,
    });
    res.status(201).json({ message: "category created successfully" });
  } catch (error) {
    console.error("Error creating modifier group:", error);
    next(new BadRequestError("Internal server error"));
    return;
  }
};

export default createCategoryController;
