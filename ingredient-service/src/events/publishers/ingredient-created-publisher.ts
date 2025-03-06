import {
  Publisher,
  Subjects,
  IngredientCreatedEvent,
} from "@heaven-nsoft/common";

export class IngredientCreatedPublisher extends Publisher<IngredientCreatedEvent> {
  readonly subject = Subjects.IngredientCreated;
}
