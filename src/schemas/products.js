import Joi from "joi";

export const productSchema = Joi.object({
  code: Joi.string(),
  name: Joi.string().required(),
  image: Joi.string(),
  price: Joi.number().required().min(0),
  desc: Joi.string(),
  detail: Joi.string(),
  status: Joi.string(),
  categoryId: Joi.string(),
  slug: Joi.string(),
  createdAt: Joi.date().default(() => new Date()),
  updatedAt: Joi.date().default(() => new Date()),
  deletedAt: Joi.date().default(null),
  deleted: Joi.boolean().default(false),
});
