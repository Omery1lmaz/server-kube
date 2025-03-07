import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import autopopulate from "mongoose-autopopulate";

// **Interface for required product attributes when creating a new product**
interface ProductAttrs {
  name: string;
  imageUrl: string;
  description: string;
  status?: boolean;
  seller: mongoose.Schema.Types.ObjectId;
  sellingPrice: number;
  ownSellable?: boolean;
  ingredients?: mongoose.Schema.Types.ObjectId[];
  extraIngredients?: mongoose.Schema.Types.ObjectId[];
  modifierGroups?: mongoose.Schema.Types.ObjectId[];
  categoryId?: mongoose.Schema.Types.ObjectId;
  categoryAttributes?: any[];
}

// **Interface that describes a single product document**
interface ProductDoc extends mongoose.Document {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  imageUrl: string;
  description: string;
  status: boolean;
  seller: mongoose.Schema.Types.ObjectId;
  sellingPrice: number;
  ownSellable: boolean;
  ingredients: mongoose.Schema.Types.ObjectId[];
  extraIngredients: mongoose.Schema.Types.ObjectId[];
  modifierGroups: mongoose.Schema.Types.ObjectId[];
  categoryId?: mongoose.Schema.Types.ObjectId;
  categoryAttributes?: any[];
  version: number;
}

// **Interface for the product model (with custom static methods)**
interface ProductModel extends mongoose.Model<ProductDoc> {
  build(attrs: ProductAttrs): ProductDoc;
}

// **Product Schema Definition**
const productSchema = new mongoose.Schema<ProductDoc>(
  {
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: Boolean, default: true, required: true },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
      autopopulate: true,
      required: true,
    },
    sellingPrice: { type: Number, required: true, default: 0 },
    ownSellable: { type: Boolean, default: true, required: true },
    ingredients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ingredient",
        autopopulate: true,
      },
    ],
    extraIngredients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ExtraIngredient",
        autopopulate: true,
      },
    ],
    modifierGroups: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ModifierGroup",
        autopopulate: true,
      },
    ],
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      autopopulate: true,
    },
    categoryAttributes: [mongoose.Schema.Types.Mixed],
  },
  { timestamps: true }
);

productSchema.set("versionKey", "version");
productSchema.plugin(updateIfCurrentPlugin);
// productSchema.plugin(autopopulate);

// **Static method to create a product**
productSchema.statics.build = (attrs: ProductAttrs) => {
  return new Product(attrs);
};

const Product = mongoose.model<ProductDoc, ProductModel>(
  "Product",
  productSchema
);

export { Product };
