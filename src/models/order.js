import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    address: String,
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    items: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Product",
      },
    ],
    total: Number,
    status: {
      type: String,
      default: "Đang xử lý",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Order", orderSchema);
