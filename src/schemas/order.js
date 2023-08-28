import Joi from "joi";

export const orderSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
  address: Joi.string(),
  userId: Joi.string(),
  items: Joi.array().required(),
  status: Joi.string(),
  total: Joi.number().required(),
  createdAt: Joi.date().default(() => new Date()),
  updatedAt: Joi.date().default(() => new Date()),
});
