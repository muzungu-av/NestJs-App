import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { VideoService } from './video.service';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { winstonLogger } from 'winston.logger';
import { Video } from './schemas/video.schema';

@Controller('/api/video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get('count')
  list(): Promise<number> {
    return this.videoService.getCount();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFileAndPassValidation(
    @UploadedFile() file: Express.Multer.File,
    @Body('name') name: string,
    @Body('link') link: string,
    @Req() request: any,
    @Res() response: any,
  ) {
    const { user } = request;
    winstonLogger.info(
      `Post request 'upload Video' from user: ${JSON.stringify(user.userId)}`,
    );
    try {
      const result = await this.videoService.addVideo(
        user.userId,
        file,
        name,
        link,
      );
      return response.status(201).json(result);
    } catch (error) {
      return response.status(500).json({ message: `${error}` });
    }
  }

  @Get()
  getAll(): Promise<Video[]> {
    winstonLogger.info(`Getting all Videos`);
    return this.videoService.getAllVideos();
  }

  @Get(':id')
  getVideoById(@Param('id') id: string): Promise<Video> {
    winstonLogger.info(`Retrieving video by id ${id}`);
    return this.videoService.getVideoById(id);
  }
}
