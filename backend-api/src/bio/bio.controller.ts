import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { JwtAuthGuard } from 'auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { winstonLogger } from 'winston.logger';
import { Bio } from 'bio/schemas/bio.shema';
import { BioService } from './bio.service';

@Controller('/api/bio')
export class BioController {
  constructor(private readonly bioService: BioService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFileAndPassValidation(
    @UploadedFile() file: Express.Multer.File,
    @Body('text_bio') text: string,
    @Req() request: any,
    @Res() response: any,
  ) {
    const { user } = request;
    winstonLogger.info(
      `Post request 'upload Bio' from user: ${JSON.stringify(user.userId)}`,
    );
    try {
      const result = await this.bioService.addBio(user.userId, file, text);
      return response.status(201).json(result);
    } catch (error) {
      return response.status(500).json({ message: `${error}` });
    }
  }

  @Get()
  get(): Promise<Bio> {
    winstonLogger.info(`Getting Bio`);
    return this.bioService.getBio();
  }

  @Delete()
  deleteVideoById(): boolean {
    winstonLogger.info(`Deleting a Bio`);
    return this.bioService.deleteBio();
  }
}
