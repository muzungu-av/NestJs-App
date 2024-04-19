import { Inject, Injectable } from '@nestjs/common';
import { ImageHandler, ImgFileProcessingResult } from './gm/imageHandler';
import { winstonLogger } from 'winston.logger';
import { Image } from './schemas/image.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateImageDto } from './dto/create-image.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import FilterDocs from './utils/alg';
import { SliderMemoryService } from './utils/SliderMemoryService';
import { Copy } from './schemas/copy.schema';
import { CreateCopyDto } from './dto/create-copy.dto';
import { CustomError } from './utils/customError';

@Injectable()
export class ImageService {
  constructor(
    @InjectModel(Copy.name) private readonly copyModel: Model<Copy>,
    @InjectModel(Image.name) private readonly imageModel: Model<Image>,
    private readonly handler: ImageHandler,
    private readonly cloudinary: CloudinaryService,
    @Inject(SliderMemoryService)
    private sliderMemoryService: SliderMemoryService,
  ) {}

  /**
   * Returns the number of images in Mongo
   *
   * @returns Promise<number> number of docs
   */
  async getImageCount(): Promise<number> {
    return await this.imageModel.countDocuments().exec();
  }

  /**
   * Returns a portion of the image documents
   */
  async getNextBatch(
    token,
    fields: string,
    quantity: number,
    direction: string,
  ): Promise<any> {
    let query = this.imageModel.find().sort({ ['createdAt']: -1 });

    if (fields) {
      const selectedFields = fields.split(',').join(' ');
      query = query.select(`-_id ${selectedFields}`);
    } else {
      query = query.select(`-_id -__v`);
    }

    const sort_docs = await query.exec();
    let direction_sort_docs = {};
    if (direction && direction == 'right') {
      direction_sort_docs = FilterDocs.getEven(sort_docs);
    } else if (direction && direction == 'left') {
      direction_sort_docs = FilterDocs.getOdd(sort_docs);
    } else
      return {
        message: 'Failed deirection',
      };

    this.sliderMemoryService.setSharedObject(token);
    this.sliderMemoryService.logMapContents();
    return direction_sort_docs;
  }

  /**
   * Returns a complete list of the image documents from Mongo
   *
   * @returns  Promise<any[]> document array
   */
  async getAllImages(): Promise<Image[]> {
    let query = this.imageModel.find();
    query = query.select(`-_id -__v`);
    return await query.exec();
  }

  /**
   * Returns the list of documents with images from Mongo matching the typeOfImage condition
   *
   * @param typeOfImage 'isPainting', 'isAtelier'
   * @returns Promise<any[]> document array
   */
  async findImagesByType(typeOfImage: string): Promise<Image[]> {
    return this.imageModel.find({ typeOfImage }).exec();
  }

  /**
   * Returns the list of documents with images from Mongo matching the typeOfImage condition
   *
   * @param typeOfImage 'isPainting', 'isAtelier'
   * @returns Promise<any[]> document array
   */
  async findCopies(typeOfImage: string): Promise<Copy[]> {
    return this.copyModel.find({ typeOfImage }).exec();
  }

  /**
   * Returns a complete list of image documents from Mongo, taking into account the specified fields
   *
   * @param fields set of requested fields
   * @returns Promise<any[]> document array
   */
  async getAllImagesWithFields(fields: string): Promise<Partial<Image>[]> {
    let query = this.imageModel.find();
    if (fields) {
      const selectedFields = fields.split(',').join(' ');
      query = query.select(`-_id ${selectedFields}`);
    } else {
      query = query.select(`-_id -__v`);
    }
    return await query.exec();
  }

  /**
   * Issuance of one image document by image ID
   *
   * @param uid document's UID
   * @param fields set of requested fields
   * @returns Promise<any> one document
   */
  async findOne(uid: string, fields: string): Promise<Image> {
    let query = this.imageModel.findOne({ uid: uid });
    if (fields) {
      const selectedFields = fields.split(',').join(' ');
      query = query.select(`${selectedFields} -_id`);
    } else {
      query = query.select('-_id -__v');
    }
    return await query.lean().exec();
  }

  /**
   *
   *
   * @param count
   * @param fields set of requested fields
   * @returns Promise<any> one document
   */
  async findBlock(count: number, fields: string): Promise<Partial<Image>[]> {
    let query = this.imageModel.find().limit(count);
    if (fields) {
      const selectedFields = fields.split(',').join(' ');
      query = query.select(`${selectedFields} -_id`);
    } else {
      query = query.select('-_id -__v');
    }
    return await query.lean().exec();
  }

  /**
   * Updating the document in the database.
   *
   * @param uid document uid
   * @param updatedData updated data
   * @returns updated document
   */
  async updateImage<T>(
    model: Model<T>,
    uid: string,
    updatedData: Partial<T>,
  ): Promise<T | null> {
    const result = await model.updateOne({ uid }, { $set: updatedData }).exec();

    if (result.modifiedCount === 1) {
      return model.findOne({ uid }).exec();
    } else {
      winstonLogger.error(`Failed to update the document ${uid}`);
    }
    return null;
  }

  async saveImageToCollection<T>(
    model: Model<T>,
    createImageDto: CreateImageDto,
  ) {
    try {
      await model.create(createImageDto);
    } catch (error) {
      winstonLogger.error(`${error.message}`);
      //No duplicates accepted
      if (-1 != error.message.search('duplicate key error')) {
        winstonLogger.error(`Failed to create image (No duplicates accepted)`);
        throw new CustomError({
          message: 'Failed to create image (No duplicates accepted)',
        });
      } else {
        throw new CustomError({
          message: 'Failed to create image (Unknown reason)',
        });
      }
    }
  }

