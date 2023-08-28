import Color from "../models/colors.js";
import { colorSchema } from "../schemas/colors.js";

export const getAll = async (req, res) => {
  try {
    const data = await Color.find().populate("products");
    if (data.length == 0)
      return res.status(203).json({ message: "Không có dữ liệu" });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const get = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Color.findById(id).populate("products");
    if (!data) return res.status(200).json({ message: "Không tìm thấy màu" });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const create = async (req, res) => {
  try {
    const body = req.body;
    const { error } = colorSchema.validate(body, { abortEarly: false });
    if (error) {
      return res.json({
        message: error.details[0].message,
      });
    }
    const data = await Color.create(body);
    if (data.length === 0)
      return res.status(200).json({ message: "Thêm thất bại" });
    return res.status(200).json({ message: "Thêm thành công", data });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Color.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ message: "Không tìm thấy" });
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
    const data = await Color.findOneAndUpdate({ _id: id }, body, {
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
