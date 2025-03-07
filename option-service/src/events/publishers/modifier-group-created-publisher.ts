import {
  Publisher,
  Subjects,
  ModifierGroupCreatedEvent,
} from "@heaven-nsoft/common";

export class ModifierGroupCreatedPublisher extends Publisher<ModifierGroupCreatedEvent> {
  readonly subject = Subjects.ModifierGroupCreated;
}
