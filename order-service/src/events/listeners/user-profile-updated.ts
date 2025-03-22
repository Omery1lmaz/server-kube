import { Message } from "node-nats-streaming";
import {
  Subjects,
  Listener,
  UserProfileUpdatedEvent as UserProfileUpdatedEventHeaven,
} from "@heaven-nsoft/common";
import { queueGroupName } from "./queue-group-name";
import { User } from "../../models/user";

export class UserProfileUpdatedEvent extends Listener<UserProfileUpdatedEventHeaven> {
  subject: Subjects.UserProfileUpdated = Subjects.UserProfileUpdated;
  queueGroupName = queueGroupName;

  async onMessage(data: UserProfileUpdatedEventHeaven["data"], msg: Message) {
    const { id } = data;
    try {
      const updatedUser = await User.findOneAndUpdate(
        {
          _id: id,
        },
        {
          name: data.name,
        }
      );
      console.log("user phone number updated: ", JSON.stringify(updatedUser));
      msg.ack();
    } catch (error) {
      console.error("Error processing event:", error);
    }
  }
}
