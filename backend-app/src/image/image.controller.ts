import {
  Controller,
  Get,
  Post,
  Param,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  //todo - Валидатор для проверки типа файла на основе GraphicImage

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFileAndPassValidation(@UploadedFile() file: Express.Multer.File) {
    console.log(file); //todo - в логи
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
