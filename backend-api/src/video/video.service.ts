import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Video } from './schemas/video.schema';
import { ImageHandler, ImgFileProcessingResult } from 'image/gm/imageHandler';
import { CloudinaryService } from 'cloudinary/cloudinary.service';
import { winstonLogger } from 'winston.logger';
import { CreateVideoDto } from './dto/create-video-dto';
import { CustomError } from 'image/utils/customError';

@Injectable()
export class VideoService {
  constructor(
    @InjectModel(Video.name) private readonly videoModel: Model<Video>,
    private readonly handler: ImageHandler,
    private readonly cloudinary: CloudinaryService,
  ) {}

  async getCount(): Promise<number> {
    return await this.videoModel.countDocuments().exec();
  }

  async addVideo(
    userId: string,
    file: Express.Multer.File,
    name: string,
    link: string,
  ): Promise<ImgFileProcessingResult> {
    try {
      const result = await this.handler.do(userId, file); //validation and creation of a miniature
      if (result.success !== true) {
        winstonLogger.error(`Error in addVideo: Problems with the image`);
      }
      // добавляем в БД
      const createVideoDto = new CreateVideoDto(name, link, result.owner);
      await this.videoModel.create(createVideoDto);

      // загрузка в клауд
      winstonLogger.info(`Try uploading image to Cloudinary`);
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
    } catch (error) {
      winstonLogger.error(`Error in addVideo: ${error}`);
      throw error; // Пробросить ошибку выше для обработки в вызывающем коде
    }
  }

  async getAllVideos(): Promise<Video[]> {
    const r = await this.videoModel.find().exec();
    winstonLogger.info(`Getting all Videos [${r.length}]`);
    return r;
  }

  async getVideoById(id: string): Promise<Video> {
    return await this.videoModel.findById(id).exec();
  }
}
