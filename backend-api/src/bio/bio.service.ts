import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ImageHandler, ImgFileProcessingResult } from 'image/gm/imageHandler';
import { CloudinaryService } from 'cloudinary/cloudinary.service';
import { winstonLogger } from 'winston.logger';
import { CustomError } from 'image/utils/customError';
import { Bio } from './schemas/bio.shema';
import { CreateBioDto } from './dto/create-bio-dto';

@Injectable()
export class BioService {
  constructor(
    @InjectModel(Bio.name) private readonly bioModel: Model<Bio>,
    private readonly handler: ImageHandler,
    private readonly cloudinary: CloudinaryService,
  ) {}

  async addBio(
    userId: string,
    file: Express.Multer.File,
    text: string,
  ): Promise<boolean> {
    const result = await this.handler.do(userId, file); //validation and creation of a miniature
    if (result.success !== true) {
      winstonLogger.error(
        `Image processing error (Bio): Problems with the image`,
      );
    }
    //сначала удалить старое, поэтому нет метода обновления - биография всегда одна
    await this.deleteBio(userId);
    // загрузка в клауд
    winstonLogger.info(`Try uploading Bio-image to Cloudinary`);
    if (result && result.success) {
      try {
        result.imageUrl = await this.cloudinary.upload(
          userId + '/bio',
          result.miniPath,
          result.fileName,
        );
      } catch (error) {
        winstonLogger.error(
          `Error during upload Bio pic to Cloudinary: ${JSON.stringify(error)}`,
        );
        result.success = false;
        throw new CustomError({
          message: 'Error during upload Bio pic to Cloudinary',
          success: false,
          path: result.path,
          miniPath: result.miniPath,
          uid: result.uid,
        });
      }
    }
    try {
      // добавляем в БД
      const createBioDto = new CreateBioDto(result.imageUrl, text);
      await this.bioModel.create(createBioDto);
      return Promise.resolve(true);
    } catch (error) {
      winstonLogger.error(`'Error putting Bio into the Database'`);
      throw new CustomError({
        message: 'Error putting Bio into the Database',
        success: false,
        path: result.path,
        miniPath: result.miniPath,
        uid: result.uid,
      });
    }
    return Promise.resolve(false);
  }

  /**
   *
   * @returns
   */
  async getBio(): Promise<Bio> {
    const r = await this.bioModel.findOne().exec();
    winstonLogger.info(`Getting Bio`);
    return r;
  }

  /**
   *
   * @returns
   */
  async deleteBio(userId: string): Promise<boolean> {
    let r;
    try {
      r = await this.bioModel.deleteMany().exec();
      if (r.deletedCount > 0) {
        winstonLogger.info(`Bio has been successfully deleted`);
        await this.cloudinary.deleteAllBioImg(`${userId}/bio`);
        return Promise.resolve(true);
      } else {
        winstonLogger.warning(
          `Unsuccessful attempt to delete Biography during update (add)`,
        );
        return Promise.resolve(false);
      }
    } catch (error) {
      winstonLogger.error(`${error.message}`);
    }
    return Promise.resolve(false);
  }
}
