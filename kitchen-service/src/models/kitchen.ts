import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

// **Kitchen Modeli için Gerekli Özellikler (Interface)**
interface KitchenAttrs {
  name: string;
  imageURL?: string;
}

// **Kitchen Dokümanını Tanımlayan Interface**
interface KitchenDoc extends mongoose.Document {
  name: string;
  imageURL: string;
  version: number;
}

// **Kitchen Modeli için Statik Metotları Tanımlayan Interface**
interface KitchenModel extends mongoose.Model<KitchenDoc> {
  build(attrs: KitchenAttrs): KitchenDoc;
}

// **Kitchen Schema Tanımlaması**
const kitchenSchema = new mongoose.Schema<KitchenDoc>(
  {
    name: { type: String, required: true },
    imageURL: {
      type: String,
      required: true,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS68e658Ir4VChZsFXsRBdV2079HERf_OCACxmGkc6pXqklHqLXmgjXkDiR_VuwvoKapZ4iteTnL834l7RIWXXtfkvb-0Lhui_7OKf6Pg",
    },
  },
  { timestamps: true }
);

// **Versioning için updateIfCurrentPlugin Eklendi**
kitchenSchema.set("versionKey", "version");
kitchenSchema.plugin(updateIfCurrentPlugin);

// **Kitchen Modeli için Statik Metot (Factory Function)**
kitchenSchema.statics.build = (attrs: KitchenAttrs) => {
  return new Kitchen(attrs);
};

// **Kitchen Modelini Tanımlama**
const Kitchen = mongoose.model<KitchenDoc, KitchenModel>(
  "Kitchen",
  kitchenSchema
);

export { Kitchen };
