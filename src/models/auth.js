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
    name: {
      type: String,
      default: "Not Update",
    },
    gender: {
      type: String,
      default: "Unknown",
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/dxa8ks06k/image/upload/v1693136912/takemichi/placeholder_ofv8qy.jpg",
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
