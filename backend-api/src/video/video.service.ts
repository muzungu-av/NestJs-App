import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Video } from './schemas/video.schema';
import { ImageHandler, ImgFileProcessingResult } from 'image/gm/imageHandler';
import { CloudinaryService } from 'cloudinary/cloudinary.service';
import { winstonLogger } from 'winston.logger';
import { CreateVideoDto } from './dto/create-video-dto';
import { CustomError } from 'image/utils/customError';
import { withLatestFrom } from 'rxjs';

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
    description: string,
  ): Promise<ImgFileProcessingResult> {
    const result = await this.handler.do(userId, file); //validation and creation of a miniature
    if (result.success !== true) {
      winstonLogger.error(`Error in addVideo: Problems with the image`);
    }

    winstonLogger.info(`Try uploading image to Cloudinary`);
    if (result && result.success) {
      try {
        result.imageUrl = await this.cloudinary.upload(
          userId,
          result.miniPath,
          result.fileName,
        );
      } catch (error) {
        winstonLogger.error(
          `Error during upload Video to Cloudinary: ${error}`,
        );
        result.success = false;
        throw new CustomError({
          message: 'Error during upload Video to Cloudinary',
          success: false,
          path: result.path,
          miniPath: result.miniPath,
          uid: result.uid,
        });
      }
    }
    try {
      // добавляем в БД
      const createVideoDto = new CreateVideoDto(
        name,
        result.imageUrl,
        link,
        result.owner,
        description,
        result.fileName,
      );
      await this.videoModel.create(createVideoDto);
    } catch (error) {
      winstonLogger.error(`'Error putting Video into the Database'`);
      throw new CustomError({
        message: 'Error putting Video into the Database',
        success: false,
        path: result.path,
        miniPath: result.miniPath,
        uid: result.uid,
      });
    }
    return result;
  }

  async getAllVideos(): Promise<Video[]> {
    const r = await this.videoModel.find().exec();
    winstonLogger.info(`Getting all Videos [${r.length}]`);
    return r;
  }

  async getVideoById(id: string): Promise<Video> {
    return await this.videoModel.findById(id).exec();
  }

  async deleteVideoById(
    _id: string,
    prevFileName: string,
    userId: string,
  ): Promise<boolean> {
    let r;
    try {
      r = await this.videoModel.deleteOne({ _id }).exec();
      if (r?.deletedCount > 0) {
        winstonLogger.info(`Video has been successfully deleted: ${_id}`);
        const indexOfDot = prevFileName.lastIndexOf('.');
        const nameWithoutDot = prevFileName.slice(0, indexOfDot);
        const urlForDel = `${userId}/${nameWithoutDot}`;
        const delRes = await this.cloudinary.delete(urlForDel);
        winstonLogger.info(`delRes-${delRes}`);
      }
    } catch (error) {
      winstonLogger.error(`${error.message}`);
      return false;
    }
    return r?.deletedCount > 0;
  }

  async updateFile(
    _id: string,
    userId: string,
    name: string,
    link: string,
    description: string,
    file: Express.Multer.File,
    prevFilename: string,
  ): Promise<boolean> {
    const resp = await this.handler.do(userId, file); //validation and creation of a miniature
    if (resp.success !== true) {
      winstonLogger.error(`Error in addVideo: Problems with the image`);
    }

    winstonLogger.info(`Try uploading image to Cloudinary`);
    winstonLogger.info(`User ${userId} updates image ${_id}`);
    winstonLogger.info(`name - ${name}`);
    winstonLogger.info(`link - ${link}`);
    winstonLogger.info(`description - ${description}`);
    if (resp && resp.success) {
      try {
        resp.imageUrl = await this.cloudinary.upload(
          userId,
          resp.miniPath,
          resp.fileName,
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
      const result = await this.videoModel.findOneAndUpdate(
        { _id },
        {
          name,
          link,
          description,
          imgUrl: resp.imageUrl,
          fileName: resp.fileName,
        },
        { new: true },
      );
      winstonLogger.info(`result-${result}`);
      const indexOfDot = prevFilename.lastIndexOf('.');
      const nameWithoutDot = prevFilename.slice(0, indexOfDot);
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
