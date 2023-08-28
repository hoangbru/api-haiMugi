import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
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
    quantity: Number,
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
