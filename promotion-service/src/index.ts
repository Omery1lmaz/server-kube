import mongoose from "mongoose";
import nats from "node-nats-streaming";
import { natsWrapper } from "./nats-wrapper";
import { OrderStatus, Publisher } from "@heaven-nsoft/common";
import { app } from "./app";
import { SellerCreatedEvent } from "./events/listeners/seller-created-listener";

const start = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI must be provided");
    }
    if (!process.env.NATS_CLIENT_ID) {
      throw new Error("NATS_CLIENT_ID must be defined");
    }
    if (!process.env.NATS_URL) {
      throw new Error("NATS_URL must be defined");
    }
    if (!process.env.NATS_CLUSTER_ID) {
      throw new Error("NATS_CLUSTER_ID must be defined");
    }
    if (!process.env.RESET_PASSWORD_SECRET_KEY) {
      throw new Error("RESET_PASSWORD_SECRET_KEY must be defined");
    }
    if (!process.env.SECRET_KEY) {
      throw new Error("SECRET_KEY must be defined");
    }
    try {
      await natsWrapper.connect(
        process.env.NATS_CLUSTER_ID,
        process.env.NATS_CLIENT_ID,
        process.env.NATS_URL
      );
      natsWrapper.client.on("close", () => {
        console.log("NATS connection closed!");
        process.exit();
      });
      new SellerCreatedEvent(natsWrapper.client).listen();
      process.on("SIGINT", () => natsWrapper.client.close());
      process.on("SIGTERM", () => natsWrapper.client.close());
    } catch (err) {
      console.error(err);
    }
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("Connected to database !!!");
    } catch (error) {
      console.error("Error connecting to database: ", error);
    }
    app.use((req, res, next) => {
      console.log("Auth service");
      next();
    });
    const listen = app.listen(4008, () => {
      console.log("Auth service listening on port 3000!");
    });
    listen.on("error", (err) => {
      console.error("Server error: ", err);
    });
  } catch (error) {
    console.log("Something went wrong", error);
  }
};
start();
