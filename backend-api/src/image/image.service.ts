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
   *
   *
   * @param typeOfImage 'isPainting', 'isAtelier'
   * @returns Promise<any[]> document array
   */
  async findCopies(typeOfImage: string, fields: string[]): Promise<Copy[]> {
    winstonLogger.info(`fields = ${fields}`);
    const groupFields: any = {};
    fields.forEach((field) => {
      groupFields[field] = { $first: '$' + field };
    });
    return this.copyModel
      .aggregate([
        { $match: { typeOfImage: typeOfImage } },
        { $unwind: '$copyAttribute' },
        { $sort: { 'copyAttribute.price': 1 } },
        {
          $group: {
            _id: '$_id',
            ...groupFields,
            copyAttribute: { $push: '$copyAttribute' },
          },
        },
        { $sort: { createdAt: -1 } },
      ])
      .exec();
  }

  async findOneCopy(uid: string, fields: string): Promise<Copy> {
    let query = this.copyModel.findOne({ uid: uid });
    if (fields) {
      const selectedFields = fields.split(',').join(' ');
      query = query.select(`${selectedFields} -_id`);
    } else {
      query = query.select('-_id -__v');
    }
    const r = await query.lean().exec();
    winstonLogger.info(`${JSON.stringify(r)}`);
    return r;
  }

  /**
   * Returns a complete list of image documents from Mongo, taking into account the specified fields
   *
   * @param fields set of requested fields
   * @returns Promise<any[]> document array
   */
  async getAllImagesWithFields(
    fields: string,
    sortBy: string,
  ): Promise<Partial<Image>[]> {
    let query = this.imageModel.find();
    if (fields) {
      const selectedFields = fields.split(',').join(' ');
      query = query.select(`-_id ${selectedFields}`);
    } else {
      query = query.select(`-_id -__v`);
    }
    if (sortBy) {
      const sortOrder = sortBy.startsWith('-') ? -1 : 1;
      const sortField = sortBy.replace('-', '');
      query = query.sort({ [sortField]: sortOrder });
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
  async updateImageDocument<T>(
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
      //No duplicates accepted
      if (-1 != error.message.search('duplicate key error')) {
        winstonLogger.error(`Failed to create image (No duplicates accepted)`);
        throw new CustomError({
          message: 'Failed to create image (No duplicates accepted)',
        });
      } else {
        winstonLogger.error(`${error.message}`);
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
    name: string,
    size: string,
  ): Promise<ImgFileProcessingResult> {
    return new Promise((resolve, reject) => {
      this.handler
        .do(userId, file) //validation and creation of a miniature
        .then(async (result) => {
          if (result.success === true) {
            // save to mongo
            result.description = description;
            result.typeOfImage = typeOfImage;
            result.name = name;
            try {
              if (typeOfImage === 'isCopy') {
                const createCopyDto = new CreateCopyDto(
                  result,
                  JSON.parse(size),
                );
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
            await this.updateImageDocument<Copy>(
              this.copyModel,
              result.uid,
              updatedData,
            );
          } else {
            await this.updateImageDocument<Image>(
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
  async deleteOne(
    uid: string,
    type: string,
    prevfileName: string,
    userId: string,
  ): Promise<boolean> {
    try {
      let result;
      if (type === 'isCopy') {
        result = await this.copyModel.deleteOne({ uid }).exec();
      } else {
        result = await this.imageModel.deleteOne({ uid }).exec();
      }
      if (result && result.deletedCount === 1) {
        const indexOfDot = prevfileName.lastIndexOf('.');
        const nameWithoutDot = prevfileName.slice(0, indexOfDot);
        const urlForDel = `${userId}/${nameWithoutDot}`;
        const urlForDelMini = `${userId}/mini_${nameWithoutDot}`;
        await this.cloudinary.delete(urlForDel);
        await this.cloudinary.delete(urlForDelMini);
        return true;
      } else {
        return false;
      }
      //todo удаление в cloud
    } catch (error) {
      winstonLogger.error(`Error when deleting an image ${uid} : ${error}`);
      return false;
    }
  }

  async updateImage(
    uid: string,
    description: string,
    name: string,
    typeOfImage: string,
    file: Express.Multer.File,
    prevfileName: string,
    userId: string,
    sizes?: string,
  ): Promise<boolean> {
    let resp;
    if (file !== undefined) {
      resp = await this.handler.do(userId, file); //validation and creation of a miniature
      if (resp.success !== true) {
        winstonLogger.error(`Error while add image: Problems with the image`);
      }
    }

    if (file && resp && resp.success) {
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
      let updatedData = {};
      if (file && resp && resp.success) {
        // eslint-disable-next-line prefer-const
        updatedData = {
          fileName: resp.fileName,
          path: resp.path,
          miniPath: resp.miniPath,
          originalName: resp.originalName,
          imageUrl: resp.imageUrl,
          miniImageUrl: resp.miniImageUrl,
          dimension: resp.dimension,
        };
      }
      updatedData['description'] = description;
      updatedData['typeOfImage'] = typeOfImage;
      updatedData['name'] = name;
      if (typeOfImage === 'isCopy' && sizes) {
        updatedData['copyAttribute'] = JSON.parse(sizes);
        await this.updateImageDocument<Copy>(this.copyModel, uid, updatedData);
      } else {
        await this.updateImageDocument<Image>(
          this.imageModel,
          uid,
          updatedData,
        );
      }

      const indexOfDot = prevfileName.lastIndexOf('.');
      const nameWithoutDot = prevfileName.slice(0, indexOfDot);
      const urlForDel = `${userId}/${nameWithoutDot}`;
      const urlForDelMini = `${userId}/mini_${nameWithoutDot}`;
      await this.cloudinary.delete(urlForDel);
      await this.cloudinary.delete(urlForDelMini);
      return true;
    } catch (error) {
      winstonLogger.error(`Error updating file: ${error}`);
      return false;
    }
  }

  async addThumbnail(
    uid: string,
    file: Express.Multer.File,
    userId: string,
  ): Promise<boolean> {
    let resp;
    if (file !== undefined) {
      resp = await this.handler.do(userId, file); //validation and creation of a miniature
      if (resp.success !== true) {
        winstonLogger.error(`Error while add image: Problems with the image`);
      }
    } else winstonLogger.error(`Error while with File (undefined)`);

    if (file && resp && resp.success) {
      try {
        winstonLogger.info(`I'm trying to upload to Claudinary`);
        resp.imageUrl = await this.cloudinary.upload(
          userId,
          resp.path,
          resp.fileName,
        );
        winstonLogger.info(
          `File uploaded to Claudinary Succesful: ${resp.imageUrl}`,
        );
      } catch (error) {
        winstonLogger.error(
          `Error during upload Image to Cloudinary: ${error}`,
        );
        resp.success = false;
        throw new CustomError({
          message: 'Error during upload Image to Cloudinary',
          success: false,
          path: resp.path,
          uid: resp.uid,
        });
      }
    }

    try {
      let data = {};
      if (file && resp && resp.success) {
        const doc = await this.copyModel.findOne({ uid }).exec();
        const thumb = {
          uid: resp.uid,
          fileName: resp.fileName,
          path: resp.path,
          originalName: resp.originalName,
          imageUrl: resp.imageUrl,
        };
        if (doc && (!doc.thumbnail || doc.thumbnail.length == 0)) {
          thumb.uid = '0-' + thumb.uid;
          data = {
            thumbnail: [thumb],
          };
          await this.updateImageDocument<Copy>(this.copyModel, uid, data);
        } else {
          let length_thumb = doc.thumbnail.length;
          const thumbnails = doc.thumbnail;
          thumb.uid = length_thumb++ + '-' + thumb.uid;
          thumbnails.push(thumb);
          data = {
            thumbnail: thumbnails,
          };
          await this.updateImageDocument<Copy>(this.copyModel, uid, data);
        }
      }
      return true;
    } catch (error) {
      winstonLogger.error(`Error updating file: ${error}`);
      return false;
    }
  }

  async sizeThumbnails(uid: string): Promise<number> {
    const doc = await this.copyModel.findOne({ uid }).exec();
    if (doc && doc.thumbnail && doc.thumbnail.length != 0) {
      return doc.thumbnail.length;
    } else {
      return 0;
    }
  }

  async deleteThumbnailOnCopy(uid: string, thuid: string): Promise<boolean> {
    const doc = await this.copyModel.findOne({ uid }).exec();
    try {
      if (doc && doc.thumbnail && doc.thumbnail.length != 0) {
        winstonLogger.verbose(
          `Trying delete one thumbnail: ${thuid} ; from this copy image: ${uid}`,
        );
        const removedThumbnail = doc.thumbnail.find(
          (item) => item.uid === thuid,
        );
        const thumbnails = doc.thumbnail.filter((item) => item.uid !== thuid);
        const data = {
          thumbnail: thumbnails,
        };
        await this.updateImageDocument<Copy>(this.copyModel, uid, data);
        const rmUrl = this.extractUrlPart(removedThumbnail.imageUrl);
        if (rmUrl) {
          await this.cloudinary.delete(rmUrl);
        } else {
          winstonLogger.warning(
            `Failed to retrieve the URL of the deleted image using regex expression - ${removedThumbnail.imageUrl}`,
          );
        }

        return true;
      } else {
        return false;
      }
    } catch (error) {
      winstonLogger.error(
        `Error during delete this Thumbnail: ${thuid} for this Copy: ${uid}`,
      );
      return false;
    }
  }

  /*
   * Используем регулярное выражение для получения нужной части строки
   */
  extractUrlPart(url) {
    const regex = /\/([^\/]+\/[^\/.]+)\.\w+$/;
    const match = url.match(regex);
    if (match) {
      return match[1];
    }
    return null;
  }
}
