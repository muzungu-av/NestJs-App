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
    name: string,
    text: string,
  ): Promise<ImgFileProcessingResult> {
    const result = await this.handler.do(userId, file); //validation and creation of a miniature
    if (result.success !== true) {
      winstonLogger.error(`Error in addVideo: Problems with the image`);
    }

    // загрузка в клауд
    winstonLogger.info(`Try uploading image to Cloudinary`);
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
      const createBioDto = new CreateBioDto(name, result.imageUrl, text);
      await this.bioModel.create(createBioDto);
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
    return result;
  }

  async getBio(): Promise<Bio> {
    const r = await this.bioModel.findOne().exec();
    winstonLogger.info(`Getting Bio`);
    return r;
  }

  async deleteBio(): Promise<boolean> {
    let r;
    try {
      r = await this.bioModel.deleteMany().exec();
      winstonLogger.info(`Bio has been successfully deleted`);
    } catch (error) {
      winstonLogger.error(`${error.message}`);
      return false;
    }
    return r?.deletedCount > 0;
  }
}
