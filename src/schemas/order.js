import Joi from "joi";

export const orderSchema = Joi.object({
  userId: Joi.string().required().messages({
    "string.empty": "Không được bỏ trống khách hàng",
    "any.required": "Trường 'khách hàng' là bắt buộc",
  }),
  items: Joi.array().required(),
  name: Joi.string().required(),
  phone: Joi.number().min(0),
  status: Joi.string().min(0),
  total: Joi.number().required().min(0),
  address: Joi.string().messages({
    "string.empty": "Không được bỏ trống địa chỉ",
    "any.required": "Trường 'địa chỉ' là bắt buộc",
  }),
  city: Joi.string(),
  district: Joi.string(),
  zip: Joi.string(),
  createdAt: Joi.date().default(() => new Date()),
  updatedAt: Joi.date().default(() => new Date()),
});
