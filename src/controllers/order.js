import Order from "../models/order.js";
import { orderSchema } from "../schemas/order.js";

export const getAll = async (req, res) => {
  try {
    const data = await Order.find().populate("items userId status");
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
    const data = await Order.findById(id).populate("items userId status");
    if (!data) {
      return res.status(203).json({
        message: "Không tìm thấy đơn hàng",
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
      return res.status(201).json({
        message: "Đặt hàng thất bại",
      });
    }
    return res.status(200).json({
      message: "Đặt hàng thành công",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const remove = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        message: "Không tìm thấy đơn hàng",
      });
    }
    await Order.delete({ _id: req.params.id });
    return res.status(200).json({
      message: "Huỷ đơn hàng thành công",
      order,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const restore = async (req, res) => {
  try {
        const order = await Order.findOne({_id:req.params.id});
        if (!order) {
          return res.status(404).json({
              message: "Không tìm thấy đơn hàng",
          });
      }
    await Order.restore({ _id: req.params.id });
    return res.status(200).json({
      message: "Mua lại đơn hàng thành công",
      // order
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

//   export const forceDelete = async (req, res) => {
//     try {
//       await Order.deleteOne({_id: req.params.id});
//       return res.status(200).json({
//         message: "Xoá đơn hàng thành công",
//       });
//     } catch (error) {
//       return res.status(400).json({
//         message: error,
//       });
//     }
//   };

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const data = await Order.findOneAndUpdate({ _id: id }, body, { new: true });
    if (!data) {
      return res.status(200).json({
        message: "Cập nhật thất bại",
      });
    }
    return res.status(200).json({
      message: "Cập nhật thành công",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const getByIdUser = async (req, res) => {
  try {
    const idUser = req.params.idUser;
    const orders = await Order.find({ idUser: idUser }).populate(
      "items status userId"
    );
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
