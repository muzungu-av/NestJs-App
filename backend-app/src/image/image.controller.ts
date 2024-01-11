import {
  Controller,
  Get,
  Post,
  Param,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { ImageService } from './image.service';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';

@Controller('image')
export class ImageController {
  constructor(
    private configService: ConfigService,
    private readonly imageService: ImageService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    const dest = this.configService.get('MULTER_DEST');
    console.log(file.fieldname);
    console.log(file.originalname);
    console.log(file.encoding);
    console.log(file.mimetype);
    console.log(file.size);

    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }

    const fileName = `${Date.now()}_${file.originalname}`;

    const filePath = path.join(dest, fileName);
    fs.writeFileSync(filePath, file.buffer);
  }

  @Get()
  findAll(): string {
    return this.imageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return this.imageService.findOne(id);
  }
}
