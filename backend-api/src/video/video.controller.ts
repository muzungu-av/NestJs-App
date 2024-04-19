import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { VideoService } from './video.service';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { winstonLogger } from 'winston.logger';
import { Video } from './schemas/video.schema';
import { DeleteVideoDto } from './dto/gelete-video-dto';

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
    @Body('description') description: string,
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
        description,
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

  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteVideoById(
    @Req() request: any,
    @Query(new ValidationPipe({ transform: true }))
    dto: DeleteVideoDto,
  ): Promise<boolean> {
    const { user } = request;
    console.log('dto', dto);
    winstonLogger.info(
      `Deleting a video ${user} by id ${dto.id}, filename=${dto.fileName}`,
    );
    return this.videoService.deleteVideoById(dto.id, dto.fileName, user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':uid') // Используем PUT метод и ожидаем параметр uid в URL
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @UploadedFile() file: Express.Multer.File,
    @Param('uid') uid: string, // Получаем параметр uid из URL
    @Body('name') name: string,
    @Body('link') link: string,
    @Body('description') description: string,
    @Body('fileName') fileName: string,
    @Req() request: any,
    @Res() response: any,
  ) {
    const { user } = request;
    winstonLogger.info(
      `PUT request 'updateFile' from user: ${JSON.stringify(user.userId)}`,
    );
    try {
      // Предположим, что ваш сервис имеет метод для обновления данных файла по его uid

      const result = await this.videoService.updateFile(
        uid,
        user.userId,
        name,
        link,
        description,
        file,
        fileName,
      );
      return response.status(200).json({ result });
    } catch (error) {
      return response.status(500).json({ message: `${error}` });
    }
  }
}
