import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Body,
  Res,
  Req,
  Query,
  ValidationPipe,
  Put,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { winstonLogger } from 'winston.logger';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';
import { GetImagesFilterDto } from './dto/get-images-filter.dto';
import { DocumentCountDto } from './dto/document-count.dto';
import { FindAllDto } from './dto/find-all.dto';
import { GetForBlockDto } from './dto/get-for-block.dto';
import { Thumbnail } from './dto/create-copy.dto';

/**
 * Controller for image manipulation.
 *
 */

@Controller('/api/image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  /**
   * Uploading a picture to the system
   * Access to authorised users by JWT token
   *
   * @param file The File with image
   * @param description Text description
   * @param request automatic field (not used in the query)
   * @param response automatic field (not used in the query)
   * @returns Document UID from MongoDB
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFileAndPassValidation(
    @UploadedFile() file: Express.Multer.File,
    @Body('description') description: string,
    @Body('typeOfImage') typeOfImage: string,
    @Body('name') name: string,
    @Req() request: any,
    @Res() response: any,
  ) {
    const { user } = request;
    winstonLogger.info(
      `Post request 'upload File' from user: ${JSON.stringify(user.userId)}`,
    );
    try {
      const result = await this.imageService.processNewFile(
        user.userId,
        file,
        description,
        typeOfImage,
        name,
        null,
      );
      return response.status(201).json({ uid: result.uid });
    } catch (error) {
      return response.status(500).json({ message: `${error}` });
    }
  }

  /**
   * Return number of documents
   *
   * @returns number of documents
   */
  @Get('count')
  documentCount(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Query(new ValidationPipe({ transform: true })) dto: DocumentCountDto,
  ): Promise<number> {
    return this.imageService.getImageCount();
  }

  /**
   * Returns the list of all documents of the system with the specified set of fields
   *
   * @param fields string field set
   * @returns Array of documents
   */
  @Get()
  findAll(
    @Query(new ValidationPipe({ transform: true })) dto: FindAllDto,
  ): Promise<any> {
    winstonLogger.info(`Getting all Images with Query fields: ${dto.fields}`);
    return this.imageService.getAllImagesWithFields(dto.fields, '-createdAt');
  }

  /**
   * Returns the list of documents with images from Mongo matching the typeOfImage condition
   *
   * @param filterDto validated query parameter (typeOfImage)
   * @returns
   */
  @Get('type')
  findImagesByType(
    // @Query(new ValidationPipe({ transform: true }))
    @Query(new ValidationPipe())
    fieldsDto: GetImagesFilterDto,
  ): Promise<any> {
    winstonLogger.info(`>Try getting image by type: ${fieldsDto.typeOfImage}`);
    if (fieldsDto.typeOfImage === 'isCopy') {
      let fieldsArray: string[] = [];
      try {
        if (fieldsDto.fields && fieldsDto.fields.length > 0) {
          fieldsArray = fieldsDto.fields.split(',');
        }
      } catch (e) {
        winstonLogger.error(`fieldsArray: ${fieldsArray}`);
      }
      winstonLogger.info(`fieldsArray: ${fieldsArray}`);
      return this.imageService.findCopies(fieldsDto.typeOfImage, fieldsArray);
    }
    return this.imageService.findImagesByType(fieldsDto.typeOfImage); //похоже пока не используется
  }

  @Get('type/:uid')
  findCopyByUid(
    @Param('uid') uid: string,
    @Query(new ValidationPipe())
    fieldsDto: GetImagesFilterDto,
  ): Promise<any> {
    if (fieldsDto.typeOfImage === 'isCopy') {
      winstonLogger.info(`Getting one Copy bu Uid: ${uid}`);
      return this.imageService.findOneCopy(uid, fieldsDto.fields);
    }
  }
  /**
   * Produces pictures in batches.
   * Each new access with the same token will result in the next batch of pictures.
   * Changing the token resets to the beginning.
   * In case of the last batch will return...
   *
   * @param fields Desired document fields
   * @param quantity requested quantity
   * @returns Array of documents
   */
  // @Get('/batch')
  // async nextBatch(
  //   @Query(new JoiValidationPipe(batchQuerySchema)) query: any,
  //   @Req() request: Request,
  // ): Promise<any> {
  //   const authorizationHeader = request.headers['authorization'];
  //   if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
  //     throw new UnauthorizedException(
  //       'Invalid or missing authorization header',
  //     );
  //   }
  //   const token = authorizationHeader.split(' ')[1];
  //   return await this.imageService.getNextBatch(
  //     token,
  //     query.fields,
  //     query.quantity,
  //     query.direction,
  //   );
  // }

  /**
   * Search for a single document by its UID
   */
  @Get(':uid')
  findOne(
    @Param('uid') uid: string,
    @Query(new ValidationPipe()) dto: GetImagesFilterDto,
  ): Promise<any> {
    return this.imageService.findOne(uid, dto.fields);
  }

  /**
   * OIbtaining a limited number of images from the storage with specifying the required fields
   *
   * @param count Number of pictures
   * @param fields Desired document fields
   * @returns Array of documents
   */
  @Get('/block/:count')
  getForBlock(
    @Param('count', ValidationPipe) count: number,
    @Query(new ValidationPipe({ transform: true })) dto: GetForBlockDto,
  ): Promise<any> {
    return this.imageService.findBlock(count, dto.fields);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':uid') // Используем PUT метод и ожидаем параметр uid в URL
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @UploadedFile() file: Express.Multer.File,
    @Param('uid') uid: string, // Получаем параметр uid из URL
    @Body('description') description: string,
    @Body('typeOfImage') typeOfImage: string,
    @Body('name') name: string,
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
      const result = await this.imageService.updateImage(
        uid,
        description,
        name,
        typeOfImage,
        file,
        fileName,
        user.userId,
        undefined,
      );
      return response.status(200).json({ result });
    } catch (error) {
      return response.status(500).json({ message: `${error}` });
    }
  }

  /**
   * Delete document by its UID
   */
  @UseGuards(JwtAuthGuard)
  @Delete('/:uid')
  deleteOne(@Req() request: any, @Param('uid') uid: string): Promise<boolean> {
    const { user } = request;
    winstonLogger.info(`Deleting an Image ${user} by id ${uid}`);
    return this.imageService.deleteOne(uid, undefined);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/copy')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCopy(
    @UploadedFile() file: Express.Multer.File,
    @Body('description') description: string,
    @Body('sizes') sizes: string,
    @Body('name') name: string,
    @Req() request: any,
    @Res() response: any,
  ) {
    const { user } = request;
    winstonLogger.info(
      `Post request 'upload Copy' from user: ${JSON.stringify(user.userId)}`,
    );
    try {
      const result = await this.imageService.processNewFile(
        user.userId,
        file,
        description,
        'isCopy',
        name,
        sizes,
      );
      return response.status(201).json({ uid: result.uid });
    } catch (error) {
      return response.status(500).json({ message: `${error}` });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put('/copy/:uid') // Используем PUT метод и ожидаем параметр uid в URL
  @UseInterceptors(FileInterceptor('file'))
  async updateCopy(
    @UploadedFile() file: Express.Multer.File,
    @Param('uid') uid: string, // Получаем параметр uid из URL
    @Body('description') description: string,
    @Body('name') name: string,
    @Body('typeOfImage') typeOfImage: string,
    @Body('fileName') fileName: string,
    @Body('sizes') sizes: string,
    @Req() request: any,
    @Res() response: any,
  ) {
    const { user } = request;
    winstonLogger.info(
      `PUT request 'updateFile' from user: ${JSON.stringify(user.userId)}`,
    );
    try {
      const result = await this.imageService.updateImage(
        uid,
        description,
        name,
        typeOfImage,
        file,
        fileName,
        user.userId,
        sizes,
      );
      return response.status(200).json({ result });
    } catch (error) {
      return response.status(500).json({ message: `${error}` });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/copy/:uid')
  deleteOnCopy(
    @Req() request: any,
    @Param('uid') uid: string,
  ): Promise<boolean> {
    const { user } = request;
    winstonLogger.info(`Deleting a Copy ${user._id} by id ${uid}`);
    return this.imageService.deleteOne(uid, 'isCopy');
  }

  @UseGuards(JwtAuthGuard)
  @Put('/copy/thumbnail/:uid') // Используем PUT метод и ожидаем параметр uid в URL
  @UseInterceptors(FileInterceptor('file'))
  async addThumbnail(
    @UploadedFile() file: Express.Multer.File,
    @Param('uid') uid: string, // Получаем параметр uid из URL
    @Req() request: any,
  ) {
    const { user } = request;
    winstonLogger.info(
      `I'm trying to add an additional thumbnail for - ${uid}`,
    );
    return this.imageService.addThumbnail(uid, file, user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/copy/thumbnail/count/:uid')
  getCountThumbnails(@Param('uid') uid: string): Promise<number> {
    return this.imageService.sizeThumbnails(uid);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/copy/thumbnail/:uid')
  getThumbnails(@Param('uid') uid: string): Promise<Thumbnail[]> {
    return this.imageService.getThumbnails(uid);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/copy/thumbnail/:uid/:thuid')
  deleteThumbnailOnCopy(
    @Param('uid') uid: string,
    @Param('thuid') thuid: string,
  ): Promise<boolean> {
    return this.imageService.deleteThumbnailOnCopy(uid, thuid);
  }
}
