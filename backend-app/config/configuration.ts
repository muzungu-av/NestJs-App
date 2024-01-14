export const configuration = () => ({
  NODE_ENV: process.env.NODE_ENV,
  MULTUER_DEST: process.env.MULTER_DEST,
  MAX_FILE_SIZE: process.env.MAX_FILE_SIZE,
  ALLOW_IMAGE_EXTENSIONS:
    process.env.ALLOWED_IMAGE_EXTENSIONS?.split(',').map((ext) => ext.trim()) || [],
});
