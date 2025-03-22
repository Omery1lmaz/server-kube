import { CategoryCreatedEvent } from "../../../events/listeners/category-created-listener";
import { ExtraIngredientCreatedEvent } from "../../../events/listeners/extra-ingredient-created-listener";
import { IngredientCreatedEvent } from "../../../events/listeners/ingredient-created-listener";
import { ModifierGroupCreatedEvent } from "../../../events/listeners/modifier-group-created-listener";
import { ProductCreatedEvent } from "../../../events/listeners/product-created";
import { SellerCreatedEvent } from "../../../events/listeners/seller-created-listener";
import { UserAccountDeletedEvent } from "../../../events/listeners/user-account-deleted";
import { UserActivatedEvent } from "../../../events/listeners/user-activated-event";
import { UserCreatedEvent } from "../../../events/listeners/user-created-listener";
import { UserPhoneNumberUpdatedEvent } from "../../../events/listeners/user-phone-number-activated";
import { UserProfileUpdatedEvent } from "../../../events/listeners/user-profile-updated";
import { natsWrapper } from "../../../nats-wrapper";
const listenNatsEvents = () => {
  new UserCreatedEvent(natsWrapper.client).listen();
  new ProductCreatedEvent(natsWrapper.client).listen();
  new CategoryCreatedEvent(natsWrapper.client).listen();
  new ExtraIngredientCreatedEvent(natsWrapper.client).listen();
  new IngredientCreatedEvent(natsWrapper.client).listen();
  new ModifierGroupCreatedEvent(natsWrapper.client).listen();
  new SellerCreatedEvent(natsWrapper.client).listen();
  new UserActivatedEvent(natsWrapper.client).listen();
  new UserPhoneNumberUpdatedEvent(natsWrapper.client).listen();
  new UserProfileUpdatedEvent(natsWrapper.client).listen();
  new UserAccountDeletedEvent(natsWrapper.client).listen();
};

export default listenNatsEvents;
