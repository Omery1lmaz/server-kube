import { Publisher, Subjects, OrderCreatedEvent } from "@heaven-nsoft/common";

export class ModifierGroupCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
