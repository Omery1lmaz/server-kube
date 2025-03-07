import { Subjects, Publisher, UserCreatedEvent } from "@heaven-nsoft/common";

export class UserCreatedPublisher extends Publisher<UserCreatedEvent> {
  subject: Subjects.UserCreated = Subjects.UserCreated;
}
