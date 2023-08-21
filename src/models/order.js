import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";

const orderSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    ],
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    total: {
      type: Number,
      required: true,
    },
    status: {
        type: String,
        default: "Đang xử lý"
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    district: {
      type: String,
    },
    zip: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);

orderSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: true,
});

export default mongoose.model("Order", orderSchema);
