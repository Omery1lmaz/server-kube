import mongoose, { Document, Schema, Model } from "mongoose";

// **Tip Document Interface**
interface ITip extends Document {
  seller: mongoose.Schema.Types.ObjectId;
  tip: {
    cost: number;
    waiter: mongoose.Schema.Types.ObjectId[] | string[];
  };
}

// **Tip Schema**
const tipSchema = new Schema<ITip>(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
    },
    tip: {
      cost: { type: Number, required: true, default: 0 },
      waiter: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Waiter",
        },
      ],
    },
  },
  { timestamps: true }
);

// **Tip Model**
const Tip: Model<ITip> = mongoose.model<ITip>("Tip", tipSchema);

export { Tip };
