import { Inject, Injectable } from '@nestjs/common';
import { ImageHandler, ImgFileProcessingResult } from './gm/imageHandler';
import { winstonLogger } from 'winston.logger';
import { Image } from './schemas/image.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateImageDto } from './dto/createImageDto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import FilterDocs from './utils/alg';
import { SingletonService } from './utils/SingletonService';

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
  constructor(
    @InjectModel(Image.name) private readonly imageModel: Model<Image>,
    private readonly handler: ImageHandler,
    private readonly cloudinary: CloudinaryService,
    @Inject(SingletonService)
    private singletonService: SingletonService,
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

    this.singletonService.setSharedObject(token);
    this.singletonService.logMapContents();
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
   * Updating the document in the database.
   *
   * @param uid document uid
   * @param updatedData updated data
   * @returns updated document
   */
  async updateImage(
    uid: string,
    updatedData: Partial<Image>,
  ): Promise<Image | null> {
    const result = await this.imageModel
      .updateOne({ uid }, { $set: updatedData })
      .exec();

    if (result.modifiedCount === 1) {
      return this.imageModel.findOne({ uid }).exec();
    } else {
      winstonLogger.error(`Failed to update the document ${uid}`);
    }
    return null;
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
  ): Promise<ImgFileProcessingResult> {
    return new Promise((resolve, reject) => {
      this.handler
        .do(userId, file) //validation and creation of a miniature
        .then(async (result) => {
          if (result.success === true) {
            // save to mongo
            try {
              result.description = description;
              winstonLogger.info(`${JSON.stringify(result)}`);
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
          // at the end of successful operation delete files from the container
          if (result && result.success) {
            this.handler.remove(result.path);
            this.handler.removeDir(result.miniPath);
            resolve(result);
          }
          const updatedData = {
            imageUrl: result.imageUrl,
            miniImageUrl: result.miniImageUrl,
          };
          const n = this.updateImage(result.uid, updatedData);
          winstonLogger.info(`Document update: ${n}`);
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

// remove(id: number) {
//   return `This action removes a #${id} image`;
// }
