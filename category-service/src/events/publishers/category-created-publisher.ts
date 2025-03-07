import {
  Publisher,
  Subjects,
  CategoryCreatedEvent,
} from "@heaven-nsoft/common";

export class CategoryCreatedPublisher extends Publisher<CategoryCreatedEvent> {
  readonly subject = Subjects.CategoryCreated;
}
