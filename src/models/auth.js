import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      default: "Unknown",
    },
    avatar: {
      type: String,
      default:
        "https://static1.s123-cdn-static-a.com/uploads/3107639/800_5e9de73574b25.png",
    },
    phone: {
      type: String,
      default: "Not update",
    },
    address: {
      type: String,
      default: "Not update",
    },
    role: {
      type: String,
      default: "customer",
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("User", userSchema);
