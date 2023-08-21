import Product from "../models/products.js";
import Category from "../models/categories.js";

export const getAll = async (req, res) => {
  try {
    const products = await Product.find()
      .sort({ createdAt: -1 })
      .populate("categoryId", "-__v");
    if (!products)
      return res.status(404).json({ message: "Không có sản phẩm nào" });
    return res.status(200).json(products);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getProducts = async (req, res) => {
  const {
    _page = 1,
    _limit = 8,
    _sort = "createdAt",
    _order = "desc",
    _expand,
  } = req.query;
  const options = {
    page: _page,
    limit: _limit,
    sort: { [_sort]: _order === "desc" ? -1 : 1 },
    expand: _expand,
  };
  try {
    const result = await Product.paginate(
      { categoryId: { $ne: null } },
      { ...options, populate: { path: "categoryId" } }
    );
    if (result.docs.length === 0) throw new Error("Không có sản phẩm");
    const response = {
      data: result.docs,
      pagination: {
        limit: result.limit,
        currentPage: result.page,
        totalPages: result.totalPages,
        totalDocs: result.totalDocs,
        prevPage: result.prevPage,
        nextPage: result.nextPage,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
      },
    };
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getById = async (req, res) => {
  try {
    const id = req.params.id;
    // const product = await Product.findOneWithDeleted({ _id: id }).populate("categoryId", "-__v");
    const data = await Product.findOne({ _id: id }).populate(
        "categoryId",
        "-__v"
      );
    if (!data)
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    // return res.status(200).json(product);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getTrash = async (req, res) => {
  try {
    const data = await Product.findDeleted().populate("categoryId", "-__v");
    if (data.length === 0) {
      return res.status(200).json({ message: "Thùng rác trống" });
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getBySlug = async (req, res) => {
  try {
    const slug = req.params.slug;
    const product = await Product.findOne({ slug }).populate("categoryId", "-__v");
    if (!product)
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    return res.status(200).json(product);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const create = async (req, res) => {
  try {
    const body = req.body;
    const data = await Product.create(body);
    if (!data)
      return res.status(401).json({ message: "Thêm sản phẩm thất bại" });
    await Category.findOneAndUpdate(data.categoryId, {
      $addToSet: {
        products: data._id,
      },
    });
    return res.status(200).json({ data, message: "Thêm sản phẩm thành công" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product)
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    await Product.delete({ _id: id });
    return res
      .status(200)
      .json({ message: "Sản phẩm đã được chuyển vào thùng rác", product });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const forceDelete = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findOneDeleted({ _id: id });
    if (!product)
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    await Product.deleteOne({ _id: id });
    // Xóa sản phẩm cũ khỏi danh sách products của category cũ
    await Category.findByIdAndUpdate(
      product.categoryId,
      { $pull: { products: product._id } }
  );
    return res
      .status(200)
      .json({ message: "Xoá sản phẩm thành công", product });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const body = req.body;
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product)
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    const data = await Product.findOneAndUpdate({ _id: id }, body, {
      new: true,
    });
    if (!data) return res.status(200).json({ message: "Cập nhật thất bại" });
    // Xóa sản phẩm cũ khỏi danh sách products của category cũ
    const oldCategoryId = product.categoryId;
    await Category.findByIdAndUpdate(oldCategoryId, {
      $pull: { products: id },
    });

    // Thêm sản phẩm mới vào danh sách products của category mới
    const newCategoryId = req.body.categoryId;
    if (newCategoryId) {
      // Thêm sản phẩm mới vào danh sách products của category mới
      await Category.findByIdAndUpdate(newCategoryId, {
        $addToSet: { products: id },
      });
    }
    return res.status(200).json({ message: "Cập nhật thành công", data });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const restore = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findOneDeleted({ _id: id });
    if (!product)
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    await Product.restore({ _id: id });
    return res
      .status(200)
      .json({ message: "Khôi phục sản phẩm thành công", product });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