  /**
   * The complex process of serving a new image file.
   * Validation will be done, a thumbnail will be created,
   * they will be uploaded to Cloudinary, information about them will be placed in MongoDB
   *
   * @param userId User ID of the user performing the download.
   * @param file Image file.
   * @param description File Description.
   * @returns Structure ImgFileProcessingResult
   */
  async processNewFile(
    userId: string,
    file: Express.Multer.File,
    description: string,
    typeOfImage: string,
  ): Promise<ImgFileProcessingResult> {
    return new Promise((resolve, reject) => {
      this.handler
        .do(userId, file) //validation and creation of a miniature
        .then(async (result) => {
          if (result.success === true) {
            // save to mongo
            result.description = description;
            result.typeOfImage = typeOfImage;
            try {
              /* используем один и тот же DTO тк он не привязан к документу,
              предполагается структура одинаоквая в монге у обычных картин и копий.
              А вот Model другая - Mongoose нужна своя модель, чтобы хранить копии в другой коллекции */
              if (typeOfImage === 'isCopy') {
                const createCopyDto = new CreateCopyDto(result);
                await this.saveImageToCollection<Copy>(
                  this.copyModel,
                  createCopyDto,
                );
              } else {
                const createImageDto = new CreateImageDto(result);
                await this.saveImageToCollection<Image>(
                  this.imageModel,
                  createImageDto,
                );
              }
            } catch (error) {
              result.success = false;
              winstonLogger.error(
                `260  Failed to create image (No duplicates accepted)`,
              );

              result.errorMessage = error.message;
              throw new CustomError({
                message: result.errorMessage,
                success: false,
                path: result.path,
                miniPath: result.miniPath,
              });
            }
            winstonLogger.info(`An image is created: ${result.uid}`);
            return result;
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
        //sending to cloudinary basic file
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
        //sending to cloudinary mini file
        .then(async (result: ImgFileProcessingResult) => {
          result.miniImageUrl = undefined;
          if (result && result.success) {
            //main picture successfully uploaded
            try {
              result.miniImageUrl = await this.cloudinary.upload(
                userId,
                result.miniPath,
                result.miniFileName,
              );
              winstonLogger.info(`sending to cloudinary mini file`);
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
        .then(async (result: ImgFileProcessingResult) => {
          // at the end of successful operation delete files from the container
          if (result && result.success) {
            this.handler.remove(result.path);
            this.handler.removeDir(result.miniPath);
            resolve(result); // ? не уверен что это правильно
          }
          const updatedData = {
            imageUrl: result.imageUrl,
            miniImageUrl: result.miniImageUrl,
          };
          if (result.typeOfImage === 'isCopy') {
            await this.updateImage<Copy>(
              this.copyModel,
              result.uid,
              updatedData,
            );
          } else {
            await this.updateImage<Image>(
              this.imageModel,
              result.uid,
              updatedData,
            );
          }
          winstonLogger.info(`Document update (URLs)`);
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

  /**
   * Deleting an image by image UID
   *
   * @param uid document's UID
   * @returns Promise<any> one document
   */
  async deleteOne(uid: string): Promise<boolean> {
    try {
      const result = await this.imageModel.deleteOne({ uid }).exec();
      if (result.deletedCount === 1) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      winstonLogger.error(`Error when deleting an image ${uid} : ${error}`);
      return false;
    }
  }

  async updateFile(
    uid: string,
    userId: string,
    description: string,
    typeOfImage: string,
    file: Express.Multer.File,
    prevfileName: string,
  ): Promise<boolean> {
    const resp = await this.handler.do(userId, file); //validation and creation of a miniature
    if (resp.success !== true) {
      winstonLogger.error(`Error in addVideo: Problems with the image`);
    }

    winstonLogger.info(`User ${userId} updates image ${uid}`);
    winstonLogger.info(`description - ${description}`);
    winstonLogger.info(`typeOfImageid - ${typeOfImage}`);

    if (resp && resp.success) {
      try {
        resp.imageUrl = await this.cloudinary.upload(
          userId,
          resp.miniPath,
          resp.fileName,
        );
        resp.miniImageUrl = await this.cloudinary.upload(
          userId,
          resp.miniPath,
          resp.miniFileName,
        );
      } catch (error) {
        winstonLogger.error(
          `Error during upload Video to Cloudinary: ${error}`,
        );
        resp.success = false;
        throw new CustomError({
          message: 'Error during upload Video to Cloudinary',
          success: false,
          path: resp.path,
          miniPath: resp.miniPath,
          uid: resp.uid,
        });
      }
    }

    try {
      const result = await this.imageModel.findOneAndUpdate(
        { uid },
        {
          description,
          typeOfImage,
          fileName: resp.fileName,
          path: resp.path,
          miniPath: resp.miniPath,
          originalName: resp.originalName,
          imageUrl: resp.imageUrl,
          miniImageUrl: resp.miniImageUrl,
        },
        { new: true },
      );
      winstonLogger.info(`${result}`);
      const indexOfDot = prevfileName.lastIndexOf('.');
      const nameWithoutDot = prevfileName.slice(0, indexOfDot);
      const urlForDel = `${userId}/${nameWithoutDot}`;
      const delRes = await this.cloudinary.delete(urlForDel);

      winstonLogger.info(`delRes-${delRes}`);
    } catch (error) {
      // Обработка ошибок, если что-то пошло не так
      console.error('Error updating file:', error);
      return false;
    }
    return true;
  }
}
