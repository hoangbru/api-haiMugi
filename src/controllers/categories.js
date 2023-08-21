import Category from "../models/categories.js";

export const getAll = async (req, res) => {
  try {
    const data = await Category.find().populate("products");
    if (data.length == 0)
      return res.status(203).json({ message: "Không có danh mục nào" });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const get = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Category.findById(id).populate("products");
    if (!data) return res.status(200).json({ message: "Không tìm thấy danh mục" });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const create = async (req, res) => {
  try {
    const body = req.body;
    // const { error } = categorySchema.validate(body,{ abortEarly: false })
    // if (error) {
    //     return res.json({
    //         message: error.details[0].message,
    //     })
    // }
    const data = await Category.create(body);
    if (data.length === 0)
      return res.status(200).json({ message: "Thêm danh mục thất bại" });
    return res.status(200).json({ message: "Thêm danh mục thành công", data });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ message: "Không tìm thấy danh mục" });
    }
    if (!category.isDeleteable) {
      return res.status(400).send({ message: "Không thể xóa danh mục này" });
    }
    return res.status(200).json({ message: "Xoá thành công", category });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const data = await Category.findOneAndUpdate({ _id: id }, body, {
      new: true,
    });
    if (!data) {
      return res.status(401).json({ message: "Cập nhật thất bại" });
    }
    return res.status(200).json({ message: "Cập nhật thành công", data });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};