import Joi from "joi";

export const sizeSchema = Joi.object({
  name: Joi.string().required(),
  value: Joi.string().required()
});