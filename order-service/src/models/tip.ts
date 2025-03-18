import mongoose, { Schema, Document, Model } from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

// **Interface for required attributes when creating a new tip**
interface TipAttrs {
  seller: mongoose.Schema.Types.ObjectId;
  tip: {
    cost: number;
    waiter: mongoose.Schema.Types.ObjectId[];
  };
  order?: mongoose.Schema.Types.ObjectId;
}

// **Interface that describes a single tip document**
interface TipDoc extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  seller: mongoose.Schema.Types.ObjectId;
  tip: {
    cost: number;
    waiter: mongoose.Schema.Types.ObjectId[];
  };
  order?: mongoose.Schema.Types.ObjectId;
  version: number;
}

// **Interface for the Tip model (with custom static methods)**
interface TipModel extends Model<TipDoc> {
  build(attrs: TipAttrs): TipDoc;
}

// **Tip Schema Definition**
const tipSchema = new Schema<TipDoc>(
  {
    seller: {
      type: Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
    },
    tip: {
      cost: {
        type: Number,
        required: true,
        default: 0,
      },
      waiter: [
        {
          type: Schema.Types.ObjectId,
          ref: "Waiter",
        },
      ],
    },
    order: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: false,
    },
  },
  { timestamps: true }
);

// **Version Control Plugin**
tipSchema.set("versionKey", "version");
tipSchema.plugin(updateIfCurrentPlugin);

// **Static method to create a tip**
tipSchema.statics.build = (attrs: TipAttrs) => {
  return new Tip(attrs);
};

const Tip = mongoose.model<TipDoc, TipModel>("Tip", tipSchema);

export { Tip };
