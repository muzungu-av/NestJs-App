import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production'),
  MULTER_DEST: Joi.string().required(),
  MAX_FILE_SIZE: Joi.number().required(),
  // couldn't convert to an array here
  //ALLOWED_IMAGE_EXTENSIONS: Joi.array().items(Joi.string()).required(),
  ALLOWED_IMAGE_EXTENSIONS: Joi.string().required(),
  SECRET_KEY: Joi.string(),
  CORS_ORIGIN_URLS: Joi.string().required(),
  MONGO_DB_URI: Joi.string().required(),
  BACKEND_PORT: Joi.number().required(),
  CLOUDINARY_URL: Joi.string().required(),
  CLOUDINARY_CLOUD_NAME: Joi.string().required(),
  CLOUDINARY_API_KEY: Joi.string().required(),
  CLOUDINARY_API_SECRET: Joi.string().required(),
});
