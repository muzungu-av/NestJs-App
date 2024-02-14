import {
  Controller,
  Get,
  Post,
  Param,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { winstonLogger } from 'winston.logger';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('/api/image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFileAndPassValidation(@UploadedFile() file: Express.Multer.File) {
    winstonLogger.info(`File accepted : ${file.filename}, Size: ${file.size}`);
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
