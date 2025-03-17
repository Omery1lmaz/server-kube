import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface WaiterAttrs {
  name: string;
  messages?: string[];
  seller: mongoose.Schema.Types.ObjectId;
}

interface WaiterDoc extends mongoose.Document {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  messages: string[];
  seller: mongoose.Schema.Types.ObjectId;
  version: number;
}

interface WaiterModel extends mongoose.Model<WaiterDoc> {
  build(attrs: WaiterAttrs): WaiterDoc;
}

const waiterSchema = new mongoose.Schema<WaiterDoc>(
  {
    name: { type: String, required: true },
    messages: { type: [String], default: [] },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Seller",
    },
  },
  { timestamps: true }
);

waiterSchema.set("versionKey", "version");
waiterSchema.plugin(updateIfCurrentPlugin);

waiterSchema.statics.build = (attrs: WaiterAttrs) => {
  return new Waiter(attrs);
};

const Waiter = mongoose.model<WaiterDoc, WaiterModel>("Waiter", waiterSchema);

export { Waiter };
