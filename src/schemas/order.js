import Joi from "joi";

export const orderSchema = Joi.object({
  userId: Joi.string().required(),
  items: Joi.array().required(),
  status: Joi.string(),
  quantity: Joi.number().required(),
  total: Joi.number().required(),
  createdAt: Joi.date().default(() => new Date()),
  updatedAt: Joi.date().default(() => new Date()),
});
