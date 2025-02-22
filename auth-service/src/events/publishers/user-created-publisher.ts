import { Subjects, Publisher, OrderCreatedEvent } from '@heaven-nsoft/common';

export class UserCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
