import mongoose from "mongoose";

const sizeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    products: [{ type: mongoose.Types.ObjectId, ref: "Product" }],
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

// Trước khi xóa category, cập nhật lại category của các sản phẩm thuộc category này thành uncategory
sizeSchema.pre("findOneAndDelete", async function (next) {
  try {
    // Lấy model Product từ biến đã import
    const Product = mongoose.model("Product");
    //  lấy điều kiện tìm kiếm hiện tại của câu lệnh, xác định category mà đang được xóa trong trường hợp này.
    const filter = this.getFilter();
    //kiểm tra xem câu lệnh truy vấn có chứa trường sizeId được cập nhật không,
    // nếu có lấy giá trị của trường đó để cập nhật cho các sản phẩm có cùng sizeId.
    const sizeId = this.getQuery().$set?.sizeId;
    const update = {
      sizeId: sizeId ?? null,
    };
    await Product.updateMany(
      { sizeId: filter._id }, // Tìm các sản phẩm cùng sizeId
      update // Cập nhật sizeId mới
    );
    next();
  } catch (err) {
    next(err);
  }
});

export default mongoose.model("Size", sizeSchema);
