import mongoose from "mongoose";

// **Interface for required user attributes when creating a new user**
interface UserAttrs {
  email: string;
  provider?: "email" | "google";
  googleId?: string;
  number?: string;
  name?: string;
  address?: string;
  isActive?: boolean;
  isDeleted?: boolean;
  imageUrl?: string;
}

// **Interface that describes a single user document**
interface UserDoc extends mongoose.Document {
  _id: mongoose.Schema.Types.ObjectId;
  email: string;
  provider: "email" | "google";
  googleId?: string;
  number?: string;
  name?: string;
  address?: string;
  isActive: boolean;
  isDeleted: boolean;
  imageUrl: string;
}

// **Interface for the user model (with custom static methods)**
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// **User Schema Definition**
const userSchema = new mongoose.Schema<UserDoc>(
  {
    googleId: { type: String },
    provider: {
      type: String,
      required: true,
      enum: ["email", "google"],
      default: "email",
    },
    number: { type: String, unique: true, sparse: true },
    name: { type: String },
    email: { type: String, required: true, unique: true },
    address: { type: String },
    isActive: { type: Boolean, required: true, default: false },
    isDeleted: { type: Boolean, required: true, default: false },
    imageUrl: {
      type: String,
      required: true,
      default:
        "https://image.shutterstock.com/image-vector/male-buyer-seller-store-payment-260nw-1385890529.jpg",
    },
  },
  { timestamps: true }
);

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
