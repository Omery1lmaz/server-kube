import mongoose from "mongoose";

// **Table Document Interface**
interface TableDoc extends mongoose.Document {
  seller: mongoose.Schema.Types.ObjectId;
  name: string;
  active: boolean;
  reserved: boolean;
}

// **Table Schema**
const tableSchema = new mongoose.Schema<TableDoc>(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Seller",
    },
    name: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    reserved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// **Model Tanımı**
const Table = mongoose.model<TableDoc>("Table", tableSchema);

export { Table };
