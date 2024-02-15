import { Injectable } from '@nestjs/common';
import { ImageHandler } from './gm/imageHandler';

// import { UpdateImageDto } from './dto/update-image.dto';

@Injectable()
export class ImageService {
  constructor(private handler: ImageHandler) {
    this.handler = handler;
  }
  findAll() {
    return `This action returns all image`;
  }

  findOne(id: string): string {
    return `Это действие возвращает #${id} записи`;
  }

  async processNewFile(filename: string): Promise<boolean> {
    return await this.handler.do(filename);
  }
}

// update(id: number, updateImageDto: UpdateImageDto) {
//   return `This action updates a #${id} image`;
// }

// remove(id: number) {
//   return `This action removes a #${id} image`;
// }
