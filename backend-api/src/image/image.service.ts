import { Injectable } from '@nestjs/common';
import { ImageHandler, ImgFileProcessingResult } from './gm/imageHandler';
import { winstonLogger } from 'winston.logger';
import { Image } from './schemas/image.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateImageDto } from './dto/сreateImageDto';
// import { UpdateImageDto } from './dto/update-image.dto';

@Injectable()
export class ImageService {
  // private readonly createImageDto: CreateImageDto;
  constructor(
    @InjectModel(Image.name) private readonly imageModel: Model<Image>,
    private readonly handler: ImageHandler,
  ) {}

  findAll() {
    return `This action returns all image`;
  }

  findOne(id: string): string {
    return `Это действие возвращает #${id} записи`;
  }

  async processNewFile(
    file: Express.Multer.File,
    description: string,
  ): Promise<ImgFileProcessingResult> {
    return new Promise((resolve) => {
      this.handler.do(file).then(async (result) => {
        if (result.success === true) {
          try {
            //todo - удаление файлов если в монго уже была инфа об этом файле
            result.description = description;
            const createImageDto = new CreateImageDto(result);
            this.imageModel.create(createImageDto);
            winstonLogger.info(`A images is created: ${result}`);
          } catch (error) {
            winstonLogger.error('Error creating image in DB: ', error);
            throw new Error('Failed to create image');
          }
        }
        resolve(result);
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
