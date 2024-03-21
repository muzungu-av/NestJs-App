import * as dotenv from 'dotenv';

dotenv.config();

export const configuration = () => ({
  NODE_ENV: process.env.NODE_ENV,
  MULTUER_DEST: process.env.MULTER_DEST,
  MAX_FILE_SIZE: process.env.MAX_FILE_SIZE,
  ALLOW_IMAGE_EXTENSIONS:
    process.env.ALLOWED_IMAGE_EXTENSIONS?.split(',').map((ext) => ext.trim()) ||
    [],
  SECRET_KEY: process.env.SECRET_KEY,
  MONGO_DB_PORT: process.env.MONGO_DB_PORT,
  BACKEND_PORT: process.env.BACKEND_PORT,
  CORS_ORIGIN_URL: process.env.CORS_ORIGIN_URL,
  CLOUDINARY_URL: process.env.CLOUDINARY_URL,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
});
