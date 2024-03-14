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
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { winstonLogger } from 'winston.logger';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';
import { batchQuerySchema } from './schemas/batch-query.schema';
import { JoiValidationPipe } from './validators/JoiValidationPipe';

/**
 * Controller for image manipulation.
 * Access to authorised users by JWT token
 */
@UseGuards(JwtAuthGuard)
@Controller('/api/image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  /**
   * Uploading a picture to the system
   * @param file The File with image
   * @param description Text description
   * @param request automatic field (not used in the query)
   * @param response automatic field (not used in the query)
   * @returns Document UID from MongoDB
   */
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFileAndPassValidation(
    @UploadedFile() file: Express.Multer.File,
    @Body('description') description: string,
    @Req() request: any,
    @Res() response: any,
  ) {
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
  documentCount(): Promise<number> {
    return this.imageService.getImageCount();
  }

  /**
   * Returns the list of all documents of the system with the specified set of fields
   *
   * @param fields string field set
   * @returns Array of documents
   */
  @Get()
  findAll(@Query('fields') fields: string): Promise<any> {
    winstonLogger.info('Getting all Images');
    if (fields) {
      winstonLogger.info(`Query fields: ${fields}`);
      return this.imageService.getAllImagesWithFields(fields);
    } else {
      return this.imageService.getAllImages();
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
  @Get('/batch')
  async nextBatch(
    @Query(new JoiValidationPipe(batchQuerySchema)) query: any,
    @Req() request: Request,
  ): Promise<any> {
    const authorizationHeader = request.headers['authorization'];
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Invalid or missing authorization header',
      );
    }
    const token = authorizationHeader.split(' ')[1];
    return await this.imageService.getNextBatch(
      token,
      query.fields,
      query.quantity,
      query.direction,
    );
  }

  /**
   * Search for a single document by its UID
   */
  @Get(':uid')
  findOne(
    @Param('uid') uid: string,
    @Query('fields') fields: string,
  ): Promise<any> {
    return this.imageService.findOne(uid, fields);
  }
}
