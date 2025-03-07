import { Message } from "node-nats-streaming";
import {
  Subjects,
  Listener,
  ProductCreatedEvent as ProductCreatedEventHeaven,
} from "@heaven-nsoft/common";
import { queueGroupName } from "./queue-group-name";
import { Product } from "../../models/product";

export class ProductCreatedEvent extends Listener<ProductCreatedEventHeaven> {
  subject: Subjects.ProductCreated = Subjects.ProductCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: ProductCreatedEventHeaven["data"], msg: Message) {
    const { id } = data;
    console.log(id, "id");
    try {
      const existingProduct = await Product.findById(id);

      if (existingProduct) {
        console.log("Ingredient already exists, skipping event");
        return msg.ack();
      }
      const newProduct = await Product.create({ _id: id, ...data });
      console.log(newProduct, "new ingredient created");
      const products = await Product.find();
      console.log(
        "all products after creating new one",
        JSON.stringify(products)
      );
      msg.ack();
    } catch (error) {
      console.error("Error processing event:", error);
    }
  }
}
