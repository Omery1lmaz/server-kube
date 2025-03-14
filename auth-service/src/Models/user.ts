import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

// **Interface for required user attributes when creating a new user**
interface UserAttrs {
  email: string;
  password?: string;
  provider?: "email" | "google";
  googleId?: string;
  number?: string;
  name?: string;
  address?: string;
  refreshToken?: string;
  isAdmin?: boolean;
  isActive?: boolean;
  resetPasswordOtp?: string;
  resetPasswordToken?: string;
  otp?: string;
  resetPasswordOtpExpires?: Date;
  otpExpires?: Date;
  isDeleted?: boolean;
  imageUrl?: string;
  waiter?: mongoose.Schema.Types.ObjectId;
  version: number;
}

// **Interface that describes a single user document**
interface UserDoc extends mongoose.Document {
  _id: mongoose.Schema.Types.ObjectId;
  email: string;
  password?: string;
  provider: "email" | "google";
  googleId?: string;
  number?: string;
  name?: string;
  address?: string;
  refreshToken?: string;
  isAdmin: boolean;
  isActive: boolean;
  resetPasswordOtp?: string;
  resetPasswordToken?: string;
  otp?: string;
  otpExpires?: Date;
  resetPasswordOtpExpires?: Date;
  isDeleted: boolean;
  imageUrl: string;
  waiter?: mongoose.Schema.Types.ObjectId;
  version: number;
  matchPassword(enteredPassword: string): Promise<boolean>;
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
    password: {
      type: String,
      required: function () {
        return this.provider === "email";
      },
      select: false,
    },
    address: { type: String },
    refreshToken: { type: String },
    isAdmin: { type: Boolean, required: true, default: false },
    isActive: { type: Boolean, required: true, default: false },
    resetPasswordOtp: { type: String },
    resetPasswordToken: { type: String },
    otp: { type: String },
    resetPasswordOtpExpires: { type: Date },
    otpExpires: { type: Date },
    isDeleted: { type: Boolean, required: true, default: false },
    imageUrl: {
      type: String,
      required: true,
      default:
        "https://image.shutterstock.com/image-vector/male-buyer-seller-store-payment-260nw-1385890529.jpg",
    },
    waiter: { type: mongoose.Schema.Types.ObjectId, ref: "Waiter" },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password as string, salt);
  next();
});
userSchema.set("versionKey", "version");
userSchema.plugin(updateIfCurrentPlugin);

userSchema.methods.matchPassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return bcrypt.compare(enteredPassword, this.password as string);
};

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
