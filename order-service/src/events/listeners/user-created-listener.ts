import { Message } from 'node-nats-streaming';
import { Subjects, Listener, OrderCreatedEvent } from '@heaven-nsoft/common';
import { queueGroupName } from './queue-group-name'


export class UserCreatedEvent extends Listener<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
    queueGroupName = queueGroupName;

    async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
        const { id, } = data;

        console.log('Event data!', { id, });
        msg.ack();
    }
}
