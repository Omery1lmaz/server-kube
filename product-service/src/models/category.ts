import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

// **Interface for required category attributes when creating a new category**
interface CategoryAttrs {
  name: string;
  description?: string;
  user: mongoose.Schema.Types.ObjectId;
}

// **Interface that describes a single category document**
interface CategoryDoc extends mongoose.Document {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  description: string;
  user: mongoose.Schema.Types.ObjectId;
  version: number;
}

// **Interface for the category model (with custom static methods)**
interface CategoryModel extends mongoose.Model<CategoryDoc> {
  build(attrs: CategoryAttrs): CategoryDoc;
}

// **Category Schema Definition**
const categorySchema = new mongoose.Schema<CategoryDoc>(
  {
    name: { type: String, required: true },
    description: { type: String },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Seller", // This refers to the 'Seller' model, update it if needed
    },
  },
  { timestamps: true }
);

categorySchema.set("versionKey", "version");
categorySchema.plugin(updateIfCurrentPlugin);

// **Static method to create a category**
categorySchema.statics.build = (attrs: CategoryAttrs) => {
  return new Category(attrs);
};

const Category = mongoose.model<CategoryDoc, CategoryModel>(
  "Category",
  categorySchema
);

export { Category };
