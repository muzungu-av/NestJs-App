import { Injectable } from '@nestjs/common';
import { ImageHandler, ImgFileProcessingResult } from './gm/imageHandler';
import { winstonLogger } from 'winston.logger';

// import { UpdateImageDto } from './dto/update-image.dto';

@Injectable()
export class ImageService {
  constructor(private readonly handler: ImageHandler) {
    this.handler = handler;
  }
  findAll() {
    return `This action returns all image`;
  }

  findOne(id: string): string {
    return `Это действие возвращает #${id} записи`;
  }

  async processNewFile(
    file: Express.Multer.File,
  ): Promise<ImgFileProcessingResult> {
    return new Promise((resolve) => {
      this.handler.do(file).then((result) => {
        if (result.success === true) {
          //todo - отправить в монго
          winstonLogger.info(JSON.stringify(result));
          // {"success":true,
          // "originalName":"000123.jpg",
          // "fileName":"1708011270174_000123.jpg",
          // "path":"/app/file_storage/mini_1708011270174_000123/mini_1708011270174_000123.jpg",
          // "sizeBytes":124405,
          // "createdAt":"2024-02-15T15:34:30.351Z"}
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
