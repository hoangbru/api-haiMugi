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
