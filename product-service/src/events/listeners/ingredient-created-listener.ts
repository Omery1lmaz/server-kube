import { Message } from "node-nats-streaming";
import {
  Subjects,
  Listener,
  OrderCreatedEvent,
  IngredientCreatedEvent as IngredientCreatedEventHeaven,
} from "@heaven-nsoft/common";
import { queueGroupName } from "./queue-group-name";

export class IngredientCreatedEvent extends Listener<IngredientCreatedEventHeaven> {
  subject: Subjects.IngredientCreated = Subjects.IngredientCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: IngredientCreatedEventHeaven["data"], msg: Message) {
    const { id } = data;

    console.log("Event data!", { id });
    msg.ack();
  }
}
