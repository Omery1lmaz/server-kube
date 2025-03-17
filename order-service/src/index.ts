import express from "express";
import mongoose from "mongoose";
import { natsWrapper } from "./nats-wrapper";
import { UserCreatedEvent } from "./events/listeners/user-created-listener";
import { ProductCreatedEvent } from "./events/listeners/product-created";
import { CategoryCreatedEvent } from "./events/listeners/category-created-listener";
import { ExtraIngredientCreatedEvent } from "./events/listeners/extra-ingredient-created-listener";
import { IngredientCreatedEvent } from "./events/listeners/ingredient-created-listener";
import { ModifierGroupCreatedEvent } from "./events/listeners/modifier-group-created-listener";
import { SellerCreatedEvent } from "./events/listeners/seller-created-listener";
import { app } from "./app";

const start = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI must be provided orders");
    }
    if (!process.env.NATS_CLIENT_ID) {
      throw new Error("NATS_CLIENT_ID must be defined orders");
    }
    if (!process.env.NATS_URL) {
      throw new Error("NATS_URL must be defined orders");
    }
    if (!process.env.NATS_CLUSTER_ID) {
      throw new Error("NATS_CLUSTER_ID must be defined orders");
    }
    try {
      await natsWrapper.connect(
        process.env.NATS_CLUSTER_ID,
        process.env.NATS_CLIENT_ID,
        process.env.NATS_URL
      );
      natsWrapper.client.on("close", () => {
        console.log("NATS connection closed! orders");
        process.exit();
      });
      new UserCreatedEvent(natsWrapper.client).listen();
      new ProductCreatedEvent(natsWrapper.client).listen();
      new CategoryCreatedEvent(natsWrapper.client).listen();
      new ExtraIngredientCreatedEvent(natsWrapper.client).listen();
      new IngredientCreatedEvent(natsWrapper.client).listen();
      new ModifierGroupCreatedEvent(natsWrapper.client).listen();
      new SellerCreatedEvent(natsWrapper.client).listen();
      process.on("SIGINT", () => natsWrapper.client.close());
      process.on("SIGTERM", () => natsWrapper.client.close());
    } catch (err) {
      console.error(err);
    }
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("Connected to database !!! orders");
    } catch (error) {
      console.error("Error connecting to database: orders ", error);
    }

    app.listen(4000, (err) => {
      if (!err) console.log("Auth service listening on port 4000 !!!");
    });
  } catch (error) {
    console.log("Something went wrong", error);
  }
};
start();
