import { Injectable } from '@nestjs/common';
import { ImageHandler, ImgFileProcessingResult } from './gm/imageHandler';
import { winstonLogger } from 'winston.logger';
import { Image } from './schemas/image.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateImageDto } from './dto/сreateImageDto';

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
    return new Promise((resolve, reject) => {
      this.handler
        .do(file)
        .then(async (result) => {
          if (result.success === true) {
            try {
              result.description = description;
              const createImageDto = new CreateImageDto(result);
              await this.imageModel.create(createImageDto);
              winstonLogger.info(`A image is created: ${result}`);
              resolve(result);
            } catch (error) {
              winstonLogger.error(
                `Error creating image in DB: ${error.message}`,
              );
              //No duplicates accepted
              this.handler.remove(result.path);
              this.handler.removeDir(result.miniPath);
              reject(
                new Error(`Failed to create image (No duplicates accepted)`),
              );
            }
          } else {
            //Failed validation
            reject(new Error(`Failed to create image (Failed validation)`));
          }
        })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .catch((error) => {
          reject(new Error('Unknown file handling error'));
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
