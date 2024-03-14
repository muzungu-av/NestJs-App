import * as Joi from 'joi';

export const batchQuerySchema = Joi.object({
  fields: Joi.string().required(),
  quantity: Joi.number().integer().required(),
  direction: Joi.string().valid('right', 'left').required(),
});
