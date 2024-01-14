import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production'),
  MULTER_DEST: Joi.string().required(),
  MAX_FILE_SIZE: Joi.number().required(),
  // couldn't convert to an array here
  //ALLOWED_IMAGE_EXTENSIONS: Joi.array().items(Joi.string()).required(),
  ALLOWED_IMAGE_EXTENSIONS: Joi.string().required(),
});
