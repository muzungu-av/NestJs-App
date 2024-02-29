import { Injectable } from '@nestjs/common';
import { ImageHandler, ImgFileProcessingResult } from './gm/imageHandler';
import { winstonLogger } from 'winston.logger';
import { Image } from './schemas/image.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateImageDto } from './dto/createImageDto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

interface CustomErrorOptions {
  message: string;
  uid?: string;
  success?: any;
  path?: string;
  miniPath?: string;
}

class CustomError extends Error {
  success?: any;
  path?: any;
  miniPath?: any;
  uid?: string;

  constructor(options: CustomErrorOptions) {
    super(options.message);
    this.name = 'CustomError';
    this.success = options.success;
    this.path = options.path;
    this.miniPath = options.miniPath;
    this.uid = options.uid;
  }
}

@Injectable()
export class ImageService {
  // private readonly createImageDto: CreateImageDto;
  constructor(
    @InjectModel(Image.name) private readonly imageModel: Model<Image>,
    private readonly handler: ImageHandler,
    private readonly cloudinary: CloudinaryService,
  ) {}

  findAll() {
    return `This action returns all image`;
  }

  findOne(id: string): string {
    return `Это действие возвращает #${id} записи`;
  }

  async processNewFile(
    userId: string,
    file: Express.Multer.File,
    description: string,
  ): Promise<ImgFileProcessingResult> {
    return new Promise((resolve, reject) => {
      this.handler
        .do(userId, file) //validation and creation of a miniature
        .then(async (result) => {
          if (result.success === true) {
            // save to mongo
            try {
              result.description = description;
              const createImageDto = new CreateImageDto(result);
              await this.imageModel.create(createImageDto);
              winstonLogger.info(`An image is created: ${result.uid}`);
              return result;
            } catch (error) {
              //No duplicates accepted
              winstonLogger.error(
                `Error creating image in DB: ${error.message}`,
              );
              result.success = false;
              result.errorMessage = `Error creating image in DB: ${error.message}`;
              throw new CustomError({
                message: 'Failed to create image (No duplicates accepted)',
                success: false,
                path: result.path,
                miniPath: result.miniPath,
              });
            }
          } else {
            result.success = false;
            result.errorMessage = `Failed to create image (Failed validation)`;
            throw new CustomError({
              message: `Failed to create image (Failed validation)`,
              success: false,
              path: result.path,
              miniPath: result.miniPath,
              uid: result.uid,
            });
          }
        })
        .catch((error) => {
          throw error;
        })
        //sending to cloudinary
        .then(async (result: ImgFileProcessingResult) => {
          result.imageUrl = undefined;
          if (result && result.success) {
            try {
              result.imageUrl = await this.cloudinary.upload(
                userId,
                result.path,
                result.fileName,
              );
            } catch (error) {
              winstonLogger.error(`Error during upload: ${error}`);
              throw new CustomError({
                message: 'Error during upload images',
                success: false,
                path: result.path,
                miniPath: result.miniPath,
                uid: result.uid,
              });
            }
          }
          return result;
        })
        .catch((result) => {
          throw result;
        })
        .then(async (result: ImgFileProcessingResult) => {
          result.miniImageUrl = undefined;
          if (result && result.success) {
            //успешно загруженна основная картинка
            try {
              result.miniImageUrl = await this.cloudinary.upload(
                userId,
                result.miniPath,
                result.miniFileName,
              );
            } catch (error) {
              winstonLogger.error(`Error during upload mini image: ${error}`);
              throw new CustomError({
                message: 'Error during upload mini image',
                success: false,
                path: result.path,
                miniPath: result.miniPath,
                uid: result.uid,
              });
            }
          }
          return result;
        })
        .catch((result) => {
          throw result;
        })
        .then((result: ImgFileProcessingResult) => {
          // в конце успешной работы удалим файлы из контейнера
          if (result && result.success) {
            this.handler.remove(result.path);
            this.handler.removeDir(result.miniPath);
            resolve(result);
          }
          return result;
        })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .catch(async (result) => {
          if (result && !result.success) {
            result.path ? this.handler.remove(result.path) : !undefined;
            result.miniPath
              ? this.handler.removeDir(result.miniPath)
              : !undefined;
          }
          if (result && result.uid) {
            try {
              const deletedImage = await this.imageModel.findOneAndDelete({
                uid: result.uid,
              });
              if (deletedImage) {
                winstonLogger.info(`Document deleted: ${deletedImage.uid}`);
              } else {
                winstonLogger.info('Document not found for deletion.');
              }
            } catch (error) {
              winstonLogger.error('Error deleting document:', error);
            }
          }
          reject(result.message);
        });
    });
  }
}

// update(id: number, updateImageDto: UpdateImageDto) {
//   return `This action updates a #${id} image`;
// }

// remove(id: number) {
//   return `This action removes a #${id} image`;
// }
