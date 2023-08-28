import Joi from "joi";

export const colorSchema = Joi.object({
  name: Joi.string().required(),
  value: Joi.string().required()
});