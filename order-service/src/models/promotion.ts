import mongoose, { Schema, Document, Model } from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

// **Interface for required attributes when creating a new promotion**
interface PromotionAttrs {
  seller: mongoose.Schema.Types.ObjectId[];
  imageURL?: string;
  description?: string;
  name: string;
  price: number;
  lowestPrice: number;
  highestPrice: number;
  maximumUsageRights: number;
  expirationDate: Date;
  active?: boolean;
  modifiedOn?: Date;
}

// **Interface that describes a single promotion document**
interface PromotionDoc extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  seller: mongoose.Schema.Types.ObjectId[];
  imageURL: string;
  description?: string;
  name: string;
  price: number;
  lowestPrice: number;
  highestPrice: number;
  maximumUsageRights: number;
  expirationDate: Date;
  active: boolean;
  modifiedOn: Date;
  version: number;
}

// **Interface for the promotion model (with custom static methods)**
interface PromotionModel extends Model<PromotionDoc> {
  build(attrs: PromotionAttrs): PromotionDoc;
}

// **Promotion Schema Definition**
const promotionSchema = new Schema<PromotionDoc>(
  {
    seller: [
      {
        type: Schema.Types.ObjectId,
        ref: "Seller",
        required: true,
      },
    ],
    imageURL: {
      type: String,
      required: true,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc9APxkj0xClmrU3PpMZglHQkx446nQPG6lA&s",
    },
    description: {
      type: String,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0.0,
    },
    lowestPrice: {
      type: Number,
      required: true,
      default: 1.0,
    },
    highestPrice: {
      type: Number,
      required: true,
      default: 1.0,
    },
    maximumUsageRights: {
      type: Number,
      required: true,
      default: 1,
    },
    expirationDate: {
      type: Date,
      required: true,
      default: () => new Date(Date.now() + 100000),
    },
    active: {
      type: Boolean,
      default: true,
    },
    modifiedOn: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

promotionSchema.set("versionKey", "version");
promotionSchema.plugin(updateIfCurrentPlugin);

// **Static method to create a promotion**
promotionSchema.statics.build = (attrs: PromotionAttrs) => {
  return new Promotion(attrs);
};

const Promotion = mongoose.model<PromotionDoc, PromotionModel>(
  "Promotion",
  promotionSchema
);

export { Promotion };
