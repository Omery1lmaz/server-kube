import {
  Publisher,
  Subjects,
  SellerCreatedEvent as SellerCreatedEventHeaven,
} from "@heaven-nsoft/common";

export class SellerCreatedEventPublisher extends Publisher<SellerCreatedEventHeaven> {
  readonly subject = Subjects.SellerCreated;
}
