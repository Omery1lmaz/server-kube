import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

// **Interface for Order Item Ingredients**
interface IngredientAttrs {
  name: string;
  price?: number;
  status?: boolean;
  seller: mongoose.Schema.Types.ObjectId;
}

interface IngredientDoc extends mongoose.Document {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  price: number;
  status: boolean;
  seller: mongoose.Schema.Types.ObjectId;
  version: number;
}

// **Interface for Order Items**
interface OrderItemAttrs {
  name: string;
  imageUrl?: string;
  description?: string;
  sellingPrice: number;
  quantity: number;
  totalPrice: number;
  ingredients?: IngredientAttrs[];
  extraIngredients?: IngredientAttrs[];
}

interface OrderItemDoc extends mongoose.Document {
  name: string;
  imageUrl?: string;
  description?: string;
  sellingPrice: number;
  quantity: number;
  totalPrice: number;
  ingredients: IngredientDoc[];
  extraIngredients: IngredientDoc[];
}

// **Interface for Order**
interface OrderAttrs {
  user: mongoose.Schema.Types.ObjectId;
  seller: mongoose.Schema.Types.ObjectId;
  orderNo: string;
  items: OrderItemAttrs[];
  cancelReason?: string;
  totalAmount: number;
  status?: "Pending" | "Processing" | "Completed" | "Cancelled";
  isPaidToSeller?: boolean;
  taxPrice?: number;
  takeAway?: boolean;
  discount?: {
    promotion: {
      name: string;
      amount: number;
      totalAmount: number;
      promotionId: mongoose.Schema.Types.ObjectId;
    };
  };
  sellerDetails: {
    name: string;
    storeName: string;
    _id: string;
    address: object;
    location: number[];
    imageUrl: string;
  };
  shippingAddress?: {
    tableId?: mongoose.Schema.Types.ObjectId;
    name?: string;
  };
}

interface OrderDoc extends mongoose.Document {
  user: mongoose.Schema.Types.ObjectId;
  seller: mongoose.Schema.Types.ObjectId;
  orderNo: string;
  items: OrderItemDoc[];
  totalAmount: number;
  cancelReason?: string;
  status: "Pending" | "Processing" | "Completed" | "Cancelled";
  createdAt: Date;
  updatedAt: Date;
  isPaidToSeller: boolean;
  taxPrice: number;
  takeAway: boolean;
  discount?: {
    promotion: {
      name: string;
      amount: number;
      totalAmount: number;
      promotionId: mongoose.Schema.Types.ObjectId;
    };
  };
  sellerDetails: {
    name: string;
    storeName: string;
    _id: string;
    address: object;
    location: number[];
    imageUrl: string;
  };
  shippingAddress?: {
    tableId?: mongoose.Schema.Types.ObjectId;
    name?: string;
  };
  version: number;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
}

// **Order Schema Definition**
const orderSchema = new mongoose.Schema<OrderDoc>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
    },
    orderNo: { type: String, unique: true, required: true },
    items: [
      {
        name: { type: String, required: true },
        imageUrl: { type: String },
        description: { type: String },
        sellingPrice: { type: Number, required: true },
        quantity: { type: Number, required: true, default: 1 },
        totalPrice: { type: Number, required: true },
        ingredients: [
          { type: mongoose.Schema.Types.ObjectId, ref: "Ingredient" },
        ],
        extraIngredients: [
          { type: mongoose.Schema.Types.ObjectId, ref: "Ingredient" },
        ],
      },
    ],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Completed", "Cancelled"],
      default: "Pending",
    },
    isPaidToSeller: { type: Boolean, default: false },
    taxPrice: { type: Number, default: 0.0 },
    takeAway: { type: Boolean, default: false },
    cancelReason: { type: String, default: undefined },
    discount: {
      promotion: {
        name: { type: String, required: true },
        amount: { type: Number, required: true },
        totalAmount: { type: Number, required: true },
        promotionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Promotion",
          required: true,
        },
      },
    },
    sellerDetails: {
      name: { type: String, required: true },
      storeName: { type: String, required: true },
      _id: { type: String, required: true },
      address: { type: Object, required: true },
      location: { type: [Number], required: true },
      imageUrl: { type: String, required: true },
    },
    shippingAddress: {
      tableId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Table",
        required: function () {
          return (this as any).takeAway === false;
        },
      },
      name: {
        type: String,
        required: function () {
          return this.takeAway === false;
        },
      },
    },
  },
  { timestamps: true }
);

orderSchema.set("versionKey", "version");
orderSchema.plugin(updateIfCurrentPlugin);

// **Static method to create an Order**
orderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order(attrs);
};

// **Pre-save hook to generate unique orderNo**
orderSchema.pre("save", async function (next) {
  if (this.isNew) {
    let isUnique = false;
    while (!isUnique) {
      const randomOrderNo = Math.floor(
        100000000 + Math.random() * 900000000
      ).toString();
      const existingOrder = await Order.findOne({ orderNo: randomOrderNo });
      if (!existingOrder) {
        this.orderNo = randomOrderNo;
        isUnique = true;
      }
    }
  }
  next();
});

const Order = mongoose.model<OrderDoc, OrderModel>("Order", orderSchema);

export { Order };
