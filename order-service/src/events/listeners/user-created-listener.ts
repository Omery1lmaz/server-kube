import { Message } from "node-nats-streaming";
import {
  Subjects,
  Listener,
  UserCreatedEvent as UserCreatedEventHeaven,
} from "@heaven-nsoft/common";
import { queueGroupName } from "./queue-group-name";
import { User } from "../../models/user";

export class UserCreatedEvent extends Listener<UserCreatedEventHeaven> {
  subject: Subjects.UserCreated = Subjects.UserCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: UserCreatedEventHeaven["data"], msg: Message) {
    const { id } = data;
    console.log(id, "id");
    try {
      const existingUser = await User.findById(id);

      if (existingUser) {
        console.log("Ingredient already exists, skipping event");
        return msg.ack();
      }
      const newUser = await User.create({ _id: id, ...data });
      console.log(newUser, "new ingredient created");
      const users = await User.find();
      console.log("all Users after creating new one", JSON.stringify(users));
      msg.ack();
    } catch (error) {
      console.error("Error processing event:", error);
    }
  }
}
