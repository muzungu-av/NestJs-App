import {
  Controller,
  Get,
  Post,
  Param,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Body,
  Res,
  Req,
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
  async uploadFileAndPassValidation(
    @UploadedFile() file: Express.Multer.File,
    @Body('description') description: string,
    @Req() request: any,
    @Res() response: any,
  ) {
    // const userId = request.userId;
    const { user } = request;
    winstonLogger.info(
      `Post request 'uploadFile' from user: ${JSON.stringify(user.userId)}`,
    );
    try {
      const result = await this.imageService.processNewFile(
        user.userId,
        file,
        description,
      );
      // winstonLogger.info(`result.uid = ${result.uid}`);
      // winstonLogger.info(`result.fileName = ${result.fileName}`);
      return response.status(201).json({ uid: result.uid });
    } catch (error) {
      return response.status(500).json({ message: `${error}` });
    }
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
