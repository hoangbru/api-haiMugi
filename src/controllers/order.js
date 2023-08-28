import Order from "../models/order.js";
import { orderSchema } from "../schemas/order.js";

export const getAll = async (req, res) => {
  try {
    const data = await Order.find().populate("userId items");
    if (data.length == 0) {
      return res.status(203).json({
        message: "Không có đơn hàng nào",
      });
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const get = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Order.findById(id).populate("userId items");
    if (!data)
      return res.status(404).json({ message: "Không tìm thấy dữ liệu" });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const create = async (req, res) => {
  try {
    const body = req.body;
    const { error } = orderSchema.validate(body, { abortEarly: false });
    if (error) {
      return res.json({
        message: error.details[0].message,
      });
    }
    const data = await Order.create(body);
    if (data.length === 0) {
      return res.status(400).json({
        message: "Đặt hàng thất bại",
      });
    }
    return res.status(200).json({
      message: "Đặt hàng thành công",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const data = await Order.findOneAndUpdate({ _id: id }, body, {
      new: true,
    });
    if (!data) {
      return res.status(400).json({ message: "Cập nhật thất bại" });
    }
    return res.status(200).json({ message: "Cập nhật thành công", data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const orders = await Order.find({ userId: userId }).populate(
      "userId items"
    );
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
