import { Message } from "node-nats-streaming";
import {
  Subjects,
  Listener,
  UserPhoneNumberUpdatedEvent as UserPhoneNumberUpdatedEventHeaven,
} from "@heaven-nsoft/common";
import { queueGroupName } from "./queue-group-name";
import { User } from "../../models/user";

export class UserPhoneNumberUpdatedEvent extends Listener<UserPhoneNumberUpdatedEventHeaven> {
  subject: Subjects.UserPhoneNumberUpdated = Subjects.UserPhoneNumberUpdated;
  queueGroupName = queueGroupName;

  async onMessage(
    data: UserPhoneNumberUpdatedEventHeaven["data"],
    msg: Message
  ) {
    const { id } = data;
    try {
      const updatedUser = await User.findOneAndUpdate(
        {
          _id: id,
        },
        {
          number: data.number,
        }
      );
      console.log("user phone number updated: ", JSON.stringify(updatedUser));
      msg.ack();
    } catch (error) {
      console.error("Error processing event:", error);
    }
  }
}
